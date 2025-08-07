'use client';

import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { CalendarToday, Business, Person, Search } from '@mui/icons-material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            p: 6,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            },
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              color: 'white',
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            İş Randevu Sistemi
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              mb: 4,
              fontWeight: 400,
            }}
          >
            Yerel işletmelerle kolayca randevu bulun ve rezervasyon yapın
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/register"
              startIcon={<Person />}
              sx={{ 
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
                fontWeight: 600,
              }}
            >
              Başlayın
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/login"
              startIcon={<Search />}
              sx={{ 
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
                fontWeight: 600,
              }}
            >
              İşletme Bul
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Grid 
        container 
        spacing={4} 
        sx={{ 
          mb: 8,
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.palette.mode === 'light'
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <Business sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                İşletme Bulun
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Bölgenizdeki yerel işletmeleri ve hizmetleri keşfedin
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.palette.mode === 'light'
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <CalendarToday sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Randevu Alın
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Hızlı ve kolay bir şekilde online randevu planlayın
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.palette.mode === 'light'
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <Person sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Programınızı Yönetin
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Tüm randevularınızı tek bir yerden takip edin
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* CTA Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 6, 
          px: 4,
          background: (theme) => theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          },
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ 
            color: 'white',
            fontWeight: 700,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Başlamaya hazır mısınız?
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: 'rgba(255,255,255,0.9)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Online randevu alan binlerce kullanıcıya katılın
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          href="/register"
          startIcon={<Person />}
          sx={{ 
            bgcolor: 'white',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            },
            fontWeight: 600,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Hesap Oluştur
        </Button>
      </Box>
    </Container>
  );
}
