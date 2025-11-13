"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const ADDRESS = "R. João Boemer, 225 - Brás, São Paulo - SP, 03018-000";
const MAPS_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}`;

// Imagens fornecidas pelo usuário em /public/images/central
const imageCandidates = [
  "/images/central/photo12112025020310.jpeg",
  "/images/central/photo12112025020330.jpeg",
  "/images/central/photo12112025020340.jpeg",
  "/images/central/photo12112025020350.jpeg",
  "/images/central/photo12112025020400.jpeg",
];

export default function CentralFJU() {
  const [idx, setIdx] = useState(0);
  const [images, setImages] = useState<string[]>(imageCandidates);

  // Auto-play simples
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % images.length);
    }, 4000);
    return () => clearInterval(t);
  }, [images.length]);

  const prev = () => setIdx((p) => (p - 1 + images.length) % images.length);
  const next = () => setIdx((p) => (p + 1) % images.length);

  return (
    <section className="w-full" style={{ backgroundColor: "#133669", color: "#ffffff" }}>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Carousel à esquerda */}
          <div className="relative w-full overflow-hidden rounded-sm">
            <div className="relative aspect-video bg-black/20">
              {images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Central FJU ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {images.map((_, i) => (
                <span key={i} className={`h-1.5 w-4 ${i === idx ? "bg-white" : "bg-white/40"}`} />)
              )}
            </div>
          </div>

          {/* Texto e CTA à direita */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Central FJU</h2>
            <p className="text-sm md:text-base mb-6 opacity-95">
              Venha nos visitar na Central FJU! Uma experiência completa para conhecer nossos projetos, participar de atividades e ficar por dentro de tudo o que acontece na Força Jovem Universal.
            </p>
            <div className="flex flex-col gap-3 text-white/90 text-sm mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{ADDRESS}</span>
              </div>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 font-semibold"
              style={{ backgroundColor: "#b32b2b", color: "#ffffff" }}
            >
              Como chegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
