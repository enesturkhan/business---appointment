import { useEffect, useRef, useCallback } from 'react';
import { useState } from 'react';

// Hook for managing focus
export function useFocusManagement() {
  const focusRef = useRef<HTMLElement>(null);

  const focusElement = useCallback(() => {
    focusRef.current?.focus();
  }, []);

  const setFocusRef = useCallback((element: HTMLElement | null) => {
    focusRef.current = element;
  }, []);

  return {
    focusRef,
    focusElement,
    setFocusRef,
  };
}

// Hook for keyboard navigation
export function useKeyboardNavigation() {
  const handleKeyDown = useCallback((event: KeyboardEvent, handlers: {
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onTab?: () => void;
    onSpace?: () => void;
  }) => {
    switch (event.key) {
      case 'Enter':
        handlers.onEnter?.();
        break;
      case 'Escape':
        handlers.onEscape?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        handlers.onArrowUp?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        handlers.onArrowDown?.();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handlers.onArrowLeft?.();
        break;
      case 'ArrowRight':
        event.preventDefault();
        handlers.onArrowRight?.();
        break;
      case 'Tab':
        handlers.onTab?.();
        break;
      case ' ':
        event.preventDefault();
        handlers.onSpace?.();
        break;
    }
  }, []);

  return { handleKeyDown };
}

// Hook for screen reader announcements
export function useScreenReaderAnnouncement() {
  const [announcement, setAnnouncement] = useState<string>('');

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message);
    
    // Clear announcement after a short delay
    setTimeout(() => {
      setAnnouncement('');
    }, 1000);
  }, []);

  return {
    announcement,
    announce,
  };
}

// Hook for managing ARIA labels
export function useAriaLabels() {
  const generateAriaLabel = useCallback((
    action: string,
    context?: string,
    additionalInfo?: string
  ) => {
    let label = action;
    
    if (context) {
      label += ` ${context}`;
    }
    
    if (additionalInfo) {
      label += ` ${additionalInfo}`;
    }
    
    return label;
  }, []);

  const getButtonAriaLabel = useCallback((
    action: string,
    context?: string
  ) => {
    return generateAriaLabel(action, context);
  }, [generateAriaLabel]);

  const getLinkAriaLabel = useCallback((
    destination: string,
    context?: string
  ) => {
    return generateAriaLabel(`${destination} sayfasına git`, context);
  }, [generateAriaLabel]);

  const getImageAriaLabel = useCallback((
    description: string,
    context?: string
  ) => {
    return generateAriaLabel(description, context);
  }, [generateAriaLabel]);

  return {
    generateAriaLabel,
    getButtonAriaLabel,
    getLinkAriaLabel,
    getImageAriaLabel,
  };
}

// Hook for managing form accessibility
export function useFormAccessibility() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fieldStates, setFieldStates] = useState<Record<string, {
    touched: boolean;
    valid: boolean;
    required: boolean;
  }>>({});

  const setFieldError = useCallback((fieldName: string, errorMessage: string) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const setFieldState = useCallback((
    fieldName: string,
    state: { touched?: boolean; valid?: boolean; required?: boolean }
  ) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        ...state,
      },
    }));
  }, []);

  const getFieldAccessibilityProps = useCallback((fieldName: string) => {
    const fieldState = fieldStates[fieldName];
    const error = errors[fieldName];
    
    return {
      'aria-invalid': error ? 'true' : 'false',
      'aria-required': fieldState?.required ? 'true' : 'false',
      'aria-describedby': error ? `${fieldName}-error` : undefined,
    };
  }, [errors, fieldStates]);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    fieldStates,
    setFieldError,
    clearFieldError,
    setFieldState,
    getFieldAccessibilityProps,
    hasErrors,
  };
}

// Hook for managing table accessibility
export function useTableAccessibility() {
  const getTableAccessibilityProps = useCallback(() => ({
    role: 'table',
    'aria-label': 'Veri tablosu',
  }), []);

  const getTableHeaderAccessibilityProps = useCallback(() => ({
    role: 'row',
    'aria-rowindex': 1,
  }), []);

  const getTableRowAccessibilityProps = useCallback((rowIndex: number) => ({
    role: 'row',
    'aria-rowindex': rowIndex + 2, // +2 because header is row 1
  }), []);

  const getTableCellAccessibilityProps = useCallback((
    isHeader: boolean,
    columnIndex: number,
    rowIndex: number
  ) => ({
    role: isHeader ? 'columnheader' : 'cell',
    'aria-colindex': columnIndex + 1,
    'aria-rowindex': rowIndex + (isHeader ? 1 : 2),
  }), []);

  return {
    getTableAccessibilityProps,
    getTableHeaderAccessibilityProps,
    getTableRowAccessibilityProps,
    getTableCellAccessibilityProps,
  };
}

// Hook for managing modal accessibility
export function useModalAccessibility() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const openModal = useCallback((modalTitle: string) => {
    setTitle(modalTitle);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTitle('');
  }, []);

  const getModalAccessibilityProps = useCallback(() => ({
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'modal-title',
    'aria-describedby': 'modal-description',
  }), []);

  const getModalTitleProps = useCallback(() => ({
    id: 'modal-title',
    role: 'heading',
    'aria-level': 2,
  }), []);

  const getModalDescriptionProps = useCallback(() => ({
    id: 'modal-description',
  }), []);

  return {
    isOpen,
    title,
    openModal,
    closeModal,
    getModalAccessibilityProps,
    getModalTitleProps,
    getModalDescriptionProps,
  };
}

// Hook for managing list accessibility
export function useListAccessibility() {
  const getListAccessibilityProps = useCallback((type: 'ordered' | 'unordered' = 'unordered') => ({
    role: type === 'ordered' ? 'list' : 'list',
    'aria-label': type === 'ordered' ? 'Sıralı liste' : 'Sırasız liste',
  }), []);

  const getListItemAccessibilityProps = useCallback((index: number, total: number) => ({
    role: 'listitem',
    'aria-posinset': index + 1,
    'aria-setsize': total,
  }), []);

  return {
    getListAccessibilityProps,
    getListItemAccessibilityProps,
  };
}
