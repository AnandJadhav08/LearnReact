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
  SafeAreaView,
  Animated
} from 'react-native';
import axios, { AxiosResponse } from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface HashtagState {
  contentType: string;
  userNiche: string;
  photoDescription: string;
  hashtags: { highTraffic: string[]; lowCompetition: string[] };
  loading: boolean;
}

interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const HashtagGenerator: React.FC = () => {

  const { incrementStat } = useStats();

  const [state, setState] = useState<HashtagState>({
    contentType: '',
    userNiche: '',
    photoDescription: '',
    hashtags: { highTraffic: [], lowCompetition: [] },
    loading: false,
  });

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Access API_KEY and API_URL
 const API_KEY = process.env.API_KEY;
 const API_URL = process.env.API_URL;

  // Content type suggestions
  const contentTypeSuggestions = [
    { label: 'Lifestyle', icon: 'heart', color: '#FF6B6B' },
    { label: 'Fashion', icon: 'tshirt-crew', color: '#4ECDC4' },
    { label: 'Food', icon: 'food', color: '#FFD93D' },
    { label: 'Travel', icon: 'airplane', color: '#45B7D1' },
    { label: 'Fitness', icon: 'dumbbell', color: '#96CEB4' },
    { label: 'Business', icon: 'briefcase', color: '#A8E6CF' },
  ];

  // Generate hashtags
  const generateHashtags = async (retryCount: number = 3) => {
    if (!API_KEY || !API_URL) {
      Alert.alert('Configuration Error', 'API credentials are not configured properly.');
      return;
    }
    if (!state.contentType.trim() || !state.userNiche.trim()) {
      Alert.alert('Input Required', 'Please provide both content type and user niche.');
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));
    try {
      const prompt = `
        Generate 10 Treanding, Attractive social media hashtags for content type "${state.contentType}", user niche "${state.userNiche}", and photo described as "${state.photoDescription || 'N/A'}".
        Group them into:
        - 5 high-traffic hashtags
        - 5 low-competition hashtags
        Format as:
        High-traffic: #tag1, #tag2, ...
        Low-competition: #tag1, #tag2, ...
      `;

      const payload = {
        model: 'sonar',
        messages: [{ role: 'user', content: prompt }],
        search_mode: 'web',
        reasoning_effort: 'medium',
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 300,
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

      const content = res.data.choices[0]?.message?.content?.trim() || '';
      const parts = content.split(/High-traffic: |Low-competition:/).filter(Boolean);
      const newHashtags = {
        highTraffic: parts[1]?.trim().split(', ') || [],
        lowCompetition: parts[2]?.trim().split(', ') || [],
      };
      setState((prev) => ({ ...prev, hashtags: newHashtags }));
      if (newHashtags.highTraffic.length > 0 || newHashtags.lowCompetition.length > 0) {
        incrementStat('Hashtags Created');
      }
    } catch (error: any) {
      if (retryCount > 0 && error.response?.status === 429) {
        setTimeout(() => generateHashtags(retryCount - 1), 2000);
      } else {
        Alert.alert('Generation Failed', `Unable to generate hashtags: ${error.message}`);
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Copy hashtags
  const copyHashtags = (tags: string[], type: string) => {
    if (tags.length === 0) return;

    Clipboard.setString(tags.join(' '));
    Alert.alert('Copied!', `${type} hashtags copied to clipboard successfully.`);
  };

  const handleContentTypeSelect = (type: string) => {
    setState((prev) => ({ ...prev, contentType: type }));
  };

  const handleGeneratePress = () => {
    generateHashtags();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="pound-box" size={32} color="#6366F1" />
          <Text style={styles.headerTitle}>Hashtag Generator</Text>
          <Text style={styles.headerSubtitle}>Generate trending hashtags for your content</Text>
        </View>

        {/* Content Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Content Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionContainer}>
            {contentTypeSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.suggestionChip,
                  { backgroundColor: state.contentType === suggestion.label ? suggestion.color : '#F9FAFB' },
                  state.contentType === suggestion.label && styles.selectedChip
                ]}
                onPress={() => handleContentTypeSelect(suggestion.label)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={suggestion.icon as any}
                  size={16}
                  color={state.contentType === suggestion.label ? '#FFF' : suggestion.color}
                />
                <Text style={[
                  styles.suggestionText,
                  { color: state.contentType === suggestion.label ? '#FFF' : '#374151' }
                ]}>
                  {suggestion.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="tag-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Or type custom content type..."
              placeholderTextColor="#9CA3AF"
              value={state.contentType}
              onChangeText={(text) => setState((prev) => ({ ...prev, contentType: text }))}
            />
          </View>
        </View>

        {/* User Niche */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Your Niche</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="target" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Fitness, Fashion, Food, Travel..."
              placeholderTextColor="#9CA3AF"
              value={state.userNiche}
              onChangeText={(text) => setState((prev) => ({ ...prev, userNiche: text }))}
            />
          </View>
        </View>

        {/* Photo Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📸 Photo Description (Optional)</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="image-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Describe your photo to get more relevant hashtags..."
              placeholderTextColor="#9CA3AF"
              value={state.photoDescription}
              onChangeText={(text) => setState((prev) => ({ ...prev, photoDescription: text }))}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
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
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#FFF" />
                <Text style={styles.generateBtnText}>Generating Hashtags...</Text>
              </View>
            ) : (
              <>
                <MaterialCommunityIcons name="magic-staff" size={20} color="#FFF" />
                <Text style={styles.generateBtnText}>Generate Hashtags</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Generated Hashtags */}
        {(state.hashtags.highTraffic.length > 0 || state.hashtags.lowCompetition.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Generated Hashtags</Text>

            {/* High Traffic Hashtags */}
            {state.hashtags.highTraffic.length > 0 && (
              <View style={styles.hashtagCard}>
                <View style={styles.hashtagHeader}>
                  <View style={styles.hashtagHeaderLeft}>
                    <MaterialCommunityIcons name="trending-up" size={24} color="#EF4444" />
                    <Text style={styles.hashtagTitle}>High-Traffic Hashtags</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.copyBtn, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}
                    onPress={() => copyHashtags(state.hashtags.highTraffic, 'High-traffic')}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons name="content-copy" size={16} color="#EF4444" />
                    <Text style={[styles.copyBtnText, { color: '#EF4444' }]}>Copy</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.hashtagContainer}>
                  {state.hashtags.highTraffic.map((tag, index) => (
                    <View key={index} style={[styles.hashtagChip, { backgroundColor: '#FEE2E2' }]}>
                      <Text style={[styles.hashtagText, { color: '#DC2626' }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Low Competition Hashtags */}
            {state.hashtags.lowCompetition.length > 0 && (
              <View style={styles.hashtagCard}>
                <View style={styles.hashtagHeader}>
                  <View style={styles.hashtagHeaderLeft}>
                    <MaterialCommunityIcons name="target-account" size={24} color="#10B981" />
                    <Text style={styles.hashtagTitle}>Low-Competition Hashtags</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.copyBtn, { backgroundColor: '#ECFDF5', borderColor: '#BBF7D0' }]}
                    onPress={() => copyHashtags(state.hashtags.lowCompetition, 'Low-competition')}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons name="content-copy" size={16} color="#10B981" />
                    <Text style={[styles.copyBtnText, { color: '#10B981' }]}>Copy</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.hashtagContainer}>
                  {state.hashtags.lowCompetition.map((tag, index) => (
                    <View key={index} style={[styles.hashtagChip, { backgroundColor: '#D1FAE5' }]}>
                      <Text style={[styles.hashtagText, { color: '#059669' }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFF',
    padding: 24,
    paddingTop: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  suggestionContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedChip: {
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
    alignSelf: 'stretch',
  },
  generateBtn: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  generateBtnDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0.1,
  },
  generateBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashtagCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hashtagHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  hashtagHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashtagTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  copyBtnText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hashtagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  hashtagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default HashtagGenerator;