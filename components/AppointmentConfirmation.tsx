'use client';

import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Business,
  AccessTime,
  CalendarToday,
  LocationOn,
  Phone,
  CheckCircle,
  Info,
} from '@mui/icons-material';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

interface Business {
  id: string;
  name: string;
  address: string;
  phone: string;
  services: Service[];
}

interface AppointmentConfirmationProps {
  business: Business;
  service: Service;
  date: Date;
  time: string;
  notes: string;
}

export default function AppointmentConfirmation({
  business,
  service,
  date,
  time,
  notes,
}: AppointmentConfirmationProps) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('tr-TR', options);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Beklemede';
      case 'confirmed':
        return 'Onaylandı';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Randevu Özeti
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* İşletme Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Business color="primary" />
              İşletme Bilgileri
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText
                  primary={business.name}
                  secondary="İşletme Adı"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText
                  primary={business.address}
                  secondary="Adres"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText
                  primary={business.phone}
                  secondary="Telefon"
                />
              </ListItem>
            </List>
          </Grid>

          {/* Hizmet Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle color="primary" />
              Hizmet Bilgileri
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle />
                </ListItemIcon>
                <ListItemText
                  primary={service.name}
                  secondary="Hizmet Adı"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText
                  primary={`${service.duration} dakika`}
                  secondary="Süre"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText
                  primary={`₺${service.price}`}
                  secondary="Fiyat"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      {/* Tarih ve Saat Bilgileri */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarToday color="primary" />
          Randevu Detayları
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <CalendarToday color="action" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Tarih
                </Typography>
                <Typography variant="h6">
                  {formatDate(date)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <AccessTime color="action" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Saat
                </Typography>
                <Typography variant="h6">
                  {formatTime(time)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {notes && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Notlar
              </Typography>
              <Typography variant="body1">
                {notes}
              </Typography>
            </Box>
          </>
        )}
      </Paper>

      {/* Özet Bilgiler */}
      <Paper sx={{ p: 3, backgroundColor: 'primary.50' }}>
        <Typography variant="h6" gutterBottom>
          Özet
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Hizmet:</Typography>
              <Typography variant="body2" fontWeight="bold">
                {service.name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Süre:</Typography>
              <Typography variant="body2" fontWeight="bold">
                {service.duration} dakika
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Tarih:</Typography>
              <Typography variant="body2" fontWeight="bold">
                {formatDate(date)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Saat:</Typography>
              <Typography variant="body2" fontWeight="bold">
                {formatTime(time)}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h4" color="primary" gutterBottom>
                ₺{service.price}
              </Typography>
              <Chip
                label={getStatusText('pending')}
                color={getStatusColor('pending') as any}
                size="small"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Bilgilendirme */}
      <Paper sx={{ p: 2, mt: 2, backgroundColor: 'info.50' }}>
        <Typography variant="body2" color="info.main">
          <strong>Bilgilendirme:</strong> Randevunuz oluşturulduktan sonra işletme tarafından onaylanacaktır. 
          Onay durumu hakkında e-posta ile bilgilendirileceksiniz.
        </Typography>
      </Paper>
    </Box>
  );
}
