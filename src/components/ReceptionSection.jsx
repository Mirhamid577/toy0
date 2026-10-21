import { useEffect, useMemo, useState } from "react";
import config from "../config.js";
import Reveal from "./Reveal.jsx";

/* "To'y tantanasi haqida" — sana, sanoq (countdown) va kalendar */

function useCountdown(target) {
  const [left, setLeft] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);
  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/* Dekabr 2026 — 1-dekabr Seshanba: Mo uchun bitta bo'sh katak */
const FIRST_WEEKDAY_INDEX = 1; // 0 = Mo

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function ReceptionSection() {
  const d = config.date;
  const target = useMemo(
    () => new Date(d.year, d.month - 1, d.day, 18, 0, 0).getTime(),
    [d]
  );
  const c = useCountdown(target);

  const calendarHref = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${config.groom} & ${config.bride}`
  )}&dates=${d.year}${String(d.month).padStart(2, "0")}${String(d.day).padStart(2, "0")}T${config.timeLabel.replace(
    ":",
    ""
  )}00/${d.year}${String(d.month).padStart(2, "0")}${String(d.day).padStart(2, "0")}T${config.endTimeLabel.replace(
    ":",
    ""
  )}00&location=${encodeURIComponent(`${config.venueName}, ${config.venueAddress}`)}`;

  const cells = useMemo(() => {
    const out = [];
    for (let i = 0; i < FIRST_WEEKDAY_INDEX; i++) out.push(null);
    const daysInMonth = new Date(d.year, d.month, 0).getDate();
    for (let n = 1; n <= daysInMonth; n++) out.push(n);
    return out;
  }, [d]);

  const serif = 'Baskerville, "Libre Baskerville", "Times New Roman", serif';

  return (
    <div className="relative flex w-full flex-col items-center">
      {/* O'ng tomondagi yirik gul bezagi */}
      <img
        src="/images/cloud-castle/hoa.webp"
        alt=""
        aria-hidden="true"
        className="floral-float pointer-events-none absolute -top-30 right-0 z-0 h-[700px] w-auto max-w-none object-contain opacity-[0.17] md:-top-150 md:right-[20%] md:h-[900px] -z-10"
      />

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
        <span dir="auto">To&apos;y tantanasi haqida</span>
      </Reveal>

      <Reveal
        className="mt-3 flex flex-col items-center gap-4 text-center md:gap-5"
        style={{ fontFamily: serif, color: "#123467" }}
      >
        <h3
          className="flex flex-col items-center text-[16px] uppercase tracking-[0.1em] md:text-[18px]"
          style={{ fontFamily: serif, color: "#123467", fontWeight: 600 }}
        >
          <span dir="auto">Sizni tantanamizga taklif etamiz:</span>
        </h3>

        <div className="text-[20px] md:text-[30px]" style={{ color: "#123467", fontFamily: serif }}>
          {config.timeLabel}
        </div>

        <div className="flex items-center gap-6" style={{ fontFamily: serif }}>
          <span className="text-[12px] uppercase md:text-[16px]" style={{ textAlign: "right" }}>
            <span dir="auto">{config.weekday}</span>
          </span>
          <div className="h-6 w-[2px] md:h-8" style={{ backgroundColor: "#123467" }} />
          <span className="text-[30px] md:text-[40px]">{d.day}</span>
          <div className="h-6 w-[2px] md:h-8" style={{ backgroundColor: "#123467" }} />
          <span className="text-[12px] uppercase md:text-[16px]" style={{ textAlign: "left" }}>
            <span dir="auto">{config.monthUz}</span>
          </span>
        </div>

        <div className="text-[18px] md:text-[24px]" style={{ color: "#123467", fontFamily: serif }}>
          {d.year}
        </div>

        {/* Sanoq */}
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <h2
            className="mb-3 flex flex-col items-center text-[16px] uppercase tracking-[0.1em] md:text-[18px]"
            style={{ fontFamily: serif, color: "#123467", fontWeight: 600 }}
          >
            <span dir="auto">Sanoq boshlandi</span>
          </h2>
          <div className="relative mx-auto flex aspect-[388/160] w-full max-w-[340px] items-center justify-center md:max-w-[420px]">
            <img
              src="/images/cloud-castle/frame-lich.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-fill"
              loading="lazy"
            />
            <div className="relative z-10 grid w-full grid-cols-4 gap-2 px-6 py-4 text-center md:gap-4">
              {[
                [c.days, "Kun"],
                [c.hours, "Soat"],
                [c.minutes, "Daqiqa"],
                [c.seconds, "Soniya"],
              ].map(([v, label]) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[#123467] md:text-2xl">{v}</span>
                  <span className="mt-0.5 text-[10px] font-semibold uppercase text-[#123467] opacity-80 md:text-[12px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Kalendar */}
      <Reveal
        delay={100}
        className="relative mx-auto mt-8 aspect-[388/307] w-full max-w-[340px] md:mt-10 md:max-w-[420px]"
      >
        <img
          src="/images/cloud-castle/frame-lich.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-fill"
          loading="lazy"
        />
        <div className="relative flex h-full w-full items-center justify-center px-7 py-5 md:px-10 md:py-7">
          <div
            className="mx-auto w-full max-w-[280px] overflow-hidden rounded-lg md:max-w-[310px]"
            style={{ borderColor: "color-mix(in srgb, rgb(18,52,103) 27%, transparent)", color: "#123467" }}
          >
            <div
              className="border-b py-2.5 text-center text-[13px] font-semibold tracking-wide md:text-[14px]"
              style={{ borderColor: "color-mix(in srgb, rgb(18,52,103) 27%, transparent)" }}
            >
              {config.monthLatin} {d.year}
            </div>
            <div className="grid grid-cols-7 border-b-2" style={{ borderColor: "#123467" }}>
              {WEEKDAYS.map((w) => (
                <div key={w} className="py-1.5 text-center text-[10px] font-medium opacity-60 md:text-[11px]">
                  {w}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
              {cells.map((n, i) => (
                <div key={i} className="flex h-[30px] items-center justify-center md:h-[34px]">
                  {n === null ? null : n === d.day ? (
                    <HeartDay n={n} />
                  ) : (
                    <span className="text-[12px] md:text-[13px]">{n}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Kalendar tugmasi */}
      <Reveal delay={150} className="z-10 mt-6 flex justify-center md:mt-8">
        <a
          href={calendarHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center transition-opacity hover:opacity-90"
        >
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full px-7 py-2.5 text-sm font-semibold tracking-wider shadow-md transition-transform hover:scale-[1.03] md:text-base"
            style={{ backgroundColor: "#123467", color: "#fff", fontFamily: serif }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span dir="auto">Kalendariga qo&apos;shish</span>
            </span>
          </button>
        </a>
      </Reveal>
    </div>
  );
}

function HeartDay({ n }) {
  return (
    <div className="relative flex h-[24px] w-[26px] items-center justify-center md:h-[28px] md:w-[30px]">
      <svg viewBox="0 0 24 22" className="absolute inset-0 h-full w-full drop-shadow-sm" fill="#123467" aria-hidden="true">
        <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
      </svg>
      <span className="relative z-10 text-[11px] font-bold md:text-[12px]" style={{ color: "#fff" }}>
        {n}
      </span>
    </div>
  );
}
