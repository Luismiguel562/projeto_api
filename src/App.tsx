import { Routes, Route, Navigate } from 'react-router-dom';
import Produtos from './pages/Produtos';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import React, { useState, useEffect } from 'react';

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
