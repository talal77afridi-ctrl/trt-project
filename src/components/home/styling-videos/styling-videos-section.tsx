"use client";

import { useEffect, useRef, useState } from "react";
import { homeSections } from "@/data/home/home-sections";

export function StylingVideosSection() {
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const modalListRef = useRef<HTMLDivElement | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const productMeta = [
    { oldPrice: "8,387", discount: "-56%", thumbnail: "/assets/popular/dress.webp" },
    { oldPrice: "28,499", discount: "-23%", thumbnail: "/assets/popular/dress1.webp" },
    { oldPrice: "5,999", discount: "-33%", thumbnail: "/assets/popular/dress2.webp" },
    { oldPrice: "16,999", discount: "-29%", thumbnail: "/assets/popular/dress3.webp" },
    { oldPrice: "12,499", discount: "-24%", thumbnail: "/assets/choose/dress1.webp" },
  ] as const;

  const scrollByCard = (direction: "prev" | "next") => {
    if (!sliderRef.current) {
      return;
    }

    const card = sliderRef.current.querySelector("li");
    const cardWidth = card?.getBoundingClientRect().width ?? 250;
    const gap = 22;
    sliderRef.current.scrollBy({
      left: direction === "next" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  const closeModal = () => {
    setActiveVideoIndex(null);
  };

  const shareVideo = async (videoUrl: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Styling Video",
          url: videoUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(videoUrl);
    } catch {
      // Ignore share cancellation/errors to keep interaction smooth.
    }
  };

  useEffect(() => {
    if (activeVideoIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideoIndex]);

  useEffect(() => {
    if (activeVideoIndex === null || !modalListRef.current) {
      return;
    }

    const target = modalListRef.current.querySelector<HTMLElement>(`[data-video-index="${activeVideoIndex}"]`);
    target?.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
  }, [activeVideoIndex]);

  return (
    <section className="pb-12 pt-8 sm:pt-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[1.12rem] font-semibold leading-tight text-[var(--foreground)]">Styling Videos</h2>

        <div className="hidden items-center gap-3 sm:flex">
          <button type="button" className="text-[1.02rem] font-semibold text-[var(--foreground)] underline underline-offset-2">
            View All
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              aria-label="Previous styling videos"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--foreground)] transition hover:bg-black/[0.03]"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
                <path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scrollByCard("next")}
              aria-label="Next styling videos"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--foreground)] transition hover:bg-black/[0.03]"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
                <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={sliderRef}
        className="mt-6 grid grid-flow-col auto-cols-[76%] gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] sm:auto-cols-[48%] lg:auto-cols-[calc((100%-66px)/4)] [&::-webkit-scrollbar]:hidden"
      >
        {homeSections.stylingVideos.map((video, index) => (
          <li key={video.title} className="min-w-0">
            <article>
              <button type="button" onClick={() => setActiveVideoIndex(index)} className="block w-full text-left">
                <figure className="relative h-[314px] overflow-hidden rounded-2xl bg-[#111]">
                  <video
                    src={video.video}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                  <span className="absolute left-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm">
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                      <path d="M7 5.5v9l7-4.5-7-4.5Z" fill="currentColor" />
                    </svg>
                  </span>

                  <figcaption className="absolute bottom-4 left-4 text-white">
                    <div className="text-[1.06rem] font-medium leading-tight">{video.title}</div>
                    <div className="mt-1 text-[1.2rem] font-semibold leading-tight">{video.price}</div>
                  </figcaption>
                </figure>
              </button>
            </article>
          </li>
        ))}
      </ul>

      {activeVideoIndex !== null ? (
        <div className="fixed inset-0 z-[90] bg-black/82">
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-6 top-6 z-[100] rounded-xl border border-white/40 bg-white/5 px-6 py-3 text-[1.2rem] font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            Close
          </button>

          <div ref={modalListRef} className="h-full overflow-y-auto snap-y snap-mandatory">
            {homeSections.stylingVideos.map((video, index) => {
              const meta = productMeta[index % productMeta.length];

              return (
                <div key={`${video.title}-modal`} data-video-index={index} className="flex min-h-screen snap-start items-center justify-center px-4 py-6">
                  <div className="w-full max-w-[458px]">
                    <figure className="relative overflow-hidden rounded-[18px] bg-black shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                      <video
                        src={video.video}
                        className="h-[86vh] w-full object-cover"
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        preload="metadata"
                      />

                      <button
                        type="button"
                        onClick={() => setIsMuted((prev) => !prev)}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                          {isMuted ? (
                            <path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a3.5 3.5 0 0 0-1.1-2.5l1.4-1.4A5.5 5.5 0 0 1 18.5 12a5.5 5.5 0 0 1-1.7 3.9l-1.4-1.4A3.5 3.5 0 0 0 16.5 12ZM3 3l18 18-1.4 1.4L15.8 18H4V9.2L1.6 6.8 3 5.4 4 6.4V9h3.2l5-4V11l2.6 2.6A3.5 3.5 0 0 0 13.5 12c0-.5.1-1 .3-1.4L10.4 7.2v9.2l-4-3.2H4v2.8h9.8l6.8 6.8L3 3Z" fill="currentColor" />
                          ) : (
                            <path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a3.5 3.5 0 0 0-1.1-2.5l1.4-1.4A5.5 5.5 0 0 1 18.5 12a5.5 5.5 0 0 1-1.7 3.9l-1.4-1.4A3.5 3.5 0 0 0 16.5 12Zm2.7 0c0-2.3-.9-4.4-2.6-6l1.4-1.4A10 10 0 0 1 21.2 12a10 10 0 0 1-3.2 7.4l-1.4-1.4a8 8 0 0 0 2.6-6Z" fill="currentColor" />
                          )}
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => shareVideo(video.video)}
                        aria-label="Share video"
                        className="absolute bottom-[26%] right-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_18px_rgba(0,0,0,0.2)]"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                          <path d="M12 3 8.5 6.5l1.4 1.4 1.1-1.1V14h2V6.8l1.1 1.1 1.4-1.4L12 3Zm-7 9v8h14v-8h-2v6H7v-6H5Z" fill="currentColor" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        aria-label="Pause"
                        className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
                      >
                        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-7 w-7">
                          <path d="M6 4h3v12H6V4Zm5 0h3v12h-3V4Z" fill="currentColor" />
                        </svg>
                      </button>

                      <figcaption className="absolute bottom-5 left-4 right-4 rounded-2xl bg-white/95 p-3 text-[var(--foreground)] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                        <div className="flex items-center gap-3">
                          <img src={meta.thumbnail} alt={video.title} className="h-12 w-12 rounded-lg object-cover" loading="lazy" />

                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[1.08rem] font-medium leading-tight">{video.title}</div>
                            <div className="mt-1 flex items-center gap-2 text-[1.95rem]">
                              <span className="text-[2rem] font-semibold leading-tight">{video.price}</span>
                              <span className="text-[0.95rem] text-[#7a7a7a] line-through">{meta.oldPrice}</span>
                              <span className="rounded-full bg-[#fff2f1] px-2 py-0.5 text-[0.92rem] font-semibold text-[#e04f44]">{meta.discount}</span>
                            </div>
                          </div>

                          <span className="text-[2rem] text-[#3d3d3d]">&#8250;</span>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
