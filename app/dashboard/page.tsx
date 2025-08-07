'use client';

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { CalendarToday, Business, Person } from '@mui/icons-material';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Kontrol Paneli
      </Typography>
      
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Hızlı İşlemler
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CalendarToday />}
                  sx={{ mb: 1 }}
                >
                  Randevu Al
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Business />}
                  sx={{ mb: 1 }}
                >
                  İşletme Bul
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Person />}
                >
                  Profili Görüntüle
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Appointments */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Son Randevular
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Randevu bulunamadı. İlk randevunuzu alın!
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Tüm Randevuları Görüntüle
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                İstatistikler
              </Typography>
              <Grid container spacing={2}>
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
                      Tamamlanan
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning.main">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bekleyen
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
