import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/50 md:hidden z-50">
      <Button 
        id="mobile-footer-book-cta"
        variant="premium" 
        size="lg" 
        className="w-full group"
        onClick={() => document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        aria-label="Book My Free Automation Audit"
      >
        Book My Free Automation Audit
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default StickyMobileCTA;