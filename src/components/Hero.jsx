import { useEffect, useRef } from "react";
import config from "../config.js";

const lerp = (a, b, t) => a + (b - a) * t;

/*
 * Hero: bezak, "To'yimizga xush kelibsiz", ismlar, bulutlar va qal'a.
 * chorlove.uz cloud-castle shabloni kabi: scroll qilinganda qal'a 0.8 -> 1.5
 * kattalashib pastga tushadi, bulutlar yon tomonga uchib ketadi.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const castleRef = useRef(null);
  const cloudLeftRef = useRef(null);
  const cloudRightRef = useRef(null);
  const cloudFarRef = useRef(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      // 0 — hero ekranning tepasida, 1 — hero to'liq o'tib ketganda
      const s = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));

      // Qal'a: 0.8 -> 1.5 o'lcham, 90px pastga
      if (castleRef.current) {
        castleRef.current.style.transform = `translate3d(0, ${lerp(0, 90, s)}px, 0) scale(${lerp(0.8, 1.5, s)})`;
      }
      // Bulutlar yon tomonga ochiladi va xira bo'lib boradi
      if (cloudLeftRef.current) {
        cloudLeftRef.current.style.transform = `translate3d(${lerp(-90, 240, s)}px, 0, 0)`;
        cloudLeftRef.current.style.opacity = String(lerp(0.75, 0.12, s));
      }
      if (cloudRightRef.current) {
        cloudRightRef.current.style.transform = `translate3d(${lerp(145, -260, s)}px, 0, 0)`;
        cloudRightRef.current.style.opacity = String(lerp(0.9, 0.12, s));
      }
      if (cloudFarRef.current) {
        cloudFarRef.current.style.transform = `translate3d(${lerp(-320, 190, s)}px, 0, 0)`;
        cloudFarRef.current.style.opacity = String(lerp(0.9, 0.12, s));
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={heroRef} data-cloud-castle-hero="true" className="relative isolate w-full overflow-hidden">
      <header className="relative z-20 flex w-full flex-col items-center px-4 pb-6 pt-[80px] sm:px-5 md:pb-10 md:pt-[110px]">
        {/* Yuqori bezak */}
        <img
          src="/images/cloud-castle/asset-2.webp"
          alt=""
          aria-hidden="true"
          className="badge-in relative z-30 mb-3 h-[32px] w-auto object-contain opacity-95 md:mb-4 md:h-[38px]"
        />

        {/* "To'yimizga xush kelibsiz" + yon bezaklar */}
        <div className="wings-in relative z-30 flex items-center justify-center gap-3 md:gap-4">
          <img
            src="/images/cloud-castle/asset-1.webp"
            alt=""
            aria-hidden="true"
            className="h-auto w-[56px] object-contain opacity-90 md:w-[80px]"
          />
          <p
            className="whitespace-pre text-center text-xs uppercase tracking-[0.02em] md:text-sm"
            style={{
              fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
              fontWeight: 700,
              color: "#123467",
            }}
          >
            To&apos;yimizga xush kelibsiz
          </p>
          <img
            src="/images/cloud-castle/asset-1.webp"
            alt=""
            aria-hidden="true"
            className="h-auto w-[56px] scale-x-[-1] object-contain opacity-90 md:w-[80px]"
          />
        </div>

        {/* Ismlar */}
        <div
          className="names-in relative z-30 mt-14 flex flex-col items-center text-center leading-none md:mt-20"
          style={{
            fontFamily: '"Fz Qellia", "Cormorant Garamond", cursive',
            color: "#123467",
            textTransform: "uppercase",
          }}
        >
          <span style={{ fontSize: "clamp(38px, 9vw, 70px)", lineHeight: 1.3, paddingTop: "0.18em" }}>
            {config.groom}
          </span>
          <span
            className="my-6 md:my-8"
            style={{
              fontFamily: '"The Nautigal", "Great Vibes", cursive',
              fontSize: "clamp(20px, 4.5vw, 32px)",
              textTransform: "none",
              lineHeight: 1,
              opacity: 0.95,
            }}
          >
            &amp;
          </span>
          <span style={{ fontSize: "clamp(38px, 9vw, 70px)", lineHeight: 1.3, paddingTop: "0.18em" }}>
            {config.bride}
          </span>
        </div>

        {/* Bulutlar + qal'a */}
        <div className="relative mt-6 w-full shrink-0 md:mt-10">
          {/* chap bulut (cloud-3) */}
          <div
            ref={cloudLeftRef}
            className="pointer-events-none absolute -top-[35%] left-[2%] z-0 w-[100%] will-change-transform"
          >
            <img
              src="/images/cloud-castle/cloud-3.webp"
              alt=""
              aria-hidden="true"
              className="cloud-drift block h-auto w-full max-w-none object-contain opacity-70"
            />
          </div>

          {/* o'ng bulut (cloud-1) */}
          <div
            ref={cloudRightRef}
            className="pointer-events-none absolute -top-[50%] right-[-28%] z-0 w-[100%] will-change-transform"
          >
            <img
              src="/images/cloud-castle/cloud-1.webp"
              alt=""
              aria-hidden="true"
              className="cloud-drift cloud-drift-2 block h-auto w-full max-w-none object-contain opacity-90"
            />
          </div>

          {/* uzoq chap bulut (cloud-2) */}
          <div
            ref={cloudFarRef}
            className="pointer-events-none absolute top-[5%] -left-[5%] z-0 w-[90%] will-change-transform"
          >
            <img
              src="/images/cloud-castle/cloud-2.webp"
              alt=""
              aria-hidden="true"
              className="cloud-drift cloud-drift-3 block h-auto w-full max-w-none object-contain opacity-90"
            />
          </div>

          {/* Qal'a — scroll bilan kattalashadi */}
          <img
            ref={castleRef}
            src="/images/cloud-castle/home.webp"
            alt=""
            aria-hidden="true"
            className="castle-fade relative z-10 mx-auto block h-auto w-[600px] max-w-none object-contain md:w-[1280px]"
            style={{ transformOrigin: "50% 100%", willChange: "transform" }}
          />
        </div>
      </header>
    </section>
  );
}
