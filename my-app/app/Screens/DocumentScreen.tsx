import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button,ScrollView, StyleSheet, Text, View,   TouchableOpacity} from 'react-native'
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
     <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.title}>Javascript  Topics</Text>
       {TopicData.map((topic, index) => (
         <TouchableOpacity
           key={index}
           style={[styles.card, { backgroundColor: '#96add9' }]}
           onPress={() => console.log(`Selected Topic: ${topic.title}`)}
         >
           <Text style={styles.cardText}>{topic.title}</Text>
         </TouchableOpacity>
       ))}
     </ScrollView>
   )
}

export default DocumentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '300',
    textAlign: 'left',
    fontFamily: 'sans-serif',
  },
})
