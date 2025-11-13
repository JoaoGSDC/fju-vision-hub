"use client";

import Link from "next/link";

interface LiveFJUProps {
  playlistId: string;
}

export default function LiveFJU({ playlistId }: LiveFJUProps) {
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;

  return (
    <section className="w-full" style={{ backgroundColor: '#133669', color: '#ffffff' }}>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={embedUrl}
              title="Live FJU"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>Live FJU</h3>
            <p className="text-sm md:text-base mb-6" style={{ color: '#ffffff' }}>
              Assista ao último vídeo publicado na nossa playlist oficial. Fique por dentro das novidades e compartilhe com seus amigos.
            </p>
            <Link
              href={`https://www.youtube.com/playlist?list=${playlistId}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-3 font-semibold"
              style={{ backgroundColor: '#b32b2b', color: '#ffffff' }}
            >
              Abrir playlist no YouTube
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
