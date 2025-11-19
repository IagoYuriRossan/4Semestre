import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const API_BASE = "http://192.168.56.1:3000/api";

const ConsultaScreen = ({ navigation }) => {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/tarefas`);
      setTarefas(res.data || []);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err.message || err);
      setTarefas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => carregar());
    carregar();
    return unsubscribe;
  }, [carregar, navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.desc}>{item.descricao}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Consultar Tarefas</Text>
        <Button title="Atualizar" onPress={carregar} />
      </View>

      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : (
        <FlatList
          data={tarefas}
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
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  desc: { fontSize: 16, fontWeight: "500" },
  status: { fontSize: 14, color: "#666" },
  loading: { textAlign: "center", marginTop: 20 },
  empty: { textAlign: "center", marginTop: 20, color: "#666" },
});

export default ConsultaScreen;
