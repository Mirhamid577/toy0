import { useMemo } from "react";
import config from "../config.js";

/* 6瓣花瓣图标 —— 信封里飘落的花瓣（与 chorlove.uz 一致） */
function FlowerIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="1em"
      height="1em"
      className={className}
      aria-hidden="true"
    >
      <g>
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)" />
      </g>
      <circle cx="12" cy="12" r="1.8" fillOpacity="0.45" />
    </svg>
  );
}

/*
 * Ochish qopqog'i (envelope) — chorlove.uz cloud-castle shabloni kabi:
 * to'q ko'k gradient fon, yurak muhri, oq kartochka, "Taklifnomani ochish".
 * Ochilganda: kartochka ko'tariladi (y:-35, scale 1.08) va so'nadi,
 * gul bezaklari 3.2x kattalashib yoyilib ketadi, gullar markazdan uchib chiqadi.
 */
export default function Envelope({ onOpen, opening }) {
  /* Sana: "16-Dekabr 2026" */
  const d = config.date;
  const monthTitle = config.monthUz.charAt(0) + config.monthUz.slice(1).toLowerCase();
  const dateLabel = `${d.day}-${monthTitle} ${d.year}`;

  /* 32 ta yiqlib tushadigan gul (deterministik tasodifiylik) */
  const flowers = useMemo(() => {
    const rand = (seed) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: 32 }, (_, i) => {
      const angle = (i / 32) * Math.PI * 2 + (rand(i + 1) - 0.5) * 0.4;
      const dist = 250 + 350 * rand(i + 2);
      return {
        id: i,
        left: `${(i / 32) * 100 + (rand(i + 3) - 0.5) * 6}%`,
        top: `${rand(i + 4) * 120 - 20}vh`,
        size: Math.floor(14 + 18 * rand(i + 5)),
        duration: 7 + 7 * rand(i + 6),
        delay: 5 * rand(i + 7),
        sway: 60 * rand(i + 8) - 30,
        burstX: Math.cos(angle) * dist,
        burstY: Math.sin(angle) * dist,
        opacity: 0.35 + 0.45 * rand(i + 9),
      };
    });
  }, []);

  return (
    <div
      dir="ltr"
      onClick={onOpen}
      className={`envelope ${opening ? "envelope-opening" : ""}`}
      style={{ background: "linear-gradient(to bottom right, #0c2147, #123467, #1a4080)" }}
    >
      {/* Yiqilib tushadigan gullar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="gate-glow" />
        {flowers.map((f) => (
          <span
            key={f.id}
            className="ff"
            style={{
              left: f.left,
              top: f.top,
              fontSize: `${f.size}px`,
              "--op": f.opacity,
              "--sway": `${f.sway}px`,
              "--bx": `${f.burstX}px`,
              "--by": `${f.burstY}px`,
              "--brot": `${f.sway * 12}deg`,
            }}
          >
            <span className="ff-y" style={{ animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s` }}>
              <span className="ff-x" style={{ animationDuration: `${f.duration}s` }}>
                <span className="ff-burst">
                  <FlowerIcon />
                </span>
              </span>
            </span>
          </span>
        ))}
      </div>

      <div className="envelope-card relative z-10">
        <div className="envelope-enter relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          {/* Yurak muhri */}
          <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen?.();
              }}
              aria-label="Taklifnomani ochish"
              className="envelope-seal flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none transition-transform duration-300 hover:scale-110 active:scale-95"
              style={{
                background: "radial-gradient(circle at 30% 30%, #123467, rgb(0, 22, 73))",
                boxShadow:
                  "0 4px 20px rgba(18, 52, 103, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.45)" }}
              />
              <span
                aria-hidden="true"
                className="seal-pulse absolute inset-0 rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.55)" }}
              />
              <svg style={{ fill: "#ffffff" }} viewBox="0 0 24 24" className="h-7 w-7">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          <div className="relative rounded-lg">
            {/* Oq kartochka + gul bezaklari */}
            <div
              className={`absolute inset-0 rounded-lg ${opening ? "overflow-visible" : "overflow-hidden"}`}
              style={{
                background: "rgba(255, 255, 255, 0.98)",
                border: "1px solid rgba(18, 52, 103, 0.15)",
              }}
            >
              <img
                src="/images/cloud-castle/hoa.webp"
                alt=""
                aria-hidden="true"
                className="envelope-floral pointer-events-none absolute left-0 top-1/2 w-[64%] max-w-[300px] origin-center -translate-x-[35%] -translate-y-1/2 rotate-[15deg] opacity-[0.18] md:max-w-[360px]"
              />
              <img
                src="/images/cloud-castle/hoa.webp"
                alt=""
                aria-hidden="true"
                className="envelope-floral pointer-events-none absolute right-0 top-1/2 w-[64%] max-w-[300px] origin-center translate-x-[35%] -translate-y-1/2 rotate-[15deg] scale-x-[-1] opacity-[0.18] md:max-w-[360px]"
              />
            </div>

            <div className="relative z-10 px-6 pb-14 pt-28 text-center md:pb-8 md:pt-24">
              <p
                dir="auto"
                className="mb-5 text-base font-light sm:text-lg"
                style={{ color: "rgba(18, 52, 103, 0.78)", fontFamily: '"Lora", "Times New Roman", serif' }}
              >
                Assalomu alaykum, aziz mehmon
              </p>
              <h1
                className="mb-5 text-4xl leading-tight sm:text-6xl"
                style={{
                  color: "#123467",
                  fontFamily: '"Fz Qellia", "Cormorant Garamond", cursive',
                }}
              >
                Taklifnoma
              </h1>

              {/* Ismlar */}
              <h2
                className="mb-4 flex flex-row items-center justify-center gap-2 leading-tight sm:gap-3"
                style={{
                  color: "#123467",
                  fontFamily: '"Allura", "The Nautigal", "Great Vibes", cursive',
                  fontSize: "clamp(38px, 9vw, 62px)",
                  textShadow: "0 2px 18px rgba(18, 52, 103, 0.18)",
                }}
              >
                <span className="block text-center">{config.groom}</span>
                <span className="block text-center text-[22px] leading-none sm:text-3xl">&amp;</span>
                <span className="block text-center">{config.bride}</span>
              </h2>

              <div className="mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-10" style={{ background: "rgba(18,52,103,0.35)" }} />
                <span className="text-xl" style={{ color: "#123467", opacity: 0.7 }}>
                  <FlowerIcon />
                </span>
                <div className="h-px w-10" style={{ background: "rgba(18,52,103,0.35)" }} />
              </div>

              {/* Sana */}
              <p
                dir="auto"
                className="mb-6 text-[21px] sm:text-[24px] md:text-[27px]"
                style={{
                  color: "rgba(18, 52, 103, 0.8)",
                  fontFamily: '"Fz Qellia", "Cormorant Garamond", serif',
                  letterSpacing: "0.02em",
                }}
              >
                {dateLabel}
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen?.();
                }}
                disabled={opening}
                className="btn-shimmer relative mx-auto flex items-center justify-center overflow-hidden rounded-full px-8 py-2.5 text-lg font-semibold shadow-lg sm:font-medium"
                style={{
                  backgroundColor: "#123467",
                  color: "#ffffff",
                  boxShadow: "0 4px 14px rgba(18, 52, 103, 0.35)",
                  fontFamily: '"Lora", "Times New Roman", serif',
                }}
              >
                <span dir="auto">Taklifnomani ochish</span>
                <div
                  className="pointer-events-none absolute top-0 h-full w-8"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "shimmer 2.6s ease-in-out infinite",
                  }}
                />
              </button>

              <p
                className="mt-5 text-[12px] uppercase tracking-[0.28em] sm:text-[13px]"
                style={{ color: "rgba(18, 52, 103, 0.5)" }}
              >
                <span dir="auto">Yurakni bosing</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
