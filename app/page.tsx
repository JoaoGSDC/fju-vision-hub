"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getDestaques,
  getAllSortedByDate,
  getMaisLidas,
} from "@/data/newsData";
import NewsCard from "@/components/NewsCard";
import HeroLatest from "@/components/HeroLatest";
import LiveFJU from "@/components/LiveFJU";
import ProjectsGrid from "@/components/ProjectsGrid";
import ShortsSection from "@/components/ShortsSection";
import CentralFJU from "@/components/CentralFJU";
import FloatingButtons from "@/components/FloatingButtons";
import HygraphScroller from "@/components/HygraphScroller";
import dynamic from 'next/dynamic';

// Carrega o componente de forma dinâmica para evitar problemas com SSR
const MostViewedPosts = dynamic(
  () => import('@/components/MostViewedPosts'),
  { ssr: false }
);

export default function HomePage() {
  const destaques = getDestaques();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-0">
        <HeroLatest />
        
        {/* Primeira seção após o Hero */}
        <div id="content-start" className="relative -top-16"></div>
        
        {/* Projetos FJU (grid 1:1 full-bleed) logo abaixo do topo */}
        <div id="home">
          <ProjectsGrid />
        </div>

        {/* Movimentos (Hygraph) */}
        <HygraphScroller id="movimentos" title="Movimentos" category="moviments" limit={10} />
        {/* Extra: Live FJU após Movimentos */}
        <LiveFJU playlistId="PLnCp082rx5tWZs3iSaZyRXOXBFYGAGRr-" />

        {/* Ação Social (Hygraph) */}
        <HygraphScroller id="acao-social" title="Ação Social" category="socialAction" limit={10} />
        {/* Extra: Shorts (5 últimos) */}
        <ShortsSection />
        {/* Dicas (Hygraph) */}
        <HygraphScroller id="dicas" title="Dicas" category="tips" limit={10} />
        {/* Extra: Central FJU após Dicas */}
        <CentralFJU />
        {/* Eventos (Hygraph) */}
        <HygraphScroller id="eventos" title="Eventos" category="events" limit={10} />
        <FloatingButtons />
      </main>

      <Footer />
    </div>
  );
}
