import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "The AI agents transformed our customer service completely. We went from 12-hour response times to instant, accurate responses. Our customer satisfaction scores increased by 40% in just 3 months.",
    rating: 5,
    results: "40% increase in customer satisfaction"
  },
  {
    name: "Michael Rodriguez",
    role: "VP of Operations",
    company: "Global Manufacturing Inc",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Implementation was seamless and the results were immediate. The AI agents handle 80% of our routine processes autonomously, freeing our team to focus on strategic initiatives.",
    rating: 5,
    results: "80% process automation achieved"
  },
  {
    name: "Emily Thompson",
    role: "Head of Digital Innovation",
    company: "FinanceForward",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    content: "The level of customization and intelligence in these AI agents is remarkable. They understand our complex financial workflows and adapt in real-time. ROI was evident within weeks.",
    rating: 5,
    results: "300% ROI in first quarter"
  },
  {
    name: "David Park",
    role: "CEO",
    company: "E-commerce Dynamics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Our e-commerce platform processes 10x more orders with the same team size. The AI agents handle everything from inventory management to customer queries flawlessly.",
    rating: 5,
    results: "10x order processing capacity"
  },
  {
    name: "Lisa Wang",
    role: "Chief Digital Officer",
    company: "HealthTech Innovations",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
    content: "In healthcare, accuracy and compliance are paramount. These AI agents meet the highest standards while dramatically improving our operational efficiency.",
    rating: 5,
    results: "99.9% accuracy maintained"
  },
  {
    name: "Robert Kim",
    role: "Director of Technology",
    company: "Smart Logistics",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "The predictive capabilities of these AI agents have revolutionized our supply chain. We now anticipate issues before they occur and optimize routes in real-time.",
    rating: 5,
    results: "25% cost reduction in logistics"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-sm">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-accent font-medium">Client Success Stories</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold">
            What Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how leading companies are transforming their operations with our AI agents. 
            Real results from real businesses across industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[1000px] md:min-h-[750px] lg:min-h-[420px]">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-4 sm:p-6 bg-gradient-secondary border-border/50 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              
              <div className="space-y-3 sm:space-y-4 relative z-10 flex-1 flex flex-col">
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-accent fill-accent" />
                  ))}
                </div>
                
                {/* Content */}
                <blockquote className="text-xs sm:text-base text-foreground leading-relaxed flex-1">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="mt-auto space-y-3 sm:space-y-4">
                  {/* Results highlight */}
                  <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                    <div className="text-xs sm:text-sm font-medium text-primary">{testimonial.results}</div>
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-border/30">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm sm:text-base font-semibold">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-primary">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "800ms" }}>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="text-2xl font-bold">Join 500+ satisfied clients</div>
              <div className="text-muted-foreground">
                Ready to transform your business with AI agents? Let's discuss your specific needs.
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Custom solution design</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Risk-free trial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;