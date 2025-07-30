# Architecture Document
## VanceTheCreditDoctor Sales Funnel

### System Overview
**Project:** VanceTheCreditDoctor Complete Sales Funnel  
**Architecture Pattern:** Single Page Application (SPA) with Client-Side Routing  
**Framework:** React 18 + TypeScript + Tailwind CSS  
**Version:** 1.0  
**Date:** January 30, 2025  

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client-Side SPA                          │
├─────────────────────────────────────────────────────────────┤
│  React Router DOM (Client-Side Routing)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    Index    │  │ BookSession │  │  ThankYou   │        │
│  │     /       │  │/book-session│  │ /thank-you  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  Shared Components Layer                                    │
│  - Header (Navigation)                                      │
│  - Footer (Contact Info)                                   │
│  - UI Components (shadcn/ui)                              │
│  - Geometric Animations (Framer Motion)                   │
├─────────────────────────────────────────────────────────────┤
│  External Integrations                                      │
│  - GoHighLevel Calendar Widget (iframe)                    │
│  - GoHighLevel Form Widget (iframe)                        │
│  - LeadConnector Scripts                                   │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

#### 1. **Page Components Structure**

```
src/
├── pages/
│   ├── Index.tsx                 # Landing page (existing)
│   ├── BookSession.tsx          # Calendar booking page
│   ├── ThankYou.tsx            # Post-booking confirmation
│   └── NotFound.tsx            # 404 error page (existing)
├── components/
│   ├── booking/                 # Booking-specific components
│   │   ├── CalendarEmbed.tsx   # GoHighLevel calendar wrapper
│   │   ├── BookingProgress.tsx # Step indicator
│   │   ├── TrustSignals.tsx    # Social proof elements
│   │   └── BookingHero.tsx     # Booking page header
│   ├── thankyou/               # Thank you page components
│   │   ├── BookingConfirmation.tsx # Confirmation display
│   │   ├── VSLPlayer.tsx       # Video player component
│   │   └── NextSteps.tsx       # Preparation guidelines
│   ├── shared/                 # Shared components
│   │   ├── Header.tsx          # Navigation (existing)
│   │   ├── Footer.tsx          # Footer (existing)
│   │   └── LoadingSpinner.tsx  # Loading states
│   └── ui/                     # shadcn/ui components (existing)
```

#### 2. **Component Responsibility Matrix**

| Component | Responsibility | Props | State | External Deps |
|-----------|---------------|-------|-------|---------------|
| BookSession | Page layout, coordination | - | loading, step | - |
| CalendarEmbed | GoHighLevel iframe wrapper | calendarId | isLoaded | GoHighLevel |
| BookingProgress | Step indicator display | currentStep, totalSteps | - | - |
| TrustSignals | Social proof display | testimonials?, stats? | - | - |
| ThankYou | Confirmation page layout | bookingData? | showVSL | - |
| VSLPlayer | Video playback | videoUrl, autoplay? | isPlaying | - |

### Data Flow Architecture

#### 1. **User Journey Data Flow**

```
Landing Page (/) 
    ↓ [User clicks "Get Free Credit Analysis"]
    ↓ [React Router navigation]
Book Session (/book-session)
    ↓ [GoHighLevel calendar loads in iframe]
    ↓ [User selects time and books]
    ↓ [GoHighLevel handles booking logic]
    ↓ [Redirect or navigation to thank you]
Thank You (/thank-you)
    ↓ [Display confirmation]
    ↓ [Option to watch VSL]
```

#### 2. **State Management Strategy**

```typescript
// No complex state management needed - using local React state
// Each page manages its own state independently

interface BookingPageState {
  isCalendarLoaded: boolean;
  currentStep: number;
  error?: string;
}

interface ThankYouPageState {
  showVSL: boolean;
  bookingDetails?: BookingInfo;
}
```

#### 3. **URL Structure & Routing**

```
/ (root)                    → Index page (existing landing)
/book-session              → Calendar booking page
/thank-you                 → Post-booking confirmation
/thank-you?booked=success  → With booking success parameter
* (catch-all)              → 404 Not Found page
```

### Technical Implementation Details

#### 1. **Routing Configuration**

```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookSession from "./pages/BookSession";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/book-session" element={<BookSession />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
```

#### 2. **GoHighLevel Integration Architecture**

```typescript
// CalendarEmbed.tsx
interface CalendarEmbedProps {
  calendarId: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const CalendarEmbed: React.FC<CalendarEmbedProps> = ({
  calendarId,
  onLoad,
  onError
}) => {
  useEffect(() => {
    // Load GoHighLevel script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    script.onload = () => onLoad?.();
    script.onerror = () => onError?.(new Error('Script failed to load'));
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="calendar-container">
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${calendarId}`}
        style={{ width: '100%', border: 'none', overflow: 'hidden' }}
        scrolling="no"
        id={`${calendarId}_${Date.now()}`}
        onLoad={() => onLoad?.()}
      />
    </div>
  );
};
```

#### 3. **Animation & Styling Architecture**

```typescript
// Consistent with existing landing page design
const DESIGN_TOKENS = {
  colors: {
    background: '#030303',
    primary: 'hsl(213 94% 45%)',
    success: 'hsl(145 63% 42%)',
    accent: 'hsl(213 94% 50%)'
  },
  gradients: {
    hero: 'linear-gradient(135deg, hsl(213 94% 45%) 0%, hsl(213 94% 55%) 50%, hsl(145 63% 52%) 100%)',
    primary: 'linear-gradient(135deg, hsl(213 94% 45%) 0%, hsl(213 94% 55%) 100%)'
  },
  animations: {
    fadeIn: { duration: 1, ease: [0.25, 0.4, 0.25, 1] },
    geometricFloat: { duration: 12, repeat: Infinity, ease: "easeInOut" }
  }
};
```

### Performance Architecture

#### 1. **Code Splitting Strategy**

```typescript
// Lazy load pages for better performance
import { lazy, Suspense } from 'react';

const BookSession = lazy(() => import('./pages/BookSession'));
const ThankYou = lazy(() => import('./pages/ThankYou'));

// Wrap in Suspense with loading fallback
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/book-session" element={<BookSession />} />
    <Route path="/thank-you" element={<ThankYou />} />
  </Routes>
</Suspense>
```

#### 2. **Asset Loading Strategy**

```typescript
// Preload critical resources
useEffect(() => {
  // Preload GoHighLevel script
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = 'https://link.msgsndr.com/js/form_embed.js';
  link.as = 'script';
  document.head.appendChild(link);
}, []);
```

#### 3. **Performance Optimizations**

- **Iframe Optimization:** Lazy load calendar iframe on user interaction
- **Image Optimization:** Use WebP format with fallbacks
- **Bundle Optimization:** Tree shaking unused shadcn components
- **Caching Strategy:** Static assets cached, dynamic content fresh

### Security Architecture

#### 1. **Data Security**

```typescript
// No sensitive data stored client-side
// All booking data handled by GoHighLevel
// User PII never touches our application

const SECURITY_PRINCIPLES = {
  dataMinimization: 'Only collect necessary routing data',
  externalHandling: 'GoHighLevel handles all sensitive operations',
  httpsOnly: 'All communications over HTTPS',
  noStorage: 'No local storage of user data'
};
```

#### 2. **Content Security Policy**

```typescript
// CSP headers for iframe security
const CSP_DIRECTIVES = {
  'frame-src': ['https://api.leadconnectorhq.com', 'https://link.msgsndr.com'],
  'script-src': ['https://link.msgsndr.com', "'self'"],
  'connect-src': ['https://api.leadconnectorhq.com', "'self'"]
};
```

### Deployment Architecture

#### 1. **Build Configuration**

```json
// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

#### 2. **Environment Configuration**

```typescript
// No environment variables needed for MVP
// All configuration is compile-time constants

const CONFIG = {
  CALENDAR_ID: 'wIj3efrLkHV48JTqc2Rs',
  GOHIGHLEVEL_BASE_URL: 'https://api.leadconnectorhq.com',
  SCRIPT_URL: 'https://link.msgsndr.com/js/form_embed.js'
};
```

#### 3. **Deployment Strategy**

```
Development → Build → Deploy
     ↓           ↓        ↓
  npm run dev → npm run build → Upload to hosting
  localhost:5173 → dist/ → Production URL
```

### Error Handling Architecture

#### 1. **Error Boundary Strategy**

```typescript
// Global error boundary for page-level errors
class SalesFunnelErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

#### 2. **Calendar Loading Error Handling**

```typescript
// Fallback for calendar loading issues
const CalendarWithFallback: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  
  if (error) {
    return (
      <div className="calendar-error">
        <h3>Unable to load calendar</h3>
        <p>Please call us directly at (405) 406-7323</p>
        <Button onClick={() => setError(null)}>Try Again</Button>
      </div>
    );
  }
  
  return <CalendarEmbed onError={(err) => setError(err.message)} />;
};
```

### Testing Architecture

#### 1. **Component Testing Strategy**

```typescript
// Test key user interactions
describe('BookSession Page', () => {
  test('renders calendar embed correctly', () => {
    render(<BookSession />);
    expect(screen.getByTestId('calendar-container')).toBeInTheDocument();
  });
  
  test('shows loading state initially', () => {
    render(<BookSession />);
    expect(screen.getByText('Loading calendar...')).toBeInTheDocument();
  });
  
  test('displays progress indicator', () => {
    render(<BookSession />);
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  });
});
```

#### 2. **Integration Testing**

```typescript
// Test complete user flow
describe('Sales Funnel Flow', () => {
  test('navigation from landing to booking works', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Get Free Credit Analysis'));
    expect(window.location.pathname).toBe('/book-session');
  });
});
```

### Monitoring & Analytics Architecture

#### 1. **Performance Monitoring**

```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  // Send to analytics service
  console.log('Performance metric:', metric);
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### 2. **User Journey Tracking**

```typescript
// Simple event tracking
const trackEvent = (event: string, properties?: Record<string, any>) => {
  // Integration point for analytics
  console.log('Event:', event, properties);
};

// Usage in components
const BookSession = () => {
  useEffect(() => {
    trackEvent('page_view', { page: 'book_session' });
  }, []);
  
  return (
    // Component JSX
  );
};
```

### Mobile-First Architecture

#### 1. **Responsive Design Strategy**

```typescript
// Tailwind breakpoints
const BREAKPOINTS = {
  sm: '640px',   // Small screens
  md: '768px',   // Medium screens
  lg: '1024px',  // Large screens
  xl: '1280px'   // Extra large screens
};

// Mobile-first CSS approach
<div className="w-full md:w-3/4 lg:w-1/2">
  {/* Calendar container */}
</div>
```

#### 2. **Touch-Optimized Interactions**

```typescript
// Touch-friendly button sizes
const TOUCH_TARGETS = {
  minimum: '44px',  // iOS/Android minimum
  recommended: '48px',  // Better accessibility
  spacing: '8px'    // Between touch targets
};
```

### Accessibility Architecture

#### 1. **WCAG Compliance Strategy**

```typescript
// Accessibility requirements
const A11Y_REQUIREMENTS = {
  focusManagement: 'Logical tab order',
  colorContrast: '4.5:1 minimum ratio',
  screenReader: 'Semantic HTML + ARIA',
  keyboard: 'Full keyboard navigation'
};
```

#### 2. **Semantic HTML Structure**

```typescript
// Proper heading hierarchy and landmarks
<main role="main">
  <header role="banner">
    <h1>Book Your Free Credit Analysis</h1>
  </header>
  <section aria-label="Calendar booking">
    <h2>Select Your Appointment Time</h2>
    {/* Calendar embed */}
  </section>
</main>
```

### Future Architecture Considerations

#### 1. **Scalability Roadmap**

```
V1: Basic funnel with embedded calendar
V2: Custom calendar with API integration
V3: Advanced analytics and A/B testing
V4: Multi-language and internationalization
V5: Advanced personalization engine
```

#### 2. **Technical Debt Management**

- **Code Splitting:** Implement lazy loading for non-critical components
- **State Management:** Consider Redux Toolkit if state complexity grows
- **API Layer:** Abstract external integrations for easier swapping
- **Testing Coverage:** Increase test coverage as features grow

### Documentation & Maintenance

#### 1. **Code Documentation Standards**

```typescript
/**
 * CalendarEmbed Component
 * 
 * Wraps GoHighLevel calendar widget in a styled container
 * with error handling and loading states.
 * 
 * @param calendarId - GoHighLevel calendar identifier
 * @param onLoad - Callback when calendar loads successfully
 * @param onError - Callback when calendar fails to load
 */
interface CalendarEmbedProps {
  calendarId: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}
```

#### 2. **Maintenance Schedule**

- **Weekly:** Review analytics and performance metrics
- **Monthly:** Update dependencies and security patches
- **Quarterly:** Review and optimize conversion rates
- **Annually:** Architecture review and technology updates

---

**Document Status:** Complete  
**Last Updated:** January 30, 2025  
**Next Review:** Upon implementation completion  
**Approved By:** [Pending Approval]
