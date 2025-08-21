import { memo, Suspense, lazy, Component, ReactNode } from 'react';

// Simple error boundary implementation
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: (error: Error) => ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

// Lazy load components for code splitting
export const LazyROICalculator = lazy(() => import('./ROICalculator'));
export const LazyTestimonials = lazy(() => import('./Testimonials'));
export const LazyFAQ = lazy(() => import('./FAQ'));
export const LazyContact = lazy(() => import('./Contact'));

// Error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="p-4 text-center text-muted-foreground">
    <p>Something went wrong loading this section.</p>
    <details className="mt-2 text-xs">
      <summary>Error details</summary>
      <pre className="mt-1 text-left">{error.message}</pre>
    </details>
  </div>
);

// Loading fallback component
const LoadingFallback = ({ height = "400px" }: { height?: string }) => (
  <div className="animate-pulse" style={{ height }}>
    <div className="bg-muted/30 rounded-lg h-full"></div>
  </div>
);

// HOC for performance optimization
export const withPerformance = <T extends object>(
  Component: React.ComponentType<T>,
  displayName?: string
) => {
  const PerformantComponent = memo((props: T) => (
    <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
      <Suspense fallback={<LoadingFallback />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  ));
  
  PerformantComponent.displayName = displayName || Component.displayName || Component.name;
  return PerformantComponent;
};

// Critical resource preloader
export const preloadCriticalResources = () => {
  // Preload hero image
  const heroImage = new Image();
  heroImage.src = '/src/assets/hero-ai-automation.jpg';
  
  // Preload fonts if using web fonts
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  
  // Preload critical CSS
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.as = 'style';
  criticalCSS.href = '/src/index.css';
};

// Performance metrics collector
export const collectWebVitals = () => {
  if (typeof window !== 'undefined' && 'web-vitals' in window) {
    // @ts-ignore
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};

export default withPerformance;