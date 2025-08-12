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
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

// Mock data for demo
const mockUsers = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    phone: '+90 555 234 5678',
    role: 'business',
    status: 'active',
    joinDate: '2024-02-01',
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    phone: '+90 555 345 6789',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
  },
];

export default function ResponsiveDemoPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getRoleText = (role: string) => {
    switch (role) {
      case 'user': return 'Kullanıcı';
      case 'business': return 'İşletme Sahibi';
      case 'admin': return 'Admin';
      default: return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Responsive Design Demo
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Bu sayfa farklı ekran boyutlarında nasıl göründüğünü göstermek için oluşturulmuştur.
      </Typography>

      {/* Breakpoint Info */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Mevcut Breakpoint
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Chip 
                label={`Mobile: ${isMobile ? '✅' : '❌'}`}
                color={isMobile ? 'success' : 'default'}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip 
                label={`Tablet: ${isTablet ? '✅' : '❌'}`}
                color={isTablet ? 'success' : 'default'}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip 
                label={`Desktop: ${isDesktop ? '✅' : '❌'}`}
                color={isDesktop ? 'success' : 'default'}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip 
                label={`Width: ${window.innerWidth}px`}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Responsive Grid Demo */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Responsive Grid Sistemi
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                xs=12, sm=6, md=4, lg=3
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
                xs=12, sm=6, md=4, lg=3
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                xs=12, sm=6, md=4, lg=3
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light', color: 'white' }}>
                xs=12, sm=6, md=4, lg=3
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Responsive Form Demo */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Responsive Form
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 }, 
            flexWrap: 'wrap', 
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}>
            <TextField
              placeholder="Arama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                minWidth: { xs: '100%', sm: 300 },
                width: { xs: '100%', sm: 'auto' },
              }}
            />
            
            <FormControl sx={{ 
              minWidth: { xs: '100%', sm: 150 },
              width: { xs: '100%', sm: 'auto' },
            }}>
              <InputLabel>Rol</InputLabel>
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Rol"
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="user">Kullanıcı</MenuItem>
                <MenuItem value="business">İşletme Sahibi</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ 
              minWidth: { xs: '100%', sm: 150 },
              width: { xs: '100%', sm: 'auto' },
            }}>
              <InputLabel>Durum</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Durum"
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Pasif</MenuItem>
                <MenuItem value="pending">Beklemede</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('all');
                setStatusFilter('all');
              }}
              sx={{ 
                width: { xs: '100%', sm: 'auto' },
                minWidth: { xs: '100%', sm: 'auto' },
              }}
            >
              Filtreleri Temizle
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Responsive Table Demo */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Responsive Table
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    display: { xs: 'none', md: 'table-cell' },
                    minWidth: { md: 120 }
                  }}>
                    Kullanıcı
                  </TableCell>
                  <TableCell sx={{ 
                    display: { xs: 'table-cell', md: 'table-cell' },
                    minWidth: { xs: 80, md: 120 }
                  }}>
                    {isMobile ? 'Ad' : 'Ad Soyad'}
                  </TableCell>
                  <TableCell sx={{ 
                    display: { xs: 'none', sm: 'table-cell' },
                    minWidth: { sm: 150 }
                  }}>
                    E-posta
                  </TableCell>
                  <TableCell sx={{ 
                    display: { xs: 'none', md: 'table-cell' },
                    minWidth: { md: 100 }
                  }}>
                    Rol
                  </TableCell>
                  <TableCell sx={{ 
                    display: { xs: 'none', sm: 'table-cell' },
                    minWidth: { sm: 100 }
                  }}>
                    Durum
                  </TableCell>
                  <TableCell sx={{ 
                    display: { xs: 'none', lg: 'table-cell' },
                    minWidth: { lg: 120 }
                  }}>
                    Kayıt Tarihi
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: { xs: 60, sm: 80 } }}>
                    İşlemler
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell sx={{ 
                      display: { xs: 'none', md: 'table-cell' }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <Typography variant="body2" fontWeight="medium">
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ 
                      display: { xs: 'none', sm: 'table-cell' }
                    }}>
                      <Typography variant="body2">{user.email}</Typography>
                    </TableCell>
                    <TableCell sx={{ 
                      display: { xs: 'none', md: 'table-cell' }
                    }}>
                      <Chip 
                        label={getRoleText(user.role)} 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ 
                      display: { xs: 'none', sm: 'table-cell' }
                    }}>
                      <Chip 
                        label={user.status === 'active' ? 'Aktif' : user.status}
                        color={getStatusColor(user.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ 
                      display: { xs: 'none', lg: 'table-cell' }
                    }}>
                      <Typography variant="body2">
                        {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
}
