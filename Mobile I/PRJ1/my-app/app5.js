import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class App extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'collow', alignItems: 'stretch', justifyContent: 'center'}}>

                <View style={{width: 50, height:50, backgroundColor: 'red'}}></View>
                <View style={{width: 50, height:100, backgroundColor: 'green'}}></View>
                <View style={{width: 50, height:150, backgroundColor: 'yellow'}}></View>
            </View>
        );
    }
}
export default App; 