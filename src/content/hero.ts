// Homepage hero carousel slides. Each slide shows for ~6.5 seconds.
// The "highlight" word is shown in the accent color inside the title.

import hero1 from "@/assets/hero.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export const heroSlides = [
  {
    image: hero1,
    eyebrow: "Serving Morgan & Weber Counties",
    titleStart: "Bridging the gap,",
    titleHighlight: "one person",
    titleEnd: "at a time.",
    body: "We raise and steward funds that close the distance between what Medicaid and Medicare cover — and what our neighbors actually need.",
  },
  {
    image: hero4,
    eyebrow: "Aging Services",
    titleStart: "Dignity for our",
    titleHighlight: "elders",
    titleEnd: ".",
    body: "Caregiver respite, in-home wellness checks, and connection programs that keep our seniors thriving at home.",
  },
  {
    image: hero2,
    eyebrow: "Mental Health & Prevention",
    titleStart: "Help",
    titleHighlight: "before",
    titleEnd: "the crisis.",
    body: "From school programs to therapy scholarships, we fund the moments that change a young life's trajectory.",
  },
  {
    image: hero3,
    eyebrow: "Community in Action",
    titleStart: "Neighbors",
    titleHighlight: "helping",
    titleEnd: "neighbors.",
    body: "Volunteers, donors, and partners across our two counties — together, we are the bridge.",
  },
];

export const heroButtons = {
  primary: "Donate now",
  secondary: "Explore our causes",
};

export const heroAutoplayMs = 6500;
