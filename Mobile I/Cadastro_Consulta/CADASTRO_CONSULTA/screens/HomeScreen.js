// HomeScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Ir para Cadastro"
        onPress={() => navigation.navigate('Cadastro')}
        color="#6200ee"
      />
      <Button
        title="Ir para Consulta"
        onPress={() => navigation.navigate('Consulta')}
        color="#03dac6"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 20,
  },
});

export default HomeScreen;
