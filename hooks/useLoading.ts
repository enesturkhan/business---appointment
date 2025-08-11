import { useState, useCallback } from 'react';

interface UseLoadingReturn {
  isLoading: boolean;
  loadingStates: Record<string, boolean>;
  setLoading: (key: string, loading: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
  withLoading: <T>(key: string, fn: () => Promise<T>) => Promise<T>;
}

export function useLoading(): UseLoadingReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading,
    }));
  }, []);

  const setGlobalLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const withLoading = useCallback(async <T>(key: string, fn: () => Promise<T>): Promise<T> => {
    setLoading(key, true);
    try {
      const result = await fn();
      return result;
    } finally {
      setLoading(key, false);
    }
  }, [setLoading]);

  return {
    isLoading,
    loadingStates,
    setLoading,
    setGlobalLoading,
    withLoading,
  };
}

// Specific loading hooks
export function useFormLoading() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const submitWithLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    setIsSubmitting(true);
    try {
      const result = await fn();
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const validateWithLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    setIsValidating(true);
    try {
      const result = await fn();
      return result;
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    isSubmitting,
    isValidating,
    submitWithLoading,
    validateWithLoading,
  };
}

export function usePageLoading() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);

  const setPageLoading = useCallback((loading: boolean) => {
    setIsPageLoading(loading);
  }, []);

  const setContentLoading = useCallback((loading: boolean) => {
    setIsContentLoading(loading);
  }, []);

  return {
    isPageLoading,
    isContentLoading,
    setPageLoading,
    setContentLoading,
  };
}
