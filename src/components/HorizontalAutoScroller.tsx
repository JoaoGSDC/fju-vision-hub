"use client";

import { useEffect, useRef, useState } from "react";
import NewsCard from "@/components/NewsCard";
import type { NewsArticle } from "@/data/newsData";

interface HorizontalAutoScrollerProps {
  id?: string;
  title: string;
  items: NewsArticle[];
  intervalMs?: number;
}

export default function HorizontalAutoScroller({ id, title, items, intervalMs = 3500 }: HorizontalAutoScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const getItemLeft = (i: number) => {
      const child = el.children[i] as HTMLElement | undefined;
      if (!child) return 0;
      return child.offsetLeft;
    };

    const tick = () => {
      const next = (index + 1) % items.length;
      setIndex(next);
      const left = getItemLeft(next);
      el.scrollTo({ left, behavior: "smooth" });
    };

    timerRef.current = setInterval(tick, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, items.length, index]);

  return (
    <section id={id} className="container mx-auto px-4 py-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
      <div
        ref={scrollerRef}
        className="relative flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory snap-always no-scrollbar"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        onWheel={(e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            // evitar scroll vertical acidental dentro do scroller
            e.currentTarget.scrollLeft += e.deltaY;
            e.preventDefault();
          }
        }}
      >
        {items.map((n) => (
          <div key={n.id} className="w-72 md:w-80 flex-shrink-0 snap-start">
            <NewsCard
              id={n.id}
              category={n.category}
              title={n.title}
              excerpt={n.excerpt}
              image={n.image}
              date={n.date}
              compact
              className="h-full"
              imageClassName="aspect-[3/4]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
