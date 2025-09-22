import React from 'react';
import { View } from 'react-native-web';
import { Text, Button } from 'react-native';

export default function DetailsScreen({ route }) {
    // Recebendo o parâmetro itemId da rota
    const { itemId } = route.params;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Tela de Detalhes</Text>
            <Text>Item ID: {itemId}</Text>
        </View>
    );
}
