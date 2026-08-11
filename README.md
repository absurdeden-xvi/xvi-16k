<p align="right">
  <strong>English</strong> · <a href="./README.zh-CN.md">简体中文</a>
</p>

# XVI / 十六开

XVI is a privacy-first, browser-based longform typesetting studio built around Chinese writing and social publishing. Finish the text first, generate a stable editorial composition, refine it, and export a publication-ready long image.

- **Current release:** `v0.7.9`
- **Product stage:** public beta, not yet V1
- **Live app:** [xvi-16k.pages.dev](https://xvi-16k.pages.dev/)
- **Feedback:** [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)

## Product at a glance

XVI separates writing from composition. The editor stays focused while text is being entered; the long image is generated only when the writer asks for it. Typography, spacing, color, structure, and local emphasis can then be refined through the controls or directly on the preview.

- Static HTML, CSS, and JavaScript; no build step, account, or API key
- Chinese-first composition with a complete English interface
- Desktop and mobile writing, styling, preview, and export workflows
- Local article processing, draft storage, font import, and image generation
- Cloudflare Pages for the public app; Netlify only receives intentional feedback submissions

## OpenAI Build Week

- **Track:** Apps for Your Life
- **Demo:** [xvi-16k.pages.dev](https://xvi-16k.pages.dev/)

XVI existed before Build Week as an early working prototype. The dated Git history and [changelog](./project/CHANGELOG.md) distinguish the work completed after July 13, 2026. During Build Week, the current editorial workspace, four layout structures, sixteen named palettes, direct preview editing, regional Chinese conversion, mobile workflow, bilingual interface, export controls, deployment recovery, and judging documentation were added or substantially rebuilt.

### Human direction and authorship

XVI is the creator's first complete coding project, but it is not an AI-generated product concept. The original need came from her own writing practice: after finishing a piece, she wanted a faster and more flexible way to turn it into a carefully typeset image for social platforms.

She wrote every answer in the initial product questionnaire herself, defined the workflow and privacy boundaries, accepted or rejected each visual direction, and made the final decision on every feature and design iteration.

> **GPT-5.6 was used inside Codex for implementation, debugging, testing, deployment, and documentation. It did not invent the product brief, answer the questionnaire, choose the aesthetic, write users' articles, or make final product decisions.**

A curated bilingual selection of the creator's early answers is preserved in [Early Product Questionnaire: Selected Answers](./project/docs/EARLY_PRODUCT_QUESTIONNAIRE.md).

### How Codex and GPT-5.6 were used

The working loop was conversational and concrete:

1. The creator described a real usability or visual problem in natural language, often with a screenshot and precise criticism.
2. Codex inspected the existing code and translated that direction into a scoped HTML, CSS, or JavaScript change.
3. GPT-5.6 helped reason through implementation details, trace regressions, and keep shared behavior consistent.
4. The result was tested in the browser, then accepted, rejected, or revised by the creator before being committed.

GPT-5.6 and Codex materially accelerated:

- implementing the editorial workspace from creator-written requirements and successive visual decisions;
- keeping bold, italic, underline, strikethrough, color, and size consistent across the editor, DOM preview, and Canvas export;
- building Chinese-aware line breaking and punctuation handling;
- integrating selected-text conversion for Simplified Chinese, Traditional Chinese (Hong Kong), and Traditional Chinese (Taiwan);
- restructuring mobile input, styling, preview, and export without replacing the desktop workflow;
- auditing the local-only privacy boundary and separating Cloudflare hosting from the feedback receiver;
- migrating production from Netlify to Cloudflare Pages while preserving a clean root URL;
- maintaining bilingual product, architecture, deployment, privacy, and release documentation.

The product principles remained the creator's own: composition begins only after the writer finishes entering text; writing is never uploaded; automation must leave room for precise control; palettes are manually curated; and templates must change editorial structure instead of merely recoloring the same page.

## Current capabilities

| Area | Capability | Status | Notes |
| --- | --- | --- | --- |
| Writing | Title, body, and byline | Implemented | Blank-first flow without continuous long-image rendering |
| Writing | Inline rich text | Implemented | Bold, italic, underline, strikethrough, and clear formatting |
| Writing | Character count and local autosave | Implemented | Drafts remain in the current browser |
| Localization | Regional Chinese conversion | Implemented | Simplified, Traditional Hong Kong, and Traditional Taiwan for selected text |
| Localization | Chinese and English interface | Implemented | Interface language persists without translating user content |
| Composition | Deliberate automatic composition | Implemented | Generates only after the writer finishes entering text |
| Composition | Cleanup and paragraph detection | Implemented | Repairs pasted soft line breaks and detects paragraphs when requested |
| Typography | Body and title typefaces | Implemented | Separate CJK and Latin font choices |
| Typography | Local font import | Implemented | TTF, OTF, WOFF, and WOFF2 stay in the browser |
| Typography | Size, weight, line, letter, and paragraph spacing | Implemented | Sliders, presets, and precise values |
| Layout | Width, margins, alignment, and indentation | Implemented | Adjustable reading measure and paragraph behavior |
| Layout | Opening-paragraph treatment | Implemented | None, rule, or accent color with adjustable scale |
| Templates | Folio, Book Page, Letter, and Sectioned Long Page | Implemented | Four distinct editorial structures |
| Color | Light and dark families | Implemented | Six curated color families |
| Color | Sixteen named palettes | Implemented | Manually reviewed for long-form reading |
| Color | Independent and random controls | Implemented | Background, body, title, and accent remain editable |
| Preview | Direct editing | Implemented | Title, kicker, body, chapter label, and section marker |
| Preview | Exportable local styling | Implemented | Size, color, bold, italic, underline, and strikethrough |
| Export | PNG and JPG | Implemented | Custom name, automatic height, and visible final pixel width |
| Export | Standard, High, and Ultra | Implemented | Explicit output resolution choices |
| Privacy | Local-only article processing | Implemented | Article, drafts, imported fonts, and images stay on-device |
| Feedback | Explicit form and email notification | Implemented | Feedback never includes article content |
| Mobile | Input, styling, preview, and export | Implemented; refining | Complete three-step workflow; real-device polish continues |
| Export | Automatic pagination and `3:4` batch export | Planned | Intended for multi-image social publishing |
| Templates | Reusable custom presets | Planned | After the core editorial structures stabilize |

## Try it

1. Enter the complete body text and optionally add a title and byline.
2. Apply rich text or regional Chinese conversion to a selection when needed.
3. Select **Generate Composition**.
4. Choose a layout, palette, typeface, and spacing, or edit the preview directly.
5. Select an export format and resolution, then save the image.

Open [`project/index.html`](./project/index.html) directly in a modern browser or use the live app. No installation, sample account, server, or API key is required.

After changing JavaScript module boundaries, run the zero-dependency smoke test:

```bash
node project/tests/module-smoke.test.js
```

## Privacy

Article text, imported fonts, drafts, composition, and image export are processed in the browser. Drafts are stored in `localStorage`. XVI does not upload article content to an application server.

Only an intentional feedback submission sends the entered feedback to the legacy Netlify Forms receiver; the article is never attached. See [Privacy](./project/PRIVACY.md).

## Project structure

| Path | Purpose |
| --- | --- |
| `project/index.html` | Production entry and complete workspace structure |
| `project/xvi-next.html` | Compatibility mirror for older links |
| `project/styles.css` | Shared controls and composition styles |
| `project/xvi-next.css` | Desktop and mobile workspace interface |
| `project/app-next.js` | State, DOM orchestration, persistence, direct editing, and feedback |
| `project/modules/config.js` | Palettes, layout recipes, font stacks, and punctuation rules |
| `project/modules/i18n.js` | Interface dictionaries and runtime messages |
| `project/modules/text-layout.js` | Script conversion, cleanup, and Canvas line breaking |
| `project/modules/exporter.js` | Canvas layout, rich-text drawing, and image download |
| `project/vendor/opencc.full.js` | Regional Chinese conversion runtime |
| `project/docs/` | Architecture, product evidence, design studies, and historical previews |

## Documentation

- [Product direction](./project/PRODUCT_DIRECTION.md)
- [Changelog](./project/CHANGELOG.md)
- [Privacy](./project/PRIVACY.md)
- [Deployment and rollback](./project/DEPLOYMENT.md)
- [Contributing](./project/CONTRIBUTING.md)
- [Architecture](./project/docs/ARCHITECTURE.md)
- [Design direction](./project/docs/XVI_DESIGN_DIRECTION_ZH.md)
- [Research index](./project/docs/README.md)
- [Third-party notices](./project/THIRD_PARTY_NOTICES.md)

## Next priorities

1. Continue real-device refinement of the mobile workflow.
2. Complete automatic pagination and Xiaohongshu-style `3:4` batch export.
3. Develop stronger editorial structures rather than recolored duplicates.
4. Audit online font provenance, licensing, and loading reliability in mainland China.
5. Expand accessibility, error handling, and cross-browser export testing.

## License

Project-owned code is available under [PolyForm Noncommercial 1.0.0](./LICENSE). Personal, educational, research, and other noncommercial uses are permitted; commercial use is not licensed. XVI is source-available for noncommercial use, not open source under the OSI definition.

Third-party components and online fonts retain their own licenses. See [Third-Party Notices](./project/THIRD_PARTY_NOTICES.md).
