import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { MountainDivider } from "./MountainDivider";
import { heroSlides, heroButtons, heroAutoplayMs } from "@/content/hero";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), heroAutoplayMs);
    return () => clearInterval(id);
  }, [paused]);

  const go = (i: number) => setIndex((i + heroSlides.length) % heroSlides.length);
  const slide = heroSlides[index];

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-10">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <img
              src={s.image}
              alt=""
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="h-full w-full scale-105 object-cover"
              style={{ animation: i === index ? "heroKenBurns 9s ease-out forwards" : "none" }}
            />
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes heroKenBurns { 0% { transform: scale(1.05); } 100% { transform: scale(1.12); } }
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 pb-32 pt-24 text-primary-foreground md:pt-32 lg:px-8 lg:pb-44 lg:pt-40">
        <div className="max-w-3xl" key={index}>
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur"
            style={{ animation: "heroFadeUp 0.7s ease-out both" }}
          >
            <Sparkles className="h-3.5 w-3.5" /> {slide.eyebrow}
          </div>
          <h1
            className="text-balance font-serif text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
            style={{ animation: "heroFadeUp 0.8s 0.1s ease-out both" }}
          >
            {slide.titleStart} <em className="text-sky">{slide.titleHighlight}</em> {slide.titleEnd}
          </h1>
          <p
            className="mt-6 max-w-xl text-pretty text-lg text-primary-foreground/85 md:text-xl"
            style={{ animation: "heroFadeUp 0.9s 0.2s ease-out both" }}
          >
            {slide.body}
          </p>
          <div
            className="mt-9 flex flex-wrap gap-3"
            style={{ animation: "heroFadeUp 1s 0.3s ease-out both" }}
          >
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-ember-foreground shadow-[var(--shadow-elevated)] transition-transform hover:scale-[1.03]"
            >
              <Heart className="h-4 w-4" /> {heroButtons.primary}
            </Link>
            <Link
              to="/causes"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/5 px-7 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-primary-foreground/15"
            >
              {heroButtons.secondary} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/25 bg-primary-foreground/10 backdrop-blur transition-colors hover:bg-primary-foreground/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/25 bg-primary-foreground/10 backdrop-blur transition-colors hover:bg-primary-foreground/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 items-center gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative h-1 flex-1 max-w-24 overflow-hidden rounded-full bg-primary-foreground/20"
              >
                <span
                  className="absolute inset-y-0 left-0 bg-sky"
                  style={{
                    width: i === index ? "100%" : i < index ? "100%" : "0%",
                    transition:
                      i === index && !paused ? `width ${heroAutoplayMs}ms linear` : "width 300ms ease",
                  }}
                />
              </button>
            ))}
          </div>
          <div className="hidden text-xs uppercase tracking-[0.2em] text-primary-foreground/70 md:block">
            {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      <MountainDivider className="absolute bottom-0 left-0 h-16 w-full text-background" />
    </section>
  );
}
