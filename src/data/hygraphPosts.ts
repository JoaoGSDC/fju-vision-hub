import { hygraphFetch } from "@/lib/hygraph";

// Interface completa para o Post
interface RichText {
  raw: string;
  html: string;
  markdown: string;
  text: string;
}

// O tipo Author pode ser apenas uma string no seu esquema
// Vamos manter a compatibilidade com string | Author para evitar quebras
type Author = string;

export interface Post {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  text?: RichText | null;
  author?: Author | string | null;
  category?: string | null;
  cover?: { 
    url: string;
    width?: number | null;
    height?: number | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  readBy?: number;
}

// Primeiro, vamos tentar uma consulta mínima para ver se temos acesso básico
const POST_FIELDS = `
  id
  title
  slug
  subtitle
  text {
    raw
    html
    markdown
    text
  }
  author
  category
  readBy
  cover { 
    url
    width
    height
  }
  createdAt
  updatedAt
  publishedAt
`;

export async function getPosts(first: number = 10): Promise<Post[]> {
  const query = `
    query Posts($first: Int!) {
      posts: postsConnection(first: $first, orderBy: publishedAt_DESC) {
        edges {
          node {
            ${POST_FIELDS}
          }
        }
      }
    }
  `;
  const data = await hygraphFetch<{ posts: { edges: { node: Post }[] } }, { first: number }>({
    query,
    variables: { first },
  });
  return data.posts.edges.map(edge => edge.node);
}

// Definindo o tipo Category baseado no que o Hygraph espera
export type Category = 'tips' | 'moviments' | 'socialAction' | 'events' | string;

// Função para listar todas as categorias disponíveis
export async function listAllCategories(): Promise<Category[]> {
  const query = `
    query ListCategories {
      postsConnection(first: 100) {
        edges {
          node {
            category
          }
        }
      }
    }
  `;
  
  try {
    const data = await hygraphFetch<{ 
      postsConnection: { 
        edges: { 
          node: { 
            category: string | null 
          } 
        }[] 
      } 
    }>({ query });
    
    const categories = new Set<string>();
    data.postsConnection.edges.forEach(({ node }) => {
      if (node.category) {
        categories.add(node.category);
      }
    });
    
    console.log('Categorias encontradas:', Array.from(categories));
    return Array.from(categories);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    return [];
  }
}

// Função para listar todos os posts (apenas para depuração)
export async function listAllPosts(limit: number = 100): Promise<Post[]> {
  const query = `
    query AllPosts($limit: Int!) {
      postsConnection(first: $limit, orderBy: publishedAt_DESC) {
        edges {
          node {
            id
            title
            slug
            subtitle
            category
            publishedAt
            updatedAt
            readBy
            cover {
              url
              width
              height
            }
            author {
              name
              displayName
            }
          }
        }
      }
    }
  `;
  
  try {
    console.log('[listAllPosts] Buscando todos os posts...');
    const data = await hygraphFetch<{ 
      postsConnection: { 
        edges: { 
          node: Post 
        }[] 
      } 
    }, { 
      limit: number 
    }>({
      query,
      variables: { limit }
    });
    
    const posts = data?.postsConnection?.edges?.map(edge => edge.node) || [];
    console.log(`[listAllPosts] ${posts.length} posts encontrados`);
    
    // Log das categorias únicas encontradas
    const categories = new Set(posts.map(p => p.category).filter(Boolean));
    console.log('[listAllPosts] Categorias encontradas nos posts:', Array.from(categories));
    
    return posts;
  } catch (error) {
    console.error('Erro ao listar posts:', error);
    return [];
  }
}

export async function getPostsByCategory(category: Category, first: number = 10): Promise<Post[]> {
  console.log(`[getPostsByCategory] Buscando ${first} posts da categoria '${category}'`);
  
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

  // Primeiro, listamos todas as categorias disponíveis
  const allCategories = await listAllCategories();
  console.log('[getPostsByCategory] Todas as categorias disponíveis:', allCategories);
  
  // Listamos todos os posts para debug
  const allPosts = await listAllPosts(100);
  console.log('[getPostsByCategory] Todos os posts disponíveis:', allPosts.map(p => ({
    title: p.title,
    category: p.category,
    slug: p.slug,
    publishedAt: p.publishedAt
  })));
  
  // Normaliza a categoria para minúsculas e remove espaços
  const normalizedCategory = category.toLowerCase().trim();
  console.log(`[getPostsByCategory] Categoria normalizada: '${category}' -> '${normalizedCategory}'`);
  
  // Mapeia variações de nomes de categorias para os valores existentes
  const categoryMap: Record<string, string> = {
    'socialaction': 'socialAction',
    'social-action': 'socialAction',
    'social_action': 'socialAction',
    'social action': 'socialAction',
    'dicas': 'tips',
    'movimentos': 'moviments',
    'evento': 'events',
    'eventos': 'events'
  };
  
  // Usa o mapeamento ou mantém o valor original se não houver mapeamento
  const mappedCategory = categoryMap[normalizedCategory] || normalizedCategory;
  console.log(`[getPostsByCategory] Categoria mapeada: '${normalizedCategory}' -> '${mappedCategory}'`);
  
  // Verifica se a categoria existe na lista de categorias disponíveis
  if (!allCategories.includes(mappedCategory as Category)) {
    console.warn(`[getPostsByCategory] A categoria '${mappedCategory}' não foi encontrada nas categorias disponíveis.`);
    console.warn('[getPostsByCategory] Categorias disponíveis:', allCategories);
    
    // Tenta encontrar a categoria independente do case
    const foundCategory = allCategories.find(c => c?.toLowerCase() === mappedCategory.toLowerCase());
    if (foundCategory) {
      console.warn(`[getPostsByCategory] Encontrada correspondência case-insensitive: usando '${foundCategory}'`);
      return getPostsByCategory(foundCategory as Category, first);
    }
    
    // Se não encontrar, retorna os posts vazios
    return [];
  }
  
  try {
    
    // Consulta otimizada para buscar os posts da categoria
    // Usando o tipo Category! para a variável de categoria
    const query = `
      query PostsByCategory($category: Category!, $first: Int!) {
        postsConnection(
          where: { 
            category: $category
          }, 
          first: $first, 
          orderBy: publishedAt_DESC
        ) {
          edges {
            node {
              ${POST_FIELDS}
            }
          }
        }
      }
    `;
    
    console.log('[getPostsByCategory] Enviando consulta para o Hygraph...');
    const data = await hygraphFetch<{ 
      postsConnection: { 
        edges: { 
          node: Post 
        }[] 
      } 
    }, { 
      category: string; 
      first: number 
    }>({
      query,
      variables: { 
        category: mappedCategory, 
        first 
      },
    });
    
    console.log(`[getPostsByCategory] Resposta recebida para a categoria '${category}':`, data);
    
    if (!data?.postsConnection?.edges) {
      console.warn(`[getPostsByCategory] Nenhum post encontrado para a categoria '${category}'`);
      return [];
    }
    
    const posts = data.postsConnection.edges.map(edge => edge.node);
    console.log(`[getPostsByCategory] ${posts.length} posts encontrados para a categoria '${category}'`);
    return posts;
    
  } catch (error) {
    console.error(`[getPostsByCategory] Erro ao buscar posts da categoria '${category}':`, error);
    return [];
  }
}

export async function incrementPostViews(slug: string): Promise<boolean> {
  console.log(`[incrementPostViews] Incrementando visualizações para o post: ${slug}`);
  const mutation = `
    mutation IncrementPostViews($slug: String!) {
      updatePost(
        where: { slug: $slug }
        data: { readBy: { increment: 1 } }
      ) {
        id
        readBy
      }
    }
  `;

  try {
    console.log(`[incrementPostViews] Enviando mutação para o Hygraph`);
    const result = await hygraphFetch<{ updatePost: { id: string; readBy: number } }>({
      query: mutation,
      variables: { slug }
    });
    
    console.log(`[incrementPostViews] Resposta do Hygraph:`, result);
    return true;
  } catch (error) {
    console.error('[incrementPostViews] Erro ao incrementar visualizações:', error);
    return false;
  }
}

export async function getMostViewedPosts(limit: number = 5): Promise<Post[]> {
  const query = `
    query GetMostViewedPosts($limit: Int!) {
      posts(
        orderBy: readBy_DESC
        first: $limit
        where: { readBy_gt: 0 }
      ) {
        ${POST_FIELDS}
      }
    }
  `;

  try {
    const data = await hygraphFetch<{ posts: Post[] }, { limit: number }>({
      query,
      variables: { limit }
    });
    return data.posts;
  } catch (error) {
    console.error('Erro ao buscar posts mais visualizados:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string, incrementViews: boolean = true): Promise<Post | null> {
  console.log(`[getPostBySlug] Buscando post com slug: ${slug}, incrementViews: ${incrementViews}`);
  
  const query = `
    query GetPostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        ${POST_FIELDS}
      }
    }
  `;

  try {
    console.log(`[getPostBySlug] Enviando consulta para o Hygraph`);
    const data = await hygraphFetch<{ post: Post | null }>({
      query,
      variables: { slug },
    });

    console.log(`[getPostBySlug] Resposta recebida do Hygraph:`, data);

    // Incrementa o contador de visualizações se o post existir
    if (data.post) {
      console.log(`[getPostBySlug] Post encontrado: ${data.post.title}`);
      console.log(`[getPostBySlug] Visualizações atuais: ${data.post.readBy || 0}`);
      
      if (incrementViews) {
        console.log(`[getPostBySlug] Incrementando contador de visualizações`);
        const success = await incrementPostViews(slug);
        
        if (success) {
          console.log(`[getPostBySlug] Contador de visualizações incrementado com sucesso`);
          // Atualiza o contador localmente para a resposta atual
          data.post.readBy = (data.post.readBy || 0) + 1;
          console.log(`[getPostBySlug] Novo valor de visualizações: ${data.post.readBy}`);
        } else {
          console.error(`[getPostBySlug] Falha ao incrementar contador de visualizações`);
        }
      }
    } else {
      console.log(`[getPostBySlug] Nenhum post encontrado com o slug: ${slug}`);
    }

    return data.post;
  } catch (error) {
    console.error('[getPostBySlug] Erro ao buscar post por slug:', error);
    return null;
  }
}
