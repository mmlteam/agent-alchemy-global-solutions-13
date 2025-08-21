import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, DollarSign, Users, Cpu, Globe } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "300% Productivity Boost",
    description: "Automate repetitive tasks and free your team to focus on strategic initiatives.",
    metric: "300%"
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description: "AI agents work around the clock, ensuring continuous business operations.",
    metric: "24/7"
  },
  {
    icon: DollarSign,
    title: "Cost Reduction",
    description: "Reduce operational costs by up to 60% through intelligent automation.",
    metric: "60%"
  },
  {
    icon: Users,
    title: "Enhanced CX",
    description: "Deliver exceptional customer experiences with instant, accurate responses.",
    metric: "98%"
  },
  {
    icon: Cpu,
    title: "Scalable Solutions",
    description: "Scale your operations instantly without hiring additional resources.",
    metric: "∞"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serve customers worldwide with multi-language AI agent capabilities.",
    metric: "50+"
  }
];

const Benefits = () => {
  return (
    <section className="py-12 lg:py-16 bg-secondary/20">
      <div className="container mx-auto px-6">
        {/* Zig-zag feature layout */}
        <div className="space-y-12 lg:space-y-20 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-in ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">{benefit.metric}</div>
                    <div className="text-sm text-muted-foreground">Improvement</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{benefit.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <Card className="p-8 bg-gradient-secondary border-border/50 h-48 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <benefit.icon className="w-16 h-16 text-primary mx-auto" />
                    <div className="text-4xl font-bold text-primary">{benefit.metric}</div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;