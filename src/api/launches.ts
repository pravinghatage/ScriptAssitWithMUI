// src/api/spacex.ts
import axios from 'axios';

export const fetchLaunches = async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/launches');
  return response.data;
};
// src/api/spacex.ts
export const fetchLaunchById = async (id: string) => {
    const response = await axios.get(`https://api.spacexdata.com/v4/launches/${id}`);
    return response.data;
  };
  // src/api/spacex.ts
export const fetchRocketById = async (id: string) => {
    const response = await axios.get(`https://api.spacexdata.com/v4/rockets/${id}`);
    return response.data;
  };
  
  export const fetchLaunchpadById = async (id: string) => {
    const response = await axios.get(`https://api.spacexdata.com/v4/launchpads/${id}`);
    return response.data;
  };
  
