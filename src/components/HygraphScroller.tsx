"use client";

import { useEffect, useState } from "react";
import NewsCard from "@/components/NewsCard";

function humanCategory(code?: string | null): string {
  switch (code) {
    case "moviments":
      return "Movimentos";
    case "socialAction":
      return "Ação Social";
    case "tips":
      return "Dicas";
    case "events":
      return "Eventos";
    default:
      return code || "";
  }
}

function formatDate(iso?: string | null): string {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

type Post = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  author?: string | null;
  category?: string | null;
  cover?: { 
    url: string;
    width?: number | null;
    height?: number | null;
  } | null;
  createdAt: string;
  publishedAt?: string | null;
};

export default function HygraphScroller({ id, title, category, limit = 10 }: { id?: string; title: string; category: "moviments" | "socialAction" | "tips" | "events"; limit?: number; }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    let responseClone: Response | null = null;
    
    const load = async () => {
      try {
        const url = `/api/hygraph/posts?category=${encodeURIComponent(category)}&limit=${limit}`;
        console.log(`Buscando posts da categoria '${category}' em:`, url);
        
        const res = await fetch(url, {
          signal: controller.signal,
          cache: 'no-store' // Evitar cache para garantir dados atualizados
        });
        
        // Clonar a resposta para podermos ler o corpo mais de uma vez se necessário
        responseClone = res.clone();
        
        console.log(`Resposta da API (${category}):`, res.status, res.statusText);
        
        if (!res.ok) {
          const errorText = await responseClone.text();
          console.error('Erro na resposta da API:', errorText);
          return;
        }
        
        const data = await responseClone.json();
        console.log(`Dados recebidos (${category}):`, data);
        
        // Verificar a estrutura dos dados recebidos
        let posts: any[] = [];
        
        if (Array.isArray(data)) {
          // Se for um array direto
          posts = data;
        } else if (data?.postsConnection?.edges) {
          // Se for a estrutura do Hygraph com postsConnection
          posts = data.postsConnection.edges.map((edge: any) => edge.node);
        } else if (Array.isArray(data?.items)) {
          // Se for um array dentro de 'items'
          posts = data.items;
        } else if (Array.isArray(data?.posts)) {
          // Se for um array dentro de 'posts'
          posts = data.posts;
        }
        
        console.log(`Posts processados (${category}):`, posts);
        setPosts(posts);
      } catch (error) {
        console.error(`Erro ao carregar posts da categoria '${category}':`, error);
      } finally {
        responseClone = null; // Limpar a referência
      }
    };
    load();
    return () => controller.abort();
  }, [category, limit]);

  console.log(`Renderizando posts (${category}):`, posts);
  
  // Mostrar mensagem de carregamento ou vazio
  if (posts.length === 0) {
    console.log(`Nenhum post encontrado para a categoria '${category}'`);
    return (
      <section id={id} className="container mx-auto px-4 py-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-500">Nenhum post encontrado nesta categoria.</p>
      </section>
    );
  }

  return (
    <section id={id} className="container mx-auto px-4 py-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
      <div
        className="relative flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory snap-always no-scrollbar"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {posts.map((p) => (
          <div key={p.id} className="w-72 md:w-80 flex-shrink-0 snap-start">
            <NewsCard
              slug={p.slug}
              category={humanCategory(p.category)}
              title={p.title}
              excerpt={p.subtitle || ''}
              image={p.cover ? p.cover.url : "/news-placeholder.jpg"}
              date={formatDate(p.publishedAt || p.createdAt)}
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
