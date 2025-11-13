"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-opacity ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="flex flex-col gap-3">
        {/* Back to top */}
        <button
          type="button"
          onClick={scrollTop}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full shadow-md"
          style={{ backgroundColor: "#b32b2b", color: "#ffffff" }}
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
