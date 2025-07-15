import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Forgetpw: undefined;
  Verify: undefined;
  Resetpw: undefined;
};

type ResetpwNavProp = NativeStackNavigationProp<RootStackParamList, 'Resetpw'>;

const ResetpwScreen: React.FC= () => {

  const navigation = useNavigation<ResetpwNavProp>();

  const [newpw, setNewPw] = useState<string>('');
  const [confirmpw, setConfirmPw] = useState<string>('');


  const handleNewPassword = (): void => {
    if (!newpw || !confirmpw) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert('Login', `Attempting to New Password: ${newpw} and password: ${confirmpw}`);
  };

    const handleContinue = (): void => {
      // router.push('/SignInScreen');
      navigation.navigate('SignIn');
    };
  
  
    const handleBack = (): void => {
     Alert.alert('Back To Previous Screen');
    //  router.push('/SignInScreen');
         navigation.navigate('SignIn');
  
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
        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#999"
          value={newpw}
          onChangeText={setNewPw}
          onPress={handleNewPassword}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />

      
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          value={confirmpw}
          onChangeText={setConfirmPw}
          secureTextEntry
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
   subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
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
    marginBottom: 18,
    marginTop: 30,
  },
  ContinueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  BackButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderStartStartRadius: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  BackButtonText: {
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
    fontSize: 14,
    color: '#666666',
    textDecorationLine: "underline",

  },
});

export default ResetpwScreen;