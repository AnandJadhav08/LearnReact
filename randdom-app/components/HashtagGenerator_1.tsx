import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, useColorScheme, Alert } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';

interface HashtagState {
    contentType: string;
    userNiche: string;
    photoDescription: string;
    hashtags: { highTraffic: string[]; lowCompetition: string[] };
    loading: boolean;
}

interface ApiResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

const HashtagGenerator_1: React.FC = () => {
    const [state, setState] = useState<HashtagState>({
        contentType: '',
        userNiche: '',
        photoDescription: '',
        hashtags: { highTraffic: [], lowCompetition: [] },
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
    const API_KEY = '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'              //Config.API_KEY;
    const API_URL = 'https://api.perplexity.ai/chat/completions'              //Config.API_URL;

    // Generate hashtags
    const generateHashtags = async (retryCount: number = 3) => {
        if (!API_KEY || !API_URL) {
            Alert.alert('Error', 'API_KEY or API_URL not configured in .env.');
            return;
        }
        if (!state.contentType || !state.userNiche) {
            Alert.alert('Error', 'Please provide content type and user niche.');
            return;
        }

        setState((prev) => ({ ...prev, loading: true }));
        try {
            const prompt = `
        Generate 10 social media hashtags for content type "${state.contentType}", user niche "${state.userNiche}", and photo described as "${state.photoDescription || 'N/A'}".
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
                max_tokens: 100,
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
        } catch (error: any) {
            if (retryCount > 0 && error.response?.status === 429) {
                setTimeout(() => generateHashtags(retryCount - 1), 1000);
            } else {
                Alert.alert('Error', `Failed to generate hashtags: ${error.message}`);
            }
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    // Copy hashtags
    const copyHashtags = (tags: string[]) => {
        Clipboard.setString(tags.join(', '));
        Alert.alert('Success', 'Hashtags copied to clipboard!');
    };

    const handleGeneratePress = () => {
        generateHashtags();
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5' }]}>
            <View style={[styles.card, { backgroundColor: cardBackground }]}>
                <Text style={[styles.title, { color: textColor }]}>Hashtag Generator</Text>
                <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: textColor }} />

                <Text style={[styles.label, { color: textColor }]}>Content Type</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
                    placeholder="E.g., Lifestyle, promotional"
                    placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
                    value={state.contentType}
                    onChangeText={(text) => setState((prev) => ({ ...prev, contentType: text }))}
                />

                <Text style={[styles.label, { color: textColor }]}>User Niche</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
                    placeholder="E.g., Fitness, fashion"
                    placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
                    value={state.userNiche}
                    onChangeText={(text) => setState((prev) => ({ ...prev, userNiche: text }))}
                />

                <Text style={[styles.label, { color: textColor }]}>Photo Description (Optional)</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: inputBackground, borderColor: inputBorderColor, color: textColor }]}
                    placeholder="E.g., A sunny beach"
                    placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
                    value={state.photoDescription}
                    onChangeText={(text) => setState((prev) => ({ ...prev, photoDescription: text }))}
                    multiline
                />

                <View style={styles.buttonContainer}>
                    <Button
                        title={state.loading ? 'Generating...' : 'Generate Hashtags'}
                        onPress={handleGeneratePress}
                        color="#6200EE"
                        disabled={state.loading}
                    />
                    {state.loading && <ActivityIndicator size="small" color="#6200EE" style={{ marginTop: 10 }} />}
                </View>
            </View>

            {(state.hashtags.highTraffic.length > 0 || state.hashtags.lowCompetition.length > 0) && (
                <View style={[styles.responseCard, { backgroundColor: cardBackground }]}>
                    <Text style={[styles.title, { color: textColor }]}>Generated Hashtags</Text>
                    <View style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: textColor }} />
                    <Text style={[styles.responseText, { color: textColor }]}>High-Traffic: {state.hashtags.highTraffic.join(', ')}</Text>
                    <Button
                        title="Copy High-Traffic Hashtags"
                        onPress={() => copyHashtags(state.hashtags.highTraffic)}
                        color="#6200EE"
                    />
                    <Text style={[styles.responseText, { color: textColor }]}>Low-Competition: {state.hashtags.lowCompetition.join(', ')}</Text>
                    <Button
                        title="Copy Low-Competition Hashtags"
                        onPress={() => copyHashtags(state.hashtags.lowCompetition)}
                        color="#6200EE"
                    />
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

export default HashtagGenerator_1;