import config from "../config.js";
import Reveal from "./Reveal.jsx";

/* "To'y kuni dasturi" — vaqt o'qi (timeline) */
export default function ProgramSection() {
  const items = config.program ?? [];

  return (
    <div className="relative">
      {/* Chap tomondagi bezaklar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[20px] left-12 top-[90px] z-0 flex flex-col items-start justify-evenly md:left-[25%] md:top-[110px]"
      >
        <img
          src="/images/cloud-castle/nhan.webp"
          alt=""
          className="h-[60px] w-auto object-contain md:h-[80px]"
          loading="lazy"
        />
        <img
          src="/images/cloud-castle/nen.webp"
          alt=""
          className="h-[120px] w-auto object-contain md:h-[160px]"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 mt-10 mb-10 flex flex-col gap-6 px-4 md:mt-12 md:mb-12 md:gap-8">
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
          <span dir="auto">To&apos;y kuni dasturi</span>
        </Reveal>

        <div
          className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10"
          style={{ fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", serif' }}
        >
          {items.map((p, i) => (
            <ProgramRow
              key={`${p.time}-${i}`}
              time={p.time}
              label={p.label}
              position={i === 0 ? "first" : i === items.length - 1 ? "last" : "middle"}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgramRow({ time, label, position, delay = 0 }) {
  const lineStyle = {
    background: "color-mix(in srgb, rgb(18,52,103) 40%, transparent)",
  };

  const line =
    position === "first" ? (
      <span
        className="absolute left-1/2 top-1/2 -bottom-8 w-px -translate-x-1/2 md:-bottom-10"
        style={lineStyle}
      />
    ) : position === "last" ? (
      <span
        className="absolute bottom-1/2 left-1/2 -top-8 w-px -translate-x-1/2 md:-top-10"
        style={lineStyle}
      />
    ) : (
      <span
        className="absolute -bottom-8 -top-8 left-1/2 w-px -translate-x-1/2 md:-bottom-10 md:-top-10"
        style={lineStyle}
      />
    );

  return (
    <>
      <Reveal
        as="span"
        delay={delay}
        className="pt-0.5 text-right text-[16px] font-medium leading-snug tracking-wide tabular-nums md:text-[17px]"
        style={{ color: "#123467" }}
      >
        {time}
      </Reveal>

      <Reveal
        as="span"
        aria-hidden="true"
        delay={delay}
        className="relative flex items-center justify-center self-stretch"
      >
        {line}
        <span
          className="relative z-10 block h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor: "#123467",
            boxShadow: "color-mix(in srgb, rgb(18,52,103) 13%, transparent) 0px 0px 0px 2px",
          }}
        />
      </Reveal>

      <Reveal
        as="span"
        delay={delay}
        className="pt-0.5 text-left text-[17px] font-medium leading-snug md:text-[19px]"
        style={{ color: "#123467" }}
      >
        <span dir="auto">{label}</span>
      </Reveal>
    </>
  );
}
