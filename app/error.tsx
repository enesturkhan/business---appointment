'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  Alert,
} from '@mui/material';
import {
  Home as HomeIcon,
  Refresh as RefreshIcon,
  Report as ReportIcon,
  Support as SupportIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleRefresh = () => {
    reset();
  };

  const handleReport = () => {
    // Hata raporlama sistemi burada implement edilebilir
    const errorReport = {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };
    
    console.log('Error Report:', errorReport);
    
    // Kullanıcıya bilgi ver
    alert('Hata raporu kaydedildi. Teknik ekibimiz inceleyecek.');
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
            maxWidth: 700,
            width: '100%',
          }}
        >
          {/* Error Icon */}
          <Box
            sx={{
              fontSize: '6rem',
              color: 'error.main',
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ReportIcon sx={{ fontSize: 'inherit' }} />
          </Box>

          {/* Error Message */}
          <Typography variant="h4" component="h1" gutterBottom color="error.main">
            Bir Hata Oluştu
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Üzgünüz, beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya 
            ana sayfaya dönün.
          </Typography>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2" component="div">
                <strong>Hata Detayı:</strong> {error.message}
              </Typography>
              {error.digest && (
                <Typography variant="caption" component="div">
                  <strong>Hata Kodu:</strong> {error.digest}
                </Typography>
              )}
            </Alert>
          )}

          {/* Action Buttons */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                size="large"
              >
                Tekrar Dene
              </Button>
            </Grid>
            
            <Grid item>
              <Button
                variant="outlined"
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
                startIcon={<ReportIcon />}
                onClick={handleReport}
                size="large"
              >
                Hatayı Bildir
              </Button>
            </Grid>
          </Grid>

          {/* Support Information */}
          <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Sorun devam ediyor mu?
            </Typography>
            <Button
              variant="text"
              startIcon={<SupportIcon />}
              onClick={() => router.push('/support')}
              sx={{ textTransform: 'none' }}
            >
              Destek Al
            </Button>
          </Box>

          {/* Technical Information */}
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Hata Zamanı: {new Date().toLocaleString('tr-TR')}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
