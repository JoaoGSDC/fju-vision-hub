"use client";

import { useEffect, useRef, useState } from "react";
import NewsCard from "@/components/NewsCard";
import type { NewsArticle } from "@/data/newsData";

interface InfiniteNewsListProps {
  initialItems: NewsArticle[];
  allItems: NewsArticle[];
  pageSize?: number;
}

export default function InfiniteNewsList({ initialItems, allItems, pageSize = 6 }: InfiniteNewsListProps) {
  const [visibleCount, setVisibleCount] = useState<number>(initialItems.length || pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleCount((c) => Math.min(c + pageSize, allItems.length));
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [pageSize, allItems.length]);

  const items = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((n) => (
          <NewsCard
            key={n.id}
            id={n.id}
            category={n.category}
            title={n.title}
            excerpt={n.excerpt}
            image={n.image}
            date={n.date}
          />
        ))}
      </div>
      <div ref={sentinelRef} className="h-10" />
      {!hasMore && (
        <div className="text-center text-sm text-muted-foreground py-6">Você chegou ao fim.</div>
      )}
    </div>
  );
}
