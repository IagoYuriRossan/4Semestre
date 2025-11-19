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
  const [activeTab, setActiveTab] = useState("pendente");
  const STATUS_TABS = [
    { key: "pendente", label: "Pendente" },
    { key: "em_processo", label: "Em processo" },
    { key: "completa", label: "Concluídas" },
  ];

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

  const handleChangeStatus = async (item, newStatus) => {
    try {
      await axios.put(`${API_BASE}/tarefas/${item.id}`, {
        descricao: item.descricao,
        status: newStatus,
      });
      carregarTarefas();
    } catch (err) {
      console.error("Erro ao alterar status:", err);
      Alert.alert("Erro", "Falha ao alterar status da tarefa");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.desc}>{item.descricao}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <View style={styles.actions}>
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditarTarefa", { tarefa: item })
            }
            style={styles.actionBtn}
          >
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>
          {/* Quick status actions: show relevant buttons */}
          {String(item.status).toLowerCase() !== "em_processo" && (
            <TouchableOpacity
              onPress={() => handleChangeStatus(item, "em_processo")}
              style={[styles.actionBtn, { backgroundColor: "#1976d2" }]}
            >
              <Text style={styles.actionText}>Em processo</Text>
            </TouchableOpacity>
          )}
          {/* 'Pausar' foi removido; 'pausado' é tratado como 'pendente' */}
          {String(item.status).toLowerCase() !== "completa" && (
            <TouchableOpacity
              onPress={() => handleChangeStatus(item, "completa")}
              style={[styles.actionBtn, { backgroundColor: "#388e3c" }]}
            >
              <Text style={styles.actionText}>Concluir</Text>
            </TouchableOpacity>
          )}
          {String(item.status).toLowerCase() === "completa" && (
            <TouchableOpacity
              onPress={() => handleChangeStatus(item, "pendente")}
              style={[styles.actionBtn, { backgroundColor: "#6a1b9a" }]}
            >
              <Text style={styles.actionText}>Reabrir</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => handleDeletar(item.id)}
            style={[styles.actionBtn, { backgroundColor: "#e53935" }]}
          >
            <Text style={styles.actionText}>Excluir</Text>
          </TouchableOpacity>
        </>
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
        {STATUS_TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            onPress={() => setActiveTab(t.key)}
            style={[
              styles.tabBtn,
              activeTab === t.key &&
                (t.key === "completa"
                  ? styles.tabActiveCompletas
                  : styles.tabActiveAtivas),
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === t.key && styles.tabTextActive,
              ]}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : (
        <FlatList
          data={tarefas.filter((t) => {
            const s = String(t.status).toLowerCase();
            if (activeTab === "pendente")
              return (
                s === "pendente" ||
                s === "pausado" ||
                s === "pausa" ||
                s === "em_espera"
              );
            if (activeTab === "em_processo")
              return s === "em_processo" || s === "em processo";
            if (activeTab === "completa")
              return (
                s === "completa" ||
                s === "completo" ||
                s === "concluida" ||
                s === "concluido"
              );
            return true;
          })}
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

// note: handleChangeStatus agora está definido dentro do componente para permitir recarregar

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
  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tabActiveAtivas: {
    backgroundColor: "#2e7d32",
    borderColor: "#1b5e20",
  },
  tabActiveCompletas: {
    backgroundColor: "#1565c0",
    borderColor: "#0d47a1",
  },
  tabText: { fontSize: 16, color: "#333", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
});

export default HomeScreen;
