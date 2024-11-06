// App.js hoặc AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import LoginScreen from './Screen_01'; // Đã chuyển thành màn hình đăng nhập
import Screen2 from './Screen_02';
import Screen3 from './Screen_03';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Screen2" component={Screen2}  options={{ headerShown: false }}  />
          <Stack.Screen name="Screen3" component={Screen3}  options={{ headerShown: false }}  />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
