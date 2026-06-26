# Design System: GSSoC Tracker (Crimson Protocol)

## 1. Visual Theme & Atmosphere
A restrained, gallery-airy interface with confident asymmetric layouts and fluid spring-physics motion. The atmosphere is clinical yet powerful — like a high-end data terminal. It relies heavily on negative space and stark typography.

## 2. Color Palette & Roles
- **Canvas Night** (#09090B) — Primary background surface (Zinc-950)
- **Pure Surface** (#18181B) — Card and container fill (Zinc-900)
- **Ghost White** (#FAFAFA) — Primary text (Zinc-50)
- **Muted Steel** (#A1A1AA) — Secondary text, descriptions, metadata (Zinc-400)
- **Whisper Border** (rgba(255,255,255,0.08)) — Card borders, 1px structural lines
- **Crimson Engine** (#E11D48) — Single accent for CTAs, active states, focus rings

## 3. Typography Rules
- **Display:** Cabinet Grotesk — Track-tight, controlled scale, weight-driven hierarchy
- **Body:** Satoshi — Relaxed leading, 65ch max-width, neutral secondary color
- **Mono:** JetBrains Mono — For code, metadata, timestamps, high-density numbers
- **Banned:** Inter, generic system fonts for premium contexts. Serif fonts banned in dashboards.

## 4. Component Stylings
* **Buttons:** Flat, no outer glow. Tactile -1px translate on active. Crimson fill for primary, ghost/outline for secondary.
* **Cards:** Subtly rounded corners (12px or 0.75rem). Diffused whisper shadow. High-density: replace with border-top dividers.
* **Inputs:** Label above, error below. Focus ring in accent color.
* **Loaders:** Skeletal shimmer matching exact layout dimensions. No circular spinners.
* **Empty States:** Composed, illustrated compositions — not just "No data" text.

## 5. Layout Principles
Grid-first responsive architecture. Asymmetric splits for Hero sections. Strict single-column collapse below 768px. Max-width containment (1200px). No flexbox percentage math. Generous internal padding.

## 6. Motion & Interaction
Spring physics for all interactive elements. Staggered cascade reveals. Perpetual micro-loops on active dashboard components. Hardware-accelerated transforms only.

## 7. Anti-Patterns (Banned)
NEVER DO:
- No emojis anywhere
- No Inter font
- No generic serif fonts (Times New Roman, Georgia, Garamond)
- No pure black (#000000)
- No neon/outer glow shadows
- No oversaturated accents
- No excessive gradient text on large headers
- No custom mouse cursors
- No overlapping elements — clean spatial separation always
- No 3-column equal grids
- No generic names ("John Doe", "Acme", "Nexus")
- No fabricated data or statistics.
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash")
- No filler UI text: "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons
- No centered Hero sections
