import PrivacyPolicyDialog from "./PrivacyPolicyDialog";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-section-sm bg-background border-t border-border/30 mb-20 md:mb-24">{/* Added bottom margin for sticky CTA */}
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <img src="/lovable-uploads/65fd72c0-6ead-4fcb-8ac7-2d2e11c3ee2e.png" alt="ProAgentz" className="h-12 w-auto" />
          </div>
          
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <PrivacyPolicyDialog>
              <button className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                Privacy Policy
              </button>
            </PrivacyPolicyDialog>
            <span>•</span>
            <span>© {currentYear} AI Automation. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;