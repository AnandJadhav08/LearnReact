import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

type RootStackParamList = {
  navigate: any;
  Home: undefined;
  Profile: undefined;
  Document: undefined;
  Calculator: undefined;
  Task: undefined;
  UseEffect: undefined;
  Login: undefined;
  Flatlist: undefined;
  AsyncStorage: undefined;
};

type AsyncStorageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AsyncStorage'
>;

const AsyncStorageScreen: React.FC = () => {
  const navigation = useNavigation<AsyncStorageNavigationProp>();
  const [text, setText] = useState('');
  const [savedList, setSavedList] = useState<string[]>([]);

  const STORAGE_KEY = 'my_saved_list';

  const saveData = async () => {
    if (!text.trim()) {
      Alert.alert('Validation', 'Please enter some text');
      return;
    }

    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      const updatedList = [...list, text];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      setSavedList(updatedList);
      setText('');
      Alert.alert('Success', 'Data saved to list');
    } catch (err) {
      console.log('Failed to save:', err);
    }
  };

  const loadData = async () => {
    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      if (existing) {
        setSavedList(JSON.parse(existing));
      }
    } catch (err) {
      console.log('Failed to load:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Enter Something..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Save to AsyncStorage" onPress={saveData} />

      <Text style={styles.heading}>Saved Items:</Text>
      <FlatList
        data={savedList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{index + 1}. {item}</Text>
          </View>
        )}
        />
        </ScrollView>
    </View>
  );
};

export default AsyncStorageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
  },
});
