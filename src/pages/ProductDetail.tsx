import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Rating,
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
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 5,
          minHeight: '100vh',
          backgroundColor: '#007bff',
        }}
      >
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    );
  }

  if (!produto) {
    return (
      <Box
        sx={{
          backgroundColor: '#007bff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="white" align="center">
          Produto não encontrado.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: 500,
        mx: 'auto',
        minHeight: '100vh',
        backgroundColor: '#0D1B2A',
        color: '#fff',
      }}
    >
      <Button
        variant="outlined"
        sx={{
          borderColor: '#fff',
          color: '#fff',
          mb: 2,
          '&:hover': { borderColor: '#ccc', color: '#ccc' },
        }}
        onClick={() => navigate(-1)}
      >
        VOLTAR
      </Button>

      <Card sx={{ borderRadius: 2 }}>
        <CardMedia
          component="img"
          image={produto.image}
          alt={produto.title}
          sx={{ objectFit: 'contain', height: 300, p: 2 }}
        />
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            {produto.title}
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
            <Typography variant="h6" color="primary">
              R${produto.price.toFixed(2).replace('.', ',')}
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#00bcd4', textTransform: 'none' }}
            >
              COMPRAR
            </Button>
          </Box>

          <Typography variant="subtitle1" fontWeight="bold">
            Descrição
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {produto.description}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.primary">
                Avaliações
              </Typography>
              <Rating value={4} readOnly size="small" />
            </Box>

            <Button size="small" sx={{ textTransform: 'none', color: '#00bcd4' }}>
              Ver avaliações &gt;
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
