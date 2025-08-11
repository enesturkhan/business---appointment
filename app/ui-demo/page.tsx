'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import LoadingSpinner, { 
  LoadingSkeleton, 
  TableLoadingSkeleton, 
  ButtonLoadingSpinner 
} from '../../components/ui/LoadingSpinner';
import { 
  useNotifications, 
  SuccessMessage, 
  ErrorMessage 
} from '../../components/ui/NotificationSystem';
import { 
  ConfirmationDialog, 
  DeleteConfirmationDialog,
  UpdateConfirmationDialog,
  useConfirmationDialog 
} from '../../components/ui/ConfirmationDialog';

export default function UIDemo() {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications();
  const { confirm, confirmDelete } = useConfirmationDialog();
  
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleShowSuccess = () => {
    showSuccess('Bu bir başarı mesajıdır!');
  };

  const handleShowError = () => {
    showError('Bu bir hata mesajıdır!');
  };

  const handleShowWarning = () => {
    showWarning('Bu bir uyarı mesajıdır!');
  };

  const handleShowInfo = () => {
    showInfo('Bu bir bilgi mesajıdır!');
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const handleTableLoading = () => {
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 3000);
  };

  const handleDeleteConfirm = () => {
    confirmDelete('Test Öğesi', () => {
      showSuccess('Öğe başarıyla silindi!');
    });
  };

  const handleUpdateConfirm = () => {
    confirm('Güncelleme Onayı', 'Bu değişiklikleri kaydetmek istediğinizden emin misiniz?', () => {
      showSuccess('Değişiklikler kaydedildi!');
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        UI/UX İyileştirmeleri Demo
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Bu sayfa, eklenen tüm UI/UX iyileştirmelerini test etmek için oluşturulmuştur.
      </Typography>

      <Grid container spacing={3}>
        {/* Loading States */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                🌀 Loading States
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Loading Spinner</Typography>
                <Button
                  variant="contained"
                  onClick={handleLoading}
                  disabled={loading}
                  startIcon={loading ? <ButtonLoadingSpinner /> : <PlayIcon />}
                >
                  {loading ? 'Yükleniyor...' : 'Loading Başlat'}
                </Button>
                
                {loading && (
                  <Box sx={{ mt: 2 }}>
                    <LoadingSpinner message="Veriler yükleniyor..." />
                  </Box>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Table Loading</Typography>
                <Button
                  variant="outlined"
                  onClick={handleTableLoading}
                  disabled={tableLoading}
                >
                  {tableLoading ? 'Yükleniyor...' : 'Tablo Loading'}
                </Button>
                
                {tableLoading ? (
                  <TableLoadingSkeleton rows={3} columns={4} />
                ) : (
                  <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Tablo verileri burada görünecek
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>Skeleton Loading</Typography>
                <LoadingSkeleton />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                🔔 Notifications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleShowSuccess}
                    startIcon={<CheckIcon />}
                  >
                    Success
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleShowError}
                    startIcon={<ErrorIcon />}
                  >
                    Error
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={handleShowWarning}
                    startIcon={<WarningIcon />}
                  >
                    Warning
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="info"
                    fullWidth
                    onClick={handleShowInfo}
                    startIcon={<InfoIcon />}
                  >
                    Info
                  </Button>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Inline Messages</Typography>
                <SuccessMessage 
                  message="Bu bir inline başarı mesajıdır!" 
                  title="Başarılı!"
                />
                <Box sx={{ mt: 2 }}>
                  <ErrorMessage 
                    message="Bu bir inline hata mesajıdır!" 
                    title="Hata!"
                    showRetry
                    onRetry={() => showInfo('Tekrar denendi!')}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Confirmation Dialogs */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                ❓ Confirmation Dialogs
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleDeleteConfirm}
                    startIcon={<DeleteIcon />}
                  >
                    Delete Confirm
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleUpdateConfirm}
                    startIcon={<EditIcon />}
                  >
                    Update Confirm
                  </Button>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Custom Dialog</Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    confirm('Özel Onay', 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?', () => {
                      showSuccess('İşlem onaylandı!');
                    });
                  }}
                >
                  Custom Confirm
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Error Pages */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                🚨 Error Pages
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ErrorIcon color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="404 Sayfa Bulunamadı" 
                    secondary="/not-found sayfasına gidin"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="500 Server Error" 
                    secondary="/error sayfasına gidin"
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Test için: <code>/not-found</code> veya <code>/error</code> URL'lerini ziyaret edin
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Usage Examples */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📚 Kullanım Örnekleri
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Loading Spinner</Typography>
              <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem' }}>
{`// Basit loading
<LoadingSpinner message="Yükleniyor..." />

// Full screen loading
<LoadingSpinner fullScreen message="Sayfa yükleniyor..." />

// Overlay loading
<LoadingSpinner overlay message="İşlem yapılıyor..." />`}
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Notifications</Typography>
              <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem' }}>
{`// Hook kullanımı
const { showSuccess, showError } = useNotifications();

showSuccess('İşlem başarılı!');
showError('Bir hata oluştu!');

// Inline component
<SuccessMessage message="Başarı mesajı" />
<ErrorMessage message="Hata mesajı" />`}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
