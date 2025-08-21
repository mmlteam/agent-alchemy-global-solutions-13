import { Card } from "@/components/ui/card";
import { TrendingUp, MessageSquare, DollarSign, ShoppingCart, Users, Shield } from "lucide-react";

const automationTypes = [
  {
    icon: TrendingUp,
    title: "Sales & CRM",
    description: "Auto-enrich leads and push to HubSpot"
  },
  {
    icon: MessageSquare,
    title: "Marketing Ops",
    description: "Sync ad-spend data into Slack + Notion report"
  },
  {
    icon: DollarSign,
    title: "Finance & Billing",
    description: "Auto-generate invoices in Xero, chase late payers"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Trigger WhatsApp shipping alerts & update inventory"
  },
  {
    icon: Users,
    title: "HR & Recruitment",
    description: "Screen CVs with GPT, schedule interviews in Google Cal"
  },
  {
    icon: Shield,
    title: "IT & Security Ops",
    description: "Automate user-provisioning, rotate passwords, trigger uptime alerts"
  }
];

const WhatWeAutomate = () => {
  return (
    <section className="py-12 lg:py-16 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            What We{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Automate
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world workflows we've already turned into self-running AI agents
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {automationTypes.map((item, index) => (
            <Card 
              key={index}
              className="p-6 border-border/50 hover:border-primary/50 hover:shadow-premium transition-all duration-300 animate-fade-in"
              style={{ 
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeAutomate;