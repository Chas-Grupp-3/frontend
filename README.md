# ThermoTruck - Frontend Monorepo

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.5-purple.svg)](https://vitejs.dev/)
[![Turbo](https://img.shields.io/badge/Turbo-2.5.8-red.svg)](https://turbo.build/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)

En komplett leveranshanteringslösning för temperaturkänsliga paket med separata applikationer för mobila enheter och desktop/webb. Byggd med React, TypeScript och monorepo-arkitektur.

## 📋 Innehållsförteckning

- [Översikt](#översikt)
- [Applikationer](#applikationer)
- [Funktioner](#funktioner)
- [Arkitektur](#arkitektur)
- [Kom igång](#kom-igång)
- [Utveckling](#utveckling)
- [Deployment](#deployment)
- [Testing](#testing)
- [Miljövariabler](#miljövariabler)
- [API Integration](#api-integration)
- [Bidra](#bidra)

## 🎯 Översikt

ThermoTruck är ett komplett frontend-ekosystem för hantering av temperaturkänsliga leveranser, bestående av:

- **📱 Mobile App** - PWA för förare och mottagare (iOS/Android-optimerad)  
- **💻 Web App** - Desktop-applikation för avsändare och administratörer
- **🧱 UI Package** - Delat komponentbibliotek för konsistent design

Systemet stöder olika användarroller med rollbaserad funktionalitet och realtidsuppdateringar.

## 📱💻 Applikationer

### Mobile App (`apps/mobile/`)
**Målgrupp:** Förare och paketmottagare  
**Optimerad för:** Smartphones och tablets  
**Teknologi:** PWA (Progressive Web App)

#### Funktioner:
- QR-kodscanning för pakethantering
- GPS-spårning och kartvisning
- Temperatur- och luftfuktighetsövervakning
- Offline-funktionalitet
- Push-notifikationer
- Touch-optimerat gränssnitt

### Web App (`apps/web/`)
**Målgrupp:** Avsändare, administratörer och kontorspersonal  
**Optimerad för:** Desktop-webbläsare  
**Teknologi:** Responsiv webbapplikation

#### Funktioner:
- Skapa nya försändelser
- QR-kodgenerering för paket
- Dashboard för försändelsesöversikt
- Administrationsverktyg
- Rapporter och analytics
- Desktop-optimerad workflow

## ✨ Funktioner

### 🚚 För Förare (Mobile)
- **Paketscanning** - QR-kodscanning för identifiering och leverans
- **GPS-spårning** - Automatisk positionsuppdatering
- **Temperaturövervakning** - Realtidsdata från sensorer
- **Leveranshantering** - Markera paket som levererade
- **Kartintegration** - Leaflet-baserad navigation
- **Offline-stöd** - Fungerar utan internetanslutning

### 📦 För Mottagare (Mobile)
- **Paketspårning** - Realtidsspårning av leveranser
- **Temperaturhistorik** - Historisk data och trender
- **Leveransbekräftelse** - QR-scanning för att bekräfta mottagning
- **Notifikationer** - Aviseringar om status och leverans
- **Kartvy** - Se pakets aktuella position

### 💼 För Avsändare (Web)
- **Försändelsehantering** - Skapa och hantera nya försändelser
- **QR-kodgenerering** - Automatisk generering av unika koder
- **Temperaturinställningar** - Definiera temperatur- och luftfuktighetsgränser
- **Mottagarinformation** - Hantera leveransadresser och kontakter
- **Spårningsöversikt** - Övervaka aktiva försändelser

### 🏢 För Administratörer (Web)
- **Dashboard** - Komplett översikt över alla försändelser
- **Användarhantering** - Hantera förare, avsändare och mottagare
- **Rapporter** - Detaljerade analytics och prestationsdata
- **Systemkonfiguration** - Inställningar och parametrar

## 🏗️ Arkitektur

### Monorepo Struktur
```
frontend/
├── apps/
│   ├── mobile/          # 📱 PWA för förare/mottagare
│   │   ├── src/
│   │   │   ├── views/
│   │   │   │   ├── driver/      # Förare-vyer
│   │   │   │   └── user/        # Mottagare-vyer
│   │   │   ├── components/      # Mobil-komponenter
│   │   │   ├── context/         # State management
│   │   │   ├── services/        # API-tjänster
│   │   │   └── hooks/          # Custom hooks
│   │   └── vite.config.ts      # PWA-konfiguration
│   └── web/             # 💻 Webbapp för avsändare/admin
│       ├── src/
│       │   ├── views/          # Webb-vyer
│       │   ├── components/     # Webb-komponenter
│       │   └── styles/         # Webb-specifika stilar
│       └── vite.config.ts      # Webb-konfiguration
├── packages/
│   └── UI/              # 🧱 Delat komponentbibliotek
│       ├── src/
│       │   ├── components/     # Återanvändbara komponenter
│       │   ├── assets/         # Ikoner och resurser
│       │   └── tests/          # Komponenttester
│       └── package.json        # UI-paket konfiguration
├── docker-compose.yml   # 🐳 Container-orchestrering
├── turbo.json          # 🔄 Monorepo build-system
└── package.json        # 📦 Root-konfiguration
```

### Teknisk Stack

#### Kärn Framework
- **React 19.1.1** - Komponentbibliotek med senaste funktioner
- **TypeScript 5.9.2** - Statisk typkontroll
- **Vite 7.1.5** - Snabb build-verktyg och dev-server
- **React Router 7.9.3** - Clientside routing

#### Styling & Design
- **Styled Components 6.1.19** - CSS-in-JS med teman
- **@chas/ui** - Internt designsystem
- **React Icons 5.5.0** - Omfattande ikonbibliotek
- **Responsive Design** - Mobile-first approach

#### Mobil-specifik Teknologi
- **PWA (Vite Plugin)** - Service workers och manifest
- **Leaflet 1.9.4** - Interaktiva kartor
- **React Geolocated 4.4.0** - GPS-hantering
- **QR Library** - QR-kodgenerering och scanning

#### Webb-specifik Funktioner
- **Responsive Grid** - Desktop-optimerade layouts  
- **Form Validation** - Avancerad validering för formulär
- **File Upload** - Hantering av dokument och bilder
- **Print Styles** - Optimerad utskrift

#### Development & Build
- **Turbo 2.5.8** - Intelligent monorepo-hantering
- **ESLint 9.35.0** - Kodkvalitet och standards
- **Prettier 3.6.2** - Konsistent kodformatering
- **Vitest 3.2.4** - Snabb testning

## 🚀 Kom igång

### Förkunskaper
- Node.js (v18 eller senare)
- npm (v8 eller senare)
- Git

### Installation

1. **Klona repositoriet**
```bash
git clone https://github.com/Chas-Grupp-3/frontend.git
cd frontend
```

2. **Installera alla beroenden**
```bash
npm install
```

3. **Konfigurera miljövariabler**
```bash
# Mobile app
cp apps/mobile/.env.example apps/mobile/.env

# Web app  
cp apps/web/.env.example apps/web/.env
```

4. **Starta utvecklingsservrar**

```bash
# Starta båda apparna samtidigt
npm run dev

# Eller starta specifik app
npm run dev:mobile    # Startar på http://localhost:5173
npm run dev:web      # Startar på http://localhost:5174
```

### Docker Setup

```bash
# Bygg och starta alla containers
npm run docker:build
npm run docker:frontend

# Starta specifik app
npm run docker:mobile    # Mobile app på port 5173
npm run docker:web      # Web app på port 5174

# Detached mode (kör i bakgrunden)
npm run docker:mobile:detached
npm run docker:web:detached
```

## 💻 Utveckling

### Utvecklingskommandon

```bash
# Starta development
npm run dev                 # Båda apparna
npm run dev:mobile         # Endast mobilapp
npm run dev:web           # Endast webbapp

# Build för produktion
npm run build             # Bygg alla appar
npm run type-check        # TypeScript-validering

# Kodkvalitet
npm run lint              # Kör linting på alla appar
npm run lint:fix          # Fixa automatiska lint-problem
npm run format:write      # Formatera all kod
npm run check            # Fullständig kvalitetskontroll

# Testing
npm run test             # Kör alla tester i monorepo

# Docker-kommandon
npm run docker:build     # Bygg alla containers
npm run docker:logs     # Visa loggar från alla services
npm run docker:clean    # Rensa containers och volymer
```

### Projektstruktur

#### Mobile App Struktur
```
apps/mobile/src/
├── components/          # Återanvändbara UI-komponenter
│   ├── Cards/          # Paket-kort (SmallCard, LargeCard)
│   ├── Dashboard/      # Dashboard-komponenter
│   ├── Map/           # Kart-komponenter (Leaflet)
│   ├── modals/        # Modal-dialoger (QR, confirmationer)
│   └── Profile/       # Profil-komponenter
├── context/           # React Context för state
│   ├── auth/         # Autentisering och roller
│   ├── location/     # GPS och positionering  
│   └── packages/     # Paketdata och cache
├── hooks/            # Custom React hooks
│   ├── useCamera.ts      # Kamera-access
│   ├── useQRScanner.ts   # QR-scanning
│   └── useGeolocation.ts # GPS-funktionalitet
├── services/         # API-kommunikation
│   ├── authService.ts    # Login/logout
│   ├── packageService.ts # CRUD för paket
│   └── locationService.ts # GPS-uppdateringar
├── views/           # Huvudsidor
│   ├── driver/      # Förare-specifika vyer
│   │   ├── DriverDashboard.tsx
│   │   ├── DriverPackageDetails.tsx
│   │   └── DriverMap.tsx
│   └── user/        # Mottagare-specifika vyer
│       ├── UserDashboard.tsx
│       └── UserPackageDetails.tsx
└── utils/           # Hjälpfunktioner
```

#### Web App Struktur
```
apps/web/src/
├── components/          # Webb-specifika komponenter
│   ├── ShipmentForm.tsx    # Försändelseformulär
│   ├── HamburgerMenu.tsx   # Navigationsmenyn
│   └── LogoWeb.tsx        # Webb-anpassad logotyp
├── views/              # Webb-sidor
│   └── WebShipment.tsx    # Huvudsida för försändelser
├── styles/             # Webb-specifik styling
│   └── GlobalStylesWeb.ts
└── utils/              # Webb-specifika utilities
```

#### UI Package Struktur
```
packages/UI/src/
├── components/         # Delade UI-komponenter
│   ├── Button.tsx     # Knapp-komponent
│   ├── Icon.tsx       # Ikon-system
│   ├── Modal.tsx      # Modal-dialoger
│   ├── TextInput.tsx  # Input-fält
│   ├── Text/         # Text-komponenter
│   └── Toggle/       # Toggle-switchar
├── assets/           # Statiska resurser
│   └── icons/        # SVG-ikoner (100+ ikoner)
├── tests/           # Komponenttester
│   ├── Button.test.tsx
│   ├── Icon.test.tsx
│   └── Modal.test.tsx
└── types/           # TypeScript-definitioner
```

## 🚢 Deployment

### Utvecklingsmiljö
```bash
# Lokal utveckling med hot reload
npm run dev

# Preview production build
npm run build && npm run preview
```

### Staging/Production

#### Docker Deployment
```bash
# Production build
docker-compose -f docker-compose.prod.yml up --build -d

# Scaling för hög trafik
docker-compose up --scale mobile=3 --scale web=2

# Health checks
docker-compose ps
docker-compose logs -f
```

#### Separata Deployments
```bash
# Deploy endast mobile app
npm run build:mobile
npm run docker:mobile:detached

# Deploy endast web app  
npm run build:web
npm run docker:web:detached
```

### Miljökonfiguration

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

### Test-strategi

#### Enhetstester
```bash
# UI-komponenter (packages/UI)
npm run test Button.test.tsx
npm run test Icon.test.tsx  
npm run test Modal.test.tsx

# Mobile app-komponenter
npm run test --filter=mobile

# Web app-komponenter  
npm run test --filter=web
```

#### Integrationstester
```bash
# API-integrationstester
npm run test -- --grep "API"

# Context och state-tester
npm run test -- --grep "Context"

# Router-tester
npm run test -- --grep "Routes"
```

#### E2E-tester
```bash
# Fullständiga användarflöden
npm run test:e2e

# Specifika app-flöden
npm run test:e2e:mobile
npm run test:e2e:web
```

### Test Coverage
```bash
# Komplett coverage-rapport
npm run test -- --coverage

# App-specifik coverage
npm run test --filter=mobile -- --coverage
npm run test --filter=web -- --coverage
```

## 🔧 Miljövariabler

### Delade Variabler
```bash
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=5000
VITE_API_RETRY_ATTEMPTS=3

# Authentication
VITE_JWT_EXPIRES=3600000
VITE_REFRESH_TOKEN_ENDPOINT=/auth/refresh
```

### Mobile-specifika
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

### Web-specifika  
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

### Autentisering
```typescript
// Login (alla appar)
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
// Pakethantering
GET /packages/:userId           // Hämta användarens paket
GET /packages/single/:packageId // Hämta specifikt paket  
PUT /packages/:packageId/delivered // Markera som levererat

// GPS-spårning
PUT /user/location/:driverId    // Uppdatera förarposition
{
  "latitude": "59.3293",
  "longitude": "18.0686"
}

// QR-scanning
POST /packages/scan            // Validera QR-kod
{
  "qrCode": "package-12345",
  "action": "deliver|pickup|verify"
}
```

### Web API Endpoints
```typescript
// Försändelsehantering
POST /shipments               // Skapa ny försändelse
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

// QR-kod generering
POST /qr/generate            // Generera QR för paket
{
  "packageId": "pkg-12345",
  "format": "svg|png",
  "size": 256
}

// Dashboard data
GET /dashboard/stats         // Hämta statistik
GET /dashboard/shipments     // Hämta alla försändelser
GET /dashboard/users        // Användaröversikt (admin)
```

## 🎨 UI Komponentbibliotek (@chas/ui)

### Tillgängliga Komponenter

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

// Button med variants
<Button variant="primary" size="lg" disabled={false}>
  Klicka här
</Button>

// Icon-system (100+ ikoner)
<Icon name="package" size="md" alt="Paket-ikon" />
<Icon name="temperatureWarning" size="lg" />
<Icon name="qrScan" size="sm" />

// Typografi-system
<Text variant="h1" color="primary">Huvudrubrik</Text>
<Text variant="body-lg" color="secondary">Brödtext</Text>
<Text variant="caption" color="muted">Bildtext</Text>

// Modal-system
<Modal isOpen={isOpen} onClose={onClose} size="lg">
  <Text variant="h2">Modal titel</Text>
  <Text>Modal innehåll...</Text>
</Modal>

// Form-komponenter
<TextInput 
  label="Användarnamn"
  type="text" 
  required 
  errorMessage="Fältet krävs"
/>

<Toggle 
  checked={isEnabled} 
  onChange={setIsEnabled}
  label="Aktivera funktion"
/>
```

### Designsystem

#### Färgpalett
```typescript
const colors = {
  // Primära färger
  primary: '#1F4F82',      // Mörkblå
  secondary: '#9DC1DA',    // Ljusblå  
  accent: '#FFA712',       // Orange
  background: '#E0F2FE',   // Ljus bakgrund
  
  // Status-färger
  critical: '#B62D2D',     // Röd (kritisk temperatur)
  minor: '#F59E0B',        // Gul (varning)
  ok: '#2CEB72',          // Grön (OK status)
  pause: '#D1D5DB',       // Grå (levererat/pausat)
  
  // Specialfärger  
  blueBackground: '#0284C7', // Dashboard-bakgrund
  blueLines: '#075985',      // Linjer och borders
  cardText: '#111827',       // Text på kort
  whiteBackground: '#FFFFFF' // Vit bakgrund
};
```

#### Typografi
```typescript
const textVariants = {
  h1: { fontSize: '2rem', fontWeight: 'bold' },
  h2: { fontSize: '1.5rem', fontWeight: 'bold' },
  h3: { fontSize: '1.25rem', fontWeight: 'bold' },
  'body-lg': { fontSize: '1.125rem', fontWeight: 'normal' },
  'body': { fontSize: '1rem', fontWeight: 'normal' },
  'body-sm': { fontSize: '0.875rem', fontWeight: 'normal' },
  'body-smBold': { fontSize: '0.875rem', fontWeight: 'bold' },
  'caption': { fontSize: '0.75rem', fontWeight: 'normal' },
  'button': { fontSize: '1rem', fontWeight: '600' }
};
```

#### Ikoner
```typescript
// Paket och leverans
package, whitePackage, whitePackageHover
delivery, truckPin, truckLeft, truckRight

// Temperatur och miljö  
smallTemp, bigTemp, whiteTemp, tempWarning
smallTempHot, solidWhiteTemp, whiteTempHover
humidity, snowflake

// Navigation och UI
qrScan, qrScanHover, whiteQr
hamburger, whiteHamburger, whiteHamburgerHover
map, mapHover, whiteMap
home, cross, crossHover

// Status-indikatorer
greenCheck, yellowWarning, whiteWarning
redPin, yellowPin, greenPin, bluePin
clock, whiteClock, blueClock

// Sociala medier
facebook, twitter, instagram, mail
```

## 📱 PWA Funktioner (Mobile)

### Service Worker
```javascript
// Caching-strategier
- Statiska filer: Cache First
- API-anrop: Network First med fallback
- Bilder: Stale While Revalidate
- GPS-data: Network Only
```

### Offline Funktionalitet
```typescript
// Offline-capabilities
- Visa sparade paket-data
- Caching av scannningshistorik  
- GPS-positioner sparas lokalt
- Synkronisering när online
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
  /* Touch-optimerad UI */
  /* Stora knappar (min 44px) */
  /* Enkla navigationsstrukturer */
}

/* Tablets */  
@media (min-width: 768px) and (max-width: 1024px) {
  /* Hybridlayout */
  /* Större informationstäthet */
}
```

### Web App (Desktop-First)
```css
/* Desktop (default) */
@media (min-width: 1024px) {
  /* Multi-column layouts */
  /* Komplexa formulär */
  /* Hover-effekter */
}

/* Tablets */
@media (max-width: 1023px) {
  /* Adaptiva kolumner */
  /* Touch-anpassade kontroller */
}

/* Mobile (graceful degradation) */
@media (max-width: 767px) {
  /* Stackade layouter */
  /* Förenklade menyer */
}
```

## 🔒 Säkerhet

### Autentisering & Auktorisering
```typescript
// JWT-baserad auth med roller
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
// Känslig data hanteras säkert
- JWT tokens: HttpOnly cookies (web) / Secure storage (mobile)
- GPS-data: Krypterad transmission  
- Paketdata: Anonymiserad i logs
- GDPR-compliance: Data retention policies
```

### API Säkerhet
```typescript
// Säkra API-anrop
- CORS-konfiguration per miljö
- Rate limiting per endpoint
- Input validation på alla formulär  
- SQL injection-skydd
- XSS-prevention via CSP headers
```

## 📊 Performance & Optimering

### Bundle Optimering
```bash
# Analysera bundle-storlek
npm run build
npm run analyze

# Code splitting per route
- Mobile: /driver, /user routes
- Web: /shipment, /admin routes  
- UI: Tree-shaking för ikoner
```

### Caching Strategier
```typescript
// Service Worker (Mobile)
- Statiska assets: 1 år
- API responses: 5 minuter  
- GPS data: Ingen cache
- QR codes: Session-baserad

// Browser Cache (Web)  
- Komponenter: Långvarig cache
- API data: Korttidscache
- Formulärdata: Session storage
```

### Prestanda Metrics
```bash
# Lighthouse audits
npm run audit

# Bundle size monitoring  
npm run size-check

# Performance testing
npm run perf:mobile
npm run perf:web
```

## 🤝 Bidra

### Utvecklingsflöde

1. **Fork** repositoriet
2. **Skapa** feature branch
   ```bash
   git checkout -b feature/mobile-new-feature
   # eller
   git checkout -b feature/web-new-feature
   ```
3. **Utveckla** och testa
   ```bash
   npm run dev:mobile  # för mobile-features
   npm run dev:web     # för web-features
   npm run test        # kör alla tester
   ```
4. **Commit** med konventionella meddelanden
   ```bash
   git commit -m "feat(mobile): add QR scanner improvements"
   git commit -m "feat(web): add shipment bulk operations"
   git commit -m "fix(ui): resolve button accessibility issue"
   ```
5. **Push** och skapa PR
   ```bash
   git push origin feature/your-feature
   ```

### Kodningsriktlinjer

#### Mobile App
```typescript
// Använd hooks för state management
const [packages, setPackages] = useState<Package[]>([]);

// PWA-optimering
if ('serviceWorker' in navigator) {
  // Registrera service worker
}

// Touch-first design
const handleTouch = (e: TouchEvent) => {
  // Touch-specifik logik
};
```

#### Web App  
```typescript
// Desktop-optimerade komponenter
const handleKeyboard = (e: KeyboardEvent) => {
  // Keyboard shortcuts
};

// Formulärvalidering
const validateShipment = (data: ShipmentData) => {
  // Komplex validering
};

// Print-optimering
@media print {
  /* Print-specifika stilar */
}
```

#### UI Package
```typescript
// Komponent-dokumentation
/**
 * Button component med variants och sizes
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
- ✨ **NY:** Web-applikation för avsändare
- 📝 **NY:** Försändelseformulär med QR-generering  
- 🍔 **NY:** Hamburger-meny för webb-navigation
- 📱 **FÖRBÄTTRING:** Mobile PWA-optimeringar
- 🧪 **FÖRBÄTTRING:** Utökad testtäckning för båda appar

### v2.5.0 (2024-10-28) - WCAG Compliance
- ♿ **TILLGÄNGLIGHET:** Fullständig WCAG 2.1 AA-kompatibilitet
- 🔊 **NY:** Screen reader-stöd för alla komponenter
- ⌨️ **NY:** Keyboard navigation för mobil och webb
- 🎨 **FÖRBÄTTRING:** Förbättrad färgkontrast

### v2.0.0 (2024-10-15) - Mobile PWA Launch  
- 📱 **NY:** PWA med offline-stöd
- 🗺️ **NY:** Leaflet-kartintegration
- 📍 **NY:** GPS-spårning för förare
- 🌡️ **NY:** Temperatur- och luftfuktighetsövervakning
- 🧱 **NY:** UI-komponentbibliotek (@chas/ui)

## 📞 Support & Dokumentation

### Dokumentation
- **📚 Fullständig Guide:** [GitHub Wiki](https://github.com/Chas-Grupp-3/frontend/wiki)
- **🎯 Mobile App Guide:** [Mobile Documentation](https://github.com/Chas-Grupp-3/frontend/wiki/Mobile-App)
- **💻 Web App Guide:** [Web Documentation](https://github.com/Chas-Grupp-3/frontend/wiki/Web-App)
- **🧱 UI Components:** [Storybook](https://thermotruck-ui.netlify.app)

### Support
- **🐛 Buggrapporter:** [GitHub Issues](https://github.com/Chas-Grupp-3/frontend/issues)
- **💬 Diskussioner:** [GitHub Discussions](https://github.com/Chas-Grupp-3/frontend/discussions)  
- **📧 Direkt kontakt:** [frontend@thermotruck.com](mailto:frontend@thermotruck.com)

### Community
- **🚀 Feature Requests:** Använd GitHub Issues med `enhancement` label
- **❓ Frågor:** GitHub Discussions för utvecklingsfrågor
- **📱 Mobile Issues:** Använd `mobile` label
- **💻 Web Issues:** Använd `web` label
- **🧱 UI Issues:** Använd `ui-package` label

## 📄 Licens

Detta projekt är licensierat under [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 Chas Grupp 3

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

## 🚀 Kom igång idag!

```bash
# Klona och starta utveckling
git clone https://github.com/Chas-Grupp-3/frontend.git
cd frontend
npm install
npm run dev

# Öppna i webbläsaren
# Mobile: http://localhost:5173
# Web: http://localhost:5174
```

**ThermoTruck Frontend Monorepo** - Komplett leveranshantering för temperaturkänsliga varor med moderna webbteknologier.

*Utvecklat med ❤️ av Chas Grupp 3*

[![Mobile App](https://img.shields.io/badge/📱-Mobile_PWA-blue)](http://localhost:5173)
[![Web App](https://img.shields.io/badge/💻-Web_Application-green)](http://localhost:5174)
[![UI Library](https://img.shields.io/badge/🧱-Component_Library-purple)](https://www.npmjs.com/package/@chas/ui)
