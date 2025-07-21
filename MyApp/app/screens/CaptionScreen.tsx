import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CaptionGenerator from '@/components/CaptionGenerator';

const CaptionScreen = () => {
  const backgroundColor = '#FFFFFF';
  const isDarkMode = false;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5' }]}>
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <CaptionGenerator />
      </SafeAreaView>
    </ScrollView>
  );
};

export default CaptionScreen;

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    marginTop: 50 },

});
