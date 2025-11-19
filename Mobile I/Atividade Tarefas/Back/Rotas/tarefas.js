const express = require("express");
const router = express.Router();

// Armazenamento em memória das tarefas
let tarefas = [];
let nextId = 1;

// POST /tarefas - criar nova tarefa
router.post("/tarefas", (req, res) => {
  const { descricao, status } = req.body;

  if (!descricao || !descricao.toString().trim()) {
    return res.status(400).json({ message: "Descrição é obrigatória." });
  }

  const tarefa = {
    id: nextId++,
    descricao: String(descricao),
    status: status === "completa" ? "completa" : "pendente",
  };

  tarefas.push(tarefa);
  res.status(201).json(tarefa);
});

// GET /tarefas - listar todas as tarefas
router.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
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
    return res
      .status(400)
      .json({
        message: "Ao menos um campo (descricao ou status) deve ser informado.",
      });
  }

  if (descricao) tarefas[idx].descricao = String(descricao);
  if (status)
    tarefas[idx].status = status === "completa" ? "completa" : "pendente";

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
