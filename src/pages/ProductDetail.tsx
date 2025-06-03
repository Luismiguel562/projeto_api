import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import api from '../api/api';

interface Produto {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!produto) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="error">
          Produto não encontrado.
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Voltar
      </Button>

      <Card sx={{ p: 2 }}>
        <CardMedia
          component="img"
          image={produto.image}
          alt={produto.title}
          sx={{ height: 300, objectFit: 'contain' }}
        />
        <Typography variant="h5" mt={2}>
          {produto.title}
        </Typography>
        <Typography variant="h6" color="primary" mt={1}>
          R$ {produto.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" mt={2}>
          {produto.description}
        </Typography>
      </Card>
    </Box>
  );
};

export default ProductDetail;
