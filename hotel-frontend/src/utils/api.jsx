import React, { createContext, useState, useEffect } from 'react';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check if token exists in local storage
        const token = localStorage.getItem('token');
        
        if (token) {
          // Add token to headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user data
          const response = await api.get('/api/auth/user');
          
          if (response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        // If there's an error, clear local storage and reset auth state
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      
      // Add token to headers
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Set user and auth state
      setUser(response.data.user);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      return { error: error.response?.data?.message || 'Login failed. Please try again.' };
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      
      // Add token to headers
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Set user and auth state
      setUser(response.data.user);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      return { error: error.response?.data?.message || 'Registration failed. Please try again.' };
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    
    // Remove token from headers
    delete api.defaults.headers.common['Authorization'];
    
    // Reset auth state
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;