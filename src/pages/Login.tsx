import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('johnd');
  const [password, setPassword] = useState('m38rmF$');
  const [rememberMe, setRememberMe] = useState(false);
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
    <>
      {/* Fundo azul escuro com efeito sutil */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #0D1B2A, #1B263B)', // azul escuro
          overflow: 'hidden',
          zIndex: -1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-30%',
            left: '-30%',
            width: '160%',
            height: '160%',
            background:
              'radial-gradient(circle at 25% 25%, rgba(0,0,0,0.06) 0%, transparent 50%),' +
              'radial-gradient(circle at 75% 75%, rgba(0,0,0,0.06) 0%, transparent 50%)',
            animation: 'rotate 90s linear infinite',
            zIndex: -1,
          },
          '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      />

      <Container
        maxWidth="xs"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            bgcolor: '#fff',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            width: '100%',
            border: '3px solid #000',
            color: '#000',
            maxWidth: 400,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: { xs: 3, sm: 4 },
              color: '#000', // título preto
              letterSpacing: '1.5px',
            }}
          >
            AppStore
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
                    <PersonIcon sx={{ color: '#000' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& label': { color: '#000' }, // label preto
                '& input': { color: '#000' }, // texto do input preto
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#000' },
                  '&:hover fieldset': { borderColor: '#333' },
                  '&.Mui-focused fieldset': { borderColor: '#333' },
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
                    <LockIcon sx={{ color: '#000' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& label': { color: '#000' }, // label preto
                '& input': { color: '#000' }, // texto do input preto
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#000' },
                  '&:hover fieldset': { borderColor: '#333' },
                  '&.Mui-focused fieldset': { borderColor: '#333' },
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1,
                mb: 2,
                flexWrap: 'wrap',
                gap: 1,
                color: '#000', // texto preto para label e link
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                    sx={{ color: '#000', '&.Mui-checked': { color: '#333' } }}
                  />
                }
                label="Lembrar de mim"
                sx={{ color: '#000' }} // texto preto
              />
              <Link
                href="#"
                underline="hover"
                sx={{ fontSize: '0.9rem', color: '#000', fontWeight: 500 }}
              >
                Redefinir senha
              </Link>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                py: 1.6,
                backgroundColor: '#1E90FF',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#104E8B',
                },
                color: '#fff', // texto branco no botão
              }}
            >
              ENTRAR
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
