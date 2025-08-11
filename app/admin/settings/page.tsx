'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
} from '@mui/material';
import { useNotifications } from '../../components/ui/NotificationSystem';
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  SystemUpdate as SystemUpdateIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon,
  ExpandMore as ExpandMoreIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  Shield as ShieldIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    // Sistem Ayarları
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    backupFrequency: 24, // saat
    maxFileSize: 10, // MB
    sessionTimeout: 30, // dakika
    
    // Bildirim Ayarları
    emailNotifications: true,
    pushNotifications: true,
    notificationSound: true,
    notificationVolume: 70,
    
    // Güvenlik Ayarları
    twoFactorAuth: true,
    passwordPolicy: 'strong',
    loginAttempts: 5,
    accountLockout: true,
    lockoutDuration: 15, // dakika
    
    // Genel Ayarlar
    language: 'tr',
    timezone: 'Europe/Istanbul',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    theme: 'auto',
    
    // İşletme Ayarları
    autoApproveBusinesses: false,
    businessVerificationRequired: true,
    maxBusinessImages: 10,
    businessRatingEnabled: true,
    
    // Randevu Ayarları
    appointmentReminder: true,
    reminderTime: 60, // dakika önce
    maxAppointmentDuration: 120, // dakika
    allowCancellation: true,
    cancellationDeadline: 24, // saat önce
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  const [activeSection, setActiveSection] = useState<string | false>('system');

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Burada ayarları API'ye kaydet
    setSnackbar({
      open: true,
      message: 'Ayarlar başarıyla kaydedildi!',
      severity: 'success'
    });
  };

  const handleReset = () => {
    // Varsayılan ayarlara döndür
    setSnackbar({
      open: true,
      message: 'Ayarlar varsayılan değerlere sıfırlandı!',
      severity: 'warning'
    });
  };

  const handleBackup = () => {
    setSnackbar({
      open: true,
      message: 'Sistem yedeği başlatıldı!',
      severity: 'info'
    });
  };

  const handleRestore = () => {
    setSnackbar({
      open: true,
      message: 'Sistem geri yükleme başlatıldı!',
      severity: 'info'
    });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <SettingsIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Admin Ayarları
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Sol Panel - Ayarlar Kategorileri */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ayar Kategorileri
            </Typography>
            <List>
              {[
                { key: 'system', label: 'Sistem Ayarları', icon: SystemUpdateIcon },
                { key: 'notifications', label: 'Bildirim Ayarları', icon: NotificationsIcon },
                { key: 'security', label: 'Güvenlik Ayarları', icon: SecurityIcon },
                { key: 'general', label: 'Genel Ayarlar', icon: SettingsIcon },
                { key: 'business', label: 'İşletme Ayarları', icon: AdminPanelSettingsIcon },
                { key: 'appointments', label: 'Randevu Ayarları', icon: SettingsIcon },
              ].map((section) => (
                                 <ListItem
                   key={section.key}
                   button
                   selected={activeSection === section.key}
                   onClick={() => setActiveSection(section.key)}
                   sx={{
                     borderRadius: 1,
                     mb: 0.5,
                     cursor: 'pointer',
                     transition: 'all 0.2s ease-in-out',
                     '&:hover': {
                       backgroundColor: 'action.hover',
                       transform: 'translateX(4px)',
                     },
                     '&.Mui-selected': {
                       backgroundColor: 'primary.light',
                       color: 'primary.contrastText',
                       '&:hover': {
                         backgroundColor: 'primary.main',
                       }
                     }
                   }}
                 >
                  <section.icon sx={{ mr: 2, fontSize: 20 }} />
                  <ListItemText primary={section.label} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Sağ Panel - Ayarlar İçeriği */}
        <Grid item xs={12} md={9}>
          {/* Sistem Ayarları */}
          {activeSection === 'system' && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SystemUpdateIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Sistem Ayarları</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.maintenanceMode}
                          onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                        />
                      }
                      label="Bakım Modu"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                      Sistem bakım moduna alınır, sadece adminler erişebilir
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.debugMode}
                          onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
                        />
                      }
                      label="Debug Modu"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                      Detaylı hata logları ve debug bilgileri
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.autoBackup}
                          onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                        />
                      }
                      label="Otomatik Yedekleme"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Yedekleme Sıklığı (Saat)"
                      type="number"
                      value={settings.backupFrequency}
                      onChange={(e) => handleSettingChange('backupFrequency', parseInt(e.target.value))}
                      InputProps={{ endAdornment: <Typography variant="caption">saat</Typography> }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Maksimum Dosya Boyutu (MB)"
                      type="number"
                      value={settings.maxFileSize}
                      onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                      InputProps={{ endAdornment: <Typography variant="caption">MB</Typography> }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Oturum Zaman Aşımı (Dakika)"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                      InputProps={{ endAdornment: <Typography variant="caption">dakika</Typography> }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Bildirim Ayarları */}
          {activeSection === 'notifications' && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Bildirim Ayarları</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                        />
                      }
                      label="E-posta Bildirimleri"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.pushNotifications}
                          onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                        />
                      }
                      label="Push Bildirimleri"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notificationSound}
                          onChange={(e) => handleSettingChange('notificationSound', e.target.checked)}
                        />
                      }
                      label="Bildirim Sesi"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography gutterBottom>Bildirim Sesi Seviyesi</Typography>
                      <Slider
                        value={settings.notificationVolume}
                        onChange={(_, value) => handleSettingChange('notificationVolume', value)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        marks={[
                          { value: 0, label: '0%' },
                          { value: 50, label: '50%' },
                          { value: 100, label: '100%' }
                        ]}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Güvenlik Ayarları */}
          {activeSection === 'security' && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Güvenlik Ayarları</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                        />
                      }
                      label="İki Faktörlü Kimlik Doğrulama"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Şifre Politikası</InputLabel>
                      <Select
                        value={settings.passwordPolicy}
                        label="Şifre Politikası"
                        onChange={(e) => handleSettingChange('passwordPolicy', e.target.value)}
                      >
                        <MenuItem value="weak">Zayıf</MenuItem>
                        <MenuItem value="medium">Orta</MenuItem>
                        <MenuItem value="strong">Güçlü</MenuItem>
                        <MenuItem value="very-strong">Çok Güçlü</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Maksimum Giriş Denemesi"
                      type="number"
                      value={settings.loginAttempts}
                      onChange={(e) => handleSettingChange('loginAttempts', parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.accountLockout}
                          onChange={(e) => handleSettingChange('accountLockout', e.target.checked)}
                        />
                      }
                      label="Hesap Kilitleme"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Kilitleme Süresi (Dakika)"
                      type="number"
                      value={settings.lockoutDuration}
                      onChange={(e) => handleSettingChange('lockoutDuration', parseInt(e.target.value))}
                      InputProps={{ endAdornment: <Typography variant="caption">dakika</Typography> }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Genel Ayarlar */}
          {activeSection === 'general' && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Genel Ayarlar</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Dil</InputLabel>
                      <Select
                        value={settings.language}
                        label="Dil"
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                      >
                        <MenuItem value="tr">Türkçe</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="de">Deutsch</MenuItem>
                        <MenuItem value="fr">Français</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Saat Dilimi</InputLabel>
                      <Select
                        value={settings.timezone}
                        label="Saat Dilimi"
                        onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      >
                        <MenuItem value="Europe/Istanbul">İstanbul (UTC+3)</MenuItem>
                        <MenuItem value="Europe/London">Londra (UTC+0)</MenuItem>
                        <MenuItem value="America/New_York">New York (UTC-5)</MenuItem>
                        <MenuItem value="Asia/Tokyo">Tokyo (UTC+9)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Tarih Formatı</InputLabel>
                      <Select
                        value={settings.dateFormat}
                        label="Tarih Formatı"
                        onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                      >
                        <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                        <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                        <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Saat Formatı</InputLabel>
                      <Select
                        value={settings.timeFormat}
                        label="Saat Formatı"
                        onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
                      >
                        <MenuItem value="12h">12 Saat</MenuItem>
                        <MenuItem value="24h">24 Saat</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Tema</InputLabel>
                      <Select
                        value={settings.theme}
                        label="Tema"
                        onChange={(e) => handleSettingChange('theme', e.target.value)}
                      >
                        <MenuItem value="light">Açık</MenuItem>
                        <MenuItem value="dark">Koyu</MenuItem>
                        <MenuItem value="auto">Otomatik</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* İşletme Ayarları */}
          {activeSection === 'business' && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AdminPanelSettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">İşletme Ayarları</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.autoApproveBusinesses}
                          onChange={(e) => handleSettingChange('autoApproveBusinesses', e.target.checked)}
                        />
                      }
                      label="Otomatik İşletme Onayı"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                      Yeni işletmeler otomatik olarak onaylanır
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.businessVerificationRequired}
                          onChange={(e) => handleSettingChange('businessVerificationRequired', e.target.checked)}
                        />
                      }
                      label="İşletme Doğrulama Gerekli"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Maksimum İşletme Görseli"
                      type="number"
                      value={settings.maxBusinessImages}
                      onChange={(e) => handleSettingChange('maxBusinessImages', parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.businessRatingEnabled}
                          onChange={(e) => handleSettingChange('businessRatingEnabled', e.target.checked)}
                        />
                      }
                      label="İşletme Değerlendirme Sistemi"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Randevu Ayarları */}
          {activeSection === 'appointments' && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Randevu Ayarları</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.appointmentReminder}
                          onChange={(e) => handleSettingChange('appointmentReminder', e.target.checked)}
                        />
                      }
                      label="Randevu Hatırlatması"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Hatırlatma Zamanı (Dakika Önce)"
                      type="number"
                      value={settings.reminderTime}
                      onChange={(e) => handleSettingChange('reminderTime', parseInt(e.target.value))}
                      InputProps={{ endAdornment: <Typography variant="caption">dakika</Typography> }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Maksimum Randevu Süresi (Dakika)"
                      type="number"
                      value={settings.maxAppointmentDuration}
                      onChange={(e) => handleSettingChange('maxAppointmentDuration', parseInt(e.target.value))}
                      InputProps={{ endAdornment: <Typography variant="caption">dakika</Typography> }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.allowCancellation}
                          onChange={(e) => handleSettingChange('allowCancellation', e.target.checked)}
                        />
                      }
                      label="Randevu İptaline İzin Ver"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="İptal Son Tarihi (Saat Önce)"
                      type="number"
                      value={settings.cancellationDeadline}
                      onChange={(e) => handleSettingChange('cancellationDeadline', parseInt(e.target.value))}
                      InputProps={{ endAdornment: <Typography variant="caption">saat</Typography> }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Alt Butonlar */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          size="large"
        >
          Ayarları Kaydet
        </Button>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleReset}
          size="large"
        >
          Varsayılana Döndür
        </Button>
        <Button
          variant="outlined"
          startIcon={<BackupIcon />}
          onClick={handleBackup}
          size="large"
        >
          Sistem Yedeği
        </Button>
        <Button
          variant="outlined"
          startIcon={<RestoreIcon />}
          onClick={handleRestore}
          size="large"
        >
          Sistem Geri Yükle
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
