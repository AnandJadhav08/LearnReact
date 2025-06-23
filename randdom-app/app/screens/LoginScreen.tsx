// screens/LoginScreen.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Role } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'> & {
  setRole: (role: Role) => void;
};

const LoginScreen: React.FC<Props> = ({ navigation, setRole }) => {
  const handleSelectRole = (selectedRole: Role) => {
    setRole(selectedRole);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Role</Text>
      <Button title="Student" onPress={() => handleSelectRole('student')} />
      <View style={styles.spacer} />
      <Button title="Teacher" onPress={() => handleSelectRole('teacher')} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  spacer: {
    height: 20,
  },
});
