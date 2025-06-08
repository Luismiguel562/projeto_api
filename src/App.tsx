import { Routes, Route, Navigate } from 'react-router-dom';
import Produtos from './pages/Produtos';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import React, { useState, useEffect } from 'react';
import { CssBaseline, GlobalStyles } from '@mui/material'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function updateStatus() {
      setIsOnline(navigator.onLine);
    }
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
          },
          html: {
            height: '100%',
          },
          body: {
            background: 'linear-gradient(135deg, #0D1B2A, #1B263B)',
            height: '100%',
          },
          '#root': {
            height: '100%',
          }
        }}
      />
      
      {!isOnline && (
        <div
          style={{
            background: '#f44336',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          Você está offline. Alguns dados podem estar desatualizados.
        </div>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <Produtos />
            </PrivateRoute>
          }
        />
        <Route
          path="/produtos/:id"
          element={
            <PrivateRoute>
              <ProductDetail />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
