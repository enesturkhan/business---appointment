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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import LoadingSpinner, { 
  TableLoadingSkeleton, 
  LoadingSkeleton 
} from '../../../components/ui/LoadingSpinner';
import { 
  GlobalLoading, 
  PageLoading, 
  ContentLoading 
} from '../../../components/ui/GlobalLoading';
import { useLoading, useFormLoading, usePageLoading } from '../../../hooks/useLoading';

export default function LoadingDemoPage() {
  const { isLoading, loadingStates, withLoading } = useLoading();
  const { isSubmitting, submitWithLoading } = useFormLoading();
  const { isPageLoading, setPageLoading } = usePageLoading();
  
  const [showGlobalLoading, setShowGlobalLoading] = useState(false);
  const [showTableLoading, setShowTableLoading] = useState(false);

  const simulateApiCall = async (delay: number = 2000) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return 'API Response';
  };

  const handleGlobalLoading = () => {
    setShowGlobalLoading(true);
    setTimeout(() => setShowGlobalLoading(false), 3000);
  };

  const handleTableLoading = () => {
    setShowTableLoading(true);
    setTimeout(() => setShowTableLoading(false), 3000);
  };

  const handlePageLoading = () => {
    setPageLoading(true);
    setTimeout(() => setPageLoading(false), 3000);
  };

  if (isPageLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <PageLoading message="Demo sayfası yükleniyor..." />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Global Loading */}
      {showGlobalLoading && (
        <GlobalLoading message="Global işlem yapılıyor..." showProgress progress={75} />
      )}

      <Typography variant="h4" component="h1" gutterBottom>
        Loading States Demo
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Bu sayfa farklı loading state'lerini göstermek için oluşturulmuştur.
      </Typography>

      <Grid container spacing={3}>
        {/* Basic Loading Spinners */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Temel Loading Spinner'lar
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LoadingSpinner size={24} />
                  <Typography variant="body2">Küçük (24px)</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LoadingSpinner size={40} />
                  <Typography variant="body2">Orta (40px)</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LoadingSpinner size={60} message="Büyük spinner" />
                  <Typography variant="body2">Büyük (60px)</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Loading States */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Loading State'leri
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => withLoading('demo1', () => simulateApiCall(2000))}
                  disabled={loadingStates.demo1}
                >
                  {loadingStates.demo1 ? 'Yükleniyor...' : 'Demo 1 (2s)'}
                </Button>
                
                <Button
                  variant="contained"
                  onClick={() => withLoading('demo2', () => simulateApiCall(3000))}
                  disabled={loadingStates.demo2}
                >
                  {loadingStates.demo2 ? 'Yükleniyor...' : 'Demo 2 (3s)'}
                </Button>
                
                <Button
                  variant="contained"
                  onClick={() => submitWithLoading(() => simulateApiCall(1500))}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Form Submit (1.5s)'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Global Loading */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Global Loading
              </Typography>
              
              <Button
                variant="contained"
                color="secondary"
                onClick={handleGlobalLoading}
                disabled={showGlobalLoading}
              >
                Global Loading Göster (3s)
              </Button>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Sayfanın üstünde progress bar ile loading gösterir.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Page Loading */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sayfa Loading
              </Typography>
              
              <Button
                variant="contained"
                color="warning"
                onClick={handlePageLoading}
                disabled={isPageLoading}
              >
                Sayfa Loading (3s)
              </Button>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Tüm sayfa içeriğini loading ile değiştirir.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Skeleton Loading */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skeleton Loading
              </Typography>
              
              <LoadingSkeleton />
            </CardContent>
          </Card>
        </Grid>

        {/* Content Loading */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                İçerik Loading
              </Typography>
              
              <ContentLoading message="İçerik yükleniyor..." height="150px" />
            </CardContent>
          </Card>
        </Grid>

        {/* Table Loading */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tablo Loading
              </Typography>
              
              <Button
                variant="outlined"
                onClick={handleTableLoading}
                disabled={showTableLoading}
                sx={{ mb: 2 }}
              >
                {showTableLoading ? 'Yükleniyor...' : 'Tablo Loading Göster (3s)'}
              </Button>
              
              {showTableLoading ? (
                <TableLoadingSkeleton rows={5} columns={4} />
              ) : (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ad</TableCell>
                        <TableCell>E-posta</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Durum</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Ahmet Yılmaz</TableCell>
                        <TableCell>ahmet@example.com</TableCell>
                        <TableCell>Kullanıcı</TableCell>
                        <TableCell>Aktif</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ayşe Demir</TableCell>
                        <TableCell>ayse@example.com</TableCell>
                        <TableCell>İşletme Sahibi</TableCell>
                        <TableCell>Aktif</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
