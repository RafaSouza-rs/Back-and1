const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'usuario',
  password: 'senha',
  database: 'banco de dados',
});

connection.connect();

async function getTasks() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tasks';
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function createTask(task) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO tasks SET ?';
    connection.query(query, task, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({ id: result.insertId, ...task });
      }
    });
  });
}

async function updateTask(taskId, taskData) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE tasks SET ? WHERE id = ?';
    connection.query(query, [taskData, taskId], (error, result) => {
      if (error) {
        reject(error);
      } else if (result.affectedRows === 0) {
        resolve(null);
      } else {
        resolve({ id: taskId, ...taskData });
      }
    });
  });
}


async function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    connection.query(query, taskId, (error, result) => {
      if (error) {
        reject(error);
      } else if (result.affectedRows === 0) {
        resolve(null);
      } else {
        resolve({ id: taskId });
      }
    });
  });
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
