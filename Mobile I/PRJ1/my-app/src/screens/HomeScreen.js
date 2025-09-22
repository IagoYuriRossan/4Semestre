import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Inicial</Text>

      <TouchableOpacity
        style={styles.btnCadastro}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.btnText}>IR PARA CADASTRO</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnConsulta}
        onPress={() => navigation.navigate('Consulta')}
      >
        <Text style={styles.btnText}>IR PARA CONSULTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  btnCadastro: {
    backgroundColor: '#6a1b9a', // Roxo
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnConsulta: {
    backgroundColor: '#26a69a', // Verde água
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
