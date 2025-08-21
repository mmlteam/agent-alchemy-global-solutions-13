import { Card } from "@/components/ui/card";
import { Search, Lightbulb, Cog, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery & Analysis",
    description: "We analyze your current processes, identify automation opportunities, and define clear objectives for maximum impact.",
    timeline: "Week 1-2"
  },
  {
    icon: Lightbulb,
    title: "Strategy & Design",
    description: "Our experts design custom AI agent solutions tailored to your specific business requirements and goals.",
    timeline: "Week 2-3"
  },
  {
    icon: Cog,
    title: "Development & Training",
    description: "We build, train, and rigorously test your AI agents using your data and real-world scenarios.",
    timeline: "Week 3-6"
  },
  {
    icon: Rocket,
    title: "Deployment & Optimization",
    description: "We deploy your AI agents and continuously optimize their performance for maximum efficiency and ROI.",
    timeline: "Week 6+"
  }
];

const Process = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Our Proven{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Implementation Process
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From initial consultation to full deployment, we guide you through 
            every step of your AI automation journey with precision and expertise.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card 
                key={index} 
                className="p-6 bg-gradient-secondary border-border/50 hover:border-primary/50 transition-all duration-300 group relative animate-fade-in hover:shadow-premium"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-accent font-medium">{step.timeline}</div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;