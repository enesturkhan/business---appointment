'use client';

import { useState, useEffect } from 'react';
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
  FormHelperText,
} from '@mui/material';
import NextLink from 'next/link';
import { LoginForm } from '../../types';
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
  
  return { isValid: true, message: '' };
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);
    
    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });
    
    return emailValid && passwordValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    // Simüle edilmiş giriş kontrolü
    setTimeout(() => {
      if (formData.email === 'admin@test.com' && formData.password === '123456') {
        // Admin kullanıcısı
        login({
          email: 'admin@test.com',
          name: 'Admin Kullanıcı',
          role: 'admin',
        });
        router.push('/dashboard');
      } else if (formData.email === 'user@test.com' && formData.password === '123456') {
        // Normal kullanıcı
        login({
          email: 'user@test.com',
          name: 'Test Kullanıcı',
          role: 'user',
        });
        router.push('/dashboard');
      } else if (formData.email === 'business@test.com' && formData.password === '123456') {
        // İşletme sahibi
        login({
          email: 'business@test.com',
          name: 'İşletme Sahibi',
          role: 'business',
        });
        router.push('/dashboard');
      } else {
        setError('E-posta veya şifre hatalı!');
      }
      setIsLoading(false);
    }, 1000);
  };

  const validateField = (name: string, value: string) => {
    let fieldError = '';
    
    if (name === 'email') {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid) {
        fieldError = emailValidation.message;
      }
    } else if (name === 'password') {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        fieldError = passwordValidation.message;
      }
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
    
    return fieldError === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Real-time validation when field is touched
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
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

  return (
    <Container component="main" maxWidth="xs">
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
            Giriş Yap
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
              id="email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              autoFocus
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
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading || !formData.email || !formData.password}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={NextLink} href="/register" variant="body2">
                {"Hesabınız yok mu? Kayıt Olun"}
              </Link>
            </Box>
          </Box>

          {/* Test Kullanıcıları */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1, width: '100%' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Test Kullanıcıları:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Admin: admin@test.com / 123456<br />
              Kullanıcı: user@test.com / 123456<br />
              İşletme: business@test.com / 123456
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
