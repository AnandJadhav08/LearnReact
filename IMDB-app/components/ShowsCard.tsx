import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

type ShowsCardProps = {
  image: string;
  title: string;
  year?: string;
  onPress?: () => void;
};

const ShowsCard: React.FC<ShowsCardProps> = ({ image, title, year, onPress }) => {
  return (
    <TouchableOpacity style={styles.movieItem} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.movieImage} />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>
          {title} {year ? `(${year})` : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ShowsCard;

const styles = StyleSheet.create({
  movieItem: {
    width: '48%',
    marginBottom: 20,
  },
  movieImage: {
    width: '100%',
    height: 195,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  movieInfo: {
    marginTop: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
