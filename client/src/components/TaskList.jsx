import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to view tasks.');
        setIsLoading(false);
        return;
      }

      const response = await axios.get('/tasks');
      
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else if (response.data && Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      } else {
        console.error('Unexpected response format:', response.data);
        setError('Unexpected data format received from server.');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      if (error.response && error.response.status === 401) {
        setError('Your session has expired. Please log in again.');
      } else {
        setError('Failed to fetch tasks. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post('/tasks', { title: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
      setShowAddTask(false);
    } catch (error) {
      console.error('Error creating task:', error);
      setError(error.response?.data?.message || 'Failed to create task. Please try again.');
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      const response = await axios.put(`/tasks/${id}`, { completed: !taskToUpdate.completed });
      setTasks(tasks.map(task => task._id === id ? response.data : task));
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleRemoveTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
      setError('Failed to remove task. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Task List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {!showAddTask ? (
        <div 
          onClick={() => setShowAddTask(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg text-center cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mb-6"
        >
          <span className="text-3xl mr-2">+</span> Add New Task
        </div>
      ) : (
        <div className="flex mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
            className="flex-grow mr-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreateTask}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition duration-300 ease-in-out"
          >
            Add Task
          </button>
        </div>
      )}

      {tasks.length > 0 ? (
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li key={task._id} className="flex items-center bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                {index + 1}
              </div>
              <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </span>
              <button
                onClick={() => handleToggleComplete(task._id)}
                className={`mr-2 px-4 py-2 rounded-lg transition duration-300 ease-in-out ${
                  task.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {task.completed ? 'Completed' : 'Mark Complete'}
              </button>
              <button
                onClick={() => handleRemoveTask(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-6">No tasks found. Click "Add New Task" to get started!</p>
      )}
    </div>
  );
}

export default TaskList;