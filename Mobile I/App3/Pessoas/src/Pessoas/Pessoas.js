import React, { Component } from "react";
import { View, Text, StyleSheet, } from "react-native";
 
class Pessoas extends Component {
    render() {
        return(
            <View style={styles.areaPessoa}>
                <Text>Oláaa</Text>
                <Text style={styles.textoPessoa}>Nome: {this.props.data.nome}</Text>
                <Text style={styles.textoPessoa}>Idade: {this.props.data.idade}</Text>
                <Text style={styles.textoPessoa}>Email: {this.props.data.email}</Text>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    areaPessoa:{
        backgroundColor: '#008000',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 5
    },
    textoPessoa:{
        color: '#fff',
        fontSize: 16
    }
});
 
export default Pessoas;