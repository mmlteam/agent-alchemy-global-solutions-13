import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { HeroIllustration } from "@/components/HeroIllustration";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import HeroFloatingParticles from "@/components/HeroFloatingParticles";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsSafari } from "@/hooks/use-safari";
const Hero = () => {
  const isMobile = useIsMobile();
  const isSafari = useIsSafari();
  
  return <section className="bg-gradient-hero relative overflow-y-hidden pt-[15px]">
      {/* Full Hero Spotlight Effect - Only on desktop and not Safari */}
      {!isMobile && !isSafari && <SpotlightCursor size={250} />}
      {/* Header with Logo */}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full blur-3xl animate-glow delay-300"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 pt-0 pb-8 lg:pb-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[1fr_1.1fr] gap-6 lg:gap-2 items-end min-h-[75vh] lg:min-h-[75vh]">
          {/* Content */}
          <div className="space-y-6 animate-fade-in flex flex-col justify-center order-1 lg:order-none">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Automation & AI Agents</span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Automation & AI Agents —</span>
                <br className="hidden sm:block" />
                <span className="bg-gradient-success bg-clip-text text-transparent">Cut Costs.</span>{" "}
                <span className="bg-gradient-speed bg-clip-text text-transparent">Save Time</span>
              </h1>
              
              <div className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl min-h-[3.5rem] lg:min-h-[4.5rem]">
                From streamlining repetitive tasks to deploying intelligent AI agents, we design solutions that fit your unique business needs.
              </div>
              
              {/* Integration Partners Bar */}
              <div className="grid grid-cols-3 lg:flex lg:flex-wrap justify-center lg:justify-start items-center gap-3 lg:gap-4 mt-4 animate-fade-in">
                {[{
                name: "Python",
                logoPath: "/lovable-uploads/82aab38a-7c3f-4bba-b5cc-bc13ee3abb2f.png",
                alt: "Python logo"
              }, {
                name: "Zapier",
                logoPath: "/lovable-uploads/50cbdcb4-64bf-4d1b-93f5-77439bb33b81.png",
                alt: "Zapier logo"
              }, {
                name: "OpenAI",
                logoPath: "/lovable-uploads/81f4a72e-fd51-4d1d-9395-8d3a9fa5a4ab.png",
                alt: "OpenAI logo"
              }, {
                name: "n8n",
                logoPath: "/lovable-uploads/912ef728-bb1e-4412-96e7-d6bd0c9a8f89.png",
                alt: "n8n logo"
              }, {
                name: "Make",
                logoPath: "/lovable-uploads/23af8b5d-1cd4-4208-8e59-d67fe34f9695.png",
                alt: "Make.com logo"
              }, {
                name: "Airtable",
                logoPath: "/lovable-uploads/fa184e33-137e-4ccc-a258-f10ef7ae0920.png",
                alt: "Airtable logo"
              }].map((partner, index) => <div key={index} className="flex items-center justify-center p-2 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg shadow-primary/10 border border-white/10" style={{
                animationDelay: `${index * 100}ms`
              }}>
                    <img src={partner.logoPath} alt={partner.alt} className="h-10 w-auto" loading="lazy" />
                  </div>)}
              </div>
              
              {/* Disclaimer */}
              
            </div>
            
            <div className="flex flex-col items-center lg:items-start">
              <Button id="hero-cta" variant="premium" size="lg" className="group w-full max-w-xs lg:w-auto" aria-label="Book My Free Automation Audit" onClick={() => document.querySelector('#lead-form')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })}>
                Book My Free Automation Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground mt-1 text-center lg:text-left">Takes &lt; 2 min</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 pb-0 mb-0 border-t border-border/30">
              <div className="space-y-1">
                <div className="text-lg lg:text-xl font-bold text-primary">500+</div>
                <div className="text-xs text-muted-foreground">AI Agents Deployed</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg lg:text-xl font-bold text-primary">98%</div>
                <div className="text-xs text-muted-foreground">Efficiency Increase</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg lg:text-xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Autonomous Operation</div>
              </div>
            </div>
          </div>
          
          {/* Hero Illustration - Aligned with content */}
          <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[600px] xl:h-[650px] w-full order-2 lg:order-none self-end overflow-visible">
            <HeroIllustration />
            <HeroFloatingParticles />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;