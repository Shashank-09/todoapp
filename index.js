const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended : false}));
app.use(bodyParser.json());

// Route to add a task
app.post('/tasks', (req, res) => {
    const { task, completed = false } = req.body; 
    
    const query = 'INSERT INTO tasks (task, completed) VALUES (?, ?)';
    
    connection.query(query, [task, completed], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      
      res.send({ id: result.insertId, task, completed });
    });
  });

// Route to get all tasks
app.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

// Route to delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Task deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
