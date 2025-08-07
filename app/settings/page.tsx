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
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Security,
  Notifications,
  Language,
  Delete,
  Visibility,
  VisibilityOff,
  Save,
} from '@mui/icons-material';
import { Rating } from '@mui/material';
import { useAuthStore } from '../../store/authStore';

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showEmail: false,
    showPhone: false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordUpdate = async () => {
    setIsLoading(true);
    setMessage(null);

    // Şifre validasyonu
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Yeni şifreler eşleşmiyor!',
      });
      setIsLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: 'Yeni şifre en az 6 karakter olmalıdır!',
      });
      setIsLoading(false);
      return;
    }

    // Simüle edilmiş şifre güncelleme
    setTimeout(() => {
      setMessage({
        type: 'success',
        text: 'Şifre başarıyla güncellendi!',
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePrivacyChange = (setting: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleAccountDeletion = () => {
    if (window.confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      logout();
      router.push('/');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hesap Ayarları
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Şifre Değiştirme */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Şifre Değiştir
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <TextField
                fullWidth
                label="Mevcut Şifre"
                name="currentPassword"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Yeni Şifre"
                name="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Yeni Şifre Tekrar"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                margin="normal"
              />
              
              <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handlePasswordUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowPassword(!showPassword)}
                  startIcon={showPassword ? <VisibilityOff /> : <Visibility />}
                >
                  {showPassword ? 'Gizle' : 'Göster'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bildirim Ayarları */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Bildirim Ayarları
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="E-posta Bildirimleri"
                    secondary="Randevu güncellemeleri ve hatırlatmalar"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.emailNotifications}
                      onChange={() => handleNotificationChange('emailNotifications')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="SMS Bildirimleri"
                    secondary="Önemli güncellemeler için SMS"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.smsNotifications}
                      onChange={() => handleNotificationChange('smsNotifications')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="Push Bildirimleri"
                    secondary="Tarayıcı push bildirimleri"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.pushNotifications}
                      onChange={() => handleNotificationChange('pushNotifications')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText
                    primary="Pazarlama E-postaları"
                    secondary="Yeni hizmetler ve kampanyalar"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.marketingEmails}
                      onChange={() => handleNotificationChange('marketingEmails')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Gizlilik Ayarları */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Gizlilik Ayarları
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profil Görünürlüğü"
                    secondary="Profilinizi diğer kullanıcılar görebilir"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={privacy.profileVisibility}
                      onChange={() => handlePrivacyChange('profileVisibility')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText
                    primary="E-posta Göster"
                    secondary="E-posta adresinizi diğer kullanıcılar görebilir"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={privacy.showEmail}
                      onChange={() => handlePrivacyChange('showEmail')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText
                    primary="Telefon Göster"
                    secondary="Telefon numaranızı diğer kullanıcılar görebilir"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={privacy.showPhone}
                      onChange={() => handlePrivacyChange('showPhone')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Hesap Yönetimi */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Hesap Yönetimi
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Language />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dil Ayarları"
                    secondary="Türkçe"
                  />
                  <Button variant="outlined" size="small">
                    Değiştir
                  </Button>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText
                    primary="İki Faktörlü Doğrulama"
                    secondary="Hesabınızı daha güvenli hale getirin"
                  />
                  <Button variant="outlined" size="small">
                    Etkinleştir
                  </Button>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Delete />
                  </ListItemIcon>
                  <ListItemText
                    primary="Hesabı Sil"
                    secondary="Hesabınızı kalıcı olarak silin"
                  />
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={handleAccountDeletion}
                  >
                    Sil
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
