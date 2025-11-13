"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

type ShortItem = { id: string; title: string; thumbnail?: string; url: string; publishedAt: string };

export default function ShortsSection() {
  const shortsLink = "https://www.youtube.com/c/For%C3%A7aJovemUniversal/shorts";
  const [items, setItems] = useState<ShortItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/youtube/shorts-scrape?limit=5&url=${encodeURIComponent("https://www.youtube.com/c/For%C3%A7aJovemUniversal/shorts")}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setItems(data.items as ShortItem[]);
      } catch (e: any) {
        setError("Não foi possível carregar os Shorts agora.");
      }
    };
    run();
  }, []);

  const list = items ?? Array.from({ length: 5 }).map((_, i) => ({
    id: String(i),
    title: "Short",
    url: shortsLink,
    thumbnail: undefined,
    publishedAt: new Date().toISOString(),
  }));

  return (
    <section className="w-full" style={{ backgroundColor: "#133669", color: "#ffffff" }}>
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Shorts</h2>
          <Link
            href={shortsLink}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 font-semibold"
            style={{ backgroundColor: "#b32b2b", color: "#ffffff" }}
          >
            Ver no YouTube
            <Play className="w-4 h-4" />
          </Link>
        </div>

        {error && (
          <p className="mb-4 opacity-80">{error}</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {list.map((it, idx) => {
            const embedId = it.id;
            const embedUrl = `https://www.youtube.com/embed/${embedId}?modestbranding=1&rel=0&playsinline=1`;
            return (
              <div key={it.id} className={`relative aspect-[9/16] overflow-hidden rounded-sm ${idx === 4 ? 'hidden sm:block' : ''}`}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={embedUrl}
                  title={it.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
