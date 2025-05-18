import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produtos from '../pages/Produtos';
import Login from '../pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
    </Router>
  );
};

export default App;
