'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Business,
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Save,
  ArrowBack,
} from '@mui/icons-material';
import { useAuthStore } from '../../../store/authStore';

const categories = [
  'Güzellik',
  'Berber',
  'Kuafor',
  'Sağlık',
  'Spor',
  'Eğitim',
  'Hukuk',
  'Muhasebe',
  'Diğer',
];

const workingDays = [
  { day: 'Pazartesi', key: 'monday' },
  { day: 'Salı', key: 'tuesday' },
  { day: 'Çarşamba', key: 'wednesday' },
  { day: 'Perşembe', key: 'thursday' },
  { day: 'Cuma', key: 'friday' },
  { day: 'Cumartesi', key: 'saturday' },
  { day: 'Pazar', key: 'sunday' },
];

const steps = ['Temel Bilgiler', 'İletişim Bilgileri', 'Çalışma Saatleri', 'Onay'];

export default function BusinessRegisterPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    // Temel Bilgiler
    businessName: '',
    category: '',
    description: '',
    
    // İletişim Bilgileri
    address: '',
    phone: '',
    email: '',
    website: '',
    
    // Çalışma Saatleri
    workingHours: {
      monday: { isOpen: true, start: '09:00', end: '18:00' },
      tuesday: { isOpen: true, start: '09:00', end: '18:00' },
      wednesday: { isOpen: true, start: '09:00', end: '18:00' },
      thursday: { isOpen: true, start: '09:00', end: '18:00' },
      friday: { isOpen: true, start: '09:00', end: '18:00' },
      saturday: { isOpen: true, start: '09:00', end: '17:00' },
      sunday: { isOpen: false, start: '09:00', end: '17:00' },
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage(null);

    // Simüle edilmiş kayıt işlemi
    setTimeout(() => {
      setMessage({
        type: 'success',
        text: 'İşletme başarıyla kaydedildi! Yönlendiriliyorsunuz...',
      });
      
      setTimeout(() => {
        router.push('/business/dashboard');
      }, 2000);
      
      setIsLoading(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWorkingHoursChange = (day: string, field: string, value: any) => {
    setFormData({
      ...formData,
      workingHours: {
        ...formData.workingHours,
        [day]: {
          ...formData.workingHours[day as keyof typeof formData.workingHours],
          [field]: value,
        },
      },
    });
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.businessName && formData.category && formData.description;
      case 1:
        return formData.address && formData.phone && formData.email;
      case 2:
        return true; // Çalışma saatleri opsiyonel
      default:
        return true;
    }
  };

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        İşletme Kaydı
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        İşletmenizi sisteme kaydedin ve müşterilerinizle buluşun
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      {/* Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Card>
        <CardContent>
          {/* Step 1: Temel Bilgiler */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Temel Bilgiler
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="İşletme Adı"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Kategori</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      label="Kategori"
                      onChange={handleSelectChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="İşletme Açıklaması"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                    placeholder="İşletmeniz hakkında detaylı bilgi verin..."
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 2: İletişim Bilgileri */}
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                İletişim Bilgileri
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Adres"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+90 5XX XXX XX XX"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="E-posta"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Web Sitesi (Opsiyonel)"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://www.example.com"
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 3: Çalışma Saatleri */}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Çalışma Saatleri
              </Typography>
              <Grid container spacing={2}>
                {workingDays.map(({ day, key }) => (
                  <Grid item xs={12} key={key}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.workingHours[key as keyof typeof formData.workingHours].isOpen}
                            onChange={(e) => handleWorkingHoursChange(key, 'isOpen', e.target.checked)}
                          />
                        }
                        label={day}
                        sx={{ minWidth: 120 }}
                      />
                      {formData.workingHours[key as keyof typeof formData.workingHours].isOpen && (
                        <>
                          <TextField
                            type="time"
                            value={formData.workingHours[key as keyof typeof formData.workingHours].start}
                            onChange={(e) => handleWorkingHoursChange(key, 'start', e.target.value)}
                            size="small"
                          />
                          <Typography variant="body2">-</Typography>
                          <TextField
                            type="time"
                            value={formData.workingHours[key as keyof typeof formData.workingHours].end}
                            onChange={(e) => handleWorkingHoursChange(key, 'end', e.target.value)}
                            size="small"
                          />
                        </>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Step 4: Onay */}
          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Bilgileri Onaylayın
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Temel Bilgiler
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      İşletme Adı: <strong>{formData.businessName}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Kategori: <strong>{formData.category}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Açıklama: {formData.description}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    İletişim Bilgileri
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Adres: {formData.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Telefon: {formData.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      E-posta: {formData.email}
                    </Typography>
                    {formData.website && (
                      <Typography variant="body2" color="text.secondary">
                        Web Sitesi: {formData.website}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
            >
              Geri
            </Button>
            
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  startIcon={<Save />}
                >
                  {isLoading ? 'Kaydediliyor...' : 'İşletmeyi Kaydet'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                >
                  İleri
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
