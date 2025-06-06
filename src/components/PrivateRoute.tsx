import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        state={{ error: 'Você precisa estar logado para acessar esta página.' }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
