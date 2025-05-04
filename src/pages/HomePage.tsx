import { Box, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Box sx={{mt:"50px",p:"50px"}}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Script Assist Project
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
      "Navigate above dashboard you need to log in or browse public resources such as the mission details"
      </Typography>
    </Box>
  );
}
