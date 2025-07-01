import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CastMemberCardProps {
  id: string;
  name: string;
  image: string;
  onPress?: () => void;
}

const CastMemberCard: React.FC<CastMemberCardProps> = ({ name, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.castMemberContainer} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.castImage} />
      </View>
      <Text style={styles.castName} numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CastMemberCard;

const styles = StyleSheet.create({
  castMemberContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
  },
  castImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  castName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
    minHeight: 32,
  },
});
