import { NextResponse } from "next/server";

// GET /api/youtube/shorts?limit=5
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.max(1, Math.min(10, Number(searchParams.get("limit")) || 5));

  const apiKey = process.env.YT_API_KEY;
  const channelId = process.env.YT_CHANNEL_ID; // e.g., UCxxxxxxxxxxxxxxxx

  if (!apiKey || !channelId) {
    return NextResponse.json(
      { error: "Missing YT_API_KEY or YT_CHANNEL_ID env vars" },
      { status: 500 }
    );
  }

  try {
    // Search for latest short videos from the channel
    // Using videoDuration=short as proxy for Shorts (<= 4 minutes)
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("key", apiKey);
    searchUrl.searchParams.set("channelId", channelId);
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("order", "date");
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("maxResults", String(Math.max(limit, 10))); // fetch a bit more, then slice
    searchUrl.searchParams.set("videoDuration", "short");

    const res = await fetch(searchUrl.toString(), { next: { revalidate: 600 } });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "YouTube API error", details: text }, { status: 502 });
    }
    const data = await res.json();

    const items = (data.items || [])
      .map((it: any) => {
        const vid = it.id?.videoId as string | undefined;
        const sn = it.snippet;
        if (!vid || !sn) return null;
        const t = sn.thumbnails?.maxres || sn.thumbnails?.high || sn.thumbnails?.medium || sn.thumbnails?.default;
        return {
          id: vid,
          title: sn.title as string,
          publishedAt: sn.publishedAt as string,
          thumbnail: t?.url as string | undefined,
          url: `https://www.youtube.com/shorts/${vid}`,
        };
      })
      .filter(Boolean)
      .slice(0, limit);

    return new NextResponse(JSON.stringify({ items }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "s-maxage=600, stale-while-revalidate=3600",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
