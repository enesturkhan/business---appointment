'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { useThemeStore } from '../store/themeStore';
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
    typography: {
      fontFamily: geistSans.style.fontFamily,
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
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
            boxShadow: mode === 'light' 
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
              : '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
            border: mode === 'light' ? '1px solid #e5e7eb' : '1px solid #374151',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(8px)',
            backgroundColor: mode === 'light' 
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(26, 26, 46, 0.8)',
            borderBottom: mode === 'light' 
              ? '1px solid #e5e7eb'
              : '1px solid #374151',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
