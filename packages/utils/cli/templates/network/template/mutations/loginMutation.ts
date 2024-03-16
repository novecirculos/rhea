import { MutationFunction } from '@tanstack/react-query';
import { AxiosErrorType, VVError } from '@novecirculos/query-context';
import { api, authApi } from '@novecirculos/api';
import { AuthCredentials, AuthResponse } from '../interfaces';
import { legacyAnalytics } from '../utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { CREDENTIALS_KEY, QUERY_KEY, STORAGE_KEY } from '../utils';
import { Storage } from '@novecirculos/secure-storage';
import { UseMutationWrapper } from '@novecirculos/query-utils';
import { Platform } from 'react-native';

export const loginMutation: MutationFunction<
  AuthResponse,
  AuthCredentials
> = async ({ password, username }) => {
  try {
    const res = await Promise.all([
      await authApi.get('', {
        auth: {
          username,
          password,
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }),
    ]);
    legacyAnalytics('Login', res[0].data.access_token);
    api.interceptors.request.use((config) => {
      if (res[0].data.access_token) {
        config.headers.Authorization = `Bearer ${res[0].data.access_token}`;
      }
      return config;
    });
    return res[0].data;
  } catch (unknownErr) {
    const error = unknownErr as AxiosErrorType;

    throw new VVError({
      message: 'Incorrect email or password. Please, check again',
      statusCode: error?.response?.status,
    });
  }
};

export const useLoginMutation: UseMutationWrapper<
  AuthResponse,
  Error,
  AuthCredentials
> = (options) => {
  const queryClient = useQueryClient();

  return useMutation(QUERY_KEY, loginMutation, {
    ...options,
    onSuccess: async (data, variables) => {
      queryClient.setQueriesData(QUERY_KEY, data);
      await Storage.setItem(STORAGE_KEY, JSON.stringify(data));
      if (['ios', 'android'].includes(Platform.OS)) {
        await Storage.setItem(CREDENTIALS_KEY, JSON.stringify(variables));
      }
    },
  });
};
