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
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Check as CheckIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { DeleteConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import { useNotifications } from '@/components/ui/NotificationSystem';

// User interface for type safety
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended' | 'pending';
  role: 'user' | 'business_owner' | 'admin';
  joinDate: string;
  lastLogin: string;
  avatar: string;
}

// Mock data - gerçek uygulamada API'den gelecek
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    status: 'active',
    role: 'user',
    joinDate: '2024-01-15',
    lastLogin: '2024-03-20',
    avatar: '/api/avatars/1',
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    phone: '+90 555 234 5678',
    status: 'active',
    role: 'business_owner',
    joinDate: '2024-02-01',
    lastLogin: '2024-03-19',
    avatar: '/api/avatars/2',
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    phone: '+90 555 345 6789',
    status: 'suspended',
    role: 'user',
    joinDate: '2024-01-20',
    lastLogin: '2024-03-15',
    avatar: '/api/avatars/3',
  },
  {
    id: 4,
    name: 'Fatma Özkan',
    email: 'fatma@example.com',
    phone: '+90 555 456 7890',
    status: 'pending',
    role: 'business_owner',
    joinDate: '2024-03-01',
    lastLogin: '2024-03-18',
    avatar: '/api/avatars/4',
  },
  {
    id: 5,
    name: 'Ali Çelik',
    email: 'ali@example.com',
    phone: '+90 555 567 8901',
    status: 'active',
    role: 'user',
    joinDate: '2024-02-15',
    lastLogin: '2024-03-20',
    avatar: '/api/avatars/5',
  },
];

const getStatusColor = (status: User['status']) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'suspended':
      return 'error';
    case 'pending':
      return 'warning';
  }
};

const getStatusText = (status: User['status']) => {
  switch (status) {
    case 'active':
      return 'Aktif';
    case 'suspended':
      return 'Askıya Alındı';
    case 'pending':
      return 'Beklemede';
  }
};

const getRoleText = (role: User['role']) => {
  switch (role) {
    case 'user':
      return 'Kullanıcı';
    case 'business_owner':
      return 'İşletme Sahibi';
    case 'admin':
      return 'Yönetici';
  }
};

export default function UserManagement() {
  const { showSuccess, showError, showWarning } = useNotifications();
  
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | User['role']>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const rowsPerPage = 10;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
    setAnchorEl(null);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      showSuccess(`${userToDelete.name} kullanıcısı başarıyla silindi!`);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleBlock = () => {
    // Bloklama işlemi burada yapılacak
    console.log('Block user:', selectedUser);
    handleMenuClose();
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Kullanıcı Yönetimi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistem kullanıcılarını yönetin ve izleyin
        </Typography>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Kullanıcı ara..."
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
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="suspended">Askıya Alınmış</MenuItem>
                <MenuItem value="pending">Beklemede</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Rol</InputLabel>
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Rol"
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="user">Kullanıcı</MenuItem>
                <MenuItem value="business_owner">İşletme Sahibi</MenuItem>
                <MenuItem value="admin">Yönetici</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setRoleFilter('all');
              }}
            >
              Filtreleri Temizle
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Kullanıcı</TableCell>
                  <TableCell>İletişim</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>Kayıt Tarihi</TableCell>
                  <TableCell>Son Giriş</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {user.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{user.email}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getRoleText(user.role)} 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(user.status)}
                        color={getStatusColor(user.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(user.lastLogin).toLocaleDateString('tr-TR')}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, user)}
                        size="small"
                      >
                        <MoreVertIcon />
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
              count={Math.ceil(filteredUsers.length / rowsPerPage)}
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
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }} />
          Düzenle
        </MenuItem>
        <MenuItem onClick={handleBlock}>
          <BlockIcon sx={{ mr: 1 }} />
          {selectedUser?.status === 'suspended' ? 'Engeli Kaldır' : 'Askıya Al'}
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedUser!)} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Sil
        </MenuItem>
      </Menu>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Kullanıcı Düzenle</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Ad Soyad"
                defaultValue={selectedUser.name}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="E-posta"
                defaultValue={selectedUser.email}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Telefon"
                defaultValue={selectedUser.phone}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Rol</InputLabel>
                <Select defaultValue={selectedUser.role} label="Rol">
                  <MenuItem value="user">Kullanıcı</MenuItem>
                  <MenuItem value="business_owner">İşletme Sahibi</MenuItem>
                  <MenuItem value="admin">Yönetici</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Durum</InputLabel>
                <Select defaultValue={selectedUser.status} label="Durum">
                  <MenuItem value="active">Aktif</MenuItem>
                  <MenuItem value="suspended">Askıya Alınmış</MenuItem>
                  <MenuItem value="pending">Beklemede</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>İptal</Button>
          <Button variant="contained" onClick={() => setEditDialogOpen(false)}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title="Kullanıcı Silme Onayı"
        message="Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        itemName={userToDelete?.name}
      />
    </Box>
  );
}
