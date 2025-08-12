import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import { mockAuthStore } from '../../utils/test-utils';
import Navbar from '../Navbar';

// Mock the auth store
jest.mock('../../store/authStore', () => ({
  useAuthStore: () => mockAuthStore,
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe('Navbar', () => {
  beforeEach(() => {
    // Reset mock store state
    mockAuthStore.isAuthenticated = false;
    mockAuthStore.user = null;
    jest.clearAllMocks();
  });

  describe('unauthenticated state', () => {
    it('renders login and register buttons when not authenticated', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Giriş Yap')).toBeInTheDocument();
      expect(screen.getByText('Kayıt Ol')).toBeInTheDocument();
      expect(screen.queryByText('Kontrol Paneli')).not.toBeInTheDocument();
    });

    it('renders correct logo text', () => {
      render(<Navbar />);
      
      const logo = screen.getByText('İş Randevu Sistemi');
      expect(logo).toBeInTheDocument();
    });

    it('has correct navigation links', () => {
      render(<Navbar />);
      
      const loginLink = screen.getByRole('link', { name: /giriş yap/i });
      const registerLink = screen.getByRole('link', { name: /kayıt ol/i });
      
      expect(loginLink).toHaveAttribute('href', '/login');
      expect(registerLink).toHaveAttribute('href', '/register');
    });
  });

  describe('authenticated state', () => {
    beforeEach(() => {
      mockAuthStore.isAuthenticated = true;
      mockAuthStore.user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
      };
    });

    it('renders user menu when authenticated', () => {
      render(<Navbar />);
      
      expect(screen.getByText('Kontrol Paneli')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    it('shows user avatar with first letter of name', () => {
      render(<Navbar />);
      
      const avatar = screen.getByText('T');
      expect(avatar).toBeInTheDocument();
    });

    it('opens user menu when avatar is clicked', async () => {
      render(<Navbar />);
      
      const userButton = screen.getByText('Test User');
      fireEvent.click(userButton);
      
      await waitFor(() => {
        expect(screen.getByText('Profil')).toBeInTheDocument();
        expect(screen.getByText('Ayarlar')).toBeInTheDocument();
        expect(screen.getByText('Çıkış Yap')).toBeInTheDocument();
      });
    });

    it('calls logout when logout is clicked', async () => {
      render(<Navbar />);
      
      const userButton = screen.getByText('Test User');
      fireEvent.click(userButton);
      
      await waitFor(() => {
        const logoutButton = screen.getByText('Çıkış Yap');
        fireEvent.click(logoutButton);
      });
      
      expect(mockAuthStore.logout).toHaveBeenCalled();
    });

    it('has correct navigation links for authenticated users', () => {
      render(<Navbar />);
      
      const dashboardLink = screen.getByRole('link', { name: /kontrol paneli/i });
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    });
  });

  describe('mobile responsiveness', () => {
    it('shows hamburger menu on mobile', () => {
      // Mock mobile breakpoint
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(<Navbar />);
      
      const menuButton = screen.getByLabelText('Ana menüyü aç');
      expect(menuButton).toBeInTheDocument();
    });

    it('opens mobile drawer when hamburger is clicked', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(<Navbar />);
      
      const menuButton = screen.getByLabelText('Ana menüyü aç');
      fireEvent.click(menuButton);
      
      await waitFor(() => {
        expect(screen.getByLabelText('Ana navigasyon menüsü')).toBeInTheDocument();
      });
    });

    it('shows abbreviated logo text on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(<Navbar />);
      
      const logo = screen.getByText('İRS');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA labels', () => {
      render(<Navbar />);
      
      expect(screen.getByLabelText('Ana sayfaya git')).toBeInTheDocument();
      expect(screen.getByLabelText('Ana menüyü aç')).toBeInTheDocument();
    });

    it('has correct ARIA attributes for mobile menu', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(<Navbar />);
      
      const menuButton = screen.getByLabelText('Ana menüyü aç');
      expect(menuButton).toHaveAttribute('aria-haspopup', 'true');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('has correct role attributes', () => {
      render(<Navbar />);
      
      const navigation = screen.getByLabelText('Ana navigasyon menüsü');
      expect(navigation).toHaveAttribute('role', 'navigation');
    });
  });

  describe('theme toggle', () => {
    it('renders theme toggle button', () => {
      render(<Navbar />);
      
      const themeToggle = screen.getByRole('button', { name: /tema değiştir/i });
      expect(themeToggle).toBeInTheDocument();
    });
  });

  describe('navigation functionality', () => {
    it('navigates to home when logo is clicked', () => {
      render(<Navbar />);
      
      const logoLink = screen.getByLabelText('Ana sayfaya git');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('navigates to dashboard when dashboard button is clicked', () => {
      mockAuthStore.isAuthenticated = true;
      mockAuthStore.user = { id: 1, name: 'Test User', email: 'test@example.com', role: 'user' };
      
      render(<Navbar />);
      
      const dashboardLink = screen.getByRole('link', { name: /kontrol paneli/i });
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    });
  });
});
