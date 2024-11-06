import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { toggleHeart } from './slices/bikeSlice';

const getImage = (imagePath) => {
  switch (imagePath) {
    case 'xe1.png':
      return require('../assets/xe01.png');
    case 'xe2.png':
      return require('../assets/xe02.png');
    case 'xe3.png':
      return require('../assets/xe03.png');
    case 'xe4.png':
      return require('../assets/xe04.png');
    default:
      return require('../assets/xe02.png');
  }
};

const Screen3 = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { bike } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.imgContainer}>
          <Image source={getImage(bike.image)} style={styles.image} />
        </View>
        <Text style={styles.title}>{bike.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.discount}>{bike.discount}% OFF</Text>
          <Text style={styles.originalPrice}>${bike.originalPrice}</Text>
          <Text style={styles.price}>${bike.price}</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{bike.description}</Text>

        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => dispatch(toggleHeart(bike))} style={styles.heartIconContainer}>
            <MaterialIcons
              name="favorite"
              size={30}
              color={bike.heart ? 'red' : 'gray'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
  },

  imgContainer: {
    backgroundColor: '#E941411A',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  discount: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 15,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  heartIconContainer: {
    padding: 10,
  },
  addToCartButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF4C4C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Screen3;
