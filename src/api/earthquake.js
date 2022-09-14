import supabase from 'supabase';
import { useQuery } from '@tanstack/react-query';

const fetchEarthquakes = async (start, end) => {
  const { data, error } = await supabase
    .from('earthquakes')
    .select('magnitude,depth,lng,lat,datetime,location')
    .gte('datetime', start.toISOString())
    .lte('datetime', end.toISOString());
  if (error) {
    throw error;
  }

  return data;
};

export const useFetchEarthquakes = (start, end) => {
  return useQuery(['earthquakes', start, end], () =>
    fetchEarthquakes(start, end)
  );
};
