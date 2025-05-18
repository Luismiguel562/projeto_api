import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/products');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Roboto, Arial, sans-serif',
      }}
    >
      {/* Sidebar esquerda */}
      <Box
        sx={{
          width: 240,
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: 2,
          boxShadow: 3,
        }}
      >
        <Box>
          <Avatar sx={{ bgcolor: '#1976d2', mb: 1 }}>U</Avatar>
          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
            Usuário
          </Typography>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Conteúdo principal */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 4,
          backgroundColor: '#f4f4f4',
        }}
      >
        <Typography variant="h4" gutterBottom color="text.primary">
          Lista de Produtos
        </Typography>

        {produtos.map((produto) => (
          <Card
            key={produto.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              p: 2,
              backgroundColor: '#fff',
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <Box sx={{ flex: 1, pr: 2 }}>
              <Typography variant="h6" color="text.primary">
                {produto.title}
              </Typography>
              <Typography variant="body2" sx={{ my: 1 }} color="text.secondary">
                {produto.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" fontWeight="bold" color="text.primary">
                  R$ {produto.price.toFixed(2)}
                </Typography>
                <IconButton color="primary" aria-label="adicionar ao carrinho">
                  <ShoppingCartIcon />
                </IconButton>
              </Box>
            </Box>

            <CardMedia
              component="img"
              image={produto.image}
              alt={produto.title}
              sx={{
                width: 100,
                height: 100,
                objectFit: 'contain',
              }}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Produtos;
