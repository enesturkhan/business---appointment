'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  AlertTitle,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// Network Error Component
export function NetworkError({ 
  message = 'Bağlantı hatası oluştu',
  onRetry,
  showRetry = true 
}: {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}) {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <ErrorIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h6" gutterBottom color="error.main">
          Bağlantı Hatası
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>

        <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
          <AlertTitle>Çözüm Önerileri</AlertTitle>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="İnternet bağlantınızı kontrol edin" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Sayfayı yenileyin" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Daha sonra tekrar deneyin" />
            </ListItem>
          </List>
        </Alert>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {showRetry && (
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRetry}
            >
              Tekrar Dene
            </Button>
          )}
          
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => router.push('/')}
          >
            Ana Sayfa
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// Not Found Error Component
export function NotFoundError({ 
  title = 'Sayfa Bulunamadı',
  message = 'Aradığınız sayfa mevcut değil veya taşınmış olabilir',
  showSearch = true 
}: {
  title?: string;
  message?: string;
  showSearch?: boolean;
}) {
  const router = useRouter();

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <SearchIcon sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom color="warning.main">
          404
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
          >
            Geri Dön
          </Button>
          
          {showSearch && (
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => router.push('/search')}
            >
              Arama Yap
            </Button>
          )}
          
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => router.push('/')}
          >
            Ana Sayfa
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// Permission Error Component
export function PermissionError({ 
  message = 'Bu sayfaya erişim yetkiniz bulunmamaktadır',
  requiredRole,
  currentRole 
}: {
  message?: string;
  requiredRole?: string;
  currentRole?: string;
}) {
  const router = useRouter();

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <WarningIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
        
        <Typography variant="h6" gutterBottom color="warning.main">
          Erişim Engellendi
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>

        {requiredRole && currentRole && (
          <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>
            <AlertTitle>Yetki Bilgileri</AlertTitle>
            <Typography variant="body2">
              Gerekli rol: <strong>{requiredRole}</strong><br />
              Mevcut rolünüz: <strong>{currentRole}</strong>
            </Typography>
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
          >
            Geri Dön
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => router.push('/')}
          >
            Ana Sayfa
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// Data Error Component
export function DataError({ 
  message = 'Veri yüklenirken bir hata oluştu',
  onRetry,
  showRetry = true 
}: {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}) {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <ErrorIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h6" gutterBottom color="error.main">
          Veri Hatası
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {showRetry && (
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRetry}
            >
              Tekrar Dene
            </Button>
          )}
          
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => router.push('/')}
          >
            Ana Sayfa
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// Empty State Component
export function EmptyState({ 
  title = 'Veri Bulunamadı',
  message = 'Aradığınız kriterlere uygun veri bulunamadı',
  icon: Icon = InfoIcon,
  action,
  actionLabel = 'Yeni Ekle',
  onAction 
}: {
  title?: string;
  message?: string;
  icon?: React.ComponentType<any>;
  action?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Icon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {message}
      </Typography>

      {action || (
        onAction && (
          <Button
            variant="contained"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )
      )}
    </Paper>
  );
}
