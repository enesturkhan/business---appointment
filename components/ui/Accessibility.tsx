'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { KeyboardArrowUp as ArrowUpIcon } from '@mui/icons-material';

// Skip to main content link
export function SkipToMainContent() {
  return (
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: 'absolute',
        top: -40,
        left: 6,
        background: 'primary.main',
        color: 'white',
        padding: '8px',
        textDecoration: 'none',
        borderRadius: '4px',
        zIndex: 9999,
        '&:focus': {
          top: 6,
        },
      }}
    >
      Ana içeriğe geç
    </Box>
  );
}

// Focus trap component for modals
export function FocusTrap({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

// Screen reader only text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {children}
    </Box>
  );
}

// Live region for announcements
export function LiveRegion({ 
  children, 
  ariaLive = 'polite',
  ariaAtomic = 'true'
}: { 
  children: React.ReactNode;
  ariaLive?: 'off' | 'polite' | 'assertive';
  ariaAtomic?: 'true' | 'false';
}) {
  return (
    <Box
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      sx={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
}

// Back to top button with accessibility
export function BackToTop() {
  const theme = useTheme();
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={scrollToTop}
      aria-label="Sayfanın başına dön"
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        borderRadius: '50%',
        width: 56,
        height: 56,
        minWidth: 'unset',
        boxShadow: theme.shadows[4],
        zIndex: 1000,
        '&:hover': {
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <ArrowUpIcon />
    </Button>
  );
}

// Accessible loading indicator
export function AccessibleLoading({ 
  message = 'Yükleniyor',
  role = 'status',
  ariaLive = 'polite'
}: {
  message?: string;
  role?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
}) {
  return (
    <Box
      role={role}
      aria-live={ariaLive}
      aria-label={message}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          border: '2px solid',
          borderColor: 'primary.main',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <Typography variant="body2">{message}</Typography>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}

// Accessible error message
export function AccessibleErrorMessage({ 
  message,
  id,
  role = 'alert',
  ariaLive = 'assertive'
}: {
  message: string;
  id?: string;
  role?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
}) {
  return (
    <Box
      id={id}
      role={role}
      aria-live={ariaLive}
      aria-label="Hata mesajı"
      sx={{
        color: 'error.main',
        fontSize: '0.875rem',
        mt: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      <Typography variant="body2" color="error.main">
        {message}
      </Typography>
    </Box>
  );
}

// Accessible form field wrapper
export function AccessibleFormField({ 
  children,
  label,
  required = false,
  error,
  helperText,
  id,
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  id?: string;
}) {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        component="label"
        htmlFor={fieldId}
        variant="body2"
        fontWeight="medium"
        sx={{ mb: 1, display: 'block' }}
      >
        {label}
        {required && (
          <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
            *
          </Box>
        )}
      </Typography>
      
      {React.cloneElement(children as React.ReactElement, {
        id: fieldId,
        'aria-describedby': error ? errorId : helperText ? helperId : undefined,
        'aria-invalid': error ? 'true' : 'false',
        'aria-required': required,
      })}
      
      {error && (
        <AccessibleErrorMessage 
          message={error} 
          id={errorId}
        />
      )}
      
      {helperText && !error && (
        <Typography
          id={helperId}
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, display: 'block' }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
