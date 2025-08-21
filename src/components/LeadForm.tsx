import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Users, Building, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PrivacyPolicyDialog from "./PrivacyPolicyDialog";

const LeadForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companySize: "",
    challenge: "",
    gdprConsent: false
  });
  
  // Enhanced validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const suspiciousDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
    
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    
    const domain = email.split('@')[1];
    if (suspiciousDomains.includes(domain)) {
      return 'Please use a business email address';
    }
    
    return null;
  };
  
  const validatePhone = (phone: string) => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10) return 'Phone number must be at least 10 digits';
    if (cleanPhone.length > 15) return 'Phone number cannot exceed 15 digits';
    if (!/^[\d\s\-\+\(\)]+$/.test(phone)) return 'Phone number contains invalid characters';
    
    return null;
  };
  
  const validateName = (name: string) => {
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (name.length > 50) return 'Name cannot exceed 50 characters';
    if (!/^[a-zA-Z\s\-\.]+$/.test(name)) return 'Name contains invalid characters';
    
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, companySize: value }));
  };

  const handleNext = async () => {
    // Enhanced validation for step 1
    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phone);
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (nameError) {
      toast({
        title: "Invalid Name",
        description: nameError,
        variant: "destructive",
      });
      return;
    }
    
    if (phoneError) {
      toast({
        title: "Invalid Phone Number",
        description: phoneError,
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate UUID client-side
      const newLeadId = crypto.randomUUID();
      
      // Save step 1 data to database - only name, phone, step_completed
      const { data: insertData, error } = await supabase
        .from('leads')
        .insert({
          id: newLeadId,
          name: formData.name,
          phone: formData.phone,
          step_completed: 1
        })
        .select();

      if (error) {
        console.error('Error saving lead:', error);
        toast({
          title: "Error",
          description: `Database error: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      // Store the lead ID for updating in step 2
      setLeadId(newLeadId);
      setStep(2);
      
      toast({
        title: "Information saved",
        description: "Your contact details have been saved. Please complete the remaining fields.",
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation for step 2
    const emailError = validateEmail(formData.email);
    
    if (!formData.email || !formData.gdprConsent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and accept our privacy policy.",
        variant: "destructive",
      });
      return;
    }
    
    if (emailError) {
      toast({
        title: "Invalid Email",
        description: emailError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('=== STEP 2 FORM SUBMISSION DEBUG ===');
      console.log('Lead ID:', leadId);
      console.log('Form data:', formData);
      console.log('Update payload:', { 
        email: formData.email, 
        company_size: formData.companySize, 
        challenge: formData.challenge,
        step_completed: 2
      });

      // Update the lead with complete information
      console.log('About to execute update with leadId:', leadId, typeof leadId);
      
      const { data: updateData, error: updateError } = await supabase
        .from('leads')
        .update({
          email: formData.email,
          company_size: formData.companySize,
          challenge: formData.challenge,
          step_completed: 2
        })
        .eq('id', leadId)
        .select(); // Add select to see what was updated

      console.log('Update result:', { data: updateData, error: updateError });
      console.log('=== END DEBUG ===');

      if (updateError) {
        console.error('Error updating lead:', updateError);
        toast({
          title: "Error",
          description: "Failed to save your information. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Send email notification to your team
      try {
        const { data: functionData, error: functionError } = await supabase.functions
          .invoke('send-lead-notification', {
            body: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              company_size: formData.companySize,
              challenge: formData.challenge,
              leadId: leadId
            }
          });

        if (functionError) {
          console.error('Error sending email:', functionError);
          // Edge function will handle email status updates
        }
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Edge function will handle email status updates
      }

      // Mark form as completed
      setIsFormCompleted(true);
      localStorage.setItem('form-submitted', 'true');
      
      toast({
        title: "Thank you!",
        description: "Our team will contact you within 12 hours.",
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error booking consultation",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add keyboard event handling for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        if (step === 1) {
          e.preventDefault();
          const step1Button = document.getElementById('step1-form-cta');
          if (step1Button && !step1Button.hasAttribute('disabled')) {
            step1Button.click();
          }
        } else if (step === 2) {
          e.preventDefault();
          const step2Button = document.getElementById('step2-form-submit-cta');
          if (step2Button && !step2Button.hasAttribute('disabled')) {
            step2Button.click();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  return (
    <section className="py-section bg-background sticky bottom-0 z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl lg:max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold lg:whitespace-nowrap">
              Book Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Free Automation Audit
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Get your personalized automation roadmap in just 2 steps
            </p>
          </div>

          <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20 animate-scale-in">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                </div>
                <span className="text-sm font-medium hidden sm:inline">Contact Info</span>
              </div>
              
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                ></div>
              </div>
              
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium hidden sm:inline">Business Details</span>
              </div>
            </div>

            {isFormCompleted ? (
              <div className="text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Thank You!</h3>
                <p className="text-lg text-muted-foreground">
                  We've received your information and our team will contact you within the next 12 hours to schedule your free automation audit.
                </p>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>What's next?</strong> Our automation expert will analyze your current processes and prepare a customized roadmap for your business.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                <div className="space-y-6 animate-fade-in">
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
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+91 98765 43210"
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                   <Button 
                     id="step1-form-cta"
                     type="button"
                     onClick={handleNext}
                     variant="premium" 
                     size="lg" 
                     className="w-full group"
                     disabled={!formData.name || !formData.phone || isSubmitting}
                   >
                     {isSubmitting ? "Saving..." : "Continue to Business Details"}
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="name@company.com"
                        className="border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Company Size</Label>
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="border-border/50 focus:border-primary">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-1000">201-1000 employees</SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="challenge">Main Challenge (≤ 100 chars)</Label>
                      <Textarea
                        id="challenge"
                        name="challenge"
                        value={formData.challenge}
                        onChange={handleInputChange}
                        placeholder="Describe your main challenge with manual processes..."
                        className="min-h-[80px] border-border/50 focus:border-primary"
                        maxLength={100}
                        aria-label="Describe your main automation challenge"
                      />
                      <div className="text-xs text-muted-foreground text-right">
                        {formData.challenge.length}/100 characters
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-4">
                    <Checkbox
                      id="gdpr"
                      checked={formData.gdprConsent}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, gdprConsent: checked as boolean }))
                      }
                    />
                    <Label htmlFor="gdpr" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <PrivacyPolicyDialog>
                        <button type="button" className="text-primary hover:underline underline-offset-2">
                          Privacy Policy
                        </button>
                      </PrivacyPolicyDialog>{" "}
                      and consent to being contacted about AI automation services.
                    </Label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      id ="step2-form-back-cta"
                      type="button"
                      onClick={() => setStep(1)}
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:flex-1"
                    >
                      Back
                    </Button>
                    
                    <Button 
                      id ="step2-form-submit-cta"
                      type="submit"
                      variant="premium" 
                      size="lg" 
                      className="w-full sm:flex-2 group"
                      disabled={isSubmitting || !formData.gdprConsent}
                      aria-label="Book My Free Automation Audit"
                    >
                      <span className="text-center leading-tight">
                        {isSubmitting ? "Booking..." : "Book My Free Automation Audit"}
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </Button>
                  </div>
                  </div>
                )}
              </form>
            )}

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border/30 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No obligations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>GDPR compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>2-min setup</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/50 lg:hidden z-20">
        <Button 
          variant="premium" 
          size="lg" 
          className="w-full group"
          onClick={() => document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          Book My Free Automation Audit
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default LeadForm;