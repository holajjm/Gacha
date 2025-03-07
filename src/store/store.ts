import { create } from "zustand";

export interface User {
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

interface CoinState {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

export const useCoinState = create<CoinState>((set) => ({
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
