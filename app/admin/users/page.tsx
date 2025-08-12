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
  Avatar,
  Badge,
  Tooltip,
  Pagination,
  Grid,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import LoadingSpinner, { TableLoadingSkeleton } from '@/components/ui/LoadingSpinner';
import { DataError, EmptyState } from '@/components/ui/ErrorComponents';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const rowsPerPage = 10;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEdit = async () => {
    setIsEditing(true);
    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 500));
      setEditDialogOpen(true);
      handleMenuClose();
    } catch (error) {
      showError('Kullanıcı bilgileri yüklenirken bir hata oluştu!');
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
    setAnchorEl(null);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      setIsDeleting(true);
      try {
        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
        showSuccess(`${userToDelete.name} kullanıcısı başarıyla silindi!`);
        setDeleteDialogOpen(false);
        setUserToDelete(null);
      } catch (error) {
        showError('Kullanıcı silinirken bir hata oluştu!');
      } finally {
        setIsDeleting(false);
      }
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
          <Box 
            component="form"
            role="search"
            aria-label="Kullanıcı arama ve filtreleme"
            sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 }, 
              flexWrap: 'wrap', 
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <TextField
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Kullanıcı adı veya e-posta ile ara"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon aria-hidden="true" />
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
              <InputLabel id="role-filter-label">Rol</InputLabel>
              <Select
                labelId="role-filter-label"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Rol"
                aria-label="Kullanıcı rolüne göre filtrele"
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="user">Kullanıcı</MenuItem>
                <MenuItem value="business_owner">İşletme Sahibi</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ 
              minWidth: { xs: '100%', sm: 150 },
              width: { xs: '100%', sm: 'auto' },
            }}>
              <InputLabel id="status-filter-label">Durum</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Durum"
                aria-label="Kullanıcı durumuna göre filtrele"
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Pasif</MenuItem>
                <MenuItem value="blocked">Engellenmiş</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterListIcon aria-hidden="true" />}
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('all');
                setStatusFilter('all');
              }}
              aria-label="Tüm filtreleri temizle"
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

      {/* Users Table */}
      <Card>
        <CardContent>
          <TableContainer 
            component={Paper} 
            variant="outlined"
            aria-label="Kullanıcı listesi tablosu"
          >
            <Table role="table" aria-label="Kullanıcı bilgileri">
              <TableHead>
                <TableRow role="row" aria-rowindex={1}>
                  <TableCell 
                    role="columnheader"
                    aria-label="Kullanıcı avatar ve bilgileri"
                    sx={{ 
                      display: { xs: 'none', md: 'table-cell' },
                      minWidth: { md: 120 }
                    }}
                  >
                    Kullanıcı
                  </TableCell>
                  <TableCell 
                    role="columnheader"
                    aria-label="Kullanıcı adı"
                    sx={{ 
                      display: { xs: 'table-cell', md: 'table-cell' },
                      minWidth: { xs: 80, md: 120 }
                    }}
                  >
                    {isMobile ? 'Ad' : 'Ad Soyad'}
                  </TableCell>
                  <TableCell 
                    role="columnheader"
                    aria-label="E-posta adresi"
                    sx={{ 
                      display: { xs: 'none', sm: 'table-cell' },
                      minWidth: { sm: 150 }
                    }}
                  >
                    E-posta
                  </TableCell>
                  <TableCell 
                    role="columnheader"
                    aria-label="Kullanıcı rolü"
                    sx={{ 
                      display: { xs: 'none', md: 'table-cell' },
                      minWidth: { md: 100 }
                    }}
                  >
                    Rol
                  </TableCell>
                  <TableCell 
                    role="columnheader"
                    aria-label="Kullanıcı durumu"
                    sx={{ 
                      display: { xs: 'none', sm: 'table-cell' },
                      minWidth: { sm: 100 }
                    }}
                  >
                    Durum
                  </TableCell>
                  <TableCell 
                    role="columnheader"
                    aria-label="Kayıt tarihi"
                    sx={{ 
                      display: { xs: 'none', lg: 'table-cell' },
                      minWidth: { lg: 120 }
                    }}
                  >
                    Kayıt Tarihi
                  </TableCell>
                  <TableCell 
                    role="columnheader"
                    aria-label="İşlem butonları"
                    align="right" 
                    sx={{ minWidth: { xs: 60, sm: 80 } }}
                  >
                    İşlemler
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user, index) => (
                  <TableRow 
                    key={user.id} 
                    hover
                    role="row"
                    aria-rowindex={index + 2}
                    aria-label={`${user.name} kullanıcısı`}
                  >
                    <TableCell 
                      role="cell"
                      aria-label={`${user.name} kullanıcısının avatar ve bilgileri`}
                      sx={{ 
                        display: { xs: 'none', md: 'table-cell' }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ mr: 2, bgcolor: 'primary.main' }}
                          aria-label={`${user.name} kullanıcısının avatarı`}
                        >
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
                    <TableCell 
                      role="cell"
                      aria-label={`Kullanıcı adı: ${user.name}`}
                    >
                      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <Typography variant="body2" fontWeight="medium">
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell 
                      role="cell"
                      aria-label={`E-posta: ${user.email}`}
                      sx={{ 
                        display: { xs: 'none', sm: 'table-cell' }
                      }}
                    >
                      <Typography variant="body2">{user.email}</Typography>
                    </TableCell>
                    <TableCell 
                      role="cell"
                      aria-label={`Rol: ${getRoleText(user.role)}`}
                      sx={{ 
                        display: { xs: 'none', md: 'table-cell' }
                      }}
                    >
                      <Chip 
                        label={getRoleText(user.role)} 
                        size="small"
                        variant="outlined"
                        aria-label={`${getRoleText(user.role)} rolü`}
                      />
                    </TableCell>
                    <TableCell 
                      role="cell"
                      aria-label={`Durum: ${getStatusText(user.status)}`}
                      sx={{ 
                        display: { xs: 'none', sm: 'table-cell' }
                      }}
                    >
                      <Chip 
                        label={getStatusText(user.status)}
                        color={getStatusColor(user.status)}
                        size="small"
                        aria-label={`${getStatusText(user.status)} durumu`}
                      />
                    </TableCell>
                    <TableCell 
                      role="cell"
                      aria-label={`Kayıt tarihi: ${new Date(user.joinDate).toLocaleDateString('tr-TR')}`}
                      sx={{ 
                        display: { xs: 'none', lg: 'table-cell' }
                      }}
                    >
                      <Typography variant="body2">
                        {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                      </Typography>
                    </TableCell>
                    <TableCell 
                      role="cell"
                      align="right"
                      aria-label="Kullanıcı işlemleri"
                    >
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, user)}
                        size="small"
                        aria-label={`${user.name} için işlem menüsünü aç`}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorEl)}
                      >
                        <MoreVertIcon aria-hidden="true" />
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
