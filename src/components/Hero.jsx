import { useEffect, useRef } from "react";
import config from "../config.js";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.min(1, Math.max(0, v));

/*
 * Hero: bezak, "To'yimizga xush kelibsiz", ismlar, bulutlar va qal'a.
 * chorlove.uz cloud-castle shabloni kabi: scroll qilinganda qal'a 0.8 -> 1.5
 * kattalashib pastga tushadi, bulutlar yon tomonga uchib ketadi.
 *
 * Telefonda:
 *  - o'lchovlar (hero balandligi/joylashuvi) bir marta hisoblanadi, scroll'da
 *    `getBoundingClientRect()` chaqirilmaydi -> titrash (jank) bo'lmaydi;
 *  - qal'a wrapper orqali doim ekran markazida turadi (avval chapga surilgan edi);
 *  - kattalashish diapazoni kichikroq, shuning uchun GPUda yumshoq chiziladi.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const castleRef = useRef(null);
  const cloudLeftRef = useRef(null);
  const cloudRightRef = useRef(null);
  const cloudFarRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    let heroTop = 0;
    let heroHeight = 1;
    let compact = false;
    let reduced = false;

    const mq = window.matchMedia("(max-width: 767px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      heroTop = rect.top + window.scrollY;
      heroHeight = Math.max(rect.height, 1);
      compact = mq.matches;
      reduced = rmq.matches;
    };

    const update = () => {
      raf = 0;
      const hero = heroRef.current;
      if (!hero) return;

      // Kamaytirilgan harakat yoq bo'lsa — parallax o'chiriladi
      if (reduced) {
        if (castleRef.current) {
          castleRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
        }
        return;
      }

      // 0 — hero ekranning tepasida, 1 — hero to'liq o'tib ketganda
      const s = clamp01((window.scrollY - heroTop) / heroHeight);

      // Qal'a: telefonda kichikroq diapazon (jank kamayadi), desktop'da kattaroq
      const scaleFrom = compact ? 0.92 : 0.8;
      const scaleTo = compact ? 1.22 : 1.5;
      const drop = compact ? 42 : 90;

      if (castleRef.current) {
        const scale = lerp(scaleFrom, scaleTo, s).toFixed(4);
        const y = lerp(0, drop, s).toFixed(2);
        castleRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
      }
      // Bulutlar yon tomonga ochiladi va xira bo'lib boradi
      if (cloudLeftRef.current) {
        cloudLeftRef.current.style.transform = `translate3d(${lerp(-90, 240, s).toFixed(2)}px, 0, 0)`;
        cloudLeftRef.current.style.opacity = String(lerp(0.75, 0.12, s));
      }
      if (cloudRightRef.current) {
        cloudRightRef.current.style.transform = `translate3d(${lerp(145, -260, s).toFixed(2)}px, 0, 0)`;
        cloudRightRef.current.style.opacity = String(lerp(0.9, 0.12, s));
      }
      if (cloudFarRef.current) {
        cloudFarRef.current.style.transform = `translate3d(${lerp(-320, 190, s).toFixed(2)}px, 0, 0)`;
        cloudFarRef.current.style.opacity = String(lerp(0.9, 0.12, s));
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    update();

    // Hero balandligi o'zgarganda (font/rasm yuklanganida) qayta o'lchaymiz
    const ro = new ResizeObserver(() => {
      measure();
      schedule();
    });
    if (heroRef.current) ro.observe(heroRef.current);

    const onResize = () => {
      measure();
      schedule();
    };
    const onMq = () => {
      measure();
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", onMq);
    rmq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onMq);
      rmq.removeEventListener("change", onMq);
      ro.disconnect();
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

          {/* Qal'a — scroll bilan kattalashadi.
              Wrapper qal'ani har ekran o'lchamida markazda ushlab turadi
              (transform wrapper'da, scroll o'zgarishi esa rasmda — ular to'qnashmaydi). */}
          <div className="relative z-10 mx-auto w-full">
            <div className="castle-fade relative left-1/2 w-[600px] -translate-x-1/2 md:w-[1280px]">
              <img
                ref={castleRef}
                src="/images/cloud-castle/home.webp"
                alt=""
                aria-hidden="true"
                className="block h-auto w-full max-w-none object-contain"
                style={{ transformOrigin: "50% 100%", willChange: "transform" }}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}
