// src/App.js
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/theme';
import DashboardLayout from './Dashboard/DashboardLayout';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';

function App({ onNavigate }) {
  const handleLogin = ({ username, password }) => {
    if (username === 'admin' && password === 'admin123') {
      console.log("Login successful");
      onNavigate('/'); // Use the passed navigate function to redirect
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
