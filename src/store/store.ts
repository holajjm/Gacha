import { create } from "zustand"

interface Store {
  count: number
  increment: () => void
  decrement: () => void
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

// --------------------------------------------------------
interface User {
  isNewUser: string
  loginId: string
  loginType: string
  nickname: string
  profileUrl: string
  accessToken: string
  refreshToken: string
}
interface UserStore {
  user: User
  setUser: (user: User) => void
}
export const useUserStore = create<UserStore>((set) => ({
  // user: {
  //   isNewUser: "",
  //   loginId: "",
  //   loginType: "",
  //   nickname: "",
  //   profileUrl: "",
  //   accessToken: "",
  //   refreshToken: "",
  // },
  user: JSON.parse(sessionStorage.getItem('user') || 'null'),
  setUser: (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
}))
