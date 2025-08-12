# İş Randevu Sistemi - Frontend

Modern React ve Next.js ile geliştirilmiş iş randevu sistemi frontend uygulaması.

## 🚀 Özellikler

- **Modern Tech Stack**: React 18, Next.js 15, TypeScript
- **UI Framework**: Material-UI (MUI) v6
- **State Management**: Zustand
- **Responsive Design**: Mobile-first yaklaşım
- **Accessibility**: WCAG 2.1 uyumlu
- **Performance**: Lazy loading, virtualization, memoization
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier, Husky

## 🛠️ Kurulum

```bash
# Dependencies yükle
npm install

# Development server başlat
npm run dev

# Production build
npm run build

# Production server başlat
npm start
```

## 🧪 Testing

```bash
# Tüm testleri çalıştır
npm test

# Test coverage
npm run test:coverage

# Watch mode
npm run test:watch

# CI testing
npm run test:ci
```

## 🔍 Code Quality

```bash
# Linting
npm run lint

# Linting with auto-fix
npm run lint:fix

# Code formatting
npm run format

# Format check
npm run format:check
```

## 📁 Proje Yapısı

```
├── app/                    # Next.js app router
│   ├── admin/            # Admin sayfaları
│   ├── ui-demo/          # Demo sayfaları
│   └── ...
├── components/            # React bileşenleri
│   ├── ui/               # UI bileşenleri
│   └── ...
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores
├── utils/                 # Utility fonksiyonları
├── __tests__/            # Test dosyaları
└── ...
```

## 🎯 Test Coverage

- **Unit Tests**: Component ve hook testing
- **Integration Tests**: Store ve API testing
- **E2E Tests**: User journey testing
- **Coverage Target**: >70%

## 🔧 Development Tools

- **ESLint**: Code linting ve quality
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Lint-staged**: Pre-commit checks

## 📱 Responsive Design

- **Mobile**: 480px ve altı
- **Tablet**: 768px ve altı
- **Desktop**: 1024px ve üstü

## ♿ Accessibility

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Tab navigation
- **Focus Management**: Focus trap ve focus order
- **Color Contrast**: WCAG AA uyumlu

## ⚡ Performance

- **Code Splitting**: Dynamic imports
- **Lazy Loading**: Image ve component lazy loading
- **Virtualization**: Large list rendering
- **Memoization**: Expensive calculation caching
- **Bundle Optimization**: Webpack chunk splitting

## 🚀 Deployment

```bash
# Production build
npm run build

# Start production server
npm start

# Environment variables
NEXT_PUBLIC_API_URL=your_api_url
```

## 📊 Bundle Analysis

```bash
# Bundle analyzer (development only)
ANALYZE=true npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details
