"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getAllSortedByDate } from "@/data/newsData";

export default function HeroCarousel() {
  const latest = getAllSortedByDate().slice(0, 3);

  return (
    <section className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {latest.map((item) => (
            <CarouselItem key={item.id}>
              <div className="relative h-[480px] md:h-[560px] overflow-hidden bg-fju-dark rounded-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Escurecimento global sutil */}
                <div className="pointer-events-none absolute inset-0 bg-black/30" />
                {/* Gradiente mais forte na base, para melhor leitura do texto */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative container mx-auto h-full flex items-end pb-10 md:pb-16 px-4">
                  <div className="max-w-3xl">
                    <span className="inline-block mb-4 px-3 py-1 text-primary-foreground text-xs font-semibold uppercase tracking-wide bg-primary">
                      {item.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-200 mb-6 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="px-6 bg-primary text-primary-foreground font-semibold shadow-lg
                      transition-all hover:shadow-[0_12px_36px_rgba(239,68,68,0.35)]"
                    >
                      <Link href={`/materia/${item.id}`}>
                        Ler História Completa
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  );
}
