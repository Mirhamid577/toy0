import Reveal from "./Reveal.jsx";

/* ❦ bilan bezangan qator */
export default function Divider() {
  return (
    <Reveal className="my-1 flex items-center justify-center gap-3">
      <div className="divider-line" />
      <span className="text-sm text-[#123467] opacity-75 md:text-base">❦</span>
      <div className="divider-line" />
    </Reveal>
  );
}
