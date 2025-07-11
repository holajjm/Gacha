import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  loginId?: string;
  socialType?: string;
  nickname: string;
  profileId: number;
  accessToken: string;
  refreshToken: string;
}
interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

interface TokenStore {
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
// export const useUserStore = create<UserStore>((set) => ({
//   user: JSON.parse(sessionStorage.getItem("user") || "null"),
//   setUser: (user: User) => {
//     sessionStorage.setItem("user", JSON.stringify(user));
//     set({ user });
//   },
// }));

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      setToken: ({
        accessToken,
        refreshToken,
      }: {
        accessToken: string;
        refreshToken: string;
      }) =>
        set(() => ({
          accessToken,
          refreshToken,
        })),
    }),
    {
      name: "token",
    },
  ),
);

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        loginId: "",
        socialType: "",
        nickname: "",
        profileId: 0,
        accessToken: "",
        refreshToken: "",
      },
      setUser: (user: User) => set(() => ({ user })),
    }),
    
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

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

// 팩토리 함수
function createModalStore() {
  return create<ModalState>((set) => ({
    modal: false,
    modalClose: () => set({ modal: false }),
    modalOpen: () => set({ modal: true }),
  }));
}

// 각각 별도 인스턴스로 생성
export const useFollowerModalState = createModalStore();
export const useFollowingModalState = createModalStore();
export const useLottoModalState = createModalStore();
export const useModalState = createModalStore();
export const usePreviewModalState = createModalStore();

// export const useFollowerModalState = create<ModalState>((set) => ({
//   modal: false,
//   modalClose: () => set({ modal: false }),
//   modalOpen: () => set({ modal: true }),
// }));
// export const useFollowingModalState = create<ModalState>((set) => ({
//   modal: false,
//   modalClose: () => set({ modal: false }),
//   modalOpen: () => set({ modal: true }),
// }));
