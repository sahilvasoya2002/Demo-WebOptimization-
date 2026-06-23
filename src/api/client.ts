import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => Promise.reject(error),
);

export default apiClient;
