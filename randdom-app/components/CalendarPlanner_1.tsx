import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, useColorScheme, Alert } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import Clipboard from '@react-native-clipboard/clipboard';

interface CalendarState {
  campaignDetails: string;
  calendar: string;
  loading: boolean;
}

interface ApiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const CalendarPlanner_1: React.FC = () => {
  const [state, setState] = useState<CalendarState>({
    campaignDetails: '',
    calendar: '',
    loading: false,
  });

  // Theme support
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const cardBackground = isDarkMode ? '#333' : '#FFF';
  const textColor = isDarkMode ? '#FFF' : '#333';
  const inputBackground = isDarkMode ? '#444' : '#FFF';
  const inputBorderColor = isDarkMode ? '#666' : '#CCC';

  // Access API_KEY and API_URL
  const API_KEY =    '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'                      // Config.API_KEY;
  const API_URL =   'https://api.perplexity.ai/chat/completions'                       // Config.API_URL;

  // Generate calendar
  const generateCalendar = async (retryCount: number = 3) => {
    if (!API_KEY || !API_URL) {
      Alert.alert('Error', 'API_KEY or API_URL not configured in .env.');
      return;
    }
    if (!state.campaignDetails) {
      Alert.alert('Error', 'Please provide campaign details.');
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));
    try {
      const prompt = `Generate a 7-day social media content calendar based on the campaign details: "${state.campaignDetails}". Format as a daily plan (e.g., Day 1: ..., Day 2: ...).`;
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

      const newCalendar = res.data.choices[0]?.message?.content?.trim() || 'No calendar generated';
      setState((prev) => ({ ...prev, calendar: newCalendar }));
    } catch (error: any) {
      if (retryCount > 0 && error.response?.status === 429) {
        setTimeout(() => generateCalendar(retryCount - 1), 1000);
      } else {
        Alert.alert('Error', `Failed to generate calendar: ${error.message}`);
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Copy calendar
  const copyCalendar = () => {
    Clipboard.setString(state.calendar);
    Alert.alert('Success', 'Calendar copied to clipboard!');
  };

  const handleGeneratePress = () => {
    generateCalendar();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5' }]}>
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <Text style={[styles.title, { color: textColor }]}>Content Calendar Planner</Text>
        <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: textColor }} />

        <Text style={[styles.label, { color: textColor }]}>Campaign Details</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
          placeholder="E.g., 7-day campaign for a new product"
          placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
          value={state.campaignDetails}
          onChangeText={(text) => setState((prev) => ({ ...prev, campaignDetails: text }))}
          multiline
        />

        <View style={styles.buttonContainer}>
          <Button
            title={state.loading ? 'Generating...' : 'Generate Calendar'}
            onPress={handleGeneratePress}
            color="#6200EE"
            disabled={state.loading}
          />
          {state.loading && <ActivityIndicator size="small" color="#6200EE" style={{ marginTop: 10 }} />}
        </View>
      </View>

      {state.calendar && (
        <View style={[styles.responseCard, { backgroundColor: cardBackground }]}>
          <Text style={[styles.title, { color: textColor }]}>Generated Calendar</Text>
          <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: textColor }} />
          <Text style={[styles.responseText, { color: textColor }]}>{state.calendar}</Text>
          <Button title="Copy Calendar" onPress={copyCalendar} color="#6200EE" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { borderRadius: 10, padding: 20, margin: 10, elevation: 5, shadowOpacity: 0.3, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  responseCard: { borderRadius: 10, padding: 20, margin: 10, marginTop: 20, elevation: 5, shadowOpacity: 0.3, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 10, fontSize: 16 },
  responseText: { fontSize: 16, lineHeight: 24, marginBottom: 10 },
  buttonContainer: { marginTop: 10 },
});

export default CalendarPlanner_1;