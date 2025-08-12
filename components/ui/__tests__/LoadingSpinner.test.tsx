import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Yükleniyor');
  });

  it('renders with custom message', () => {
    const customMessage = 'Özel yükleme mesajı';
    render(<LoadingSpinner message={customMessage} />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toHaveAttribute('aria-label', customMessage);
  });

  it('renders with custom size', () => {
    render(<LoadingSpinner size={40} />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    render(<LoadingSpinner color="secondary" />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-spinner-class';
    render(<LoadingSpinner className={customClass} />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toHaveClass(customClass);
  });

  it('has correct accessibility attributes', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toHaveAttribute('aria-label', 'Yükleniyor');
    expect(spinner).toHaveAttribute('role', 'progressbar');
  });
});
