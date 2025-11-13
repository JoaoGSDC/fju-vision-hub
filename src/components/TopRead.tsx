"use client";

import type { NewsArticle } from "@/data/newsData";
import Link from "next/link";

export default function TopRead({ items }: { items: NewsArticle[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Mais lidas</h3>
      <ul className="space-y-3">
        {items.map((n) => (
          <li key={n.id}>
            <Link href={`/materia/${n.id}`} className="group flex items-start gap-3">
              <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden">
                <img src={n.image} alt={n.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-semibold text-primary mb-1">{n.category}</div>
                <h4 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary">
                  {n.title}
                </h4>
                <time className="text-[11px] text-muted-foreground">{n.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
