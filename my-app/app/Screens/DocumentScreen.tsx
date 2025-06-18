import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button,ScrollView, StyleSheet, Text, View } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import TopicData from '../../utils/TopicData'

type RootStackParamList = {
  navigate: any;
  Home: undefined;
  Profile: undefined;
  Document: undefined;
}
type DocumentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'Document'>


const DocumentScreen: React.FC = () => {
  const navigation = useNavigation<DocumentScreenNavigationProp>()

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
        persistentScrollbar
      >
        {TopicData.map(({ title, screen }, idx) => (
          <View key={idx} style={styles.buttonWrapper}>
            <Button
              title={title}
              onPress={() =>
                navigation.navigate(
 'Document'
                )
              }
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default DocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
   scrollContent: {
    paddingVertical: 16,
  },
  buttonWrapper: {
    marginVertical: 8,
  },
})