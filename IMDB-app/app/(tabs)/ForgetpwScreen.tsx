import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,} from 'react-native';

const ForgetpwScreen: React.FC= () => {

    const router = useRouter();


  const [email , setEmail] = useState<string>('');

  

  const handleEmail = (): void => {
    if (!email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

  };



  const handleContinue = (): void => {
    router.replace('/(tabs)/ResetpwScreen');
  };


  const handleBack = (): void => {
   Alert.alert('Back To Previous Screen');
   router.replace('/(tabs)/SignInScreen');

  };

  const handleTermsOfUse = (): void => {
    Alert.alert('Terms of Use', 'Terms of Use would be displayed here');
  };

  const handlePrivacyNotice = (): void => {
    Alert.alert('Privacy Notice', 'Privacy Notice would be displayed here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
      
     
      <View style={styles.header}>
        <Text style={styles.imdbLogo}>IMDb</Text>
      </View>

     
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.Subtitle}>To verify your email, We have sent a one Time Password (OTP) to abc123@gmail.com (Change)</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          onPress={handleEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

       
      
       
        <TouchableOpacity style={styles.ContinueButton} onPress={handleContinue}>
          <Text style={styles.ContinueButtonText}>Continue</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.BackButton} onPress={handleBack}>
          <Text style={styles.BackButtonText}>Back</Text>
        </TouchableOpacity>


      </View>

      
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleTermsOfUse}>
          <Text style={styles.footerText}>Conditions of Use</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrivacyNotice}>
          <Text style={styles.footerText}>Privacy Notice</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#F5C842',
    paddingVertical: 40,
    alignItems: 'center',
  },
  imdbLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 30,
    textAlign: 'center',
  },
  Subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 30,
    textAlign: 'center',
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F5C842',
    borderColor: '#F5C842',
  },
  checkmark: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rememberMeText: {
    fontSize: 16,
    color: '#000000',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#0066CC',
  },
  loginButton: {
    backgroundColor: '#F5C842',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 16,
    color: '#666666',
  },
  ContinueButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  ContinueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  BackButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  BackButtonText: {
    borderColor: '#CCCCCC',
    fontSize: 18,
    fontWeight: '600',
    color: '#0000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 200,
    paddingHorizontal: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default ForgetpwScreen;