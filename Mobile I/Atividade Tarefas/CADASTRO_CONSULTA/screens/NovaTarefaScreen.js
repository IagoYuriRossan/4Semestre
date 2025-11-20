import React, { useState } from "react";
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

const NovaTarefaScreen = ({ navigation }) => {
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("pendente");
  const [saving, setSaving] = useState(false);
  const STATUS_OPTIONS = [
    { key: "pendente", label: "Pendente" },
    { key: "em_processo", label: "Em processo" },
    { key: "completa", label: "Concluída" },
  ];
  const handleSalvar = async () => {
    if (!descricao.trim()) {
      Alert.alert("Validação", "Descrição é obrigatória.");
      return;
    }

    try {
      setSaving(true);
      const res = await axios.post(`${API_BASE}/tarefas`, {
        descricao,
        status,
      });
      // navigate to Home and show feedback banner there
      setDescricao("");
      setStatus("pendente");
      navigation.navigate("Home", {
        feedbackMessage: "Tarefa adicionada",
        feedbackType: "success",
      });
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
      Alert.alert("Erro", "Falha ao criar tarefa");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Tarefa</Text>

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <View style={styles.statusRow}>
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
        onPress={handleSalvar}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveBtnText}>Salvar</Text>
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
  statusRow: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
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

export default NovaTarefaScreen;
