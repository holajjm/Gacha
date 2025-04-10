import { create } from "zustand";

export interface User {
  loginId: string;
  socialType: string;
  nickname: string;
  profileId: number;
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
  coinUpdate: number;
  coinRefresh: () => void;
}

export const useCoinState = create<CoinState>((set) => ({
  coinUpdate: 0,
  coinRefresh: () => set((state) => ({ coinUpdate: state.coinUpdate + 1 })),
}));

interface ModalState {
  modal: boolean;
  modalClose: () => void;
  modalOpen: () => void;
}

export const useModalState = create<ModalState>((set) => ({
  modal: false,
  modalClose: () => set({ modal: false }),
  modalOpen: () => set({ modal: true }),
}));
