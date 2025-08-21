import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const proofChips = [
  { value: "↑ 300%", label: "productivity" },
  { value: "↓ 60%", label: "costs" },
  { value: "24/7", label: "uptime" },
  { value: "10+ yrs", label: "expertise" },
  { value: "500+", label: "AI agents" },
  { value: "₹48 cr", label: "saved" }
];

const CombinedFOMOStrip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('fomo-strip');
    if (element) {
      observer.observe(element);
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldAnimate(!prefersReducedMotion);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="fomo-strip" className="py-section bg-slate-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              <span className="text-white">70% of your competitors already automate.</span>
            </h2>
            <p className="text-xl text-slate-300">
              <em>Will you join them—or stay in the 30% left behind?</em>
            </p>
          </div>
          
          {/* Dual Progress Bar */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex bg-slate-700 rounded-full overflow-hidden h-6">
              <div className={`bg-primary h-full flex items-center justify-center transition-all duration-1000 ${
                isVisible ? 'w-[70%]' : 'w-0'
              }`}>
                <span className="text-sm font-semibold text-primary-foreground">70% Automated</span>
              </div>
              <div className={`bg-slate-600 h-full flex items-center justify-center transition-all duration-1000 delay-500 ${
                isVisible ? 'w-[30%]' : 'w-0'
              }`}>
                <span className="text-sm font-semibold text-slate-300">30% Manual</span>
              </div>
            </div>
            
            {/* Proof Chips */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {proofChips.map((chip, index) => (
                <div 
                  key={index}
                  className="inline-flex items-center gap-2 bg-slate-700/50 border border-slate-600 rounded-full px-4 py-2 text-sm"
                >
                  <span className="font-bold text-primary">{chip.value}</span>
                  <span className="text-slate-300">{chip.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="pt-4">
            <Button 
              id = "competitors-cta"
              variant="premium" 
              size="lg"
              className="group"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Get My Automation Audit"
            >
              Get My Automation Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedFOMOStrip;