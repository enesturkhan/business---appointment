'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import { CalendarToday, Business, Person, Settings } from '@mui/icons-material';
import { useAuthStore } from '../../store/authStore';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      // Simüle edilmiş veri yükleme
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <LoadingSpinner message="Dashboard yükleniyor..." />
      </Container>
    );
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Yönetici';
      case 'business':
        return 'İşletme Sahibi';
      case 'user':
        return 'Kullanıcı';
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'business':
        return 'warning';
      case 'user':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hoş Geldiniz, {user?.name}!
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label={getRoleText(user?.role || 'user')} 
            color={getRoleColor(user?.role || 'user') as any}
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Hızlı İşlemler
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CalendarToday />}
                  sx={{ mb: 1 }}
                  onClick={() => router.push('/appointments/create')}
                >
                  Randevu Al
                </Button>
                                           <Button
                             variant="outlined"
                             fullWidth
                             startIcon={<Business />}
                             sx={{ mb: 1 }}
                             onClick={() => router.push('/search')}
                           >
                             İşletme Bul
                           </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Person />}
                >
                  Profili Görüntüle
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Appointments */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Son Randevular
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.role === 'business' 
                  ? 'Henüz randevu talebi bulunmuyor.'
                  : 'Randevu bulunamadı. İlk randevunuzu alın!'
                }
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary"
                onClick={() => router.push('/appointments/history')}
              >
                {user?.role === 'business' ? 'Tüm Talepleri Görüntüle' : 'Tüm Randevuları Görüntüle'}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                İstatistikler
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.role === 'business' ? 'Toplam Talep' : 'Toplam Randevu'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success.main">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tamamlanan
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning.main">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bekleyen
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Role Specific Actions */}
        {user?.role === 'admin' && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  Yönetici Paneli
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="outlined" startIcon={<Settings />}>
                    Kullanıcıları Yönet
                  </Button>
                  <Button variant="outlined" startIcon={<Business />}>
                    İşletmeleri Yönet
                  </Button>
                  <Button variant="outlined" startIcon={<CalendarToday />}>
                    Sistem Ayarları
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {user?.role === 'business' && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  İşletme Yönetimi
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="outlined" startIcon={<Business />}>
                    İşletme Bilgileri
                  </Button>
                  <Button variant="outlined" startIcon={<CalendarToday />}>
                    Hizmetleri Yönet
                  </Button>
                  <Button variant="outlined" startIcon={<Settings />}>
                    Çalışma Saatleri
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
