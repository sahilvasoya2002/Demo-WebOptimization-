import { useQueries } from '@tanstack/react-query';
import { fetchEpisode } from '../../../api/services';
import { extractIdFromApiUrl } from '../../../utils/url';

/**
 * useCharacterEpisodes Custom Hook
 * Fetches multiple episodes in parallel using React Query's useQueries.
 * Extracts individual IDs from episode API endpoints.
 * 
 * @param {string[]} episodeUrls - Array of episode API URLs to fetch.
 * @returns {object[]} - Query result array from TanStack React Query.
 */
export function useCharacterEpisodes(episodeUrls: string[]) {
  const ids = episodeUrls.map(extractIdFromApiUrl);

  return useQueries({
    queries: ids.map(id => ({
      queryKey: ['episode', id],
      queryFn: () => fetchEpisode(id),
      enabled: id > 0,
    })),
  });
}
