import { NextResponse } from "next/server";
import { getPostBySlug } from "@/data/hygraphPosts";

// GET /api/hygraph/posts/[slug]
export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200, headers: { "cache-control": "s-maxage=300, stale-while-revalidate=1800" } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
