import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {Picker} from '@react-native-picker/picker';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pizza: 0,
            pizzas: [
                {key: '1', nome: 'Calabresa', valor: 32.50},
                {key: '2', nome: 'Marguerita', valor: 30.00},
                {key: '3', nome: 'Quatro Queijos', valor: 35.00},
                {key: '4', nome: 'Portuguesa', valor: 33.00},
                {key: '5', nome: 'Frango com Catupiry', valor: 34.00},
            ],
        };
    }

    render() {
        
        let pizzasItem = this.state.pizzas.map( (v, r) => {
            return <Picker.Item key={r} value={r} label={v.nome} />
        });

        return(
            <View style={styles.container}> 
                <Text style={styles.logo}>Menu Pizza</Text>

                <Picker
                    selectedValue={this.state.pizza}
                    onValueChange={(itemValue, itemIndex) => this.setState({pizza: itemValue})}
                >
                    {pizzasItem}
                </Picker>

                <Text style={styles.pizzas}>Voce escolheu: {this.state.pizzas[this.state.pizza].nome}</Text>
                <Text style={styles.pizzas}>Valor: R$ {this.state.pizzas[this.state.pizza].valor.toFixed(2)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 20,
        fontFamily: 'bold'
    },
    logo:{
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'bold'
    },
    pizzas:{
        fontSize: 20,
        margin: 5,
        fontFamily: 'bold'
    },
    item:{
        fontSize: 20,
        marginLeft: 10,
        fontFamily: 'bold'
    },
    Picker:{
        fontSize: 20,
        marginLeft: 10,
        fontFamily: 'bold'
    }   
});