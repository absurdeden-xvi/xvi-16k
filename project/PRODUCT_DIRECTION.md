# XVI / 十六开: Product Direction / 产品方向

## One-sentence positioning

A Chinese longform image typesetting tool that accepts finished writing, generates a dependable composition, and lets the writer freely refine it for publication.

## Current stage

`v0.7.1` is a public preview. The core workflow is usable, but mobile reliability, template maturity, font-license verification, and multi-image export have not reached the V1 standard.

V1 does not simply mean “more features.” XVI reaches V1 only when the core flow is stable, default output is trustworthy, and neither desktop nor mobile blocks the user.

## Core users

- Fiction, fanfiction, essay, poetry, and longform writers
- Text-focused creators publishing on Weibo, Xiaohongshu, and similar platforms
- People preserving diaries, personal records, and private expression

## Product principles

### Writing comes before typesetting

The page should open directly into writing. The body is empty by default; users do not need to select a template first, and sample text never speaks on their behalf.

### Automatic composition is a starting point

One generation pass solves basic proportion and line breaking. Users can still change type, spacing, structure, and color. Regeneration should preserve deliberate choices whenever possible.

### Templates must change reading structure

Template differences should come from relationships among folio, heading, chapter, body, and signature—not from narrowing the body or replacing only the background color.

### Freedom is not parameter accumulation

Basic actions stay direct while advanced settings unfold on demand. Sliders, precise values, and direct preview editing can coexist, but they must not duplicate effort.

### Privacy is the default

Article text, imported fonts, and image export should remain local whenever possible. Any network behavior must be explicit, and feedback forms must never attach the article body.

## Brand and language

- The primary brand is `XVI / 十六开`; English contexts may use `XVI`, while `16k` is mainly used for domains and account names.
- The product does not impose a permanent slogan or fill the interface with vague literary copy.
- Kicker text is blank by default and can hold a chapter, date, or column label.
- `XVI / 016` is edition metadata, not a substitute for the article title.
- Interface copy should name the action itself and avoid personification or empty “literary” explanation.

## Visual principles

- Air, freedom, and movement should come from proportion, type, whitespace, and rhythm rather than decorative shapes.
- The workspace should feel quiet and soft without collapsing into a single low-saturation palette.
- Every color system must be evaluated across title, body, accent, and sustained reading.
- Fonts should prioritize complete Chinese character coverage, punctuation quality, screen readability, and verifiable licensing.
- Avoid industrial-control-panel stiffness, rigid grids, nested rounded cards, and the cliché that simulated aged paper automatically feels literary.

## V1 requirements

1. Generated composition remains stable for short text, long text, empty titles, and complex punctuation.
2. Desktop writing, styling, preview, and export are complete.
3. Mobile can reliably complete input, generation, preview, and saving.
4. PNG and JPG match the preview without losing rich text, fonts, or color.
5. Punctuation rules, paragraph cleanup, regional conversion, and local saving have explicit boundaries.
6. Every bundled font has verified provenance and licensing.
7. Privacy, feedback, versioning, deployment, and rollback documentation are complete.

## Priorities

### P0: release stability

- Critical mobile workflow
- Export parity and cross-browser testing
- Draft recovery and error reporting
- Reliable font fallback when online loading fails

### P1: publishing efficiency

- Automatic longform pagination
- Xiaohongshu-style `3:4` batch export
- Platform-size presets
- Saving and reusing custom templates

### P2: expressive range

- More mature editorial structures
- Images, epigraphs, and chapter dividers
- Undo, redo, and broader keyboard shortcuts
- Carefully reviewed palette and font expansion

## Outside the V1 scope

- Accounts and cloud drafts
- A writing community or content platform
- AI rewriting the user's article
- A payment system
- PDF, Markdown, or complex publishing-format import

## Confirmed product decisions

- Do not separate “single work” and “serial” modes; chapter information remains an optional layout field.
- Default body size is `32 px`; default first-paragraph emphasis is color.
- Title, author, and body are empty by default.
- Default preview zoom is `55%`; mobile fits the available width.
- Regional Chinese conversion affects only selected text.
- Taiwanese Traditional Chinese converts common quotation marks to corner quotes; Hong Kong mode retains its separate quotation behavior.
- Netlify Forms receives feedback, with direct email available as an alternative.

## Future exploration

- Natural-language layout suggestions without storing or transmitting article text
- AI-assisted color and template recommendations
- Independent pixel, print, and material-texture modules
- Keep basic long-image conversion free; evaluate advanced design capabilities separately

---

# 中文产品方向

## 一句话定位

面向中文创作者的文本长图排版工具：完整输入文字，自动得到可靠起点，再自由调整为适合发布的图片。

## 当前阶段

`v0.7.1` 是公开预览版。核心工作流已经可用，但移动端、模板成熟度、字体授权复核和多图导出尚未达到 V1 标准。

V1 不是“功能更多”的代称。只有核心流程稳定、默认结果可信、手机和桌面端都不会阻断用户时，才进入 V1。

## 核心用户

- 小说、同人、随笔、诗歌与长文作者
- 微博、小红书等平台的文字内容创作者
- 日记、生活记录和个人表达用户

## 产品原则

### 写作先于排版

打开页面后应当立即可以输入。默认正文为空，不用先选择模板，也不使用示例文字替用户发言。

### 自动排版只是起点

一次生成解决基础比例和断行问题；用户仍可调整字体、间距、结构与颜色。再次生成时尽量保留已经做出的选择。

### 模板必须改变阅读结构

模板的差异应来自版头、标题、章节、正文和署名的关系，而不是缩窄正文或只替换背景色。

### 自由不等于参数堆积

基础操作保持直接；进阶设置按需展开。滑杆、精确数值和画布内编辑可以并存，但不能重复制造负担。

### 隐私默认成立

正文、字体与图片导出优先在本地完成。任何联网行为都应被清楚说明，反馈表单不得附带文章正文。

## 品牌与语言

- 主品牌为 `XVI / 十六开`，英文环境可使用 `XVI`；`16k` 主要用于域名和账号。
- 不设置固定宣传口号，也不使用空泛短句占据界面。
- 题头默认留空，用户可填写章节、日期或栏目。
- `XVI / 016` 是版次标识，不替代文章标题。
- 功能文案应说明动作本身，避免拟人化解释和无意义的“文学感”。

## 视觉原则

- 呼吸感、自由和灵动来自比例、字形、留白与节奏，不来自装饰性图形。
- 主界面安静、柔和，但不能陷入单一低饱和色。
- 配色必须同时检查标题、正文、强调色和长时间阅读体验。
- 字体选择优先完整字集、标点质量、屏幕阅读和可验证授权。
- 避免工业控制台感、僵硬方格、圆角卡片堆叠和“仿旧纸张即文学”的陈词滥调。

## V1 必须完成

1. 自动排版在短文、长文、空标题和复杂标点下稳定。
2. 桌面端输入、样式、预览和导出流程完整。
3. 手机端至少可以可靠完成输入、生成、预览和保存。
4. PNG / JPG 导出与预览一致，富文本、字体和颜色不会丢失。
5. 标点避头尾、智能分段、简繁转换和本地保存有明确边界。
6. 内置字体完成来源与授权复核。
7. 隐私说明、反馈渠道、版本记录和部署回退流程齐全。

## 优先级

### P0：发布稳定性

- 移动端关键流程
- 导出一致性与跨浏览器测试
- 草稿恢复与错误提示
- 字体加载失败时的可靠回退

### P1：发布效率

- 长文自动分页
- 小红书 `3:4` 多图批量导出
- 平台尺寸预设
- 自定义模板保存与复用

### P2：表现力

- 更成熟的刊页结构
- 图片、题记和章节分隔
- 撤销、重做与更完整的快捷键
- 经过筛选的配色与字体扩展

## 暂不进入 V1

- 登录注册与云端草稿
- 创作社区或内容平台
- 用 AI 替用户改写正文
- 付费体系
- PDF、Markdown 和复杂出版格式导入

## 已确认的产品决定

- 不区分“单篇”和“连载”模式；章节信息作为可选排版字段存在。
- 默认正文字号为 `32 px`，默认首段强调为“变色”。
- 默认标题、署名和正文为空。
- 默认预览比例为 `55%`，手机端按可用宽度适配。
- 简繁转换只作用于用户选中的文字。
- 台湾繁体使用直角引号转换；香港繁体保留常用弯引号逻辑。
- “来信”由 Netlify Forms 代收，同时提供直接邮件渠道。

## 未来探索

- 通过自然语言描述生成版式建议，但不接触或保存正文
- AI 配色与模板推荐
- 像素、印刷、包浆等独立视觉模块
- 基础长图转换永久免费，高级设计能力另行评估
