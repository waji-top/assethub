# Design Brief

## Direction

Premium Digital Asset Marketplace — refined, content-focused platform for discovering and downloading creative assets with trust-forward visual identity.

## Tone

Refined minimalism with editorial clarity. Cool blue primary signals trustworthiness and professional quality; warm coral accent draws attention to premium upgrades and download actions. Every structural zone has intentional treatment — no flat, undifferentiated backgrounds.

## Differentiation

Sophisticated use of negative space combined with clear card hierarchy and premium subscription visual signals (badge treatment, locked-content styling, accent color reservations for CTAs).

## Color Palette

| Token      | OKLCH             | Role                                  |
| ---------- | ----------------- | ------------------------------------- |
| background | 0.98 0.006 240    | Neutral off-white with cool undertone |
| foreground | 0.17 0.012 240    | Deep charcoal for legibility          |
| card       | 1.0 0.002 240     | Pure white for content surfaces       |
| primary    | 0.46 0.16 245     | Trust blue for primary actions        |
| accent     | 0.65 0.18 35      | Warm coral for premium CTAs           |
| muted      | 0.93 0.008 240    | Light grey for secondary elements     |

## Typography

- Display: Space Grotesk — modern, geometric, headings and hero text
- Body: General Sans — humanist, warm, body copy and UI labels
- Scale: Hero `text-5xl md:text-7xl font-bold tracking-tight`, H2 `text-3xl md:text-4xl font-bold`, Label `text-sm font-semibold uppercase tracking-widest`, Body `text-base md:text-lg`

## Elevation & Depth

Card elevation via subtle borders and context-aware shadows (none on hover, 0.8px shadow on cards). No gradients. Surface hierarchy through background colors: white cards on off-white background, muted section backgrounds for alternation. Depth signaled through layering, not atmosphere effects.

## Structural Zones

| Zone    | Background           | Border                   | Notes                                                   |
| ------- | -------------------- | ------------------------ | ------------------------------------------------------- |
| Header  | card (white)         | border-b (8px cool grey) | Logo left, search center (when featured), buttons right |
| Hero    | background           | —                        | Large search bar, trending categories below             |
| Content | background + card    | section borders (subtle) | Alternating muted/card for filter sidebar + grid       |
| Footer  | muted (light grey)   | border-t (subtle)        | Links, legal, social in compact layout                  |

## Spacing & Rhythm

Content sections separated by 4rem gaps. Card grids use 1.5rem gutters (mobile 1rem). Micro-spacing within components: 0.75rem for badge padding, 1rem for card padding, 2rem for section labels. Breathing room creates premium feel and improves scannability.

## Component Patterns

- Buttons: rounded-md, primary (blue bg + white text), secondary (border + grey text), accent (coral bg + white text), all hover-dimmed
- Cards: rounded-md, white bg, subtle border + hover shadow, title + author + badges + metadata
- Badges: premium (coral/10 bg + coral text), license (muted bg + grey text), download count (text only)
- Search: placeholder, filter dropdown, sort selector in toolbar — inline on desktop, stacked on mobile

## Motion

- Entrance: card fade-in + subtle 200ms up-slide on mount (via Framer Motion or CSS animation)
- Hover: shadow-sm → shadow-md, subtle scale(1.02) on cards, text color shift on links
- Decorative: none (refined aesthetic prohibits decorative animations)

## Constraints

- No gradients or glassmorphism
- No neon or glow effects
- Color usage is sparse and intentional (primary for CTAs only, accent for premium/download, destructive for delete/destructive actions)
- Shadows never exceed `shadow-elevated` for premium feel
- Every page section must have a visible treatment (border, background color, or spacing rhythm)

## Signature Detail

Reserved accent color palette: coral is reserved exclusively for premium upgrade CTAs, download buttons, and subscription badges. Every other interactive element uses primary blue. This creates visual scarcity and makes premium actions instantly recognizable.

