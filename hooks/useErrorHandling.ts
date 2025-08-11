import { useState, useCallback, useRef } from 'react';

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorType: 'network' | 'validation' | 'permission' | 'data' | 'unknown';
  context?: string;
}

interface UseErrorHandlingReturn {
  errorState: ErrorState;
  handleError: (error: Error, type?: ErrorState['errorType'], context?: string) => void;
  clearError: () => void;
  retry: () => void;
  isRetrying: boolean;
}

export function useErrorHandling(): UseErrorHandlingReturn {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorType: 'unknown',
  });
  const [isRetrying, setIsRetrying] = useState(false);
  const retryFunctionRef = useRef<(() => void) | null>(null);

  const handleError = useCallback((
    error: Error, 
    type: ErrorState['errorType'] = 'unknown', 
    context?: string
  ) => {
    console.error(`Error in ${context || 'component'}:`, error);
    
    setErrorState({
      hasError: true,
      error,
      errorType: type,
      context,
    });

    // In production, send to error reporting service
    // Example: Sentry.captureException(error, { tags: { type, context } });
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      errorType: 'unknown',
    });
  }, []);

  const retry = useCallback(async () => {
    if (retryFunctionRef.current) {
      setIsRetrying(true);
      try {
        await retryFunctionRef.current();
        clearError();
      } catch (error) {
        // Error will be handled by the retry function itself
      } finally {
        setIsRetrying(false);
      }
    }
  }, [clearError]);

  const setRetryFunction = useCallback((fn: () => void) => {
    retryFunctionRef.current = fn;
  }, []);

  return {
    errorState,
    handleError,
    clearError,
    retry,
    isRetrying,
    setRetryFunction,
  };
}

// Form Error Handling Hook
export function useFormErrorHandling() {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const setFieldError = useCallback((field: string, message: string) => {
    setFormErrors(prev => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setFormErrors({});
    setGeneralError(null);
  }, []);

  const setGeneralFormError = useCallback((message: string) => {
    setGeneralError(message);
  }, []);

  const hasErrors = Object.keys(formErrors).length > 0 || !!generalError;

  return {
    formErrors,
    generalError,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    setGeneralFormError,
    hasErrors,
  };
}

// API Error Handling Hook
export function useApiErrorHandling() {
  const [apiError, setApiError] = useState<{
    message: string;
    status?: number;
    code?: string;
  } | null>(null);

  const handleApiError = useCallback((error: any) => {
    let errorMessage = 'Bir hata oluştu';
    let status: number | undefined;
    let code: string | undefined;

    if (error.response) {
      // Server response with error status
      status = error.response.status;
      const data = error.response.data;
      
      if (data?.message) {
        errorMessage = data.message;
      } else if (data?.error) {
        errorMessage = data.error;
      } else {
        switch (status) {
          case 400:
            errorMessage = 'Geçersiz istek';
            break;
          case 401:
            errorMessage = 'Yetkilendirme gerekli';
            break;
          case 403:
            errorMessage = 'Erişim engellendi';
            break;
          case 404:
            errorMessage = 'Kaynak bulunamadı';
            break;
          case 500:
            errorMessage = 'Sunucu hatası';
            break;
          default:
            errorMessage = `Hata: ${status}`;
        }
      }
      
      code = data?.code;
    } else if (error.request) {
      // Network error
      errorMessage = 'Bağlantı hatası oluştu';
    } else if (error.message) {
      // Other error
      errorMessage = error.message;
    }

    setApiError({
      message: errorMessage,
      status,
      code,
    });

    // Log error
    console.error('API Error:', {
      message: errorMessage,
      status,
      code,
      originalError: error,
    });
  }, []);

  const clearApiError = useCallback(() => {
    setApiError(null);
  }, []);

  return {
    apiError,
    handleApiError,
    clearApiError,
  };
}

// Validation Error Handling Hook
export function useValidationErrorHandling() {
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const setValidationError = useCallback((field: string, messages: string[]) => {
    setValidationErrors(prev => ({
      ...prev,
      [field]: messages,
    }));
  }, []);

  const clearValidationError = useCallback((field: string) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllValidationErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  const hasValidationErrors = Object.keys(validationErrors).length > 0;

  const getFieldValidationError = useCallback((field: string): string | null => {
    const errors = validationErrors[field];
    return errors && errors.length > 0 ? errors[0] : null;
  }, [validationErrors]);

  return {
    validationErrors,
    setValidationError,
    clearValidationError,
    clearAllValidationErrors,
    hasValidationErrors,
    getFieldValidationError,
  };
}
