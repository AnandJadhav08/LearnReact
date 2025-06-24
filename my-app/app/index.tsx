
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import DocumentScreen from './Screens/DocumentScreen';
import CalculatorScreen from './Screens/CalculatorScreen';
import TaskScreen from './Screens/TaskScreen';
import UseEffectScreen from './Screens/useEffectScreen';
import LoginScreen from './Screens/LoginScreen';
import FlatlistScreen from './Screens/FlatlistScreen';

export type RootStackParamList = {
  navigate: any;
  Home: undefined;
  Profile: undefined;
  Document: undefined;
  Calculator: undefined;
  Task:undefined;
  UseEffect:undefined;
  Login: undefined;
  Flatlist: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
   return (
 <Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="Document" component={DocumentScreen} />
  <Stack.Screen name="Calculator" component={CalculatorScreen}/>
  <Stack.Screen name="Task" component={TaskScreen}/>
  <Stack.Screen name="UseEffect" component={UseEffectScreen}/>
  <Stack.Screen name="Login" component={LoginScreen}/>
  <Stack.Screen name="Flatlist" component={FlatlistScreen}/>

 </Stack.Navigator>
 );
};


export default App;

// import { ScrollView, StyleSheet, View} from 'react-native';
// import StudentCards from '../../components/StudentCards';
// import students from '../../utils/StudentData';

// app1 // export default function Index() {
//   const images  = [
//     require('../assets/images/donut.jpg'),
//     require('../assets/images/pizza.jpg'),
//     require('../assets/images/tost.jpg'),
//     require('../assets/images/fish.jpg'),
//     require('../assets/images/cake.jpg'),
//     require('../assets/images/burger.jpg'),
//   ];

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "#fff",
//         padding: 20,
//         gap: 20,
//       }}
//     >
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
//         {images.map((image, index) => (
//           <Image key={index} source={image} style={styles.foodImage} />
//         ))}
//       </ScrollView>
      
     
//        <Text style={styles.title}>Find your next{"\n"}favorite dish with{"\n"}Tuza maza</Text>

//        <Text style={styles.subtitle}>The overrated bakery and cafe in town.</Text> 

//       <TouchableOpacity
//         onPress={() => {
//           Alert.alert("Hello!", "You Clicked the Login Button.");
//         }}
//         style={styles.buttonLog}
//       >
//          <Text  style={styles.LogbtnText}>LOG IN</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => {
//           Alert.alert("Hello!", "You Clicked the Login Button.");
//         }}
//         style={styles.buttonSignup}
//       >
//        <Text  style={styles.SignUpbtnText}>SIGN UP</Text>
//       </TouchableOpacity>

//        <TouchableOpacity
//         onPress={() => {
//           Alert.alert("Hello!", "You Clicked the Login Button.");
//         }}
//         style={styles.buttonGoogle} 
//       >
      
//        <Text  style={styles.SignUpbtnText}>Continue with Google</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },

//   imageContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
   
//   title: {
//     fontSize: 45,
//     fontWeight: '700',
//     textAlign: 'left',
//     color: '#333',
//     fontFamily: 'calibri',
//     marginTop: 0,  
//     padding:0,
//   },

//   subtitle: {
//     fontSize: 18,
//     fontWeight: '400',
//     textAlign: 'left',
//     color: '#333',
//     fontFamily: 'calibri',
//     marginTop: 0,
//     padding:0,
//   },

//   buttonLog: {
//     alignItems: "center",
//     backgroundColor: "#5C1A1B",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     marginTop: 0,
//   },

//   buttonSignup: {
//     alignItems: "center",
//     backgroundColor: "#ffff",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     borderWidth: 1,
//     marginTop: 0,
//   },

//   buttonGoogle: {
//     alignItems: "center",
//     backgroundColor: "#ffff",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     borderWidth: 1,
//     marginTop: 0,
//   },
  
//   LogbtnText: {
//     color: "#fff",
//     fontSize: 20,
//   },

//   SignUpbtnText: {
//     color: "#fffff",
//     fontSize: 20,
//     fontWeight: '600',
//   },

//   googleIcon: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: "#333",
//   },

//   foodImage: {
//     width: 80, 
//     height: 80,
//     borderRadius: 10, 
//     marginRight: 10,
//   }
// });


// app2 // export default function Index() {
//   return (
//     <View style={{ flex: 1, backgroundColor: '#4d4d4d', padding:0,height: '100%', width: '100%' }}>
//     <ScrollView contentContainerStyle={styles.container}>
//       {students.map((student) => (
//         <StudentCards
//         key={student.id}
//         Name={student.Name}
//         Stream={student.Stream}
//         Qualities={student.Qualities}
//         imageUri={student.imageUri}
//         description={student.description}
//         />
//       ))}
//     </ScrollView>
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     gap: 30,

//   },
  
// });