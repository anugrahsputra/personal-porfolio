import { fetchWithTimeout } from "@/lib/utils";

export interface Video {
  id: string;
  title: string;
  published: string;
}

const CHANNEL_ID = "UCRxZSJi-qiR7blysNgutadA"; // youtube.com/@downormal
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const XML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

const decodeXml = (text: string): string =>
  text.replace(/&(?:amp|lt|gt|quot|#39|apos);/g, (entity) => XML_ENTITIES[entity]);

// ponytail: regex over the channel's Atom feed, no API key or XML parser.
// The feed only has the newest 15 videos and no durations; the YouTube Data API has both if ever needed.
export async function getVideos(): Promise<Video[]> {
  try {
    const response = await fetchWithTimeout(
      FEED_URL,
      { next: { revalidate: 3600, tags: ["videos"] } },
      5000,
    );
    if (!response.ok) {
      console.error("Failed to fetch YouTube feed:", response.status);
      return [];
    }

    const xml = await response.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, entry]) => ({
        id: entry.match(/<yt:videoId>([^<]+)</)?.[1] ?? "",
        title: decodeXml(entry.match(/<title>([^<]*)</)?.[1] ?? ""),
        published: entry.match(/<published>([^<]+)</)?.[1] ?? "",
      }))
      .filter((video) => video.id);
  } catch (error) {
    // The home page still renders; the section falls back to a channel link
    console.error("Failed to fetch YouTube feed:", error);
    return [];
  }
}
