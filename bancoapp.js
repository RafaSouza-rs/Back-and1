const express = require('express');
const app = express();
const port = 3000;

const taskModel = require('./task.model');

app.use(express.json());

app.get('/tasks', async (req, res) => {
  const tasks = await taskModel.getTasks();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = req.body;
  const createdTask = await taskModel.createTask(task);
  res.status(201).json(createdTask);
});

app.put('/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskData = req.body;
  const updatedTask = await taskModel.updateTask(taskId, taskData);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ error: 'Tarefa não encontrada.' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  const deletedTask = await taskModel.deleteTask(taskId);
  if (deletedTask) {
    res.json(deletedTask);
  } else {
    res.status(404).json({ error: 'Tarefa não encontrada.' });
  }
});

app.listen(port);
