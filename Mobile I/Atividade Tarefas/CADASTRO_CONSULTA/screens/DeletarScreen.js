import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const API_BASE = "http://192.168.56.1:3000/api";

const DeletarScreen = ({ navigation }) => {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    if (!id) {
      Alert.alert("Erro", "O campo ID é obrigatório.");
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE}/tarefas/${id}`);
      Alert.alert("Sucesso", response.data?.message || "Tarefa deletada.");
      setId("");
      // voltar para Home ou atualizar
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      Alert.alert("Erro", "Falha ao deletar tarefa.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar Tarefa</Text>

      <TextInput
        style={styles.input}
        placeholder="ID da Tarefa"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <Button title="Deletar Tarefa" onPress={handleDelete} color="#e53935" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});

export default DeletarScreen;
