'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Alert,
  AlertTitle,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  NetworkCheck as NetworkIcon,
  Storage as StorageIcon,
  LazyLoad as LazyLoadIcon,
  Virtualization as VirtualizationIcon,
  Memoization as MemoizationIcon,
  Debounce as DebounceIcon,
} from '@mui/icons-material';
import {
  LazyWrapper,
  VirtualizedList,
  MemoizedCard,
  PerformanceMonitor,
  LazyImage,
  DebouncedInput,
  InfiniteScroll,
  BundleAnalyzer,
} from '../../../../components/ui/Performance';
import {
  useRenderPerformance,
  useDebounce,
  useThrottle,
  useMemoizedValue,
  useLazyData,
  useNetworkPerformance,
  useMemoryUsage,
  useVirtualization,
  useLifecyclePerformance,
} from '../../../../hooks/usePerformance';

// Mock data for demo
const generateMockUsers = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 3 === 0 ? 'admin' : index % 2 === 0 ? 'moderator' : 'user',
    status: index % 4 === 0 ? 'inactive' : 'active',
    avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
  }));
};

const mockUsers = generateMockUsers(1000);

export default function PerformanceDemoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showVirtualizedList, setShowVirtualizedList] = useState(false);
  const [showLazyImages, setShowLazyImages] = useState(false);
  const [memoizedCards, setMemoizedCards] = useState([
    { id: 1, title: 'Card 1', content: 'This is a memoized card' },
    { id: 2, title: 'Card 2', content: 'This is another memoized card' },
  ]);

  // Performance hooks
  const { renderCount } = useRenderPerformance('PerformanceDemoPage');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const throttledSearch = useThrottle((value: string) => {
    console.log('Throttled search:', value);
  }, 1000);
  
  const networkMetrics = useNetworkPerformance();
  const { memoryInfo, getMemoryUsagePercentage } = useMemoryUsage();
  const { mountTime } = useLifecyclePerformance('PerformanceDemoPage');

  // Memoized expensive calculation
  const expensiveCalculation = useMemoizedValue(
    () => {
      // Simulate expensive operation
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += Math.random();
      }
      return result;
    },
    [searchTerm],
    (prev, next) => Math.abs(prev - next) < 0.1
  );

  // Lazy data loading
  const { data: lazyData, loading: lazyLoading, hasMore, loadMore } = useLazyData(
    async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateMockUsers(20);
    },
    20
  );

  // Virtualization
  const { visibleItems, totalHeight, offsetY, handleScroll } = useVirtualization(
    mockUsers,
    60,
    400,
    5
  );

  // Memoized expensive operation
  const expensiveOperation = useMemo(() => {
    console.log('Expensive operation executed');
    return mockUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    throttledSearch(value);
  }, [throttledSearch]);

  const addMemoizedCard = useCallback(() => {
    const newId = Math.max(...memoizedCards.map(card => card.id)) + 1;
    setMemoizedCards(prev => [
      ...prev,
      { id: newId, title: `Card ${newId}`, content: `New memoized card ${newId}` }
    ]);
  }, [memoizedCards]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Performance Optimization Demo
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Bu sayfa farklı performance optimization tekniklerini göstermek için oluşturulmuştur.
      </Typography>

      {/* Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <PerformanceMonitor />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <BundleAnalyzer />
        </Grid>
      </Grid>

      {/* Performance Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Performance Overview
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <SpeedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{renderCount}</Typography>
                <Typography variant="caption">Render Count</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <MemoryIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{getMemoryUsagePercentage().toFixed(1)}%</Typography>
                <Typography variant="caption">Memory Usage</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <NetworkIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{networkMetrics.downlink.toFixed(1)}</Typography>
                <Typography variant="caption">Network Speed (Mbps)</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <StorageIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">{expensiveCalculation.toFixed(2)}</Typography>
                <Typography variant="caption">Expensive Calc</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Search and Filtering */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search & Filtering Performance
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search Users"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Type to search..."
              />
              <Typography variant="caption" color="text.secondary">
                Debounced: {debouncedSearchTerm}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>
                Search Results: {expensiveOperation.length} users found
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={Math.min((expensiveOperation.length / mockUsers.length) * 100, 100)} 
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Memoization Demo */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Memoization Demo
          </Typography>
          
          <Button 
            variant="contained" 
            onClick={addMemoizedCard}
            sx={{ mb: 2 }}
          >
            Add New Card
          </Button>
          
          <Grid container spacing={2}>
            {memoizedCards.map(card => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <MemoizedCard
                  title={card.title}
                  content={card.content}
                  onClick={() => console.log(`Card ${card.id} clicked`)}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Virtualization Demo */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Virtualization Demo
          </Typography>
          
          <Button 
            variant="contained" 
            onClick={() => setShowVirtualizedList(!showVirtualizedList)}
            sx={{ mb: 2 }}
          >
            {showVirtualizedList ? 'Hide' : 'Show'} Virtualized List
          </Button>
          
          {showVirtualizedList && (
            <VirtualizedList
              items={mockUsers}
              height={400}
              itemHeight={60}
              renderItem={(user, index) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={user.avatar} alt={user.name} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  <Chip 
                    label={user.role} 
                    size="small" 
                    variant="outlined" 
                  />
                </Box>
              )}
            />
          )}
        </CardContent>
      </Card>

      {/* Lazy Loading Demo */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lazy Loading Demo
          </Typography>
          
          <Button 
            variant="contained" 
            onClick={() => setShowLazyImages(!showLazyImages)}
            sx={{ mb: 2 }}
          >
            {showLazyImages ? 'Hide' : 'Show'} Lazy Images
          </Button>
          
          {showLazyImages && (
            <Grid container spacing={2}>
              {Array.from({ length: 12 }).map((_, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <LazyImage
                    src={`https://picsum.photos/200/200?random=${index}`}
                    alt={`Random image ${index}`}
                    width={200}
                    height={200}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Infinite Scroll Demo */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Infinite Scroll Demo
          </Typography>
          
          <InfiniteScroll
            items={lazyData}
            hasMore={hasMore}
            onLoadMore={loadMore}
            renderItem={(user, index) => (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <Avatar src={user.avatar} alt={user.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={user.email}
                />
                <Chip 
                  label={user.role} 
                  size="small" 
                  variant="outlined" 
                />
              </ListItem>
            )}
            loading={lazyLoading}
          />
          
          {lazyLoading && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <LinearProgress />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Performance Best Practices */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Performance Best Practices
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Alert severity="success" icon={<SpeedIcon />}>
                <AlertTitle>Yapılan Optimizasyonlar</AlertTitle>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Code splitting ve lazy loading" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Virtualization ve memoization" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Debouncing ve throttling" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Bundle optimization" />
                  </ListItem>
                </List>
              </Alert>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Alert severity="info" icon={<MemoryIcon />}>
                <AlertTitle>Test Edilebilir Özellikler</AlertTitle>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Bundle analyzer (ANALYZE=true)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Performance monitoring" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Memory usage tracking" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Network performance" />
                  </ListItem>
                </List>
              </Alert>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
