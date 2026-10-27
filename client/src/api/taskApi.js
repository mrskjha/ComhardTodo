import axios from 'axios';

const API_URL = ' https://comhardtodo.onrender.com/api/tasks';


const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user')); 
  const token = user?.token;
  
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// 1. GET 
export const fetchTasks = async (searchQuery = '', statusFilter = '') => {
  let query = '?';
  if (searchQuery) query += `search=${searchQuery}&`;
  if (statusFilter) query += `status=${statusFilter}`;

  const response = await axios.get(`${API_URL}${query}`, getAuthHeaders());
  return response.data;
};

// 2. CREATE 
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, getAuthHeaders());
  return response.data;
};

// 3. UPDATE 
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData, getAuthHeaders());
  return response.data;
};

// 4. DELETE Task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

// 5. UPDATE STATUS (Pipeline: Todo -> In Process -> Done)
export const updateTaskStatus = async (id, newStatus) => {
  const response = await axios.patch(`${API_URL}/${id}/status`, { newStatus }, getAuthHeaders());
  return response.data;
};

export const fetchTaskTimeline = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/timeline`, getAuthHeaders());
  return response.data;
};