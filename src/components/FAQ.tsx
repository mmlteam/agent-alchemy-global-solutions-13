import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What do Automation & AI Agents actually do?",
    answer: "Automation syncs data and triggers workflows (e.g., CRM updates). AI Agents handle tasks like customer queries, lead qualification, or drafting emails."
  },
  {
    question: "How long does it take to implement?",
    answer: "Simple automations go live in 2–4 weeks. AI agents typically 4–8 weeks. We'll share a clear plan after your free audit."
  },
  {
    question: "Will this work with our existing tools?",
    answer: "Yes. We integrate with CRMs, ERPs, and 1500+ apps via Make, Zapier, and APIs (HubSpot, Salesforce, Slack, Google Workspace, etc.)."
  },
  {
    question: "What results can we expect?",
    answer: "Typical outcomes: 30–60% cost reduction, 2–3x faster delivery, fewer errors, and better customer response times."
  },
  {
    question: "Is our data secure?",
    answer: "Bank‑grade security with encryption, least‑privilege access, audit logs. Deploy in your VPC if required. GDPR/CCPA compliant."
  },
  {
    question: "Do we need in‑house developers?",
    answer: "No. We design, build, deploy, and train your team. You own the stack and we provide documentation."
  },
  {
    question: "What does it cost and what's the ROI?",
    answer: "Based on scope. Most clients see ROI in 30–90 days. Your free audit includes a cost‑benefit model."
  },
  {
    question: "How does maintenance work?",
    answer: "30‑day optimisation included. Optional monthly SLA for monitoring, updates, and improvements."
  },
  {
    question: "Examples for our use case?",
    answer: "Automation: auto‑sync CRM, invoice reconciliation. AI Agents: L1 support, meeting summaries, lead scoring, SOP enforcement."
  },
  {
    question: "How scalable is this?",
    answer: "Architected to scale from one workflow to hundreds. We use modular blueprints and versioned pipelines."
  }
];

const FAQ = () => {
  return (
    <section className="py-section bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Frequently Asked{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Get answers to common questions about AI automation
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/30">
                  <AccordionTrigger className="text-left hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Still have questions? Let's discuss your specific needs.
            </p>
            <Button 
              id = "faq-cta"
              variant="premium" 
              size="lg" 
              className="group"
              onClick={() => document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              aria-label="Get My Free Consultation"
            >
              Get My Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;