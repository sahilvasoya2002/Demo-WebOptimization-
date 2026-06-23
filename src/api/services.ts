import apiClient from './client';
import type {
  Character,
  CharacterGender,
  CharacterStatus,
  Episode,
  Location,
  PaginatedResponse,
} from '../types/api';

export interface CharacterQueryParams {
  name?: string;
  status?: CharacterStatus;
  gender?: CharacterGender;
  page?: number;
}

export interface PaginatedQueryParams {
  page?: number;
}

export async function fetchCharacters(
  params: CharacterQueryParams,
): Promise<PaginatedResponse<Character>> {
  const { data } = await apiClient.get<PaginatedResponse<Character>>(
    '/character',
    { params },
  );
  return data;
}

export async function fetchCharacter(id: number): Promise<Character> {
  const { data } = await apiClient.get<Character>(`/character/${id}`);
  return data;
}

export async function fetchEpisodes(
  params: PaginatedQueryParams,
): Promise<PaginatedResponse<Episode>> {
  const { data } = await apiClient.get<PaginatedResponse<Episode>>(
    '/episode',
    { params },
  );
  return data;
}

export async function fetchEpisode(id: number): Promise<Episode> {
  const { data } = await apiClient.get<Episode>(`/episode/${id}`);
  return data;
}

export async function fetchLocations(
  params: PaginatedQueryParams,
): Promise<PaginatedResponse<Location>> {
  const { data } = await apiClient.get<PaginatedResponse<Location>>(
    '/location',
    { params },
  );
  return data;
}

export async function fetchLocation(id: number): Promise<Location> {
  const { data } = await apiClient.get<Location>(`/location/${id}`);
  return data;
}
