import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, fetchTasks }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${task.id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await axios.put(`http://localhost:3000/tasks/${task.id}/complete`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEdit = async () => {
    const newTask = prompt("Edit task description:", task.task);
    if (newTask && newTask.trim() !== task.task) {
      try {
        await axios.put(`http://localhost:3000/tasks/${task.id}`, {
          task: newTask,
        });
        fetchTasks();
      } catch (error) {
        console.error("Error editing task:", error);
      }
    }
  };

  return (
    <li>
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={handleToggleComplete}
      >
        {task.task}
      </span>
      <button className="edit-btn" onClick={handleEdit}>Edit</button>
<button className="delete-btn" onClick={handleDelete}>Delete</button>

    </li>
  );
};

export default TaskItem;
