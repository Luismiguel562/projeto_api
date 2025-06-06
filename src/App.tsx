import { Routes, Route, Navigate } from 'react-router-dom';
import Produtos from './pages/Produtos';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
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
  )}

export default App;
