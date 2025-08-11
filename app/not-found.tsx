'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSearch = () => {
    router.push('/search');
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
            maxWidth: 600,
            width: '100%',
          }}
        >
          {/* 404 Icon */}
          <Box
            sx={{
              fontSize: '8rem',
              fontWeight: 'bold',
              color: 'primary.main',
              lineHeight: 1,
              mb: 2,
              fontFamily: 'monospace',
            }}
          >
            404
          </Box>

          {/* Error Message */}
          <Typography variant="h4" component="h1" gutterBottom>
            Sayfa Bulunamadı
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönmeyi veya arama yapmayı deneyebilirsiniz.
          </Typography>

          {/* Action Buttons */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={handleGoHome}
                size="large"
              >
                Ana Sayfaya Dön
              </Button>
            </Grid>
            
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                size="large"
              >
                Geri Git
              </Button>
            </Grid>
            
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                size="large"
              >
                Arama Yap
              </Button>
            </Grid>
          </Grid>

          {/* Helpful Links */}
          <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Popüler sayfalar:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'İşletmeler', href: '/businesses' },
                { label: 'Kategoriler', href: '/categories' },
                { label: 'Randevular', href: '/appointments' },
                { label: 'Profil', href: '/profile' },
              ].map((link) => (
                <Button
                  key={link.href}
                  variant="text"
                  size="small"
                  onClick={() => router.push(link.href)}
                  sx={{ textTransform: 'none' }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
