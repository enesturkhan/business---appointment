'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { useThemeStore } from '../store/themeStore';
import { NotificationProvider } from '../components/ui/NotificationSystem';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import { SkipToMainContent, BackToTop } from '../components/ui/Accessibility';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { mode } = useThemeStore();

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#6366f1', // Modern indigo
        light: '#818cf8',
        dark: '#4f46e5',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f59e0b', // Warm amber
        light: '#fbbf24',
        dark: '#d97706',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#fafafa' : '#0f0f23',
        paper: mode === 'light' ? '#ffffff' : '#1a1a2e',
      },
      text: {
        primary: mode === 'light' ? '#1f2937' : '#f3f4f6',
        secondary: mode === 'light' ? '#6b7280' : '#9ca3af',
      },
      grey: {
        50: mode === 'light' ? '#f9fafb' : '#111827',
        100: mode === 'light' ? '#f3f4f6' : '#1f2937',
        200: mode === 'light' ? '#e5e7eb' : '#374151',
        300: mode === 'light' ? '#d1d5db' : '#4b5563',
        400: mode === 'light' ? '#9ca3af' : '#6b7280',
        500: mode === 'light' ? '#6b7280' : '#9ca3af',
        600: mode === 'light' ? '#4b5563' : '#d1d5db',
        700: mode === 'light' ? '#374151' : '#e5e7eb',
        800: mode === 'light' ? '#1f2937' : '#f3f4f6',
        900: mode === 'light' ? '#111827' : '#f9fafb',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        // Custom breakpoints for better mobile experience
        mobile: 480,
        tablet: 768,
        desktop: 1024,
      },
    },
    typography: {
      fontFamily: geistSans.style.fontFamily,
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
        [theme.breakpoints.down('md')]: {
          fontSize: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.75rem',
        },
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
        [theme.breakpoints.down('md')]: {
          fontSize: '1.75rem',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.5rem',
        },
      },
      h3: {
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.25rem',
        },
      },
      h4: {
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.125rem',
        },
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      body1: {
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.875rem',
        },
      },
      body2: {
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.8125rem',
        },
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '10px 24px',
            [theme.breakpoints.down('sm')]: {
              padding: '8px 16px',
              fontSize: '0.875rem',
            },
          },
          contained: {
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            '&:hover': {
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down('sm')]: {
              borderRadius: 8,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down('sm')]: {
              '& .MuiInputBase-root': {
                fontSize: '0.875rem',
              },
            },
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down('md')]: {
              '& .MuiTableCell-root': {
                padding: '8px 4px',
                fontSize: '0.75rem',
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            [theme.breakpoints.down('sm')]: {
              margin: 16,
              width: 'calc(100% - 32px)',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Box>
          <Footer />
        </Box>
      </NotificationProvider>
    </ThemeProvider>
  );
}
