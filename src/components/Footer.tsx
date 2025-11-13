import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    sobre: [
      { label: "Quem Somos", href: "#" },
      { label: "Nossa História", href: "#" },
      { label: "Missão e Valores", href: "#" },
      { label: "Contato", href: "#" },
    ],
    conteudo: [
      { label: "Notícias", href: "#" },
      { label: "Eventos", href: "#" },
      { label: "Artigos", href: "#" },
      { label: "Multimídia", href: "#" },
    ],
    participe: [
      { label: "Seja Voluntário", href: "#" },
      { label: "Encontre uma FJU", href: "#" },
      { label: "Projetos Sociais", href: "#" },
      { label: "Doe", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="text-white" style={{ backgroundColor: "#133669" }}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/images/logo.png" alt="FJU" className="block" style={{ width: 56, height: "auto" }} />
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Transformando vidas através da fé, esperança e ação. 
              Juntos, construímos um futuro melhor.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Sobre Nós</h4>
            <ul className="space-y-2">
              {footerLinks.sobre.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-[#b32b2b] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Conteúdo</h4>
            <ul className="space-y-2">
              {footerLinks.conteudo.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-[#b32b2b] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Participe</h4>
            <ul className="space-y-2">
              {footerLinks.participe.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-[#b32b2b] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/80">
              © {currentYear} Força Jovem Universal. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-[#b32b2b] hover:text-white transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 

export default Footer;
