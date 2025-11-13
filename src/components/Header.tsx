"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0); // 0 topo -> 1 colado

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onHero = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === "number") setHeroProgress(detail);
    };
    window.addEventListener("hero:progress", onHero as any);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hero:progress", onHero as any);
    };
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Movimentos", href: "#movimentos" },
    { label: "Ação Social", href: "#acao-social" },
    { label: "Dicas", href: "#dicas" },
    { label: "Eventos", href: "#eventos" },
  ];

  // Verifica se está na página de post
  const isPostPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/materia/');
  
  // Define as classes base do header
  const headerBaseClasses = "fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-200";
  
  // Define as classes condicionais
  let headerClasses = headerBaseClasses;
  
  if (isPostPage) {
    // Na página de post, sempre usa fundo branco e texto #26365d
    headerClasses += " bg-white text-[#26365d] shadow-sm";
  } else if (scrolled) {
    // Na home, quando scrolled, usa fundo branco e texto #26365d
    headerClasses += " bg-white text-[#26365d] shadow-sm";
  } else {
    // Na home, no topo, usa fundo transparente e texto branco com mais contraste
    headerClasses += " bg-transparent text-white";
  }
  
  return (
    <header className={headerClasses}>
      <div className="container mx-auto">
        <div className="flex items-center h-16 px-4">
          {/* Logo */}
          {(scrolled || isPostPage) && (
            <a
              href="/"
              className="flex items-center space-x-3"
              style={{
                opacity: 1,
              }}
            >
              <img id="header-logo" src="/images/logo.png" alt="FJU" className="block" style={{ width: 40, height: 'auto' }} />
            </a>
          )}

          {/* Desktop Navigation */}
          <nav
            className={`hidden lg:flex flex-1 justify-center items-center ${
              scrolled ? "gap-6" : heroProgress < 0.5 ? "gap-12" : "gap-8"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (isPostPage) {
                    e.preventDefault();
                    // Se for a home, vai direto para a raiz
                    if (item.href === '#home') {
                      window.location.href = '/';
                    } else {
                      // Para outras seções, vai para a raiz com o hash da seção
                      window.location.href = `/${item.href}`;
                    }
                  }
                }}
                className={scrolled || isPostPage
                  ? `px-3 py-2 font-medium transition-colors hover:text-[#b32b2b] ${isPostPage ? 'text-[#26365d]' : ''}`
                  : "px-3 py-2 font-semibold text-white/90 hover:text-white transition-colors"}
                style={{
                  letterSpacing: scrolled || isPostPage ? 'normal' : `${(1 - Math.min(1, Math.max(0, heroProgress))) * 0.02}em`,
                  fontSize: scrolled || isPostPage ? '1rem' : `calc(0.9rem + ${(1 - heroProgress) * 0.1}rem)`,
                  color: scrolled || isPostPage ? 'inherit' : undefined,
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={`lg:hidden ${scrolled ? "border-t border-transparent bg-primary text-primary-foreground" : "bg-black/40 backdrop-blur-sm"} animate-fade-in`}>
            <div className="py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={scrolled
                    ? "block px-4 py-3 text-base font-medium transition-colors"
                    : "block px-4 py-3 text-base font-semibold text-white/90 hover:text-white transition-colors"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
