import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class App extends Component {
    render (){
        return(
            <View style={{flex:1, backgroundColor: '#222'}}>
                <View style={{flex:1, backgroundColor: 'red'}}></View>
                <View style={{flex:1, backgroundColor: 'green'}}></View>
                <View style={{flex:2, backgroundColor: 'yellow'}}></View>
                <View style={{flex:3, backgroundColor: 'blue'}}></View>
                <View style={{flex:4, backgroundColor: 'purple'}}></View>
                <View style={{flex:25, backgroundColor: 'orange'}}></View>
                <View style={{flex:5, backgroundColor: 'pink'}}></View>
            </View>
        );
    }
}

export default App;