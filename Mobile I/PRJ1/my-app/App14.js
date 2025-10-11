import React from 'react';
import { statusBar } from 'expo-status-bar';
import { SafeAreaView, StatusBar } from 'react-native';

import Cesta from './src/screens/index';

export default function App(){
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar />
            <Cesta />
        </SafeAreaView>
    );
}