'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
} from '@mui/material';
import NextLink from 'next/link';
import { useAuthStore } from '../../store/authStore';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

// Validation functions
const validateEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email) {
    return { isValid: false, message: 'E-posta adresi gereklidir' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Geçerli bir e-posta adresi giriniz' };
  }
  
  return { isValid: true, message: '' };
};

const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password) {
    return { isValid: false, message: 'Şifre gereklidir' };
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Şifre en az 6 karakter olmalıdır' };
  }
  
  if (password.length > 50) {
    return { isValid: false, message: 'Şifre en fazla 50 karakter olabilir' };
  }
  
  return { isValid: true, message: '' };
};

const validateConfirmPassword = (password: string, confirmPassword: string): { isValid: boolean; message: string } => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Şifre tekrarı gereklidir' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Şifreler eşleşmiyor' };
  }
  
  return { isValid: true, message: '' };
};

const validateName = (name: string): { isValid: boolean; message: string } => {
  if (!name) {
    return { isValid: false, message: 'Ad soyad gereklidir' };
  }
  
  if (name.length < 2) {
    return { isValid: false, message: 'Ad soyad en az 2 karakter olmalıdır' };
  }
  
  if (name.length > 50) {
    return { isValid: false, message: 'Ad soyad en fazla 50 karakter olabilir' };
  }
  
  return { isValid: true, message: '' };
};

const validatePhone = (phone: string): { isValid: boolean; message: string } => {
  if (!phone) {
    return { isValid: false, message: 'Telefon numarası gereklidir' };
  }
  
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Geçerli bir telefon numarası giriniz' };
  }
  
  return { isValid: true, message: '' };
};

const validateBusinessName = (name: string): { isValid: boolean; message: string } => {
  if (!name) {
    return { isValid: false, message: 'İşletme adı gereklidir' };
  }
  
  if (name.length < 2) {
    return { isValid: false, message: 'İşletme adı en az 2 karakter olmalıdır' };
  }
  
  if (name.length > 100) {
    return { isValid: false, message: 'İşletme adı en fazla 100 karakter olabilir' };
  }
  
  return { isValid: true, message: '' };
};

const validateAddress = (address: string): { isValid: boolean; message: string } => {
  if (!address) {
    return { isValid: false, message: 'Adres gereklidir' };
  }
  
  if (address.length < 10) {
    return { isValid: false, message: 'Adres en az 10 karakter olmalıdır' };
  }
  
  return { isValid: true, message: '' };
};

const validateDescription = (description: string): { isValid: boolean; message: string } => {
  if (!description) {
    return { isValid: false, message: 'Açıklama gereklidir' };
  }
  
  if (description.length < 20) {
    return { isValid: false, message: 'Açıklama en az 20 karakter olmalıdır' };
  }
  
  if (description.length > 500) {
    return { isValid: false, message: 'Açıklama en fazla 500 karakter olabilir' };
  }
  
  return { isValid: true, message: '' };
};

interface UserRegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface BusinessRegisterForm {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  description: string;
  category: string;
}

const businessCategories = [
  'restaurant',
  'cafe',
  'retail',
  'healthcare',
  'beauty',
  'automotive',
  'education',
  'entertainment',
  'professional_services',
  'other'
];

const categoryLabels: Record<string, string> = {
  restaurant: 'Restoran',
  cafe: 'Kafe',
  retail: 'Perakende',
  healthcare: 'Sağlık',
  beauty: 'Güzellik',
  automotive: 'Otomotiv',
  education: 'Eğitim',
  entertainment: 'Eğlence',
  professional_services: 'Profesyonel Hizmetler',
  other: 'Diğer'
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  
  // Step management
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState<'user' | 'business' | null>(null);
  
  // Form states
  const [userForm, setUserForm] = useState<UserRegisterForm>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [businessForm, setBusinessForm] = useState<BusinessRegisterForm>({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    description: '',
    category: '',
  });
  
  // Error states
  const [userErrors, setUserErrors] = useState<Partial<UserRegisterForm>>({});
  const [businessErrors, setBusinessErrors] = useState<Partial<BusinessRegisterForm>>({});
  const [touched, setTouched] = useState<Partial<UserRegisterForm & BusinessRegisterForm>>({});
  
  // Loading and success states
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const steps = ['Hesap Türü Seçimi', 'Bilgi Girişi', 'Doğrulama'];

  const handleTypeSelection = (type: 'user' | 'business') => {
    setSelectedType(type);
    setActiveStep(1);
  };

  const handleUserFormChange = (field: keyof UserRegisterForm, value: string) => {
    setUserForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (userErrors[field]) {
      setUserErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBusinessFormChange = (field: keyof BusinessRegisterForm, value: string) => {
    setBusinessForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (businessErrors[field]) {
      setBusinessErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateUserForm = (): boolean => {
    const errors: Partial<UserRegisterForm> = {};
    
    const nameValidation = validateName(userForm.name);
    if (!nameValidation.isValid) errors.name = nameValidation.message;
    
    const emailValidation = validateEmail(userForm.email);
    if (!emailValidation.isValid) errors.email = emailValidation.message;
    
    const phoneValidation = validatePhone(userForm.phone);
    if (!phoneValidation.isValid) errors.phone = phoneValidation.message;
    
    const passwordValidation = validatePassword(userForm.password);
    if (!passwordValidation.isValid) errors.password = passwordValidation.message;
    
    const confirmPasswordValidation = validateConfirmPassword(userForm.password, userForm.confirmPassword);
    if (!confirmPasswordValidation.isValid) errors.confirmPassword = confirmPasswordValidation.message;
    
    setUserErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateBusinessForm = (): boolean => {
    const errors: Partial<BusinessRegisterForm> = {};
    
    const businessNameValidation = validateBusinessName(businessForm.businessName);
    if (!businessNameValidation.isValid) errors.businessName = businessNameValidation.message;
    
    const ownerNameValidation = validateName(businessForm.ownerName);
    if (!ownerNameValidation.isValid) errors.ownerName = ownerNameValidation.message;
    
    const emailValidation = validateEmail(businessForm.email);
    if (!emailValidation.isValid) errors.email = emailValidation.message;
    
    const phoneValidation = validatePhone(businessForm.phone);
    if (!phoneValidation.isValid) errors.phone = phoneValidation.message;
    
    const passwordValidation = validatePassword(businessForm.password);
    if (!passwordValidation.isValid) errors.password = passwordValidation.message;
    
    const confirmPasswordValidation = validateConfirmPassword(businessForm.password, businessForm.confirmPassword);
    if (!confirmPasswordValidation.isValid) errors.confirmPassword = confirmPasswordValidation.message;
    
    const addressValidation = validateAddress(businessForm.address);
    if (!addressValidation.isValid) errors.address = addressValidation.message;
    
    const descriptionValidation = validateDescription(businessForm.description);
    if (!descriptionValidation.isValid) errors.description = descriptionValidation.message;
    
    if (!businessForm.category) {
      errors.category = 'Kategori seçimi gereklidir';
    }
    
    setBusinessErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUserForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await register(userForm.name, userForm.email, userForm.password, 'user');
      setSuccessMessage('Kullanıcı kaydı başarıyla tamamlandı! Giriş sayfasına yönlendiriliyorsunuz...');
      setActiveStep(2);
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateBusinessForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Business owner registration
      await register(businessForm.ownerName, businessForm.email, businessForm.password, 'business_owner');
      setSuccessMessage('İşletme kaydı başarıyla tamamlandı! Giriş sayfasına yönlendiriliyorsunuz...');
      setActiveStep(2);
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setActiveStep(0);
      setSelectedType(null);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Hesap Türü Seçimi
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Hangi tür hesap oluşturmak istiyorsunuz?
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    }
                  }}
                  onClick={() => handleTypeSelection('user')}
                >
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <PersonIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Kullanıcı Hesabı
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Randevu almak ve hizmetleri kullanmak için
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    }
                  }}
                  onClick={() => handleTypeSelection('business')}
                >
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <BusinessIcon sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      İşletme Hesabı
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hizmet sunmak ve randevu yönetimi için
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
        
      case 1:
        return selectedType === 'user' ? (
          <Box component="form" onSubmit={handleUserSubmit} sx={{ py: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
              Kullanıcı Kayıt Formu
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ad Soyad"
                  value={userForm.name}
                  onChange={(e) => handleUserFormChange('name', e.target.value)}
                  error={!!userErrors.name}
                  helperText={userErrors.name}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-posta"
                  type="email"
                  value={userForm.email}
                  onChange={(e) => handleUserFormChange('email', e.target.value)}
                  error={!!userErrors.email}
                  helperText={userErrors.email}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefon"
                  value={userForm.phone}
                  onChange={(e) => handleUserFormChange('phone', e.target.value)}
                  error={!!userErrors.phone}
                  helperText={userErrors.phone}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Şifre"
                  type="password"
                  value={userForm.password}
                  onChange={(e) => handleUserFormChange('password', e.target.value)}
                  error={!!userErrors.password}
                  helperText={userErrors.password}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Şifre Tekrarı"
                  type="password"
                  value={userForm.confirmPassword}
                  onChange={(e) => handleUserFormChange('confirmPassword', e.target.value)}
                  error={!!userErrors.confirmPassword}
                  helperText={userErrors.confirmPassword}
                  required
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={isLoading}
              >
                Geri
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
              >
                {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleBusinessSubmit} sx={{ py: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
              İşletme Kayıt Formu
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="İşletme Adı"
                  value={businessForm.businessName}
                  onChange={(e) => handleBusinessFormChange('businessName', e.target.value)}
                  error={!!businessErrors.businessName}
                  helperText={businessErrors.businessName}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="İşletme Sahibi Adı"
                  value={businessForm.ownerName}
                  onChange={(e) => handleBusinessFormChange('ownerName', e.target.value)}
                  error={!!businessErrors.ownerName}
                  helperText={businessErrors.ownerName}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-posta"
                  type="email"
                  value={businessForm.email}
                  onChange={(e) => handleBusinessFormChange('email', e.target.value)}
                  error={!!businessErrors.email}
                  helperText={businessErrors.email}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefon"
                  value={businessForm.phone}
                  onChange={(e) => handleBusinessFormChange('phone', e.target.value)}
                  error={!!businessErrors.phone}
                  helperText={businessErrors.phone}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Şifre"
                  type="password"
                  value={businessForm.password}
                  onChange={(e) => handleBusinessFormChange('password', e.target.value)}
                  error={!!businessErrors.password}
                  helperText={businessErrors.password}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Şifre Tekrarı"
                  type="password"
                  value={businessForm.confirmPassword}
                  onChange={(e) => handleBusinessFormChange('confirmPassword', e.target.value)}
                  error={!!businessErrors.confirmPassword}
                  helperText={businessErrors.confirmPassword}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!businessErrors.category}>
                  <InputLabel>Kategori</InputLabel>
                  <Select
                    value={businessForm.category}
                    onChange={(e) => handleBusinessFormChange('category', e.target.value)}
                    label="Kategori"
                  >
                    {businessCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {categoryLabels[category]}
                      </MenuItem>
                    ))}
                  </Select>
                  {businessErrors.category && (
                    <FormHelperText>{businessErrors.category}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adres"
                  value={businessForm.address}
                  onChange={(e) => handleBusinessFormChange('address', e.target.value)}
                  error={!!businessErrors.address}
                  helperText={businessErrors.address}
                  required
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="İşletme Açıklaması"
                  value={businessForm.description}
                  onChange={(e) => handleBusinessFormChange('description', e.target.value)}
                  error={!!businessErrors.description}
                  helperText={businessErrors.description}
                  required
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={isLoading}
              >
                Geri
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
              >
                {isLoading ? 'Kaydediliyor...' : 'İşletme Kaydı Oluştur'}
              </Button>
            </Box>
          </Box>
        );
        
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Kayıt Başarılı!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {successMessage}
            </Typography>
          </Box>
        );
        
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Üye Ol
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Hesabınızı oluşturun ve hizmetlerimizden yararlanmaya başlayın
          </Typography>
        </Box>

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Error and Success Messages */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}
        
        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        {/* Step Content */}
        {renderStepContent()}

        {/* Login Link */}
        {activeStep === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Divider sx={{ mb: 2 }}>
              <Chip label="veya" />
            </Divider>
            <Typography variant="body2">
              Zaten hesabınız var mı?{' '}
              <Link component={NextLink} href="/login" underline="hover">
                Giriş yapın
              </Link>
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
