import { useQuery } from '@tanstack/react-query';
import useFetch from './useFetch';
import { fetchTripUpdates } from './api';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchTripUpdates,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
  });
}