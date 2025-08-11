'use client';

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Event as EventIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

// Mock data - gerçek uygulamada API'den gelecek
const stats = {
  totalUsers: 1247,
  totalBusinesses: 89,
  totalAppointments: 3421,
  pendingApprovals: 12,
  activeUsers: 892,
  revenue: 45600,
};

const recentActivities = [
  {
    id: 1,
    type: 'user_registration',
    message: 'Yeni kullanıcı kaydoldu: Ahmet Yılmaz',
    time: '2 dakika önce',
    status: 'success',
  },
  {
    id: 2,
    type: 'business_approval',
    message: 'İşletme onaylandı: Cafe Central',
    time: '15 dakika önce',
    status: 'success',
  },
  {
    id: 3,
    type: 'appointment_created',
    message: 'Yeni randevu oluşturuldu: Diş Hekimi Dr. Ayşe',
    time: '1 saat önce',
    status: 'info',
  },
  {
    id: 4,
    type: 'user_suspension',
    message: 'Kullanıcı askıya alındı: Mehmet Demir',
    time: '3 saat önce',
    status: 'warning',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircleIcon color="success" />;
    case 'warning':
      return <WarningIcon color="warning" />;
    case 'info':
      return <ScheduleIcon color="info" />;
    default:
      return <NotificationsIcon />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'default';
  }
};

export default function AdminDashboard() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistem genel durumu ve istatistikler
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalUsers.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toplam Kullanıcı
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={70} 
                sx={{ height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <BusinessIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalBusinesses}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toplam İşletme
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={85} 
                sx={{ height: 6, borderRadius: 3 }}
                color="secondary"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <EventIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalAppointments.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toplam Randevu
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={92} 
                sx={{ height: 6, borderRadius: 3 }}
                color="success"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <NotificationsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.pendingApprovals}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bekleyen Onay
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label="Aksiyon Gerekli" 
                color="warning" 
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Activity Section */}
      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Gelir Analizi
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  ₺{stats.revenue.toLocaleString()}
                </Typography>
                <Chip 
                  icon={<TrendingUpIcon />}
                  label="+12.5%" 
                  color="success" 
                  sx={{ ml: 2 }}
                />
              </Box>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Grafik burada görüntülenecek
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Son Aktiviteler
              </Typography>
              <List sx={{ p: 0 }}>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {getStatusIcon(activity.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          {activity.message}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Hızlı İşlemler
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Chip 
              label="Kullanıcı Onayla" 
              color="primary" 
              variant="outlined"
              clickable
            />
          </Grid>
          <Grid item>
            <Chip 
              label="İşletme Ekle" 
              color="secondary" 
              variant="outlined"
              clickable
            />
          </Grid>
          <Grid item>
            <Chip 
              label="Rapor Oluştur" 
              color="info" 
              variant="outlined"
              clickable
            />
          </Grid>
          <Grid item>
            <Chip 
              label="Sistem Ayarları" 
              color="default" 
              variant="outlined"
              clickable
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
