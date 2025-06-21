import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {Alert, ScrollView, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ImagesData from '../../utils/ImagesData'

type RootStackParamList = {
  navigate: any;
  Home: undefined;
  Profile: undefined;
  Document: undefined;
  Calculator: undefined;
  Task: undefined;
  UseEffect: undefined;
  Login: undefined;
}

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'Login'>

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>()

  return (
    <View style={styles.mainContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
        {ImagesData.map((image: { url: any; title: string }, index) => (
          <Image
            key={index}
            source={image.url}        
            accessibilityLabel={image.title}
            style={styles.foodImage} // Added missing style
          />
        ))}
      </ScrollView>
      
      <Text style={styles.title}>
        Find your next{"\n"}favorite dish with{"\n"}Tuza maza
      </Text>

      <Text style={styles.subtitle}>
        The overrated bakery and cafe in town.
      </Text> 

      <TouchableOpacity
        onPress={() => {
          Alert.alert("Hello!", "You Clicked the Login Button.");
        }}
        style={styles.buttonLog}
      >
        <Text style={styles.LogbtnText}>LOG IN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Alert.alert("Hello!", "You Clicked the Sign Up Button.");
        }}
        style={styles.buttonSignup}
      >
        <Text style={styles.SignUpbtnText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Alert.alert("Hello!", "You Clicked the Google Button.");
        }}
        style={styles.buttonGoogle} 
      >
        <Text style={styles.googleBtnText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    gap: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
   
  title: {
    fontSize: 45,
    fontWeight: '700',
    textAlign: 'left',
    color: '#333',
    fontFamily: 'calibri',
    marginTop: 0,  
    padding: 0,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'left',
    color: '#333',
    fontFamily: 'calibri',
    marginTop: 0,
    padding: 0,
  },

  buttonLog: {
    alignItems: "center",
    backgroundColor: "#5C1A1B",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 0,
  },

  buttonSignup: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5C1A1B",
    marginTop: 0,
  },

  buttonGoogle: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 0,
  },
  
  LogbtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: '600',
  },

  SignUpbtnText: {
    color: "#5C1A1B", // Fixed color and made it match the theme
    fontSize: 20,
    fontWeight: '600',
  },

  googleBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: "#333",
  },

  foodImage: {
    width: 80, 
    height: 80,
    borderRadius: 10, 
    marginRight: 10,
  }
});
