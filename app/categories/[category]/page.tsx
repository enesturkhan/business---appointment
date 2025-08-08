'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Rating,
  Avatar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Breadcrumbs,
  Link,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Star,
  Search as SearchIcon,
  Clear,
  FilterList,
  NavigateNext,
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';

// Mock data for businesses by category
const mockBusinessesByCategory = {
  'Güzellik': [
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
    {
      id: '6',
      name: 'Cilt Bakım Merkezi',
      description: 'Profesyonel cilt bakım ve güzellik hizmetleri',
      address: 'Beşiktaş, İstanbul',
      phone: '+90 212 555 0789',
      email: 'info@ciltbakim.com',
      category: 'Güzellik',
      rating: 4.9,
      reviewCount: 156,
      services: ['Cilt Bakımı', 'Peeling', 'Masaj'],
      isOpen: true,
      distance: '2.3 km',
    },
  ],
  'Spor': [
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
      id: '7',
      name: 'Yüzme Havuzu Aqua',
      description: 'Olimpik yüzme havuzu ve su sporları',
      address: 'Şişli, İstanbul',
      phone: '+90 212 555 0321',
      email: 'info@aqua.com',
      category: 'Spor',
      rating: 4.5,
      reviewCount: 203,
      services: ['Yüzme', 'Aqua Fitness', 'Yüzme Dersi'],
      isOpen: true,
      distance: '3.1 km',
    },
  ],
  'Sağlık': [
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
      id: '8',
      name: 'Fizyoterapi Merkezi',
      description: 'Uzman fizyoterapistler ile rehabilitasyon',
      address: 'Kadıköy, İstanbul',
      phone: '+90 216 555 0456',
      email: 'info@fizyoterapi.com',
      category: 'Sağlık',
      rating: 4.7,
      reviewCount: 178,
      services: ['Fizyoterapi', 'Rehabilitasyon', 'Masaj'],
      isOpen: true,
      distance: '1.8 km',
    },
  ],
  'Yemek': [
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
      id: '9',
      name: 'Restoran Dünya Mutfağı',
      description: 'Uluslararası mutfak ve özel menüler',
      address: 'Beşiktaş, İstanbul',
      phone: '+90 212 555 0654',
      email: 'info@dunyamutfagi.com',
      category: 'Yemek',
      rating: 4.6,
      reviewCount: 234,
      services: ['Akşam Yemeği', 'Özel Menü', 'Catering'],
      isOpen: true,
      distance: '2.5 km',
    },
  ],
  'Eğitim': [
    {
      id: '10',
      name: 'Dil Kursu Global',
      description: 'İngilizce, Almanca ve diğer diller',
      address: 'Kadıköy, İstanbul',
      phone: '+90 216 555 0123',
      email: 'info@globaldil.com',
      category: 'Eğitim',
      rating: 4.5,
      reviewCount: 145,
      services: ['İngilizce', 'Almanca', 'TOEFL Hazırlık'],
      isOpen: true,
      distance: '1.1 km',
    },
    {
      id: '11',
      name: 'Müzik Akademisi',
      description: 'Piyano, gitar ve vokal dersleri',
      address: 'Beşiktaş, İstanbul',
      phone: '+90 212 555 0789',
      email: 'info@muzikakademisi.com',
      category: 'Eğitim',
      rating: 4.8,
      reviewCount: 167,
      services: ['Piyano', 'Gitar', 'Vokal'],
      isOpen: true,
      distance: '0.9 km',
    },
  ],
  'Teknoloji': [
    {
      id: '12',
      name: 'Bilgisayar Servisi',
      description: 'Bilgisayar tamir ve bakım hizmetleri',
      address: 'Şişli, İstanbul',
      phone: '+90 212 555 0321',
      email: 'info@bilgisayarservisi.com',
      category: 'Teknoloji',
      rating: 4.3,
      reviewCount: 89,
      services: ['Bilgisayar Tamiri', 'Yazılım Kurulumu', 'Veri Kurtarma'],
      isOpen: true,
      distance: '1.7 km',
    },
  ],
  'Hizmet': [
    {
      id: '13',
      name: 'Temizlik Şirketi',
      description: 'Ev ve ofis temizlik hizmetleri',
      address: 'Fatih, İstanbul',
      phone: '+90 212 555 0456',
      email: 'info@temizlik.com',
      category: 'Hizmet',
      rating: 4.4,
      reviewCount: 123,
      services: ['Ev Temizliği', 'Ofis Temizliği', 'Halı Yıkama'],
      isOpen: true,
      distance: '2.8 km',
    },
  ],
};

const categoryDescriptions = {
  'Güzellik': 'Saç, makyaj, cilt bakımı ve güzellik hizmetleri',
  'Spor': 'Fitness, yüzme, yoga ve diğer spor aktiviteleri',
  'Sağlık': 'Diş, fizyoterapi ve sağlık hizmetleri',
  'Yemek': 'Restoran, kafe ve catering hizmetleri',
  'Eğitim': 'Dil kursu, müzik ve eğitim hizmetleri',
  'Teknoloji': 'Bilgisayar servisi ve teknoloji hizmetleri',
  'Hizmet': 'Temizlik ve diğer hizmet sektörleri',
};

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const category = params.category as string;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tümü');
  const [sortBy, setSortBy] = useState('relevance');
  const [filteredBusinesses, setFilteredBusinesses] = useState<any[]>([]);

  // Get businesses for the category
  const categoryBusinesses = mockBusinessesByCategory[category as keyof typeof mockBusinessesByCategory] || [];

  // Filter and search businesses
  useEffect(() => {
    let filtered = categoryBusinesses;

    // Search by name, description, or services
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(term) ||
          business.description.toLowerCase().includes(term) ||
          business.services.some((service: string) =>
            service.toLowerCase().includes(term)
          )
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
  }, [categoryBusinesses, searchTerm, selectedRating, selectedStatus, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRating('');
    setSelectedStatus('Tümü');
    setSortBy('relevance');
  };

  const handleBusinessClick = (businessId: string) => {
    router.push(`/businesses/${businessId}`);
  };

  // Handle invalid category
  if (!categoryBusinesses.length) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Kategori Bulunamadı
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aradığınız kategori mevcut değil.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => router.push('/search')}
        >
          Tüm Kategorileri Görüntüle
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            router.push('/');
          }}
        >
          Ana Sayfa
        </Link>
        <Link
          color="inherit"
          href="/search"
          onClick={(e) => {
            e.preventDefault();
            router.push('/search');
          }}
        >
          Arama
        </Link>
        <Typography color="text.primary">{category}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        {category} Kategorisi
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {categoryDescriptions[category as keyof typeof categoryDescriptions] || 'Bu kategorideki işletmeler'}
      </Typography>

      {/* Search and Filters */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={`${category} kategorisinde ara...`}
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
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
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
          </Grid>
        </Grid>
        
        {/* Clear Filters */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={clearFilters}
            startIcon={<Clear />}
            size="small"
          >
            Filtreleri Temizle
          </Button>
        </Box>
      </Paper>

      {/* Results Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          {filteredBusinesses.length} işletme bulundu
        </Typography>
      </Box>

      {/* Results Grid */}
      <Grid container spacing={3}>
        {filteredBusinesses.map((business) => (
          <Grid item xs={12} sm={6} md={4} key={business.id}>
            <Card
              sx={{
                height: '100%',
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
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {business.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
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
                        {business.rating} ({business.reviewCount})
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ mb: 2 }}>
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

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {business.services.slice(0, 2).map((service: string) => (
                    <Chip
                      key={service}
                      label={service}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                  {business.services.length > 2 && (
                    <Chip
                      label={`+${business.services.length - 2} daha`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>

                <Chip
                  label={business.isOpen ? 'Açık' : 'Kapalı'}
                  color={business.isOpen ? 'success' : 'error'}
                  size="small"
                  sx={{ width: '100%' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
    </Container>
  );
}
