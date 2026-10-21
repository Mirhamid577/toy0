import { useEffect, useState } from "react";
import config from "../config.js";
import useFirstExisting from "./useFirstExisting.js";

/*
 * FON RASMI (kontent ORTIDA).
 *
 * Qanday ishlaydi:
 *  1) config.js -> background.src da o'z rasmingizni ko'rsating, masalan
 *     "/images/background.jpg". Rasmni public/images/ ichiga soling.
 *  2) background.src bo'sh bo'lsa — sayt avtomatik ravishda qidiradi:
 *     /images/background.jpg, /images/background.webp, /images/background.png,
 *     /images/cloud-castle/background.webp
 *  3) Rasm baland (uzun vertikal) bo'lsa — sahifa bo'ylab cho'zilib ketadi,
 *     keng (oddiy foto) bo'lsa — butun ekranni to'ldiradi (cover).
 */
const AUTO_CANDIDATES = [
  "/images/background.jpg",
  "/images/background.jpeg",
  "/images/background.webp",
  "/images/background.png",
  "/images/cloud-castle/background.webp",
];

export default function BackgroundPhoto() {
  const bg = config.background ?? {};
  const candidates = bg.src ? [bg.src] : bg.autoDetect === false ? [] : AUTO_CANDIDATES;

  const found = useFirstExisting(candidates.length ? candidates : ["/__none__"]);

  const [mode, setMode] = useState(bg.mode === "cover" ? "cover" : bg.mode === "stretch" ? "stretch" : "auto");

  // Rasm o'lchamini o'lchab, "auto" rejimda mos rejimni tanlaymiz
  useEffect(() => {
    if (!found || found === "pending") return;
    if (mode !== "auto") return;
    const img = new Image();
    img.onload = () => {
      const tall = img.naturalHeight / Math.max(1, img.naturalWidth) > 1.2;
      setMode(tall ? "stretch" : "cover");
    };
    img.src = found;
  }, [found, mode]);

  if (!found || found === "pending") return null;

  const opacity = bg.opacity ?? 0.35;
  const veil = bg.veil ?? "rgba(255,255,255,0.62)";
  const blur = bg.blur ? `blur(${bg.blur}px)` : undefined;

  return (
    <>
      {mode === "cover" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          style={{ opacity, filter: blur }}
        >
          <img
            src={found}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: bg.position ?? "center top" }}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={{ opacity, filter: blur }}
        >
          <img
            src={found}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: bg.position ?? "center top" }}
          />
        </div>
      )}

      {/* Ustidan yopiladigan parvoz — matn o'qilishi uchun */}
      <div aria-hidden="true" className="veil" style={{ background: veil, backdropFilter: blur }} />
    </>
  );
}
