import { useMemo } from "react";

/*
 * Фоновые эффекты: звёздочки ✦ и лепестки падают равномерно по всей ширине,
 * с разных сторон — кто-то уходит влево, кто-то вправо, всё медленно крутится.
 */
export default function BackgroundFX() {
  const petals = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => {
        const left = ((i * 137) % 97) + 1.5; // равномерный разброс по ширине
        const drift = (i % 2 === 0 ? 1 : -1) * (1.5 + ((i * 29) % 4)); // разные стороны
        return {
          key: `p${i}`,
          left,
          width: 7 + ((i * 13) % 7),
          duration: 9 + ((i * 17) % 11),
          delay: -((i * 53) % 13),
          drift,
          light: i % 2 === 0,
        };
      }),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const left = ((i * 61) % 95) + 2;
        const drift = (i % 2 === 1 ? 1 : -1) * (1 + ((i * 23) % 3));
        return {
          key: `s${i}`,
          symbol: i % 3 === 0 ? "✧" : "✦",
          left,
          size: 12 + ((i * 7) % 14),
          duration: 10 + ((i * 19) % 10),
          delay: -((i * 31) % 14),
          drift,
          twinkle: 2.2 + ((i * 13) % 2.4),
          twinkleDelay: -((i * 11) % 3),
        };
      }),
    []
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {/* Звёздочки */}
      {stars.map((s) => (
        <span
          key={s.key}
          className="fall-sparkle"
          style={{
            left: `${s.left}%`,
            fontSize: `${s.size}px`,
            color: "rgba(18, 52, 103, 0.55)",
            filter: "drop-shadow(0 0 7px rgba(255, 255, 255, 0.9))",
            "--drift-x": `${s.drift}vw`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <span
            className="twinkle"
            style={{ animationDuration: `${s.twinkle}s`, animationDelay: `${s.twinkleDelay}s` }}
          >
            {s.symbol}
          </span>
        </span>
      ))}
      {/* Лепестки */}
      {petals.map((p) => (
        <span
          key={p.key}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.width * 1.4}px`,
            background: p.light
              ? "linear-gradient(135deg, rgba(18,52,103,0.5), rgba(18,52,103,0.12))"
              : "linear-gradient(135deg, rgba(120,150,195,0.55), rgba(18,52,103,0.18))",
            "--drift-x": `${p.drift}vw`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
