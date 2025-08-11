'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Box,
  Typography,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// Notification Types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number;
  action?: ReactNode;
  persistent?: boolean;
}

// Context Interface
interface NotificationContextType {
  showNotification: (notification: Omit<Notification, 'id'>) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

// Create Context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider Component
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      id,
      duration: 6000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration (unless persistent)
    if (!newNotification.persistent && newNotification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  };

  const showSuccess = (message: string, title?: string) => {
    showNotification({
      type: 'success',
      title: title || 'Başarılı!',
      message,
    });
  };

  const showError = (message: string, title?: string) => {
    showNotification({
      type: 'error',
      title: title || 'Hata!',
      message,
      persistent: true, // Errors are persistent by default
    });
  };

  const showWarning = (message: string, title?: string) => {
    showNotification({
      type: 'warning',
      title: title || 'Uyarı!',
      message,
    });
  };

  const showInfo = (message: string, title?: string) => {
    showNotification({
      type: 'info',
      title: title || 'Bilgi',
      message,
    });
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const value: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationStack />
    </NotificationContext.Provider>
  );
}

// Hook to use notifications
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// Notification Stack Component
function NotificationStack() {
  const { removeNotification } = useNotifications();
  const [notifications] = useState<Notification[]>([]);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'success.main';
      case 'error':
        return 'error.main';
      case 'warning':
        return 'warning.main';
      case 'info':
        return 'info.main';
      default:
        return 'info.main';
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        maxWidth: 400,
        width: '100%',
      }}
    >
      {notifications.map((notification, index) => (
        <Collapse
          key={notification.id}
          in={true}
          timeout={300}
          style={{ marginBottom: 10 }}
        >
          <Alert
            severity={notification.type}
            icon={getIcon(notification.type)}
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => removeNotification(notification.id)}
              >
                <CloseIcon />
              </IconButton>
            }
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              '& .MuiAlert-icon': {
                color: getColor(notification.type),
              },
            }}
          >
            {notification.title && (
              <AlertTitle sx={{ fontWeight: 'bold' }}>
                {notification.title}
              </AlertTitle>
            )}
            <Typography variant="body2">{notification.message}</Typography>
            {notification.action && (
              <Box sx={{ mt: 1 }}>{notification.action}</Box>
            )}
          </Alert>
        </Collapse>
      ))}
    </Box>
  );
}

// Success Message Component
export function SuccessMessage({ 
  message, 
  title = 'Başarılı!',
  onClose,
  autoHide = true 
}: {
  message: string;
  title?: string;
  onClose?: () => void;
  autoHide?: boolean;
}) {
  return (
    <Alert
      severity="success"
      icon={<CheckCircleIcon />}
      onClose={onClose}
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        '& .MuiAlert-icon': {
          color: 'success.main',
        },
      }}
    >
      <AlertTitle sx={{ fontWeight: 'bold' }}>{title}</AlertTitle>
      <Typography variant="body2">{message}</Typography>
    </Alert>
  );
}

// Error Message Component
export function ErrorMessage({ 
  message, 
  title = 'Hata!',
  onClose,
  showRetry = false,
  onRetry 
}: {
  message: string;
  title?: string;
  onClose?: () => void;
  showRetry?: boolean;
  onRetry?: () => void;
}) {
  return (
    <Alert
      severity="error"
      icon={<ErrorIcon />}
      onClose={onClose}
      action={
        showRetry && onRetry ? (
          <IconButton
            color="inherit"
            size="small"
            onClick={onRetry}
            sx={{ color: 'error.main' }}
          >
            <Typography variant="caption">Tekrar Dene</Typography>
          </IconButton>
        ) : undefined
      }
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        '& .MuiAlert-icon': {
          color: 'error.main',
        },
      }}
    >
      <AlertTitle sx={{ fontWeight: 'bold' }}>{title}</AlertTitle>
      <Typography variant="body2">{message}</Typography>
    </Alert>
  );
}
