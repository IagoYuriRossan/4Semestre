import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
 
import Pessoas from './src/Pessoas/Pessoas';
 
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [
              {id: '1', nome: 'Matheus', idade: 50, email: 'matheus@matheus.com'},
              {id: '2', nome: 'Thiago', idade: 33, email: 'thiago@thiago.com'},
              {id: '3', nome: 'Lucas', idade: 20, email: 'lucas@lucas.com'},
              {id: '4', nome: 'Henrique', idade: 21, email: 'henrique@henrique.com'},
              {id: '5', nome: 'Thiago', idade: 33, email: 'thiago@thiago.com'},
              {id: '6', nome: 'Lucas', idade: 20, email: 'lucas@lucas.com'},
              {id: '7', nome: 'JOSE', idade: 33, email: 'thiago@thiago.com'},
              {id: '8', nome: 'HENRIQUE', idade: 20, email: 'lucas@lucas.com'},
            ]
        };
    }
 
    render() {
        return(
          <View style={styles.container}>
 
            <FlatList
              data={this.state.lista}
              keyExtractor={(item) => item.id}
              renderItem={ ({item}) => <Pessoas data={item} /> }
            />
 
          </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container:{
        flex: 1
    }
});
 
export default App;