import config from "../config.js";
import Reveal from "./Reveal.jsx";

/* "To'y manzili" — manzil, Yandex xarita va banner */
export default function MapSection() {
  return (
    <div className="pt-10 md:pt-12">
      <section
        data-landing-screenshot-id="invite-map"
        className="relative flex flex-col gap-6 px-6 pb-12 md:gap-8 md:px-10 md:pb-16"
      >
        <Reveal className="relative text-center">
          <h3
            className="text-center text-[20px] font-bold uppercase md:text-[24px]"
            style={{
              color: "#123467",
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            <span dir="auto">To&apos;y manzili</span>
          </h3>
          <div
            className="mx-auto mt-3 flex max-w-sm flex-col items-center whitespace-pre-line border-b border-[#12346720] pb-3 text-center text-sm tracking-wide md:max-w-[500px] md:text-base"
            style={{
              backgroundColor: "transparent",
              color: "#123467",
              fontFamily: 'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            <span className="font-medium">{config.venueName}</span>
            <span>{config.venueAddress}</span>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative flex w-full flex-col items-center gap-4 md:gap-5">
          <iframe
            title="To'y manzili xarita"
            className="h-[280px] w-full max-w-[340px] overflow-hidden rounded-2xl md:h-[380px] md:max-w-[560px]"
            src={config.mapEmbed}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ borderColor: "#123467" }}
          />
        </Reveal>
      </section>

      <Reveal className="relative flex justify-center pt-2 md:pt-4">
        <img
          src="/images/cloud-castle/ban-tiec.webp"
          alt=""
          aria-hidden="true"
          className="h-auto w-[450px] object-contain md:w-[730px]"
          loading="lazy"
        />
      </Reveal>
    </div>
  );
}
