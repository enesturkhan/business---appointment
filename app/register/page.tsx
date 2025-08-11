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
} from '@mui/material';
import NextLink from 'next/link';
import { useAuthStore } from '../../store/authStore';

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

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'user' | 'business_owner';
}

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string) => {
    let fieldError = '';
    
    if (name === 'name') {
      const nameValidation = validateName(value);
      if (!nameValidation.isValid) {
        fieldError = nameValidation.message;
      }
    } else if (name === 'email') {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid) {
        fieldError = emailValidation.message;
      }
    } else if (name === 'phone') {
      const phoneValidation = validatePhone(value);
      if (!phoneValidation.isValid) {
        fieldError = phoneValidation.message;
      }
    } else if (name === 'password') {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        fieldError = passwordValidation.message;
      }
    } else if (name === 'confirmPassword') {
      const confirmPasswordValidation = validateConfirmPassword(formData.password, value);
      if (!confirmPasswordValidation.isValid) {
        fieldError = confirmPasswordValidation.message;
      }
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
    
    return fieldError === '';
  };

  const validateForm = (): boolean => {
    const nameValid = validateField('name', formData.name);
    const emailValid = validateField('email', formData.email);
    const phoneValid = validateField('phone', formData.phone);
    const passwordValid = validateField('password', formData.password);
    const confirmPasswordValid = validateField('confirmPassword', formData.confirmPassword);
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });
    
    return nameValid && emailValid && phoneValid && passwordValid && confirmPasswordValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    // Simüle edilmiş kayıt işlemi
    setTimeout(() => {
      // Başarılı kayıt sonrası giriş yap
      login({
        email: formData.email,
        name: formData.name,
        role: formData.role,
      });
      
      if (formData.role === 'business_owner') {
        router.push('/business/register');
      } else {
        router.push('/dashboard');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      });
      
      // Real-time validation when field is touched
      if (touched[name]) {
        validateField(name, value as string);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    validateField(name, value);
  };

  const isFormValid = () => {
    return formData.name && formData.email && formData.phone && 
           formData.password && formData.confirmPassword && 
           Object.keys(errors).every(key => !errors[key]);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Kayıt Ol
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Ad Soyad"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Telefon Numarası"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
            />
            
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Hesap Türü</InputLabel>
              <Select
                name="role"
                value={formData.role}
                label="Hesap Türü"
                onChange={handleChange}
              >
                <MenuItem value="user">Normal Kullanıcı</MenuItem>
                <MenuItem value="business_owner">İşletme Sahibi</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Şifre Tekrarı"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading || !isFormValid()}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
            </Button>
            
            <Box sx={{ textAlign: 'center' }}>
              <Link component={NextLink} href="/login" variant="body2">
                {"Zaten hesabınız var mı? Giriş Yapın"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
