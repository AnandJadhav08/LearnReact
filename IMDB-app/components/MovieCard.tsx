import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


type MovieCardProps = {
  image: string;
  title: string;
  onPress?: () => void;
};

const MovieCard: React.FC<MovieCardProps> = ({ title,image, onPress }) => {
  return (
    <View>
    <TouchableOpacity style={styles.movieCard}>
     <Image source={{ uri: image }} style={styles.movieImage} />
     <Text style={styles.movieTitle}>{title}</Text>
   </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    elevation: 2,
  },
  poster: {
    width: 100,
    height: 150,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
moviesScroll: {
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
  },
  movieCard: {
    marginRight: 10,
    width: 135,
    height: 190,
    backgroundColor: '#FFFFFF',
  },
  movieImage: {
    width: 120,
    height: 170,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'left',
    lineHeight: 16,
  },
});

export default MovieCard;
