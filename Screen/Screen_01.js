
// Screen1.js (LoginScreen)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from './slices/authSlice'; // Đảm bảo rằng bạn đã thiết lập authSlice cho việc xác thực

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      dispatch(login({ role: 'admin' })); // Đăng nhập với vai trò admin
      navigation.replace('Screen2'); // Chuyển đến màn hình cho admin
    } else if (username === 'user' && password === 'user123') {
      dispatch(login({ role: 'user' })); // Đăng nhập với vai trò user
      navigation.replace('Screen2'); // Chuyển đến màn hình cho user
    } else {
      Alert.alert('Thông tin không hợp lệ', 'Vui lòng nhập đúng tên người dùng và mật khẩu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
