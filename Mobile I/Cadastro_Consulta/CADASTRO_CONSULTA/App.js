// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroScreen from './screens/CadastroScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import HomeScreen from './screens/HomeScreen'; // Import da nova tela

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Página Inicial' }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Consulta" component={ConsultaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
