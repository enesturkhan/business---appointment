import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../authStore';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useAuthStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
    
    // Reset store to initial state
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAuthStore());
      
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const { result } = renderHook(() => useAuthStore());
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
      };

      await act(async () => {
        await result.current.login('test@example.com', 'password');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle login error', async () => {
      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login('invalid@example.com', 'wrongpassword');
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
      expect(result.current.isLoading).toBe(false);
    });

    it('should set loading state during login', async () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.login('test@example.com', 'password');
      });

      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('logout', () => {
    it('should logout user successfully', async () => {
      const { result } = renderHook(() => useAuthStore());
      
      // First login
      await act(async () => {
        await result.current.login('test@example.com', 'password');
      });
      
      expect(result.current.isAuthenticated).toBe(true);
      
      // Then logout
      act(() => {
        result.current.logout();
      });
      
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
    });

    it('should clear localStorage on logout', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.logout();
      });
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('register', () => {
    it('should register user successfully', async () => {
      const { result } = renderHook(() => useAuthStore());
      const mockUser = {
        id: 2,
        name: 'New User',
        email: 'new@example.com',
        role: 'user',
      };

      await act(async () => {
        await result.current.register('New User', 'new@example.com', 'password');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle registration error', async () => {
      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.register('', 'invalid-email', '');
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('persistence', () => {
    it('should load user from localStorage on mount', () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
      };
      
      localStorageMock.getItem
        .mockReturnValueOnce('valid-token') // auth_token
        .mockReturnValueOnce(JSON.stringify(mockUser)); // user

      const { result } = renderHook(() => useAuthStore());
      
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
    });

    it('should not load user if no token in localStorage', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useAuthStore());
      
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
    });
  });

  describe('validation', () => {
    it('should validate email format', async () => {
      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login('invalid-email', 'password');
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
    });

    it('should validate password length', async () => {
      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login('test@example.com', '123');
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
    });
  });
});
