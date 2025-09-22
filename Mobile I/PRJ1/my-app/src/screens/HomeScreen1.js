import { View } from "react-native-web"
import { Text, Button } from "react-native"

export default function HomeScreen1 ({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen 1</Text>
            <Button
                title="Ir para Detalhes"
                onPress={() => navigation.navigate('Details', { itemId: 42 })}
            />
        </View>
    );
}