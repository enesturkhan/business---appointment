import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create a custom theme for testing
const testTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 480,
      tablet: 768,
      desktop: 1024,
    },
  },
});

// Custom wrapper component
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={testTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  status: 'active',
  joinDate: new Date().toISOString(),
  ...overrides,
});

export const createMockBusiness = (overrides = {}) => ({
  id: 1,
  name: 'Test Business',
  description: 'Test business description',
  address: 'Test address',
  phone: '+90 555 123 4567',
  email: 'business@example.com',
  category: 'restaurant',
  status: 'active',
  ownerId: 1,
  ...overrides,
});

export const createMockAppointment = (overrides = {}) => ({
  id: 1,
  userId: 1,
  businessId: 1,
  date: new Date().toISOString(),
  time: '14:00',
  status: 'pending',
  notes: 'Test appointment',
  ...overrides,
});

// Mock store functions
export const mockAuthStore = {
  isAuthenticated: false,
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
};

export const mockThemeStore = {
  mode: 'light',
  toggleTheme: jest.fn(),
  setMode: jest.fn(),
};

export const mockNotificationStore = {
  notifications: [],
  showSuccess: jest.fn(),
  showError: jest.fn(),
  showWarning: jest.fn(),
  showInfo: jest.fn(),
  removeNotification: jest.fn(),
  clearNotifications: jest.fn(),
};

// Mock router functions
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
};

// Mock API responses
export const mockApiResponse = (data: any, status = 200) => {
  return Promise.resolve({
    json: () => Promise.resolve(data),
    status,
    ok: status >= 200 && status < 300,
  });
};

export const mockApiError = (message: string, status = 400) => {
  return Promise.resolve({
    json: () => Promise.resolve({ message }),
    status,
    ok: false,
  });
};

// Test helpers
export const waitForElement = (selector: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

export const waitForLoadingToFinish = () => {
  return waitForElement('[data-testid="loading-spinner"]').then(() => {
    return new Promise((resolve) => setTimeout(resolve, 100));
  });
};

// Custom matchers
export const customMatchers = {
  toHaveBeenCalledWithMatch: (mock: jest.Mock, expected: any) => {
    const calls = mock.mock.calls;
    const pass = calls.some((call) => {
      try {
        expect(call).toEqual(expect.arrayContaining([expected]));
        return true;
      } catch {
        return false;
      }
    });
    return {
      pass,
      message: () =>
        `Expected mock to have been called with ${JSON.stringify(
          expected
        )}, but it was called with ${JSON.stringify(calls)}`,
    };
  },
};

// Extend expect
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledWithMatch(expected: any): R;
    }
  }
}

// Setup custom matchers
expect.extend(customMatchers);
