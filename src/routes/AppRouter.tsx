import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Produtos from '../pages/Produtos';
import Login from '../pages/Login';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/produtos" replace />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
