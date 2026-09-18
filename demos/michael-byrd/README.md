# Michael Byrd informational website demo

Standalone GitHub Pages route: `/ownyourweb-demos/demos/michael-byrd/`.
No framework, external font, tracking, generated candidate image, or backend.

## Sources and limits

Candidate-specific material is attributed to the user-supplied campaign website brief of September 18, 2026. Candidacy, ballot status, biography details, past activities, and roles are not independently verified. The demo identifies missing material and separates past-work entries from policy topics. It does not invent or evaluate proposals, claim outcomes, or provide endorsements.

Official references:
- https://phlcouncil.com/council-members/
- https://votes.phila.gov/resources-data/election-resources/political-maps/

The supplied footer wording is reproduced for layout review, not as verified legal compliance.

## Before launch

- Supply approved portrait, childhood/family/school and neighborhood photographs. Get permission for images, including minors. Do not substitute generated documentary images.
- Supply logo, final colors, announcement video, captions and transcript.
- Have Michael approve biography, exact education details, job titles and dates.
- Add dated evidence and captions to past-work entries. Remove unsupported entries.
- Supply approved policy text with sources. Keep future proposals separate from completed activities.
- Verify candidate and committee naming, election details, district boundaries and required notices through the appropriate official sources and campaign review.
- Provide campaign email, phone, social links, approved donation processor URL and notices.
- Connect forms only after privacy/consent review. Keep campaign signup information out of public repositories and browser storage. This demo transmits nothing; forms are disabled without JavaScript and intercepted before enabling controls.
- Replace the demo privacy notice with a campaign-approved live policy, including host/provider disclosures.
- Remove demo status and noindex only after review. No claim that noindex makes a public page private.

## Editing

Copy and layout: `index.html`. Base layout and motion: `styles.css`. Active sports-inspired theme: `philly-theme.css`. Archive entries, navigation, local-only form previews: `app.js`. No form submission or payment integration is present.

## Theme review, September 18, 2026

Original graphics and sports-inspired color only. No team logos, sponsorship, affiliation, or endorsements. Campaign text and form behavior unchanged.

| Before | After |
| --- | --- |
| Blue-gray ink `#172d39` | Dark blue ink `#14233b`, deep-blue display and bands `#153c74` |
| Brown accent `#9b4d33` | Red accent `#bf2436` |
| Beige accent `#d8bea0` | Warm-white accent `#f7f5ef` |
| Cream canvas `#f4f1e9` | Warm-white canvas `#f7f5ef` |
| Cream-white panel `#fffcf6` | White panel `#ffffff` |
| Gray text `#59666b`, dark photo captions `#42504e` | Blue-gray text `#536071` |
| Gray borders `#c9cec9`, `#adb6ae` | Blue-gray borders `#c6cdd5` |
| Pale header text `#d0d9dc`, dark-panel text `#c3ced1`, `#bfcdd0`, `#cad3d5` | White `#ffffff` |
| Portrait sage `#c8ccc0` | Green `#006747` with low-opacity white numerals and diagonal lines |
| Family beige `#d8c5b3`, warm archive `#d6c8b9` | Pale red `#f4e3e5` with red edging |
| Gray photo panel `#dedbd0`, work canvas `#e8e8df` | Pale blue `#e3eaf5` |
| Cool archive `#c3ced0`, second school panel `#c8d0cc`, footer `#e7e9e1` | Pale green `#e1ece6` with green edging |
| Neutral archive `#d1d5cc` | White with blue edging |
| Video navy `#233c49` | Deep blue `#153c74` with green edging |
| Neighborhood beige `#d9c0a1`, brown labels `#663c28`, translucent dark borders | Green `#006747`, white labels and borders |
| Base button navy, hover `#294956` | Red button, blue hover; red/blue shadows |
| Navy/black accent controls and selection | Green form controls; blue menu control and text selection |
| Serif wordmark and main heading | System condensed athletic type, uppercased in CSS; reading headings retain serif type |
| Plain header and portrait frame | Three-color rule, white portrait border, pale-blue offset shadow, decorative district number |

All new theme colors are stored as OKLCH values in CSS. White text contrast: blue 10.88:1, red 5.96:1, green 6.93:1. The same dark colors on the warm-white canvas exceed 4.5:1. These are selected-pair checks, not a full accessibility conformance claim.

Motion uses one-time entrances and scroll reveals with reduced-motion support. Content remains visible without JavaScript. Mobile navigation collapses only when its event handlers are active.
