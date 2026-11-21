import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER } from '../utils/defaultData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('creatorpilot_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('creatorpilot_token') || 'mock_jwt_token_alex_rivera';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('creatorpilot_user') || true;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('creatorpilot_user', JSON.stringify(user));
      localStorage.setItem('creatorpilot_token', token || 'mock_jwt_token_alex_rivera');
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('creatorpilot_user');
      localStorage.removeItem('creatorpilot_token');
      setIsAuthenticated(false);
    }
  }, [user, token]);

  const login = (credentials, jwtToken = null) => {
    const loggedUser = {
      ...INITIAL_USER,
      email: credentials.email || INITIAL_USER.email,
      name: credentials.name || INITIAL_USER.name,
      channelName: credentials.channelName || INITIAL_USER.channelName
    };
    const generatedToken = jwtToken || `jwt_${Date.now()}_token`;
    setUser(loggedUser);
    setToken(generatedToken);
    setIsAuthenticated(true);
    return true;
  };

  const register = (data, jwtToken = null) => {
    const newUser = {
      ...INITIAL_USER,
      id: `usr_${Date.now()}`,
      name: data.name || "New Creator",
      email: data.email,
      channelName: data.channelName || "My Channel",
      niche: data.niche || "General",
      platform: data.platform || "YouTube",
      preferredLanguage: data.preferredLanguage || "English",
      joinedDate: "Today"
    };
    const generatedToken = jwtToken || `jwt_${Date.now()}_token`;
    setUser(newUser);
    setToken(generatedToken);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('creatorpilot_user');
    localStorage.removeItem('creatorpilot_token');
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
