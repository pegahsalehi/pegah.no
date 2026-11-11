# Crawler accessibility audit

Audited on 11 November 2026. Changes are local and uncommitted. Production has not
been redeployed.

The follow-up [pre-deployment QA report](predeployment-qa.md) records a fresh
production build, HTTP and PDF checks, an original stylesheet comparison,
deployment impact of the existing diagnostics, and the precise outstanding
browser tests. Its release gate remains FAIL because browser access is blocked.

## Confirmed causes and production findings

- Both the source template and the live production response had an empty
  `<div id="root"></div>`. A crawler that does not execute JavaScript receives no
  portfolio content. The browsing tool also returned no readable lines for the
  live page.
- `App.tsx` mounted only `LoadingScreen` for three seconds through
  `useLoading(3000)`. This affected JavaScript-capable readers too; it was not the
  cause of the empty raw HTML.
- The previous production build was plain `vite build`; there was no prerender
  entry, script, or checked-in Netlify configuration.
- The existing robots rules allow the named search crawlers and all other user
  agents. They do not block OAI-SearchBot, GPTBot, or PerplexityBot. Production
  robots.txt did not reference a sitemap. Production `/sitemap.xml` returned 404.
- Direct HTTP requests confirmed Netlify hosting, HTTP 200 and
  `Content-Type: text/html; charset=UTF-8` for `/`, and a 2,206-byte response.
  No `X-Robots-Tag` restriction or access challenge appeared in those responses.
  HTTP and `https://www.pegah.no/` both returned 301 to `https://pegah.no/`.
- Requests with OAI-SearchBot, GPTBot, and PerplexityBot user-agent strings each
  returned 200. These tests do not establish how requests from actual crawler
  networks are treated, and cannot guarantee inclusion in an AI answer or index.
- Titles, descriptions, canonical, Open Graph, and Twitter metadata already
  existed. The raw response lacked JSON-LD and meaningful body content. Those
  metadata tags alone could not make the portfolio readable.

The JavaScript-only response and artificial delay are confirmed. A hosting-level
bot block was not observed. Individual AI products' caching, fetching policies,
and indexing schedules remain outside the scope of these local changes.

## Implementation

The existing React, Vite, TypeScript, data, and UI remain in use. No dependencies
were added or upgraded. The build script:

1. Uses Vite to build the existing browser application.
2. Builds a temporary server entry under `node_modules` and calls React's
   `renderToString` with `StaticRouter` to render the same `App` and components.
3. Inserts that markup into the built HTML template, plus Person and WebSite
   JSON-LD derived from the existing translations and professional links.
4. Generates a prerendered 404 page with `noindex, follow`, no home canonical,
   and no misleading portfolio social metadata.
5. Runs the static verification and removes the temporary server bundle. A failed
   build or verification exits unsuccessfully so Netlify cannot deploy it as a
   successful build.

The browser uses `hydrateRoot` for generated HTML and `createRoot` for the empty
development template. `BrowserRouter` and `StaticRouter` wrap the same routes.
There is no alternate bot-only page or duplicate hidden biography.

The blocking loading gate was removed. The typewriter starts with a real
professional title in static HTML, then resumes its original typing effect after
mount. A scoped `noscript` CSS fallback reveals Framer Motion entrance states
without JavaScript. Interactive animations retain their existing definitions.

Hydration starts in English, then restores the saved Norwegian preference after
mount. Storage failures no longer crash the page. The footer shares a build year
between browser and server bundles and updates the current year after mount,
avoiding a mismatch when an older deployment survives into a new year.

The existing SEO tags were retained with consistent trailing-slash production
URLs and image descriptions. The sitemap lists the single canonical page.
English/Norwegian preference and section fragments do not create separate routes,
so no invented language URLs or hreflang entries were added. The wildcard robots
rule continues to allow legitimate AI crawlers and now advertises the sitemap.
`llms.txt` is supplementary public discovery information, not a rendering fix or
a promise that AI platforms will read it.

Netlify now has explicit build, publish, and functions directories. `/index.html`
redirects to `/`, and missing paths use the rendered 404 with HTTP 404 instead of
becoming duplicate home pages. Existing static files and Netlify Functions take
precedence over the unforced missing-page fallback. The production HTTP and www
domain redirects already work and were not changed.

No portfolio translations, project data, publication data, CVs, thesis, contact
submission code, chat code, backend endpoints, secrets, or `.env.local` were
modified. Small accessible labels were added to the existing icon links and
mobile menu control. Visual parity and interactive behavior still need browser
confirmation as described below.

## Verification results

| Check | Result |
| --- | --- |
| `npm run build` | Passed: production assets, prerender, and static checks |
| `npm run build:dev` | Passed: alternate build also prerenders |
| `npm run verify:build` | Passed |
| `npm run verify:build -- --url http://127.0.0.1:4173/` | Passed against the production preview over HTTP |
| HTML-only extraction | 13,021 readable body characters, excluding scripts, styles, and SVGs |
| Content assertions | Name, professional title, profile summary, skills, experience, education, projects, publications, professional profiles, CVs, and thesis present |
| Links/assets | 132 distinct targets inspected; all local targets exist, section fragments resolve, local HTTP asset checks pass |
| Simulated crawlers | Googlebot, Bingbot, OAI-SearchBot, GPTBot, and PerplexityBot receive HTTP 200 with portfolio content in the initial local response |
| Metadata/JSON-LD | One title, description, canonical, each checked social tag, and one valid JSON-LD graph with connected Person/WebSite nodes |
| robots/sitemap | Required agents allowed, sitemap referenced, canonical URL present |
| Independent parsers | Python HTML parser, XML parser, and TOML parser checks passed |
| Script syntax | Node syntax checks passed for both build scripts |
| `git diff --check` | Passed |
| `tsc -p tsconfig.node.json --noEmit` | Passed |
| `npm run typecheck` | Fails on six pre-existing application errors, listed below; no new application type errors |
| `npm run lint` | Fails on 39 pre-existing errors and 7 warnings; final diagnostics match the baseline exactly |
| Browser runtime/hydration/visual QA | Unverified: browser access host unavailable; native Chrome tool stopped because it could not confidently identify the current URL |
| Production after changes | Unverified: no deployment was performed |

Full application type checking reports the same six issues observed before the
implementation: an unreachable education comparison in `About.tsx`, two missing
`className` property declarations in `Contact.tsx`, two `originalTitleNote` type
errors in `Publications.tsx`, and a missing `@/lib/blog-data` import in the unused
carousel demo. The lint baseline errors are in the carousel, glowing effect,
textarea, vortex, outside-click hook, and Tailwind configuration. These unrelated
components and declarations were not refactored or excluded to make checks pass.

Vite also reports the existing large JavaScript chunk, old Browserslist data, and
an unused external Sonner import during the server build. Those are warnings.
Initial sandbox subprocess/network restrictions were resolved by approved tool
escalation; both build modes and direct public HTTP inspection completed.

The raw-response checks execute no page JavaScript. They prove content and asset
availability, but do not prove that hydration runs without errors, that animations
look identical, or that contact and chat submissions complete. Those browser and
backend interaction checks remain unverified. No test messages were sent.

## Before and after HTML

Verified live production before redeployment:

```html
<body>
  <div id="root"></div>
  <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
</body>
```

The new local production build is 181,330 bytes of HTML and includes the following
real content. This excerpt is abbreviated; styling attributes and intervening
elements are omitted for readability:

```html
<div id="root">
  <h1><span>Hi, I&#x27;m</span> <span>Pegah Salehi</span></h1>
  <span>Applied AI Engineer<span>|</span></span>
  <p>I build applied AI systems that move beyond prototypes, including RAG pipelines, generative AI workflows, and computer vision models.</p>
  <!-- Existing skills, education, experience, projects and publications follow. -->
  <h3>Applied AI Engineer, Min Sone AS, Oslo</h3>
</div>
```

The production build renders every existing portfolio section; it does not inject
this abbreviated example as a separate content block.

## Exact files changed

Modified:

- `README.md`: build/deployment and verification instructions.
- `index.html`: render placeholders, canonical/social consistency, no-JavaScript animation fallback.
- `package.json`: integrated builds, explicit typecheck, and reusable verification command.
- `public/robots.txt`: sitemap discovery; existing permissions retained.
- `src/App.tsx`: remove blocking loading gate and accept the router supplied by each entry.
- `src/main.tsx`: hydrate generated markup and preserve client-rendered development.
- `src/i18n/LanguageContext.tsx`: deterministic initial language and guarded preference persistence.
- `src/components/AnimatedText.tsx`: include the existing professional title before effects run.
- `src/components/Footer.tsx`: deterministic initial copyright year.
- `src/components/Hero.tsx`: accessible names on icon links.
- `src/components/Navbar.tsx`: mobile menu accessibility state and name.
- `src/vite-env.d.ts`: type the build year.
- `vite.config.ts`: define the development build year.

Created:

- `src/entry-server.tsx`: shared React rendering and structured data.
- `scripts/build.mjs`: Vite browser/server build and static generation.
- `scripts/verify-build.mjs`: static and optional HTTP crawler checks.
- `netlify.toml`: deployment settings, canonical HTML redirect, and real 404 handling.
- `public/sitemap.xml`: canonical production URL.
- `public/llms.txt`: supplementary public content and document links.
- `docs/crawler-accessibility.md`: this audit and verification record.

`dist` was regenerated locally and remains ignored. Dependency manifests' versions
and lockfiles were not changed.

## Remaining steps

1. Review the local diff and complete browser checks for English/Norwegian reloads,
   mobile navigation, animations/background, CV downloads, contact UI, and chat UI.
2. After explicit approval, commit/push and trigger the existing Netlify deployment.
   Use `npm run build`, publish `dist`, and retain existing environment variables and
   the `netlify/functions` backend. Do not deploy a direct `vite build` shell.
3. From this checkout, run
   `npm run verify:build -- --url https://pegah.no/` after deployment. Also verify
   `/index.html` redirects to `/`, unknown paths return 404, and the existing chat
   function remains reachable on Netlify. The Vite preview does not emulate Netlify
   redirect rules or serverless functions.
4. Submit `https://pegah.no/sitemap.xml` in existing Google/Bing webmaster accounts
   if desired. Crawlers must revisit the updated page; their timing is not controlled
   by this change.

## Implementation references

- [Vite server rendering and static prerendering](https://vite.dev/guide/ssr.html)
- [React hydrateRoot and matching server/client content](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Google's recommendation for static rendering/hydration](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering)
- [Netlify request processing order](https://docs.netlify.com/resources/troubleshooting/request-chain/)
- [Netlify redirect configuration](https://docs.netlify.com/manage/routing/redirects/overview/)
