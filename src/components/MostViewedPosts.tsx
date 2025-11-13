"use client";

import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';
import { Post } from '@/data/hygraphPosts';

export default function MostViewedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMostViewed = async () => {
      try {
        const response = await fetch('/api/posts/most-viewed');
        if (!response.ok) {
          throw new Error('Erro ao carregar os posts mais visualizados');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Erro ao buscar posts mais visualizados:', err);
        setError('Não foi possível carregar os posts mais visualizados');
      } finally {
        setLoading(false);
      }
    };

    fetchMostViewed();
  }, []);

  if (loading) {
    return (
      <section id="mais-lidas" className="py-8 px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Mais Lidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted rounded-lg h-64"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error || posts.length === 0) {
    return null; // Não exibe nada se houver erro ou não houver posts
  }

  return (
    <section id="mais-lidas" className="py-8 px-4 md:px-6">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Mais Lidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => {
          // Converter a data para o formato esperado
          const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }).replace('.', '').replace(/de /g, '');
          };

          // Usar o slug se disponível, senão usar o ID
          const postProps = post.slug 
            ? { slug: post.slug }
            : { id: parseInt(post.id) || 0 };

          return (
            <NewsCard
              key={post.id}
              {...postProps}
              title={post.title}
              excerpt={post.subtitle || ''}
              category={post.category || 'Geral'}
              image={post.cover?.url || ''}
              date={formatDate(post.publishedAt || post.createdAt)}
            />
          );
        })}
      </div>
    </section>
  );
}
