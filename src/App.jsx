import { useRef, useState } from "react";
import config from "./config.js";
import Envelope from "./components/Envelope.jsx";
import Hero from "./components/Hero.jsx";
import InvitationSection from "./components/InvitationSection.jsx";
import StoryGallery from "./components/StoryGallery.jsx";
import ReceptionSection from "./components/ReceptionSection.jsx";
import MapSection from "./components/MapSection.jsx";
import ProgramSection from "./components/ProgramSection.jsx";
import WishesSection from "./components/WishesSection.jsx";
import GiftSection from "./components/GiftSection.jsx";
import ContactsSection from "./components/ContactsSection.jsx";
import BackgroundPhoto from "./components/BackgroundPhoto.jsx";
import BackgroundFX from "./components/BackgroundFX.jsx";
import MusicButton from "./components/MusicButton.jsx";

const hasOpenParam = () =>
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("open");

export default function App() {
  // Sahnalash uchun: URL oxiriga ?open qo'shsangiz, muqova o'zi ochiladi.
  const [opened, setOpened] = useState(() => hasOpenParam());
  const [gateGone, setGateGone] = useState(() => hasOpenParam());
  const audioRef = useRef(null);

  const openInvite = () => {
    // Musiqa faqat klikdan keyin ishga tushadi (brauzer autoplay siyosati).
    audioRef.current?.play().catch(() => {});
    setOpened(true);
    // Muqova animatsiyasi tugagach, DOM'dan olib tashlaymiz.
    setTimeout(() => setGateGone(true), 1500);
  };

  return (
    <>
      <audio ref={audioRef} src={config.music} loop preload="metadata" />
      <MusicButton visible={opened} audioRef={audioRef} />

      {!gateGone && <Envelope onOpen={openInvite} opening={opened} />}

      {opened && (
        <div className="relative min-h-screen w-full">
          {/* FON RASMI + parvoz (kontent ortida) */}
          <BackgroundPhoto />
          <BackgroundFX />

          <div className="relative z-10 flex w-full justify-center">
            <main
              className="page-card relative z-10 isolate w-full overflow-x-clip md:mx-auto md:border md:border-[#12346722]"
              style={{ backgroundColor: "transparent", color: "#123467" }}
            >
              {/* Yuqoridagi yirik gul watermark'i */}
              <img
                src="/images/cloud-castle/hoa.webp"
                alt=""
                aria-hidden="true"
                className="floral-float pointer-events-none absolute -left-[25%] top-[640px] z-0 h-[900px] w-auto max-w-none object-contain opacity-[0.15] md:-left-[15%] md:top-[760px] md:h-[1400px] lg:h-[1200px] -z-10"
              />

              <Hero />

              <InvitationSection />
              <StoryGallery />
              <ReceptionSection />
              <MapSection />
              <ProgramSection />

              {/* Dastur va tilaklar orasidagi gul */}
              <div className="pointer-events-none relative z-0 h-0">
                <img
                  src="/images/cloud-castle/hoa.webp"
                  alt=""
                  aria-hidden="true"
                  className="floral-float absolute -top-82 left-0 h-[700px] w-auto max-w-none object-contain opacity-[0.17] md:-top-120 md:left-50 md:h-[800px] -z-10"
                />
              </div>

              <WishesSection />
              <GiftSection />
              <ContactsSection />
            </main>
          </div>
        </div>
      )}
    </>
  );
}
