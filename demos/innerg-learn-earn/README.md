# INNERG Learn + Earn

Standalone, mobile-first INNERG INTEL web app demo. Adapted from the supplied README and HTML concept. Published under its own route, with no changes to BillCollectors Studio.

## Run

Serve this directory with any static server. ES modules require HTTP, not file://.

`python3 -m http.server 4181`

Open the route on localhost. No build dependencies.

## Verify

`node --test model.test.mjs`

Browser journey: start mission, read lesson, write explanation, select follow-up, switch to parent, approve, request reward, approve or decline. Refresh and verify persistence. Check 390px and desktop widths.

## Working scope

- Four pathways and four sample missions.
- Preset hints, a minimum-length writing check, and a multiple-choice follow-up. No claim of semantic grading or AI inference.
- Parent preview approves explanations or requests revisions. Each mission awards points once.
- Reward requests reserve points. Declines return points once. Approval is an agreement, not proof of delivery.
- Parent mission assignment and custom reward names/costs.
- Browser-local persistence, cross-tab refresh, invalid-storage recovery, and a clear-data control.
- Zero starting points and zero fake completion data.
- Responsive INNERG ID visual language. Web manifest included; no offline support is promised.

## INNERG ID boundary

Existing member route verified during implementation: https://nasirr.innergintel.org/innerg-id/

This demo links to that route. It does NOT authenticate, access member records, reuse tokens, create users, or sync learning data. The parent preview is not a security boundary. No existing billing/membership system was changed.

Production design should use the existing identity provider's stable authenticated user ID for the parent, server-managed parent-to-learner relationships, private family records, and server-authorized point and redemption transactions. Never trust browser role switches or local point balances. Keep educational rewards separate from paid membership entitlements.

Before production: confirm ages and parent consent flow; approve curriculum; agree retention/deletion and recovery; implement learner access and authorization; test cross-family isolation; prevent duplicate point awards/redemptions on the server; implement approved account callback and cross-domain sign-in; verify sync end to end. Add AI only behind a protected endpoint with appropriate safeguards and cost controls.

## Data

Key: `innerg.learn-earn.demo.v1`. Answers, status, points-derived records, and reward names stay in localStorage. No names, emails, ages, or credentials are requested. No analytics, external fonts, or AI requests. Hosting may still record standard access logs. Anyone with access to this browser can see or edit local demo data; do not use it for private child information.

Files: index.html and styles.css for layout; curriculum.mjs for sample teaching content; model.mjs for state operations; app.js for rendering and navigation; model.test.mjs for state tests.
