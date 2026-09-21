---
name: In The Mix Bartending Boot Camp
description: A midnight service rail that turns the supplied event flyer into a clear class journey.
colors:
  ink: "#050506"
  bar-black: "#0c0b0f"
  bar-soft: "#15121a"
  cream: "#fff6e7"
  cream-muted: "#d6cabb"
  warm-gold: "#e7b75e"
  deep-gold: "#8d6129"
  magenta-light: "#ef248f"
  blue-light: "#476dff"
  danger: "#ff6e79"
  success: "#89d6a2"
  metallic-line: "rgba(231, 183, 94, 0.3)"
typography:
  display:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(3.3rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  editorial:
    fontFamily: "Cormorant Garamond, serif"
    fontWeight: 600
    lineHeight: 1
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  square: "0"
  circular: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "28px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.warm-gold}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 24px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
  input:
    backgroundColor: "#fffaf1"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0 14px"
    height: "52px"
  form-panel:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "clamp(28px, 5vw, 58px)"
---

# Design System: In The Mix Bartending Boot Camp

## Overview

**Creative North Star: "Midnight Service Rail"**

The visual system feels like an after-hours bar prepared for service. Black lacquer creates the room. Warm metal marks the route. Cream surfaces make detailed information usable. Magenta and electric-blue venue light provide controlled nightlife energy.

The supplied circular logo and event flyer are evidence, not decoration. Compressed event type carries urgency. Editorial serif accents add ceremony. Long rules, date rails, and square controls keep the page direct and operational.

**Key Characteristics:**

- Black lacquer fields with warm-gold service markers.
- One readable supplied flyer as the main image artifact.
- Compressed display type paired with restrained editorial serif accents.
- Thin metallic rules, square controls, and strong horizontal rails.
- One opening light sweep, restrained scroll reveals, and a complete static reduced-motion state.

## Colors

The palette uses warm metal and cream against near-black surfaces, with magenta and blue reserved for venue light, focus, and high-energy transitions.

### Primary

- **Warm Gold:** Main actions, dates, rails, tags, and high-value emphasis.
- **Deep Gold:** Secondary metal detail and the custom scrollbar thumb.

### Secondary

- **Magenta Light:** Nightlife light, choice-control accents, and progress.
- **Blue Light:** Nightlife light, keyboard focus, and input focus.

### Neutral

- **Ink:** Page ground and dark text on light surfaces.
- **Bar Black:** Near-black support surface.
- **Bar Soft:** Reserved dark surface variation.
- **Cream:** Primary text and the form or curriculum surface.
- **Cream Muted:** Supporting copy on dark surfaces.
- **Metallic Line:** Low-contrast section dividers and service rails.

### Named Rules

**The Venue-Light Rule.** Magenta and blue create localized light or deliberate split fields. They do not replace gold as the primary action color.

**The Metal Marks the Route Rule.** Use warm gold for the next action, verified dates, and thin navigation cues. Do not flood every dark surface with it.

## Typography

**Display Font:** Bebas Neue (with sans-serif fallback)

**Editorial Font:** Cormorant Garamond (with serif fallback)

**Body and Label Font:** DM Sans (with sans-serif fallback)

**Character:** Bebas Neue delivers compact event authority. Cormorant Garamond gives key phrases, names, and outcome language a refined cadence. DM Sans keeps instructions, labels, and form content plain and readable.

### Hierarchy

- **Display:** Uppercase, tightly led, and used for hero or section statements.
- **Editorial:** Semibold serif used for the hero turn, schedule names, and prominent outcome language.
- **Body:** Regular sans serif with a readable measure near 58–60 characters on dark fields.
- **Label:** Bold uppercase sans serif for navigation, action text, dates, tags, and service labels.

### Named Rules

**The Compressed Event Rule.** Use the display face for short statements. Do not use it for instructions, paragraphs, or form recovery messages.

**The Serif Turn Rule.** Use the editorial face where the voice shifts from instruction to ceremony or aspiration.

## Layout

The main container stops at 1180px and keeps 20px edge space on wider screens. Sections use large vertical intervals, asymmetrical two-column compositions, and long horizontal dividers instead of card grids.

Desktop pairs invitation copy with the readable flyer, then alternates rails, ledgers, and split fields. At 900px, the hero and major two-column sections stack, centered hero actions take priority, and the sticky registration summary becomes static. At 680px, the page edge tightens to 14px, ledgers become one column, the venue split turns vertical, name fields stack, and the footer becomes a vertical block.

**The Flyer Remains Evidence Rule.** Keep the supplied flyer large enough to read. On mobile, place it after the identity, invitation, dates, and signup action instead of shrinking it into a decorative thumbnail.

## Elevation & Depth

The system uses deep shadow and tonal light. The circular logo, flyer, primary button, and registration form receive concentrated black shadows. Most content stays flat and gains structure from color fields, rules, and contrast. Magenta and blue radial light appears behind the hero, while one narrow gold beam crosses it once.

### Shadow Vocabulary

- **Logo lift** (`0 18px 50px rgba(0, 0, 0, 0.45)`): Separates the real logo from the layered hero.
- **Poster depth** (`26px 28px 80px rgba(0, 0, 0, 0.6)`): Makes the flyer feel placed on the rail.
- **Action lift** (`0 14px 40px rgba(0, 0, 0, 0.32)`): Gives the main action a restrained presence.
- **Form lift** (`18px 24px 70px rgba(0, 0, 0, 0.35)`): Separates the registration surface from the black page.

**The Flat-by-Default Rule.** Use shadow only for the logo, proof artifact, main action, and form surface. Use rules and color contrast everywhere else.

## Shapes

Buttons, fields, panels, tags, and section blocks use square corners. The real logo remains circular. Small rotated squares divide the skill rail, and the flyer carries a slight physical rotation. Thin one-pixel borders provide the metallic frame language.

**The Square Service Rule.** Do not soften operational controls with generic rounded cards or pill-shaped buttons.

## Components

### Buttons

- **Shape:** Square service control with a 54px minimum height.
- **Primary:** Warm-gold field, ink text, bold uppercase label, and 24px horizontal padding.
- **Hover / Focus:** Lift by 3px and shift to cream on hover. Use the blue 3px focus outline with a 4px offset for keyboard focus.
- **Disabled / Loading:** Keep the same geometry. Reduce opacity, remove lift, show a magenta progress line, and use the wait cursor.

### Text Links

- **Style:** Bold uppercase DM Sans with a thin gold underline and 4px underline clearance.
- **State:** Shift the text to warm gold on hover. Venue links may inherit the current high-contrast color.

### Poster Stage

- **Style:** The supplied flyer sits on a near-black square frame with a one-pixel gold edge, a small gold label, a slight clockwise rotation, and a deep directional shadow.
- **Motion:** The flyer settles once during entry. It remains static when reduced motion is requested.

### Date Rail

- **Style:** Each date uses a compact gold month label, an oversized tabular day, an editorial class title, and a thin metallic divider.
- **Graduation:** Invert the full rail to warm gold with ink text. Do not add a separate card.

### Cards / Containers

- **Corner Style:** Square.
- **Background:** Cream for the curriculum ledger and registration form. Dark sections remain on the page ground.
- **Shadow Strategy:** Only the registration form receives panel lift.
- **Border:** One-pixel rules organize ledgers and summaries.

### Inputs / Fields

- **Style:** Warm paper field, one-pixel neutral border, ink text, square corners, and a 52px minimum height.
- **Focus:** Blue border with a translucent blue 3px ring.
- **Error:** Red border and a specific recovery message below the field.
- **Success:** Green-bordered confirmation on a pale green field.

### Navigation

- **Style:** A transparent absolute header with the mixed sans/serif wordmark, uppercase DM Sans links, and a gold square signup action.
- **Responsive:** Hide secondary navigation links below 900px. Keep the signup action visible.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied circular logo and event flyer as the visual proof.
- **Do** use long rails, thin rules, and clear split fields to organize dense event details.
- **Do** keep the schedule, venue, and signup action easy to verify without reading the flyer.
- **Do** keep focus, validation, loading, confirmation, and reduced-motion states visible and complete.
- **Do** use only one opening light sweep.

### Don't:

- **Don't** turn the page into a generic card grid or glass-panel layout.
- **Don't** use decorative gradients that are not tied to venue light, material depth, or the two-color venue split.
- **Don't** invent testimonials, pricing, capacity, contact details, or proof not supplied by the organizer.
- **Don't** reduce the flyer to atmosphere or make it too small to inspect.
- **Don't** add repeated ambient motion after the opening sequence.
