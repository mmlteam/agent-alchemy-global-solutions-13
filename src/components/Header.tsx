import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const number = "91XXXXXXXXXX"; // Replace with your WhatsApp number
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const text = `Hi ProAgentz, I’m interested in AI automation. I’m on ${pageUrl}`;
  const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

  return (
    <header
      className={[
        "sticky top-0 z-50",
        "px-4 md:px-6",
        "h-[var(--header-h-mobile)] md:h-[var(--header-h-desktop)]",
        "backdrop-blur-md transition-colors",
        scrolled ? "bg-black/40" : "bg-black/20",
        "border-b border-white/10",
      ].join(" ")}
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <a href="/" className="inline-flex items-center" aria-label="ProAgentz home">
          <img src="/lovable-uploads/65fd72c0-6ead-4fcb-8ac7-2d2e11c3ee2e.png" alt="ProAgentz" className="h-6 md:h-8 w-auto" />
        </a>

        {/* WhatsApp Action - Desktop */}
        <Button
          id = "whatsapp-header-cta"
          asChild
          className="hidden md:inline-flex h-11 rounded-full px-4 gap-2 font-medium text-white bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp)/0.9)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--whatsapp))]"
          data-analytics="whatsapp_click_header"
          aria-label="Open WhatsApp chat"
          title="WhatsApp"
        >
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <img src="/icons/whatsapp.svg" alt="WhatsApp" className="h-5 w-5" />
            <span>WhatsApp</span>
          </a>
        </Button>

        {/* WhatsApp Action - Mobile */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              className="md:hidden inline-flex h-11 w-11 rounded-full p-0 text-white bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp)/0.9)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--whatsapp))]"
              data-analytics="whatsapp_click_header"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <img src="/icons/whatsapp.svg" alt="WhatsApp" className="h-5 w-5" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Chat on WhatsApp</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
