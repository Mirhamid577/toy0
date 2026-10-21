import { useEffect, useState } from "react";

/*
 * Musiqa tugmasi — chorlove.uz dagidek:
 *  - pastda o'ng burchakda, 56px dumaloq tugma
 *  - musiqa o'ynayotgan bo'lsa: pushti pulsatsiya bilan "volume-2" belgisi
 *  - to'xtatilgan bo'lsa: "volume-x" (bezak) belgisi
 */
export default function MusicButton({ visible, audioRef }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef?.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    if (!el.paused) setPlaying(true);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, [audioRef]);

  const toggle = () => {
    const el = audioRef?.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-[110] transition-opacity duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Musiqani o'chirish" : "Musiqani yoqish"}
        className="music-fab flex h-14 w-14 items-center justify-center rounded-full border shadow-2xl backdrop-blur-md"
        style={{
          background: "rgba(255,255,255,0.9)",
          border: "1px solid #E5E0D8",
          color: "#A69689",
        }}
      >
        {playing ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="music-pulse"
            style={{ color: "#FFB6C1" }}
          >
            {/* volume-2 — musiqa o'ynayapti */}
            <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z" />
            <path d="M16 9a5 5 0 0 1 0 6" />
            <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* volume-x — musiqa o'chirilgan */}
            <path d="M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z" />
            <path d="m16.5 14.5 5-5" />
            <path d="m16.5 9.5 5 5" />
          </svg>
        )}
      </button>
    </div>
  );
}
