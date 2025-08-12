import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useResponsive() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('xl'));

  const isMobileOnly = useMediaQuery(theme.breakpoints.only('xs'));
  const isTabletOnly = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktopOnly = useMediaQuery(theme.breakpoints.only('lg'));

  const isUp = {
    sm: useMediaQuery(theme.breakpoints.up('sm')),
    md: useMediaQuery(theme.breakpoints.up('md')),
    lg: useMediaQuery(theme.breakpoints.up('lg')),
    xl: useMediaQuery(theme.breakpoints.up('xl')),
  };

  const isDown = {
    xs: useMediaQuery(theme.breakpoints.down('sm')),
    sm: useMediaQuery(theme.breakpoints.down('md')),
    md: useMediaQuery(theme.breakpoints.down('lg')),
    lg: useMediaQuery(theme.breakpoints.down('xl')),
  };

  const isBetween = {
    smMd: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    mdLg: useMediaQuery(theme.breakpoints.between('md', 'lg')),
    lgXl: useMediaQuery(theme.breakpoints.between('lg', 'xl')),
  };

  const getResponsiveValue = <T>(
    mobile: T,
    tablet: T,
    desktop: T,
    largeDesktop?: T
  ): T => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    if (isLargeDesktop && largeDesktop !== undefined) return largeDesktop;
    return desktop;
  };

  const getResponsiveSpacing = (
    mobile: number,
    tablet: number,
    desktop: number,
    largeDesktop?: number
  ): number => {
    return getResponsiveValue(mobile, tablet, desktop, largeDesktop);
  };

  const getResponsiveFontSize = (
    mobile: string,
    tablet: string,
    desktop: string,
    largeDesktop?: string
  ): string => {
    return getResponsiveValue(mobile, tablet, desktop, largeDesktop);
  };

  const getResponsiveWidth = (
    mobile: string | number,
    tablet: string | number,
    desktop: string | number,
    largeDesktop?: string | number
  ): string | number => {
    return getResponsiveValue(mobile, tablet, desktop, largeDesktop);
  };

  const getResponsiveDisplay = (
    mobile: 'none' | 'block' | 'flex' | 'grid' | 'table-cell',
    tablet: 'none' | 'block' | 'flex' | 'grid' | 'table-cell',
    desktop: 'none' | 'block' | 'flex' | 'grid' | 'table-cell',
    largeDesktop?: 'none' | 'block' | 'flex' | 'grid' | 'table-cell'
  ): 'none' | 'block' | 'flex' | 'grid' | 'table-cell' => {
    return getResponsiveValue(mobile, tablet, desktop, largeDesktop);
  };

  return {
    // Basic breakpoint checks
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    
    // Specific breakpoint checks
    isMobileOnly,
    isTabletOnly,
    isDesktopOnly,
    
    // Up/Down checks
    isUp,
    isDown,
    
    // Between checks
    isBetween,
    
    // Utility functions
    getResponsiveValue,
    getResponsiveSpacing,
    getResponsiveFontSize,
    getResponsiveWidth,
    getResponsiveDisplay,
    
    // Common responsive patterns
    responsiveSpacing: (mobile: number, tablet: number, desktop: number) => ({
      xs: mobile,
      sm: tablet,
      md: desktop,
    }),
    
    responsiveWidth: (mobile: string | number, tablet: string | number, desktop: string | number) => ({
      xs: mobile,
      sm: tablet,
      md: desktop,
    }),
    
    responsiveDisplay: (mobile: string, tablet: string, desktop: string) => ({
      xs: mobile,
      sm: tablet,
      md: desktop,
    }),
    
    responsiveDirection: (mobile: 'row' | 'column', tablet: 'row' | 'column', desktop: 'row' | 'column') => ({
      xs: mobile,
      sm: tablet,
      md: desktop,
    }),
  };
}

// Hook for responsive grid props
export function useResponsiveGrid() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getGridProps = (
    mobile: number,
    tablet: number,
    desktop: number,
    largeDesktop?: number
  ) => {
    const lg = largeDesktop || desktop;
    
    return {
      xs: mobile,
      sm: tablet,
      md: desktop,
      lg,
    };
  };

  const getContainerProps = () => ({
    maxWidth: isMobile ? 'xs' : isTablet ? 'md' : 'lg',
    sx: {
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3, md: 4 },
    },
  });

  const getCardProps = () => ({
    sx: {
      p: { xs: 2, sm: 3 },
      m: { xs: 1, sm: 2 },
    },
  });

  return {
    getGridProps,
    getContainerProps,
    getCardProps,
  };
}

// Hook for responsive table
export function useResponsiveTable() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getTableColumnVisibility = (column: string) => {
    const visibilityMap: Record<string, any> = {
      avatar: { xs: 'none', md: 'table-cell' },
      name: { xs: 'table-cell', md: 'table-cell' },
      email: { xs: 'none', sm: 'table-cell' },
      phone: { xs: 'none', lg: 'table-cell' },
      role: { xs: 'none', md: 'table-cell' },
      status: { xs: 'none', sm: 'table-cell' },
      date: { xs: 'none', lg: 'table-cell' },
      actions: { xs: 'table-cell', sm: 'table-cell' },
    };

    return visibilityMap[column] || { xs: 'table-cell' };
  };

  const getTableColumnWidth = (column: string) => {
    const widthMap: Record<string, any> = {
      avatar: { minWidth: { md: 120 } },
      name: { minWidth: { xs: 80, md: 120 } },
      email: { minWidth: { sm: 150 } },
      phone: { minWidth: { lg: 120 } },
      role: { minWidth: { md: 100 } },
      status: { minWidth: { sm: 100 } },
      date: { minWidth: { lg: 120 } },
      actions: { minWidth: { xs: 60, sm: 80 } },
    };

    return widthMap[column] || {};
  };

  return {
    getTableColumnVisibility,
    getTableColumnWidth,
    isMobile,
    isTablet,
    isDesktop,
  };
}
