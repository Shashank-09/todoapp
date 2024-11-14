import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(''); // Empty means no filter, '1' means completed, '0' means not completed

  useEffect(() => {
    fetchTasks();
  }, [filter]); // Fetch tasks whenever the filter changes

  const fetchTasks = async () => {
    try {
      let url = 'http://localhost:3000/tasks';
      if (filter) {
        url = `http://localhost:3000/tasks/filter?completed=${filter}`;
      }
      const response = await axios.get(url);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status); // Set the filter based on the user selection
  };

  return (
    <div className="task-list-container">
      <h2>To-Do List</h2>
      
      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('')} className="filter-button">All</button>
        <button onClick={() => handleFilterChange('1')} className="filter-button">Completed</button>
        <button onClick={() => handleFilterChange('0')} className="filter-button">Not Completed</button>
      </div>

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
