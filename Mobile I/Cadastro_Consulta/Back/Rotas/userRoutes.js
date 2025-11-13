const express = require('express');
const router = express.Router();

// Armazenamento em memória (simulando um banco de dados)
let users = [];

// Rota para cadastro de usuário
router.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  console.log('Nome:', nome);
  console.log('Email:', email);
  console.log('Senha:', senha);

  // Validando os dados
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  // Criar novo usuário e adicionar ao array
  const newUser = { nome, email, senha };
  users.push(newUser);

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser });
});

// Rota para consulta de usuários (retornar todos os usuários cadastrados)
router.get('/consulta', (req, res) => {
  if (users.length === 0) {
    return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
  }

  res.status(200).json(users); // Retornando o array de usuários
});

//Rota para atualizar um usuário pelo id
router.put('/atualizar/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  // Encontrar o usuário pelo id
  const user = users.findIndex((user) => user.id === parseFloat.int(id));

  //verificar se o usuário existe
  if (user === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  //validar os dados
  if (!nome && !email && !senha) {
    return res.status(400).json({ message: 'Pelo menos um campo (nome, email ou senha) deve ser fornecido para atualização.' });
  }

  // Atualizar os dados do usuário
  users[userIndex] = { id: parseInt(id), nome, email, senha };
  res.status(200).json({ message: 'Usuário atualizado com sucesso.', user: users[user] });
});

// Rota para deletar um usuário pelo id
router.delete('/deletar/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  // Remover o usuário do array
  users.splice(userIndex, 1);
  res.status(200).json({ message: 'Usuário deletado com sucesso.' });
});

module.exports = router;
