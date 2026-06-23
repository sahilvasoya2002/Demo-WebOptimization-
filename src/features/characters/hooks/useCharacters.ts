import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchCharacter, fetchCharacters } from '../../../api/services';
import type { CharacterGender, CharacterStatus } from '../../../types/api';
import { getNextPageFromUrl } from '../../../utils/url';

export interface UseCharactersFilters {
  name?: string;
  status?: CharacterStatus | '';
  gender?: CharacterGender | '';
}

/**
 * Fetches a list of characters with paginated infinite scroll and filters.
 */
export function useCharacters(filters: UseCharactersFilters) {
  const queryFilters = {
    name: filters.name || undefined,
    status: filters.status || undefined,
    gender: filters.gender || undefined,
  };

  return useInfiniteQuery({
    queryKey: ['characters', queryFilters],
    queryFn: ({ pageParam }) =>
      fetchCharacters({ ...queryFilters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage => getNextPageFromUrl(lastPage.info.next),
  });
}

/**
 * Fetches details for a single character.
 */
export function useCharacter(id: number) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
    enabled: id > 0,
  });
}
