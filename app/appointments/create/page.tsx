'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  Chip,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Business,
  CheckCircle,
  ArrowBack,
} from '@mui/icons-material';
import { useAuthStore } from '../../../store/authStore';
import Calendar from '../../../components/Calendar';
import TimeSlotPicker from '../../../components/TimeSlotPicker';
import AppointmentConfirmation from '../../../components/AppointmentConfirmation';

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

const steps = ['İşletme Seçimi', 'Hizmet Seçimi', 'Tarih & Saat', 'Onaylama'];

export default function CreateAppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, user } = useAuthStore();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Mock veriler
  const mockBusinesses: Business[] = [
    {
      id: '1',
      name: 'Güzellik Salonu Elif',
      address: 'Kadıköy, İstanbul',
      phone: '+90 216 555 0123',
      services: [
        {
          id: '1',
          name: 'Saç Kesimi',
          duration: 30,
          price: 150,
          description: 'Profesyonel saç kesimi hizmeti',
        },
        {
          id: '2',
          name: 'Saç Boyama',
          duration: 120,
          price: 300,
          description: 'Kalıcı saç boyama işlemi',
        },
        {
          id: '3',
          name: 'Makyaj',
          duration: 60,
          price: 200,
          description: 'Özel gün makyajı',
        },
      ],
    },
    {
      id: '2',
      name: 'Berber Dükkanı Ahmet',
      address: 'Beşiktaş, İstanbul',
      phone: '+90 212 555 0456',
      services: [
        {
          id: '4',
          name: 'Saç Tıraşı',
          duration: 45,
          price: 100,
          description: 'Modern saç tıraşı',
        },
        {
          id: '5',
          name: 'Sakal Tıraşı',
          duration: 30,
          price: 80,
          description: 'Hijyenik sakal tıraşı',
        },
      ],
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // URL'den işletme ID'si varsa otomatik seç
    const businessId = searchParams.get('businessId');
    if (businessId) {
      const business = mockBusinesses.find(b => b.id === businessId);
      if (business) {
        setSelectedBusiness(business);
        setActiveStep(1);
      }
    }
  }, [isAuthenticated, router, searchParams]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!selectedBusiness || !selectedService || !selectedDate || !selectedTime) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setError('');
    
    // Mock randevu oluşturma
    const appointment = {
      id: Date.now().toString(),
      businessId: selectedBusiness.id,
      serviceId: selectedService.id,
      date: selectedDate,
      time: selectedTime,
      notes,
      status: 'pending' as const,
    };

    console.log('Randevu oluşturuldu:', appointment);
    
    // Başarılı randevu oluşturma sonrası yönlendirme
    router.push('/appointments/history');
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return selectedBusiness !== null;
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== null && selectedTime !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Randevu almak istediğiniz işletmeyi seçin
            </Typography>
            <Grid container spacing={3}>
              {mockBusinesses.map((business) => (
                <Grid item xs={12} md={6} key={business.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: selectedBusiness?.id === business.id ? 2 : 1,
                      borderColor: selectedBusiness?.id === business.id ? 'primary.main' : 'divider',
                    }}
                    onClick={() => setSelectedBusiness(business)}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {business.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {business.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {business.phone}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          label={`${business.services.length} hizmet`}
                          size="small"
                          color="primary"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {selectedBusiness?.name} - Hizmet Seçimi
            </Typography>
            <Grid container spacing={3}>
              {selectedBusiness?.services.map((service) => (
                <Grid item xs={12} md={6} key={service.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: selectedService?.id === service.id ? 2 : 1,
                      borderColor: selectedService?.id === service.id ? 'primary.main' : 'divider',
                    }}
                    onClick={() => setSelectedService(service)}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {service.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" color="primary">
                          ₺{service.price}
                        </Typography>
                        <Chip
                          label={`${service.duration} dk`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Tarih ve Saat Seçimi
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Tarih Seçin
                </Typography>
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  minDate={new Date()}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Saat Seçin
                </Typography>
                <TimeSlotPicker
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                  selectedDate={selectedDate}
                  businessId={selectedBusiness?.id}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notlar (İsteğe bağlı)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Randevu ile ilgili özel isteklerinizi buraya yazabilirsiniz..."
              />
            </Box>
          </Box>
        );

      case 3:
        return (
          <AppointmentConfirmation
            business={selectedBusiness!}
            service={selectedService!}
            date={selectedDate!}
            time={selectedTime}
            notes={notes}
          />
        );

      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Geri Dön
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Randevu Oluştur
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            Geri
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid()}
            endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : undefined}
          >
            {activeStep === steps.length - 1 ? 'Randevu Oluştur' : 'İleri'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
