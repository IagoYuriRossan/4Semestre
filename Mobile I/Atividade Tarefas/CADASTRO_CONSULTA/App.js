// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import NovaTarefaScreen from './screens/NovaTarefaScreen';
import EditarTarefaScreen from './screens/EditarTarefaScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tarefas' }} />
        <Stack.Screen name="NovaTarefa" component={NovaTarefaScreen} options={{ title: 'Nova Tarefa' }} />
        <Stack.Screen name="EditarTarefa" component={EditarTarefaScreen} options={{ title: 'Editar Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
