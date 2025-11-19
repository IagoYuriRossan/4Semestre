const express = require("express");
const router = express.Router();

// Armazenamento em memória das tarefas
let tarefas = [];
let nextId = 1;

// Status permitidos e função utilitária para normalizar
// Aceita variantes como: "em processo", "em_processo", "em-processo", "EM PROCESSO"
const ALLOWED_STATUS = {
  pendente: "pendente",
  em_processo: "em_processo",
  pausado: "pausado",
  concluida: "concluida",
};

function normalizeStatus(raw) {
  if (raw === undefined || raw === null) return "pendente";
  // Normaliza: lowercase, trim e substituir caracteres não alfanuméricos por underscore
  const key = String(raw)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_");
  // alguns mapeamentos adicionais
  if (key === "concluido" || key === "completa" || key === "completo")
    return "concluida";
  if (key === "emprocesso" || key === "em_processo") return "em_processo";
  // retornar a correspondência direta se existir
  return ALLOWED_STATUS[key] || null;
}

// POST /tarefas - criar nova tarefa
router.post("/tarefas", (req, res) => {
  const { descricao, status } = req.body;

  if (!descricao || !descricao.toString().trim()) {
    return res.status(400).json({ message: "Descrição é obrigatória." });
  }

  const normalized = normalizeStatus(status);
  if (normalized === null) {
    return res.status(400).json({ message: "Status inválido." });
  }

  const tarefa = {
    id: nextId++,
    descricao: String(descricao),
    status: normalized,
  };

  tarefas.push(tarefa);
  res.status(201).json(tarefa);
});

// GET /tarefas - listar todas as tarefas (opcional: filter por status)
router.get("/tarefas", (req, res) => {
  const { status } = req.query;
  if (status) {
    const normalized = normalizeStatus(status);
    if (normalized === null) {
      return res.status(400).json({ message: "Status de filtro inválido." });
    }
    const filtered = tarefas.filter((t) => t.status === normalized);
    return res.status(200).json(filtered);
  }

  res.status(200).json(tarefas);
});

// GET /tarefas/counts - retornar contagem de tarefas por status
router.get("/tarefas/counts", (req, res) => {
  const counts = { pendente: 0, em_processo: 0, pausado: 0, concluida: 0 };
  tarefas.forEach((t) => {
    if (counts[t.status] !== undefined) counts[t.status]++;
  });
  res.status(200).json(counts);
});

// PUT /tarefas/:id - atualizar tarefa existente
router.put("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { descricao, status } = req.body;
  const idNum = parseInt(id, 10);

  const idx = tarefas.findIndex((t) => t.id === idNum);
  if (idx === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }

  if (!descricao && !status) {
    return res.status(400).json({
      message: "Ao menos um campo (descricao ou status) deve ser informado.",
    });
  }
  if (descricao) tarefas[idx].descricao = String(descricao);
  if (status) {
    const normalized = normalizeStatus(status);
    if (normalized === null) {
      return res.status(400).json({ message: "Status inválido." });
    }
    tarefas[idx].status = normalized;
  }

  res.status(200).json(tarefas[idx]);
});

// DELETE /tarefas/:id - remover tarefa
router.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);

  const idx = tarefas.findIndex((t) => t.id === idNum);
  if (idx === -1) {
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }

  tarefas.splice(idx, 1);
  res.status(200).json({ message: "Tarefa deletada com sucesso." });
});

module.exports = router;
