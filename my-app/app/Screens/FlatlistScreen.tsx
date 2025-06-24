import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  navigate: any;
  Home: undefined;
  Profile: undefined;
  Document: undefined;
  Calculator: undefined;
  Task: undefined;
  UseEffect: undefined;
  Login: undefined;
  Flatlist: undefined;
};

type FlatlistScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Flatlist'
>;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '1c9c4f9a-dfa2-42f4-b05c-8a6d831a2e34',
    title: 'Fourth Item',
  },
  {
    id: '7e33f2b1-50a4-43e7-a3fb-bf0a7c2b07d1',
    title: 'Fifth Item',
  },
  {
    id: 'b3ac5e76-bca4-46d9-86db-9b8b3ac4573e',
    title: 'Sixth Item',
  },
  {
    id: 'cb14c3f2-d19e-4e62-8af1-0842742b867c',
    title: 'Seventh Item',
  },
  {
    id: '4f2f0ac8-176b-4a8e-963b-8031e8944f22',
    title: 'Eighth Item',
  },
  {
    id: 'ac7ba9a6-7c35-4a35-98ea-1cc4a3886d3b',
    title: 'Ninth Item',
  },
  {
    id: 'b82766c3-c205-4f7d-b9ce-b5eec6e7bc33',
    title: 'Tenth Item',
  },
];


type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const FlatlistScreen: React.FC = () => {
  const navigation = useNavigation<FlatlistScreenNavigationProp>();

  return (
    
      <FlatList style={styles.container}
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />

  );
};

export default FlatlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
  },
});
