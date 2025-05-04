import { useState } from 'react';
 
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';
import { Container, TextField, Typography,Box, Button } from '@mui/material';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container
    maxWidth="sm"
    sx={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Typography variant="body1" mb={2}>
        To access the dashboard, you need to log in
      </Typography>

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  </Container>
  );
}
