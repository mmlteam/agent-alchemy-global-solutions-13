import { Card } from "@/components/ui/card";

const clientLogos = [
  {
    name: "TechFlow Solutions",
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=100&fit=crop",
    industry: "Technology"
  },
  {
    name: "Global Manufacturing Inc",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
    industry: "Manufacturing"
  },
  {
    name: "FinanceForward",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&h=100&fit=crop",
    industry: "Finance"
  },
  {
    name: "E-commerce Dynamics",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=100&fit=crop",
    industry: "E-commerce"
  },
  {
    name: "HealthTech Innovations",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=100&fit=crop",
    industry: "Healthcare"
  },
  {
    name: "Smart Logistics",
    logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=100&fit=crop",
    industry: "Logistics"
  },
  {
    name: "EduTech Leaders",
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=100&fit=crop",
    industry: "Education"
  },
  {
    name: "Energy Solutions Pro",
    logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&h=100&fit=crop",
    industry: "Energy"
  },
  {
    name: "RetailMax Corp",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=100&fit=crop",
    industry: "Retail"
  },
  {
    name: "AgriTech Innovations",
    logo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=100&fit=crop",
    industry: "Agriculture"
  },
  {
    name: "MediaStream Plus",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=100&fit=crop",
    industry: "Media"
  },
  {
    name: "CloudFirst Systems",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
    industry: "Cloud Services"
  }
];

const industries = [
  "Fortune 500 Companies",
  "Scale-ups & Unicorns", 
  "Government Agencies",
  "Healthcare Systems",
  "Financial Institutions",
  "Manufacturing Leaders"
];

const ClientLogos = () => {
  return (
    <section className="py-24 bg-gradient-secondary border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Trusted by{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From startups to Fortune 500 companies, organizations worldwide trust us 
            to deliver AI solutions that drive real business results.
          </p>
        </div>

        {/* Industry Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="text-center p-4 bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-sm font-medium text-primary">{industry}</div>
            </div>
          ))}
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clientLogos.map((client, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/20 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-3">
                <div className="aspect-[2/1] bg-muted/20 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">{client.name}</div>
                  <div className="text-xs text-muted-foreground">{client.industry}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-border/30">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "600ms" }}>
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Global Clients</div>
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "700ms" }}>
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Industries Served</div>
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "800ms" }}>
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Client Retention</div>
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "900ms" }}>
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Global Support</div>
            </div>
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "1000ms" }}>
          <div className="bg-gradient-primary/10 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="text-2xl font-bold">Ready to join our success stories?</div>
              <div className="text-muted-foreground">
                Let's explore how our AI agents can transform your business operations and drive measurable results.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;