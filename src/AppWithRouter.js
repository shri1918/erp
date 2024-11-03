// src/AppWithRouter.js
import React from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import App from './App';

function AppWithRouter() {
  const navigate = useNavigate();

  return <App onNavigate={navigate} />;
}

export default function Root() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}
