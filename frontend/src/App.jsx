 import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import LoginPage from './All pages/Authentication/login/login';
import { PublicRoute } from './All pages/protectedRoutes';

function App() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', Arial, sans-serif",
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <Routes>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
