import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,KeyboardAvoidingView,Platform,ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormData =  {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
} ;
 
const SignUpScreen: React.FC = () => {

    const router = useRouter();
 
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      Alert.alert('Error', 'Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Email is required');
      return false;
    }
    if (!formData.password) {
      Alert.alert('Error', 'Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const tempUserData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
        isVerified: false,
      };

      await AsyncStorage.setItem('tempUserData', JSON.stringify(tempUserData));
      
      if (formData.rememberMe) {
        await AsyncStorage.setItem('rememberMe', 'true');
        await AsyncStorage.setItem('rememberedEmail', formData.email);
      }

      Alert.alert('Success', 'Account created successfully! Please verify your email.', [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/(tabs)/VerifyScreen');
          }
        }
      ]);

    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    Alert.alert('Google Sign Up', 'Google sign up functionality');
  
  };

  const handleFacebookSignUp = async () => {
    Alert.alert('Facebook Sign Up', 'Facebook sign up functionality');
    
  };

  const handleLogin = () => {
    router.replace('/(tabs)/SignInScreen');
  };

  const handleTermsOfUse = () => {
    Alert.alert('Terms of Use', 'Navigate to terms of use');
  };

  const handlePrivacyNotice = () => {
    Alert.alert('Privacy Notice', 'Navigate to privacy notice');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C518" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>IMDb</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Sign up</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                value={formData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => handleInputChange('rememberMe', !formData.rememberMe)}
              disabled={isLoading}
            >
              <View style={[styles.checkbox, formData.rememberMe && styles.checkboxChecked]}>
                {formData.rememberMe && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Remember Me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.createAccountButton, isLoading && styles.buttonDisabled]}
              onPress={handleCreateAccount}
              disabled={isLoading}
            >
              <Text style={styles.createAccountButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={[styles.socialButton, isLoading && styles.buttonDisabled]}
                onPress={handleGoogleSignUp}
                disabled={isLoading}
              >
                <Text style={styles.socialButtonText}>Sign up with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, isLoading && styles.buttonDisabled]}
                onPress={handleFacebookSignUp}
                disabled={isLoading}
              >
                <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginSection}>
              <View style={styles.divider} />
              <Text style={styles.alreadyHaveAccount}>Already have an Account?</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={handleTermsOfUse}>
                <Text style={styles.footerLinkText}>Conditions of Use</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePrivacyNotice}>
                <Text style={styles.footerLinkText}>Privacy Notice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#F5C518',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  inputContainer: {
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F5C518',
    borderColor: '#F5C518',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#666',
  },
  createAccountButton: {
    backgroundColor: '#F5C518',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  createAccountButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  socialButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  loginSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  alreadyHaveAccount: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 15,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  footerLinkText: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;


// import React, { useState } from 'react';
// import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,KeyboardAvoidingView,Platform,ScrollView,} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';


// type FormData =  {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   rememberMe: boolean;
// } ;
 


// const SignUpScreen: React.FC = () => {

//     const router = useRouter();
 
//   const [formData, setFormData] = useState<FormData>({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     rememberMe: false,
//   });

//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

//   const handleInputChange = (field: keyof FormData, value: string | boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const validateForm = (): boolean => {
//     if (!formData.username.trim()) {
//       Alert.alert('Error', 'Username is required');
//       return false;
//     }
//     if (!formData.email.trim()) {
//       Alert.alert('Error', 'Email is required');
//       return false;
//     }
//     if (!formData.password) {
//       Alert.alert('Error', 'Password is required');
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return false;
//     }
//     return true;
//   };

//   const handleCreateAccount = () => {
//     if (validateForm()) {
//       Alert.alert('Success', 'Account created successfully!');
//     }
//     router.replace('/(tabs)/VerifyScreen');
//   };

//   const handleGoogleSignUp = () => {
//     Alert.alert('Google Sign Up', 'Google sign up functionality');
//   };

//   const handleFacebookSignUp = () => {
//     Alert.alert('Facebook Sign Up', 'Facebook sign up functionality');
//   };

//   const handleLogin = () => {
//   router.replace('/(tabs)/SignInScreen');
//   };

//   const handleTermsOfUse = () => {
//     Alert.alert('Terms of Use', 'Navigate to terms of use');
//   };

//   const handlePrivacyNotice = () => {
//     Alert.alert('Privacy Notice', 'Navigate to privacy notice');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F5C518" />
      

//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>IMDb</Text>
//       </View>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoidingView}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.content}>
//             <Text style={styles.title}>Sign up</Text>

      
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Username"
//                 placeholderTextColor="#999"
//                 value={formData.username}
//                 onChangeText={(text) => handleInputChange('username', text)}
//                 autoCapitalize="none"
//                 autoCorrect={false}
//               />
//             </View>

      
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 placeholderTextColor="#999"
//                 value={formData.email}
//                 onChangeText={(text) => handleInputChange('email', text)}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//               />
//             </View>

      
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor="#999"
//                 value={formData.password}
//                 onChangeText={(text) => handleInputChange('password', text)}
//                 secureTextEntry={!showPassword}
//                 autoCapitalize="none"
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setShowPassword(!showPassword)}
//               >
//                 <Ionicons
//                   name={showPassword ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>

      
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Confirm Password"
//                 placeholderTextColor="#999"
//                 value={formData.confirmPassword}
//                 onChangeText={(text) => handleInputChange('confirmPassword', text)}
//                 secureTextEntry={!showConfirmPassword}
//                 autoCapitalize="none"
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 <Ionicons
//                   name={showConfirmPassword ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#999"
//                 />
//               </TouchableOpacity>
//             </View>

          
//             <TouchableOpacity
//               style={styles.checkboxContainer}
//               onPress={() => handleInputChange('rememberMe', !formData.rememberMe)}
//             >
//               <View style={[styles.checkbox, formData.rememberMe && styles.checkboxChecked]}>
//                 {formData.rememberMe && (
//                   <Ionicons name="checkmark" size={14} color="#fff" />
//                 )}
//               </View>
//               <Text style={styles.checkboxLabel}>Remember Me</Text>
//             </TouchableOpacity>

         
//             <TouchableOpacity
//               style={styles.createAccountButton}
//               onPress={handleCreateAccount}
//             >
//               <Text style={styles.createAccountButtonText}>Create Account</Text>
//             </TouchableOpacity>

        
//             <View style={styles.socialButtonsContainer}>
//               <TouchableOpacity
//                 style={styles.socialButton}
//                 onPress={handleGoogleSignUp}
//               >
//                 <Text style={styles.socialButtonText}>Sign up with Google</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.socialButton}
//                 onPress={handleFacebookSignUp}
//               >
//                 <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
//               </TouchableOpacity>
//             </View>

      
//             <View style={styles.loginSection}>
//               <View style={styles.divider} />
//               <Text style={styles.alreadyHaveAccount}>Already have an Account?</Text>
//               <View style={styles.divider} />
//             </View>

         
//             <TouchableOpacity
//               style={styles.loginButton}
//               onPress={handleLogin}
//             >
//               <Text style={styles.loginButtonText}>Login</Text>
//             </TouchableOpacity>

      
//             <View style={styles.footerLinks}>
//               <TouchableOpacity onPress={handleTermsOfUse}>
//                 <Text style={styles.footerLinkText}>Conditions of Use</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handlePrivacyNotice}>
//                 <Text style={styles.footerLinkText}>Privacy Notice</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     backgroundColor: '#F5C518',
//     paddingVertical: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#000',
//   },
//   inputContainer: {
//     marginBottom: 15,
//     position: 'relative',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//     color: '#000',
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 15,
//     top: 15,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: '#ddd',
//     borderRadius: 3,
//     marginRight: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxChecked: {
//     backgroundColor: '#F5C518',
//     borderColor: '#F5C518',
//   },
//   checkboxLabel: {
//     fontSize: 16,
//     color: '#666',
//   },
//   createAccountButton: {
//     backgroundColor: '#F5C518',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   createAccountButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   socialButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 25,
//   },
//   socialButton: {
//     backgroundColor: '#000',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     flex: 0.48,
//     alignItems: 'center',
//   },
//   socialButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   loginSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#ddd',
//   },
//   alreadyHaveAccount: {
//     fontSize: 14,
//     color: '#666',
//     marginHorizontal: 15,
//   },
//   loginButton: {
//     backgroundColor: '#000',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   loginButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   footerLinks: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingBottom: 20,
//   },
//   footerLinkText: {
//     fontSize: 12,
//     color: '#666',
//     textDecorationLine: 'underline',
//   },
// });

// export default SignUpScreen;