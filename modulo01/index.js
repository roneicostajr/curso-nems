const express = require('express');

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  console.log(`URL chamada: ${req.url}`);
  return next();
});

function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Nome do curso é obrigatório' });
  }
  return next();
}

function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];
  if (!curso) {
    return res.status(400).json({ error: 'O curso não existe' });
  }

  req.curso = curso;
  return next();
}

const cursos = ['Node JS', 'JavaScript', 'React Native'];

server.get('/cursos', (req, res) => res.json(cursos));

//Listagem de um curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
  res.json({ curso: `Curso: ${req.curso}` });
});

//Criando um novo curso
server.post('/cursos', checkCurso, (req, res) => {
  const { name } = req.body;

  cursos.push(name);

  return res.json(cursos);
});

//Atualizando um curso
server.put('/cursos/:index', checkIndexCurso, checkCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

//Excluindo um curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);

  return res.json(cursos);
});

server.listen(3000);
