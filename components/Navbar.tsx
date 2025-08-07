'use client';

import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Avatar } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            İş Randevu Sistemi
          </Link>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ThemeToggle />
          
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={Link}
                href="/dashboard"
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
      </Toolbar>
    </AppBar>
  );
}
