import { useEffect, useMemo, useState } from "react";
import config from "../config.js";
import Reveal from "./Reveal.jsx";

const AI_WISHES = [
  "Ustuningizga umr bo'ylar baxt va shodlik!",
  "Sizlarga doim sevgi, hurmat va farah!",
  "Bir umr bir-boringizga mehr bo'lsin!",
  "To'yimizni yodda olib keting, bizni eslab qoling!",
  "Sizga sog'liq, omad va katta baxt tilayman!",
  "Yangi hayotingiz gullab-ochsin!",
];

/* "Tilaklar" — forma va tilaklar ro'yxati */
export default function WishesSection() {
  const stored = useMemo(() => readStoredWishes(), []);
  const [items, setItems] = useState(config.wishes ?? []);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const extra = stored.filter((w) => !items.some((i) => i.text === w.text));
    if (extra.length) setItems((prev) => [...extra, ...prev]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const item = {
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString("en-US"),
    };
    const next = [...stored, item];
    localStorage.setItem("wishes", JSON.stringify(next.slice(-50)));
    setItems((prev) => [item, ...prev]);
    setName("");
    setText("");
  };

  const magic = () => {
    const pick = AI_WISHES[Math.floor(Math.random() * AI_WISHES.length)];
    setText((prev) => (prev ? `${prev} ${pick}` : pick));
  };

  return (
    <section
      data-landing-screenshot-id="invite-guestbook"
      className="relative z-10 flex flex-col items-center px-6 pb-8 pt-10 md:px-10 md:pb-10 md:pt-12"
      style={{
        backgroundColor: "transparent",
        color: "#123467",
        fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", serif',
      }}
    >
      <Reveal className="text-center">
        <h2
          className="mb-6 text-center text-[20px] font-bold uppercase md:text-[24px]"
          style={{
            color: "#123467",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          <span dir="auto">Tilaklar</span>
        </h2>
      </Reveal>

      <Reveal delay={100} className="mx-auto mt-4 w-full max-w-full md:max-w-[600px]">
        <form onSubmit={submit}>
          <div
            className="rounded-2xl border p-6 shadow-sm"
            style={{
              borderColor: "rgba(18, 52, 103, 0.2)",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            }}
          >
            <div className="mb-4">
              <input
                type="text"
                required
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz*"
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  borderColor: "rgba(18, 52, 103, 0.35)",
                  color: "#123467",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              />
            </div>

            <textarea
              required
              rows={4}
              maxLength={400}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Kelin-kuyovga tilatingiz...*"
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors"
              style={{
                borderColor: "rgba(18, 52, 103, 0.35)",
                color: "#123467",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                resize: "none",
              }}
            />

            <div className="mt-4 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={magic}
                  title="Generate wish with AI"
                  className="rounded-lg p-2 text-base leading-none transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "rgba(18, 52, 103, 0.12)", color: "#123467" }}
                >
                  🪄
                </button>
              </div>
              <button
                type="submit"
                className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
                style={{ backgroundColor: "#123467" }}
              >
                <span dir="auto">Tilak yuborish</span>
              </button>
            </div>
          </div>
        </form>
      </Reveal>

      <Reveal
        delay={200}
        className="mx-auto mt-8 max-h-[500px] w-full max-w-full space-y-3 overflow-y-auto pr-2 md:max-w-[600px]"
      >
        {items.map((w, i) => (
          <div
            key={`${w.name}-${i}`}
            className="rounded-xl border p-4 text-sm shadow-sm transition-all hover:border-[#123467]/40"
            style={{
              borderColor: "rgba(18, 52, 103, 0.2)",
              backgroundColor: "rgba(255, 255, 255, 0.45)",
            }}
          >
            <div className="flex items-start justify-between">
              <span className="text-base font-semibold" style={{ color: "#123467" }}>
                {w.name}
              </span>
              {w.date && <span className="text-xs opacity-65">{w.date}</span>}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#123467]">{w.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function readStoredWishes() {
  try {
    return JSON.parse(localStorage.getItem("wishes") || "[]");
  } catch {
    return [];
  }
}
