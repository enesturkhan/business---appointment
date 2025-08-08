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
  CardActions,
  Button,
  Chip,
  Tabs,
  Tab,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Business,
  LocationOn,
  Phone,
  CheckCircle,
  Cancel,
  Schedule,
  Info,
  Visibility,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useAuthStore } from '../../../store/authStore';

interface Appointment {
  id: string;
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
}

export default function AppointmentHistoryPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // Mock randevu verileri
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      businessName: 'Güzellik Salonu Elif',
      businessAddress: 'Kadıköy, İstanbul',
      businessPhone: '+90 216 555 0123',
      serviceName: 'Saç Kesimi',
      servicePrice: 150,
      serviceDuration: 30,
      date: new Date(2024, 11, 15),
      time: '14:00',
      status: 'confirmed',
      notes: 'Kısa saç modeli istiyorum',
      createdAt: new Date(2024, 11, 10),
    },
    {
      id: '2',
      businessName: 'Berber Dükkanı Ahmet',
      businessAddress: 'Beşiktaş, İstanbul',
      businessPhone: '+90 212 555 0456',
      serviceName: 'Saç Tıraşı',
      servicePrice: 100,
      serviceDuration: 45,
      date: new Date(2024, 11, 20),
      time: '16:30',
      status: 'pending',
      createdAt: new Date(2024, 11, 12),
    },
    {
      id: '3',
      businessName: 'Diş Kliniği Dr. Ayşe',
      businessAddress: 'Şişli, İstanbul',
      businessPhone: '+90 212 555 0789',
      serviceName: 'Diş Muayenesi',
      servicePrice: 300,
      serviceDuration: 60,
      date: new Date(2024, 11, 8),
      time: '10:00',
      status: 'completed',
      createdAt: new Date(2024, 11, 5),
    },
    {
      id: '4',
      businessName: 'Spor Salonu FitLife',
      businessAddress: 'Bakırköy, İstanbul',
      businessPhone: '+90 212 555 0321',
      serviceName: 'Kişisel Antrenör',
      servicePrice: 200,
      serviceDuration: 60,
      date: new Date(2024, 11, 25),
      time: '18:00',
      status: 'cancelled',
      notes: 'Hastalık nedeniyle iptal',
      createdAt: new Date(2024, 11, 15),
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Mock API çağrısı
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, [isAuthenticated, router]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'info';
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
      case 'completed':
        return 'Tamamlandı';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Schedule />;
      case 'confirmed':
        return <CheckCircle />;
      case 'cancelled':
        return <Cancel />;
      case 'completed':
        return <CheckCircle />;
      default:
        return <Info />;
    }
  };

  const filterAppointments = (status?: string) => {
    if (!status) return appointments;
    return appointments.filter(appointment => appointment.status === status);
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDialogOpen(true);
  };

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    if (selectedAppointment) {
      setAppointments(prev => 
        prev.map(app => 
          app.id === selectedAppointment.id 
            ? { ...app, status: 'cancelled' as const }
            : app
        )
      );
      setCancelDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('tr-TR', options);
  };

  const tabs = [
    { label: 'Tümü', value: 'all' },
    { label: 'Beklemede', value: 'pending' },
    { label: 'Onaylandı', value: 'confirmed' },
    { label: 'Tamamlandı', value: 'completed' },
    { label: 'İptal Edildi', value: 'cancelled' },
  ];

  const filteredAppointments = filterAppointments(
    selectedTab === 0 ? undefined : tabs[selectedTab].value
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Randevu Geçmişi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tüm randevularınızı buradan takip edebilirsiniz
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable">
          {tabs.map((tab, index) => (
            <Tab key={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ width: '60%', height: 24, bgcolor: 'grey.200' }} />
                    <Chip sx={{ width: 80, height: 24, bgcolor: 'grey.200' }} />
                  </Box>
                  <Typography sx={{ width: '40%', height: 20, bgcolor: 'grey.200', mb: 1 }} />
                  <Typography sx={{ width: '70%', height: 20, bgcolor: 'grey.200' }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : filteredAppointments.length === 0 ? (
        <Alert severity="info">
          {selectedTab === 0 
            ? 'Henüz randevunuz bulunmuyor.' 
            : `${tabs[selectedTab].label} randevunuz bulunmuyor.`
          }
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredAppointments.map((appointment) => (
            <Grid item xs={12} md={6} key={appointment.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {appointment.businessName}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(appointment.status)}
                      label={getStatusText(appointment.status)}
                      color={getStatusColor(appointment.status) as any}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {appointment.serviceName}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CalendarToday fontSize="small" color="action" />
                    <Typography variant="body2">
                      {formatDate(appointment.date)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2">
                      {appointment.time} ({appointment.serviceDuration} dk)
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ₺{appointment.servicePrice}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(appointment)}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      {appointment.status === 'pending' && (
                        <IconButton
                          size="small"
                          onClick={() => handleCancelAppointment(appointment)}
                          color="error"
                        >
                          <CancelIcon />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Detay Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Randevu Detayları
        </DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <Box>
              <Grid container spacing={3}>
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
                        primary={selectedAppointment.businessName}
                        secondary="İşletme Adı"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn />
                      </ListItemIcon>
                      <ListItemText
                        primary={selectedAppointment.businessAddress}
                        secondary="Adres"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText
                        primary={selectedAppointment.businessPhone}
                        secondary="Telefon"
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle color="primary" />
                    Randevu Bilgileri
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle />
                      </ListItemIcon>
                      <ListItemText
                        primary={selectedAppointment.serviceName}
                        secondary="Hizmet"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday />
                      </ListItemIcon>
                      <ListItemText
                        primary={formatDate(selectedAppointment.date)}
                        secondary="Tarih"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTime />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${selectedAppointment.time} (${selectedAppointment.serviceDuration} dk)`}
                        secondary="Saat"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              
              {selectedAppointment.notes && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Notlar
                  </Typography>
                  <Typography variant="body1">
                    {selectedAppointment.notes}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Kapat
          </Button>
        </DialogActions>
      </Dialog>

      {/* İptal Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>
          Randevu İptali
        </DialogTitle>
        <DialogContent>
          <Typography>
            Bu randevuyu iptal etmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            Vazgeç
          </Button>
          <Button onClick={confirmCancel} color="error" variant="contained">
            İptal Et
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
