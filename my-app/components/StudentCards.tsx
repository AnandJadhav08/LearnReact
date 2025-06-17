import React from 'react';
import { Alert, View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

type StudentCardProps = {
  Name: string;
  Stream: string;
  Qualities: string;
  imageUri: any;
  description: string;
};

const StudentCards = ({ Name, Stream, Qualities, imageUri, description }: StudentCardProps) => (
  <View style={styles.wrapper}>
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        Alert.alert(`Hi, I'm ${Name}!`, `${Stream}\n${Qualities}\n\n${description}`);
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={imageUri} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{Name}</Text>
        <Text style={styles.subtitle}>{Stream}</Text>
        <Text style={styles.qualities}>{Qualities}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    margin: 10,
  },
  imageContainer: {
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes image circular
    borderWidth: 2,
    borderColor: '#4b9cd3',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 2,
  },
  qualities: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});

export default StudentCards;
