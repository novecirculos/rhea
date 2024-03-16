export interface AuthResponseData {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string | null;
}

export type AuthResponse = AuthResponseData | void | null;
