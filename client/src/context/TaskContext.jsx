import { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../api/taskApi';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async (search = '', status = '') => {
    setLoading(true);
    try {
      const data = await api.fetchTasks(search, status);
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
    setLoading(false);
  };

  const addTask = async (taskData) => {
    await api.createTask(taskData);
    loadTasks();
  };

  const editTask = async (id, updatedData) => {
    await api.updateTask(id, updatedData);
    loadTasks(); 
  };

  const removeTask = async (id) => {
    setTasks(prev => prev.filter(t => t._id !== id));
    try {
      await api.deleteTask(id);
    } catch (error) {
      loadTasks();
    }
  };

  const moveTask = async (id, newStatus) => {
    setTasks(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));
    try {
      await api.updateTaskStatus(id, newStatus);
    } catch (error) {
      loadTasks(); 
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, loadTasks, addTask, editTask, removeTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);