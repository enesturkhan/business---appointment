'use client';

import React, { Suspense, lazy, memo, useMemo, useCallback, useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  NetworkCheck as NetworkIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';

// Lazy Loading Wrapper
export function LazyWrapper({ 
  children, 
  fallback = <CircularProgress />,
  delay = 200 
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}) {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (showFallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Virtualized List Component
export function VirtualizedList<T>({
  items,
  height = 400,
  itemHeight = 60,
  renderItem,
  loading = false,
}: {
  items: T[];
  height?: number;
  itemHeight?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const theme = useTheme();

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(height / itemHeight) + 1,
      items.length
    );

    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      originalIndex: startIndex + index,
    }));
  }, [items, scrollTop, height, itemHeight]);

  const totalHeight = items.length * itemHeight;
  const offsetY = Math.floor(scrollTop / itemHeight) * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  if (loading) {
    return (
      <Box sx={{ height, overflow: 'hidden' }}>
        {Array.from({ length: Math.ceil(height / itemHeight) }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={itemHeight - 8}
            sx={{ m: 0.5, borderRadius: 1 }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height,
        overflow: 'auto',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
      onScroll={handleScroll}
    >
      <Box sx={{ height: totalHeight, position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleItems.map(({ item, originalIndex }) => (
            <Box
              key={originalIndex}
              sx={{
                height: itemHeight,
                display: 'flex',
                alignItems: 'center',
                px: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                '&:last-child': {
                  borderBottom: 'none',
                },
              }}
            >
              {renderItem(item, originalIndex)}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// Memoized Card Component
export const MemoizedCard = memo(function MemoizedCard({
  title,
  content,
  onClick,
}: {
  title: string;
  content: string;
  onClick?: () => void;
}) {
  return (
    <Card 
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
});

// Performance Monitor Component
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    memory: 0,
    cpu: 0,
    network: 0,
    storage: 0,
  });

  useEffect(() => {
    const updateMetrics = () => {
      // Memory usage (if available)
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memory: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024), // MB
        }));
      }

      // Simulate other metrics
      setMetrics(prev => ({
        ...prev,
        cpu: Math.random() * 100,
        network: Math.random() * 100,
        storage: Math.random() * 100,
      }));
    };

    const interval = setInterval(updateMetrics, 2000);
    updateMetrics();

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Performance Metrics
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <MemoryIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">{metrics.memory} MB</Typography>
            <Typography variant="caption">Memory Usage</Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <SpeedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">{metrics.cpu.toFixed(1)}%</Typography>
            <Typography variant="caption">CPU Usage</Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <NetworkIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">{metrics.network.toFixed(1)}%</Typography>
            <Typography variant="caption">Network</Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <StorageIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">{metrics.storage.toFixed(1)}%</Typography>
            <Typography variant="caption">Storage</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// Image Lazy Loading Component
export function LazyImage({
  src,
  alt,
  width,
  height,
  placeholder = <Skeleton variant="rectangular" width={width} height={height} />,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder?: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.createElement('div');
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!isInView) {
    return <>{placeholder}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
      onLoad={() => setIsLoaded(true)}
    />
  );
}

// Debounced Input Component
export function DebouncedInput({
  value,
  onChange,
  delay = 300,
  placeholder,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
  placeholder?: string;
  [key: string]: any;
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [localValue, delay, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
      {...props}
    />
  );
}

// Infinite Scroll Component
export function InfiniteScroll<T>({
  items,
  hasMore,
  onLoadMore,
  renderItem,
  loading = false,
  threshold = 100,
}: {
  items: T[];
  hasMore: boolean;
  onLoadMore: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
  threshold?: number;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore]);

  return (
    <Box>
      {items.map((item, index) => renderItem(item, index))}
      
      {hasMore && (
        <Box
          ref={(el) => {
            if (el) {
              const observer = new IntersectionObserver(
                ([entry]) => setIsIntersecting(entry.isIntersecting),
                { rootMargin: `${threshold}px` }
              );
              observer.observe(el);
            }
          }}
          sx={{ height: 20, my: 2 }}
        >
          {loading && <CircularProgress size={20} />}
        </Box>
      )}
    </Box>
  );
}

// Bundle Size Analyzer Component
export function BundleAnalyzer() {
  const [bundleInfo, setBundleInfo] = useState({
    totalSize: '0 KB',
    chunks: 0,
    modules: 0,
    gzippedSize: '0 KB',
  });

  useEffect(() => {
    // Simulate bundle analysis
    setBundleInfo({
      totalSize: '2.4 MB',
      chunks: 8,
      modules: 156,
      gzippedSize: '456 KB',
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Bundle Analysis
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Box>
            <Typography variant="h6" color="primary">
              {bundleInfo.totalSize}
            </Typography>
            <Typography variant="caption">Total Size</Typography>
          </Box>
          
          <Box>
            <Typography variant="h6" color="primary">
              {bundleInfo.gzippedSize}
            </Typography>
            <Typography variant="caption">Gzipped Size</Typography>
          </Box>
          
          <Box>
            <Typography variant="h6" color="primary">
              {bundleInfo.chunks}
            </Typography>
            <Typography variant="caption">Chunks</Typography>
          </Box>
          
          <Box>
            <Typography variant="h6" color="primary">
              {bundleInfo.modules}
            </Typography>
            <Typography variant="caption">Modules</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
