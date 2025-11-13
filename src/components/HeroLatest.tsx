"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroLatest() {
  const heroRef = useRef<HTMLElement>(null);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('content-start');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const onScroll = () => {
      if (!heroRef.current) return;
      
      const y = window.scrollY;
      const raw = Math.min(Math.max(y / 220, 0), 1);
      const p = easeOutCubic(raw);
      
      // Dispara evento para o Header
      window.dispatchEvent(new CustomEvent("hero:progress", { detail: p } as any));
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen min-h-[600px] overflow-hidden bg-fju-dark"
      aria-label="Bem-vindo à FJU"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/capa.png"
          alt="FJU - Um espaço para tudo que está acontecendo"
          className="w-full h-full object-cover"
        />
        {/* Gradiente com sombreamento interno no topo usando o azul #031223 com transparência */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#031223cc] via-[#03122366] to-transparent pt-16" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031223cc] via-[#03122333] to-transparent" />
      </div>

      {/* Logo FJU */}
      <div className="absolute left-0 right-0 top-16 flex justify-center">
        <img
          src="/images/logo.png"
          alt="FJU"
          className="select-none"
          style={{ width: "min(55vw, 520px)", height: "auto" }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl animate-fade-in-up mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Um espaço para tudo que está acontecendo na FJU
          </h1>
        </div>
        
        {/* Seta para rolagem */}
        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-primary transition-colors"
          aria-label="Role para baixo"
        >
          <ChevronDown className="h-12 w-12 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
