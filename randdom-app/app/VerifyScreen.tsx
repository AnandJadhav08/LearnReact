import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,} from 'react-native';

const VerifyScreen: React.FC= () => {

    const router = useRouter();


  const [OTP, setOTP] = useState<string>('');

  

  const handleOTP = (): void => {
    if (!OTP) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

  };



  const handleContinue = (): void => {
  //  router.push('/(tabs)/HomeScreen');
  };


  const handleResendOTP = (): void => {
   Alert.alert('OTP Not Fetch Properly So Write According Logic')
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
        <Text style={styles.title}>Verify email address</Text>
        <Text style={styles.Subtitle}>To verify your email, We have sent a one Time Password (OTP) to abc123@gmail.com (Change)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP here"
          placeholderTextColor="#999"
          value={OTP}
          onChangeText={setOTP}
          onPress={handleOTP}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />

       
      
       
        <TouchableOpacity style={styles.ContinueButton} onPress={handleContinue}>
          <Text style={styles.ContinueButtonText}>Continue</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.ResendOTPButton} onPress={handleResendOTP}>
          <Text style={styles.ResendOTPButtonText}>Resend OTP</Text>
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

  ContinueButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 30,
  },
  ContinueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ResendOTPButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderStartStartRadius: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  ResendOTPButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 300,
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    textDecorationLine: "underline",
  },
});

export default VerifyScreen;