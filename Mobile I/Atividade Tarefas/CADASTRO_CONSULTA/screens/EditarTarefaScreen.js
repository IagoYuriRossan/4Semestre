import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const API_BASE = "http://192.168.56.1:3000/api";

const EditarTarefaScreen = ({ route, navigation }) => {
  const tarefaParam = route.params?.tarefa;
  const [id, setId] = useState(tarefaParam?.id ?? null);
  const [descricao, setDescricao] = useState(tarefaParam?.descricao ?? "");
  const [status, setStatus] = useState(tarefaParam?.status ?? "pendente");
  const [saving, setSaving] = useState(false);
  const STATUS_OPTIONS = [
    { key: "pendente", label: "Pendente" },
    { key: "em_processo", label: "Em processo" },
    { key: "completa", label: "Concluída" },
  ];

  useEffect(() => {
    if (tarefaParam) {
      setId(tarefaParam.id);
      setDescricao(tarefaParam.descricao || "");
      setStatus(tarefaParam.status || "pendente");
    }
  }, [tarefaParam]);

  const handleAtualizar = async () => {
    if (!descricao.trim()) {
      Alert.alert("Validação", "Descrição é obrigatória.");
      return;
    }

    try {
      setSaving(true);
      await axios.put(`${API_BASE}/tarefas/${id}`, { descricao, status });
      Alert.alert("Sucesso", "Tarefa atualizada");
      navigation.navigate("Home");
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      Alert.alert("Erro", "Falha ao atualizar tarefa");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarefa</Text>

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <View
        style={{
          marginBottom: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {STATUS_OPTIONS.map((s) => (
          <TouchableOpacity
            key={s.key}
            onPress={() => setStatus(s.key)}
            style={[
              styles.statusOption,
              status === s.key && styles.statusOptionActive,
            ]}
          >
            <Text
              style={[
                styles.statusOptionText,
                status === s.key && styles.statusOptionTextActive,
              ]}
            >
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleAtualizar}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveBtnText}>Atualizar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  statusOption: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
  },
  statusOptionActive: { backgroundColor: "#1976d2" },
  statusOptionText: { color: "#333" },
  statusOptionTextActive: { color: "#fff" },
  saveBtn: {
    marginTop: 8,
    backgroundColor: "#6200ee",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "700" },
});

export default EditarTarefaScreen;
