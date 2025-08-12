import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// Hook for measuring component render performance
export function useRenderPerformance(componentName: string) {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered ${renderCount.current} times in ${renderTime.toFixed(2)}ms`);
    }
    
    startTime.current = endTime;
  });

  return {
    renderCount: renderCount.current,
    resetRenderCount: () => {
      renderCount.current = 0;
    },
  };
}

// Hook for debouncing values
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for throttling function calls
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef(0);
  const lastCallTimer = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      } else {
        if (lastCallTimer.current) {
          clearTimeout(lastCallTimer.current);
        }

        lastCallTimer.current = setTimeout(() => {
          lastCall.current = Date.now();
          callback(...args);
        }, delay - (now - lastCall.current));
      }
    },
    [callback, delay]
  ) as T;
}

// Hook for memoizing expensive calculations
export function useMemoizedValue<T>(
  factory: () => T,
  dependencies: any[],
  equalityFn?: (prev: T, next: T) => boolean
): T {
  const previousValue = useRef<T>();
  const previousDeps = useRef<any[]>();

  const isEqual = useMemo(() => {
    if (!previousDeps.current || dependencies.length !== previousDeps.current.length) {
      return false;
    }

    if (equalityFn && previousValue.current !== undefined) {
      return equalityFn(previousValue.current, factory());
    }

    return dependencies.every((dep, index) => dep === previousDeps.current![index]);
  }, dependencies);

  if (!isEqual) {
    previousValue.current = factory();
    previousDeps.current = dependencies;
  }

  return previousValue.current!;
}

// Hook for lazy loading data
export function useLazyData<T>(
  fetchFn: () => Promise<T[]>,
  pageSize: number = 20,
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await fetchFn();
      if (newData.length < pageSize) {
        setHasMore(false);
      }
      setData(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, loading, hasMore, pageSize]);

  const refresh = useCallback(async () => {
    setData([]);
    setPage(1);
    setHasMore(true);
    await loadMore();
  }, [loadMore]);

  return {
    data,
    loading,
    hasMore,
    loadMore,
    refresh,
    page,
  };
}

// Hook for measuring network performance
export function useNetworkPerformance() {
  const [metrics, setMetrics] = useState({
    connection: null as any,
    downlink: 0,
    effectiveType: '',
    rtt: 0,
  });

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setMetrics({
        connection,
        downlink: connection.downlink || 0,
        effectiveType: connection.effectiveType || '',
        rtt: connection.rtt || 0,
      });

      const updateMetrics = () => {
        setMetrics({
          connection,
          downlink: connection.downlink || 0,
          effectiveType: connection.effectiveType || '',
          rtt: connection.rtt || 0,
        });
      };

      connection.addEventListener('change', updateMetrics);
      return () => connection.removeEventListener('change', updateMetrics);
    }
  }, []);

  return metrics;
}

// Hook for measuring scroll performance
export function useScrollPerformance() {
  const [scrollMetrics, setScrollMetrics] = useState({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
  });

  const handleScroll = useCallback((event: Event) => {
    const target = event.target as Element;
    setScrollMetrics({
      scrollTop: target.scrollTop,
      scrollLeft: target.scrollLeft,
      scrollHeight: target.scrollHeight,
      scrollWidth: target.scrollWidth,
      clientHeight: target.clientHeight,
      clientWidth: target.clientWidth,
    });
  }, []);

  const addScrollListener = useCallback((element: Element) => {
    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => element.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    scrollMetrics,
    addScrollListener,
  };
}

// Hook for measuring memory usage
export function useMemoryUsage() {
  const [memoryInfo, setMemoryInfo] = useState({
    usedJSHeapSize: 0,
    totalJSHeapSize: 0,
    jsHeapSizeLimit: 0,
  });

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMemoryInfo({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        });
      }
    };

    const interval = setInterval(updateMemoryInfo, 5000);
    updateMemoryInfo();

    return () => clearInterval(interval);
  }, []);

  const getMemoryUsagePercentage = useMemo(() => {
    if (memoryInfo.jsHeapSizeLimit === 0) return 0;
    return (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100;
  }, [memoryInfo]);

  return {
    memoryInfo,
    getMemoryUsagePercentage,
  };
}

// Hook for optimizing list rendering
export function useVirtualization<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );

    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex,
    };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex);
  }, [items, visibleRange.startIndex, visibleRange.endIndex]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    visibleRange,
    totalHeight,
    offsetY,
    handleScroll,
  };
}

// Hook for measuring component mount/unmount performance
export function useLifecyclePerformance(componentName: string) {
  const mountTime = useRef<number>();
  const unmountTime = useRef<number>();

  useEffect(() => {
    mountTime.current = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} mounted at ${mountTime.current}`);
    }

    return () => {
      unmountTime.current = performance.now();
      const lifetime = unmountTime.current - (mountTime.current || 0);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} unmounted after ${lifetime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);

  return {
    mountTime: mountTime.current,
    unmountTime: unmountTime.current,
  };
}

// Hook for optimizing expensive operations
export function useExpensiveOperation<T>(
  operation: () => T,
  dependencies: any[],
  shouldRun: boolean = true
) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    if (!shouldRun) return;

    setLoading(true);
    setError(null);
    
    try {
      const operationResult = await Promise.resolve(operation());
      setResult(operationResult);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [operation, shouldRun]);

  useEffect(() => {
    execute();
  }, dependencies);

  return {
    result,
    loading,
    error,
    execute,
  };
}
