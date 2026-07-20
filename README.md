# XVI / 十六开

**A privacy-first Chinese longform typesetting studio that turns finished writing into carefully composed, export-ready images.**

XVI is built for Chinese writers who want more control than a screenshot tool and less friction than a desktop publishing suite. Writers finish entering their text first, generate a composition, and then refine typography, spacing, color, layout, and local emphasis before exporting a long image.

- **Live demo:** [xvi-16k.netlify.app](https://xvi-16k.netlify.app/)
- **Current release:** `v0.7.1` public preview, not yet V1
- **OpenAI Build Week track:** Apps for Your Life
- **Stack:** static HTML, CSS, and vanilla JavaScript
- **Setup:** no build step, account, API key, or sample data required
- **Processing model:** article text, imported fonts, drafts, composition, and image generation stay in the browser

## What XVI Does

XVI separates writing from composition. It does not continuously reflow a long image while the writer is still typing. The user enters or pastes the complete text, deliberately generates a composition, and then works with a stable preview.

### Writing and rich text

- Separate title, author, and rich-text body fields
- Bold, italic, underline, strikethrough, and clear-format actions
- Character counting that ignores markup
- Optional cleanup for chaotic pasted line breaks and paragraph boundaries
- Browser-local draft saving through `localStorage`
- Empty defaults instead of forcing sample copy into a new document

### Chinese localization

- Convert only the selected text instead of replacing the entire document
- Simplified Chinese
- Traditional Chinese for Hong Kong
- Traditional Chinese for Taiwan, including common regional quotation-mark handling
- Chinese line-breaking protection that avoids leaving closing punctuation at the start of a line

### Typography and composition

- Independent body and title font selection
- Built-in system and web-font choices, plus local TTF, OTF, WOFF, and WOFF2 import
- Adjustable body size, title size, title weight, line height, letter spacing, paragraph spacing, canvas width, and page margins
- First-line indentation toggle
- Paragraph spacing presets: `0`, `0.5`, `1`, `1.25`, `1.5`, and `2`
- Left, justified, and centered alignment
- Optional folio information, footer signature, chapter label, section number, and editable kicker text

### Layout structures

XVI currently provides four editorial structures. They change the spatial relationship between heading, metadata, body, and decoration rather than merely recoloring one template.

1. **Folio:** the primary editorial long-page layout, with optional first-paragraph emphasis
2. **Book page:** chapter-oriented hierarchy and book-like heading structure
3. **Letter:** a quieter correspondence-inspired composition
4. **Sectioned long page:** supports user-defined section markers without inserting a number before every paragraph

### Color systems

- Light and dark inspiration modes
- Six base color families within each mode
- Sixteen named special palettes curated as complete background, body, heading, and accent systems
- Independent color controls for background, body text, title, and accent
- Random selection across the complete palette collection
- First-paragraph emphasis modes: none, rule, or color change

### Direct preview editing

After generation, the preview remains editable:

- Edit title, kicker, chapter label, section marker, and body content directly on the composed page
- Select body text and apply bold, italic, underline, or strikethrough
- Adjust local font size and color with the floating editor
- Close the editor to remove all selection outlines from the final composition
- Keep the DOM preview and Canvas export aligned so rich-text styling is preserved in the saved image

### Export

- PNG and JPG output
- Automatic image height based on the finished article
- Default canvas width of `896 px`, adjustable from `640 px` to `1440 px`
- Three explicit resolution levels at the default width:
  - Standard: `896 px`
  - High: `1792 px`
  - Ultra: `2688 px`
- The export panel shows the final pixel width before saving
- Quick Export uses the current generated composition and the default high-resolution PNG setting

### Mobile and feedback

- Responsive input and preview views for common iOS and Android screen sizes
- Desktop remains the recommended environment for detailed typesetting
- Built-in feedback form handled by Netlify Forms
- Feedback submission includes only the fields the user intentionally enters, never the article body
- Direct feedback email: [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)

## Quick Start

### Online

Open [xvi-16k.netlify.app](https://xvi-16k.netlify.app/). No sign-in is required.

### Local

Clone or download the repository, then open `project/index.html` in a modern browser. The app has no dependency installation or build command.

Netlify Forms can only be fully tested on the deployed Netlify site. All editing, typesetting, localization, preview, and export functions work locally.

## Suggested Judging Flow

1. Enter a title, author, and several paragraphs of Chinese text.
2. Select a phrase and apply rich text or convert it to Traditional Chinese (Hong Kong or Taiwan).
3. Generate the composition.
4. Open the Style panel and adjust typography, paragraph spacing, first-line indentation, and page margins.
5. Compare the four layout structures and several named color systems.
6. Click text in the preview and edit its content, size, color, or inline style directly.
7. Open Export, choose PNG or JPG and a resolution, then save the image.

No sample account, external data, or API key is needed.

## Privacy and Data Flow

XVI is intentionally local-first:

- Article text is not uploaded to an application server.
- Imported font files remain in the current browser session and are not uploaded by XVI.
- Drafts are stored in the browser's `localStorage`.
- Long-image generation and raster export run in the browser.
- XVI does not include analytics or article-content logging.
- Only an intentional feedback submission sends feedback text and an optional contact email to Netlify Forms.

See the full [privacy note](./project/PRIVACY.md).

## Architecture

XVI deliberately uses a small, inspectable frontend architecture:

- `project/xvi-next.html` defines the current workspace and Netlify feedback form.
- `project/xvi-next.css` contains the current desktop and mobile interface system.
- `project/styles.css` contains shared controls and long-page composition styles.
- `project/app-next.js` owns rich-text state, localization, composition, direct preview editing, local persistence, and Canvas export.
- `project/vendor/opencc.full.js` provides regional Chinese conversion.
- `project/index.html` is the Netlify root entry for the current workspace.

There is no backend for writing content and no framework build pipeline. This keeps deployment simple and makes the privacy boundary easy to audit.

For more detail, see [Architecture](./project/docs/ARCHITECTURE.md) and [Deployment](./project/DEPLOYMENT.md).

## OpenAI Build Week Scope

XVI existed before the event as an early working prototype. The dated Git history and [changelog](./project/CHANGELOG.md) distinguish earlier work from the work completed during Build Week beginning July 13, 2026.

The Build Week phase added or substantially rebuilt:

- the current editorial workspace and root deployment;
- four distinct layout structures;
- sixteen curated special color systems plus reorganized light and dark inspiration modes;
- direct on-canvas editing for headings, body text, chapter labels, section markers, size, color, and inline styles;
- Simplified Chinese, Traditional Chinese (Hong Kong), and Traditional Chinese (Taiwan) conversion on selected text;
- local font import and explicit privacy boundaries;
- mobile input and preview adaptation;
- clearer export formats, resolution labels, and final pixel widths;
- Netlify feedback, deployment recovery, architecture notes, licensing, and release documentation.

## How Codex and GPT-5.6 Accelerated the Work

Codex with GPT-5.6 served as an iterative product and engineering partner rather than a one-shot code generator.

### Product translation

Codex converted detailed visual and editorial critique into scoped implementation changes. Examples include replacing continuous rendering with deliberate generation, reorganizing color discovery, preserving the main folio layout, simplifying interface copy, and keeping detailed controls without turning the workspace into a generic dashboard.

### Engineering and debugging

Codex helped trace rich-text state through three separate representations: the contenteditable editor, the DOM preview, and the Canvas exporter. This was especially important for preserving bold, italic, underline, strikethrough, local color, and local size in downloaded images.

It also implemented regional Chinese conversion on selected text, punctuation-aware wrapping, mobile workflow states, browser-local draft persistence, and export-resolution reporting.

### Research and decision support

Codex assisted with font-source review, deployment behavior, Netlify privacy boundaries, public-repository preparation, noncommercial licensing, documentation, and Build Week submission requirements.

### Human-led decisions

The final product direction remained human-led. Key decisions included:

- composition begins only after the writer finishes entering text;
- writing content must not be uploaded;
- palettes are named and curated instead of randomly generated;
- templates must change editorial structure rather than squeeze the body into decorative variants;
- direct preview editing complements, rather than replaces, precise slider controls;
- desktop typesetting quality takes priority while mobile support remains available;
- the project is source-visible for noncommercial use, not commercially licensed.

Build Week Codex session: `019ed1b6-c552-7361-a003-a3a02872c498`

## Current Limitations and Roadmap

XVI is a public preview rather than a finished V1.

- Desktop offers the most complete typesetting experience; mobile refinement is ongoing.
- Automatic pagination and batch export for Xiaohongshu-style `3:4` image sets are not yet complete.
- Extremely long raster exports remain subject to browser memory and Canvas limits.
- Online font availability can vary with network conditions; local font import is provided as a fallback.
- Layout structures, especially book, letter, and sectioned pages, will continue to receive editorial refinement.
- Accessibility, cross-browser export testing, and clearer failure states still need broader coverage.

## Repository Guide

| Path | Purpose |
| --- | --- |
| `README.md` | Main English-first project and judging guide |
| `LICENSE` | PolyForm Noncommercial 1.0.0 license for project-owned code |
| `project/` | Deployable static application |
| `project/README.md` | Detailed product documentation |
| `project/CHANGELOG.md` | Version history and dated Build Week scope |
| `project/PRIVACY.md` | Data-handling boundaries |
| `project/PRODUCT_DIRECTION.md` | Product principles and V1 priorities |
| `project/docs/` | Architecture, research references, and historical previews |
| `project/vendor/` | OpenCC-JS runtime and its original license notice |

## License and Third-Party Work

Project-owned code is available under the [PolyForm Noncommercial License 1.0.0](./LICENSE). Personal, educational, research, and other noncommercial uses are permitted; commercial use is not licensed.

XVI is therefore **source-available for noncommercial use**, not open source under the OSI definition.

OpenCC-JS and remotely loaded fonts retain their own licenses and are not relicensed under XVI's license. See [Third-Party Notices](./project/THIRD_PARTY_NOTICES.md).

---

# 中文说明

XVI / 十六开是一个为中文创作者设计、在浏览器本地运行的文本长图排版器。用户先完整输入文字，再主动生成排版，并继续调整字体、字号、间距、配色、版式结构与局部文字样式，最后导出 PNG 或 JPG 长图。

- 在线使用：[xvi-16k.netlify.app](https://xvi-16k.netlify.app/)
- 当前版本：`v0.7.1` 公开预览版，尚未进入 V1
- 无需注册、安装依赖、API Key 或示例账户
- 正文、导入字体、草稿、排版与图片生成均留在浏览器本地

## 完整功能

### 写作与文字

- 标题、署名和富文本正文输入
- 粗体、斜体、下划线、删除线与清除格式
- 字数统计、粘贴文本清理与智能分段
- 草稿自动保存到当前浏览器
- 默认空白文档，不强行填入示例内容

### 中文本地化

- 只转换选中文字，不必修改整篇文章
- 简体中文
- 繁体中文（香港）
- 繁体中文（台湾），包含常用地区引号处理
- 中文标点避头处理，减少标点悬挂在行首的问题

### 字体与排版

- 标题与正文字体分别设置
- 支持系统字体、在线字体与本地 TTF、OTF、WOFF、WOFF2 导入
- 正文和标题字号、标题字重、行距、字距、段距、画布宽度、页边距
- 首行缩进开关
- `0 / 0.5 / 1 / 1.25 / 1.5 / 2` 段间距
- 左对齐、两端对齐与居中
- 版头、底部署名、章节标识、节号与题头文字

### 刊页结构与配色

- 标准刊页、书页、信笺、分节长页四种结构
- 浅色与深色灵感模式
- 十六套具名特别配色
- 背景、正文、标题和强调色独立调整
- 在全部配色中随机选择
- 首段无强调、引线或变色

### 预览内编辑

- 直接编辑标题、题头、章节标识、节号与正文
- 选中正文后调整粗体、斜体、下划线、删除线、局部字号和颜色
- 关闭浮动编辑器后彻底移除选中轮廓
- 预览与导出同步保留富文本效果

### 导出与移动端

- PNG 与 JPG
- 普通、高清、超清三档，并直接显示最终像素宽度
- 默认宽度对应 `896 / 1792 / 2688 px`，高度随正文自动计算
- 支持 `640–1440 px` 基础画布宽度
- iOS 与 Android 常见手机尺寸基础适配
- 桌面端仍是精细排版的推荐环境

### 隐私与反馈

- 正文不会上传到项目服务器
- 导入字体不会由 XVI 上传
- 草稿保存在浏览器 `localStorage`
- 图片生成与导出在浏览器完成
- 只有主动提交“来信”时，反馈内容和可选邮箱才交给 Netlify Forms
- 也可以发送邮件至 [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)

## 本地运行

下载仓库后直接打开 `project/index.html`。项目没有安装与构建步骤。

本地页面可以完整测试输入、简繁转换、排版、预览内编辑与图片导出；Netlify Forms 反馈需要在正式部署页面测试。

## 比赛开发说明

XVI 在比赛前已有早期原型。2026 年 7 月 13 日开始的 Build Week 阶段重做或新增了当前工作台、四种刊页结构、十六套特别配色、预览内编辑、地区简繁转换、本地字体导入、移动端基础适配、导出清晰度说明、反馈与隐私边界，以及完整的部署、架构、版本和许可文档。

Codex 与 GPT‑5.6 主要用于把持续的视觉反馈转化为具体实现，追踪富文本在编辑器、DOM 预览和 Canvas 导出之间的一致性，处理地区简繁、标点换行、移动端流程、本地保存、导出尺寸、部署与文档整理。产品方向、审美判断、文字策略、隐私原则和最终取舍由项目作者决定。

## 许可

项目自有代码采用 [PolyForm Noncommercial 1.0.0](./LICENSE)：允许个人、学习、研究及其他非商业用途，不授权商业使用。

这是一个源码公开的非商业项目，不属于 OSI 定义下的开源软件。OpenCC-JS 与在线字体继续遵循各自的原始许可。
