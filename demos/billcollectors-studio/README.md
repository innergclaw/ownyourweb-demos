# BillCollectors Studio web app preview

Static, dependency-free briefing prototype for GitHub Pages. Open index.html or use a local HTTP server.

The supplied reference is the basis for branding, contact details, and illustrative pricing. Rates, deposit, contact information, hours, and cancellation policy require studio approval before launch. No relationship to other demo businesses is implied.

Implemented demonstrations: artist/owner views, demo account state, date/duration/time selection, notes, price calculations, simulated deposit confirmation, session history, calendar export, owner schedule, rate/hour edits, date blocking, and overlap exclusion within this browser session.

No real login, database, payment processor, email, SMS, media upload, or calendar integration exists. State is held in JavaScript memory and clears on reload. The owner switch is not access control. Do not enter personal or payment information.

Production: secure authentication and role-based access; database-backed availability with atomic conflict prevention; approved processor checkout and verified payment webhooks; confirmation/reminder delivery; calendar integration; protected owner controls. Payment options depend on processor eligibility and configuration. Never collect raw card details in this static demo.
