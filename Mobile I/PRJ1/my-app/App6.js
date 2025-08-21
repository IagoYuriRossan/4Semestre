import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-web';

class App extends Component {
    constructor (props){
        super(props);
        this.state = {
            nome: 'Streve'
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}></TextInput>
                <Text style={styles.texto}>Bem Vindo</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#222',
        margin: 10,
        fontSize: 20,
        padding: 10,
    },
    texto: {
        textAlign: 'center',
        fontSize: 25,
    }
});

export default App;