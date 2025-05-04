import { isAuthenticated, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Box,Link  } from '@mui/material';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    
    <Box sx={{ padding: 2, backgroundColor: "grey.400" }}>
 
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
 
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="/" sx={{ color: 'blue' }}>
          Home
        </Link>
        <Link href="/resources" sx={{ color: 'blue' }}>
          Resources
        </Link>
        {isAuth && (
          <Link href="/dashboard" sx={{ color: 'blue' }}>
            Dashboard
          </Link>
        )}
      </Box>

 
      <Box sx={{ display: 'flex',ml:"20px" }}>
        {!isAuth ? (
          <Link href="/login" sx={{ color: 'blue' }}>
            Dashboard
          </Link>
        ) : (
          ''
        )}
      </Box>
    </Box>
  </Box>
  );
}
