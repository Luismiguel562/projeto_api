import { Routes, Route } from 'react-router-dom';
import Produtos from './pages/Produtos';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produtos/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
