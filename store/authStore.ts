import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
  role: 'user' | 'business' | 'admin';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'user' | 'business_owner') => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      login: (user) =>
        set({
          isAuthenticated: true,
          user,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),
      register: async (name: string, email: string, password: string, role: 'user' | 'business_owner') => {
        set({ isLoading: true });
        
        try {
          // Simüle edilmiş API çağrısı
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Başarılı kayıt sonrası otomatik giriş
          const user: User = {
            email,
            name,
            role: role === 'business_owner' ? 'business' : 'user',
          };
          
          set({
            isAuthenticated: true,
            user,
            isLoading: false,
          });
          
          return Promise.resolve();
        } catch (error) {
          set({ isLoading: false });
          return Promise.reject(error);
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
