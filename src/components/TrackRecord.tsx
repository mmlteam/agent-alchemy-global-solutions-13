import { useEffect, useState } from "react";

const trackRecordStats = [
  { value: "10+", label: "yrs", description: "Automation experience" },
  { value: "500+", label: "", description: "AI agents deployed" },
  { value: "₹48", label: "cr", description: "client cost-savings" }
];

const TrackRecord = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('track-record');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="track-record" className="py-16 bg-accent/5 border-y border-border/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          {trackRecordStats.map((stat, index) => (
            <div 
              key={index}
              className="space-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl lg:text-5xl font-bold">
                <span 
                  className={`bg-gradient-primary bg-clip-text text-transparent ${
                    isVisible ? 'animate-pulse' : ''
                  }`}
                  style={{ 
                    animationDuration: '6s',
                    animationIterationCount: 'infinite'
                  }}
                >
                  {stat.value}
                </span>
                {stat.label && (
                  <span className="text-primary text-2xl ml-1">{stat.label}</span>
                )}
              </div>
              <p className="text-muted-foreground font-medium">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackRecord;