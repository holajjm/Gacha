export interface QueryParams {
  [key: string]: string;
}

export interface UserData {
  nickname: string;
  profileId: number;
  socialType?: string;
  loginId?: string;
}

export interface User {
  loginId?: string;
  socialType?: string;
  nickname: string;
  profileId: number;
  accessToken: string;
  refreshToken: string;
}
