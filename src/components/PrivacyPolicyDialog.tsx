import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyDialogProps {
  children: React.ReactNode;
}

const PrivacyPolicyDialog = ({ children }: PrivacyPolicyDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. This may include your name, email address, phone number, company name, and any other information you choose to provide.</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Information Sharing</h3>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy. We may share your information with:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Service providers who assist us in operating our website and conducting business</li>
                <li>Legal authorities when required by law or to protect our rights</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Data Security</h3>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Cookies and Tracking</h3>
              <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Access, update, or delete your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request that we limit processing of your personal information</li>
                <li>Request transfer of your personal information</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Third-Party Links</h3>
              <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Children's Privacy</h3>
              <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Changes to This Policy</h3>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Contact Us</h3>
              <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:hello@makemelive.in" className="text-primary hover:underline">hello@makemelive.in</a></p>
            </div>

            <div className="text-xs text-muted-foreground mt-6 pt-4 border-t">
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyDialog;