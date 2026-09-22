// ---------------------------------------------------------------------------
// Gallery photos




// ---------------------------------------------------------------------------
// Gallery photos
// ---------------------------------------------------------------------------
// Each item has:
//   id              — unique React key
//   src             — direct image URL (Unsplash/Pexels are whitelisted)
//   alt             — accessibility + SEO text
//   caption         — short label shown on hover
//   category        — "cinematic" | "event" | "wedding"
//   objectPosition  — optional; defaults to "center" in the component
//
// 24 images total — 8 per category.
// The "All" filter picks a curated mix of 8 from across all categories.
// ---------------------------------------------------------------------------

export const galleryPhotos = [
  // =========================================================================
  // CINEMATIC — moody, atmospheric, fine-art, landscape
  // =========================================================================
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1562873657-3ee0f02aceab?w=1600&q=85",
    alt: "Cinematic landscape in soft natural light",
    caption: "Highlands · 2023",
    category: "cinematic",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1570537314561-b57b2d07f0d2?w=1600&q=85",
    alt: "Fine art landscape at dusk",
    caption: "Dolomites · 2023",
    category: "cinematic",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1595766454392-278d29aaaf14?w=1600&q=85",
    alt: "Atmospheric nature scene in warm light",
    caption: "Bologna · 2022",
    category: "cinematic",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1597011652644-586e42146e12?w=1600&q=85",
    alt: "Fine art photograph with rich tones",
    caption: "Milan · 2022",
    category: "cinematic",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/9606970/pexels-photo-9606970.jpeg?w=1600",
    alt: "Misty mountain peak at sunset in Iceland",
    caption: "Iceland · 2021",
    category: "cinematic",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/16155612/pexels-photo-16155612.jpeg?w=1600",
    alt: "Foggy pine forest with towering evergreens",
    caption: "Alps · 2023",
    category: "cinematic",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/35248988/pexels-photo-35248988.jpeg?w=1600",
    alt: "Green grassland and forested hillside in sunlight",
    caption: "Tuscany · 2023",
    category: "cinematic",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/20133656/pexels-photo-20133656.jpeg?w=1600",
    alt: "Blurred abstract trees with dreamy light patterns",
    caption: "Provence · 2024",
    category: "cinematic",
  },      {
    id: 25,
    src: "https://images.pexels.com/photos/13282351/pexels-photo-13282351.jpeg?w=1600",
    alt: "Wide grassy countryside with blue sky and clouds",
    caption: "Aravalli · 2022",
    category: "cinematic",
  },







  // =========================================================================
  // EVENT — celebrations, receptions, launches, people in motion
  // =========================================================================
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1612599542558-f3022089fb38?w=1600&q=85",
    alt: "Celebration gathering in warm ambient light",
    caption: "Reception · 2023",
    category: "event",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1774519680492-a12c0a866b8a?w=1600&q=85",
    alt: "Event atmosphere with evening light",
    caption: "Celebration · 2022",
    category: "event",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1599739291060-4578e77dac5d?w=1600&q=85",
    alt: "Party lights and evening ambiance",
    caption: "Venue · 2023",
    category: "event",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1578736641330-3155e606cd40?w=1600&q=85",
    alt: "Party lights in warm celebration setting",
    caption: "Details · 2023",
    category: "event",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1722332998970-f2335db8ab6d?w=1600&q=85",
    alt: "Concert crowd in dramatic stage light",
    caption: "Live · 2022",
    category: "event",
  },
  {
    id: 14,
    src: "https://images.pexels.com/photos/30852102/pexels-photo-30852102.jpeg?w=1600",
    alt: "Joyful indoor birthday celebration with guests",
    caption: "Birthday · 2023",
    category: "event",
  },
  {
    id: 15,
    src: "https://images.pexels.com/photos/15987494/pexels-photo-15987494.jpeg?w=1600",
    alt: "Crowd dancing at a live concert",
    caption: "Dance · 2023",
    category: "event",
  },
  {
    id: 16,
    src: "https://images.pexels.com/photos/14608917/pexels-photo-14608917.jpeg?w=1600",
    alt: "Ceremony hall decorated with elegant details",
    caption: "Hall · 2023",
    category: "event",
  },

  // =========================================================================
  // WEDDING — couples, details, venues, ceremony moments
  // =========================================================================
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1667945782367-4458a9a8cc27?w=1600&q=85",
    alt: "Wedding moment in warm natural light",
    caption: "Tuscany · 2023",
    category: "wedding",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1655762755958-cc0e10095c24?w=1600&q=85",
    alt: "Wedding cake with elegant styling",
    caption: "Details · 2023",
    category: "wedding",
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1503525642560-ecca5e2e49e9?w=1600&q=85",
    alt: "Wedding celebration in warm light",
    caption: "Vancouver · 2022",
    category: "wedding",
  },
  {
    id: 20,
    src: "https://images.pexels.com/photos/8063134/pexels-photo-8063134.jpeg?w=1600",
    alt: "Guests during a wedding reception",
    caption: "Portrait · 2023",
    category: "wedding",
  },
  {
    id: 21,
    src: "https://images.pexels.com/photos/29370687/pexels-photo-29370687.jpeg?w=1600",
    alt: "Indian bride in traditional attire with jewelry",
    caption: "Bride · 2024",
    category: "wedding",
  },
  {
    id: 22,
    src: "https://images.pexels.com/photos/16468872/pexels-photo-16468872.jpeg?w=1600",
    alt: "Woman in traditional dress and ornate jewelry",
    caption: "Ceremony · 2023",
    category: "wedding",
  },
  {
    id: 23,
    src: "https://images.pexels.com/photos/39538032/pexels-photo-39538032.jpeg?w=1600",
    alt: "Festive outdoor wedding ceremony with family",
    caption: "Ceremony · 2026",
    category: "wedding",
  },
  {
    id: 24,
    src: "https://images.pexels.com/photos/5966185/pexels-photo-5966185.jpeg?w=1600",
    alt: "Bridal shoes and bouquet on a reflective table",
    caption: "Keepsake · 2020",
    category: "wedding",
  },
];

// ---------------------------------------------------------------------------
// Curated "All" mix — hand-picked from across the three categories.
// This is what the "All" tab shows (up to 8 images).
// Order matters — the first image lands in the wide 7-col tile, etc.
// We pick a balanced spread: 3 wedding, 3 cinematic, 2 event.
// ---------------------------------------------------------------------------
export const allPhotosMix = [
  17, // wedding — big warm hero tile (7-col)
  2,  // cinematic — landscape (5-col)
  14, // event — birthday celebration
  21, // wedding — Indian bride portrait
  6,  // cinematic — foggy pine forest
  15, // event — concert crowd
  23, // wedding — outdoor ceremony
  25, // cinematic — wide grass field banner
];

// Helper: returns photos for a given category, up to 8, in a fixed order.
// "all" returns the curated mix.
export function getPhotosByCategory(category) {
  if (category === "all") {
    return allPhotosMix
      .map((id) => galleryPhotos.find((p) => p.id === id))
      .filter(Boolean);
  }
  return galleryPhotos.filter((p) => p.category === category).slice(0, 8);
}

// Filter tab definitions — used by the Gallery component to render the tabs.
export const galleryFilters = [
  { id: "all", label: "All" },
  { id: "cinematic", label: "Cinematic" },
  { id: "event", label: "Event" },
  { id: "wedding", label: "Wedding" },
];











  
// ---------------------------------------------------------------------------
// About section — stats that appear next to the bio
// ---------------------------------------------------------------------------
export const aboutStats = [
  { value: "10+", label: "Years Shooting" },
  { value: "300+", label: "Weddings Captured" },
  { value: "12", label: "Countries Visited" },
];

// ---------------------------------------------------------------------------
// About section — bio copy
// Keeping this here means the whole site's content lives in one file.
// Keeping this here means the whole site's content lives in one file.https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1400&q=85
// Change the studio name, tagline, bio — all in one place.
// ---------------------------------------------------------------------------
export const aboutContent = {
  eyebrow: "About",
  heading: "Hi, I'm Elena.",
  headingAccent: "I chase light.",
  paragraphs: [
    "For the last decade I've been documenting love stories across the world — quiet moments, loud laughter, and everything in between. My approach is documentary at heart, editorial in finish.",
    "I shoot on film and digital, mix warm tones with deep shadows, and believe the best photographs happen when nobody's watching. If you care about the details as much as I do, we'll get along.",
  ],
 
signature: "— Elena Marchetti",
photo: {
  src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1400&q=85",
  alt: "Elena Marchetti, photographer, holding a camera",
  caption: "Elena Marchetti · Aperture",
},
};














// ---------------------------------------------------------------------------
// Services / Pricing section
// ---------------------------------------------------------------------------
// Each package:
//   id          — unique key
//   title       — package name
//   price       — headline price (string so you can format freely: "$3,500", "From $1,800")
//   tagline     — one-line pitch under the price
//   features[]  — what's included
//   highlighted — true for the "recommended" middle card (gets elevated styling)
//   badge       — optional badge text; only used if highlighted
// ---------------------------------------------------------------------------

export const services = [
  {
    id: "wedding",
    title: "Wedding",
    price: "$3,500",
    tagline: "Full-day coverage, one photographer.",
    features: [
      "8 hours of coverage",
      "500+ edited images",
      "Online private gallery",
      "Print release included",
    ],
    highlighted: false,
  },
  {
    id: "signature",
    title: "Signature Collection",
    price: "$5,500",
    tagline: "Wedding + engagement portrait session.",
    features: [
      "10 hours of coverage",
      "700+ edited images",
      "Engagement portrait session",
      "Second photographer",
      "Fine-art print box",
      "Online private gallery",
    ],
    highlighted: true,
    badge: "Most Booked",
  },
  {
    id: "event",
    title: "Event",
    price: "$1,800",
    tagline: "Parties, launches, and celebrations.",
    features: [
      "4 hours of coverage",
      "250+ edited images",
      "Online private gallery",
      "48-hour preview",
    ],
    highlighted: false,
  },
];















// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
// featured: true  → the one big pull-quote at the top
// featured: false → the two supporting quotes below
//
// Quote and attribution are kept short enough to read in one glance,
// long enough to feel human.
// ---------------------------------------------------------------------------

export const testimonials = [
  {
    id: "sofia-marco",
    quote:
      "Elena didn't just photograph our wedding — she remembered it for us. Every time we open the album, we're back in that exact moment, feeling exactly what we felt.",
    name: "Sofia & Marco",
    meta: "Wedding, Amalfi Coast · 2023",
    featured: true,
  },
  {
    id: "rachel-kim",
    quote:
      "She made me forget the camera was there. The portraits feel more like me than any photo I've ever had taken.",
    name: "Rachel Kim",
    meta: "Portrait Session · 2023",
    featured: false,
  },
  {
    id: "daniel-rivera",
    quote:
      "Hired her for our brand launch. She caught small moments I didn't even know happened. The images carried the entire campaign.",
    name: "Daniel Rivera",
    meta: "Event, New York · 2022",
    featured: false,
  },
];















// ---------------------------------------------------------------------------
// Contact section
// ---------------------------------------------------------------------------
// The content for the left column. Swap email/studio/socials here and they
// update everywhere on the site.
//
// NOTE: The actual form is in components/Contact.jsx. When you're ready to
// wire it to a real backend (Formspree, Resend, custom API route), that's a
// separate change — for now the form simulates a submit locally.
// ---------------------------------------------------------------------------

export const contactContent = {
  eyebrow: "Get in Touch",
  heading: "Let's create",
  headingAccent: "something together.",
  paragraph:
    "Tell me a little about your project — the date, the location, the feeling you want to remember. I reply to every inquiry personally within 48 hours.",
  details: [
    {
      label: "Email",
      value: "hello@aperture.co",
      href: "mailto:hello@aperture.co",
    },
    {
      label: "Studio",
      value: "Aperture · Milan · By appointment",
      href: null,
    },
    {
      label: "Social",
      value: "Instagram · Behance",
      href: "https://instagram.com",
    },
  ],
};












// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
// Three pieces:
//   cta       — the big closing call-to-action band
//   columns[] — navigation + social link columns
//   meta      — copyright + credits line
// ---------------------------------------------------------------------------

export const footer = {
  // ---- Big closing CTA ----
  cta: {
    eyebrow: "Let's Work Together",
    heading: "Have a project",
    headingAccent: "in mind?",
    buttonLabel: "Start a conversation",
    buttonHref: "#contact",
  },

  // ---- Middle columns ----
  brand: {
    name: "Aperture",
    tagline: "Fine Art Photography",
    location: "Aperture · Milan · Worldwide",
  },
  columns: [
    {
      title: "Navigate",
      links: [
        { label: "Home", href: "#home" },
        { label: "Gallery", href: "#gallery" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Behance", href: "https://behance.net" },
        { label: "Pinterest", href: "https://pinterest.com" },
      ],
    },
  ],

  // ---- Bottom line ----
  meta: {
    copyright: `© ${new Date().getFullYear()} Aperture · All rights reserved`,
    credit: "Made with care at Aperture, Milan",
  },
};













// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
// The order here defines the order in the navbar.
// The href values match the `id` on each section.
//   - Hero section id: "home"
//   - Gallery id: "gallery"
//   - etc.
// Each link also includes a short label used in the mobile drawer.
// ---------------------------------------------------------------------------

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];