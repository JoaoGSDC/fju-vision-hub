"use client";

import Link from "next/link";
import Image from "next/image";

type Project = {
  title: string;
  image: string; // path em /public/images/bandeiras
  href: string;  // link para a publicação
};

// Mapeamento dos projetos com suas respectivas imagens de bandeira
const projects: Project[] = [
  { 
    title: "Universitários", 
    image: "/images/bandeiras/UNIVERSITARIO.jpg", 
    href: "/materia/1" 
  },
  { 
    title: "Mídia", 
    image: "/images/bandeiras/MIDIA.png", 
    href: "/materia/2" 
  },
  { 
    title: "HELP", 
    image: "/images/bandeiras/HELP.png", 
    href: "/materia/3" 
  },
  { 
    title: "Arcanjos", 
    image: "/images/bandeiras/ARCANJOS.png", 
    href: "/materia/4" 
  },
  { 
    title: "Uniforça", 
    image: "/images/bandeiras/UNIFORÇA.png", 
    href: "/materia/5" 
  },
  { 
    title: "Cultura", 
    image: "/images/bandeiras/CULTURA.png", 
    href: "/materia/6" 
  },
  { 
    title: "Esporte", 
    image: "/images/bandeiras/ESPORTES.png", 
    href: "/materia/7" 
  },
  { 
    title: "Assistentes", 
    image: "/images/bandeiras/ASSISTENT.png", 
    href: "/materia/8" 
  },
  { 
    title: "Atalaia", 
    image: "/images/bandeiras/ATALAIA.png", 
    href: "/materia/9" 
  },
];

export default function ProjectsGrid() {
  return (
    <section className="w-full" aria-label="Projetos FJU">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-nowrap items-start gap-6 overflow-x-auto no-scrollbar justify-center">
          {projects.map((p) => (
            <Link key={p.title} href={p.href as any} className="group flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-muted shadow-md">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={200}
                  height={200}
                  quality={100}
                  priority
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    minWidth: '100%',
                    minHeight: '100%',
                  }}
                />
              </div>
              <span className="text-sm font-semibold text-center group-hover:text-[#b32b2b]" style={{ color: '#01183a' }}>
                {p.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
