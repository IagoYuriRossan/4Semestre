const express = require("express");
const cors = require("cors");
const tarefasRoutes = require("./Rotas/tarefas");

const app = express();
const PORT = 3000;

app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rotas da API
app.use("/api", tarefasRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
