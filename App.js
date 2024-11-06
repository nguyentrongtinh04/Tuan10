// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Screen01 from './Screen/Screen_01'
// import Screen02 from './Screen/Screen_02'
// import Screen03 from './Screen/Screen_03'


// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Screen01" >
//         <Stack.Screen name="Screen01" component={Screen01} options={{ headerShown: false }} />
//         <Stack.Screen name="Screen02" component={Screen02} options={{ headerShown: false }} />
//         <Stack.Screen name="Screen03" component={Screen03} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './Screen/store';
import AppNavigator from './Screen/AppNavigator'; // Điều hướng chính của ứng dụng

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}



