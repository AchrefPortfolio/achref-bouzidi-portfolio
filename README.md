# Achref Bouzidi — Portfolio

Modern editorial React + Vite portfolio with Lenis smooth scrolling, GSAP + ScrollTrigger motion, and lightweight React-Bits-inspired hover interactions.

## Run locally (Windows PowerShell)
1. Extract this ZIP.
2. Open the `achref-final` folder in VS Code.
3. Copy your existing image folders into `public/images/` so paths match: `digital/` and `printed/` (including `printed/mockups/`). Do not rename files; filenames contain spaces and some uppercase extensions.
4. Open Terminal in this project folder and run:
   ```powershell
   npm install
   npm.cmd run dev
   ```
5. Open the localhost URL printed by Vite.

## Images expected
The included `public/images/` already contains the portrait and signature images. Copy these folders from your current working project into the same location: `public/images/digital/` and `public/images/printed/`. The digital gallery is configured for every digital filename visible in the supplied screenshots, including `deam juice.jpg` and `club dete.png` exactly as named there.

## Features
- All / Digital / Printed filters with counts; all 25 digital entries are included.
- Printed project modal galleries link originals with mockups and both business-card faces.
- Original artwork keeps its aspect ratio (`object-fit: contain`) in the project detail gallery.
- Lenis smooth scrolling and GSAP ScrollTrigger reveal animations.
- Contact section uses direct email, phone, Instagram, and LinkedIn links; no fake send-message backend/form.
- Responsive desktop/mobile layout and reduced-motion support.

## Notes
React Bits is a component collection rather than a single runtime dependency; this project uses lightweight CSS hover interactions inspired by that approach instead of adding a random effect package.
