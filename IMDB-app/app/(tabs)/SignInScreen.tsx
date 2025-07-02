import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen: React.FC= () => {

    const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        email: email,
        loginTime: new Date().toISOString(),
      };

      await AsyncStorage.setItem('userToken', 'dummy_jwt_token_123');
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      if (rememberMe) {
        await AsyncStorage.setItem('rememberMe', 'true');
        await AsyncStorage.setItem('rememberedEmail', email);
      } else {
        await AsyncStorage.removeItem('rememberMe');
        await AsyncStorage.removeItem('rememberedEmail');
      }

      Alert.alert('Success', `Welcome back! Logged in as: ${email}`, [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/');
          }
        }
      ]);

    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (): void => {
    Alert.alert('Forgot Password', 'Password reset functionality would go here');
    router.replace('/(tabs)/ForgetpwScreen');
  };

  const handleCreateAccount = (): void => {
    router.replace('/(tabs)/SignUpScreen');
  };

  const handleTermsOfUse = (): void => {
    Alert.alert('Terms of Use', 'Terms of Use would be displayed here');
  };

  const handlePrivacyNotice = (): void => {
    Alert.alert('Privacy Notice', 'Privacy Notice would be displayed here');
  };

  React.useEffect(() => {
    loadRememberedData();
  }, []);

  const loadRememberedData = async () => {
    try {
      const rememberMeStatus = await AsyncStorage.getItem('rememberMe');
      const rememberedEmail = await AsyncStorage.getItem('rememberedEmail');
      
      if (rememberMeStatus === 'true' && rememberedEmail) {
        setRememberMe(true);
        setEmail(rememberedEmail);
      }
    } catch (error) {
      console.error('Error loading remembered data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
      
     
      <View style={styles.header}>
        <Text style={styles.imdbLogo}>IMDb</Text>
      </View>

     
      <View style={styles.content}>
        <Text style={styles.title}>Sign in</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

      
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

       
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}
            disabled={isLoading}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword} disabled={isLoading}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

    
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Signing in...' : 'Login'}
          </Text>
        </TouchableOpacity>

      
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>New to IMDb?</Text>
          <View style={styles.dividerLine} />
        </View>

      
        <TouchableOpacity 
          style={[styles.createAccountButton, isLoading && styles.buttonDisabled]} 
          onPress={handleCreateAccount}
          disabled={isLoading}
        >
          <Text style={styles.createAccountButtonText}>Create Account</Text>
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
  buttonDisabled: {
    opacity: 0.6,
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
  createAccountButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createAccountButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
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

export default SignInScreen;




// import React, { useState } from 'react';
// import { useRouter } from 'expo-router';
// import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,} from 'react-native';

// const SignInScreen: React.FC= () => {

//     const router = useRouter();


//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [rememberMe, setRememberMe] = useState<boolean>(false);

//   const handleLogin = (): void => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     Alert.alert('Login', `Attempting to login with email: ${email}`);
//     router.replace('/');;
//   };

//   const handleForgotPassword = (): void => {
//     Alert.alert('Forgot Password', 'Password reset functionality would go here');
//     router.replace('/(tabs)/ForgetpwScreen');
//   };

//   const handleCreateAccount = (): void => {
//     router.replace('/(tabs)/SignUpScreen');
//   };

//   const handleTermsOfUse = (): void => {
//     Alert.alert('Terms of Use', 'Terms of Use would be displayed here');
//   };

//   const handlePrivacyNotice = (): void => {
//     Alert.alert('Privacy Notice', 'Privacy Notice would be displayed here');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
      
     
//       <View style={styles.header}>
//         <Text style={styles.imdbLogo}>IMDb</Text>
//       </View>

     
//       <View style={styles.content}>
//         <Text style={styles.title}>Sign in</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoCorrect={false}
//         />

      
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#999"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           autoCapitalize="none"
//           autoCorrect={false}
//         />

       
//         <View style={styles.optionsRow}>
//           <TouchableOpacity
//             style={styles.rememberMeContainer}
//             onPress={() => setRememberMe(!rememberMe)}
//           >
//             <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
//               {rememberMe && <Text style={styles.checkmark}>✓</Text>}
//             </View>
//             <Text style={styles.rememberMeText}>Remember Me</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleForgotPassword}>
//             <Text style={styles.forgotPasswordText}>Forgot password?</Text>
//           </TouchableOpacity>
//         </View>

    
//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginButtonText}>Login</Text>
//         </TouchableOpacity>

      
//         <View style={styles.dividerContainer}>
//           <View style={styles.dividerLine} />
//           <Text style={styles.dividerText}>New to IMDb?</Text>
//           <View style={styles.dividerLine} />
//         </View>

      
//         <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
//           <Text style={styles.createAccountButtonText}>Create Account</Text>
//         </TouchableOpacity>
//       </View>

      
//       <View style={styles.footer}>
//         <TouchableOpacity onPress={handleTermsOfUse}>
//           <Text style={styles.footerText}>Conditions of Use</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handlePrivacyNotice}>
//           <Text style={styles.footerText}>Privacy Notice</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     backgroundColor: '#F5C842',
//     paddingVertical: 40,
//     alignItems: 'center',
//   },
//   imdbLogo: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#CCCCCC',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     marginBottom: 15,
//     backgroundColor: '#FFFFFF',
//   },
//   optionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   rememberMeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: '#CCCCCC',
//     marginRight: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxChecked: {
//     backgroundColor: '#F5C842',
//     borderColor: '#F5C842',
//   },
//   checkmark: {
//     color: '#000000',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   rememberMeText: {
//     fontSize: 16,
//     color: '#000000',
//   },
//   forgotPasswordText: {
//     fontSize: 16,
//     color: '#0066CC',
//   },
//   loginButton: {
//     backgroundColor: '#F5C842',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   loginButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000000',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#CCCCCC',
//   },
//   dividerText: {
//     marginHorizontal: 15,
//     fontSize: 16,
//     color: '#666666',
//   },
//   createAccountButton: {
//     backgroundColor: '#000000',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   createAccountButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 200,
//     paddingHorizontal: 10,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#666666',
//   },
// });

// export default SignInScreen;


// import React from 'react';
// import { useRouter } from 'expo-router';
// import {View,Text,StyleSheet,SafeAreaView,StatusBar} from 'react-native';

// const HomeScreen: React.FC= () => {

//     const router = useRouter();


 

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
      
     
//       <View style={styles.header}>
//         <Text style={styles.imdbLogo}>IMDb</Text>
//       </View>

//       <View style={styles.content}>
//              <Text style={styles.title}>Home</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     backgroundColor: '#F5C842',
//     paddingVertical: 40,
//     alignItems: 'center',
//   },
//   imdbLogo: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#CCCCCC',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     marginBottom: 15,
//     backgroundColor: '#FFFFFF',
//   },
//   optionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   rememberMeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: '#CCCCCC',
//     marginRight: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxChecked: {
//     backgroundColor: '#F5C842',
//     borderColor: '#F5C842',
//   },
//   checkmark: {
//     color: '#000000',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   rememberMeText: {
//     fontSize: 16,
//     color: '#000000',
//   },
//   forgotPasswordText: {
//     fontSize: 16,
//     color: '#0066CC',
//   },
//   loginButton: {
//     backgroundColor: '#F5C842',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   loginButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#000000',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#CCCCCC',
//   },
//   dividerText: {
//     marginHorizontal: 15,
//     fontSize: 16,
//     color: '#666666',
//   },
//   createAccountButton: {
//     backgroundColor: '#000000',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   createAccountButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 200,
//     paddingHorizontal: 10,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#666666',
//   },
// });

// export default HomeScreen;