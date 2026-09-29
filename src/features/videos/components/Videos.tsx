"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import ArrowLink from "@/components/ArrowLink";
import { MaskText, Reveal } from "@/components/motion";
import { YOUTUBE_CHANNEL_URL } from "@/lib/site";
import type { Video } from "../api";

interface VideosProps {
  videos: Video[];
}

const MAX_VIDEOS = 6;

const thumbnail = (id: string): string =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const indexLabel = (index: number): string =>
  String(index + 1).padStart(2, "0");

// UTC so the server and browser render the same date
const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export default function Videos({ videos }: VideosProps) {
  const shown = videos.slice(0, MAX_VIDEOS);
  const [activeId, setActiveId] = useState(shown[0]?.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isPlaying) playerRef.current?.focus();
  }, [isPlaying, activeId]);

  const channelLink = (
    <a
      href={YOUTUBE_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-sm text-foreground underline decoration-input-border underline-offset-4 hover:decoration-foreground"
    >
      my YouTube channel
    </a>
  );

  if (!shown.length) {
    return (
      <section id="videos" className="border-t py-10">
        <p className="page-container text-sm/5 text-foreground/70">
          My videos didn&apos;t load here. Watch them on {channelLink}.
        </p>
      </section>
    );
  }

  const activeIndex = Math.max(
    0,
    shown.findIndex((video) => video.id === activeId),
  );
  const active = shown[activeIndex];
  const play = (id: string) => {
    setActiveId(id);
    setIsPlaying(true);
  };

  return (
    <section
      id="videos"
      className="pt-[clamp(3.5rem,5.5vw,5rem)] pb-[clamp(3.5rem,6vw,5.5rem)]"
    >
      <div className="page-container">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <MaskText as="h2" text="Videos" className="type-section" />
          <Reveal delay={0.2}>
            <ArrowLink href={YOUTUBE_CHANNEL_URL} external>
              YouTube channel
            </ArrowLink>
          </Reveal>
        </div>

        <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-x-8 gap-y-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Reveal delay={0.08}>
            <div className="relative aspect-video overflow-hidden rounded-md bg-card">
              {isPlaying ? (
                // Mounted only after a click, so no YouTube code loads before that
                <iframe
                  ref={playerRef}
                  key={active.id}
                  src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1`}
                  title={active.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => play(active.id)}
                  className="group absolute inset-0"
                >
                  <Image
                    src={thumbnail(active.id)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute top-1/2 left-1/2 flex size-16 -translate-1/2 items-center justify-center rounded-full bg-background/80 transition-colors group-hover:bg-background">
                    <Play className="size-6 fill-current" aria-hidden />
                  </span>
                  <span className="sr-only">Play {active.title}</span>
                </button>
              )}
            </div>
            <h3 className="mt-3 flex items-baseline gap-2">
              <span className="text-xs/4 text-foreground/60">
                {indexLabel(activeIndex)}
              </span>
              <span className="text-[clamp(1.125rem,1.4vw,1.375rem)] leading-tight tracking-[-0.02em]">
                {active.title}
              </span>
            </h3>
            <p className="mt-1 text-sm/5 text-foreground/60">
              {formatDate(active.published)}
            </p>
          </Reveal>

          <ol className="lg:-mt-4">
            {shown.map((video, index) => (
              <Reveal
                as="li"
                key={video.id}
                delay={0.16 + index * 0.06}
                className="border-t first:border-t-0"
              >
                <button
                  type="button"
                  onClick={() => play(video.id)}
                  aria-current={video.id === active.id ? "true" : undefined}
                  className="grid w-full grid-cols-[2.5rem_minmax(0,1fr)] rounded-sm py-4 text-left text-foreground/60 transition-colors duration-300 hover:text-foreground aria-[current=true]:text-foreground"
                >
                  <span className="pt-1 text-xs/4 text-foreground/60">
                    {indexLabel(index)}
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-base/6">
                      {video.title}
                    </span>
                    <span className="mt-1 block text-sm/5 text-foreground/60">
                      {formatDate(video.published)}
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
