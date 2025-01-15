import { create } from "zustand";

export interface User {
  // isNewUser: string;
  loginId: string;
  socialType: string;
  nickname: string;
  profileUrl: string;
  accessToken: string;
  refreshToken: string;
}
interface UserStore {
  user: User;
  setUser: (user: User) => void;
}
export const useUserStore = create<UserStore>((set) => ({
  user: JSON.parse(sessionStorage.getItem("user") || "null"),
  setUser: (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
}));
