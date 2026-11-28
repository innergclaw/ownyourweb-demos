# Client upload standard

Use the animated file picker for new OwnYourWeb client sites that collect files. Keep existing sites unchanged unless the requested update includes them. The picker selects references locally; the enclosing form owns delivery, access, errors, and the receipt. Never give a browser privileged storage credentials. Match the file count, size, and format limits to the receiving service and enforce them there too.

## Static GitHub Pages sites

Reuse `components/ui/animated-file-upload.mjs` and its companion stylesheet. Craves Kitchen is the working example: see `demos/craves-kitchen-workspace/index.html` for markup and `intake.mjs` for wiring. Copy the picker into a separate repository if needed. Use a native file input and button, keep drag-and-drop optional, and respect reduced motion. Set the optional `--upload-*` CSS variables to match the site's theme.

## React sites

Use the supplied TypeScript Motion version in the project's existing UI-component directory. If starting fresh with Next.js, create a TypeScript and Tailwind app with `npx create-next-app@latest --ts --tailwind`. In an existing React app, follow [shadcn's framework setup](https://ui.shadcn.com/docs/installation) and enable TypeScript and Tailwind before running `npx shadcn@latest init`. Install Motion with `npm install motion`.

Check `aliases.ui` and `tailwind.css` in `components.json`. Put `animated-file-upload.tsx` in the directory mapped by `aliases.ui`, usually `components/ui` or `src/components/ui`. Keeping it there makes the reusable UI import consistent with the rest of the project's components. Use the global stylesheet identified by `tailwind.css` for theme tokens and verify `@/lib/utils` resolves to the project's `cn` helper. Connect the selection callback to the actual submission handler, and apply the same validation to dropped files as to the file picker.
