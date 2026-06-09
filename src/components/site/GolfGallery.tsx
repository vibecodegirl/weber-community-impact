import { useState } from "react";
import { X } from "lucide-react";
import img1 from "@/assets/gallery/DSC_5520-1.jpg.asset.json";
import img2 from "@/assets/gallery/WHS-Golf-Tournament-2025-056-1024x683.jpg.asset.json";
import img3 from "@/assets/gallery/WHS-Golf-Tournament-2025-060-1024x683.jpg.asset.json";
import img4 from "@/assets/gallery/WHS-Golf-Tournament-2025-013-1024x683.jpg.asset.json";
import img5 from "@/assets/gallery/WHS-Golf-Tournament-2025-028-1024x683.jpg.asset.json";
import img6 from "@/assets/gallery/WHS-Golf-Tournament-2025-022-1024x787.jpg.asset.json";
import img7 from "@/assets/gallery/WHS-Golf-Tournament-2025-045-1-741x1024.jpg.asset.json";
import img8 from "@/assets/gallery/WHS-Golf-Tournament-2025-056-1-1024x514.jpg.asset.json";
import img9 from "@/assets/gallery/WHS-Golf-Tournament-2025-082-796x1024.jpg.asset.json";
import img10 from "@/assets/gallery/WHS-Golf-Tournament-2025-159-591x1024.jpg.asset.json";

const photos = [
  { src: img1.url, alt: "Golfer teeing off with mountain views in the background" },
  { src: img2.url, alt: "Attendees gathered outside the Wolf Creek clubhouse at sunset" },
  { src: img3.url, alt: "Row of golf carts lined up before the shotgun start" },
  { src: img4.url, alt: "Raffle prize baskets on display" },
  { src: img5.url, alt: "Golfer checking in at the registration table" },
  { src: img6.url, alt: "Guests browsing raffle baskets near the clubhouse" },
  { src: img7.url, alt: "Two friends sharing a hug at the tournament" },
  { src: img8.url, alt: "Tournament-goers mingling near the clubhouse" },
  { src: img9.url, alt: "Golfers waving from their Wolf Creek cart" },
  { src: img10.url, alt: "Volunteers staffing The Insurance Center hole sponsor table" },
];

export function GolfGallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mb-10 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ember">Gallery</div>
          <h2 className="font-serif text-3xl text-primary md:text-4xl">Moments from past tournaments</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            A look at the friends, foursomes, and Wolf Creek views that make this day special.
          </p>
        </div>

        <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpenIdx(i)}
              className="group mb-3 block w-full overflow-hidden rounded-xl bg-muted shadow-[var(--shadow-soft)] focus:outline-none focus:ring-2 focus:ring-ember"
              aria-label={`Open photo: ${p.alt}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpenIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpenIdx(null)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={photos[openIdx].src}
            alt={photos[openIdx].alt}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
