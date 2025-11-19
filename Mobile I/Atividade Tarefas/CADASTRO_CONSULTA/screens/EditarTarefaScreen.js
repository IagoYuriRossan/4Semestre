import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_BASE = 'http://192.168.56.1:3000/api';

const EditarTarefaScreen = ({ route, navigation }) => {
  const tarefaParam = route.params?.tarefa;
  const [id, setId] = useState(tarefaParam?.id ?? null);
  const [descricao, setDescricao] = useState(tarefaParam?.descricao ?? '');
  const [status, setStatus] = useState(tarefaParam?.status ?? 'pendente');

  useEffect(() => {
    if (tarefaParam) {
      setId(tarefaParam.id);
      setDescricao(tarefaParam.descricao || '');
      setStatus(tarefaParam.status || 'pendente');
    }
  }, [tarefaParam]);

  const handleAtualizar = async () => {
    if (!descricao.trim()) {
      Alert.alert('Validação', 'Descrição é obrigatória.');
      return;
    }

    try {
      await axios.put(`${API_BASE}/tarefas/${id}`, { descricao, status });
      Alert.alert('Sucesso', 'Tarefa atualizada');
      navigation.navigate('Home');
    } catch (err) {
      console.error('Erro ao atualizar:', err);
      Alert.alert('Erro', 'Falha ao atualizar tarefa');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarefa</Text>

      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />

      <View style={{ marginBottom: 12 }}>
        <Button title={status === 'pendente' ? 'Status: Pendente' : 'Status: Concluída'} onPress={() => setStatus(status === 'pendente' ? 'completa' : 'pendente')} />
      </View>

      <Button title="Atualizar" onPress={handleAtualizar} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  input: { height: 48, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12, backgroundColor: '#fff' },
});

export default EditarTarefaScreen;
