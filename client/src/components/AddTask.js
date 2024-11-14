import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ fetchTasks }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim() === '') return;

    try {
      await axios.post('http://localhost:3000/tasks', { task });
      setTask('');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
