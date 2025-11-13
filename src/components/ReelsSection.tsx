"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

export default function ReelsSection() {
  const reelsLink = "https://www.instagram.com/oficialfju/reels/";
  // Placeholder de 10 itens até integrar com API do Instagram
  const placeholders = Array.from({ length: 10 }).map((_, i) => i);

  return (
    <section className="w-full bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Reels</h2>
          <Link
            href={reelsLink}
            target="_blank"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 font-semibold"
          >
            Ver no Instagram
            <Instagram className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {placeholders.map((idx) => (
            <Link
              key={idx}
              href={reelsLink}
              target="_blank"
              className="group relative aspect-[9/16] bg-black/20 flex items-center justify-center"
            >
              <Instagram className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="sr-only">Abrir Reels</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
