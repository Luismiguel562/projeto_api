import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  Paper,
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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0D1B2A, #1B263B)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3, width: '100%', maxWidth: 400 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: "'Pacifico', cursive", color: '#0D1B2A' }}
        >
          AppStore
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#000' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#000' }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Lembrar-me"
            sx={{ mt: 1 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
          >
            ENTRAR
          </Button>

          <Box textAlign="center" mt={3}>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: '#0D1B2A',
                fontWeight: 'medium',
                fontSize: '0.95rem',
                transition: '0.3s',
                '&:hover': {
                  color: '#1E88E5',
                  fontWeight: 'bold',
                },
              }}
            >
              Esqueceu sua senha?
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
