import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ConsultaScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnConsultar}
        onPress={() => alert('Consulta acionada!')}
      >
        <Text style={styles.btnText}>CONSULTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  btnConsultar: {
    backgroundColor: '#26a69a', // cor parecida com a da foto
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
