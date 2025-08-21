import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Store, Smartphone, Car, Play, Tv, Bot, FileSpreadsheet } from "lucide-react";

const techWaves = [
  {
    era: "Internet Commerce",
    winner: { label: "E-Commerce Pioneers", icon: ShoppingCart },
    laggard: { label: "Brick-and-Mortar Holdouts", icon: Store },
    metric: "Online share ↑ 100%"
  },
  {
    era: "Mobile Apps", 
    winner: { label: "Ride-Hailing Apps", icon: Smartphone },
    laggard: { label: "Traditional Taxis", icon: Car },
    metric: "5B rides/yr"
  },
  {
    era: "Cloud Streaming",
    winner: { label: "Streaming Platforms", icon: Play },
    laggard: { label: "Cable-Only TV", icon: Tv },
    metric: "220M subs"
  },
  {
    era: "AI Automation",
    winner: { label: "AI-Driven Ops", icon: Bot },
    laggard: { label: "Manual Spreadsheet Ops", icon: FileSpreadsheet },
    metric: "Productivity ↑ 300%"
  }
];

const LogoIcon = ({ Icon, isWinner }: { Icon: any, isWinner: boolean }) => (
  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
    isWinner ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
  } grayscale hover:grayscale-0`}>
    <Icon className="w-6 h-6" />
  </div>
);

const EvolutionTimeline = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold">
            <span className="text-destructive">70%</span> of your competitors already automate.{" "}
            <span className="text-muted-foreground">30%</span> still run manual ops.
          </h2>
          
          {/* Dual Progress Bar */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex bg-muted rounded-full overflow-hidden h-4">
              <div className="bg-primary h-full w-[70%] flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-foreground">70%</span>
              </div>
              <div className="bg-muted-foreground/30 h-full w-[30%] flex items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">30%</span>
              </div>
            </div>
            
            {/* Benefits bullets */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                3× faster
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                60% cheaper
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                24/7 uptime
              </span>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center animate-fade-in">
          <Button 
            variant="premium" 
            size="lg"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get My Automation Audit →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EvolutionTimeline;