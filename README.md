# ThermoTruck - Frontend Monorepo

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.5-purple.svg)](https://vitejs.dev/)
[![Turbo](https://img.shields.io/badge/Turbo-2.5.8-red.svg)](https://turbo.build/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)

A complete delivery management solution for temperature-sensitive packages with separate applications for mobile devices and desktop/web. Built with React, TypeScript and monorepo architecture.

## 📋 Table of Contents

- [Overview](#overview)
- [Applications](#applications)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Contributing](#contributing)

## 🎯 Overview

ThermoTruck is a complete frontend ecosystem for managing temperature-sensitive deliveries, consisting of:

- **📱 Mobile App** - PWA for drivers and recipients (iOS/Android optimized)
- **💻 Web App** - Desktop application for senders and administrators
- **🧱 UI Package** - Shared component library for consistent design

The system supports different user roles with role-based functionality and real-time updates.

## 📱💻 Applications

### Mobile App (`apps/mobile/`)

**Target Audience:** Drivers and package recipients  
**Optimized for:** Smartphones and tablets  
**Technology:** PWA (Progressive Web App)

#### Features:

- QR code scanning for package management
- GPS tracking and map visualization
- Temperature and humidity monitoring
- Offline functionality
- Push notifications
- Touch-optimized interface

### Web App (`apps/web/`)

**Target Audience:** Senders, administrators and office staff  
**Optimized for:** Desktop web browsers  
**Technology:** Responsive web application

#### Features:

- Create new shipments
- QR code generation for packages
- Dashboard for shipment overview
- Administration tools
- Reports and analytics
- Desktop-optimized workflow

## ✨ Features

### 🚚 For Drivers (Mobile)

- **Package Scanning** - QR code scanning for identification and delivery
- **GPS Tracking** - Automatic position updates
- **Temperature Monitoring** - Real-time data from sensors
- **Delivery Management** - Mark packages as delivered
- **Map Integration** - Leaflet-based navigation
- **Offline Support** - Works without internet connection

### 📦 For Recipients (Mobile)

- **Package Tracking** - Real-time tracking of deliveries
- **Temperature History** - Historical data and trends
- **Delivery Confirmation** - QR scanning to confirm receipt
- **Notifications** - Alerts about status and delivery
- **Map View** - See package current location

### 💼 For Senders (Web)

- **Shipment Management** - Create and manage new shipments
- **QR Code Generation** - Automatic generation of unique codes
- **Temperature Settings** - Define temperature and humidity thresholds
- **Recipient Information** - Manage delivery addresses and contacts
- **Tracking Overview** - Monitor active shipments

### 🏢 For Administrators (Web)

- **Dashboard** - Complete overview of all shipments
- **User Management** - Manage drivers, senders and recipients
- **Reports** - Detailed analytics and performance data
- **System Configuration** - Settings and parameters

## 🏗️ Architecture

### Monorepo Structure

```
frontend/
├── apps/
│   ├── mobile/          # 📱 PWA for drivers/recipients
│   │   ├── src/
│   │   │   ├── views/
│   │   │   │   ├── driver/      # Driver views
│   │   │   │   └── user/        # Recipient views
│   │   │   ├── components/      # Mobile components
│   │   │   ├── context/         # State management
│   │   │   ├── services/        # API services
│   │   │   └── hooks/          # Custom hooks
│   │   └── vite.config.ts      # PWA configuration
│   └── web/             # 💻 Web app for senders/admin
│       ├── src/
│       │   ├── views/          # Web views
│       │   ├── components/     # Web components
│       │   └── styles/         # Web-specific styles
│       └── vite.config.ts      # Web configuration
├── packages/
│   └── UI/              # 🧱 Shared component library
│       ├── src/
│       │   ├── components/     # Reusable components
│       │   ├── assets/         # Icons and resources
│       │   └── tests/          # Component tests
│       └── package.json        # UI package configuration
├── docker-compose.yml   # 🐳 Container orchestration
├── turbo.json          # 🔄 Monorepo build system
└── package.json        # 📦 Root configuration
```

### Tech Stack

#### Core Framework

- **React 19.1.1** - Component library with latest features
- **TypeScript 5.9.2** - Static type checking
- **Vite 7.1.5** - Fast build tool and dev server
- **React Router 7.9.3** - Client-side routing

#### Styling & Design

- **Styled Components 6.1.19** - CSS-in-JS with themes
- **@chas/ui** - Internal design system
- **React Icons 5.5.0** - Comprehensive icon library
- **Responsive Design** - Mobile-first approach

#### Mobile-specific Technology

- **PWA (Vite Plugin)** - Service workers and manifest
- **Leaflet 1.9.4** - Interactive maps
- **React Geolocated 4.4.0** - GPS handling
- **QR Library** - QR code generation and scanning

#### Web-specific Features

- **Responsive Grid** - Desktop-optimized layouts
- **Form Validation** - Advanced form validation
- **File Upload** - Document and image handling
- **Print Styles** - Optimized printing

#### Development & Build

- **Turbo 2.5.8** - Intelligent monorepo management
- **ESLint 9.35.0** - Code quality and standards
- **Prettier 3.6.2** - Consistent code formatting
- **Vitest 3.2.4** - Fast testing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Chas-Grupp-3/frontend.git
cd frontend
```

2. **Install all dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
# Mobile app
cp apps/mobile/.env.example apps/mobile/.env

# Web app
cp apps/web/.env.example apps/web/.env
```

4. **Start development servers**

```bash
# Start both apps simultaneously
npm run dev

# Or start specific app
npm run dev:mobile    # Starts on http://localhost:5173
npm run dev:web      # Starts on http://localhost:5174
```

### Docker Setup

```bash
# Build and start all containers
npm run docker:build
npm run docker:frontend

# Start specific app
npm run docker:mobile    # Mobile app on port 5173
npm run docker:web      # Web app on port 5174

# Detached mode (run in background)
npm run docker:mobile:detached
npm run docker:web:detached
```

## 💻 Development

### Development Commands

```bash
# Start development
npm run dev                 # Both apps
npm run dev:mobile         # Mobile app only
npm run dev:web           # Web app only

# Build for production
npm run build             # Build all apps
npm run type-check        # TypeScript validation

# Code quality
npm run lint              # Run linting on all apps
npm run lint:fix          # Fix automatic lint issues
npm run format:write      # Format all code
npm run check            # Complete quality check

# Testing
npm run test             # Run all tests in monorepo

# Docker commands
npm run docker:build     # Build all containers
npm run docker:logs     # Show logs from all services
npm run docker:clean    # Clean containers and volumes
```

### Project Structure

#### Mobile App Structure

```
apps/mobile/src/
├── components/          # Reusable UI components
│   ├── Cards/          # Package cards (SmallCard, LargeCard)
│   ├── Dashboard/      # Dashboard components
│   ├── Map/           # Map components (Leaflet)
│   ├── modals/        # Modal dialogs (QR, confirmations)
│   └── Profile/       # Profile components
├── context/           # React Context for state
│   ├── auth/         # Authentication and roles
│   ├── location/     # GPS and positioning
│   └── packages/     # Package data and cache
├── hooks/            # Custom React hooks
│   ├── useCamera.ts      # Camera access
│   ├── useQRScanner.ts   # QR scanning
│   └── useGeolocation.ts # GPS functionality
├── services/         # API communication
│   ├── authService.ts    # Login/logout
│   ├── packageService.ts # CRUD for packages
│   └── locationService.ts # GPS updates
├── views/           # Main pages
│   ├── driver/      # Driver-specific views
│   │   ├── DriverDashboard.tsx
│   │   ├── DriverPackageDetails.tsx
│   │   └── DriverMap.tsx
│   └── user/        # Recipient-specific views
│       ├── UserDashboard.tsx
│       └── UserPackageDetails.tsx
└── utils/           # Helper functions
```

#### Web App Structure

```
apps/web/src/
├── components/          # Web-specific components
│   ├── ShipmentForm.tsx    # Shipment form
│   ├── HamburgerMenu.tsx   # Navigation menu
│   └── LogoWeb.tsx        # Web-adapted logo
├── views/              # Web pages
│   └── WebShipment.tsx    # Main shipment page
├── styles/             # Web-specific styling
│   └── GlobalStylesWeb.ts
└── utils/              # Web-specific utilities
```

#### UI Package Structure

```
packages/UI/src/
├── components/         # Shared UI components
│   ├── Button.tsx     # Button component
│   ├── Icon.tsx       # Icon system
│   ├── Modal.tsx      # Modal dialogs
│   ├── TextInput.tsx  # Input fields
│   ├── Text/         # Text components
│   └── Toggle/       # Toggle switches
├── assets/           # Static resources
│   └── icons/        # SVG icons (100+ icons)
├── tests/           # Component tests
│   ├── Button.test.tsx
│   ├── Icon.test.tsx
│   └── Modal.test.tsx
└── types/           # TypeScript definitions
```

## 🚢 Deployment

### Development Environment

```bash
# Local development with hot reload
npm run dev

# Preview production build
npm run build && npm run preview
```

### Staging/Production

#### Docker Deployment

```bash
# Production build
docker-compose -f docker-compose.prod.yml up --build -d

# Scaling for high traffic
docker-compose up --scale mobile=3 --scale web=2

# Health checks
docker-compose ps
docker-compose logs -f
```

#### Separate Deployments

```bash
# Deploy mobile app only
npm run build:mobile
npm run docker:mobile:detached

# Deploy web app only
npm run build:web
npm run docker:web:detached
```

### Environment Configuration

#### Mobile App (.env)

```bash
VITE_API_URL=https://api.thermotruck.com
VITE_MAP_API_KEY=your_leaflet_key
VITE_GEOLOCATION_TIMEOUT=10000
VITE_QR_SCANNER_TIMEOUT=30000
VITE_OFFLINE_CACHE_TTL=3600000
```

#### Web App (.env)

```bash
VITE_API_URL=https://api.thermotruck.com
VITE_ADMIN_EMAIL=admin@thermotruck.com
VITE_UPLOAD_MAX_SIZE=10485760
VITE_SHIPMENT_API_ENDPOINT=/shipments
```

## 🧪 Testing

### Test Strategy

#### Unit Tests

```bash
# UI components (packages/UI)
npm run test Button.test.tsx
npm run test Icon.test.tsx
npm run test Modal.test.tsx

# Mobile app components
npm run test --filter=mobile

# Web app components
npm run test --filter=web
```

#### Integration Tests

```bash
# API integration tests
npm run test -- --grep "API"

# Context and state tests
npm run test -- --grep "Context"

# Router tests
npm run test -- --grep "Routes"
```

#### E2E Tests

```bash
# Complete user flows
npm run test:e2e

# Specific app flows
npm run test:e2e:mobile
npm run test:e2e:web
```

### Test Coverage

```bash
# Complete coverage report
npm run test -- --coverage

# App-specific coverage
npm run test --filter=mobile -- --coverage
npm run test --filter=web -- --coverage
```

## 🔧 Environment Variables

### Shared Variables

```bash
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=5000
VITE_API_RETRY_ATTEMPTS=3

# Authentication
VITE_JWT_EXPIRES=3600000
VITE_REFRESH_TOKEN_ENDPOINT=/auth/refresh
```

### Mobile-specific

```bash
# PWA Configuration
VITE_PWA_NAME="ThermoTruck Mobile"
VITE_PWA_SHORT_NAME="ThermoTruck"
VITE_PWA_THEME_COLOR="#1F4F82"

# Geolocation
VITE_GPS_HIGH_ACCURACY=true
VITE_GPS_UPDATE_INTERVAL=30000

# Camera & QR
VITE_CAMERA_RESOLUTION_WIDTH=1280
VITE_CAMERA_RESOLUTION_HEIGHT=720
VITE_QR_SCAN_INTERVAL=500
```

### Web-specific

```bash
# File Upload
VITE_UPLOAD_ENDPOINT=/api/upload
VITE_ALLOWED_FILE_TYPES=".pdf,.jpg,.png"
VITE_MAX_FILE_SIZE=5242880

# Print Configuration
VITE_PRINT_HEADER_LOGO=true
VITE_PRINT_PAGE_MARGINS="20mm"
```

## 🔗 API Integration

### Authentication

```typescript
// Login (all apps)
POST /login/login
{
  "email": "user@example.com",
  "password": "password"
}

// Response
{
  "id": "user-id",
  "token": "jwt-token",
  "role": "driver|user|admin",
  "message": "Login successful"
}
```

### Mobile API Endpoints

```typescript
// Package management
GET /packages/:userId           // Get user's packages
GET /packages/single/:packageId // Get specific package
PUT /packages/:packageId/delivered // Mark as delivered

// GPS tracking
PUT /user/location/:driverId    // Update driver position
{
  "latitude": "59.3293",
  "longitude": "18.0686"
}

// QR scanning
POST /packages/scan            // Validate QR code
{
  "qrCode": "package-12345",
  "action": "deliver|pickup|verify"
}
```

### Web API Endpoints

```typescript
// Shipment management
POST /shipments               // Create new shipment
{
  "sender": {
    "name": "John Doe",
    "company": "ACME Corp",
    "email": "john@acme.com"
  },
  "recipient": {
    "name": "Jane Smith",
    "address": "123 Main St, Stockholm"
  },
  "thresholds": {
    "minTemp": 2,
    "maxTemp": 8,
    "minHumidity": 30,
    "maxHumidity": 70
  },
  "metadata": {
    "weight": "2.5",
    "departureDate": "2024-11-05T10:00:00Z"
  }
}

// QR code generation
POST /qr/generate            // Generate QR for package
{
  "packageId": "pkg-12345",
  "format": "svg|png",
  "size": 256
}

// Dashboard data
GET /dashboard/stats         // Get statistics
GET /dashboard/shipments     // Get all shipments
GET /dashboard/users        // User overview (admin)
```

## 🎨 UI Component Library (@chas/ui)

### Available Components

```typescript
import {
  Button,
  Icon,
  Text,
  Modal,
  TextInput,
  Toggle,
  colors,
  radius
} from '@chas/ui';

// Button with variants
<Button variant="primary" size="lg" disabled={false}>
  Click here
</Button>

// Icon system (100+ icons)
<Icon name="package" size="md" alt="Package icon" />
<Icon name="temperatureWarning" size="lg" />
<Icon name="qrScan" size="sm" />

// Typography system
<Text variant="h1" color="primary">Main heading</Text>
<Text variant="body-lg" color="secondary">Body text</Text>
<Text variant="caption" color="muted">Caption</Text>

// Modal system
<Modal isOpen={isOpen} onClose={onClose} size="lg">
  <Text variant="h2">Modal title</Text>
  <Text>Modal content...</Text>
</Modal>

// Form components
<TextInput
  label="Username"
  type="text"
  required
  errorMessage="Field is required"
/>

<Toggle
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable feature"
/>
```

### Design System

#### Color Palette

```typescript
const colors = {
  // Primary colors
  primary: "#1F4F82", // Dark blue
  secondary: "#9DC1DA", // Light blue
  accent: "#FFA712", // Orange
  background: "#E0F2FE", // Light background

  // Status colors
  critical: "#B62D2D", // Red (critical temperature)
  minor: "#F59E0B", // Yellow (warning)
  ok: "#2CEB72", // Green (OK status)
  pause: "#D1D5DB", // Gray (delivered/paused)

  // Special colors
  blueBackground: "#0284C7", // Dashboard background
  blueLines: "#075985", // Lines and borders
  cardText: "#111827", // Text on cards
  whiteBackground: "#FFFFFF", // White background
};
```

#### Typography

```typescript
const textVariants = {
  h1: { fontSize: "2rem", fontWeight: "bold" },
  h2: { fontSize: "1.5rem", fontWeight: "bold" },
  h3: { fontSize: "1.25rem", fontWeight: "bold" },
  "body-lg": { fontSize: "1.125rem", fontWeight: "normal" },
  body: { fontSize: "1rem", fontWeight: "normal" },
  "body-sm": { fontSize: "0.875rem", fontWeight: "normal" },
  "body-smBold": { fontSize: "0.875rem", fontWeight: "bold" },
  caption: { fontSize: "0.75rem", fontWeight: "normal" },
  button: { fontSize: "1rem", fontWeight: "600" },
};
```

#### Icons

```typescript
// Package and delivery
(package, whitePackage, whitePackageHover);
(delivery, truckPin, truckLeft, truckRight);

// Temperature and environment
(smallTemp, bigTemp, whiteTemp, tempWarning);
(smallTempHot, solidWhiteTemp, whiteTempHover);
(humidity, snowflake);

// Navigation and UI
(qrScan, qrScanHover, whiteQr);
(hamburger, whiteHamburger, whiteHamburgerHover);
(map, mapHover, whiteMap);
(home, cross, crossHover);

// Status indicators
(greenCheck, yellowWarning, whiteWarning);
(redPin, yellowPin, greenPin, bluePin);
(clock, whiteClock, blueClock);

// Social media
(facebook, twitter, instagram, mail);
```

## 📱 PWA Features (Mobile)

### Service Worker

```javascript
// Caching strategies
- Static files: Cache First
- API calls: Network First with fallback
- Images: Stale While Revalidate
- GPS data: Network Only
```

### Offline Functionality

```typescript
// Offline capabilities
- Show cached package data
- Cache scanning history
- GPS positions saved locally
- Sync when online
```

### App Manifest

```json
{
  "name": "ThermoTruck Mobile",
  "short_name": "ThermoTruck",
  "description": "Temperature-controlled delivery tracking",
  "theme_color": "#1F4F82",
  "background_color": "#E0F2FE",
  "display": "standalone",
  "orientation": "portrait",
  "categories": ["logistics", "business"],
  "screenshots": [
    {
      "src": "/screenshots/mobile-dashboard.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

## 🌐 Responsive Design

### Mobile App (Mobile-First)

```css
/* Smartphones (default) */
@media (max-width: 767px) {
  /* Touch-optimized UI */
  /* Large buttons (min 44px) */
  /* Simple navigation structures */
}

/* Tablets */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Hybrid layout */
  /* Higher information density */
}
```

### Web App (Desktop-First)

```css
/* Desktop (default) */
@media (min-width: 1024px) {
  /* Multi-column layouts */
  /* Complex forms */
  /* Hover effects */
}

/* Tablets */
@media (max-width: 1023px) {
  /* Adaptive columns */
  /* Touch-adapted controls */
}

/* Mobile (graceful degradation) */
@media (max-width: 767px) {
  /* Stacked layouts */
  /* Simplified menus */
}
```

## 🔒 Security

### Authentication & Authorization

```typescript
// JWT-based auth with roles
interface AuthState {
  token: string;
  userId: string;
  role: 'driver' | 'user' | 'admin' | 'sender';
  permissions: string[];
}

// Role-based routing
<RequireAuth role="driver">
  <DriverDashboard />
</RequireAuth>

<RequireAuth role="admin">
  <AdminPanel />
</RequireAuth>
```

### Data Protection

```typescript
// Sensitive data handled securely
- JWT tokens: HttpOnly cookies (web) / Secure storage (mobile)
- GPS data: Encrypted transmission
- Package data: Anonymized in logs
- GDPR compliance: Data retention policies
```

### API Security

```typescript
// Secure API calls
- CORS configuration per environment
- Rate limiting per endpoint
- Input validation on all forms
- SQL injection protection
- XSS prevention via CSP headers
```

## 📊 Performance & Optimization

### Bundle Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze

# Code splitting per route
- Mobile: /driver, /user routes
- Web: /shipment, /admin routes
- UI: Tree-shaking for icons
```

### Caching Strategies

```typescript
// Service Worker (Mobile)
- Static assets: 1 year
- API responses: 5 minutes
- GPS data: No cache
- QR codes: Session-based

// Browser Cache (Web)
- Components: Long-term cache
- API data: Short-term cache
- Form data: Session storage
```

### Performance Metrics

```bash
# Lighthouse audits
npm run audit

# Bundle size monitoring
npm run size-check

# Performance testing
npm run perf:mobile
npm run perf:web
```

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** feature branch
   ```bash
   git checkout -b feature/mobile-new-feature
   # or
   git checkout -b feature/web-new-feature
   ```
3. **Develop** and test
   ```bash
   npm run dev:mobile  # for mobile features
   npm run dev:web     # for web features
   npm run test        # run all tests
   ```
4. **Commit** with conventional messages
   ```bash
   git commit -m "feat(mobile): add QR scanner improvements"
   git commit -m "feat(web): add shipment bulk operations"
   git commit -m "fix(ui): resolve button accessibility issue"
   ```
5. **Push** and create PR
   ```bash
   git push origin feature/your-feature
   ```

### Coding Guidelines

#### Mobile App

```typescript
// Use hooks for state management
const [packages, setPackages] = useState<Package[]>([]);

// PWA optimization
if ("serviceWorker" in navigator) {
  // Register service worker
}

// Touch-first design
const handleTouch = (e: TouchEvent) => {
  // Touch-specific logic
};
```

#### Web App

```typescript
// Desktop-optimized components
const handleKeyboard = (e: KeyboardEvent) => {
  // Keyboard shortcuts
};

// Form validation
const validateShipment = (data: ShipmentData) => {
  // Complex validation
};

// Print optimization
@media print {
  /* Print-specific styles */
}
```

#### UI Package

```typescript
// Component documentation
/**
 * Button component with variants and sizes
 * @param variant - primary | secondary | ghost
 * @param size - sm | md | lg
 * @param disabled - boolean
 */
export const Button = ({ variant, size, disabled, ...props }) => {
  // Implementation
};
```

## 📝 Changelog

### v3.0.0 (2024-11-04) - Web App Integration

- ✨ **NEW:** Web application for senders
- 📝 **NEW:** Shipment form with QR generation
- 🍔 **NEW:** Hamburger menu for web navigation
- 📱 **IMPROVEMENT:** Mobile PWA optimizations
- 🧪 **IMPROVEMENT:** Extended test coverage for both apps

### v2.5.0 (2024-10-28) - WCAG Compliance

- ♿ **ACCESSIBILITY:** Full WCAG 2.1 AA compliance
- 🔊 **NEW:** Screen reader support for all components
- ⌨️ **NEW:** Keyboard navigation for mobile and web
- 🎨 **IMPROVEMENT:** Improved color contrast

### v2.0.0 (2024-10-15) - Mobile PWA Launch

- 📱 **NEW:** PWA with offline support
- 🗺️ **NEW:** Leaflet map integration
- 📍 **NEW:** GPS tracking for drivers
- 🌡️ **NEW:** Temperature and humidity monitoring
- 🧱 **NEW:** UI component library (@chas/ui)

## 📞 Support & Documentation

### Documentation

- **📚 Complete Guide:** [GitHub Wiki](https://github.com/Chas-Grupp-3/frontend/wiki)
- **🎯 Mobile App Guide:** [Mobile Documentation](https://github.com/Chas-Grupp-3/frontend/wiki/Mobile-App)
- **💻 Web App Guide:** [Web Documentation](https://github.com/Chas-Grupp-3/frontend/wiki/Web-App)
- **🧱 UI Components:** [Storybook](https://thermotruck-ui.netlify.app)

### Support

- **🐛 Bug Reports:** [GitHub Issues](https://github.com/Chas-Grupp-3/frontend/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/Chas-Grupp-3/frontend/discussions)
- **📧 Direct Contact:** [frontend@thermotruck.com](mailto:frontend@thermotruck.com)

### Community

- **🚀 Feature Requests:** Use GitHub Issues with `enhancement` label
- **❓ Questions:** GitHub Discussions for development questions
- **📱 Mobile Issues:** Use `mobile` label
- **💻 Web Issues:** Use `web` label
- **🧱 UI Issues:** Use `ui-package` label

## 📄 License

This project is licensed under [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 Chas Group 3

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🚀 Get Started Today!

```bash
# Clone and start development
git clone https://github.com/Chas-Grupp-3/frontend.git
cd frontend
npm install
npm run dev

# Open in browser
# Mobile: http://localhost:5173
# Web: http://localhost:5174
```

**ThermoTruck Frontend Monorepo** - Complete delivery management for temperature-sensitive goods with modern web technologies.

_Developed with ❤️ by Chas Group 3_

[![Mobile App](https://img.shields.io/badge/📱-Mobile_PWA-blue)](http://localhost:5173)
[![Web App](https://img.shields.io/badge/💻-Web_Application-green)](http://localhost:5174)
[![UI Library](https://img.shields.io/badge/🧱-Component_Library-purple)](https://www.npmjs.com/package/@chas/ui)
