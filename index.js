const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.isDone = req.body.isDone || task.isDone;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Não encontrada.' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json(deletedTask);
  } else {
    res.status(404).json({ error: 'Não encontrada.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando ${port}`);
});











