import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchLocation, fetchLocations } from '../../../api/services';
import { getNextPageFromUrl } from '../../../utils/url';

/**
 * useLocations Custom Hook
 * Fetches locations in an infinite scroll paginated list.
 * 
 * @returns {object} - Infinite scroll query results from TanStack React Query.
 */
export function useLocations() {
  return useInfiniteQuery({
    queryKey: ['locations'],
    queryFn: ({ pageParam }) => fetchLocations({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage => getNextPageFromUrl(lastPage.info.next),
  });
}

/**
 * useLocation Custom Hook
 * Fetches details of a single location by ID.
 * 
 * @param {number} id - The ID of the location to fetch.
 * @returns {object} - Query results from TanStack React Query.
 */
export function useLocation(id: number) {
  return useQuery({
    queryKey: ['location', id],
    queryFn: () => fetchLocation(id),
    enabled: id > 0,
  });
}
