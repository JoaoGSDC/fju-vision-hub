import { NextResponse } from "next/server";

// WARNING: Best-effort scraper. YouTube markup may change; use API when possible.
// GET /api/youtube/shorts-scrape?limit=5&url=https%3A%2F%2Fwww.youtube.com%2Fc%2FFor%C3%A7aJovemUniversal%2Fshorts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.max(1, Math.min(10, Number(searchParams.get("limit")) || 5));
  const pageUrl = searchParams.get("url") || "https://www.youtube.com/c/For%C3%A7aJovemUniversal/shorts";

  try {
    const res = await fetch(pageUrl, {
      headers: {
        "accept-language": "en-US,en;q=0.9",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      },
      // cache for 10 minutes on the edge if supported
      next: { revalidate: 600 },
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "Failed to fetch shorts page", details: text }, { status: 502 });
    }
    const html = await res.text();

    // Try to extract ytInitialData JSON (sem flag dotAll)
    const m = html.match(/ytInitialData"\s*:\s*(\{[\s\S]*?\})\s*,\s*"ytInitialPlayerResponse"/);
    let items: any[] = [];
    if (m) {
      try {
        const data = JSON.parse(m[1]);
        // Navigate data to find videoRenderer entries (shorts page still uses videoRenderer)
        const walk = (obj: any) => {
          if (!obj || typeof obj !== "object") return;
          if (Array.isArray(obj)) {
            obj.forEach(walk);
            return;
          }
          if (obj.videoRenderer) items.push(obj.videoRenderer);
          Object.values(obj).forEach(walk);
        };
        walk(data);
      } catch (_) {
        // ignore
      }
    }

    // Fallback: regex search for "videoId":"<id>"
    if (items.length === 0) {
      const idMatches = Array.from(html.matchAll(/"videoId"\s*:\s*"([a-zA-Z0-9_-]{6,})"/g)).map((m) => m[1]);
      const uniq = Array.from(new Set(idMatches));
      items = uniq.map((id) => ({ videoId: id })).slice(0, limit);
    }

    // Map to simplified structure and dedupe
    const entries: [string, { id: string; title: string; url: string; thumbnail: string; publishedAt: string } ][] = items
      .map((vr: any) => {
        const id = vr?.videoId || vr;
        if (!id) return null;
        const title = vr?.title?.runs?.[0]?.text || "Short";
        const url = `https://www.youtube.com/shorts/${id}`;
        const thumbArr = vr?.thumbnail?.thumbnails as { url: string }[] | undefined;
        const thumbnail = (thumbArr && thumbArr.length ? thumbArr[thumbArr.length - 1].url : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
        const publishedAt = vr?.publishedTimeText?.simpleText || "";
        return [id as string, { id, title, url, thumbnail, publishedAt }];
      })
      .filter((x): x is [string, { id: string; title: string; url: string; thumbnail: string; publishedAt: string }] => Array.isArray(x));

    const dedup = new Map(entries);
    const out = Array.from(dedup.values()).slice(0, limit);

    return NextResponse.json({ items: out }, {
      headers: {
        "cache-control": "s-maxage=600, stale-while-revalidate=3600",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
