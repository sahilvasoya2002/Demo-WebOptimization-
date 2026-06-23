import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchEpisode, fetchEpisodes } from '../../../api/services';
import { getNextPageFromUrl } from '../../../utils/url';

/**
 * useEpisodes Custom Hook
 * Fetches episodes in an infinite scroll paginated list.
 * 
 * @returns {object} - Infinite scroll query results from TanStack React Query.
 */
export function useEpisodes() {
  return useInfiniteQuery({
    queryKey: ['episodes'],
    queryFn: ({ pageParam }) => fetchEpisodes({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage => getNextPageFromUrl(lastPage.info.next),
  });
}

/**
 * useEpisode Custom Hook
 * Fetches details of a single episode by ID.
 * 
 * @param {number | null} id - The ID of the episode to fetch, or null if inactive.
 * @returns {object} - Query results from TanStack React Query.
 */
export function useEpisode(id: number | null) {
  return useQuery({
    queryKey: ['episode', id],
    queryFn: () => fetchEpisode(id as number),
    enabled: id !== null && id > 0,
  });
}
