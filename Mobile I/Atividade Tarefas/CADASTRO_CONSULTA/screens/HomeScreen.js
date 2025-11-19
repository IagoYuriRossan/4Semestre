import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const API_BASE = "http://192.168.56.1:3000/api";

const HomeScreen = ({ navigation }) => {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ativas"); // 'ativas' | 'completas'

  const carregarTarefas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/tarefas`);
      setTarefas(res.data || []);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err.message || err);
      setTarefas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      carregarTarefas();
    });
    // carregar inicialmente
    carregarTarefas();
    return unsubscribe;
  }, [carregarTarefas, navigation]);

  const handleDeletar = async (id) => {
    try {
      await axios.delete(`${API_BASE}/tarefas/${id}`);
      Alert.alert("Sucesso", "Tarefa deletada");
      carregarTarefas();
    } catch (err) {
      console.error("Erro ao deletar:", err);
      Alert.alert("Erro", "Falha ao deletar tarefa");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.desc}>{item.descricao}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <View style={styles.actions}>
        {activeTab === "ativas" ? (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditarTarefa", { tarefa: item })
              }
              style={styles.actionBtn}
            >
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChangeStatus(item, "completa")}
              style={[styles.actionBtn, { backgroundColor: "#388e3c" }]}
            >
              <Text style={styles.actionText}>Completar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeletar(item.id)}
              style={[styles.actionBtn, { backgroundColor: "#e53935" }]}
            >
              <Text style={styles.actionText}>Excluir</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => handleChangeStatus(item, "pendente")}
              style={[styles.actionBtn, { backgroundColor: "#ffa000" }]}
            >
              <Text style={styles.actionText}>Reabrir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeletar(item.id)}
              style={[styles.actionBtn, { backgroundColor: "#e53935" }]}
            >
              <Text style={styles.actionText}>Excluir</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Tarefas</Text>
        <Button
          title="Nova Tarefa"
          onPress={() => navigation.navigate("NovaTarefa")}
        />
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity
          onPress={() => setActiveTab("ativas")}
          style={[styles.tabBtn, activeTab === "ativas" && styles.tabActive]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "ativas" && styles.tabTextActive,
            ]}
          >
            Ativas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("completas")}
          style={[styles.tabBtn, activeTab === "completas" && styles.tabActive]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "completas" && styles.tabTextActive,
            ]}
          >
            Completas
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : (
        <FlatList
          data={
            activeTab === "ativas"
              ? tarefas.filter(
                  (t) =>
                    String(t.status).toLowerCase() !== "completa" &&
                    String(t.status).toLowerCase() !== "complet"
                )
              : tarefas.filter(
                  (t) =>
                    String(t.status).toLowerCase() === "completa" ||
                    String(t.status).toLowerCase() === "complet"
                )
          }
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma tarefa encontrada.</Text>
          }
        />
      )}
    </View>
  );
};

// Adiciona função para alterar status rapidamente
const handleChangeStatus = async (item, newStatus) => {
  try {
    await axios.put(`${API_BASE}/tarefas/${item.id}`, {
      descricao: item.descricao,
      status: newStatus,
    });
    // força recarregar via evento de focus já existente — mas podemos recarregar diretamente
  } catch (err) {
    console.error("Erro ao alterar status:", err);
    Alert.alert("Erro", "Falha ao alterar status da tarefa");
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  desc: { fontSize: 16, fontWeight: "500" },
  status: { fontSize: 14, color: "#666" },
  actions: { flexDirection: "column", marginLeft: 12 },
  actionBtn: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 6,
  },
  actionText: { color: "#fff" },
  loading: { textAlign: "center", marginTop: 20 },
  empty: { textAlign: "center", marginTop: 20, color: "#666" },
});

export default HomeScreen;
