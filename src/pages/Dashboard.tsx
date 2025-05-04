import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box>
      <h1>Welcome to Dashboard</h1>
      <Typography> This is the only private component, all other components are part of the public routes and do not
         require logint</Typography>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
