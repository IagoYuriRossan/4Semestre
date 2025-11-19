import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_BASE = 'http://192.168.56.1:3000/api';

const NovaTarefaScreen = ({ navigation }) => {
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');

  const handleSalvar = async () => {
    if (!descricao.trim()) {
      Alert.alert('Validação', 'Descrição é obrigatória.');
      return;
    }

    try {
      await axios.post(`${API_BASE}/tarefas`, { descricao, status });
      Alert.alert('Sucesso', 'Tarefa adicionada');
      setDescricao('');
      setStatus('pendente');
      navigation.navigate('Home');
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
      Alert.alert('Erro', 'Falha ao criar tarefa');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Tarefa</Text>

      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />

      <View style={styles.statusRow}>
        <Button title={status === 'pendente' ? 'Status: Pendente' : 'Status: Concluída'} onPress={() => setStatus(status === 'pendente' ? 'completa' : 'pendente')} />
      </View>

      <Button title="Salvar" onPress={handleSalvar} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  input: { height: 48, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12, backgroundColor: '#fff' },
  statusRow: { marginBottom: 12 },
});

export default NovaTarefaScreen;
