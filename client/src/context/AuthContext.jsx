import { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, signupUser } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const signup = async (userData) => {
    const data = await signupUser(userData);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);