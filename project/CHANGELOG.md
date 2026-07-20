# Changelog / 版本记录

Versions follow `major.minor.patch`. Before V1, minor versions represent verifiable product stages and patch versions represent functional or experiential refinements within the same stage.

## v0.7.1 - 2026-07-17

### Writing

- Cleared the default title, author, and body, and removed sample-copy restoration.
- Changed the default body size to `32 px`.
- Moved regional Chinese conversion into the rich-text toolbar and limited it to selected text.
- Added Simplified Chinese, Traditional Chinese (Hong Kong), and Traditional Chinese (Taiwan), including common Taiwanese corner-quote handling.

### Composition and preview

- Changed the default first-paragraph emphasis to color while retaining none and rule options.
- Added chapter labels to Book Page and user-defined section markers to Sectioned Long Page.
- Made every layout structure respect the user's current font settings.
- Added direct preview editing for title, body, first paragraph, chapter label, and section marker.
- Preserved bold, italic, underline, and strikethrough in preview and export.
- Removed selection outlines completely when closing the floating preview editor.
- Increased kicker text size and removed the simulated paper-texture toggle.

### Color and typography

- Renamed, recolored, and reordered sixteen special palettes.
- Added PingFang, Wenjin Mincho, Siyuan YingSong, and other font choices.
- Retained local font import without uploading font files.

### Export and mobile

- Renamed export levels to Standard, High, and Ultra and displayed final pixel widths.
- Set the default preview zoom to `55%`.
- Added mobile bottom navigation plus dedicated input and preview states.

### Privacy and feedback

- Clarified that article text, imported fonts, and image generation remain in the browser.
- Added Netlify Forms feedback that never attaches the article body.
- Enabled form detection and email notifications.
- Added direct email feedback through `absurdedenxvi@gmail.com`.

### Maintenance

- Unified the production entry at the root URL.
- Renamed the Netlify project and free domain to `xvi-16k` and `xvi-16k.netlify.app`.
- Updated the repository address to `absurdeden-xvi/xvi-16k`.
- Adopted PolyForm Noncommercial 1.0.0 for project-owned code and documented third-party boundaries.
- Moved the license and judging README to the repository root.
- Removed the early Chinese questionnaire and generation scripts from the public repository.
- Removed low-resolution browser and iOS icons pending a proper replacement.
- Unified asset cache versions at `v0.7.1`.
- Added privacy, deployment, contributing, architecture, licensing, and research documentation.

## v0.7.0 - 2026-07-15

- Released the current XVI editorial workspace.
- Promoted the new workspace to the root production URL.
- Established four layout structures, named color systems, and direct preview editing.
- Preserved `legacy-v0.6.3.html` as a stable historical reference.

## v0.6.3 - 2026-06-18

- Established the core flow for writing, generated composition, color, typography, spacing, and PNG export.
- Restored and fixed the early twelve named palettes.
- Established Git version history and automatic Netlify deployment.

---

# 中文版本记录

版本遵循 `主版本.次版本.修订号`。V1 之前的次版本代表可验证的产品阶段，修订号用于同一阶段内的功能与体验更新。

## v0.7.1 - 2026-07-17

### 写作

- 默认标题、署名和正文改为空，移除示例文案与“恢复示例”。
- 默认正文字号调整为 `32 px`。
- 将简繁转换移到富文本工具栏，支持选中文字后转换为简中、繁中（港）或繁中（台）。
- 台湾繁体同步转换常用弯引号为直角引号。

### 排版与预览

- 默认首段强调改为“变色”，并保留无强调与引线选项。
- 书页支持章节标识；分节长页只在用户填写节号时显示节号。
- 标准刊页、书页、信笺和分节长页遵循用户当前字体设置。
- 增加画布内标题、正文、首段、章节标识与节号编辑。
- 画布内正文支持粗体、斜体、下划线和删除线。
- 关闭画布编辑器后彻底清除选中轮廓。
- 放大标题上方文字，移除伪纸张纹理开关。

### 配色与字体

- 完成 16 套特别配色的重新命名、调色和排序。
- 增加苹方、文津宋体和司源赢宋等字体选项。
- 保留本地字体导入，文件不会上传。

### 导出与移动端

- 清晰度改为普通、高清、超清，并显示对应像素宽度。
- 默认预览比例调整为 `55%`。
- 增加手机端底部流程导航、输入视图和预览视图适配。

### 隐私与反馈

- 明确正文、字体和图片只在本地浏览器处理。
- 增加 Netlify Forms 反馈入口；只提交用户填写的反馈，不附带正文。
- 启用 Netlify 表单识别与邮件通知。
- 增加直接邮件反馈渠道 `absurdedenxvi@gmail.com`。

### 维护

- 当前正式入口统一为根网址。
- Netlify 项目与免费域名统一为 `xvi-16k` 和 `xvi-16k.netlify.app`。
- 仓库地址更新为 `absurdeden-xvi/xvi-16k`。
- 项目自有代码采用 PolyForm Noncommercial 1.0.0，明确允许非商业使用并禁止未经授权的商业使用。
- 增加第三方组件与在线字体授权边界说明。
- 将许可证与仓库总览移到 GitHub 根目录，并把早期中文问卷移出公开仓库、本地归档。
- 移除未达到清晰度要求的浏览器标签与 iOS 主屏幕图标，留待后续重新制作。
- 页面资源缓存版本统一为 `v0.7.1`。
- 补齐隐私、部署、贡献、架构和研究资料文档。

## v0.7.0 - 2026-07-15

- 发布新的 XVI 工作台视觉体系。
- 将新版设为根网址正式入口。
- 建立四种刊页结构、具名配色和画布内编辑基础。
- 保留 `legacy-v0.6.3.html` 作为稳定回退页面。

## v0.6.3 - 2026-06-18

- 建立输入、自动排版、配色、字体、间距与 PNG 导出的核心流程。
- 恢复并固定早期 12 套配色命名。
- 建立 Git 版本记录和 Netlify 自动部署。
