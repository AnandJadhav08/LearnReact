import React, { useState } from 'react';
import { useStats } from '../app/context/StatsContext'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import axios, { AxiosResponse } from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface CalendarState {
  campaignDetails: string;
  calendar: string;
  loading: boolean;
}

interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const CalendarPlanner: React.FC = () => {

  const { incrementStat } = useStats();

  const [state, setState] = useState<CalendarState>({
    campaignDetails: '',
    calendar: '',
    loading: false,
  });

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Access API_KEY and API_URL
  const API_KEY = process.env.API_KEY;
  const API_URL = process.env.API_URL;

  // Campaign type suggestions
  const campaignSuggestions = [
    { label: 'Product Launch', icon: 'rocket-launch', color: '#6366F1' },
    { label: 'Brand Awareness', icon: 'bullhorn', color: '#8B5CF6' },
    { label: 'Holiday Campaign', icon: 'gift', color: '#EC4899' },
    { label: 'Educational Series', icon: 'school', color: '#10B981' },
    { label: 'User Generated Content', icon: 'account-group', color: '#F59E0B' },
    { label: 'Behind the Scenes', icon: 'camera-outline', color: '#EF4444' },
  ];

  // Generate calendar
  const generateCalendar = async (retryCount: number = 3) => {
    if (!API_KEY || !API_URL) {
      Alert.alert('Configuration Error', 'API credentials are not configured properly.');
      return;
    }
    if (!state.campaignDetails.trim()) {
      Alert.alert('Input Required', 'Please provide campaign details to generate a calendar.');
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));
    try {
      const prompt = `Generate a 7-day social media content calendar based on the campaign details: "${state.campaignDetails}". Format as a daily plan with specific post ideas, optimal posting times, and content types. Structure it as Day 1, Day 2, etc. Make it detailed and actionable.`;

      const payload = {
        model: 'sonar',
        messages: [{ role: 'user', content: prompt }],
        search_mode: 'web',
        reasoning_effort: 'medium',
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 600,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 0,
        web_search_options: { search_context_size: 'low' },
      };

      const res: AxiosResponse<ApiResponse> = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const newCalendar = res.data.choices[0]?.message?.content?.trim() || 'Unable to generate calendar. Please try again with more specific details.';
      setState((prev) => ({ ...prev, calendar: newCalendar }));
      if (newCalendar !== 'Unable to generate calendar. Please try again with more specific details.') {
        incrementStat('Content Plans');
      }
    } catch (error: any) {
      if (retryCount > 0 && error.response?.status === 429) {
        setTimeout(() => generateCalendar(retryCount - 1), 2000);
      } else {
        Alert.alert('Generation Failed', `Unable to generate calendar: ${error.message}`);
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Copy calendar
  const copyCalendar = () => {
    if (state.calendar) {
      Clipboard.setString(state.calendar);
      Alert.alert('Copied!', 'Content calendar copied to clipboard successfully.');
    }
  };

  const handleCampaignSelect = (campaign: string) => {
    setState((prev) => ({
      ...prev,
      campaignDetails: prev.campaignDetails ? `${prev.campaignDetails}, ${campaign}` : campaign
    }));
  };

  const handleGeneratePress = () => {
    generateCalendar();
  };

  // Parse calendar into days for better display
  const parseCalendar = (calendar: string) => {
    const days = calendar.split(/Day \d+:/i).filter(Boolean);
    return days.map((day, index) => ({
      day: index + 1,
      content: day.trim()
    }));
  };

  const parsedCalendar = state.calendar ? parseCalendar(state.calendar) : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="calendar-edit" size={32} color="#6366F1" />
          <Text style={styles.headerTitle}>Content Calendar</Text>
          <Text style={styles.headerSubtitle}>Plan your 7-day social media campaign</Text>
        </View>

        {/* Campaign Type Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Campaign Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionContainer}>
            {campaignSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.suggestionChip, { borderColor: suggestion.color }]}
                onPress={() => handleCampaignSelect(suggestion.label)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={suggestion.icon as any}
                  size={16}
                  color={suggestion.color}
                />
                <Text style={[styles.suggestionText, { color: suggestion.color }]}>
                  {suggestion.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Campaign Details Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Campaign Details</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="text-box-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Describe your campaign... (e.g., 7-day product launch for a new fitness app targeting young professionals. Focus on benefits, testimonials, and exclusive offers)"
              placeholderTextColor="#9CA3AF"
              value={state.campaignDetails}
              onChangeText={(text) => setState((prev) => ({ ...prev, campaignDetails: text }))}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          <Text style={styles.helperText}>
            💡 Include target audience, campaign goals, key messages, and any specific requirements
          </Text>
        </View>

        {/* Generate Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.generateBtn, state.loading && styles.generateBtnDisabled]}
            onPress={handleGeneratePress}
            disabled={state.loading}
            activeOpacity={0.8}
          >
            {state.loading ? (
              <View style={styles.loadingContainer
              }>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.generateBtnText}>Generating...</Text>
              </View>
            ) : (
              <Text style={styles.generateBtnText}>Generate Calendar</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Generated Calendar Output */}
        {state.calendar && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Your 7-Day Calendar</Text>
            {parsedCalendar.map((dayItem, index) => (
              <View key={index} style={styles.dayCard}>
                <Text style={styles.dayTitle}>Day {dayItem.day}</Text>
                <Text style={styles.dayContent}>{dayItem.content}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyCalendar}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="content-copy" size={18} color="#fff" />
              <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
  },
  scrollView: {
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  suggestionContainer: {
    flexDirection: 'row',
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  suggestionText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginTop: 4,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    minHeight: 100,
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  generateBtn: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateBtnDisabled: {
    backgroundColor: '#A5B4FC',
  },
  generateBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dayTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  dayContent: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  copyButton: {
    marginTop: 12,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CalendarPlanner;
