'use client';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Menu, 
  MenuItem, 
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div">
          İş Randevu Sistemi
        </Typography>
      </Box>
      
      <List sx={{ pt: 1 }}>
        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/dashboard" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Kontrol Paneli" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/profile" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profil" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/settings" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Ayarlar" />
              </ListItemButton>
            </ListItem>
            
            <Divider sx={{ my: 1 }} />
            
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Çıkış Yap" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/login" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Giriş Yap" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/register" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Kayıt Ol" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="Ana menüyü aç"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo/Brand */}
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          component="div" 
          sx={{ 
            flexGrow: 1,
            [theme.breakpoints.down('sm')]: {
              fontSize: '1rem',
            }
          }}
        >
          <Link 
            href="/" 
            style={{ textDecoration: 'none', color: 'inherit' }}
            aria-label="Ana sayfaya git"
          >
            {isMobile ? 'İRS' : 'İş Randevu Sistemi'}
          </Link>
        </Typography>
        
        {/* Desktop navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <ThemeToggle />
            
            {isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  href="/dashboard"
                  startIcon={<DashboardIcon />}
                >
                  Kontrol Paneli
                </Button>
                <Button
                  color="inherit"
                  onClick={handleMenu}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                    {user?.name?.charAt(0) || 'U'}
                  </Avatar>
                  {user?.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleClose} component={Link} href="/profile">
                    Profil
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} href="/settings">
                    Ayarlar
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Çıkış Yap
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} href="/login">
                  Giriş Yap
                </Button>
                <Button color="inherit" component={Link} href="/register">
                  Kayıt Ol
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Mobile: Theme toggle and user avatar */}
        {isMobile && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <ThemeToggle />
            {isAuthenticated && (
              <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            )}
          </Box>
        )}
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            backgroundColor: theme.palette.background.paper,
          },
        }}
        id="mobile-menu"
        aria-label="Ana navigasyon menüsü"
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
