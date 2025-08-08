'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Avatar,
  Divider,
  InputAdornment,
  IconButton,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn,
  Phone,
  Email,
  Star,
  FilterList,
  Clear,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// Mock data for businesses
const mockBusinesses = [
  {
    id: '1',
    name: 'Güzellik Salonu Elit',
    description: 'Profesyonel saç ve makyaj hizmetleri',
    address: 'Kadıköy, İstanbul',
    phone: '+90 216 555 0123',
    email: 'info@elitguzellik.com',
    category: 'Güzellik',
    rating: 4.8,
    reviewCount: 127,
    services: ['Saç Kesimi', 'Makyaj', 'Manikür'],
    isOpen: true,
    distance: '0.5 km',
  },
  {
    id: '2',
    name: 'Spor Merkezi FitLife',
    description: 'Modern fitness ekipmanları ve uzman eğitmenler',
    address: 'Beşiktaş, İstanbul',
    phone: '+90 212 555 0456',
    email: 'info@fitlife.com',
    category: 'Spor',
    rating: 4.6,
    reviewCount: 89,
    services: ['Fitness', 'Yoga', 'Pilates'],
    isOpen: true,
    distance: '1.2 km',
  },
  {
    id: '3',
    name: 'Diş Kliniği Sağlık',
    description: 'Uzman diş hekimleri ile kaliteli tedavi',
    address: 'Şişli, İstanbul',
    phone: '+90 212 555 0789',
    email: 'info@saglikdis.com',
    category: 'Sağlık',
    rating: 4.9,
    reviewCount: 203,
    services: ['Diş Muayenesi', 'Dolgu', 'Kanal Tedavisi'],
    isOpen: false,
    distance: '2.1 km',
  },
  {
    id: '4',
    name: 'Kafe Lezzet',
    description: 'Taze kahve ve ev yapımı tatlılar',
    address: 'Beyoğlu, İstanbul',
    phone: '+90 212 555 0321',
    email: 'info@lezzetkafe.com',
    category: 'Yemek',
    rating: 4.4,
    reviewCount: 156,
    services: ['Kahve', 'Tatlı', 'Kahvaltı'],
    isOpen: true,
    distance: '0.8 km',
  },
  {
    id: '5',
    name: 'Berber Dükkanı Klasik',
    description: 'Geleneksel berber hizmetleri',
    address: 'Fatih, İstanbul',
    phone: '+90 212 555 0654',
    email: 'info@klasikberber.com',
    category: 'Güzellik',
    rating: 4.7,
    reviewCount: 94,
    services: ['Saç Kesimi', 'Sakal Tıraşı', 'Cilt Bakımı'],
    isOpen: true,
    distance: '1.5 km',
  },
];

const categories = [
  'Tümü',
  'Güzellik',
  'Spor',
  'Sağlık',
  'Yemek',
  'Eğitim',
  'Teknoloji',
  'Hizmet',
];

export default function SearchPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tümü');
  const [sortBy, setSortBy] = useState('relevance');
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses);
  const [activeTab, setActiveTab] = useState(0);

  // Filter and search businesses
  useEffect(() => {
    let filtered = mockBusinesses;

    // Search by name, description, or services
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(term) ||
          business.description.toLowerCase().includes(term) ||
          business.services.some((service) =>
            service.toLowerCase().includes(term)
          )
      );
    }

    // Filter by category
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(
        (business) => business.category === selectedCategory
      );
    }

    // Filter by rating
    if (selectedRating) {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter((business) => business.rating >= minRating);
    }

    // Filter by open/closed status
    if (selectedStatus === 'Açık') {
      filtered = filtered.filter((business) => business.isOpen);
    } else if (selectedStatus === 'Kapalı') {
      filtered = filtered.filter((business) => !business.isOpen);
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredBusinesses(filtered);
  }, [searchTerm, selectedCategory, selectedRating, selectedStatus, sortBy]);

  const handleSearch = () => {
    // Search is already handled by useEffect
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tümü');
    setSelectedRating('');
    setSelectedStatus('Tümü');
    setSortBy('relevance');
  };

  const handleBusinessClick = (businessId: string) => {
    router.push(`/businesses/${businessId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        İşletme Ara
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        İhtiyacınız olan hizmeti sunan işletmeleri bulun
      </Typography>

      {/* Search Bar */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="İşletme adı, hizmet veya kategori ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchTerm('')}
                    >
                      <Clear />
                    </IconButton>
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
                 onChange={(e) => setSelectedCategory(e.target.value)}
                 label="Kategori"
               >
                 {categories.map((category) => (
                   <MenuItem key={category} value={category}>
                     {category}
                   </MenuItem>
                 ))}
               </Select>
             </FormControl>
             {selectedCategory !== 'Tümü' && (
               <Button
                 variant="text"
                 size="small"
                 onClick={() => router.push(`/categories/${selectedCategory}`)}
                 sx={{ mt: 1 }}
               >
                 Bu kategorideki tüm işletmeleri görüntüle
               </Button>
             )}
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              Ara
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Filters and Results */}
      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FilterList sx={{ mr: 1 }} />
              <Typography variant="h6">Filtreler</Typography>
            </Box>

            {/* Rating Filter */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Minimum Puan</InputLabel>
              <Select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                label="Minimum Puan"
              >
                <MenuItem value="">Tümü</MenuItem>
                <MenuItem value="4.5">4.5+ Yıldız</MenuItem>
                <MenuItem value="4.0">4.0+ Yıldız</MenuItem>
                <MenuItem value="3.5">3.5+ Yıldız</MenuItem>
                <MenuItem value="3.0">3.0+ Yıldız</MenuItem>
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Durum</InputLabel>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                label="Durum"
              >
                <MenuItem value="Tümü">Tümü</MenuItem>
                <MenuItem value="Açık">Açık</MenuItem>
                <MenuItem value="Kapalı">Kapalı</MenuItem>
              </Select>
            </FormControl>

            {/* Sort By */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Sıralama</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sıralama"
              >
                <MenuItem value="relevance">İlgi Sırası</MenuItem>
                <MenuItem value="rating">Puana Göre</MenuItem>
                <MenuItem value="distance">Uzaklığa Göre</MenuItem>
                <MenuItem value="name">İsme Göre</MenuItem>
              </Select>
            </FormControl>

            {/* Clear Filters */}
            <Button
              fullWidth
              variant="outlined"
              onClick={clearFilters}
              startIcon={<Clear />}
            >
              Filtreleri Temizle
            </Button>
          </Paper>
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={9}>
          {/* Results Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              {filteredBusinesses.length} sonuç bulundu
            </Typography>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ minHeight: 'auto' }}
            >
              <Tab label="Liste" />
              <Tab label="Harita" />
            </Tabs>
          </Box>

          {/* Results List */}
          {activeTab === 0 && (
            <Grid container spacing={2}>
              {filteredBusinesses.map((business) => (
                <Grid item xs={12} key={business.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s',
                      },
                    }}
                    onClick={() => handleBusinessClick(business.id)}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                            <Avatar
                              sx={{
                                bgcolor: 'primary.main',
                                width: 56,
                                height: 56,
                                mr: 2,
                              }}
                            >
                              {business.name.charAt(0)}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" component="h2">
                                {business.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {business.description}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Rating
                                  value={business.rating}
                                  precision={0.1}
                                  size="small"
                                  readOnly
                                  sx={{ mr: 1 }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                  {business.rating} ({business.reviewCount} değerlendirme)
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {business.services.slice(0, 3).map((service) => (
                                  <Chip
                                    key={service}
                                    label={service}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                                {business.services.length > 3 && (
                                  <Chip
                                    label={`+${business.services.length - 3} daha`}
                                    size="small"
                                    variant="outlined"
                                  />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ textAlign: 'right' }}>
                            <Chip
                              label={business.isOpen ? 'Açık' : 'Kapalı'}
                              color={business.isOpen ? 'success' : 'error'}
                              size="small"
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                              {business.address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {business.distance}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <Phone sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                              {business.phone}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Map Tab (Placeholder) */}
          {activeTab === 1 && (
            <Paper
              sx={{
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.100',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Harita görünümü yakında eklenecek
              </Typography>
            </Paper>
          )}

          {/* No Results */}
          {filteredBusinesses.length === 0 && (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: 'grey.50',
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Sonuç bulunamadı
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Arama kriterlerinizi değiştirerek tekrar deneyin
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
