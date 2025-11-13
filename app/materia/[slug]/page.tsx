import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Eye } from "lucide-react";
import { getPostBySlug, getPosts, getMostViewedPosts } from "@/data/hygraphPosts";
import { notFound } from "next/navigation";
import { getNewsById, allNews, type NewsArticle, getMaisLidas, getRelatedNews } from "@/data/newsData";
import NewsCard from "@/components/NewsCard";
import { RichTextContent } from "@/components/RichTextContent";
import './post-styles.css';

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

function formatAuthorName(author: string | { name?: string | null; displayName?: string | null } | null): string {
  if (!author) return '';
  
  // Se for um objeto de autor
  if (typeof author === 'object') {
    // Usa displayName se disponível, senão usa name
    return author.displayName || author.name || 'Autor desconhecido';
  }
  
  // Se for uma string (compatibilidade com versões anteriores)
  const normalized = author.toLowerCase().trim();
  
  // Mapeia abreviações comuns
  if (normalized === 'redacao fju' || normalized === 'redacao') {
    return 'Redação FJU';
  }
  
  // Converte de camelCase para formato legível
  return author
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}


function formatDate(iso?: string | null): string {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getPosts(50);
  const ids = allNews.map((n: NewsArticle) => String(n.id));
  return [
    ...posts.map((p) => ({ slug: p.slug })),
    ...ids.map((id) => ({ slug: id })),
  ];
}

export default async function ArticleBySlugPage({ params }: { params: { slug: string } }) {
  // Fallback: se o parâmetro for numérico, renderiza dos dados locais
  if (/^\d+$/.test(params.slug)) {
    const id = Number(params.slug);
    const article = getNewsById(id);
    if (!article) return notFound();
    const maisLidas = getMaisLidas(5);
    const relatedNews = getRelatedNews(article.id, article.category, 3);

    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-24">
                  <h3 className="text-lg font-bold mb-4" style={{ color: '#01183a' }}>Mais lidas</h3>
                  <ul className="space-y-4">
                    {maisLidas.map((n) => (
                      <li key={n.id}>
                        <Link href={`/materia/${n.id}`} className="group flex items-center gap-3">
                          <div className="w-16 h-12 overflow-hidden rounded bg-muted">
                            <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <span className="block text-[11px] uppercase font-semibold text-white px-2 py-0.5 inline-block mb-1" style={{ backgroundColor: '#b32b2b' }}>{n.category}</span>
                            <h4 className="text-sm leading-snug text-foreground group-hover:text-[#b32b2b] transition-colors line-clamp-2">{n.title}</h4>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <article className="lg:col-span-6 order-1 lg:order-2">
                <Link href="/" className="inline-flex items-center gap-2 text-[#b32b2b] hover:text-[#b32b2b] transition-colors mb-6">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para Home
                </Link>

                <div className="mb-8">
                  <div className="relative aspect-video overflow-hidden rounded mb-3">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="inline-block px-3 py-1 text-white text-xs font-semibold uppercase tracking-wide rounded mb-3" style={{ backgroundColor: '#b32b2b' }}>
                    {article.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{article.title}</h1>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time>{article.date}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                  </div>
                </div>

                <div
                  className="prose prose-lg max-w-none mb-10 prose-p:text-foreground prose-p:mb-6 prose-p:leading-relaxed prose-headings:text-foreground prose-headings:font-bold prose-strong:text-foreground prose-strong:font-semibold prose-a:text-[#b32b2b] hover:prose-a:text-[#b32b2b]"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </article>

              <aside className="lg:col-span-3 order-3">
                {relatedNews.length > 0 && (
                  <div className="sticky top-24">
                    <h3 className="text-lg font-bold mb-4" style={{ color: '#01183a' }}>Leia também</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {relatedNews.map((news) => (
                        <NewsCard
                          key={news.id}
                          id={news.id}
                          category={news.category}
                          title={news.title}
                          excerpt={news.excerpt}
                          image={news.image}
                          date={news.date}
                          compact
                        />
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Caso default: slug do Hygraph
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  // Busca os 3 posts mais recentes, excluindo o post atual
  const allPosts = await getPosts(50); // Pega os 50 posts mais recentes
  const relatedNews = allPosts
    .filter(p => p.slug !== post.slug) // Remove o post atual
    .slice(0, 3) // Pega os 3 primeiros
    .map(p => ({
      id: 0, // Usamos 0 como placeholder, já que o NewsCard requer um número
      slug: p.slug, // Adicionamos o slug para usar no link
      title: p.title,
      excerpt: p.subtitle || '',
      image: p.cover?.url || '',
      date: formatDate(p.publishedAt),
      category: humanCategory(p.category)
    }));

  // Busca as mais lidas do Hygraph
  const maisLidas = await getMostViewedPosts(5);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Barra lateral esquerda - Mais Lidas */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#01183a' }}>Mais lidas</h3>
                <ul className="space-y-4">
                  {maisLidas.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/materia/${post.slug}`} className="group flex items-center gap-3">
                        {post.cover?.url && (
                          <div className="w-16 h-12 overflow-hidden rounded bg-muted flex-shrink-0">
                            <img 
                              src={post.cover.url} 
                              alt={post.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          {post.category && (
                            <span className="block text-[11px] uppercase font-semibold text-white px-2 py-0.5 inline-block mb-1" style={{ backgroundColor: '#b32b2b' }}>
                              {humanCategory(post.category)}
                            </span>
                          )}
                          <h4 className="text-sm leading-snug text-foreground group-hover:text-[#b32b2b] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          {typeof post.readBy === 'number' && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Eye className="h-3 w-3" />
                              <span>{post.readBy} visualizações</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Conteúdo principal */}
            <article className="lg:col-span-6 order-1 lg:order-2">
              {/* Back Button */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#b32b2b] hover:text-[#b32b2b] transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para Home
              </Link>

              {/* Título do artigo */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {post.title}
                </h1>
                {post.subtitle && (
                  <h2 className="text-xl text-muted-foreground">
                    {post.subtitle}
                  </h2>
                )}
              </div>

              {/* Imagem de capa */}
              {post.cover?.url && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img
                      src={post.cover.url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Metadados do post */}
              <div className="mb-8 pb-4 border-b border-border">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{formatAuthorName(post.author)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  {typeof post.readBy === 'number' && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.readBy} visualização{post.readBy !== 1 ? 'es' : ''}</span>
                    </div>
                  )}
                </div>
              </div>

              {post.text && (
                <div className="post-content">
                  <RichTextContent 
                    html={typeof post.text === 'string' 
                      ? post.text 
                      : post.text.html || post.text.markdown || post.text.raw || ''
                    } 
                  />
                </div>
              )}
            </article>

            {/* Barra lateral direita - Leia também */}
            <aside className="lg:col-span-3 order-3">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#01183a' }}>Leia também</h3>
                <div className="grid grid-cols-1 gap-4">
                  {relatedNews.length > 0 ? (
                    relatedNews.map((news) => (
                      <Link href={`/materia/${news.slug}`} key={news.slug} className="block">
                        <NewsCard
                          id={news.id}
                          category={news.category}
                          title={news.title}
                          excerpt={news.excerpt}
                          image={news.image}
                          date={news.date}
                          compact
                        />
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum post recente encontrado</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
