import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const logos = [
  { name: "dentsu", logo: "/lovable-uploads/89e62100-337d-4e06-a2e9-425267fc7cee.png" },
  { name: "HETERO", logo: "/lovable-uploads/72684f76-5a1c-4da1-a9ab-aa8f22868e38.png" },
  { name: "XP-PEN", logo: "/lovable-uploads/88e0d2bb-c4e5-4e37-9d08-d6699e648ea0.png" },
  { name: "KEM Hospital", logo: "/lovable-uploads/bf7d486e-c630-4c17-b798-3d8e6c857426.png" },
  { name: "LTMGH Hospital", logo: "/lovable-uploads/e94ebc51-7780-4b18-9e4d-58343533f2c8.png" },
  { name: "MEOGEM", logo: "/lovable-uploads/eaf9a3d1-22fd-4e6f-9f59-1e0c506dc884.png" }
];

const testimonials = [
  {
    quote: "Wasn't expecting much at first, but the system started picking up patterns in our patient data we'd never noticed. Helped our research team focus better and actually saved us hours every week.",
    name: "Dr. Sameer Kulkarni",
    role: "Head of Research, LTMGH Hospital",
    image: "SK"
  },
  {
    quote: "The ROI was evident within the first month of implementation. What used to take our team 3-4 hours daily now happens automatically in under 30 minutes. We've redirected that saved time toward strategic initiatives that actually drive revenue growth.",
    name: "Michael Rodriguez",
    role: "Head of Operations at InnovateAI",
    image: "MR"
  },
  {
    quote: "We used to spend hours every week manually compiling patient and operations data. ProAgentz's automation cut that time by 80%. Now, our staff can focus more on patient care than paperwork.",
    name: "Dr. Rina Mehra",
    role: "Operations Lead at KEM",
    image: "RM"
  }
];

const SocialProof = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-section-sm bg-secondary/10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-6">Why innovators choose us</p>
          
          {/* Client Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            {logos.map((client, index) => (
              <div 
                key={index}
                className="w-16 h-16 bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rotating Testimonial */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50 text-center animate-fade-in h-[440px] md:h-auto">
            <div className="h-full md:space-y-6 flex flex-col md:block">
              <Quote className="w-8 h-8 md:w-12 md:h-12 text-primary mx-auto opacity-50 mb-4 md:mb-0" />
              
              {/* Quote section with calculated mobile height for longest testimonial */}
              <div className="flex-1 md:flex-none flex items-center justify-center mb-4 md:mb-0">
                <blockquote className="text-base md:text-lg lg:text-2xl font-medium leading-relaxed md:min-h-[140px]">
                  <div className="md:hidden">
                    "{testimonials[currentTestimonial].quote}"
                  </div>
                  <div className="hidden md:block">
                    "{testimonials[currentTestimonial].quote}"
                  </div>
                </blockquote>
              </div>
              
              {/* Author info - anchored to bottom on mobile */}
              <div className="mt-auto md:mt-0">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center text-sm font-semibold">
                    {testimonials[currentTestimonial].image}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm md:text-base">{testimonials[currentTestimonial].name}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </div>
          </Card>
          
          {/* Testimonial Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-border hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;