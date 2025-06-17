// src/screens/HomeScreen.tsx

import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DocumentScreen from '../Screens/DocumentScreen';

export type RootStackParamList = {
  navigate: any;
  Home: undefined;
  Profile: undefined;
  Document: undefined;
};


type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;


const topics = [
  { title: 'Student Profile', screen: 'Profile' },
  { title: 'JavaScript Basics', screen: 'Document' },
  { title: 'JavaScript Data Types', screen: 'Document' },
  { title: 'JavaScript Objects', screen: 'Document' },
]

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <View style={styles.container}>
      {topics.map(({ title, screen }, idx) => (
        <View key={idx} style={styles.buttonWrapper}>
          <Button
            title={title}
           onPress={() =>
              navigation.navigate(screen, screen === 'Document' ? { topic: title } : undefined)
            }
          />
        </View>
      ))}
    </View>
  )
};
export default HomeScreen;

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    marginVertical: 8,
  },
});
