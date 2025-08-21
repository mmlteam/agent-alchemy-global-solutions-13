import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const StickyDesktopCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/50 hidden md:flex items-center justify-between z-50">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-foreground">Ready to Transform Your Business?</h3>
        <p className="text-sm text-muted-foreground">Get your free automation audit and start saving time today</p>
      </div>
      <Button 
        id="footer-book-cta"
        variant="premium" 
        size="lg" 
        className="group flex-shrink-0 ml-6"
        onClick={() => document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        aria-label="Book My Free Automation Audit"
      >
        Book My Free Automation Audit
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default StickyDesktopCTA;