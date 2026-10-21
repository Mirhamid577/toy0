import { useEffect, useRef, useState } from "react";

/*
 * Scroll ko'rinishida element "chiqadi" (chorlove usuli):
 * opacity 0 -> 1, translateY(10px) scale(0.88) -> 0 / 1
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  up = false,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setVisible(true), delay);
          obs.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${up ? "reveal-up" : ""} ${visible ? "reveal-visible" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
