import { User } from './../models/User';
import create from "zustand";


interface State {
  user: User,
  setUser: (user: User) => void
}

export const useUserStore = create<State>((set) => ({
  user: {} as User,
  setUser: (user) => set({ user }),
}));