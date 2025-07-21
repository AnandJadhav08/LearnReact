import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, useColorScheme, Alert, Image } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Clipboard from '@react-native-clipboard/clipboard';

interface CaptionState {
  photoDescription: string;
  photoUri: string | null;
  tone: string;
  caption: string;
  loading: boolean;
}

interface ApiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const CaptionGenerator_1: React.FC = () => {
  const [state, setState] = useState<CaptionState>({
    photoDescription: '',
    photoUri: null,
    tone: 'casual',
    caption: '',
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
  const API_KEY =  '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'                      //Config.API_KEY;
  const API_URL =  'https://api.perplexity.ai/chat/completions'                      //Config.API_URL;

  // Image picker
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Permission to access photos is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setState((prev) => ({ ...prev, photoUri: result.assets[0].uri }));
    }
  };

  // Generate caption
  const generateCaption = async (retryCount: number = 3) => {
    if (!API_KEY || !API_URL) {
      Alert.alert('Error', 'API_KEY or API_URL not configured in .env.');
      return;
    }
    if (!state.photoDescription) {
      Alert.alert('Error', 'Please provide a photo description.');
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));
    try {
      const prompt = `Generate a catchy social media caption for a photo described as: "${state.photoDescription}". Tone: ${state.tone}.`;
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

      const newCaption = res.data.choices[0]?.message?.content?.trim() || 'No caption generated';
      setState((prev) => ({ ...prev, caption: newCaption }));
    } catch (error: any) {
      if (retryCount > 0 && error.response?.status === 429) {
        setTimeout(() => generateCaption(retryCount - 1), 1000);
      } else {
        Alert.alert('Error', `Failed to generate caption: ${error.message}`);
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Copy caption
  const copyCaption = () => {
    Clipboard.setString(state.caption);
    Alert.alert('Success', 'Caption copied to clipboard!');
  };

  const handleGeneratePress = () => {
    generateCaption();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5' }]}>
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <Text style={[styles.title, { color: textColor }]}>Caption Generator</Text>
        <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: textColor }} />

        <Button title="Upload Photo" onPress={pickImage} color="#6200EE" />
        {state.photoUri && (
          <Image
            source={{ uri: state.photoUri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Text style={[styles.label, { color: textColor }]}>Photo Description</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
          placeholder="E.g., A sunny beach with palm trees"
          placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
          value={state.photoDescription}
          onChangeText={(text) => setState((prev) => ({ ...prev, photoDescription: text }))}
          multiline
        />

        <Text style={[styles.label, { color: textColor }]}>Tone</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
          placeholder="E.g., casual, funny, professional, promotional"
          placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
          value={state.tone}
          onChangeText={(text) => setState((prev) => ({ ...prev, tone: text }))}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={state.loading ? 'Generating...' : 'Generate Caption'}
            onPress={handleGeneratePress}
            color="#6200EE"
            disabled={state.loading}
          />
          {state.loading && <ActivityIndicator size="small" color="#6200EE" style={{ marginTop: 10 }} />}
        </View>
      </View>

      {state.caption && (
        <View style={[styles.responseCard, { backgroundColor: cardBackground }]}>
          <Text style={[styles.title, { color: textColor }]}>Generated Caption</Text>
          <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: textColor }} />
          <Text style={[styles.responseText, { color: textColor }]}>{state.caption}</Text>
          <Button title="Copy Caption" onPress={copyCaption} color="#6200EE" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  responseCard: {
    borderRadius: 10,
    padding: 20,
    margin: 10,
    marginTop: 20,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  image: { width: '100%', height: 150, borderRadius: 10, marginVertical: 10 },
  responseText: { fontSize: 16, lineHeight: 24, marginBottom: 10 },
  buttonContainer: { marginTop: 10 },
});

export default CaptionGenerator_1;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView, useColorScheme } from 'react-native';
// import axios from 'axios';
// //import Config from 'react-native-config';

// const ContentGenerator = () => {
//   // State for user inputs
//   const [photoDescription, setPhotoDescription] = useState('');
//   const [mood, setMood] = useState('');
//   const [contentType, setContentType] = useState('');
//   const [calendarDetails, setCalendarDetails] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Theme support
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';
//   const cardBackground = isDarkMode ? '#333' : '#FFF';
//   const textColor = isDarkMode ? '#FFF' : '#333';
//   const inputBackground = isDarkMode ? '#444' : '#FFF';
//   const inputBorderColor = isDarkMode ? '#666' : '#CCC';

//   // Access API_KEY and API_URL from .env
//   const API_KEY = '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'                              //Config.API_KEY;
//   const API_URL = 'https://api.perplexity.ai/chat/completions'                        //Config.API_URL;

//   // Function to handle API call
//   const generateContent = async () => {
//     if (!API_KEY || !API_URL) {
//       setResponse('Error: API_KEY or API_URL not configured in .env file.');
//       return;
//     }

//     if (!photoDescription || !mood || !contentType || !calendarDetails) {
//       setResponse('Please fill in all input fields.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const prompt = `
//         Generate social media content based on the following inputs:
//         - Photo Description: ${photoDescription}
//         - Mood: ${mood}
//         - Content Type: ${contentType}
//         - Content Calendar Details: ${calendarDetails}
//         Provide:
//         1. A catchy caption for the photo.
//         2. A list of 5 relevant hashtags.
//         3. A content calendar plan for the next 7 days based on the provided details.
//       `;

//       const payload = {
//         model: 'sonar',
//         messages: [{ role: 'user', content: prompt }],
//         search_mode: 'web',
//         reasoning_effort: 'medium',
//         temperature: 0.2,
//         top_p: 0.9,
//         max_tokens: 500,
//         stream: false,
//         presence_penalty: 0,
//         frequency_penalty: 0,
//         web_search_options: { search_context_size: 'low' },
//       };

//       const res = await axios.post(API_URL, payload, {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       // Format the response as a string
//       const content = res.data.choices[0].message.content;
//       const formattedResponse = `
//         Caption: ${content.split('1.')[1]?.split('2.')[0]?.trim() || 'N/A'}
//         Hashtags: ${content.split('2.')[1]?.split('3.')[0]?.trim() || 'N/A'}
//         Content Calendar: ${content.split('3.')[1]?.trim() || 'N/A'}
//       `;
//       setResponse(formattedResponse);
//     } catch (error) {
//       console.error('Error generating content:', error);
//       setResponse('Error generating content. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5' }]}>
//       <View style={[styles.card, { backgroundColor: cardBackground }]}>
//         <Text style={[styles.title, { color: textColor }]}>
//           AI Social Media Content Generator
//         </Text>
//         <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: textColor }} />

//         <Text style={[styles.label, { color: textColor }]}>Photo Description</Text>
//         <TextInput
//           style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
//           placeholder="E.g., A sunny beach with palm trees"
//           placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
//           value={photoDescription}
//           onChangeText={setPhotoDescription}
//           multiline
//         />

//         <Text style={[styles.label, { color: textColor }]}>Mood</Text>
//         <TextInput
//           style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
//           placeholder="E.g., Relaxed, adventurous"
//           placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
//           value={mood}
//           onChangeText={setMood}
//         />

//         <Text style={[styles.label, { color: textColor }]}>Content Type</Text>
//         <TextInput
//           style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
//           placeholder="E.g., Promotional, lifestyle"
//           placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
//           value={contentType}
//           onChangeText={setContentType}
//         />

//         <Text style={[styles.label, { color: textColor }]}>Content Calendar Details</Text>
//         <TextInput
//           style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
//           placeholder="E.g., Campaign for a new product, 7 days"
//           placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
//           value={calendarDetails}
//           onChangeText={setCalendarDetails}
//           multiline
//         />

//         <Button
//           title={loading ? 'Generating...' : 'Generate Content'}
//           onPress={generateContent}
//           color="#6200EE"
//           disabled={loading}
//         />
//       </View>

//       {response && (
//         <View style={[styles.responseCard, { backgroundColor: cardBackground }]}>
//           <Text style={[styles.title, { color: textColor }]}>Generated Content</Text>
//           <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: textColor }} />
//           <Text style={[styles.responseText, { color: textColor }]}>{response}</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   card: {
//     borderRadius: 10,
//     padding: 20,
//     margin: 10,
//     elevation: 5, // Android shadow
//     shadowOpacity: 0.3, // iOS shadow
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   responseCard: {
//     borderRadius: 10,
//     padding: 20,
//     margin: 10,
//     marginTop: 20,
//     elevation: 5,
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 10,
//     fontSize: 16,
//   },
//   responseText: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
// });

// export default ContentGenerator;