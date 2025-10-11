import React from "react";
import { StatusBar, SafeAreaView, View } from "react-native";
import Cesta from './src/screens/Cesta/componentes/index';
import mock from './mocks/cesta';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Cesta {...mock} />
    </SafeAreaView>
  );
}