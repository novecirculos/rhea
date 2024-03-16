import { QueryFunction } from '@tanstack/react-query';
import { CREDENTIALS_KEY } from '../utils/keys';
import { Storage } from '@novecirculos/secure-storage';
import { Platform } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { AuthCredentials } from '../interfaces';
import { UseQueryWrapper } from '@novecirculos/query-utils';

export const safeCredentialsQuery: QueryFunction<void> = async () => {
  if (Platform.OS === 'web') return null;

  const persistedCredentials = await Storage.getItem(CREDENTIALS_KEY);
  if (persistedCredentials) return JSON.parse(persistedCredentials);
  return null;
};

export const useSafeCredentialsQuery: UseQueryWrapper<AuthCredentials> = () => {
  return useQuery(['creds'], safeCredentialsQuery, {
    staleTime: Infinity,
  });
};
