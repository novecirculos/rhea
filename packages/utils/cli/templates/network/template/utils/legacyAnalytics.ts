import axios from 'axios';

export const legacyAnalytics: (
  code: 'Login' | 'Logout',
  authToken: string,
) => Promise<void> = async (code, authToken) => {
  await axios.post(
    'https://qa.novecirculos.com/mobile/v4/US/LOG/',
    {
      code,
      version: 'T0.0.0',
    },
    {
      headers: { Authorization: `Bearer ${authToken}` },
      withCredentials: true,
      responseType: 'json',
    },
  );
};
