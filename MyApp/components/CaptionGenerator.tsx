import React, { useState } from 'react';
import { useStats } from '../app/context/StatsContext'
import {  View,  Text,  TextInput,  StyleSheet,  ScrollView,  ActivityIndicator,  useColorScheme,  Alert,  Image,  TouchableOpacity,  SafeAreaView} from 'react-native';
import axios, { AxiosResponse } from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface CaptionState {
  photoDescription: string;
  photoUri: string | null;
  tone: string;
  caption: string;
  loading: boolean;
}

interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const CaptionGenerator: React.FC = () => {

  const { incrementStat } = useStats();

  const [state, setState] = useState<CaptionState>({
    photoDescription: '',
    photoUri: null,
    tone: 'casual',
    caption: '',
    loading: false,
  });

  // const colorScheme = useColorScheme();
  // const isDarkMode = colorScheme === 'dark';

  const API_KEY = process.env.API_KEY;
  const API_URL = process.env.API_URL;

  const toneOptions = [
    { label: 'Casual', value: 'casual', icon: 'emoticon-happy', color: '#FF6B6B' },
    { label: 'Professional', value: 'professional', icon: 'briefcase', color: '#4ECDC4' },
    { label: 'Funny', value: 'funny', icon: 'emoticon-wink', color: '#FFD93D' },
    { label: 'Promotional', value: 'promotional', icon: 'bullhorn', color: '#45B7D1' },
    { label: 'Inspirational', value: 'inspirational', icon: 'lightbulb', color: '#96CEB4' },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your photos to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets[0].uri) {
      setState((prev) => ({ ...prev, photoUri: result.assets[0].uri }));
    }
  };

  const generateCaption = async (retryCount: number = 3) => {
    if (!API_KEY || !API_URL) {
      Alert.alert('Configuration Error', 'API credentials are not configured properly.');
      return;
    }
    if (!state.photoDescription.trim()) {
      Alert.alert('Input Required', 'Please describe your photo to generate a caption.');
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));
    try {
      const prompt = `Generate a catchy social media caption for a photo described as: "${state.photoDescription}". Tone: ${state.tone}. Make it engaging and include relevant emojis.`;
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

      const newCaption = res.data.choices[0]?.message?.content?.trim() || 'Unable to generate caption. Please try again.';
      setState((prev) => ({ ...prev, caption: newCaption }));
      if (newCaption !== 'Unable to generate caption. Please try again.') {
        incrementStat('Captions Generated');
      }
    } catch (error: any) {
      if (retryCount > 0 && error.response?.status === 429) {
        setTimeout(() => generateCaption(retryCount - 1), 2000);
      } else {
        Alert.alert('Generation Failed', `Unable to generate caption: ${error.message}`);
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleGeneratePress = () => {
    generateCaption();
  };

  const copyCaption = () => {
    if (state.caption) {
      Clipboard.setString(state.caption);
      Alert.alert('Copied!', 'Caption copied to clipboard successfully.');
    }
  };

  const removeImage = () => {
    setState((prev) => ({ ...prev, photoUri: null }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Caption Generator</Text>
          <Text style={styles.headerSubtitle}>Create engaging captions for your posts</Text>
        </View>

        {/* Photo Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📸 Photo Upload</Text>
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={pickImage}
            activeOpacity={0.7}
          >
            {state.photoUri ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: state.photoUri }} style={styles.uploadedImage} />
                <TouchableOpacity style={styles.removeImageBtn} onPress={removeImage}>
                  <MaterialCommunityIcons name="close" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <MaterialCommunityIcons name="camera-plus" size={40} color="#9CA3AF" />
                <Text style={styles.uploadText}>Tap to upload photo</Text>
                <Text style={styles.uploadSubtext}>Optional - helps generate better captions</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Photo Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Describe Your Photo</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe what's in your photo... (e.g., A sunny beach with palm trees and crystal clear water)"
              placeholderTextColor="#9CA3AF"
              value={state.photoDescription}
              onChangeText={(text) => setState((prev) => ({ ...prev, photoDescription: text }))}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Tone Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Choose Your Tone</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toneContainer}>
            {toneOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.toneOption,
                  { backgroundColor: state.tone === option.value ? option.color : '#F9FAFB' },
                  state.tone === option.value && styles.selectedTone
                ]}
                onPress={() => setState((prev) => ({ ...prev, tone: option.value }))}
              >
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={20}
                  color={state.tone === option.value ? '#FFF' : option.color}
                />
                <Text style={[
                  styles.toneLabel,
                  { color: state.tone === option.value ? '#FFF' : '#374151' }
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
                <Text style={styles.generateBtnText}>Generating...</Text>
              </View>
            ) : (
              <>
                <MaterialCommunityIcons name="magic-staff" size={20} color="#FFF" />
                <Text style={styles.generateBtnText}>Generate Caption</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Generated Caption */}
        {state.caption && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Generated Caption</Text>
            <View style={styles.captionContainer}>
              <ScrollView style={styles.captionScrollView}>
                <Text style={styles.captionText}>{state.caption}</Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.copyBtn}
                onPress={copyCaption}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="content-copy" size={18} color="#6366F1" />
                <Text style={styles.copyBtnText}>Copy Caption</Text>
              </TouchableOpacity>
            </View>
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
    textAlign: 'center',
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
  uploadContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  uploadedImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  removeImageBtn: {
    position: 'absolute',
    top: -8,
    right: '50%',
    marginRight: -78,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    fontSize: 16,
    color: '#374151',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  toneContainer: {
    flexDirection: 'row',
  },
  toneOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedTone: {
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toneLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
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
  captionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  captionScrollView: {
    maxHeight: 200,
    marginBottom: 16,
  },
  captionText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  copyBtnText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});

export default CaptionGenerator;