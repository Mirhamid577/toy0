import { useState } from "react";
import config from "../config.js";
import Reveal from "./Reveal.jsx";

/*
 * "Bizning hikoyamiz" — mosaiка galereya (chorlove usuli):
 * 3fr/2fr, 1fr 1fr 0.8fr, pastda esa 2fr/3fr ichki grid.
 */
export default function StoryGallery() {
  const [lightbox, setLightbox] = useState(null);

  const photos = config.gallery ?? [];
  const p = (i) => photos[i] ?? null;
  const extra = Math.max(0, photos.length - 5);

  return (
    <div className="relative w-full">
      {/* Gorizontal gul bezagi */}
      <Reveal className="relative flex justify-center py-2">
        <img
          src="/images/cloud-castle/hoa-ngang.webp"
          alt=""
          aria-hidden="true"
          className="h-auto w-[380px] object-contain md:w-[680px]"
        />
      </Reveal>

      <div className="relative z-10 mb-4 flex flex-col items-center pb-[48px] pt-[36px] md:mb-8 md:pb-[72px] md:pt-[56px]">
        <Reveal
          as="h2"
          className="mb-6 text-center text-[20px] font-bold uppercase md:text-[24px]"
          style={{
            color: "#123467",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          <span dir="auto">Bizning hikoyamiz</span>
        </Reveal>

        <Reveal delay={100} className="mt-6 w-full max-w-[432px] md:max-w-[600px]">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              gridTemplateRows: "1fr 1fr 0.8fr",
              gap: 8,
              aspectRatio: "3 / 4",
            }}
          >
            {/* Chap ustun — baland */}
            <Tile src={p(0)} alt="Story photo 1" style={{ gridColumnStart: 1, gridRowStart: 1, gridRowEnd: 3 }} onClick={() => setLightbox(0)} />

            {/* O'ng ustun — tepa */}
            <Tile src={p(1)} alt="Story photo 2" style={{ gridColumnStart: 2, gridRowStart: 1 }} onClick={() => setLightbox(1)} />

            {/* O'ng ustun — past */}
            <Tile src={p(2)} alt="Story photo 3" style={{ gridColumnStart: 2, gridRowStart: 2 }} onClick={() => setLightbox(2)} />

            {/* Pastki qator: 2fr / 3fr */}
            <div
              style={{
                gridColumnStart: 1,
                gridColumnEnd: 3,
                gridRowStart: 3,
                display: "grid",
                gridTemplateColumns: "2fr 3fr",
                gap: 8,
                minHeight: 0,
              }}
            >
              <Tile src={p(3)} alt="Story photo 4" style={{}} onClick={() => setLightbox(3)} />
              <Tile
                src={p(4)}
                alt="Story photo 5"
                style={{}}
                onClick={() => setLightbox(4)}
                overlay={extra > 0 ? `+${extra}` : null}
              />
            </div>
          </div>
        </Reveal>
      </div>

      {lightbox !== null && photos[lightbox] && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={photos[lightbox]}
            alt=""
            className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white"
            style={{ background: "rgba(255,255,255,0.15)" }}
            aria-label="Yopish"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function Tile({ src, alt, style, onClick, overlay }) {
  if (!src) {
    return (
      <div
        className="rounded-xl"
        style={{ ...style, background: "rgba(18,52,103,0.06)", minHeight: 0 }}
      />
    );
  }
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-xl"
      style={{ ...style, minHeight: 0 }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        style={{ objectPosition: "50% 50%" }}
      />
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[1px]">
          <span className="text-lg font-semibold text-white">{overlay}</span>
        </div>
      )}
    </div>
  );
}
