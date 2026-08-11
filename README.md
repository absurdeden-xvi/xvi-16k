<h1 align="center">XVI / 十六开</h1>

<p align="center">Choose a language / 选择语言</p>

<details>
<summary><strong>English</strong></summary>

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

</details>
<details>
<summary><strong>简体中文</strong></summary>

围绕中文写作与社交平台发布场景设计的文本长图排版器。完整输入文字后，再生成可继续微调并导出的长图。

- **当前版本：** `v0.7.9`
- **产品阶段：** 公开测试版，尚未进入 V1
- **在线使用：** [xvi-16k.pages.dev](https://xvi-16k.pages.dev/)
- **反馈邮箱：** [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)

## 产品概况

XVI 将输入和排版分开：写作时不持续重绘长图，完成后再由用户主动生成。生成结果可以继续通过控制面板或预览画布调整字体、间距、配色、结构和局部格式。

- 使用原生 HTML、CSS 与 JavaScript，无需构建、账号或 API Key
- 以中文排版为主，同时提供完整英文界面
- 桌面端与移动端均可完成输入、样式、预览和导出
- 正文、草稿、导入字体与图片生成留在浏览器本地
- 正式页面由 Cloudflare Pages 托管；Netlify 只接收用户主动发送的反馈

## OpenAI Build Week

- **参赛方向：** Apps for Your Life
- **在线演示：** [xvi-16k.pages.dev](https://xvi-16k.pages.dev/)

XVI 在活动开始前已经是可运行的早期原型。2026 年 7 月 13 日后的 Git 记录与[版本记录](./project/CHANGELOG.md)区分了 Build Week 阶段新增或大幅重做的内容，包括当前工作台、四种刊页结构、十六套特别配色、画布内编辑、地区简繁转换、移动端流程、双语界面、导出控制、部署恢复和评审文档。

### 创作主导与 GPT-5.6 的使用边界

XVI 是创作者第一个真正完整的编程项目，但它并不是由 AI 生成的产品概念。需求来自她近十年的写作爱好与真实发布场景：写完一篇文章以后，怎样更快速、更自由地把它排成适合社交平台发布的长图。

最初产品问卷中的每一条回答均由创作者本人逐字写下；工作流程、隐私原则、功能优先级、配色取舍、视觉批评与最终决定也始终由她完成。

> **GPT-5.6 在 Codex 中承担实现、调试、测试、部署和文档整理。它没有提出最初的产品需求，没有代答问卷，没有决定审美方向，不参与用户正文创作，也不替创作者作最终决定。**

早期原话的精选与英译见[《早期产品问卷：精选回答》](./project/docs/EARLY_PRODUCT_QUESTIONNAIRE.md)。

### Codex 与 GPT-5.6 如何参与

整个协作过程使用自然语言完成：

1. 创作者用文字和截图指出真实的使用问题或视觉问题。
2. Codex 阅读已有代码，将要求落实为边界明确的 HTML、CSS 或 JavaScript 修改。
3. GPT-5.6 协助分析实现细节、定位回归并维持不同流程之间的一致性。
4. 修改经过浏览器测试后，再由创作者决定接受、否决或继续调整。

GPT-5.6 与 Codex 具体加速了：

- 根据创作者逐步形成的需求与视觉判断实现当前工作台；
- 保证粗体、斜体、下划线、删除线、颜色和字号在输入区、DOM 预览与 Canvas 导出之间一致；
- 实现符合中文阅读习惯的断行与标点处理；
- 加入只作用于选中文字的简中、繁中（港）与繁中（台）转换；
- 在不替换桌面流程的前提下重组移动端输入、样式、预览和导出；
- 审核本地隐私边界，并分离 Cloudflare 正式托管与 Netlify 反馈收件端；
- 将正式部署从 Netlify 迁移至 Cloudflare Pages，同时保留干净的根网址；
- 整理双语产品、架构、部署、隐私和版本文档。

“写完后再生成”“正文不上传”“自动化与精细控制并存”“配色必须经过人工筛选”“模板不能只是换色”等核心原则均来自创作者本人。

## 当前能力

| 模块 | 功能 | 状态 | 说明 |
| --- | --- | --- | --- |
| 写作 | 标题、正文与署名 | 已实现 | 空白开始，输入阶段不持续渲染长图 |
| 写作 | 行内富文本 | 已实现 | 粗体、斜体、下划线、删除线与清除格式 |
| 写作 | 字数统计与本地自动保存 | 已实现 | 草稿只保存在当前浏览器 |
| 文字 | 地区简繁转换 | 已实现 | 选中文字后转换为简中、繁中（港）或繁中（台） |
| 文字 | 中英文界面 | 已实现 | 记住界面语言，不翻译用户正文 |
| 排版 | 主动生成与自动排版 | 已实现 | 写完后再生成，不在输入中反复重排 |
| 排版 | 文本清理与智能分段 | 已实现 | 修复粘贴软换行，并按需识别自然段 |
| 字体 | 标题与正文字体 | 已实现 | 中文与拉丁字体可分别选择 |
| 字体 | 导入本地字体 | 已实现 | 支持 TTF、OTF、WOFF、WOFF2，不上传字体文件 |
| 字体 | 字号、字重、行距、字距与段距 | 已实现 | 滑杆、档位与精确数值并存 |
| 版面 | 画布、页边距、对齐与缩进 | 已实现 | 阅读宽度与段落行为可以调整 |
| 版面 | 首段强调 | 已实现 | 无、引线或变色，并可调整首段字号 |
| 模板 | 标准刊页、书页、信笺与分节长页 | 已实现 | 四种不同的阅读结构 |
| 配色 | 深浅模式与六个色系 | 已实现 | 经过整理的基础阅读方案 |
| 配色 | 十六套具名特别配色 | 已实现 | 以长文可读性为前提人工筛选 |
| 配色 | 独立颜色与随机灵感 | 已实现 | 背景、正文、标题和强调色可以继续调整 |
| 预览 | 画布内直接编辑 | 已实现 | 标题、题头、正文、章节标识与节号均可编辑 |
| 预览 | 可导出的局部样式 | 已实现 | 字号、颜色、粗体、斜体、下划线与删除线 |
| 导出 | PNG 与 JPG | 已实现 | 自定义文件名、自动高度并显示最终像素宽度 |
| 导出 | 普通、高清与超清 | 已实现 | 明确选择输出清晰度 |
| 隐私 | 正文全程本地处理 | 已实现 | 正文、草稿、导入字体和图片生成不离开设备 |
| 反馈 | 主动反馈与邮件通知 | 已实现 | 反馈绝不附带文章正文 |
| 移动端 | 输入、样式、预览与导出 | 已实现，持续打磨 | 三步流程完整，继续优化真机体验 |
| 导出 | 自动分页与 `3:4` 多图导出 | 计划中 | 面向多图社交平台发布 |
| 模板 | 保存自定义模板 | 计划中 | 核心刊页稳定后支持个人预设 |

## 使用方法

1. 输入完整正文，并按需填写标题和署名。
2. 需要时选中文字进行格式或简繁转换。
3. 点击“生成排版”。
4. 选择刊页、配色、字体和间距，或直接编辑预览。
5. 选择导出格式与清晰度并保存图片。

本地可直接打开 [`project/index.html`](./project/index.html)，也可以使用正式页面。无需安装、示例账号、服务器或 API Key。

调整 JavaScript 模块边界后，可运行零依赖冒烟测试：

```bash
node project/tests/module-smoke.test.js
```

## 隐私

正文、导入字体、草稿、排版与图片导出均在浏览器本地处理。草稿存放在 `localStorage` 中，XVI 不会把文章正文上传到应用服务器。

只有用户主动发送“来信”时，反馈文字才会交给原 Netlify Forms 收件端，文章内容不会随反馈发送。详见[隐私说明](./project/PRIVACY.md)。

## 项目结构

| 路径 | 用途 |
| --- | --- |
| `project/index.html` | 正式入口与完整工作台结构 |
| `project/xvi-next.html` | 为旧链接保留的兼容副本 |
| `project/styles.css` | 共享控件与长图排版样式 |
| `project/xvi-next.css` | 桌面端与移动端工作台界面 |
| `project/app-next.js` | 状态、DOM 编排、本地保存、画布编辑与反馈 |
| `project/modules/config.js` | 配色、版式参数、字体栈与标点禁则 |
| `project/modules/i18n.js` | 界面字典与运行时提示 |
| `project/modules/text-layout.js` | 简繁转换、文本清理与 Canvas 断行 |
| `project/modules/exporter.js` | Canvas 布局、富文本绘制与图片下载 |
| `project/vendor/opencc.full.js` | 地区简繁转换运行库 |
| `project/docs/` | 架构、产品过程、设计研究和历史预览 |

## 文档

- [产品方向](./project/PRODUCT_DIRECTION.md)
- [版本记录](./project/CHANGELOG.md)
- [隐私说明](./project/PRIVACY.md)
- [部署与回退](./project/DEPLOYMENT.md)
- [参与开发](./project/CONTRIBUTING.md)
- [前端架构](./project/docs/ARCHITECTURE.md)
- [设计方向](./project/docs/XVI_DESIGN_DIRECTION_ZH.md)
- [研究资料索引](./project/docs/README.md)
- [第三方授权说明](./project/THIRD_PARTY_NOTICES.md)

## 下一阶段

1. 继续打磨手机端流程的真机体验。
2. 完成长文自动分页与小红书 `3:4` 多图批量导出。
3. 发展真正改变阅读结构的刊页，而不是只增加换色模板。
4. 复核在线字体来源、授权和国内网络加载稳定性。
5. 完善无障碍、错误提示和跨浏览器导出测试。

## 许可

项目自有代码采用 [PolyForm Noncommercial 1.0.0](./LICENSE) 许可。个人、学习、研究及其他非商业用途可以使用，但不授权商业使用。XVI 是源码公开的非商业项目，不属于 OSI 定义下的开源软件。

第三方组件与在线字体继续遵循各自的授权条款。详见[第三方授权说明](./project/THIRD_PARTY_NOTICES.md)。

</details>
