---
name: GOAT client portal
description: A type-proof workspace for project progress and file delivery
colors:
  progress-green: "#b7f23a"
  ink: "#11120f"
  paper: "#f3f1eb"
  warm-white: "#fbfaf6"
  muted-ink: "#686a63"
  rule: "#cccdc5"
  danger: "#a13228"
typography:
  display:
    fontFamily: "Archivo Black, Impact, sans-serif"
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: "-0.07em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  square: "0"
spacing:
  compact: "8px"
  control: "16px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.progress-green}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    height: "54px"
    padding: "0 22px"
  input-access:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    height: "54px"
---

# Design system: GOAT client portal

## Overview

**Creative north star: "The Type Proof Ledger"**

The portal treats the GOAT name as working design material. Large letterforms, fixed rules, compact data labels, and a visible progress structure make the project feel active before finished logo files exist. The system stays neutral while the brand direction is still open.

The interface is flat, exact, and client-ready. Progress green marks active controls and current work only.

### Direction contract

- **Mode:** Operate. Anisa enters the portal, reads the current project stage, and checks for files.
- **Thesis:** A design client should see the work moving without chasing a separate status update.
- **Own-world:** A black-and-warm-white type proof sheet. The system stays neutral while the real GOAT logo direction is still open.
- **Story:** Anisa enters a temporary code, sees the GOAT wordmark as working material, checks the current stage, then opens an honest empty file library that can receive real files later.
- **First viewport:** The access screen presents GOAT as a live wordmark specimen behind a compact code form. After entry, the same letterforms become the dashboard masthead.
- **Form:** Code-led. Concept seed `e35ce5f0` assigned grounded direction 5. The chosen expression is a typesetter's proof ledger because it keeps the text-logo work and client task clear.
- **Signature interaction:** Successful access tightens the GOAT letter spacing and opens the workspace. Reduced-motion users get an immediate state change.
- **Risk:** Large typography can overpower the task. The dashboard keeps controls and status text in a compact, stable grid.

## Colors

The palette uses warm paper and ink black. Progress green is rare and functional.

- **Progress green** (`#b7f23a`): active navigation, primary action, current stage, and zero-file counter.
- **Ink** (`#11120f`): primary text, rail, access screen, and rules.
- **Paper** (`#f3f1eb`): dashboard ground.
- **Muted ink** (`#686a63`): supporting copy and inactive states.
- **Rule** (`#cccdc5`): structure and separation.

**The progress rule.** Use green only to show the current state or primary action. Do not turn it into decoration.

## Typography

Archivo Black makes GOAT the working specimen. Manrope keeps project copy direct. IBM Plex Mono marks file counts, stages, and system labels.

- **Display:** Archivo Black at `clamp(5rem, 14vw, 12.5rem)`, `0.75` line height, and `-0.07em` tracking.
- **Heading:** Manrope at `clamp(1.35rem, 2vw, 2rem)` with tight tracking.
- **Body:** Manrope with `1.55` to `1.7` line height.
- **Label:** IBM Plex Mono at `0.55rem` to `0.67rem`, usually uppercase with measured tracking.

## Layout

Desktop uses a 238px fixed rail and a flexible workspace. The progress area pairs a wide stage list with a narrow project note. Mobile turns the rail into a top strip, stacks all project content, keeps the lock control visible, and uses a two-by-two file-category grid. The required mobile width is 390px, with support down to 320px.

## Elevation & Depth

The system uses no shadows. One-pixel rules, black and paper surfaces, and type scale create hierarchy.

## Shapes

Controls, fields, counters, and file placeholders use square corners. The only circles are the small in-progress status indicator and its soft state ring.

## Components

### Buttons

Primary buttons use progress green on ink text, a 54px height, and square corners. Outline buttons use a 1px ink border. Focus uses a 3px green outline with a 3px offset.

### Inputs

The access field uses a dark ink surface, paper text, a 1px gray rule, and no corner radius. Invalid access shows direct error copy and `aria-invalid`.

### Navigation

The rail uses ink as its ground. The active view uses a full green rectangle. Mobile retains Dashboard, Files, and Lock in one top strip.

### Empty files

The empty state uses a large outlined G tile, a green zero counter, direct copy, and a return action. It never shows invented filenames or disabled download controls.

## Do's and Don'ts

- Do keep GOAT, Anisa, file counts, and project stage exact.
- Do preserve the honest zero-file state until real files exist.
- Do keep the static-code security warning visible.
- Don't add a registered or trademark symbol without client proof.
- Don't add invented approvals, dates, downloads, payments, or messages.
- Don't use repeated eyebrow labels above headings.

