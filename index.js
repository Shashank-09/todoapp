const express = require('express');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const pool = require('./db'); // Import the connection pool
const cors = require('cors');  // Add this line to import the cors module

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3001' })); 

// Route to add a task

app.post('/tasks', [
    body('task').isString().trim().notEmpty(),
    body('completed').isBoolean().optional(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { task, completed = false } = req.body;
    const query = 'INSERT INTO tasks (task, completed) VALUES (?, ?)';
  
    pool.query(query, [task, completed], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } 
      res.send({ id: result.insertId, task, completed });
    });
  });

// Route to get all tasks
app.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  pool.query(query, (err, results) => {
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
  pool.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Task deleted successfully' });
  });
});

// Route to mark a task as complete or incomplete
app.put('/tasks/:id/complete', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
  pool.query(query, [completed, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Task updated successfully', id, completed });
  });
});

// Route to edit a task description
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const query = 'UPDATE tasks SET task = ? WHERE id = ?';
  pool.query(query, [task, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Task updated successfully', id, task });
  });
});

// Route to filter tasks by completion status
app.get('/tasks/filter', (req, res) => {
    const { completed } = req.query;
  
    if (completed !== '1' && completed !== '0') {
      return res.status(400).send({ error: 'Invalid value for completed. Use "1" or "0".' });
    }
  
    const query = 'SELECT * FROM tasks WHERE completed = ?';
    const isCompleted = completed === '1' ? 1 : 0;
  
    // Use pool to query the database
    pool.query(query, [isCompleted], (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).send(err);
      }
      res.send(results);
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
