'use client';

import { Box, LinearProgress, Typography, Fade } from '@mui/material';

interface GlobalLoadingProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

export default function GlobalLoading({ 
  message = 'Yükleniyor...', 
  showProgress = false,
  progress = 0 
}: GlobalLoadingProps) {
  return (
    <Fade in={true} style={{ transitionDelay: '200ms' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: 'background.paper',
          boxShadow: 2,
        }}
      >
        {showProgress && (
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 3 }}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 1,
            px: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}

// Page Loading Component
export function PageLoading({ message = 'Sayfa yükleniyor...' }: { message?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '4px solid',
          borderColor: 'primary.main',
          borderTopColor: 'transparent',
          animation: 'spin 1s linear infinite',
        }}
      />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}

// Content Loading Component
export function ContentLoading({ 
  message = 'İçerik yükleniyor...',
  height = '200px'
}: { 
  message?: string;
  height?: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        gap: 2,
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '3px solid',
          borderColor: 'primary.main',
          borderTopColor: 'transparent',
          animation: 'spin 1s linear infinite',
        }}
      />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}
