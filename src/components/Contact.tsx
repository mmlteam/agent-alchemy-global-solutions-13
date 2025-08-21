import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Calendar, Mail, Phone, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Ready to{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Transform
                </span>{" "}
                Your Business?
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Tell us about your project and we'll get back to you within 24 hours 
                with a custom AI automation strategy.
              </p>
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your automation needs, current challenges, and goals..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>
            
            {/* Contact methods */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card/30 rounded-xl border border-border/30">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Email Us</div>
                  <div className="text-xs text-muted-foreground">hello@aiagents.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card/30 rounded-xl border border-border/30">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Call Us</div>
                  <div className="text-xs text-muted-foreground">+1 (555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card/30 rounded-xl border border-border/30">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Live Chat</div>
                  <div className="text-xs text-muted-foreground">Available 24/7</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features highlight */}
          <div className="space-y-6 animate-scale-in">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button variant="premium" size="lg" className="group">
                Schedule Free Consultation
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Button>
              
              <Button variant="hero" size="lg" className="group">
                Get Custom Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-semibold mb-4">What You Get:</h3>
              <ul className="space-y-3">
                {[
                  "Free 30-minute strategy consultation",
                  "Custom AI automation roadmap",
                  "ROI analysis and projections",
                  "Implementation timeline",
                  "Dedicated project manager",
                  "24/7 support and monitoring"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card className="p-6 bg-gradient-primary/10 border-primary/20">
              <div className="text-center space-y-3">
                <div className="text-2xl font-bold text-primary">⚡ Limited Time Offer</div>
                <p className="text-sm text-muted-foreground">
                  Book your consultation this month and receive a 
                  <span className="text-primary font-semibold"> free AI readiness assessment</span> worth ₹2,50,000
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/30 border-border/30">
              <h3 className="text-lg font-semibold mb-4 text-primary">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Proven Track Record</div>
                    <div className="text-xs text-muted-foreground">500+ successful AI implementations</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Industry Expertise</div>
                    <div className="text-xs text-muted-foreground">15+ years in automation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Global Reach</div>
                    <div className="text-xs text-muted-foreground">Serving clients in 50+ countries</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Fast Response</div>
                    <div className="text-xs text-muted-foreground">24-hour response guarantee</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-secondary/20 border-secondary/30">
              <div className="text-center space-y-3">
                <div className="text-lg font-semibold">🚀 Ready to Start?</div>
                <p className="text-sm text-muted-foreground">
                  Join the AI revolution today. Let's build the future of your business together.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Our team is online now</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;