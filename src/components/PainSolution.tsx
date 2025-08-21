import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, TrendingDown, Zap, ArrowRight, CheckCircle, Cpu, BarChart3 } from "lucide-react";
import { useState } from "react";

const painPoints = [
  {
    id: 1,
    icon: Clock,
    title: "Manual Bottlenecks",
    pain: "Teams spend 60% of time on repetitive tasks instead of strategic work",
    solution: "AI agents automate routine processes, freeing teams for high-value activities",
    solutionIcon: Cpu,
    painMetric: "↓ 60% productivity",
    metric: "↑ 300% productivity"
  },
  {
    id: 2, 
    icon: TrendingDown,
    title: "Resource Drain",
    pain: "High operational costs from manual processes and human errors",
    solution: "Intelligent automation reduces costs while improving accuracy and speed",
    solutionIcon: CheckCircle,
    painMetric: "↑ 40% waste costs",
    metric: "↓ 60% operational costs"
  },
  {
    id: 3,
    icon: Zap,
    title: "Slow GTM",
    pain: "Delayed time-to-market due to inefficient workflows and bottlenecks",
    solution: "Streamlined AI workflows accelerate product launches and customer delivery",
    solutionIcon: BarChart3,
    painMetric: "↑ 2x delivery delays",
    metric: "↑ 43% faster delivery"
  }
];

const PainSolution = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-12 lg:mb-16 animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold">
                From <span className="text-destructive">Pain Points</span> to <span className="bg-gradient-primary bg-clip-text text-transparent">Automation & AI Agent Solutions</span>
              </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how AI automation transforms your biggest operational challenges into competitive advantages.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {painPoints.map((item, index) => (
            <Card 
              key={item.id}
              className={`p-6 cursor-pointer border-2 animate-fade-in hover:shadow-premium relative transition-all duration-500 min-h-[280px] md:min-h-[320px] ${
                activeCard === item.id 
                  ? 'border-primary bg-primary/5 transform scale-105 z-10 overflow-visible' 
                  : 'border-border/50 hover:border-primary/50 overflow-hidden'
              }`}
              style={{ 
                animationDelay: `${index * 200}ms`
              }}
              onMouseEnter={() => setActiveCard(item.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Desktop (hover to reveal) */}
              <div className="hidden md:block relative">
                {/* Pain State */}
                <div className={`transition-all duration-500 ${
                  activeCard === item.id ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
                }`}>
                  <div className="w-12 h-12 bg-destructive/20 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{item.pain}</p>
                  <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive text-sm font-semibold px-3 py-1 rounded-full">
                    <TrendingDown className="w-4 h-4" />
                    {item.painMetric}
                  </div>
                </div>

                {/* Connector line appears on hover */}
                <div className={`absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px border-t border-dashed transition-opacity duration-500 ${activeCard === item.id ? 'opacity-100 border-primary/40' : 'opacity-0 border-border/40'}`} />

                {/* Solution State */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  activeCard === item.id ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'
                }`}>
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                    <item.solutionIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">AI Solution</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{item.solution}</p>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    {item.metric}
                  </div>
                </div>
              </div>

              {/* Mobile (show both, no interaction required) */}
              <div className="block md:hidden space-y-4">
                {/* Pain */}
                <div>
                  <div className="w-10 h-10 bg-destructive/20 rounded-xl flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{item.pain}</p>
                  <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive text-xs font-semibold px-2.5 py-1 rounded-full">
                    <TrendingDown className="w-3.5 h-3.5" />
                    {item.painMetric}
                  </div>
                </div>

                {/* Connector */}
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <span className="h-px w-8 bg-border" />
                  <ArrowRight className="w-4 h-4" />
                  <span className="h-px w-8 bg-border" />
                </div>

                {/* Solution */}
                <div>
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-3">
                    <item.solutionIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">AI Solution</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{item.solution}</p>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {item.metric}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
           <Button 
             id= "painpoint-cta"
             variant="premium" 
             size="lg" 
             className="group"
             onClick={() => document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
           >
             Book My Free Automation Audit
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </div>
      </div>
    </section>
  );
};

export default PainSolution;