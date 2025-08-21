import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Award, Shield, Star, Users, TrendingUp, Clock } from "lucide-react";

const trustElements = [
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Award-winning AI solutions recognized by leading industry bodies",
    badges: ["AI Excellence Award 2024", "Innovation Leader", "Best Enterprise Solution"]
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security with global compliance standards",
    badges: ["SOC 2 Certified", "GDPR Compliant", "ISO 27001"]
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "AI specialists with 10+ years experience from leading tech companies",
    badges: ["PhD AI Researchers", "Ex-Google/Microsoft", "Published Authors"]
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Consistent delivery of measurable business outcomes",
    badges: ["98% Success Rate", "50M+ Transactions", "99.9% Uptime"]
  }
];

const certifications = [
  { name: "Microsoft AI Partner", level: "Gold" },
  { name: "AWS ML Competency", level: "Advanced" },
  { name: "Google Cloud AI", level: "Premier" },
  { name: "Salesforce AI Partner", level: "Platinum" }
];

const Trust = () => {
  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Trusted by Industry Leaders</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold">
            Built on{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Trust & Expertise
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our team of AI experts brings decades of experience from the world's leading 
            technology companies, delivering solutions you can rely on.
          </p>
        </div>

        {/* Trust Elements */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {trustElements.map((element, index) => (
            <Card 
              key={index} 
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <element.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{element.title}</h3>
                    <p className="text-muted-foreground text-sm">{element.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {element.badges.map((badge, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="space-y-8 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Strategic Partnerships & Certifications</h3>
            <p className="text-muted-foreground">Certified by the world's leading AI and cloud platforms</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-4 bg-card/30 backdrop-blur-sm border-border/30 text-center group hover:border-primary/30 transition-all duration-300">
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{cert.name}</div>
                    <div className="text-xs text-primary">{cert.level}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/30">
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: "800ms" }}>
            <div className="text-3xl font-bold text-primary">10+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: "900ms" }}>
            <div className="text-3xl font-bold text-primary">150+</div>
            <div className="text-sm text-muted-foreground">AI Projects Delivered</div>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: "1000ms" }}>
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Enterprise Clients</div>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: "1100ms" }}>
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Expert Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;