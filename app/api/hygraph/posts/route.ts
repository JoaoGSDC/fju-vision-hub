import { NextResponse } from "next/server";
import { getPosts, getPostsByCategory, Category } from "@/data/hygraphPosts";

// GET /api/hygraph/posts?limit=10
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = Number(searchParams.get("limit"));
    const limit = Number.isFinite(limitParam) ? Math.max(1, Math.min(50, limitParam)) : 10;
    const category = searchParams.get("category") || undefined;

    // Simple in-memory cache per server instance
    const ttlMs = 5 * 60 * 1000; // 5 minutes
    const now = Date.now();
    const cacheKey = `list:${category ?? "all"}:${limit}`;
    // @ts-ignore - attach cache map on globalThis to persist between calls in dev
    globalThis.__HYGRAPH_CACHE__ = globalThis.__HYGRAPH_CACHE__ || new Map<string, { data: any; expires: number }>();
    // @ts-ignore
    const cache: Map<string, { data: any; expires: number }> = globalThis.__HYGRAPH_CACHE__;
    const cached = cache.get(cacheKey);
    if (cached && cached.expires > now) {
      return NextResponse.json({ items: cached.data }, {
        status: 200,
        headers: { "cache-control": "s-maxage=120, stale-while-revalidate=1800" },
      });
    }

    try {
      console.log(`[API] Buscando posts para categoria: ${category || 'todas'}, limite: ${limit}`);
      
      let posts: any[] = [];
      if (category) {
        console.log(`[API] Recebida categoria: '${category}'`);
        
        // Mapeia variações de nomes de categorias para os valores esperados
        const normalizedCategory = category.toLowerCase().trim();
        const categoryMap: Record<string, Category> = {
          'socialaction': 'socialAction',
          'social-action': 'socialAction',
          'social_action': 'socialAction',
          'social action': 'socialAction',
          'dicas': 'tips',
          'movimentos': 'moviments',
          'evento': 'events',
          'eventos': 'events',
          'tips': 'tips',
          'moviments': 'moviments',
          'events': 'events'
        };
        
        const mappedCategory = categoryMap[normalizedCategory] || normalizedCategory;
        console.log(`[API] Categoria mapeada: '${category}' -> '${mappedCategory}'`);
        
        // Verifica se a categoria está no formato esperado
        const validCategories = ['tips', 'moviments', 'socialAction', 'events'];
        if (!validCategories.includes(mappedCategory)) {
          console.warn(`[API] Categoria '${mappedCategory}' não é uma categoria válida.`);
          console.warn('[API] Categorias válidas:', validCategories);
          return NextResponse.json([], { status: 400, statusText: `Categoria inválida. Categorias válidas: ${validCategories.join(', ')}` });
        }
        
        posts = await getPostsByCategory(mappedCategory as Category, limit);
      } else {
        posts = await getPosts(limit);
      }
      
      console.log(`[API] ${posts.length} posts encontrados para a categoria '${category || 'todas'}'`);
      
      // Garantir que temos um array válido
      const responseData = Array.isArray(posts) ? posts : [];
      
      // Atualizar o cache apenas se tivermos dados válidos
      if (responseData.length > 0) {
        cache.set(cacheKey, { data: responseData, expires: now + ttlMs });
      } else if (cached) {
        console.log('[API] Usando cache anterior devido à ausência de dados');
        return NextResponse.json(cached.data, {
          status: 200,
          headers: { 
            "cache-control": "s-maxage=60, stale-while-revalidate=1800",
            "x-cache": "stale"
          },
        });
      }
      
      return NextResponse.json(responseData, {
        status: 200,
        headers: {
          "cache-control": `s-maxage=${responseData.length > 0 ? 300 : 60}, stale-while-revalidate=1800`,
        },
      });
    } catch (e: any) {
      // On upstream error (e.g., 429), serve stale if available
      if (cached) {
        return NextResponse.json(cached.data, {
          status: 200,
          headers: { "cache-control": "s-maxage=60, stale-while-revalidate=1800", "x-stale": "1" },
        });
      }
      throw e;
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
