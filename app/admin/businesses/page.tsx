'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  Badge,
  Tooltip,
  Pagination,
  Grid,
  CardMedia,
  Rating,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Visibility as ViewIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Star as StarIcon,
} from '@mui/icons-material';

// Mock data - gerçek uygulamada API'den gelecek
const mockBusinesses = [
  {
    id: 1,
    name: 'Cafe Central',
    category: 'restaurant',
    owner: 'Ayşe Demir',
    email: 'ayse@cafecentral.com',
    phone: '+90 555 234 5678',
    address: 'Kadıköy, İstanbul',
    status: 'approved',
    rating: 4.5,
    reviewCount: 127,
    joinDate: '2024-02-01',
    description: 'Modern ve şık bir cafe, özel kahve çeşitleri ve lezzetli tatlılar.',
    image: '/api/businesses/1/image',
    workingHours: '08:00 - 22:00',
    verified: true,
  },
  {
    id: 2,
    name: 'Diş Hekimi Dr. Ahmet',
    category: 'healthcare',
    owner: 'Ahmet Yılmaz',
    email: 'ahmet@dishekim.com',
    phone: '+90 555 123 4567',
    address: 'Beşiktaş, İstanbul',
    status: 'pending',
    rating: 0,
    reviewCount: 0,
    joinDate: '2024-03-01',
    description: 'Uzman diş hekimi, modern teknoloji ile tedavi.',
    image: '/api/businesses/2/image',
    workingHours: '09:00 - 18:00',
    verified: false,
  },
  {
    id: 3,
    name: 'Güzellik Salonu Elif',
    category: 'beauty',
    owner: 'Elif Kaya',
    email: 'elif@guzelliksalonu.com',
    phone: '+90 555 345 6789',
    address: 'Şişli, İstanbul',
    status: 'approved',
    rating: 4.8,
    reviewCount: 89,
    joinDate: '2024-01-15',
    description: 'Profesyonel güzellik hizmetleri, cilt bakımı ve makyaj.',
    image: '/api/businesses/3/image',
    workingHours: '10:00 - 20:00',
    verified: true,
  },
  {
    id: 4,
    name: 'Spor Salonu PowerFit',
    category: 'fitness',
    owner: 'Mehmet Demir',
    email: 'mehmet@powerfit.com',
    phone: '+90 555 456 7890',
    address: 'Bakırköy, İstanbul',
    status: 'rejected',
    rating: 0,
    reviewCount: 0,
    joinDate: '2024-03-05',
    description: 'Modern spor salonu, kişisel antrenör hizmeti.',
    image: '/api/businesses/4/image',
    workingHours: '06:00 - 24:00',
    verified: false,
  },
  {
    id: 5,
    name: 'Avukatlık Bürosu Hukuk',
    category: 'legal',
    owner: 'Fatma Özkan',
    email: 'fatma@hukukburosu.com',
    phone: '+90 555 567 8901',
    address: 'Kartal, İstanbul',
    status: 'pending',
    rating: 0,
    reviewCount: 0,
    joinDate: '2024-03-10',
    description: 'Aile hukuku, ticaret hukuku ve ceza hukuku alanlarında hizmet.',
    image: '/api/businesses/5/image',
    workingHours: '09:00 - 17:00',
    verified: false,
  },
];

const categories = {
  restaurant: 'Restoran',
  healthcare: 'Sağlık',
  beauty: 'Güzellik',
  fitness: 'Spor',
  legal: 'Hukuk',
  education: 'Eğitim',
  automotive: 'Otomotiv',
  retail: 'Perakende',
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'pending':
      return 'warning';
    case 'rejected':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'approved':
      return 'Onaylandı';
    case 'pending':
      return 'Beklemede';
    case 'rejected':
      return 'Reddedildi';
    default:
      return 'Bilinmiyor';
  }
};

export default function BusinessesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, business: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedBusiness(business);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBusiness(null);
  };

  const handleView = () => {
    setViewDialogOpen(true);
    handleMenuClose();
  };

  const handleApprove = () => {
    setApprovalDialogOpen(true);
    handleMenuClose();
  };

  const handleReject = () => {
    // Reddetme işlemi burada yapılacak
    console.log('Reject business:', selectedBusiness);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Silme işlemi burada yapılacak
    console.log('Delete business:', selectedBusiness);
    handleMenuClose();
  };

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || business.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || business.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const paginatedBusinesses = filteredBusinesses.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const pendingCount = mockBusinesses.filter(b => b.status === 'pending').length;
  const approvedCount = mockBusinesses.filter(b => b.status === 'approved').length;
  const rejectedCount = mockBusinesses.filter(b => b.status === 'rejected').length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          İşletme Yönetimi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistem işletmelerini yönetin ve onaylayın
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <BusinessIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {pendingCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bekleyen Onay
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <CheckIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {approvedCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Onaylanan
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                  <CancelIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="error.main">
                    {rejectedCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Reddedilen
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <BusinessIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    {mockBusinesses.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Toplam İşletme
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="İşletme ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
            />
            
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Durum</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Durum"
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="pending">Beklemede</MenuItem>
                <MenuItem value="approved">Onaylandı</MenuItem>
                <MenuItem value="rejected">Reddedildi</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Kategori"
              >
                <MenuItem value="all">Tümü</MenuItem>
                {Object.entries(categories).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
            >
              Filtreleri Temizle
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Businesses Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>İşletme</TableCell>
                  <TableCell>Sahip</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>Değerlendirme</TableCell>
                  <TableCell>Kayıt Tarihi</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBusinesses.map((business) => (
                  <TableRow key={business.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          <BusinessIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {business.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {business.address}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{business.owner}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {business.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={categories[business.category as keyof typeof categories]} 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(business.status)}
                        color={getStatusColor(business.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={business.rating} readOnly size="small" />
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          ({business.reviewCount})
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(business.joinDate).toLocaleDateString('tr-TR')}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, business)}
                        size="small"
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(filteredBusinesses.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView}>
          <ViewIcon sx={{ mr: 1 }} />
          Görüntüle
        </MenuItem>
        {selectedBusiness?.status === 'pending' && (
          <MenuItem onClick={handleApprove} sx={{ color: 'success.main' }}>
            <CheckIcon sx={{ mr: 1 }} />
            Onayla
          </MenuItem>
        )}
        {selectedBusiness?.status === 'pending' && (
          <MenuItem onClick={handleReject} sx={{ color: 'error.main' }}>
            <CancelIcon sx={{ mr: 1 }} />
            Reddet
          </MenuItem>
        )}
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Sil
        </MenuItem>
      </Menu>

      {/* View Business Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>İşletme Detayları</DialogTitle>
        <DialogContent>
          {selectedBusiness && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={selectedBusiness.image}
                      alt={selectedBusiness.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {selectedBusiness.name}
                      </Typography>
                      <Chip 
                        label={getStatusText(selectedBusiness.status)}
                        color={getStatusColor(selectedBusiness.status)}
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={selectedBusiness.rating} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({selectedBusiness.reviewCount} değerlendirme)
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    İşletme Bilgileri
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Kategori
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {categories[selectedBusiness.category as keyof typeof categories]}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Çalışma Saatleri
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {selectedBusiness.workingHours}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Açıklama
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {selectedBusiness.description}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    İletişim Bilgileri
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{selectedBusiness.email}</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{selectedBusiness.phone}</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{selectedBusiness.address}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Kapat</Button>
          {selectedBusiness?.status === 'pending' && (
            <Button 
              variant="contained" 
              color="success"
              startIcon={<CheckIcon />}
              onClick={() => {
                setViewDialogOpen(false);
                setApprovalDialogOpen(true);
              }}
            >
              Onayla
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={approvalDialogOpen} onClose={() => setApprovalDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>İşletme Onayı</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            "{selectedBusiness?.name}" işletmesini onaylamak istediğinizden emin misiniz?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Onaylandıktan sonra işletme aktif hale gelecek ve randevu almaya başlayabilecek.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialogOpen(false)}>İptal</Button>
          <Button 
            variant="contained" 
            color="success"
            onClick={() => {
              console.log('Approve business:', selectedBusiness);
              setApprovalDialogOpen(false);
            }}
          >
            Onayla
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
