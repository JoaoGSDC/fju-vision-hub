"use client";

import { Button } from "@/components/ui/button";
import { Instagram, Youtube } from "lucide-react";

const links = [
  { label: "Instagram FJU", href: "https://www.instagram.com/forcajovemuniversal/", icon: Instagram },
  { label: "YouTube FJU", href: "https://www.youtube.com/@forcajovemuniversal", icon: Youtube },
  { label: "HELP Oficial", href: "https://www.instagram.com/helpfju/", icon: Instagram },
  { label: "Esporte FJU", href: "https://www.instagram.com/esportefju/", icon: Instagram },
  { label: "Universitários FJU", href: "https://www.instagram.com/unifju/", icon: Instagram },
];

export default function ChannelsBar() {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex gap-3 min-w-max">
        {links.map((l) => (
          <Button
            asChild
            key={l.label}
            className="gap-2 px-4 py-2 border-0 bg-primary text-primary-foreground
            transition-all hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(239,68,68,0.25)]"
            variant="default"
          >
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              <l.icon className="h-4 w-4" />
              {l.label}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
