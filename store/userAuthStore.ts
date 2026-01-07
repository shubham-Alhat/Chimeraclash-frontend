import { create } from "zustand";

interface useAuthStoreState {
  isLoginLoading: boolean;
  isSignUpLoading: boolean;
  setIsLoginLoading: (value: boolean) => void;
  setIsSignUpLoading: (value: boolean) => void;
}

const useAuthStore = create<useAuthStoreState>((set) => ({
  isLoginLoading: false,
  isSignUpLoading: false,
  setIsLoginLoading: (value) => {
    set({ isLoginLoading: value });
  },
  setIsSignUpLoading: (value) => {
    set({ isSignUpLoading: value });
  },
}));

export default useAuthStore;
