# patch-boys-bergen

Static marketing / lead-generation website for "The Patch Boys of Bergen County" (drywall, ceiling & plaster repair). Built with Next.js 16 (App Router, `output: "export"` → fully static), React 19, TypeScript, and Tailwind CSS v4. Blog posts are local Markdown in `content/blog/`. There is no backend or database — all integrations (Formspree, Google Tag Manager, Anthropic, Google Business Profile) are external SaaS used by the contact form, analytics, or the weekly blog-automation scripts in `scripts/`.

## Cursor Cloud specific instructions

- Single root npm package (not a monorepo, no workspaces). Standard commands live in `package.json`.
- Run the dev server with `npm run dev` (Next.js on http://localhost:3000). Build the static site with `npm run build` (emits `out/`).
- `npm start` (`next start`) is **incompatible** with `output: "export"`. To preview a production build, serve the static export instead, e.g. `npx serve out`.
- `npm run lint` is **non-functional**: it maps to `next lint`, which was removed in Next 16 (it misinterprets `lint` as a directory and errors). There is no ESLint config or `eslint` dependency in the repo. Type-checking happens during `npm run build` instead. There is currently no test framework or test suite.
- The contact/lead form posts to Formspree using `NEXT_PUBLIC_FORMSPREE_ID`; analytics use `NEXT_PUBLIC_GTM_ID`. When these env vars are absent the site still renders and runs — the form submission just fails gracefully (shows an error/"call us" message) and analytics no-op. Set them in `.env.local` (see `.env.example`) to exercise real form delivery / tracking.
- The blog-automation scripts (`scripts/generate-blog-post.ts`, `scripts/post-to-gbp.ts`) are run on demand via `tsx` and need `ANTHROPIC_API_KEY` / Google credentials; they are not part of running the website.
