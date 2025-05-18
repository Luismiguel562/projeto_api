import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate('/produtos');
    } catch {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 12,
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          border: '2px solid #1976d2', // contorno azul
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: '#000000', // texto preto
            fontWeight: 700,
            letterSpacing: '0.05em',
            mb: 4,
          }}
        >
          LOGIN
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 1, borderRadius: 1, fontWeight: 600 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.7,
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: 2,
              backgroundColor: '#1976d2',
              boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#115293',
                boxShadow: '0 6px 20px rgba(17, 82, 147, 0.6)',
              },
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
