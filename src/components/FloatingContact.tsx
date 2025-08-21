import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000); // 15 seconds

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= 25) {
        setIsVisible(true);
      }
    };

    // Check if user has submitted the main form
    const checkFormSubmission = () => {
      const hasSubmitted = localStorage.getItem('form-submitted');
      if (hasSubmitted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkFormSubmission();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210?text=Hi%20I\'m%20interested%20in%20AI%20automation', '_blank');
  };

  if (!isVisible || hasInteracted) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      <Button
        onClick={handleWhatsAppClick}
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Talk to an automation specialist"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
      <div className="absolute -top-12 right-0 bg-background border border-border rounded-lg px-3 py-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
        Talk to an automation specialist
      </div>
    </div>
  );
};

export default FloatingContact;