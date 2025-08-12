# Component Documentation

Bu klasör, projedeki tüm React bileşenlerinin detaylı dokümantasyonunu içerir.

## 📁 Bileşen Kategorileri

### 🎨 UI Components (`components/ui/`)
Temel UI bileşenleri ve design system.

#### LoadingSpinner
- **Açıklama**: Yükleme durumlarını gösteren dönen spinner
- **Props**: `message`, `size`, `color`, `className`
- **Kullanım**: Form submit, API call, data loading
- **Accessibility**: ARIA label, role="progressbar"

#### ErrorBoundary
- **Açıklama**: React hata sınırı bileşeni
- **Props**: `fallback`, `onError`
- **Kullanım**: Sayfa seviyesi hata yakalama
- **Features**: Error logging, fallback UI

#### Accessibility Components
- **SkipToMainContent**: Ana içeriğe atlama linki
- **FocusTrap**: Modal focus yönetimi
- **LiveRegion**: Screen reader duyuruları
- **BackToTop**: Sayfa başına dönüş

### 🧭 Navigation Components
Navigasyon ve layout bileşenleri.

#### Navbar
- **Açıklama**: Ana navigasyon çubuğu
- **Features**: Responsive design, mobile menu, theme toggle
- **States**: Authenticated/Unauthenticated
- **Accessibility**: ARIA labels, keyboard navigation

#### ThemeToggle
- **Açıklama**: Tema değiştirme butonu
- **Features**: Light/Dark mode switching
- **State Management**: Zustand store integration

### 📊 Data Display Components
Veri gösterimi ve tablo bileşenleri.

#### DataTable
- **Açıklama**: Veri tablosu bileşeni
- **Features**: Sorting, filtering, pagination
- **Responsive**: Mobile-friendly column hiding
- **Accessibility**: ARIA roles, keyboard navigation

#### LoadingSkeleton
- **Açıklama**: Yükleme sırasında gösterilen iskelet
- **Variants**: Table, card, list skeletons
- **Animation**: Pulse effect

### 🎯 Form Components
Form ve input bileşenleri.

#### FormField
- **Açıklama**: Form alan wrapper bileşeni
- **Features**: Label, validation, error display
- **Accessibility**: ARIA attributes, error announcements

#### ValidationMessage
- **Açıklama**: Form validation mesajları
- **Types**: Error, warning, success
- **Accessibility**: Screen reader support

## 🔧 Props Interface

Her bileşen için TypeScript interface'leri:

```typescript
interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  color?: 'primary' | 'secondary' | 'inherit';
  className?: string;
}

interface ErrorBoundaryProps {
  fallback?: React.ComponentType<{ error: Error }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: React.ReactNode;
}
```

## 📱 Responsive Behavior

Bileşenlerin responsive davranışları:

- **Mobile (< 480px)**: Stacked layout, hidden elements
- **Tablet (< 768px)**: Adjusted spacing, modified navigation
- **Desktop (> 1024px)**: Full layout, all features visible

## ♿ Accessibility Features

Her bileşende bulunan accessibility özellikleri:

- **ARIA Labels**: Screen reader desteği
- **Keyboard Navigation**: Tab, Enter, Escape support
- **Focus Management**: Focus trap, focus order
- **Color Contrast**: WCAG AA uyumlu

## 🧪 Testing

Bileşen testleri:

- **Unit Tests**: Component rendering, props
- **Integration Tests**: User interactions, state changes
- **Accessibility Tests**: ARIA attributes, keyboard navigation
- **Visual Tests**: Responsive behavior, theme switching

## 📚 Usage Examples

### Basic Usage
```tsx
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function MyComponent() {
  return <LoadingSpinner message="Veriler yükleniyor..." />;
}
```

### With Custom Props
```tsx
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function MyComponent() {
  return (
    <LoadingSpinner
      message="Özel mesaj"
      size={40}
      color="secondary"
      className="custom-spinner"
    />
  );
}
```

### Error Handling
```tsx
import ErrorBoundary from '@/components/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## 🎨 Theme Integration

Bileşenler MUI theme sistemini kullanır:

- **Color Palette**: Primary, secondary, error, warning
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Consistent margin, padding values
- **Breakpoints**: Responsive design breakpoints

## 🔄 State Management

Bileşenler Zustand store'ları ile entegre:

- **useAuthStore**: Authentication state
- **useThemeStore**: Theme preferences
- **useNotificationStore**: User notifications

## 📖 Best Practices

1. **Props Validation**: TypeScript interface kullanımı
2. **Default Props**: Sensible default değerler
3. **Error Boundaries**: Hata yakalama ve fallback
4. **Loading States**: User feedback için loading indicators
5. **Accessibility**: ARIA labels ve keyboard support
6. **Responsive Design**: Mobile-first yaklaşım
7. **Performance**: Memoization ve lazy loading
8. **Testing**: Comprehensive test coverage

