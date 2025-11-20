import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const API_BASE = "http://192.168.56.1:3000/api";

const HomeScreen = ({ navigation }) => {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pendente");
  const [savingId, setSavingId] = useState(null);
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
      setSavingId(item.id);
      const res = await axios.put(`${API_BASE}/tarefas/${item.id}`, {
        descricao: item.descricao,
        status: newStatus,
      });
      console.log("PUT /tarefas/:id response", res.data);
      await carregarTarefas();
    } catch (err) {
      console.error("Erro ao alterar status:", err);
      Alert.alert("Erro", "Falha ao alterar status da tarefa");
    } finally {
      setSavingId(null);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.desc}>{item.descricao}</Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.badgeText}>
              {formatStatusLabel(item.status)}
            </Text>
          </View>
        </View>
        <Text style={styles.status}>
          {String(item.observacao || item.status)}
        </Text>
      </View>
      <View style={styles.actions}>
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditarTarefa", { tarefa: item })
            }
            style={[styles.actionBtnSmall, { backgroundColor: "#4a148c" }]}
          >
            <Text style={styles.actionTextSmall}>Editar</Text>
          </TouchableOpacity>

          {String(item.status).toLowerCase() !== "em_processo" && (
            <TouchableOpacity
              onPress={() => handleChangeStatus(item, "em_processo")}
              style={[styles.actionBtnSmall, { backgroundColor: "#1976d2" }]}
              disabled={savingId === item.id}
            >
              {savingId === item.id ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.actionTextSmall}>Em processo</Text>
              )}
            </TouchableOpacity>
          )}

          {String(item.status).toLowerCase() !== "completa" && (
            <TouchableOpacity
              onPress={() => handleChangeStatus(item, "completa")}
              style={[styles.actionBtnSmall, { backgroundColor: "#388e3c" }]}
              disabled={savingId === item.id}
            >
              {savingId === item.id ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.actionTextSmall}>Concluir</Text>
              )}
            </TouchableOpacity>
          )}

          {String(item.status).toLowerCase() === "completa" && (
            <TouchableOpacity
              onPress={() => handleChangeStatus(item, "pendente")}
              style={[styles.actionBtnSmall, { backgroundColor: "#6a1b9a" }]}
            >
              <Text style={styles.actionTextSmall}>Reabrir</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => handleDeletar(item.id)}
            style={[styles.actionBtnSmall, { backgroundColor: "#e53935" }]}
          >
            <Text style={styles.actionTextSmall}>Excluir</Text>
          </TouchableOpacity>
        </>
      </View>
    </View>
  );

  function getStatusColor(status) {
    const s = String(status || "").toLowerCase();
    if (s.includes("complet")) return "#2e7d32";
    if (s.includes("em_processo") || s.includes("em processo"))
      return "#1565c0";
    // treat paused/pausa/em_espera as pending
    return "#f57c00";
  }

  function formatStatusLabel(status) {
    const s = String(status || "").toLowerCase();
    if (s.includes("complet")) return "Concluída";
    if (s.includes("em_processo") || s.includes("em processo"))
      return "Em processo";
    return "Pendente";
  }
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
  tabActiveEmProcesso: {
    backgroundColor: "#1976d2",
    borderColor: "#0d47a1",
  },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 12,
    backgroundColor: "#fff",
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  actionBtnSmall: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 6,
    marginLeft: 6,
    minWidth: 70,
    alignItems: "center",
  },
  actionTextSmall: { color: "#fff", fontSize: 12, fontWeight: "600" },
  tabText: { fontSize: 16, color: "#333", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
});

export default HomeScreen;
