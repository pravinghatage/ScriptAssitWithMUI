import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  fetchLaunchById,
  fetchRocketById,
  fetchLaunchpadById,
} from '../api/launches';
import { Box, Divider, Typography,Link, CircularProgress } from '@mui/material';
 

export default function ResourceDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    data: launch,
    isLoading,
  } = useQuery({
    queryKey: ['launch', id],
    queryFn: () => fetchLaunchById(id!),
    enabled: !!id,
  });
  
  const rocketId = launch?.rocket;
  const launchpadId = launch?.launchpad;
  
  const { data: rocket } = useQuery({
    queryKey: ['rocket', rocketId],
    queryFn: () => fetchRocketById(rocketId),
    enabled: !!rocketId,
  });
  
  const { data: launchpad } = useQuery({
    queryKey: ['launchpad', launchpadId],
    queryFn: () => fetchLaunchpadById(launchpadId),
    enabled: !!launchpadId,
  });
  

  if (isLoading) return <CircularProgress />;

  const {
    name,
    date_utc,
    success,
    details,
    links: { patch, webcast },
  } = launch;

  return (
    <Box sx={{ boxShadow: 1, borderRadius: 2, border: 1, padding: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2" color={success ? 'green' : 'red'}>
        {success ? 'Success' : 'Failure'}
      </Typography>
    </Box>

    <Typography variant="body2" color="text.secondary">
      {new Date(date_utc).toLocaleString()}
    </Typography>

    {patch?.large && (
      <Box mt={2} display="flex" justifyContent="center">
        <img src={patch.large} alt={`${name} mission patch`} width={200} />
      </Box>
    )}

    <Typography variant="body1" mt={2}>
      {details || 'No details available.'}
    </Typography>

    {webcast && (
      <Box mt={2}>
        <Link href={webcast} target="_blank" rel="noopener noreferrer">
          Watch Webcast
        </Link>
      </Box>
    )}

    {rocket && (
      <>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Rocket Info</Typography>
        <Typography variant="body2">{rocket.name}</Typography>
        <Typography variant="body2">{rocket.description}</Typography>
      </>
    )}

    {launchpad && (
      <>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Launchpad Info</Typography>
        <Typography variant="body2">{launchpad.name}</Typography>
        <Typography variant="body2">
          {launchpad.locality}, {launchpad.region}
        </Typography>
      </>
    )}
  </Box>
  );
}
