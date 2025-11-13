import { NextResponse } from "next/server";
import { getMostViewedPosts } from "@/data/hygraphPosts";

export async function GET() {
  try {
    const posts = await getMostViewedPosts(5);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts mais visualizados:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts mais visualizados' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; // Desativa o cache para garantir que sempre busque os dados mais recentes
