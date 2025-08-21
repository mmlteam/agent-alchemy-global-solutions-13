import { Card } from "@/components/ui/card";
import { Bot, Workflow, MessageSquare, BarChart3, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Custom AI Agents",
    description: "Bespoke AI agents tailored to your specific business processes and requirements.",
    features: ["Natural Language Processing", "Machine Learning Models", "Custom Training Data"]
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "End-to-end workflow automation that connects all your business systems seamlessly.",
    features: ["API Integrations", "Multi-platform Support", "Real-time Monitoring"]
  },
  {
    icon: MessageSquare,
    title: "Customer Service Bots",
    description: "Intelligent chatbots that provide 24/7 customer support with human-like interactions.",
    features: ["Multi-language Support", "Sentiment Analysis", "Escalation Management"]
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Advanced analytics powered by AI to extract actionable insights from your data.",
    features: ["Predictive Analytics", "Real-time Dashboards", "Custom Reports"]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with compliance standards for enterprise-level deployments.",
    features: ["Data Encryption", "Access Controls", "Audit Trails"]
  },
  {
    icon: Zap,
    title: "Rapid Deployment",
    description: "Get your AI agents up and running in days, not months, with our proven methodology.",
    features: ["Quick Setup", "Training & Support", "Continuous Optimization"]
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Comprehensive{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Solutions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From intelligent chatbots to complex workflow automation, we deliver 
            enterprise-grade AI agents that transform how your business operates.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gradient-secondary border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-premium animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;