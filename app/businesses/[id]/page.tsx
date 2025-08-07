'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  TextField,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Star,
  Business,
  CalendarToday,
  Message,
  Share,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { Rating } from '@mui/material';
import Link from 'next/link';

// Mock işletme detay verileri
const mockBusinessDetails = {
  id: '1',
  name: 'Güzellik Salonu Elif',
  category: 'Güzellik',
  rating: 4.5,
  reviewCount: 128,
  address: 'Kadıköy, İstanbul',
  phone: '+90 216 555 0123',
  email: 'info@guzelliksalonuelif.com',
  description: 'Profesyonel güzellik hizmetleri sunan modern salonumuzda, saç bakımı, makyaj ve cilt bakımı hizmetleri verilmektedir. Deneyimli ekibimiz ile sizlere en kaliteli hizmeti sunmaya çalışıyoruz.',
  longDescription: `Güzellik Salonu Elif olarak 2015 yılından bu yana Kadıköy'de hizmet vermekteyiz. Modern ekipmanlarımız ve deneyimli ekibimiz ile müşterilerimize en kaliteli güzellik hizmetlerini sunuyoruz.

Hizmetlerimiz:
• Saç kesimi ve şekillendirme
• Saç boyama ve renklendirme
• Makyaj (günlük, düğün, özel günler)
• Cilt bakımı ve temizliği
• Manikür ve pedikür
• Kaş ve kirpik şekillendirme

Salonumuz hafta içi 09:00-20:00, hafta sonu 10:00-18:00 saatleri arasında hizmet vermektedir.`,
  workingHours: {
    monday: '09:00 - 20:00',
    tuesday: '09:00 - 20:00',
    wednesday: '09:00 - 20:00',
    thursday: '09:00 - 20:00',
    friday: '09:00 - 20:00',
    saturday: '10:00 - 18:00',
    sunday: 'Kapalı',
  },
  services: [
    {
      id: '1',
      name: 'Saç Kesimi',
      duration: 30,
      price: 150,
      description: 'Profesyonel saç kesimi ve şekillendirme',
    },
    {
      id: '2',
      name: 'Saç Boyama',
      duration: 120,
      price: 400,
      description: 'Kalıcı saç boyama ve renklendirme',
    },
    {
      id: '3',
      name: 'Makyaj',
      duration: 60,
      price: 250,
      description: 'Günlük ve özel gün makyajı',
    },
    {
      id: '4',
      name: 'Cilt Bakımı',
      duration: 90,
      price: 300,
      description: 'Derin temizlik ve nemlendirme',
    },
  ],
  reviews: [
    {
      id: '1',
      user: 'Ayşe K.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Harika bir deneyimdi! Çok memnun kaldım.',
    },
    {
      id: '2',
      user: 'Mehmet S.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Güzel hizmet, tavsiye ederim.',
    },
    {
      id: '3',
      user: 'Fatma A.',
      rating: 5,
      date: '2024-01-05',
      comment: 'Çok profesyonel ve temiz bir salon.',
    },
  ],
  isOpen: true,
  isFavorite: false,
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`business-tabpanel-${index}`}
      aria-labelledby={`business-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function BusinessDetailPage() {
  const params = useParams();
  const businessId = params.id as string;
  const [tabValue, setTabValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(mockBusinessDetails.isFavorite);

  // Gerçek uygulamada burada API'den işletme detayları çekilir
  const business = mockBusinessDetails;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const workingHoursList = [
    { day: 'Pazartesi', hours: business.workingHours.monday },
    { day: 'Salı', hours: business.workingHours.tuesday },
    { day: 'Çarşamba', hours: business.workingHours.wednesday },
    { day: 'Perşembe', hours: business.workingHours.thursday },
    { day: 'Cuma', hours: business.workingHours.friday },
    { day: 'Cumartesi', hours: business.workingHours.saturday },
    { day: 'Pazar', hours: business.workingHours.sunday },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {business.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip label={business.category} variant="outlined" />
              <Chip
                label={business.isOpen ? 'Açık' : 'Kapalı'}
                color={business.isOpen ? 'success' : 'error'}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rating value={business.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                {business.rating} ({business.reviewCount} değerlendirme)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                onClick={handleFavoriteToggle}
              >
                {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              </Button>
              <Button variant="outlined" startIcon={<Share />}>
                Paylaş
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {/* Sol Kolon - İşletme Bilgileri */}
        <Grid item xs={12} md={8}>
          {/* Tabs */}
          <Card sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Hakkında" />
                <Tab label="Hizmetler" />
                <Tab label="Çalışma Saatleri" />
                <Tab label="Değerlendirmeler" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="body1" paragraph>
                {business.longDescription}
              </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={2}>
                {business.services.map((service) => (
                  <Grid item xs={12} sm={6} key={service.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {service.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {service.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            {service.duration} dakika
                          </Typography>
                          <Typography variant="h6" color="primary">
                            ₺{service.price}
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 2 }}
                          component={Link}
                          href={`/appointments/book?business=${business.id}&service=${service.id}`}
                        >
                          Randevu Al
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <List>
                {workingHoursList.map((item) => (
                  <ListItem key={item.day}>
                    <ListItemText
                      primary={item.day}
                      secondary={item.hours}
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Değerlendirmeler ({business.reviews.length})
                </Typography>
                <Button variant="outlined" startIcon={<Message />}>
                  Değerlendirme Yaz
                </Button>
              </Box>
              
              {business.reviews.map((review) => (
                <Card key={review.id} variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.user}
                      </Typography>
                      <Rating value={review.rating} size="small" readOnly />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {new Date(review.date).toLocaleDateString('tr-TR')}
                    </Typography>
                    <Typography variant="body1">
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </TabPanel>
          </Card>
        </Grid>

        {/* Sağ Kolon - İletişim ve Hızlı İşlemler */}
        <Grid item xs={12} md={4}>
          {/* İletişim Bilgileri */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                İletişim Bilgileri
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary="Adres"
                    secondary={business.address}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText
                    primary="Telefon"
                    secondary={business.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary="E-posta"
                    secondary={business.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText
                    primary="Çalışma Saatleri"
                    secondary="Pazartesi - Cuma: 09:00-20:00"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Hızlı İşlemler */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hızlı İşlemler
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CalendarToday />}
                  component={Link}
                  href={`/appointments/book?business=${business.id}`}
                >
                  Randevu Al
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Phone />}
                  href={`tel:${business.phone}`}
                >
                  Ara
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Message />}
                >
                  Mesaj Gönder
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
