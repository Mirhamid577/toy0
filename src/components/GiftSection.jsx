import { useState } from "react";
import config from "../config.js";
import Reveal from "./Reveal.jsx";

/* "Sovg'a yuborish" — sovg'a qutisi; ochilganda faqat karta raqami chiqadi */

export default function GiftSection() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const card = config.cardNumber ?? "";
  const formatted = card.replace(/(\d{4})(?=\d)/g, "$1 ");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(card);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Reveal className="relative z-10 flex justify-center py-4">
        <img
          src="/images/cloud-castle/hoa-ngang.webp"
          alt=""
          aria-hidden="true"
          className="h-auto w-[380px] object-contain md:w-[680px]"
          loading="lazy"
        />
      </Reveal>

      <section className="relative z-10 flex flex-col items-center justify-center px-6 py-8 text-center">
        <Reveal
          as="h2"
          className="mb-4 text-center text-[20px] font-bold uppercase tracking-[0.08em] md:text-[24px]"
          style={{
            color: "#123467",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: 700,
          }}
        >
          <span dir="auto">Sovg&apos;a yuborish</span>
        </Reveal>

        <Reveal delay={100} className="relative flex flex-col items-center">
          <button
            type="button"
            aria-label="Open gift box"
            onClick={() => setOpen(true)}
            className="group relative flex cursor-pointer flex-col items-center justify-center border-none bg-transparent outline-none transition-transform hover:scale-[1.03]"
            style={{ width: 260, height: 290 }}
          >
            {/* Yulduzchalar */}
            {[
              { top: "6%", left: "14%", size: 22, delay: "0s" },
              { top: "16%", right: "10%", size: 16, delay: "0.4s" },
              { top: "30%", left: "5%", size: 14, delay: "0.8s" },
              { top: "24%", right: "5%", size: 14, delay: "1.2s" },
            ].map((s, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="pointer-events-none absolute z-20 animate-pulse text-[#123467]"
                style={{ top: s.top, left: s.left, right: s.right, fontSize: s.size, animationDelay: s.delay }}
              >
                ✦
              </span>
            ))}

            <div className="relative flex h-full w-full items-end justify-center pb-[36px]">
              <div className="relative" style={{ width: 200, height: 220 }}>
                {/* soya */}
                <div
                  className="pointer-events-none absolute"
                  style={{
                    left: "50%",
                    bottom: -8,
                    width: 144,
                    height: 12,
                    marginLeft: -72,
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.45)",
                    filter: "blur(4px)",
                    zIndex: 0,
                  }}
                />
                <GiftOrn src="/images/cloud-castle/gift/qasr_green.webp" style={{ left: -20, top: 10, width: 34, zIndex: 1 }} />
                <GiftOrn src="/images/cloud-castle/gift/brocade_flower_red.webp" style={{ left: 168, top: 2, width: 38, zIndex: 1 }} />
                <GiftOrn src="/images/cloud-castle/gift/double_dragon_green.webp" style={{ left: -16, top: 120, width: 26, zIndex: 1 }} />
                <GiftOrn src="/images/cloud-castle/gift/chibi_red.webp" style={{ left: 182, top: 114, width: 24, zIndex: 1 }} />

                <img
                  src="/images/cloud-castle/gift/gift.webp"
                  alt="Gift box"
                  className="pointer-events-none absolute transition-transform duration-300 group-hover:scale-105"
                  style={{
                    left: "50%",
                    bottom: 0,
                    width: 170,
                    maxHeight: 220,
                    objectFit: "contain",
                    marginLeft: -85,
                    zIndex: 2,
                    filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 10px 18px)",
                  }}
                />

                <GiftOrn src="/images/cloud-castle/gift/boho_floral_green.webp" style={{ left: -8, top: 172, width: 44, zIndex: 3 }} />
                <GiftOrn src="/images/cloud-castle/gift/silk_flora_brown.webp" style={{ left: 26, top: 182, width: 26, zIndex: 3 }} />
                <GiftOrn src="/images/cloud-castle/gift/spring_garden_red.webp" style={{ left: 118, top: 176, width: 40, zIndex: 3 }} />
              </div>
            </div>

            <div>
              <span className="inline-flex items-center justify-center rounded-full border border-[#123467]/30 bg-white/85 px-4 py-1.5 text-xs font-bold text-[#123467] shadow-md backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#123467] group-hover:text-white">
                <span dir="auto">Ochish uchun bosing</span>
              </span>
            </div>
          </button>
        </Reveal>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0c2147]/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="gift-card-pop relative w-full max-w-[380px] overflow-hidden rounded-3xl border px-6 py-8 text-center shadow-2xl"
            style={{
              background: "linear-gradient(160deg, #ffffff 0%, #f7f5f0 100%)",
              borderColor: "rgba(18,52,103,0.18)",
              color: "#123467",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* yumshoq nur */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(18,52,103,0.10), transparent 70%)" }}
            />

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-3 text-2xl leading-none opacity-50 transition-opacity hover:opacity-100"
              aria-label="Yopish"
            >
              ×
            </button>

            <div
              className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #123467, rgb(0,22,73))",
                boxShadow: "0 4px 16px rgba(18,52,103,0.35)",
              }}
            >
              <svg style={{ fill: "#ffffff" }} viewBox="0 0 24 24" className="h-7 w-7">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <p
              className="relative mb-1 text-xs uppercase tracking-[0.25em] opacity-70"
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
            >
              <span dir="auto">Karta raqami</span>
            </p>

            <div
              className="relative mx-auto mb-1 h-px w-16"
              style={{ background: "rgba(18,52,103,0.25)" }}
            />

            <p
              className="relative mb-5 text-[22px] font-semibold tracking-[0.12em] tabular-nums md:text-[26px]"
              style={{ fontFamily: '"Lora", "Times New Roman", serif' }}
            >
              {formatted}
            </p>

            <button
              type="button"
              onClick={copy}
              className="relative rounded-full px-7 py-2.5 text-sm font-semibold shadow-md transition-transform hover:scale-105"
              style={{
                backgroundColor: "#123467",
                color: "#ffffff",
                fontFamily: '"Lora", "Times New Roman", serif',
              }}
            >
              <span dir="auto">{copied ? "Nusxalandi ✓" : "Nusxalash"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function GiftOrn({ src, style }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        ...style,
        height: "auto",
        objectFit: "contain",
        filter: "drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 3px)",
      }}
    />
  );
}
