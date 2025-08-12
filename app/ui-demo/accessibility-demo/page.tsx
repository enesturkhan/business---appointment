'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Accessibility as AccessibilityIcon,
  Keyboard as KeyboardIcon,
  Visibility as VisibilityIcon,
  Hearing as HearingIcon,
  TouchApp as TouchIcon,
  Info as InfoIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import {
  SkipToMainContent,
  FocusTrap,
  ScreenReaderOnly,
  LiveRegion,
  BackToTop,
  AccessibleLoading,
  AccessibleErrorMessage,
  AccessibleFormField,
} from '../../../../components/ui/Accessibility';
import {
  useFocusManagement,
  useKeyboardNavigation,
  useScreenReaderAnnouncement,
  useAriaLabels,
  useFormAccessibility,
  useTableAccessibility,
} from '../../../../hooks/useAccessibility';

// Mock data for demo
const mockUsers = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    role: 'user',
    status: 'active',
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    role: 'admin',
    status: 'active',
  },
];

export default function AccessibilityDemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showFocusTrap, setShowFocusTrap] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  // Accessibility hooks
  const { focusRef, focusElement } = useFocusManagement();
  const { handleKeyDown } = useKeyboardNavigation();
  const { announce } = useScreenReaderAnnouncement();
  const { getButtonAriaLabel, getLinkAriaLabel } = useAriaLabels();
  const { getFieldAccessibilityProps, setFieldError, clearFieldError } = useFormAccessibility();
  const { getTableAccessibilityProps, getTableHeaderAccessibilityProps, getTableRowAccessibilityProps } = useTableAccessibility();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Ad alanı zorunludur';
    if (!formData.email) newErrors.email = 'E-posta alanı zorunludur';
    if (!formData.role) newErrors.role = 'Rol seçimi zorunludur';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      announce('Form hataları bulundu', 'assertive');
    } else {
      setErrors({});
      announce('Form başarıyla gönderildi', 'polite');
      setFormData({ name: '', email: '', role: '' });
    }
  };

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    handleKeyDown(e.nativeEvent, {
      onEnter: () => console.log('Enter pressed'),
      onEscape: () => console.log('Escape pressed'),
      onArrowUp: () => console.log('Arrow Up pressed'),
      onArrowDown: () => console.log('Arrow Down pressed'),
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Skip to main content */}
      <SkipToMainContent />
      
      {/* Live region for announcements */}
      <LiveRegion ariaLive="polite">
        {announcement}
      </LiveRegion>

      <Typography variant="h4" component="h1" gutterBottom>
        Accessibility Demo
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Bu sayfa farklı accessibility özelliklerini göstermek için oluşturulmuştur.
      </Typography>

      <Grid container spacing={3}>
        {/* Accessibility Overview */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <AccessibilityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Accessibility Özellikleri
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <KeyboardIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2">Keyboard Navigation</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <VisibilityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2">Visual Accessibility</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <HearingIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2">Screen Reader</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <TouchIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2">Touch Friendly</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Focus Management Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Focus Management
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => focusElement()}
                  aria-label="İlk input alanına odaklan"
                >
                  İlk Input'a Odaklan
                </Button>
                
                <TextField
                  ref={focusRef}
                  label="Odaklanacak alan"
                  placeholder="Bu alana odaklanılacak"
                  fullWidth
                />
                
                <TextField
                  label="İkinci alan"
                  placeholder="İkinci input alanı"
                  fullWidth
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Keyboard Navigation Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Keyboard Navigation
              </Typography>
              
              <Box 
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                }}
                tabIndex={0}
                onKeyDown={handleKeyNavigation}
                role="button"
                aria-label="Test için klavye tuşlarını kullanın"
              >
                <Typography variant="body2" gutterBottom>
                  Bu alana odaklanın ve klavye tuşlarını kullanın:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Enter, Escape, Arrow keys" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Console'da sonuçları görebilirsiniz" />
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Accessible Form Demo */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Accessible Form
              </Typography>
              
              <Box component="form" onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <AccessibleFormField
                      label="Ad Soyad"
                      required
                      error={errors.name}
                      helperText="Tam adınızı girin"
                    >
                      <TextField
                        fullWidth
                        value={formData.name}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, name: e.target.value }));
                          if (errors.name) clearFieldError('name');
                        }}
                        placeholder="Adınızı girin"
                        {...getFieldAccessibilityProps('name')}
                      />
                    </AccessibleFormField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <AccessibleFormField
                      label="E-posta"
                      required
                      error={errors.email}
                      helperText="Geçerli e-posta adresi girin"
                    >
                      <TextField
                        fullWidth
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, email: e.target.value }));
                          if (errors.email) clearFieldError('email');
                        }}
                        placeholder="E-posta adresinizi girin"
                        {...getFieldAccessibilityProps('email')}
                      />
                    </AccessibleFormField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <AccessibleFormField
                      label="Rol"
                      required
                      error={errors.role}
                      helperText="Kullanıcı rolünü seçin"
                    >
                      <FormControl fullWidth>
                        <InputLabel id="role-label">Rol</InputLabel>
                        <Select
                          labelId="role-label"
                          value={formData.role}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, role: e.target.value }));
                            if (errors.role) clearFieldError('role');
                          }}
                          label="Rol"
                          {...getFieldAccessibilityProps('role')}
                        >
                          <MenuItem value="user">Kullanıcı</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="moderator">Moderatör</MenuItem>
                        </Select>
                      </FormControl>
                    </AccessibleFormField>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      aria-label="Formu gönder"
                    >
                      Gönder
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Accessible Table Demo */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Accessible Table
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table {...getTableAccessibilityProps()}>
                  <TableHead>
                    <TableRow {...getTableHeaderAccessibilityProps()}>
                      <TableCell role="columnheader" aria-label="Kullanıcı avatarı">
                        Avatar
                      </TableCell>
                      <TableCell role="columnheader" aria-label="Kullanıcı adı">
                        Ad
                      </TableCell>
                      <TableCell role="columnheader" aria-label="E-posta adresi">
                        E-posta
                      </TableCell>
                      <TableCell role="columnheader" aria-label="Kullanıcı rolü">
                        Rol
                      </TableCell>
                      <TableCell role="columnheader" aria-label="Kullanıcı durumu">
                        Durum
                      </TableCell>
                      <TableCell role="columnheader" aria-label="İşlem butonları">
                        İşlemler
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockUsers.map((user, index) => (
                      <TableRow 
                        key={user.id} 
                        hover
                        {...getTableRowAccessibilityProps(index)}
                        aria-label={`${user.name} kullanıcısı`}
                      >
                        <TableCell role="cell">
                          <Avatar 
                            sx={{ bgcolor: 'primary.main' }}
                            aria-label={`${user.name} kullanıcısının avatarı`}
                          >
                            {user.name.charAt(0)}
                          </Avatar>
                        </TableCell>
                        <TableCell role="cell">
                          <Typography variant="body2">{user.name}</Typography>
                        </TableCell>
                        <TableCell role="cell">
                          <Typography variant="body2">{user.email}</Typography>
                        </TableCell>
                        <TableCell role="cell">
                          <Chip 
                            label={user.role === 'admin' ? 'Admin' : 'Kullanıcı'} 
                            size="small"
                            variant="outlined"
                            aria-label={`${user.role === 'admin' ? 'Admin' : 'Kullanıcı'} rolü`}
                          />
                        </TableCell>
                        <TableCell role="cell">
                          <Chip 
                            label="Aktif"
                            color="success"
                            size="small"
                            aria-label="Aktif durumu"
                          />
                        </TableCell>
                        <TableCell role="cell">
                          <IconButton
                            size="small"
                            aria-label={`${user.name} için işlem menüsünü aç`}
                            aria-haspopup="true"
                          >
                            <MoreIcon aria-hidden="true" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Focus Trap Demo */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Focus Trap Demo
              </Typography>
              
              <Button
                variant="contained"
                onClick={() => setShowFocusTrap(true)}
                aria-label="Focus trap demo'sunu aç"
              >
                Focus Trap Demo'sunu Aç
              </Button>
              
              {showFocusTrap && (
                <FocusTrap>
                  <Box
                    sx={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                      p: 3,
                      zIndex: 1000,
                      minWidth: 300,
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="focus-trap-title"
                  >
                    <Typography id="focus-trap-title" variant="h6" gutterBottom>
                      Focus Trap Demo
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Bu modal içinde Tab tuşu ile focus'u test edin.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button variant="outlined" size="small">
                        İlk Buton
                      </Button>
                      <Button variant="outlined" size="small">
                        İkinci Buton
                      </Button>
                      <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => setShowFocusTrap(false)}
                        aria-label="Modal'ı kapat"
                      >
                        Kapat
                      </Button>
                    </Box>
                  </Box>
                </FocusTrap>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Accessibility Best Practices */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Accessibility Best Practices
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Alert severity="success" icon={<CheckIcon />}>
                    <AlertTitle>Yapılan İyileştirmeler</AlertTitle>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText primary="ARIA labels ve roles" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Keyboard navigation" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Focus management" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Screen reader support" />
                      </ListItem>
                    </List>
                  </Alert>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Alert severity="info" icon={<InfoIcon />}>
                    <AlertTitle>Test Edilebilir Özellikler</AlertTitle>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon fontSize="small" color="info" />
                        </ListItemIcon>
                        <ListItemText primary="Tab ile navigation" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon fontSize="small" color="info" />
                        </ListItemIcon>
                        <ListItemText primary="Screen reader test" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon fontSize="small" color="info" />
                        </ListItemIcon>
                        <ListItemText primary="Color contrast" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon fontSize="small" color="info" />
                        </ListItemIcon>
                        <ListItemText primary="Keyboard shortcuts" />
                      </ListItem>
                    </List>
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Back to top button */}
      <BackToTop />
    </Container>
  );
}
