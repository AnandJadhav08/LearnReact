import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RatingStars = ({ rating }: { rating: number }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <FontAwesome
        key={i}
        name={i <= rating ? 'star' : 'star-o'}
        color="#facc15"
        size={16}
      />
    ))}
  </View>
);

export default RatingStars;
