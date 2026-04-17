# Design Brief

## Tone & Purpose
Maximalist scientific showcase. Dark, vibrant, laboratory-inspired portfolio for Ashwin Singh Chouhan (Pharmacologist & Researcher). Channels molecular energy, precision, and creative research through rich jewel tones and kinetic 3D interactions.

## Palette

| Role | OKLCH | Purpose |
|------|-------|---------|
| Primary | `0.48 0.25 276` | Deep purple—authority, research depth |
| Secondary | `0.55 0.22 198` | Bright blue—clarity, precision |
| Accent | `0.62 0.28 166` | Electric cyan-magenta—scientific energy, CTAs |
| Destructive | `0.65 0.22 22` | Red—critical actions |
| Background | `0.08 0 0` | Near-black—immersive dark canvas |
| Card | `0.12 0 0` | Charcoal—subtle elevation |
| Border | `0.2 0 0` | Subtle dividers |
| Foreground | `0.96 0 0` | Off-white text—high contrast |

## Typography

| Layer | Font | Usage |
|-------|------|-------|
| Display | Space Grotesk | Headlines, hero text—bold geometric energy |
| Body | Satoshi | Body copy, UI text—warm legibility |
| Mono | JetBrains Mono | Code, technical elements |

## Elevation & Depth

| Layer | Shadow | Usage |
|-------|--------|-------|
| None | None | Flat backgrounds, text |
| Subtle | `0 4px 12px rgba(0,0,0,0.15)` | Input fields, minor cards |
| Standard | `0 12px 32px rgba(0,0,0,0.25)` | Content cards, popovers |
| Elevated | `0 24px 48px rgba(0,0,0,0.35)` | Modal overlays, hover states |
| Glow | `0 0 30px oklch(0.62 0.28 166 / 0.4)` | Interactive accents, CTAs |

## Structural Zones

| Zone | Background | Border | Motion | Purpose |
|------|-----------|--------|--------|---------|
| Header | `bg-card` | `border-b border-border` | Static | Navigation, branding |
| Hero | `bg-background` with radial gradient overlay | None | `hero-glow` animation | Immersive intro, 3D background |
| Content | `bg-background` with alternating `bg-card/40` sections | `border-border` | Staggered fade-in | Researches, Articles, Publications |
| Cards | `bg-card` | `border border-border/50` | `card-3d-hover` on interact | 3D transforms, glowing accents |
| Footer | `bg-card/60` | `border-t border-border` | Static | Links, copyright |
| Admin Panel | `bg-card` | `border border-primary/30` | Smooth transitions | Protected dashboard |

## Component Patterns

- **Buttons**: Gradient primary (`gradient-primary`), outline secondary; text uppercase; 12px radius; glow on hover.
- **Cards**: 3D perspective transforms, glowing border accent on hover, layered shadows, min-height content area.
- **Forms**: Dark input (`bg-input`), accent focus ring, helper text in muted foreground.
- **Navigation**: Sticky header, logo left, menu right; mobile hamburger (`sm:` responsive).
- **Grid**: Responsive 1-3 cols (`sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), gap-6.

## Motion & Interaction

- **Micro-interactions**: Smooth 0.3s cubic-bezier(0.4, 0, 0.2, 1) transitions on all interactive elements.
- **3D Hover**: Cards rotate (rotateX 5deg, rotateY -5deg) and lift (translateZ 20px) on hover with glow shadow.
- **Float Animation**: 3s loop on hero elements, decorative particles.
- **Pulse Glow**: 2s infinite on accent highlights and CTAs.
- **Shimmer**: 2s infinite sweep on gradient text, loading states.
- **Staggered Entry**: Content cards fade in with 100ms delay between each card on page load.

## Signature Detail

**Glowing Accents**: All interactive elements and CTAs feature electric cyan glow (`oklch(0.62 0.28 166)`), creating a laboratory/scientific vibe. Glow intensifies on hover—molecular energy radiating from the interface.

## Constraints & Anti-patterns

- ✓ Bold, saturated colors—no desaturation or "muted" tints.
- ✓ 3D transforms on cards and hero elements—no flat, lifeless design.
- ✓ Semantic token usage only—no arbitrary colors or inline styles.
- ✗ No Bootstrap blue or default Tailwind grays.
- ✗ No timid animations or transitions.
- ✗ Never mix color systems (OKLCH only).
- ✗ No rainbow palettes—3 core hues (purple, blue, cyan) with strategic accents.

