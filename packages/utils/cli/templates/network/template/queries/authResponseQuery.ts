import { QueryFunction } from '@tanstack/react-query';
import { STORAGE_KEY } from '../utils/keys';
import { Storage } from '@novecirculos/secure-storage';
import { api } from '@novecirculos/api';
import { useQuery } from '@tanstack/react-query';
import { AuthResponse } from '../interfaces';
import { QUERY_KEY } from '../utils';
import { UseQueryWrapper } from '@novecirculos/query-utils';

export const authResponseQuery: QueryFunction<void> = async () => {
  const persistedToken = await Storage.getItem(STORAGE_KEY);
  api.interceptors.request.use((config) => {
    if (persistedToken) {
      config.headers.Authorization = `Bearer ${
        JSON.parse(persistedToken).access_token
      }`;
    }
    return config;
  });
  if (persistedToken) return JSON.parse(persistedToken);
  return null;
};

export const useAuthResponseQuery: UseQueryWrapper<AuthResponse> = () => {
  return useQuery(QUERY_KEY, authResponseQuery, {
    staleTime: Infinity,
  });
};
