import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Produto {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      if (navigator.onLine) {
        try {
          const response = await api.get('/products');
          setProdutos(response.data);
          localStorage.setItem('produtosCache', JSON.stringify(response.data));
          setIsOffline(false);
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
          const cache = localStorage.getItem('produtosCache');
          if (cache) {
            setProdutos(JSON.parse(cache));
            setIsOffline(true);
          }
        }
      } else {
        const cache = localStorage.getItem('produtosCache');
        if (cache) {
          setProdutos(JSON.parse(cache));
        } else {
          setProdutos([]);
        }
        setIsOffline(true);
      }
    };

    fetchProdutos();

    const handleOnline = () => {
      setIsOffline(false);
      fetchProdutos();
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredProdutos = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProdutoClick = (id: number) => {
    navigate(`/produtos/${id}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        pt: 2,
        pb: '80px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header fixo */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          bgcolor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          px: 2,
          gap: 2,
          zIndex: 1300,
        }}
      >
        <IconButton
          aria-label="logout"
          onClick={handleLogout}
          color="primary"
          sx={{ mr: 1 }}
        >
          <LogoutIcon fontSize="medium" />
        </IconButton>

        <TextField
          placeholder="Pesquisar produtos..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Aviso Offline */}
      {isOffline && (
        <Box
          sx={{
            position: 'fixed',
            top: 60,
            left: 0,
            right: 0,
            bgcolor: '#FFF3CD',
            color: '#856404',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            p: 1,
            zIndex: 1400,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <WarningAmberIcon />
         Você está sem acesso à internet. Os produtos estão sendo exibidos no modo offline.
        </Box>
      )}

      {/* Lista de produtos */}
      <Grid container spacing={2} sx={{ p: 2, pt: isOffline ? '100px' : '80px' }}>
        {filteredProdutos.length === 0 ? (
          <Typography sx={{ p: 2 }} variant="body1" align="center" color="text.secondary">
            Nenhum produto encontrado ou sem conexão.
          </Typography>
        ) : (
          filteredProdutos.map((produto) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={produto.id}>
              <Card
                onClick={() => handleProdutoClick(produto.id)}
                sx={{ cursor: 'pointer', height: '100%' }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={produto.image}
                  alt={produto.title}
                  sx={{ objectFit: 'contain', p: 2 }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" noWrap>
                    {produto.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    R$ {produto.price.toFixed(2)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Barra inferior fixa */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          bgcolor: 'white',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1300,
        }}
      >
        <IconButton color="primary" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <IconButton color="primary" aria-label="carrinho">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton color="primary" aria-label="usuário">
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Produtos;
