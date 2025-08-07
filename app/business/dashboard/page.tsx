'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Business,
  CalendarToday,
  People,
  Star,
  TrendingUp,
  Settings,
  Add,
  Edit,
  Phone,
  Email,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';
import { Rating } from '@mui/material';
import { useAuthStore } from '../../../store/authStore';

// Mock işletme verileri
const mockBusinessData = {
  id: '1',
  name: 'Güzellik Salonu Elif',
  category: 'Güzellik',
  address: 'Kadıköy, İstanbul',
  phone: '+90 216 555 0123',
  email: 'info@guzelliksalonuelif.com',
  rating: 4.5,
  reviewCount: 128,
  isActive: true,
  workingHours: {
    monday: '09:00 - 20:00',
    tuesday: '09:00 - 20:00',
    wednesday: '09:00 - 20:00',
    thursday: '09:00 - 20:00',
    friday: '09:00 - 20:00',
    saturday: '10:00 - 18:00',
    sunday: 'Kapalı',
  },
  services: [
    { id: '1', name: 'Saç Kesimi', price: 150, duration: 30 },
    { id: '2', name: 'Saç Boyama', price: 400, duration: 120 },
    { id: '3', name: 'Makyaj', price: 250, duration: 60 },
    { id: '4', name: 'Cilt Bakımı', price: 300, duration: 90 },
  ],
  appointments: [
    {
      id: '1',
      customerName: 'Ayşe Kaya',
      service: 'Saç Kesimi',
      date: '2024-01-20',
      time: '14:00',
      status: 'confirmed',
      phone: '+90 555 123 4567',
    },
    {
      id: '2',
      customerName: 'Fatma Demir',
      service: 'Makyaj',
      date: '2024-01-20',
      time: '16:00',
      status: 'pending',
      phone: '+90 555 234 5678',
    },
    {
      id: '3',
      customerName: 'Zeynep Özkan',
      service: 'Saç Boyama',
      date: '2024-01-21',
      time: '10:00',
      status: 'confirmed',
      phone: '+90 555 345 6789',
    },
  ],
  stats: {
    totalAppointments: 45,
    completedAppointments: 38,
    pendingAppointments: 7,
    totalRevenue: 12500,
    averageRating: 4.5,
  },
};

export default function BusinessDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [business] = useState(mockBusinessData);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // İşletme sahibi kontrolü (gerçek uygulamada daha detaylı kontrol yapılır)
    if (user?.role !== 'business') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Onaylandı';
      case 'pending':
        return 'Beklemede';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  if (!isAuthenticated || user?.role !== 'business') {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        İşletme Paneli
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        İşletmenizi yönetin ve randevularınızı takip edin
      </Typography>

      {/* İşletme Bilgileri */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                {business.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip label={business.category} variant="outlined" />
                <Chip
                  label={business.isActive ? 'Aktif' : 'Pasif'}
                  color={business.isActive ? 'success' : 'error'}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Rating value={business.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {business.rating} ({business.reviewCount} değerlendirme)
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  component={Link}
                  href="/business/edit"
                >
                  İşletme Bilgilerini Düzenle
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  component={Link}
                  href="/business/settings"
                >
                  Ayarlar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* İstatistikler */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CalendarToday sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" color="primary">
                {business.stats.totalAppointments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toplam Randevu
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" color="success.main">
                ₺{business.stats.totalRevenue}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toplam Gelir
              </Typography>
            </CardContent>
          </Card>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" color="warning.main">
                {business.stats.pendingAppointments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bekleyen Randevu
              </Typography>
            </CardContent>
          </Card>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Star sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h4" color="secondary.main">
                {business.stats.averageRating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ortalama Puan
              </Typography>
            </CardContent>
          </Card>
      </Grid>

      <Grid container spacing={3}>
        {/* Günlük Randevular */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" component="h2">
                  Günlük Randevular
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  component={Link}
                  href="/business/appointments"
                >
                  Tümünü Görüntüle
                </Button>
              </Box>
              
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Müşteri</TableCell>
                      <TableCell>Hizmet</TableCell>
                      <TableCell>Tarih</TableCell>
                      <TableCell>Saat</TableCell>
                      <TableCell>Durum</TableCell>
                      <TableCell>İşlem</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {business.appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {appointment.customerName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {appointment.phone}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>
                          {new Date(appointment.date).toLocaleDateString('tr-TR')}
                        </TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusText(appointment.status)}
                            color={getStatusColor(appointment.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined">
                            Detay
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Hızlı İşlemler */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Hızlı İşlemler
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Add />}
                  component={Link}
                  href="/business/services/add"
                >
                  Hizmet Ekle
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CalendarToday />}
                  component={Link}
                  href="/business/schedule"
                >
                  Çalışma Saatleri
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<People />}
                  component={Link}
                  href="/business/customers"
                >
                  Müşteri Listesi
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Star />}
                  component={Link}
                  href="/business/reviews"
                >
                  Değerlendirmeler
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* İletişim Bilgileri */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                İletişim Bilgileri
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary="Adres"
                    secondary={business.address}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText
                    primary="Telefon"
                    secondary={business.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary="E-posta"
                    secondary={business.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText
                    primary="Çalışma Saatleri"
                    secondary="Pazartesi - Cuma: 09:00-20:00"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
