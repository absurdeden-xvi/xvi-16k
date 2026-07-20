# Contributing / 参与开发

XVI / 十六开 is a static HTML, CSS, and JavaScript project with no build step.

## Local preview

Open `index.html` or `xvi-next.html` directly. Use the deployed Cloudflare site when testing the cross-origin Netlify Forms receiver; local `file://` behavior is not a release signal.

## Change principles

- Preserve the existing HTML, CSS, and vanilla JavaScript architecture unless a confirmed problem justifies a framework or dependency.
- Do not interrupt longform writing with continuous image reflow; generation remains a deliberate user action.
- Do not manufacture template differences by narrowing the body, stacking decorative cards, or generating random palettes.
- Do not add vague promotional slogans or explanatory interface copy.
- Never upload, record, or analyze article content.
- Before adding an online font, verify the original project, version, character coverage, and web-embedding license.

## Code map

- Shared canvas and controls: `styles.css`
- Current workspace visual system: `xvi-next.css`
- Editing, composition, and export logic: `app-next.js`
- Current workspace structure: `xvi-next.html`

Large logic sections should keep concise comments that explain boundaries, data flow, or compatibility constraints rather than restating the code.

## Contribution license

By submitting code, documentation, or other original work, you confirm that you have the right to contribute it and agree that it will be provided as part of the project under [PolyForm Noncommercial 1.0.0](../LICENSE).

Do not submit material with unclear provenance, redistribution restrictions, or licenses incompatible with the project. Preserve original notices for third-party software and fonts in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) or a dedicated license file.

## Pre-commit checks

- JavaScript parses successfully.
- Every HTML `id` is unique and every local resource reference exists.
- Default title, author, and body remain empty.
- Rich text matches across input, preview, and export.
- Regional Chinese conversion changes only the selected range.
- Punctuation does not remain at inappropriate line starts or ends.
- Mobile has no page-level horizontal overflow and button labels are not clipped.
- `CHANGELOG.md` and asset versions are current.

## Feedback

Use the product's feedback form or email [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com).

---

# 中文参与开发

XVI / 十六开目前是无构建步骤的静态网页项目。

## 本地查看

直接打开 `index.html` 或 `xvi-next.html` 即可。测试跨站投递到 Netlify Forms 时，请使用 Cloudflare 正式页面；本地 `file://` 的表现不作为发布依据。

## 修改原则

- 优先保持现有 HTML、CSS 和原生 JavaScript 结构。
- 不引入框架，除非它解决已经确认的维护或性能问题。
- 不用持续实时排版打断长文输入；生成操作仍由用户主动触发。
- 不以缩窄正文、增加装饰卡片或随机配色制造模板差异。
- 不添加空泛宣传语和解释性界面文案。
- 不上传、记录或分析用户正文。
- 添加在线字体前必须核对原始项目、版本、字符集和网页嵌入授权。

## 代码位置

- 基础画布与共享控件：`styles.css`
- 当前工作台视觉：`xvi-next.css`
- 编辑、排版与导出逻辑：`app-next.js`
- 当前工作台结构：`xvi-next.html`

大型逻辑按文件中的分区注释维护。注释应说明边界、数据流或兼容原因，不重复描述代码字面行为。

## 贡献授权

提交代码、文档或其他原创内容，即表示你有权提交这些内容，并同意其作为项目的一部分按照 [PolyForm Noncommercial 1.0.0](../LICENSE) 提供。请勿提交授权不明、禁止再分发或与项目许可证冲突的素材。

第三方组件和字体必须保留原始授权与来源说明，并记录在 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) 或对应的独立许可文件中。

## 提交前检查

- JavaScript 可以完成语法解析。
- HTML 中所有 `id` 唯一，引用的本地资源存在。
- 默认标题、署名和正文为空。
- 富文本格式在预览和导出中一致。
- 简繁转换只修改选中范围。
- 标点不会悬挂在行首或错误滞留在行尾。
- 移动端没有横向页面溢出，按钮文字不会被截断。
- `CHANGELOG.md` 与资源版本已经更新。

## 反馈

产品建议和问题可以通过网页“来信”提交，也可以发送至 [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)。
