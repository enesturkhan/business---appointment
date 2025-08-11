'use client';

import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

export default function LoadingSpinner({ 
  size = 40, 
  message = 'Yükleniyor...', 
  fullScreen = false,
  overlay = false 
}: LoadingSpinnerProps) {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...(fullScreen && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'background.default',
          zIndex: 9999,
        }),
        ...(overlay && {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1000,
        }),
      }}
    >
      <Fade in={true} style={{ transitionDelay: '200ms' }}>
        <CircularProgress size={size} />
      </Fade>
      {message && (
        <Fade in={true} style={{ transitionDelay: '400ms' }}>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </Fade>
      )}
    </Box>
  );

  return content;
}

// Skeleton Loading Component
export function LoadingSkeleton() {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'grey.300',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <Box sx={{ ml: 2, flex: 1 }}>
          <Box
            sx={{
              height: 20,
              backgroundColor: 'grey.300',
              borderRadius: 1,
              mb: 1,
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          <Box
            sx={{
              height: 16,
              backgroundColor: 'grey.200',
              borderRadius: 1,
              width: '60%',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: 100,
          backgroundColor: 'grey.200',
          borderRadius: 1,
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
    </Box>
  );
}

// Table Loading Component
export function TableLoadingSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <Box sx={{ p: 2 }}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
            alignItems: 'center',
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Box
              key={colIndex}
              sx={{
                height: 20,
                backgroundColor: 'grey.300',
                borderRadius: 1,
                flex: 1,
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${rowIndex * 0.1}s`,
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

// Button Loading Component
export function ButtonLoadingSpinner({ size = 20 }: { size?: number }) {
  return (
    <CircularProgress
      size={size}
      sx={{
        color: 'inherit',
        ml: 1,
      }}
    />
  );
}
