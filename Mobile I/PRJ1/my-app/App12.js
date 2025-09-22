import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen1';
import DetailsScreen from './src/screens/DetailsScreen'

// Criando o Stack Navigator
const Stack = createStackNavigator();

export default function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                {/* Definindo a tela do Home */}
                <Stack.Screen name="Home" component={Home1Screen}/>
                {/* Definindo a tela de Detalhes */}
                <Stack.Screen name="Details" component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { App };