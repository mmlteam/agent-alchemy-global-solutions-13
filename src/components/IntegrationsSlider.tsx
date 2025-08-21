import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const logos = [
  { name: "Zoho CRM", src: "/lovable-uploads/72b85b33-9784-49bf-b0e2-166b3e6d2371.png" },
  { name: "HubSpot", src: "/lovable-uploads/c45d9bb5-c588-4dd7-b2e2-7632fb30e3a4.png" },
  { name: "QuickBooks", src: "/lovable-uploads/dba629bc-bc3e-472f-8177-867654f07449.png" },
  { name: "Salesforce", src: "/lovable-uploads/9e219071-d02e-4413-bb93-6d457e25b797.png" },
  { name: "Pipedrive", src: "/lovable-uploads/7872d575-4875-4f7b-a138-ab07a3b178c5.png" },
  { name: "Trello", src: "/lovable-uploads/0fbce304-a998-4f18-a3f1-f81456d35239.png" },
  { name: "Slack", src: "/lovable-uploads/986f96ef-cc8e-46fd-abdc-13cb767339ca.png" },
  { name: "Google Workspace", src: "/lovable-uploads/add4a2f4-b8d2-41fb-8b2f-a8fd19eccc89.png" },
  { name: "Microsoft Teams", src: "/lovable-uploads/6e55cbb3-abe5-427c-b4bd-fa220226b562.png" },
  { name: "Asana", src: "/lovable-uploads/a35163ae-d2fe-4f5e-886f-ec7745ddc8a4.png" },
  { name: "ClickUp", src: "/lovable-uploads/8856ae3b-f59f-4883-8536-882b9357b352.png" },
  { name: "Monday.com", src: "/lovable-uploads/184f292c-91ae-47f8-9fc3-68330f8a68b3.png" },
  { name: "Notion", src: "/lovable-uploads/f29e98ac-7d37-4bc4-a047-9d98114858d8.png" },
  { name: "Airtable", src: "/lovable-uploads/6cc6edae-2b4c-45de-bb79-7c552ced00a2.png" },
  { name: "Shopify", src: "/lovable-uploads/215710cc-d035-499b-943d-d8ee7e547bf9.png" },
  { name: "WooCommerce", src: "/lovable-uploads/fc98c4be-e1e7-4a2e-b2b5-fcb7e931ac59.png" },
  { name: "Stripe", src: "/lovable-uploads/61076f60-994c-4e59-94f0-a05f06bc0417.png" },
  { name: "PayPal", src: "/lovable-uploads/3e9d37e6-f940-4a57-a0a8-b92015ab14ec.png" },
  { name: "Make.com", src: "/lovable-uploads/083ffaab-cc46-46a9-8086-001b91bbc1f2.png" },
  { name: "Zapier", src: "/lovable-uploads/9fd92014-bdac-4a97-a6f1-d7fbc5ff1776.png" },
  { name: "n8n", src: "/lovable-uploads/0c262531-2c9b-4691-a331-200dc1985d31.png" },
  { name: "SAP", src: "/lovable-uploads/153f5e23-3b96-4384-8d2e-1cf3c46248ad.png" },
  { name: "+ More" },
];

function LogoTile({ name, src }: { name: string; src?: string }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgOk, setImgOk] = useState(Boolean(src));

  return (
    <Card className="aspect-[2/1] flex items-center justify-center border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      {imgOk && src ? (
        <img
          ref={imgRef}
          src={src}
          alt={`${name} logo`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="text-sm text-muted-foreground font-medium text-center px-2">{name}</span>
      )}
    </Card>
  );
}

export default function IntegrationsSlider() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api || isPaused) return;
    const id = setInterval(() => {
      api.scrollNext();
    }, 2200);
    return () => clearInterval(id);
  }, [api, isPaused]);

  return (
    <section className="py-section bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">We integrate with all major CRMs, tools, and software</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto md:whitespace-nowrap">
            From leading automation platforms to your favourite business tools — if it's out there, we can connect to it.
          </p>
        </div>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          <Carousel opts={{ loop: true, align: "start" }} setApi={(a) => setApi(a)}>
            <CarouselContent>
              {logos.map((logo, idx) => (
                <CarouselItem key={idx} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/6">
                  <div className="p-3">
                    <LogoTile name={logo.name} src={logo.src} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-4" aria-label="Previous logos" />
            <CarouselNext className="hidden md:flex right-4" aria-label="Next logos" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
