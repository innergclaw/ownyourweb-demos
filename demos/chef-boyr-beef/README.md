# Chef BoyR Beef ordering demo

Static GitHub Pages demo at `demos/chef-boyr-beef/`. Independent of BillCollectors Studio, INNERG Learn + Earn, and other chef projects.

## Approved sources

- Logo and menu flyer supplied by Nasirr on September 13, 2026. Original files retained as JPG assets; logo uses a CSS display window to omit screenshot controls.
- Eight menu names and USD prices transcribed from the flyer, in its original order.
- SMS recipient `+12676023346` supplied directly by Nasirr during this task. Do not substitute any other project's number.
- Public Instagram: https://www.instagram.com/chefboyrbeef2k/
- Current daily availability, pickup location, delivery service area, fees, tax, payment rules, and opening times are not confirmed. The UI explicitly asks the chef to confirm them.

## Behavior

Select plates and quantities, review the ticket, enter name/mobile, choose pickup or delivery, requested date/time, address if delivery, and optional notes. Review opens a native dialog containing the exact order request. The customer chooses to open their messaging app or copy the text. They must press Send themselves.

No auto-SMS, payment processing, server, customer database, chef order dashboard, stock tracking, or delivery-confirmation claim. Customer details are held in page memory and form controls, not localStorage, URLs, or analytics. The SMS handoff includes them only after the customer chooses the text link. Browser autofill may still retain user-entered details according to browser settings.

## Editing

Update `MENU` in `menu.mjs` for the next daily menu. Change the actual prices, not just the flyer. Keep dates/availability notices honest. `CHEF_PHONE` controls the SMS destination; also update the visible phone and tel link in HTML and copy fallback in app.js if the number changes.

Serve the repository with `python3 -m http.server 4182`. Open `/demos/chef-boyr-beef/`. Do not open directly using file:// because the demo uses ES modules.

Tests: `node --test demos/chef-boyr-beef/menu.test.mjs` from the repository root.

Before production, chef should approve the menu, fulfillment terms, and final contact information. Complete one owner-approved real-device SMS handoff. This build does not itself confirm that a text was delivered.
