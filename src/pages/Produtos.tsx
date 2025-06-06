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
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      // Se estiver online, tenta buscar da API
      if (navigator.onLine) {
        try {
          const response = await api.get('/products');
          setProdutos(response.data);
          // Salva no cache local para usar offline
          localStorage.setItem('produtosCache', JSON.stringify(response.data));
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
          // Se erro na API, tenta pegar do cache
          const cache = localStorage.getItem('produtosCache');
          if (cache) setProdutos(JSON.parse(cache));
        }
      } else {
        // Offline: busca do cache local
        const cache = localStorage.getItem('produtosCache');
        if (cache) {
          setProdutos(JSON.parse(cache));
        } else {
          // Se não tiver cache, avisa e limpa a lista
          setProdutos([]);
          console.warn('Nenhum dado em cache disponível');
        }
      }
    };

    fetchProdutos();

    // Opcional: ouvir mudanças na conexão para atualizar a lista
    function handleOnline() {
      fetchProdutos();
    }
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para o login após logout
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
        pb: '80px', // espaço para a barra inferior
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

      {/* Lista de produtos */}
      <Grid container spacing={2} sx={{ p: 2, pt: '80px' }}>
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
