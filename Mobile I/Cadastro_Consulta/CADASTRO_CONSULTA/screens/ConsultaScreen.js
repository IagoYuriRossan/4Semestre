import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ConsultaScreen = () => {
  const [dados, setDados] = useState([]);

  const handleConsulta = async () => {
    try {
      const response = await axios.get('http://192.168.56.1:3000/api/consulta');
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao consultar dados:', error);
    }
  };

  const renderUserData = ({ item }) => {
    return (
      <View style={styles.userContainer}>
        <Text style={styles.userText}>Nome: {item.nome}</Text>
        <Text style={styles.userText}>Email: {item.email}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de Usuário</Text>
      <Button title="Consultar" onPress={handleConsulta} color="#03dac6" />

      <FlatList
        data={dados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUserData}
        style={styles.result}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    width: '80%',
  },
  userText: {
    fontSize: 16,
  },
});

export default ConsultaScreen;
