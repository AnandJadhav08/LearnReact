import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import HashtagGenerator from '@/components/HashtagGenerator';

const HashtagScreen = () => {
  const backgroundColor = '#FFFFFF';
  const isDarkMode = false;

  return (
     <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5' }]}>
       <SafeAreaView style={[styles.container, { backgroundColor }]}>
         <HashtagGenerator />
       </SafeAreaView>
     </ScrollView>
  );
};

export default HashtagScreen;

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    marginTop: 50 },

});
