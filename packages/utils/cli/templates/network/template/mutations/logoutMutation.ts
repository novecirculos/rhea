import { MutationFunction } from '@tanstack/react-query';
import { api } from '@novecirculos/api';
import { legacyAnalytics } from '../utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AuthResponse } from '../interfaces';
import { QUERY_KEY, STORAGE_KEY } from '../utils';
import { Storage } from '@novecirculos/secure-storage';
import { UseMutationWrapper } from '@novecirculos/query-utils';
import { useAuthResponseQuery } from '../queries';

export const logoutMutation: MutationFunction<null, string> = async (
  token: string,
) => {
  legacyAnalytics('Logout', token);
  api.interceptors.request.use((config) => {
    config.headers.Authorization = undefined;
    return config;
  });
  return null;
};

export const useLogoutMutation: UseMutationWrapper<AuthResponse> = (
  options,
) => {
  const queryClient = useQueryClient();
  const { data: token } = useAuthResponseQuery();
  return useMutation(
    QUERY_KEY,
    () => logoutMutation(token?.access_token ?? ''),
    {
      ...options,
      onSuccess: async (data) => {
        queryClient.setQueriesData(QUERY_KEY, data);
        await Storage.removeItem(STORAGE_KEY);
      },
    },
  );
};
