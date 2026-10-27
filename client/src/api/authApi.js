import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Signup API Call
export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

// Login API Call
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};