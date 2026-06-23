import { useQueries } from '@tanstack/react-query';
import { fetchCharacter } from '../../../api/services';
import { extractIdFromApiUrl } from '../../../utils/url';

/**
 * useResidents Custom Hook
 * Fetches data for multiple residents (characters) in parallel using React Query's useQueries.
 * Extracts individual IDs from character API endpoints.
 * 
 * @param {string[]} residentUrls - Array of character API URLs to fetch.
 * @returns {object[]} - Query result array from TanStack React Query.
 */
export function useResidents(residentUrls: string[]) {
  const ids = residentUrls.map(extractIdFromApiUrl);

  return useQueries({
    queries: ids.map(id => ({
      queryKey: ['character', id],
      queryFn: () => fetchCharacter(id),
      enabled: id > 0,
    })),
  });
}
