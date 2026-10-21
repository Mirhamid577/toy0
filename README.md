# To'y taklifnoma — Cloud Castle

Wedding invitation built with **React 19 + Vite 8 + Tailwind CSS v4**.
Design is based on the `cloud-castle` template (chorlove.uz) with a royal-blue palette.

## Features

- **Envelope intro** — falling flowers, seal button, opening animation
- **Hero** — cloud-castle art with scroll-linked parallax (castle scales up, clouds drift away)
- **Background photo** — `cover` / `stretch` / `auto` modes with a white veil
- **Ambient FX** — falling stars and petals
- **Sections** — invitation, program timeline, story gallery (lightbox), reception (countdown + Google Calendar), Yandex map, wishes, gift box (card number only), contacts
- **Music** — fixed bottom-right player with play/pause state
- **Fonts** — fully local (Qellia, Cormorant Garamond, The Nautigal, Great Vibes, Allura, Lora); no external requests

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

Open `/?open=1` to skip the envelope intro.

## Project structure

```
src/
  App.jsx                  page composition
  config.js                all content: names, date, program, contacts, music
  index.css                theme, fonts, keyframe animations
  components/
    Envelope.jsx           intro envelope
    Hero.jsx               castle + scroll parallax
    BackgroundPhoto.jsx    photo background layer
    BackgroundFX.jsx       stars + petals
    InvitationSection.jsx  date & venue
    ProgramSection.jsx     timeline
    StoryGallery.jsx       photos + lightbox
    ReceptionSection.jsx   countdown, calendar
    MapSection.jsx         Yandex map
    WishesSection.jsx      guest wishes
    GiftSection.jsx        gift box + card number modal
    ContactsSection.jsx    phone / telegram / instagram
    MusicButton.jsx        music player
    Reveal.jsx             scroll-reveal wrapper
public/
  images/  fonts/  music/
```

Edit `src/config.js` to change names, date, program, contacts, gift card number or music.
