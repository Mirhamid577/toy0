import config from "../config.js";
import Reveal from "./Reveal.jsx";

/* "Bog'lanish uchun" — telefon, telegram, instagram */
export default function ContactsSection() {
  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      {/* O'choq / kamin rasm */}
      <Reveal className="relative flex w-full justify-center pb-6 md:pb-10">
        <img
          src="/images/cloud-castle/chim.webp"
          alt=""
          aria-hidden="true"
          className="h-auto w-[480px] object-contain md:w-[680px]"
          loading="lazy"
        />
      </Reveal>

      <Reveal delay={100} className="relative z-10 flex flex-col items-center gap-4 px-6 pb-2">
        <h3
          className="text-sm font-semibold uppercase tracking-[0.15em] opacity-80 md:text-base"
          style={{
            color: "#123467",
            fontFamily: '"Cormorant Garamond", Baskerville, "Times New Roman", serif',
          }}
        >
          <span dir="auto">Bog&apos;lanish uchun</span>
        </h3>

        <div className="flex w-full max-w-[300px] flex-col items-center gap-2.5">
          <ContactRow
            href={config.contactPhoneHref}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            }
            label={config.contactPhone}
          />
          <ContactRow
            href={config.telegramHref}
            external
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            }
            label={config.telegram}
          />
          <ContactRow
            href={config.instagramHref}
            external
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            }
            label={config.instagram}
          />
        </div>
      </Reveal>

      {/* Ajratkich */}
      <Reveal className="flex items-center justify-center gap-3 py-4">
        <div className="h-px w-10 bg-[#123467]/20 md:w-16" />
        <span className="text-xs text-[#123467] opacity-50">✦</span>
        <div className="h-px w-10 bg-[#123467]/20 md:w-16" />
      </Reveal>

      <Reveal as="footer" className="relative z-10 flex flex-col items-center px-6 pb-10 text-center md:px-10 md:pb-14">
        <span
          className="flex flex-col items-center gap-1 whitespace-pre-line font-medium md:text-lg"
          style={{
            color: "#123467",
            fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            lineHeight: 1.6,
          }}
        >
          <span dir="auto">{config.footerText}</span>
        </span>
      </Reveal>
    </div>
  );
}

function ContactRow({ href, icon, label, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 transition-shadow duration-200 hover:shadow-md"
      style={{
        color: "#123467",
        fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", serif',
        borderColor: "rgba(18, 52, 103, 0.12)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(4px)",
        boxShadow: "0 1px 4px rgba(18, 52, 103, 0.06)",
      }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(18, 52, 103, 0.07)" }}
      >
        {icon}
      </span>
      <span className="text-[13px] font-medium tracking-wide md:text-sm">{label}</span>
    </a>
  );
}
