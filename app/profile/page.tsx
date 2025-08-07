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
  TextField,
  Button,
  Avatar,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { Person, Edit, Save, Cancel } from '@mui/icons-material';
import { useAuthStore } from '../../store/authStore';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user, login } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Kullanıcı bilgilerini forma yükle
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: '', // Şimdilik boş, backend'de eklenecek
        address: '', // Şimdilik boş, backend'de eklenecek
      });
    }
  }, [isAuthenticated, user, router]);

  const handleEdit = () => {
    setIsEditing(true);
    setMessage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
    });
    setMessage(null);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    // Simüle edilmiş güncelleme işlemi
    setTimeout(() => {
      if (user) {
        // Kullanıcı bilgilerini güncelle
        login({
          ...user,
          name: formData.name,
          email: formData.email,
        });
        
        setMessage({
          type: 'success',
          text: 'Profil bilgileri başarıyla güncellendi!',
        });
        setIsEditing(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Profil Bilgileri
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profil Özeti */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: '2rem',
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              <Chip
                label={getRoleText(user?.role || 'user')}
                color={getRoleColor(user?.role || 'user') as any}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Profil Düzenleme */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" component="h2">
                  Kişisel Bilgiler
                </Typography>
                {!isEditing ? (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEdit}
                  >
                    Düzenle
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      İptal
                    </Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ad Soyad"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    margin="normal"
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
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    margin="normal"
                    placeholder="+90 5XX XXX XX XX"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Adres"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    margin="normal"
                    multiline
                    rows={3}
                    placeholder="Açık adres bilgisi..."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Hesap İstatistikleri */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Hesap İstatistikleri
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Toplam Randevu
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success.main">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tamamlanan Randevu
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning.main">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bekleyen Randevu
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
