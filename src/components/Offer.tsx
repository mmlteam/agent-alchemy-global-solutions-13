import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Clock, ArrowRight, Gift } from "lucide-react";
const Offer = () => {
  return <section className="py-section bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Offer Header */}
          <div className="space-y-6 animate-fade-in">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Gift className="w-4 h-4 mr-2" />
              Limited Time Offer
            </Badge>
            
            <h2 className="text-4xl lg:text-5xl font-bold">
              Get Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Free AI Workflow Audit
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover exactly how AI can transform your business with a personalized 30-minute consultation worth ₹10,000 - completely free.
            </p>
          </div>

          {/* Offer Details */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 animate-scale-in">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* What You Get */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">What You'll Receive:</h3>
                <ul className="space-y-4">
                  {["Custom AI roadmap for your business", "ROI projections & cost-benefit analysis", "Priority automation opportunities", "Implementation timeline & strategy", "Actionable next steps (yours to keep)"].map((item, index) => <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>)}
                </ul>
              </div>

              {/* Guarantee */}
              <div className="space-y-6">
                <div className="bg-primary/10 rounded-2xl p-6 text-center">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Our Guarantee</h4>
                  <p className="text-sm text-muted-foreground">
                    No obligations. No sales pressure. Keep the complete action plan even if you don't proceed.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Booking takes less than 2 minutes</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8 pt-8 border-t border-border/30">
              <Button id="workflow-audit-cta" variant="premium" size="lg" className="group w-full max-w-sm mx-auto" onClick={() => document.querySelector('#lead-form')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })}>
                Book My Free Automation Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Join 200+ tech leaders who've transformed their operations
              </p>
            </div>
            
            {/* Risk Reversal Badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-6 py-3 rounded-full border border-green-500/20">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">100% No-Obligation – keep the roadmap even if you don't proceed.</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>;
};
export default Offer;