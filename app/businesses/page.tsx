'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Phone,
  Star,
  Business,
  FilterList,
} from '@mui/icons-material';
import Link from 'next/link';

// Mock işletme verileri
const mockBusinesses = [
  {
    id: '1',
    name: 'Güzellik Salonu Elif',
    category: 'Güzellik',
    rating: 4.5,
    reviewCount: 128,
    address: 'Kadıköy, İstanbul',
    phone: '+90 216 555 0123',
    description: 'Profesyonel güzellik hizmetleri, saç bakımı, makyaj ve cilt bakımı.',
    image: '/api/placeholder/300/200',
    isOpen: true,
  },
  {
    id: '2',
    name: 'Berber Dükkanı Ahmet',
    category: 'Berber',
    rating: 4.2,
    reviewCount: 89,
    address: 'Beşiktaş, İstanbul',
    phone: '+90 212 555 0456',
    description: 'Modern berber hizmetleri, sakal tıraşı ve saç kesimi.',
    image: '/api/placeholder/300/200',
    isOpen: true,
  },
  {
    id: '3',
    name: 'Diş Kliniği Dr. Ayşe',
    category: 'Sağlık',
    rating: 4.8,
    reviewCount: 256,
    address: 'Şişli, İstanbul',
    phone: '+90 212 555 0789',
    description: 'Uzman diş hekimliği hizmetleri, implant ve ortodonti.',
    image: '/api/placeholder/300/200',
    isOpen: false,
  },
  {
    id: '4',
    name: 'Spor Salonu FitLife',
    category: 'Spor',
    rating: 4.3,
    reviewCount: 167,
    address: 'Bakırköy, İstanbul',
    phone: '+90 212 555 0321',
    description: 'Modern fitness ekipmanları ve kişisel antrenör hizmetleri.',
    image: '/api/placeholder/300/200',
    isOpen: true,
  },
  {
    id: '5',
    name: 'Kuafor Salonu Modern',
    category: 'Kuafor',
    rating: 4.6,
    reviewCount: 203,
    address: 'Üsküdar, İstanbul',
    phone: '+90 216 555 0654',
    description: 'Trend saç modelleri ve renklendirme hizmetleri.',
    image: '/api/placeholder/300/200',
    isOpen: true,
  },
  {
    id: '6',
    name: 'Fizyoterapi Merkezi',
    category: 'Sağlık',
    rating: 4.7,
    reviewCount: 145,
    address: 'Maltepe, İstanbul',
    phone: '+90 216 555 0987',
    description: 'Uzman fizyoterapistler ile rehabilitasyon hizmetleri.',
    image: '/api/placeholder/300/200',
    isOpen: false,
  },
];

const categories = [
  'Tümü',
  'Güzellik',
  'Berber',
  'Kuafor',
  'Sağlık',
  'Spor',
  'Eğitim',
  'Hukuk',
  'Muhasebe',
];

export default function BusinessesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtreleme ve arama
  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sayfalama
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBusinesses = filteredBusinesses.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        İşletmeler
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Bölgenizdeki işletmeleri keşfedin ve randevu alın
      </Typography>

      {/* Arama ve Filtreleme */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="İşletme adı, hizmet veya adres ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={selectedCategory}
                label="Kategori"
                onChange={(e) => setSelectedCategory(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList />
                  </InputAdornment>
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              href="/business/register"
              startIcon={<Business />}
            >
              İşletme Kaydet
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Sonuç Sayısı */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredBusinesses.length} işletme bulundu
        </Typography>
      </Box>

      {/* İşletme Listesi */}
      <Grid container spacing={3}>
        {currentBusinesses.map((business) => (
          <Grid item xs={12} sm={6} md={4} key={business.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.palette.mode === 'light'
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Box
                sx={{
                  height: 200,
                  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '3rem',
                }}
              >
                <Business />
              </Box>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {business.name}
                  </Typography>
                  <Chip
                    label={business.isOpen ? 'Açık' : 'Kapalı'}
                    color={business.isOpen ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                
                <Chip
                  label={business.category}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={business.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({business.reviewCount} değerlendirme)
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {business.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {business.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {business.phone}
                  </Typography>
                </Box>
              </CardContent>
              
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  component={Link}
                  href={`/businesses/${business.id}`}
                  fullWidth
                >
                  Detayları Gör
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Sonuç yoksa */}
      {currentBusinesses.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Business sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            İşletme bulunamadı
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Arama kriterlerinizi değiştirmeyi deneyin
          </Typography>
        </Box>
      )}
    </Container>
  );
}
