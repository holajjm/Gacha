import { User } from "types/user";

export interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

export interface TokenStore {
  accessToken: string;
  refreshToken: string;
  setToken: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => void;
}