import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Slider from "@react-native-community/slider";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valor: 0
        };
    }
    render() {
        return(
            <View style={styles.container}>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    onValueChange={valorSelecionado => this.setState({ valor: valorSelecionado })}
                    value={this.state.valor}
                    minimumTrackTintColor="#00FF00"
                    maximumTrackTintColor="#FF0000"
                />

                <Text style={{ textAlign: 'center', fontSize: 30 }}>
                    voce tem: {this.state.valor.toFixed(1)} KG
                    </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 20
    },
    logo:{
        textAlign: 'center',
        fontSize: 30
    }
});

export default App;
