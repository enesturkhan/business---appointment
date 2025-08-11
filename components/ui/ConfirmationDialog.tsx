'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Alert,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

export type DialogType = 'warning' | 'info' | 'error' | 'success' | 'question';

export interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  type?: DialogType;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose?: () => void;
  confirmButtonColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  cancelButtonColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  showCancelButton?: boolean;
  persistent?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children?: React.ReactNode;
  showIcon?: boolean;
  customIcon?: React.ReactNode;
}

export default function ConfirmationDialog({
  open,
  title,
  message,
  type = 'warning',
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
  confirmButtonColor = 'primary',
  cancelButtonColor = 'default',
  showCancelButton = true,
  persistent = false,
  maxWidth = 'sm',
  fullWidth = true,
  children,
  showIcon = true,
  customIcon,
}: ConfirmationDialogProps) {
  const getIcon = () => {
    if (customIcon) return customIcon;
    
    switch (type) {
      case 'warning':
        return <WarningIcon color="warning" sx={{ fontSize: 40 }} />;
      case 'error':
        return <ErrorIcon color="error" sx={{ fontSize: 40 }} />;
      case 'success':
        return <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />;
      case 'info':
        return <InfoIcon color="info" sx={{ fontSize: 40 }} />;
      case 'question':
        return <HelpIcon color="primary" sx={{ fontSize: 40 }} />;
      default:
        return <WarningIcon color="warning" sx={{ fontSize: 40 }} />;
    }
  };

  const getDefaultTexts = () => {
    switch (type) {
      case 'warning':
        return {
          confirm: 'Evet, Devam Et',
          cancel: 'İptal',
        };
      case 'error':
        return {
          confirm: 'Tamam',
          cancel: 'Kapat',
        };
      case 'success':
        return {
          confirm: 'Tamam',
          cancel: 'Kapat',
        };
      case 'info':
        return {
          confirm: 'Anladım',
          cancel: 'Kapat',
        };
      case 'question':
        return {
          confirm: 'Evet',
          cancel: 'Hayır',
        };
      default:
        return {
          confirm: 'Onayla',
          cancel: 'İptal',
        };
    }
  };

  const getDefaultButtonColors = () => {
    switch (type) {
      case 'warning':
        return {
          confirm: 'warning' as const,
          cancel: 'default' as const,
        };
      case 'error':
        return {
          confirm: 'error' as const,
          cancel: 'default' as const,
        };
      case 'success':
        return {
          confirm: 'success' as const,
          cancel: 'default' as const,
        };
      case 'info':
        return {
          confirm: 'info' as const,
          cancel: 'default' as const,
        };
      case 'question':
        return {
          confirm: 'primary' as const,
          cancel: 'default' as const,
        };
      default:
        return {
          confirm: 'primary' as const,
          cancel: 'default' as const,
        };
    }
  };

  const defaultTexts = getDefaultTexts();
  const defaultColors = getDefaultButtonColors();

  const handleConfirm = () => {
    onConfirm();
    if (!persistent) {
      onClose?.();
    }
  };

  const handleCancel = () => {
    onCancel();
    if (!persistent) {
      onClose?.();
    }
  };

  const handleClose = () => {
    if (persistent) return;
    onClose?.();
    onCancel();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 3,
          minWidth: 400,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {showIcon && getIcon()}
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        {!persistent && (
          <IconButton
            onClick={handleClose}
            sx={{
              color: 'grey.500',
              '&:hover': {
                color: 'grey.700',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <Divider />

      {/* Content */}
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {message}
        </Typography>
        {children}
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ p: 3, pt: 1 }}>
        {showCancelButton && (
          <Button
            onClick={handleCancel}
            variant="outlined"
            color={cancelButtonColor || defaultColors.cancel}
            sx={{ minWidth: 100 }}
          >
            {cancelText || defaultTexts.cancel}
          </Button>
        )}
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={confirmButtonColor || defaultColors.confirm}
          sx={{ minWidth: 100 }}
          autoFocus
        >
          {confirmText || defaultTexts.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Specialized Dialog Components
export function DeleteConfirmationDialog({
  open,
  title = 'Silme Onayı',
  message = 'Bu öğeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
  itemName,
  onConfirm,
  onCancel,
  onClose,
  ...props
}: Omit<ConfirmationDialogProps, 'type' | 'confirmText' | 'cancelText'> & {
  itemName?: string;
}) {
  const finalMessage = itemName 
    ? `${message}\n\nÖğe: "${itemName}"`
    : message;

  return (
    <ConfirmationDialog
      open={open}
      title={title}
      message={finalMessage}
      type="warning"
      confirmText="Evet, Sil"
      cancelText="İptal"
      confirmButtonColor="error"
      onConfirm={onConfirm}
      onCancel={onCancel}
      onClose={onClose}
      {...props}
    />
  );
}

export function UpdateConfirmationDialog({
  open,
  title = 'Güncelleme Onayı',
  message = 'Bu değişiklikleri kaydetmek istediğinizden emin misiniz?',
  onConfirm,
  onCancel,
  onClose,
  ...props
}: Omit<ConfirmationDialogProps, 'type' | 'confirmText' | 'cancelText'>) {
  return (
    <ConfirmationDialog
      open={open}
      title={title}
      message={message}
      type="info"
      confirmText="Evet, Kaydet"
      cancelText="İptal"
      confirmButtonColor="primary"
      onConfirm={onConfirm}
      onCancel={onCancel}
      onClose={onClose}
      {...props}
    />
  );
}

export function LogoutConfirmationDialog({
  open,
  title = 'Çıkış Onayı',
  message = 'Hesabınızdan çıkmak istediğinizden emin misiniz?',
  onConfirm,
  onCancel,
  onClose,
  ...props
}: Omit<ConfirmationDialogProps, 'type' | 'confirmText' | 'cancelText'>) {
  return (
    <ConfirmationDialog
      open={open}
      title={title}
      message={message}
      type="question"
      confirmText="Evet, Çıkış Yap"
      cancelText="İptal"
      confirmButtonColor="warning"
      onConfirm={onConfirm}
      onCancel={onCancel}
      onClose={onClose}
      {...props}
    />
  );
}

// Hook for easy dialog management
export function useConfirmationDialog() {
  const [dialogConfig, setDialogConfig] = React.useState<{
    open: boolean;
    title: string;
    message: string;
    type?: DialogType;
    onConfirm: () => void;
    onCancel?: () => void;
  }>({
    open: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const showDialog = (config: Omit<typeof dialogConfig, 'open'>) => {
    setDialogConfig({ ...config, open: true });
  };

  const hideDialog = () => {
    setDialogConfig(prev => ({ ...prev, open: false }));
  };

  const confirm = (title: string, message: string, onConfirm: () => void) => {
    showDialog({
      title,
      message,
      type: 'question',
      onConfirm: () => {
        onConfirm();
        hideDialog();
      },
      onCancel: hideDialog,
    });
  };

  const confirmDelete = (itemName: string, onConfirm: () => void) => {
    showDialog({
      title: 'Silme Onayı',
      message: `"${itemName}" öğesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      type: 'warning',
      onConfirm: () => {
        onConfirm();
        hideDialog();
      },
      onCancel: hideDialog,
    });
  };

  return {
    dialogConfig,
    showDialog,
    hideDialog,
    confirm,
    confirmDelete,
  };
}
