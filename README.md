# XVI / 十六开

XVI is a privacy-first, browser-based longform typesetting studio for Chinese writers. Finish the text first, generate a stable editorial composition, refine it, and export a publication-ready long image.

- Current release: `v0.7.8`
- Product stage: public preview, not yet V1
- Live demo: [xvi-16k.pages.dev](https://xvi-16k.pages.dev/)
- Repository: [absurdeden-xvi/xvi-16k](https://github.com/absurdeden-xvi/xvi-16k)
- Feedback: [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)

## OpenAI Build Week submission

XVI is a privacy-first, browser-based longform typesetting studio for Chinese writers. Writers finish their text first, generate an editorial long image, and then refine typography, spacing, color, layout structure, and inline emphasis before exporting PNG or JPG files.

- Live demo: [xvi-16k.pages.dev](https://xvi-16k.pages.dev/)
- Submission track: **Apps for Your Life**
- Runtime: static HTML, CSS, and JavaScript; no build step or account required
- Local processing: article text, imported fonts, drafts, and image generation stay in the browser

### Build Week scope

XVI existed before the event as an early working prototype. The dated Git history and [`CHANGELOG.md`](./CHANGELOG.md) distinguish the work completed after July 13, 2026. The Build Week phase added or substantially rebuilt:

- the current editorial workspace and root deployment;
- four layout structures and sixteen curated special color systems;
- direct on-canvas editing for headings, body text, chapter labels, size, color, and inline styles;
- Simplified Chinese, Traditional Chinese (Hong Kong), and Traditional Chinese (Taiwan) conversion;
- local font import and explicit privacy boundaries;
- mobile input and preview adaptation;
- clearer export formats, resolutions, and final pixel widths;
- bilingual localization, hybrid feedback delivery, deployment recovery, architecture notes, and release documentation.

### How Codex and GPT-5.6 were used

During OpenAI Build Week, Codex with GPT-5.6 served as an iterative product and engineering partner. It translated detailed visual critique into scoped interface changes, debugged rich-text parity across the editor, DOM preview, and Canvas export, designed regional Chinese conversion behavior, reorganized mobile interaction, audited local-only data handling, and maintained versioned documentation.

The main product decisions remained human-led: composition begins only after the writer finishes entering text; writing is never uploaded; color systems are named and curated rather than randomly generated; and templates must change editorial structure instead of merely recoloring the same page.

### Run and test

Open [`index.html`](./index.html) directly in a modern browser, or visit the live demo. No installation, API key, sample account, or server is required. A useful judging path is: enter Chinese text, apply rich-text or regional conversion to a selection, generate the layout, edit the preview directly, switch templates and colors, then export at a chosen resolution.

## Current capabilities

| Area | Capability | Status | Notes |
| --- | --- | --- | --- |
| Writing | Title, body, and byline | Implemented | Blank-first writing flow without continuous long-image rendering |
| Writing | Inline rich text | Implemented | Bold, italic, underline, strikethrough, and clear formatting |
| Writing | Character count | Implemented | Ignores whitespace and line breaks |
| Writing | Browser-local autosave | Implemented | Drafts remain in the current browser |
| Localization | Simplified and regional Traditional Chinese | Implemented | Converts selected text to Simplified Chinese, Traditional Chinese (Hong Kong), or Traditional Chinese (Taiwan) |
| Localization | Chinese and English interface | Implemented | Interface language persists without translating user content |
| Composition | Deliberate automatic composition | Implemented | Generates only after the writer finishes entering text |
| Composition | Text cleanup and paragraph detection | Implemented | Repairs pasted soft line breaks and optionally detects paragraphs |
| Typography | Separate body and title typefaces | Implemented | CJK and Latin font groups can be selected independently |
| Typography | Local font import | Implemented | Supports TTF, OTF, WOFF, and WOFF2 without uploading files |
| Typography | Body and title size, title weight | Implemented | Range controls plus precise numeric input |
| Typography | Line, letter, and paragraph spacing | Implemented | Includes classic paragraph-gap presets and continuous fine tuning |
| Layout | Canvas width and page margins | Implemented | Adjustable long-image dimensions and reading measure |
| Layout | Alignment and first-line indentation | Implemented | Left, justified, and centered text with optional two-character indent |
| Layout | Opening-paragraph treatment | Implemented | None, rule, or accent color with adjustable opening scale |
| Templates | Folio | Implemented | Primary editorial structure and current default |
| Templates | Book Page | Implemented | Optional editable chapter label |
| Templates | Letter | Implemented | More open correspondence-oriented composition |
| Templates | Sectioned Long Page | Implemented | User-defined section marker and expanded hierarchy |
| Color | Light and dark color families | Implemented | Six curated families across light and dark modes |
| Color | Sixteen named special palettes | Implemented | Curated combinations designed for long-form readability |
| Color | Independent color controls | Implemented | Background, body, title, and accent colors can be changed separately |
| Color | Random inspiration | Implemented | Samples from the complete curated palette collection |
| Preview | Post-composition preview | Implemented | Avoids disruptive reflow while the user is still writing |
| Preview | Direct canvas editing | Implemented | Title, kicker, body, chapter label, and section marker are editable |
| Preview | Local text styling | Implemented | Size, color, bold, italic, underline, and strikethrough remain exportable |
| Export | PNG and JPG long images | Implemented | Custom file name and automatic image height |
| Export | Standard, High, and Ultra resolution | Implemented | Shows final pixel width before saving |
| Privacy | Local-only article processing | Implemented | Article text, imported fonts, drafts, and image generation stay on-device |
| Feedback | Explicit feedback form and email notification | Implemented | Netlify receives feedback only; article content is never attached |
| Mobile | Phone input, preview, and export workflow | In progress | Foundational layout exists; stability and ergonomics still need refinement |
| Export | Automatic pagination and `3:4` batch export | Planned | Intended for Xiaohongshu and other multi-image publishing workflows |
| Templates | Save reusable custom templates | Planned | Named personal presets after the core structures stabilize |
| Content | Images, epigraphs, and section dividers | Future | Richer long-form document structure |
| Cloud | Accounts and cloud drafts | Deferred | Local-first use remains the product default |

## Usage

1. Enter the complete body text and optionally add a title and author.
2. Apply rich text or regional Chinese conversion to a selection when needed.
3. Select Generate Composition.
4. Choose a layout, palette, font, and spacing, or edit the preview directly.
5. Select an export format and resolution, then save the image.

The project is a static site with no build step. Open [`index.html`](./index.html) locally or use the deployed root URL.

## Privacy

Article text, imported fonts, draft state, composition, and image export are processed in the browser. Drafts are stored in `localStorage`. XVI does not upload article content to an application server.

Only an intentional feedback submission sends the entered feedback to the legacy Netlify Forms receiver; the article is never attached. See [Privacy](./PRIVACY.md).

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Current deployed entry point |
| `xvi-next.html` | Workspace structure and feedback form |
| `styles.css` | Shared controls and long-page composition styles |
| `xvi-next.css` | Current desktop and mobile interface |
| `app-next.js` | Editing, localization, composition, persistence, and export |
| `vendor/opencc.full.js` | Regional Chinese conversion runtime |
| `THIRD_PARTY_NOTICES.md` | Third-party software and font boundaries |
| `legacy-v0.6.3.html` | Historical rollback reference |
| `docs/` | Architecture, research references, and historical previews |

## Documentation

- [Product direction](./PRODUCT_DIRECTION.md)
- [Changelog](./CHANGELOG.md)
- [Privacy](./PRIVACY.md)
- [Deployment and rollback](./DEPLOYMENT.md)
- [Contributing](./CONTRIBUTING.md)
- [License](../LICENSE)
- [Third-party notices](./THIRD_PARTY_NOTICES.md)
- [Research index](./docs/README.md)
- [Build Week demo script](./docs/DEMO_SCRIPT.md)

## Next priorities

1. Improve mobile input, preview, and export stability.
2. Complete automatic pagination and Xiaohongshu-style `3:4` batch export.
3. Continue refining editorial structures rather than adding recolored duplicates.
4. Audit online font provenance, licensing, and loading reliability in mainland China.
5. Expand accessibility, error handling, and cross-browser export testing.

## Publishing and license

Cloudflare Pages deploys the `main` branch automatically. The legacy Netlify site remains only as the form receiver and fallback deployment. Before a release, align asset versions, update [`CHANGELOG.md`](./CHANGELOG.md), and complete the checks in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

Project-owned code is available under [PolyForm Noncommercial 1.0.0](../LICENSE). Personal, educational, research, and other noncommercial uses are permitted; commercial use is not licensed. XVI is source-available for noncommercial use, not open source under the OSI definition.

Third-party components and online fonts retain their own licenses. See [Third-Party Notices](./THIRD_PARTY_NOTICES.md) and [`vendor/opencc-js.LICENSE`](./vendor/opencc-js.LICENSE).

---

# 中文说明

为中文创作者设计的文本长图排版器。完整输入文字后，生成可继续微调并导出的长图。

- 当前版本：`v0.7.8`
- 产品阶段：公开预览版，尚未进入 V1
- 在线使用：[xvi-16k.pages.dev](https://xvi-16k.pages.dev/)
- 代码仓库：[absurdeden-xvi/xvi-16k](https://github.com/absurdeden-xvi/xvi-16k)
- 反馈邮箱：[absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)

## 当前能力

| 模块 | 功能 | 状态 | 设计说明 |
| --- | --- | --- | --- |
| 写作 | 标题、正文、署名 | 已实现 | 空白开始，输入阶段不持续渲染长图 |
| 写作 | 行内富文本 | 已实现 | 粗体、斜体、下划线、删除线与清除格式 |
| 写作 | 字数统计 | 已实现 | 忽略空格和换行统计 |
| 写作 | 浏览器本地自动保存 | 已实现 | 草稿只保存在当前浏览器 |
| 文字 | 简中与地区繁体转换 | 已实现 | 选中文字后转换为简中、繁中（港）或繁中（台） |
| 文字 | 中英文界面 | 已实现 | 记住界面语言，不翻译用户正文 |
| 排版 | 主动生成与自动排版 | 已实现 | 写完后再生成，不在输入中反复重排 |
| 排版 | 文本清理与智能分段 | 已实现 | 修复粘贴软换行，并按需识别自然段 |
| 字体 | 标题与正文字体 | 已实现 | 中文与拉丁字体组可分别选择 |
| 字体 | 导入本地字体 | 已实现 | 支持 TTF、OTF、WOFF、WOFF2，不上传字体文件 |
| 字体 | 正文与标题字号、标题字重 | 已实现 | 滑杆调节与精确数值输入并存 |
| 排版 | 行距、字距、段距 | 已实现 | 经典段间距档位与连续微调并存 |
| 排版 | 画布宽度、页边距 | 已实现 | 调整长图尺寸与正文阅读宽度 |
| 排版 | 对齐与首行缩进 | 已实现 | 左对齐、两端对齐、居中及两字缩进 |
| 排版 | 首段强调 | 已实现 | 无、引线、变色三种形式，并可调整首段字号 |
| 模板 | 标准刊页 | 已实现 | 主要刊页结构与当前默认模板 |
| 模板 | 书页 | 已实现 | 支持可编辑章节标识 |
| 模板 | 信笺 | 已实现 | 更舒展、接近书信的空间结构 |
| 模板 | 分节长页 | 已实现 | 支持用户指定节号与更明显的层级关系 |
| 配色 | 深浅模式与六个色系 | 已实现 | 分别整理浅色与深色阅读方案 |
| 配色 | 十六套具名特别配色 | 已实现 | 以长文可读性为前提进行人工筛选 |
| 配色 | 自定义颜色 | 已实现 | 背景、正文、标题与强调色可独立调整 |
| 配色 | 随机灵感 | 已实现 | 从全部已整理配色中随机选择 |
| 预览 | 生成后预览 | 已实现 | 避免输入长文时持续重排和跳动 |
| 预览 | 画布内直接编辑 | 已实现 | 标题、题头、正文、章节标识与节号均可编辑 |
| 预览 | 局部文字样式 | 已实现 | 字号、颜色、粗体、斜体、下划线与删除线可同步导出 |
| 导出 | PNG / JPG 长图 | 已实现 | 支持自定义文件名与自动高度 |
| 导出 | 普通、高清、超清 | 已实现 | 保存前直接显示最终像素宽度 |
| 隐私 | 正文全程本地处理 | 已实现 | 正文、导入字体、草稿和图片生成不离开设备 |
| 反馈 | 主动反馈与邮件通知 | 已实现 | Netlify 仅接收反馈文字，绝不附带文章正文 |
| 移动端 | 手机输入、预览与导出 | 优化中 | 已有基础流程，仍需继续提高稳定性与操作效率 |
| 导出 | 自动分页与 `3:4` 多图导出 | 计划中 | 面向小红书等多图发布场景 |
| 模板 | 保存自定义模板 | 计划中 | 核心刊页稳定后支持命名与复用个人样式 |
| 内容 | 图片、题记、章节分隔 | 后续探索 | 丰富长文的内容结构 |
| 云服务 | 登录和云端草稿 | 暂缓 | 本地优先仍是产品默认方向 |

## 使用

1. 输入完整正文，并按需填写标题和署名。
2. 需要时选中文字进行格式或简繁转换。
3. 点击“生成排版”。
4. 在“样式”中选择刊页、配色、字体和间距，也可以直接编辑预览。
5. 在“导出”中选择格式与清晰度并保存图片。

项目是静态网页，没有安装和构建步骤。本地可直接打开 [`index.html`](./index.html)，正式页面由根网址加载。

## 隐私

正文、导入字体和图片导出均在浏览器本地处理，不上传到项目服务器。草稿存放在浏览器的 `localStorage` 中。

只有用户主动提交“来信”时，反馈文字才会交给 Netlify Forms；文章正文不会随反馈发送。也可以不经过表单，直接发送邮件至 [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)。详见 [PRIVACY.md](./PRIVACY.md)。

## 项目结构

| 路径 | 用途 |
| --- | --- |
| `index.html` | 根网址入口，转到当前正式工作台 |
| `xvi-next.html` | 当前工作台结构与反馈表单 |
| `styles.css` | 共享基础样式与长图画布样式 |
| `xvi-next.css` | 当前工作台的视觉与移动端样式 |
| `app-next.js` | 编辑、排版、预览、本地保存和导出逻辑 |
| `vendor/opencc.full.js` | 简繁转换运行库 |
| `THIRD_PARTY_NOTICES.md` | 第三方组件与在线字体授权边界 |
| `legacy-v0.6.3.html` | 历史回退快照 |
| `docs/` | 研究资料、预览图与维护文档索引 |

## 文档

- [产品方向](./PRODUCT_DIRECTION.md)
- [版本记录](./CHANGELOG.md)
- [隐私说明](./PRIVACY.md)
- [部署与回退](./DEPLOYMENT.md)
- [参与开发](./CONTRIBUTING.md)
- [项目许可](../LICENSE)
- [第三方授权说明](./THIRD_PARTY_NOTICES.md)
- [研究资料索引](./docs/README.md)

## 下一阶段

1. 提升手机端输入、预览和导出的稳定性。
2. 完成长文自动分页与小红书 `3:4` 多图批量导出。
3. 继续打磨刊页结构，而不是只增加换色模板。
4. 复核在线字体来源、授权和国内网络加载稳定性。
5. 完善无障碍、错误提示和跨浏览器导出测试。

## 发布

`main` 分支由 Cloudflare Pages 自动部署；原 Netlify 页面仅保留为表单收件端与备用部署。正式发布前必须统一页面资源版本、更新 `CHANGELOG.md`，并完成 [DEPLOYMENT.md](./DEPLOYMENT.md) 中的检查项。

## 许可

XVI / 十六开的自有代码采用 [PolyForm Noncommercial 1.0.0](../LICENSE) 许可：可以用于个人、学习、研究及其他非商业用途，但不授权商业使用。这是一个**源码公开的非商业项目**，不属于 OSI 定义下的开源软件。

第三方组件与在线字体不适用上述许可，仍分别遵循原作者的授权条款。详见 [第三方授权说明](./THIRD_PARTY_NOTICES.md) 与 [`vendor/opencc-js.LICENSE`](./vendor/opencc-js.LICENSE)。
