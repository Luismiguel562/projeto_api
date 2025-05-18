import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Produtos from './pages/Produtos';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/produtos"
        element={
          <PrivateRoute>
            <Produtos />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
