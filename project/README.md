# XVI / 十六开

XVI is a privacy-first, browser-based longform typesetting studio for Chinese writers. Finish the text first, generate a stable editorial composition, refine it, and export a publication-ready long image.

- Current release: `v0.7.4`
- Product stage: public preview, not yet V1
- Live demo: [xvi-16k.netlify.app](https://xvi-16k.netlify.app/)
- Repository: [absurdeden-xvi/xvi-16k](https://github.com/absurdeden-xvi/xvi-16k)
- Feedback: [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)

## OpenAI Build Week submission

XVI is a privacy-first, browser-based longform typesetting studio for Chinese writers. Writers finish their text first, generate an editorial long image, and then refine typography, spacing, color, layout structure, and inline emphasis before exporting PNG or JPG files.

- Live demo: [xvi-16k.netlify.app](https://xvi-16k.netlify.app/)
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
- Netlify feedback, deployment recovery, architecture notes, and release documentation.

### How Codex and GPT-5.6 were used

During OpenAI Build Week, Codex with GPT-5.6 served as an iterative product and engineering partner. It translated detailed visual critique into scoped interface changes, debugged rich-text parity across the editor, DOM preview, and Canvas export, designed regional Chinese conversion behavior, reorganized mobile interaction, audited local-only data handling, and maintained versioned documentation.

The main product decisions remained human-led: composition begins only after the writer finishes entering text; writing is never uploaded; color systems are named and curated rather than randomly generated; and templates must change editorial structure instead of merely recoloring the same page.

### Run and test

Open [`index.html`](./index.html) directly in a modern browser, or visit the live demo. No installation, API key, sample account, or server is required. A useful judging path is: enter Chinese text, apply rich-text or regional conversion to a selection, generate the layout, edit the preview directly, switch templates and colors, then export at a chosen resolution.

## Current capabilities

### Writing and localization

- Separate title, author, and rich-text body fields
- Bold, italic, underline, strikethrough, and clear formatting
- Selected-text conversion to Simplified Chinese, Traditional Chinese (Hong Kong), or Traditional Chinese (Taiwan)
- Character count, pasted-text cleanup, and optional paragraph normalization
- Browser-local draft persistence
- Chinese and English interface switching from Settings, persisted in the current browser

### Composition and visual system

- Four editorial structures: Folio, Book Page, Letter, and Sectioned Long Page
- First-line indentation and `0 / 0.5 / 1 / 1.25 / 1.5 / 2` paragraph-spacing presets
- Independent body and title fonts, sizes, title weight, line height, letter spacing, margins, and canvas width
- Light and dark inspiration modes plus sixteen named special palettes
- Independent background, body, title, and accent colors
- System and web fonts, plus local TTF, OTF, WOFF, and WOFF2 import

### Preview and export

- Deliberate generation after writing instead of continuous long-image reflow
- Direct preview editing for title, kicker, body, chapter label, and section marker
- Local font size, color, bold, italic, underline, and strikethrough editing on the composed page
- PNG and JPG output
- Standard, High, and Ultra resolution with the final pixel width shown before export
- Full desktop workspace and foundational mobile input and preview support

## Usage

1. Enter the complete body text and optionally add a title and author.
2. Apply rich text or regional Chinese conversion to a selection when needed.
3. Select Generate Composition.
4. Choose a layout, palette, font, and spacing, or edit the preview directly.
5. Select an export format and resolution, then save the image.

The project is a static site with no build step. Open [`index.html`](./index.html) locally or use the deployed root URL.

## Privacy

Article text, imported fonts, draft state, composition, and image export are processed in the browser. Drafts are stored in `localStorage`. XVI does not upload article content to an application server.

Only an intentional feedback submission sends the entered feedback and optional email to Netlify Forms; the article is never attached. See [Privacy](./PRIVACY.md).

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Current deployed entry point |
| `xvi-next.html` | Workspace structure and Netlify feedback form |
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

Netlify deploys the `main` branch automatically. Before a release, align asset versions, update [`CHANGELOG.md`](./CHANGELOG.md), and complete the checks in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

Project-owned code is available under [PolyForm Noncommercial 1.0.0](../LICENSE). Personal, educational, research, and other noncommercial uses are permitted; commercial use is not licensed. XVI is source-available for noncommercial use, not open source under the OSI definition.

Third-party components and online fonts retain their own licenses. See [Third-Party Notices](./THIRD_PARTY_NOTICES.md) and [`vendor/opencc-js.LICENSE`](./vendor/opencc-js.LICENSE).

---

# 中文说明

为中文创作者设计的文本长图排版器。完整输入文字后，生成可继续微调并导出的长图。

- 当前版本：`v0.7.4`
- 产品阶段：公开预览版，尚未进入 V1
- 在线使用：[xvi-16k.netlify.app](https://xvi-16k.netlify.app/)
- 代码仓库：[absurdeden-xvi/xvi-16k](https://github.com/absurdeden-xvi/xvi-16k)
- 反馈邮箱：[absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)

## 当前能力

### 写作与文字

- 标题、署名和富文本正文输入
- 粗体、斜体、下划线、删除线与清除格式
- 选中文字后转换为简中、繁中（港）或繁中（台）
- 字数统计、文本清理与智能分段
- 草稿自动保存在当前浏览器

### 排版与风格

- 标准刊页、书页、信笺、分节长页四种结构
- 首行缩进，以及 `0 / 0.5 / 1 / 1.25 / 1.5 / 2` 段间距
- 正文与标题字体、字号、字重、行距、字距、页边距和画布宽度
- 浅色、深色与 16 套具名特别配色，也可单独修改背景、正文、标题和强调色
- 宋体、苹方、霞鹜新致宋、文津宋体、汇文明朝体、朱雀仿宋、司源赢宋、霞鹜文楷、悠哉字体与等宽字体
- 本地导入 TTF、OTF、WOFF、WOFF2 字体

### 预览与导出

- 生成后预览，避免输入长文时持续重排
- 在画布上直接编辑标题、题头、正文、章节标识与节号
- 在画布上调整局部字号、颜色和正文格式
- PNG / JPG 导出
- 普通、高清、超清三档，直接显示最终像素宽度
- 桌面端完整工作台与移动端基础适配

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
| `xvi-next.html` | 当前工作台结构与 Netlify 反馈表单 |
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

`main` 分支由 Netlify 自动部署。正式发布前必须统一页面资源版本、更新 `CHANGELOG.md`，并完成 [DEPLOYMENT.md](./DEPLOYMENT.md) 中的检查项。

## 许可

XVI / 十六开的自有代码采用 [PolyForm Noncommercial 1.0.0](../LICENSE) 许可：可以用于个人、学习、研究及其他非商业用途，但不授权商业使用。这是一个**源码公开的非商业项目**，不属于 OSI 定义下的开源软件。

第三方组件与在线字体不适用上述许可，仍分别遵循原作者的授权条款。详见 [第三方授权说明](./THIRD_PARTY_NOTICES.md) 与 [`vendor/opencc-js.LICENSE`](./vendor/opencc-js.LICENSE)。
