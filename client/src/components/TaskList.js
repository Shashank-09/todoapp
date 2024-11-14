import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import AddTask from './AddTask';  

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <AddTask fetchTasks={fetchTasks} /> 
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
