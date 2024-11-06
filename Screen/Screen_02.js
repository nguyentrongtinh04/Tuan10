import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, TextInput, Modal, Button, Picker } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './slices/authSlice';
import { addBike, editBike, deleteBike, fetchBikes } from './slices/bikeSlice';

const categories = ['All', 'Roadbike', 'Mountain'];

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

const Screen2 = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const bikes = useSelector((state) => state.bike.bikes); // Lấy dữ liệu từ Redux store
  const loading = useSelector((state) => state.bike.loading);
  const error = useSelector((state) => state.bike.error);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // add, edit
  const [selectedBike, setSelectedBike] = useState(null);
  const [bikeName, setBikeName] = useState('');
  const [bikePrice, setBikePrice] = useState('');
  const [bikeType, setBikeType] = useState('Roadbike');
  const [bikeImage, setBikeImage] = useState('xe1.png');
  const [bikeDescription, setBikeDescription] = useState('');
  const [bikeDiscount, setBikeDiscount] = useState('');
  const [bikeOriginalPrice, setBikeOriginalPrice] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchBikes());
    }, [dispatch])
  );

  const filteredBikes = bikes ? bikes.filter(bike =>
    (selectedCategory === 'All' ? true : bike.type === selectedCategory)
  ) : [];

  const handleAddBike = () => {
    setModalType('add');
    setBikeName('');
    setBikePrice('');
    setBikeType('Roadbike');
    setBikeImage('xe1.png');
    setBikeDescription('');
    setBikeDiscount('');
    setBikeOriginalPrice('');
    setModalVisible(true);
  };

  const handleEditBike = (bike) => {
    setModalType('edit');
    setSelectedBike(bike);
    setBikeName(bike.name);
    setBikePrice(bike.price.toString());
    setBikeType(bike.type);
    setBikeImage(bike.image);
    setBikeDescription(bike.description);
    setBikeDiscount(bike.discount.toString());
    setBikeOriginalPrice(bike.originalPrice.toString());
    setModalVisible(true);
  };

  const handleDeleteBike = async (bike) => {
    try {
      await dispatch(deleteBike(bike.id)).unwrap(); // Gọi dispatch từ bikeSlice
      Alert.alert('Thành công', 'Xe đạp đã được xóa.');
      dispatch(fetchBikes()); // Lấy lại danh sách xe đạp
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa xe đạp.');
    }
  };

  const handleSaveBike = async () => {
    const bikeData = {
      name: bikeName,
      price: parseFloat(bikePrice),
      type: bikeType,
      image: bikeImage,
      description: bikeDescription,
      discount: parseFloat(bikeDiscount),
      originalPrice: parseFloat(bikeOriginalPrice),
    };

    try {
      if (modalType === 'add') {
        await dispatch(addBike(bikeData)).unwrap(); // Dùng dispatch từ bikeSlice
        Alert.alert('Thành công', 'Xe đạp đã được thêm.');
      } else if (modalType === 'edit' && selectedBike) {
        await dispatch(editBike({ ...bikeData, id: selectedBike.id })).unwrap(); // Dùng dispatch cho edit
        Alert.alert('Thành công', 'Xe đạp đã được cập nhật.');
      }
      dispatch(fetchBikes()); // Lấy lại danh sách xe đạp
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu xe đạp.');
    }
  };


  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('LoginScreen');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text>Error fetching data...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.roleText}>Đăng nhập với quyền: {role === 'admin' ? 'Admin' : 'User'}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>The world's Best Bike</Text>

      <View style={styles.filterContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.filterButton}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCategory === category && styles.activeFilterButton,
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 400, width: '100%' }}>
        <FlatList
          data={filteredBikes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bikeCard}
              onPress={() => navigation.navigate('Screen3', { bike: item })}
            >
              <MaterialIcons
                name="favorite"
                size={24}
                color={item.heart ? 'red' : 'gray'}
                style={styles.heartIcon}
              />
              <Image source={getImage(item.image)} style={styles.bikeImage} />
              <Text style={styles.bikeName}>{item.name}</Text>
              <Text style={styles.bikePrice}>$ {item.price}</Text>

              {role === 'admin' && (
                <View style={styles.adminActions}>
                  <TouchableOpacity onPress={() => handleEditBike(item)}>
                    <MaterialIcons name="edit" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteBike(item)}>
                    <MaterialIcons name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>

      {role === 'admin' && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddBike}>
          <Text style={styles.addButtonText}>+ Thêm Xe Đạp</Text>
        </TouchableOpacity>
      )}

      {/* Modal để thêm/sửa xe đạp */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalType === 'add' ? 'Thêm Xe Đạp' : 'Sửa Xe Đạp'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên xe đạp"
              value={bikeName}
              onChangeText={setBikeName}
            />
            <TextInput
              style={styles.input}
              placeholder="Giá xe đạp"
              keyboardType="numeric"
              value={bikePrice}
              onChangeText={setBikePrice}
            />
            <TextInput
              style={styles.input}
              placeholder="Giá gốc"
              keyboardType="numeric"
              value={bikeOriginalPrice}
              onChangeText={setBikeOriginalPrice}
            />
            <TextInput
              style={styles.input}
              placeholder="Giảm giá (%)"
              keyboardType="numeric"
              value={bikeDiscount}
              onChangeText={setBikeDiscount}
            />
            <TextInput
              style={styles.input}
              placeholder="Mô tả xe đạp"
              value={bikeDescription}
              onChangeText={setBikeDescription}
            />
            <Picker
              selectedValue={bikeType}
              style={styles.input}
              onValueChange={(itemValue) => setBikeType(itemValue)}
            >
              <Picker.Item label="Roadbike" value="Roadbike" />
              <Picker.Item label="Mountain" value="Mountain" />
            </Picker>
            <Picker
              selectedValue={bikeImage}
              style={styles.input}
              onValueChange={(itemValue) => setBikeImage(itemValue)}
            >
              <Picker.Item label="Xe1" value="xe1.png" />
              <Picker.Item label="Xe2" value="xe2.png" />
              <Picker.Item label="Xe3" value="xe3.png" />
              <Picker.Item label="Xe4" value="xe4.png" />
            </Picker>
            <Button title="Lưu" onPress={handleSaveBike} />
            <Button title="Hủy" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingTop: 5,
  },
  roleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'pink',
  },
  activeFilterButton: {
    color: 'red',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#bbbbbb',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bikeCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#E941411A',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  bikeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  bikeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bikePrice: {
    fontSize: 14,
    color: 'black',
  },
  adminActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Screen2;



