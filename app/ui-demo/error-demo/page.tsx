'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import ErrorBoundary from '../../../../components/ui/ErrorComponents';
import {
  NetworkError,
  NotFoundError,
  PermissionError,
  DataError,
  EmptyState,
} from '../../../../components/ui/ErrorComponents';

// Component that throws an error for testing
function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Bu bir test hatasıdır!');
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Test Bileşeni
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Bu bileşen hata fırlatmak için kullanılır.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => setShouldThrow(true)}
        >
          Hata Fırlat
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ErrorDemoPage() {
  const [showNetworkError, setShowNetworkError] = useState(false);
  const [showNotFoundError, setShowNotFoundError] = useState(false);
  const [showPermissionError, setShowPermissionError] = useState(false);
  const [showDataError, setShowDataError] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  const simulateNetworkError = () => {
    setShowNetworkError(true);
    setTimeout(() => setShowNetworkError(false), 5000);
  };

  const simulateDataError = () => {
    setShowDataError(true);
    setTimeout(() => setShowDataError(false), 5000);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Error Handling Demo
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Bu sayfa farklı error handling senaryolarını göstermek için oluşturulmuştur.
      </Typography>

      <Grid container spacing={3}>
        {/* Error Boundary Demo */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Error Boundary Test
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Error Boundary bileşenini test etmek için aşağıdaki butona tıklayın.
              </Typography>
              
              <ErrorBoundary>
                <BuggyComponent />
              </ErrorBoundary>
            </CardContent>
          </Card>
        </Grid>

        {/* Network Error Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Network Error
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Bağlantı hatası simülasyonu.
              </Typography>
              
              <Button
                variant="contained"
                color="error"
                onClick={simulateNetworkError}
                disabled={showNetworkError}
              >
                Network Error Göster
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Not Found Error Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Not Found Error
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                404 hata sayfası örneği.
              </Typography>
              
              <Button
                variant="contained"
                color="warning"
                onClick={() => setShowNotFoundError(true)}
              >
                Not Found Error Göster
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Permission Error Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Permission Error
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Yetki hatası örneği.
              </Typography>
              
              <Button
                variant="contained"
                color="warning"
                onClick={() => setShowPermissionError(true)}
              >
                Permission Error Göster
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Error Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Error
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Veri yükleme hatası örneği.
              </Typography>
              
              <Button
                variant="contained"
                color="error"
                onClick={simulateDataError}
                disabled={showDataError}
              >
                Data Error Göster
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Empty State Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Empty State
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Boş veri durumu örneği.
              </Typography>
              
              <Button
                variant="contained"
                color="info"
                onClick={() => setShowEmptyState(true)}
              >
                Empty State Göster
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Error Handling Best Practices */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Error Handling Best Practices
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Alert severity="info">
                    <AlertTitle>Kullanıcı Dostu Mesajlar</AlertTitle>
                    <Typography variant="body2">
                      Teknik detayları gizleyin, kullanıcıya anlaşılır mesajlar verin.
                    </Typography>
                  </Alert>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Alert severity="info">
                    <AlertTitle>Retry Mekanizması</AlertTitle>
                    <Typography variant="body2">
                      Geçici hatalar için tekrar deneme seçeneği sunun.
                    </Typography>
                  </Alert>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Alert severity="info">
                    <AlertTitle>Fallback UI</AlertTitle>
                    <Typography variant="body2">
                      Hata durumunda alternatif içerik gösterin.
                    </Typography>
                  </Alert>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Alert severity="info">
                    <AlertTitle>Error Logging</AlertTitle>
                    <Typography variant="body2">
                      Hataları loglayın ve gerekirse raporlama servisine gönderin.
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Error Components */}
      {showNetworkError && (
        <Box sx={{ mt: 3 }}>
          <NetworkError 
            message="Sunucuya bağlanırken bir hata oluştu"
            onRetry={() => setShowNetworkError(false)}
          />
        </Box>
      )}

      {showNotFoundError && (
        <Box sx={{ mt: 3 }}>
          <NotFoundError 
            title="Sayfa Bulunamadı"
            message="Aradığınız sayfa mevcut değil"
          />
        </Box>
      )}

      {showPermissionError && (
        <Box sx={{ mt: 3 }}>
          <PermissionError 
            message="Bu sayfaya erişim yetkiniz bulunmamaktadır"
            requiredRole="admin"
            currentRole="user"
          />
        </Box>
      )}

      {showDataError && (
        <Box sx={{ mt: 3 }}>
          <DataError 
            message="Kullanıcı verileri yüklenirken bir hata oluştu"
            onRetry={() => setShowDataError(false)}
          />
        </Box>
      )}

      {showEmptyState && (
        <Box sx={{ mt: 3 }}>
          <EmptyState 
            title="Kullanıcı Bulunamadı"
            message="Aradığınız kriterlere uygun kullanıcı bulunamadı"
            actionLabel="Yeni Kullanıcı Ekle"
            onAction={() => setShowEmptyState(false)}
          />
        </Box>
      )}
    </Container>
  );
}
