// Memoized versions of heavy components for better performance
import { memo, lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components
export const LazyServices = lazy(() => import('./Services'));
export const LazyTestimonials = lazy(() => import('./Testimonials'));
export const LazyFAQ = lazy(() => import('./FAQ'));
export const LazyContact = lazy(() => import('./Contact'));
export const LazyROICalculator = lazy(() => import('./ROICalculator'));
export const LazyIntegrationsSlider = lazy(() => import('./IntegrationsSlider'));

// Loading fallback components
const ComponentSkeleton = ({ height = "400px", title }: { height?: string; title?: string }) => (
  <div className="space-y-4" style={{ minHeight: height }}>
    {title && <Skeleton className="h-8 w-64 mx-auto" />}
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

// Optimized wrapper component
export const OptimizedSection = memo(({ 
  children, 
  fallback, 
  className = "" 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <Suspense fallback={fallback || <ComponentSkeleton />}>
      {children}
    </Suspense>
  </div>
));

OptimizedSection.displayName = 'OptimizedSection';

// Pre-configured optimized sections
export const OptimizedServices = memo(() => (
  <OptimizedSection fallback={<ComponentSkeleton height="600px" title="Our Services" />}>
    <LazyServices />
  </OptimizedSection>
));

export const OptimizedTestimonials = memo(() => (
  <OptimizedSection fallback={<ComponentSkeleton height="400px" title="Client Testimonials" />}>
    <LazyTestimonials />
  </OptimizedSection>
));

export const OptimizedFAQ = memo(() => (
  <OptimizedSection fallback={<ComponentSkeleton height="500px" title="Frequently Asked Questions" />}>
    <LazyFAQ />
  </OptimizedSection>
));

export const OptimizedContact = memo(() => (
  <OptimizedSection fallback={<ComponentSkeleton height="600px" title="Get In Touch" />}>
    <LazyContact />
  </OptimizedSection>
));

export const OptimizedROICalculator = memo(() => (
  <OptimizedSection fallback={<ComponentSkeleton height="500px" title="ROI Calculator" />}>
    <LazyROICalculator />
  </OptimizedSection>
));

export const OptimizedIntegrations = memo(() => (
  <OptimizedSection fallback={<ComponentSkeleton height="300px" title="Integrations" />}>
    <LazyIntegrationsSlider />
  </OptimizedSection>
));

// Set display names for better debugging
OptimizedServices.displayName = 'OptimizedServices';
OptimizedTestimonials.displayName = 'OptimizedTestimonials';
OptimizedFAQ.displayName = 'OptimizedFAQ';
OptimizedContact.displayName = 'OptimizedContact';
OptimizedROICalculator.displayName = 'OptimizedROICalculator';
OptimizedIntegrations.displayName = 'OptimizedIntegrations';