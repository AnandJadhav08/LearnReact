import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Alert, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

export type RootStackParamList = {
  Home: undefined
  Profile: undefined
  Document: { topic: string }
  Calculator: undefined
  Task: undefined
  UseEffect: undefined
}

type UseEffectNavProp = NativeStackNavigationProp<RootStackParamList, 'UseEffect'>

const UseEffectScreen: React.FC = () => {
  const navigation = useNavigation<UseEffectNavProp>()
  
  // State variables to demonstrate different useEffect scenarios
  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [userData, setUserData] = useState<string>('')
  const [componentMountTime, setComponentMountTime] = useState<string>('')

  // 1. useEffect with empty dependency array - runs only once when component mounts
  useEffect(() => {
    console.log('✅ Component mounted at:', new Date().toLocaleTimeString())
    setComponentMountTime(new Date().toLocaleTimeString())
    
    // Cleanup function - runs when component unmounts
    return () => {
      console.log('❌ Component will unmount')
    }
  }, []) // Empty dependency array = runs only once

  // 2. useEffect with dependencies - runs when counter changes
  useEffect(() => {
    console.log('🔄 Counter changed to:', counter)
    
    if (counter > 0 && counter % 5 === 0) {
      Alert.alert('Milestone!', `Counter reached ${counter}!`)
    }
  }, [counter]) // Runs whenever counter changes

  // 3. useEffect with interval - runs when isRunning changes
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    
    if (isRunning) {
      console.log('⏰ Starting interval timer')
      interval = setInterval(() => {
        setCounter(prev => prev + 1)
      }, 1000) // Increment counter every second
    }
    
    // Cleanup function - clear interval when effect re-runs or component unmounts
    return () => {
      if (interval) {
        console.log('🛑 Clearing interval')
        clearInterval(interval)
      }
    }
  }, [isRunning]) // Runs when isRunning changes
  // 4. useEffect for simulating data fetching
  useEffect(() => {
    const fetchUserData = async () => {
      console.log('📡 Fetching user data...')
      
      // Simulate API call delay
      setTimeout(() => {
        setUserData('John Doe - React Native Developer')
        console.log('✅ User data fetched successfully')
      }, 2000)
    }
    
    fetchUserData()
  }, []) // Runs only once when component mounts

  // Helper functions
  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetCounter = () => {
    setCounter(0)
    setIsRunning(false)
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>useEffect Hook Examples</Text>
        
        {/* Component Mount Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Component Lifecycle</Text>
          <Text style={styles.info}>
            Component mounted at: {componentMountTime}
          </Text>
          <Text style={styles.description}>
            This demonstrates useEffect with empty dependency array - runs only once when component mounts.
          </Text>
        </View>

        {/* Counter Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. State-dependent Effect</Text>
          <Text style={styles.counterText}>Counter: {counter}</Text>
          <Text style={styles.description}>
            This useEffect runs whenever the counter value changes. It shows an alert every 5 counts.
          </Text>
        </View>

        {/* Timer Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Interval Timer</Text>
          <Text style={styles.info}>
            Timer Status: {isRunning ? '🟢 Running' : '🔴 Stopped'}
          </Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.startButton]} 
              onPress={startTimer}
              disabled={isRunning}
            >
              <Text style={styles.buttonText}>Start Timer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.stopButton]} 
              onPress={stopTimer}
              disabled={!isRunning}
            >
              <Text style={styles.buttonText}>Stop Timer</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, styles.resetButton]} 
            onPress={resetCounter}
          >
            <Text style={styles.buttonText}>Reset Counter</Text>
          </TouchableOpacity>
          
          <Text style={styles.description}>
            This demonstrates useEffect with cleanup. The interval is cleared when the component unmounts or when isRunning changes.
          </Text>
        </View>

        {/* Data Fetching Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Data Fetching</Text>
          <Text style={styles.info}>
            User Data: {userData || 'Loading...'}
          </Text>
          <Text style={styles.description}>
            This simulates fetching data when the component mounts. Check the console for logs.
          </Text>
        </View>

        {/* Navigation */}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.buttonText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  counterText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3498db',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  startButton: {
    backgroundColor: '#27ae60',
  },
  stopButton: {
    backgroundColor: '#e74c3c',
  },
  resetButton: {
    backgroundColor: '#f39c12',
    alignSelf: 'center',
  },
  backButton: {
    backgroundColor: '#34495e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default UseEffectScreen
