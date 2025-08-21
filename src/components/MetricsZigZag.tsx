import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, DollarSign, BarChart3 } from "lucide-react";

const metricsData = [
  {
    id: 1,
    layout: 'full-left',
    title: "98% Enhanced CX",
    description: "Customers rate AI support 4.9★",
    icon: TrendingUp,
    metric: "4.9★ rating"
  },
  {
    id: 2,
    layout: 'icon-right',
    title: "∞",
    icon: BarChart3,
    metric: "Scalable Ops"
  },
  {
    id: 3,
    layout: 'full-left',
    title: "50+ Global Regions", 
    description: "Multi-language agents in 50+ locales",
    icon: DollarSign,
    metric: "50+ locales"
  },
  {
    id: 4,
    layout: 'icon-right',
    title: "< 30",
    icon: Clock,
    metric: "Day Launch"
  },
  {
    id: 5,
    layout: 'full-left',
    title: "99.9% Uptime SLA",
    description: "Agents run round-the-clock",
    icon: BarChart3,
    metric: "Always on"
  },
  {
    id: 6,
    layout: 'icon-right',
    title: "AES-256",
    icon: DollarSign,
    metric: "Security"
  }
];

const MetricsZigZag = () => {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Measurable{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real metrics from real AI automation implementations
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {metricsData.reduce((rows, metric, index) => {
            const isEvenRow = Math.floor(index / 2) % 2 === 0;
            const isLeftPosition = index % 2 === 0;
            
            if (index % 2 === 0) {
              rows.push([metric]);
            } else {
              rows[rows.length - 1].push(metric);
            }
            
            return rows;
          }, []).map((rowPair, rowIndex) => (
            <div key={rowIndex} className="grid lg:grid-cols-2 gap-8 items-center">
              {rowPair.map((metric, posIndex) => {
                const isIconOnly = metric.layout === 'icon-right';
                const IconComponent = metric.icon;
                
                return isIconOnly ? (
                  <Card key={metric.id} className="p-6 border-border/50 hover:border-primary/50 hover:scale-105 transition-all duration-300 animate-fade-in text-center"
                        style={{ animationDelay: `${(rowIndex * 2 + posIndex) * 200}ms` }}>
                    <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{metric.title}</div>
                    <div className="text-sm text-muted-foreground">{metric.metric}</div>
                  </Card>
                ) : (
                  <Card key={metric.id} className="p-8 border-border/50 hover:border-primary/50 hover:shadow-premium transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${(rowIndex * 2 + posIndex) * 200}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">{metric.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {metric.description}
                        </p>
                        <div className="text-sm font-semibold text-primary">{metric.metric}</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsZigZag;