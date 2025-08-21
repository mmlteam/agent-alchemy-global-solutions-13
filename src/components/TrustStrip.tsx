import { useEffect, useState } from "react";

const stats = [
  { value: "10", suffix: "+ yrs", label: "Automation experience" },
  { value: "500", suffix: "+", label: "AI agents deployed" },
  { value: "₹ 48", suffix: " cr", label: "Client cost-savings" }
];

const TrustStrip = () => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldAnimate(!prefersReducedMotion);
  }, []);

  return (
    <section className="py-16 bg-accent/20 border-y border-border/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold">Our Track Record</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center space-y-2 animate-fade-in"
              style={{ 
                animationDelay: `${index * 200}ms`
              }}
            >
              <div className={`text-4xl lg:text-5xl font-bold text-primary ${
                shouldAnimate ? 'animate-pulse' : ''
              }`}
              style={{
                animationDuration: '6s',
                animationDelay: `${index * 2}s`
              }}>
                {stat.value}<span className="text-3xl">{stat.suffix}</span>
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;