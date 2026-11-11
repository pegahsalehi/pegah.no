# Pre-deployment QA: FAIL — browser checks outstanding

Checked on 11 November 2026 against the current local implementation. The fresh
production build and HTTP checks passed. The application is **not cleared for
deployment** because browser runtime, React hydration, interactive behavior, and
visual regression checks could not be performed. This result records an
incomplete release gate; it does not establish an application runtime failure.

No application code was changed during this QA. No commit, push, or deployment
was performed. No contact messages or chat requests were submitted.

## Results

| Check | Result | Evidence / limit |
| --- | --- | --- |
| Fresh production build | PASS | `npm run build`, exit 0, including prerender and static verification |
| Production preview | PASS | Vite preview served `http://127.0.0.1:4173/` |
| Served prerendered HTML | PASS | HTTP response exactly matched `dist/index.html`; 181,330 bytes |
| HTML-only crawler verification | PASS | 13,021 readable characters and all required portfolio sections |
| Crawler user agents | PASS | Googlebot, Bingbot, OAI-SearchBot, GPTBot, and PerplexityBot received 200 and portfolio content locally |
| Local links/assets | PASS | Existing verifier checked 132 link/asset targets; local HTTP asset requests passed |
| Local JS/CSS response types | PASS | Correct JavaScript and CSS MIME types |
| CV/thesis delivery | PASS | GET requests returned 200, PDF MIME type and `%PDF-` signature; bytes identical to original files |
| Actual browser CV download | NOT RUN | Browser access blocked; HTTP PDF delivery does not prove browser download UI behavior |
| External resource/link HTTP checks | PARTIAL | 52 of 53 public URL checks succeeded; IEEE paper returned 418 |
| Stylesheet comparison to original | PASS, source-level only | Original Git revision built; current CSS differs only by an unused `.static{position:static}` utility |
| Actual browser rendering | NOT RUN | No browser page could be inspected |
| React hydration and console | NOT RUN | No JavaScript execution, browser console, or recoverable hydration errors could be observed |
| Browser network failures | NOT RUN | Direct HTTP requests were checked; browser CORS, CSP, client requests, and console failures remain unverified |
| EN/NO switching and persistence | NOT RUN | Source reviewed; clicks, reloads, DOM language, and stored preference behavior not exercised |
| Navigation/mobile menu/back-to-top | NOT RUN | Static section targets pass; click/scroll/focus behavior not exercised |
| Animations/background/hover effects | NOT RUN | Existing CSS declarations preserved; motion and canvas execution not observed |
| Contact/chat/demo interaction | NOT RUN | Vite preview does not execute Netlify Functions; no browser interaction or backend round-trip tested |
| Visual regression/screenshots | NOT RUN | No desktop/mobile screenshot comparison could be performed |
| App TypeScript | FAIL, pre-existing | Same six errors as the implementation baseline |
| Vite config TypeScript | PASS | `tsc -p tsconfig.node.json --noEmit` |
| ESLint | FAIL, pre-existing | 39 errors and 7 warnings; file/rule/severity/message comparison matches baseline |
| Build script syntax / whitespace | PASS | Node syntax checks and `git diff --check` |

## Why browser QA stopped

The browser inventory returned no connected browser surfaces and reported:

```text
Browsers: Error: The browser access host is unavailable
```

The available native Chrome window was then selected as a fallback. The computer
use tool stopped the operation with:

```text
Computer Use has been stopped for this turn because it could not determine
the current browser URL on Windows with enough confidence to enforce policy.
```

No further browser input was attempted. Consequently, there is no evidence that
the browser retained the prerendered DOM during hydration, that the console was
clean, or that the rendered appearance matched the original. Successful server
rendering, matching CSS, and successful HTTP requests cannot replace those tests.

## Existing TypeScript errors and deployment impact

| Location | Count | Assessment |
| --- | ---: | --- |
| `src/components/About.tsx:75` | 1 | All current timeline items have type `experience`; comparison with `education` is unreachable. The PhD education card is separate. No new runtime failure was established. |
| `src/components/Contact.tsx:127,137` | 2 | `contactItems` does not declare `className`; the renderer uses `item.className ?? ''`, which falls back to an empty string at runtime. A type declaration issue, with no new rendering failure established. |
| `src/components/Publications.tsx:96,98` | 2 | The context types `t` as the English translation shape, while `originalTitleNote` exists only in Norwegian. Runtime lookup is guarded by `language === 'no'` and a truthiness check. No new runtime failure was established. |
| `src/components/ui/apple-cards-carousel-demo.tsx:5` | 1 | Imports missing `@/lib/blog-data`. This demo is not imported by the active application; current and original production builds pass. Enabling it without restoring the module would break bundling. |

All six errors fail `npm run typecheck`. The checked-in Netlify command is
`npm run build`, which does not run TypeScript checking or ESLint. The observed
production build therefore succeeds with these errors. Any additional CI or
Netlify check that enforces typecheck would fail until they are addressed.
External dashboard checks were not inspected.

## Existing ESLint errors and deployment impact

| File | Errors | Assessment |
| --- | ---: | --- |
| `src/components/ui/vortex.tsx` | 32 | Mostly `prefer-const`, plus broad typing and a short-circuit side-effect expression. Active background code; these diagnostics did not prevent bundling. |
| `src/components/ui/glowing-effect.tsx` | 2 | `prefer-const` and an unnecessary escape. Active project effect; current CSS builds. |
| `src/components/ui/apple-cards-carousel.tsx` | 1 | Broad typing in dormant carousel code. |
| `src/hooks/use-outside-click.tsx` | 2 | Broad callback/event types; only the dormant carousel imports this hook. |
| `src/components/ui/textarea.tsx` | 1 | Empty interface equivalent to its parent type; not imported by the active pages. |
| `tailwind.config.ts` | 1 | CommonJS-style `require` rejected by lint policy. Tailwind successfully loaded the configuration in both original and current builds. |

The 39 errors comprise 31 `prefer-const`, three `no-explicit-any`, and one each of
`no-useless-escape`, `no-empty-object-type`, `no-unused-expressions`,
`no-unsafe-function-type`, and `no-require-imports`.

Five of the seven warnings concern Fast Refresh exports. The other two concern
effect dependencies in the carousel and vortex. Review also found that Vortex
does not cancel its animation frame loop or remove its resize listener on
unmount, a pre-existing lifecycle risk. This was not exercised in a browser and
was not changed merely to make lint pass. It merits attention if background
remounts or lifecycle changes are introduced.

An enforced lint step fails on the current baseline. None of the lint diagnostics
caused the observed `npm run build` to fail. Existing build warnings about old
Browserslist data, a large JavaScript chunk, and an unused external Sonner import
also remain.

## Original-design comparison

An isolated archive of original Git revision
`e256c1bc04f25e5fa03715c9aad3f25ce6bc569b` was built under the ignored directory
`node_modules/.cache/portfolio-audit/original-head`. No checkout or tracked source
was replaced, and no environment files were copied into that archive.

The original stylesheet is `index-pGZDxLx4.css`; the current stylesheet is
`index-DuMD-Iko.css`. An exact text comparison passed after removing the single
added `.static{position:static}` utility from the current output. No rendered
element has class `static`. All original stylesheet bytes are otherwise
preserved. Existing source CSS, layout utilities, project data, and asset files
have no changes from the original revision.

This establishes stylesheet preservation. It does not establish visual parity:
hydration, fonts, image decoding, viewport layout, animation timing, and browser
rendering still need observation. Removing the intentional three-second loading
screen also changes initial timing as required by the rendering fix.

## External links and assets

Direct HTTP GET checks covered 53 public URLs: 41 remote subresources, the
canonical production document, and 11 project destinations. All remote
subresources returned successful responses and expected image/script/CSS MIME
types. The canonical document and 10 project destinations returned 200.

The existing paper destination
`https://ieeexplore.ieee.org/abstract/document/10634162` returned HTTP 418 to the
automated request. Its behavior in a normal browser is unknown. The link was not
rewritten or removed; confirm it manually before release. This external response
does not prevent the portfolio from building.

These checks do not execute page JavaScript, load second-level resources found
inside remote scripts/CSS, validate browser CORS/CSP behavior, or exercise demos.

## Manual browser checklist to finish the release gate

Start the current production preview from the repository root:

```powershell
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Open `http://127.0.0.1:4173/`. For an exact original-design reference, start the
already-built isolated original in a second terminal:

```powershell
npm --prefix node_modules/.cache/portfolio-audit/original-head run preview -- --host 127.0.0.1 --port 4174 --strictPort
```

Open `http://127.0.0.1:4174/` for comparison. That original intentionally has the
old loading screen. Do not compare its empty initial shell to the completed new
page; compare the fully rendered portfolio after fonts and entrance animations
settle. Both preview servers serve static assets and do not run Netlify Functions.

1. **Initial HTML without JavaScript:** In DevTools, disable JavaScript and reload
   the current preview. Check every section, including the hero title, skills,
   education, experience, projects, publications, and professional/CV links. The
   Framer Motion entrance states should remain visible. Re-enable JavaScript
   when finished. View Source should contain portfolio text in either case.
2. **Hydration and console:** Open Console and Network, enable Preserve log,
   disable cache while DevTools is open, then reload with JavaScript enabled.
   Require no hydration mismatch, text mismatch, server-HTML mismatch, minified
   React error, or uncaught exception. Confirm the typewriter starts, the menu
   responds, and the portfolio is not duplicated. Check Network for failed
   local assets and unexpected requests. Inspect third-party failures separately.
   A clean console plus working controls is the minimum smoke test; the DOM
   retention check below gives stronger evidence that React hydrated rather
   than replacing the page.
3. **Retain the prerendered DOM:** For a more direct hydration check, enable
   DevTools' Script First Statement breakpoint and reload. Before the app module
   executes, when `#hero h1` exists, record its node in the console with
   `window.qaHeading = document.querySelector('#hero h1')`. Disable the breakpoint
   and resume. After the controls respond, evaluate
   `window.qaHeading === document.querySelector('#hero h1')`; require `true` and
   no hydration errors. If the initial heading was not yet present at the pause,
   repeat with a pause after HTML parsing and before the application entry runs;
   do not count a null or post-hydration sample as a pass.
4. **Language and persistence:** In a fresh local-origin session confirm EN.
   Select NO, verify translated navigation/sections, active button state,
   `document.documentElement.lang === 'nb'`, and the Norwegian hero CV target.
   Reload, close/reopen the page, and confirm NO persists without console
   hydration errors or loss of content. Check Local Storage key
   `portfolio-language` equals `no`. Switch back to EN, reload, and expect `en`,
   the English CV target, and HTML language `en`. A brief English first render
   before preference restoration is intentional. Preferences belong to each
   origin; the original reference and current preview do not share storage.
5. **Navigation and keyboard:** Exercise Home, Skills, About, Projects,
   Publications, Contact, My Work, the downward skills link, and back-to-top.
   Require correct section scrolling and no hidden/duplicated sections. At mobile
   width open/close the menu, select each item, confirm it closes, and repeat EN/NO
   switching. Tab through links and buttons and activate them with the keyboard.
6. **Downloads and links:** Open and download the English and Norwegian CVs, and
   open the thesis. Confirm readable PDFs and the selected language's hero CV.
   Check project GitHub links, public demos, professional profiles, and the
   IEEE paper in a normal browser. An HTTP-200 destination alone is not a tested
   working demo; exercise the demo's initial controls without submitting private
   information.
7. **Interactions:** Check typewriter cycling after a language change, vortex
   canvas motion, section entrance animations, card hover effects, contact option
   selection, required-field validation, and chat open/close/input controls. The
   Vite preview cannot pass a real `/.netlify/functions/portfolio-chat` round-trip;
   use an appropriately configured local Netlify environment for that test.
   Contact delivery also needs a deliberately approved test submission. Do not
   count a Vite HTML fallback or non-JSON response as a backend success.
8. **Visual comparison:** Compare original and current at identical viewport
   sizes, for example 1440x900, 768x1024, and 390x844, using the same language on
   each origin. Compare hero layout/portrait, typography, background, spacing,
   skill columns, timeline, cards, publication list, contact area, navbar/mobile
   menu, and footer. Check horizontal overflow, clipping, fixed overlays, and
   text wrapping in both languages. Capture matching screenshots after loading
   fonts and settling entrance effects. Account for the intentional loading-delay
   removal and naturally changing typewriter/canvas frames.
9. **After any fixes:** Run `npm run build`, then
   `npm run verify:build -- --url http://127.0.0.1:4173/`, and repeat the affected
   browser checks. Record actual console/network results and attach matched
   screenshots before changing this report to PASS.

Netlify redirects and serverless function routing still require a configured
local Netlify check or a separately approved deployment check. Vite preview does
not emulate those behaviors. This QA did not deploy a staging or production site.

## Evidence locations and changes in this QA

Only this report and a link in the earlier crawler audit were added to the
reviewable source changes during this QA. Generated `dist` remains ignored.
Supporting local-only evidence is under the ignored
`node_modules/.cache/portfolio-audit/` directory:

- `lint-predeployment.json`: current lint diagnostics.
- `predeployment-http.json`: HTTP document size and CSS hashes.
- `predeployment-external-http.json`: external resource/project HTTP results.
- `predeployment-source-comparison.json`: original/current CSS comparison.
- `original-head/`: original source snapshot and built original reference.

The production preview used for automated checks was stopped after QA. Restart it
with the command above to perform the outstanding manual checks.
