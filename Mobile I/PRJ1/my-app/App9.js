import React, { Component } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Switch
          value={this.state.status}
          onValueChange={(status) => this.setState({ status })}
          thumbColor='#ff0000'
        />
 
        <Text style={{marginTop: 20, fontSize: 25, fontWeight: 'bold'}}>{(this.state.status) ? "Ativo" : "Inativo"}</Text>
 
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slider: {
    width: 300,
    height: 40
  }
});