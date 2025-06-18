
import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

// Ensure your RootStackParamList includes Calculator
type RootStackParamList = {
  Home: undefined
  Profile: undefined
  Document: { topic: string }
  Calculator: undefined
}

type CalcNavProp = NativeStackNavigationProp<RootStackParamList, 'Calculator'>

const CalculatorScreen: React.FC = () => {
  const navigation = useNavigation<CalcNavProp>()
  const [count, setCount] = useState(0)

  const addOne = () => setCount(prev => prev + 1)
  const subtractOne = () => setCount(prev => prev - 1)

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title="Add" onPress={addOne} />
        <Button title="Subtract" onPress={subtractOne} />
      </View>
      <View style={styles.backButton}>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  )
}

export default CalculatorScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  counter: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: 30,
    width: '60%',
  },
})
