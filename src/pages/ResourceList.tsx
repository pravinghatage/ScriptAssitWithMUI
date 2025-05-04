import { useQuery } from '@tanstack/react-query';
import { fetchLaunches } from '../api/launches';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell,
   TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';



export default function ResourceList() {
  const { data, isLoading } = useQuery({
    queryKey: ['launches'],
    queryFn: fetchLaunches,
  });
  console.log(data, "data")
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
console.log(data,"datalaunching")
  const filtered = data?.filter((launch: any) =>
    launch.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
console.log(paginated,"filterd")
  const rows = paginated?.map((launch: any) => (
    <tr key={launch.id}>
      <td>
        {launch.name}
      </td>
      <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
      <td>{launch.success ? '✅' : '❌'}</td>
      <td>
        <Button variant="outlined" onClick={() => navigate(`/resources/${launch.id}`)}>
          View
        </Button>
      </td>
    </tr>
  ));

  return (
    <Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mb: 2,
          mr: 20,
          mt:2
        }}
      >
        <Typography variant="h5">SpaceX Launches Details</Typography>
        <TextField
          placeholder="Search by name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Success</TableCell>
              <TableCell>View Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>

 
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mt: 3,
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Typography>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
