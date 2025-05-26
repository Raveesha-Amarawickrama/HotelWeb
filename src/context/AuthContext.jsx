// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create context with default values
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: () => Promise.resolve({ success: false }),
  register: () => Promise.resolve({ success: false }),
  logout: () => {},
  setUser: () => {}
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  // Simulated auth check
  useEffect(() => {
    const checkAuth = () => {
      // Simulate user authentication
      setAuthState({
        isAuthenticated: true,
        user: { name: "Test User" },
        loading: false
      });
    };
    checkAuth();
  }, []);

  // Dummy auth functions
  const login = async () => {
    setAuthState({
      isAuthenticated: true,
      user: { name: "Logged In User" },
      loading: false
    });
    return { success: true };
  };

  const register = async () => {
    return { success: true };
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  const setUser = (user) => {
    setAuthState((prev) => ({
      ...prev,
      user,
      isAuthenticated: !!user
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
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
