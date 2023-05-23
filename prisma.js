const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTask(taskData) {
  const task = await prisma.task.create({ data: taskData });
  return task;
}

async function getTasks() {
  const tasks = await prisma.task.findMany();
  return tasks;
}

async function updateTask(taskId, taskData) {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: taskData,
  });
  return task;
}

async function deleteTask(taskId) {
  const task = await prisma.task.delete({
    where: { id: taskId },
  });
  return task;
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

  