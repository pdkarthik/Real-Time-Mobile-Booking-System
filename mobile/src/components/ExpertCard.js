import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ExpertCard = ({ expert, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: expert.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{expert.name}</Text>
        <Text style={styles.category}>{expert.category}</Text>
        <Text style={styles.details}>Experience: {expert.experience} years</Text>
        <Text style={styles.rating}>⭐ {expert.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: '#888',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f39c12',
    marginTop: 4,
  },
});

export default ExpertCard;
