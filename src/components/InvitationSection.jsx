import config from "../config.js";
import Reveal from "./Reveal.jsx";
import Divider from "./Divider.jsx";

/* "NIKOH TO'YI" — taklifnomaning asosiy qismi */
export default function InvitationSection() {
  const d = config.date;

  return (
    <section className="relative isolate z-10 px-[12px] pb-[56px] pt-[8px] md:px-[24px] md:pb-[80px] md:pt-[40px]">
      <div className="relative z-10 flex flex-col gap-6 md:gap-8">
        <Reveal
          as="h2"
          className="text-center text-[20px] font-bold uppercase md:text-[24px]"
          style={{
            color: "#123467",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          <span dir="auto">NIKOH TO&apos;YI</span>
        </Reveal>

        <Reveal className="relative flex flex-col items-center gap-2 text-center md:gap-3">
          <p
            className="text-xs font-semibold uppercase tracking-[0.22em] opacity-80 sm:text-sm"
            style={{
              color: "#123467",
              fontFamily: '"Cormorant Garamond", Baskerville, "Times New Roman", serif',
            }}
          >
            <span dir="auto">Kuyov &amp; Kelin</span>
          </p>

          <div
            className="mt-1 flex flex-wrap items-center justify-center gap-3 leading-tight sm:gap-4"
            style={{ color: "#123467" }}
          >
            <span
              style={{
                fontFamily: '"Allura", "The Nautigal", cursive',
                fontSize: "clamp(32px, 6vw, 48px)",
                fontWeight: 500,
                lineHeight: 1.1,
              }}
            >
              {config.groom}
            </span>
            <span
              style={{
                fontFamily: '"The Nautigal", "Great Vibes", cursive',
                fontSize: "clamp(22px, 4vw, 34px)",
                color: "#123467",
              }}
            >
              &amp;
            </span>
            <span
              style={{
                fontFamily: '"Allura", "The Nautigal", cursive',
                fontSize: "clamp(32px, 6vw, 48px)",
                fontWeight: 500,
                lineHeight: 1.1,
              }}
            >
              {config.bride}
            </span>
          </div>

          <div
            className="mt-1 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-90 md:text-sm"
            style={{
              color: "#123467",
              fontFamily: '"Cormorant Garamond", Baskerville, "Times New Roman", serif',
            }}
          >
            <span>{config.weekday}</span>
            <span className="opacity-60">•</span>
            <span>
              {d.day} {config.monthLatin} {d.year}
            </span>
          </div>
        </Reveal>

        <Divider />

        <Reveal
          className="relative mx-auto mt-1 flex max-w-[640px] flex-col gap-2 px-4 text-center text-[15px] md:text-[18px]"
          style={{
            whiteSpace: "pre-line",
            fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            color: "#123467",
            lineHeight: 1.65,
          }}
        >
          <span dir="auto">{config.invitationText}</span>
        </Reveal>

        <Divider />

        <Reveal className="relative mx-auto flex max-w-[640px] flex-col items-center gap-1.5 px-4 text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] opacity-75 md:text-sm"
            style={{
              color: "#123467",
              fontFamily: '"Cormorant Garamond", Baskerville, "Times New Roman", serif',
            }}
          >
            Hurmat bilan:
          </span>
          <span
            className="text-[17px] font-semibold tracking-wide md:text-[21px]"
            style={{
              whiteSpace: "pre-line",
              fontFamily: '"Cormorant Garamond", Baskerville, "Times New Roman", serif',
              color: "#123467",
            }}
          >
            {config.family} oilasi
          </span>
        </Reveal>
      </div>
    </section>
  );
}
