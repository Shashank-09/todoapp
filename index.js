const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended : false}));
app.use(bodyParser.json());

// Route to add a task
app.post('/tasks', (req, res) => {
    const { task,  completed = false   } = req.body; 
    
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

// Route to mark a task as complete or incomplete
app.put('/tasks/:id/complete', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body; // Expecting a boolean value for completed

  const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
  connection.query(query, [completed, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Task updated successfully', id, completed });
  });
});

// Route to edit a task description
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body; // New task description

  const query = 'UPDATE tasks SET task = ? WHERE id = ?';
  connection.query(query, [task, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Task updated successfully', id, task });
  });
});

// Route to filter tasks by completion status
app.get('/tasks/filter', (req, res) => {
  const { completed } = req.query; // "true" or "false"

  const query = 'SELECT * FROM tasks WHERE completed = ?';
  connection.query(query, [completed], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

// Route to mark a task as complete or incomplete
app.put('/tasks/:id/complete', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body; // Expecting a boolean value for completed
  
    const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
    connection.query(query, [completed, id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ message: 'Task updated successfully', id, completed });
    });
  });
  
  // Route to edit a task description
  app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body; // New task description
  
    const query = 'UPDATE tasks SET task = ? WHERE id = ?';
    connection.query(query, [task, id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ message: 'Task updated successfully', id, task });
    });
  });
  
  // Route to filter tasks by completion status
  app.get('/tasks/filter', (req, res) => {
    const { completed } = req.query; // "true" or "false"
  
    const query = 'SELECT * FROM tasks WHERE completed = ?';
    connection.query(query, [completed], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(results);
    });
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Issue: "Database connection issue"
// Prompt to Gen AI: "How do I troubleshoot a database connection error in Node.js with MySQL?"
// Solution: Gen AI suggested checking the database credentials and using a simple test script to verify the connection.


