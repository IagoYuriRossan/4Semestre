import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, ScrollView} from 'react-native';


class App extends Component{
    render(){

        let nome = 'João';

        return(
            <View style ={ {marginTop: 20}}>
                <Text style={styles.textoPrincipal}>Exemplo de texto principal</Text>
                <Text style={styles.textoSec}>Exemplo do segundo texto</Text>
                <Text style={styles.textoTerceiro}>Exemplo do terceiro texto</Text>
                <Text style={styles.textoQuarto}>Exemplo do quarto texto</Text>
            </View>
        )
};

};

const styles = StyleSheet.create({
    textoPrincipal: {
        fontSize: 25,
        color: 'green',
    },
    textoSec: {
        fontSize: 20,
        color: 'blue',
    },
    textoTerceiro: {
        fontSize: 15,
        color: 'red', 
    },
    textoQuarto: {
        fontSize: 10,
        color: 'purple',
    }
})  

export default App;