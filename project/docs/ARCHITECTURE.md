# Frontend Architecture / 前端结构

## Data flow

1. The user edits rich text inside `#bodyInput`.
2. Selecting Generate Composition normalizes the body into paragraphs and inline style runs.
3. `generatedDocument` stores a snapshot of title, author, and paragraphs at generation time.
4. `render()` maps the snapshot and current style settings into the DOM preview.
5. Direct preview editing synchronizes changes back to `generatedDocument` and the input area.
6. `exportImage()` uses the same state to compose the page again on Canvas and download PNG or JPG.

The input phase does not continuously rebuild the long image. Body changes mark the preview as needing regeneration; bounded rich-text and direct-preview changes synchronize within their explicit editing flows.

## State

- `settings`: every composition field controlled by the interface
- `generatedDocument`: the most recently generated document snapshot
- `alignment` and `layoutTemplate`: interface state not represented by a single input element
- `activeSpecialPreset`: the currently selected named palette
- `activePreviewTarget`: the current target of the direct preview editor

`getState()` serializes drafts into `localStorage`. Custom font files are never serialized.

## Rich text

The input editor uses `contenteditable`. `extractRichParagraphsFrom()` converts its DOM into simplified inline runs:

```text
{ text, bold, italic, underline, strike }
```

The exporter does not screenshot the DOM. It redraws every run on Canvas, so any new inline style must be implemented in both DOM rendering and Canvas drawing.

## Line breaking

Canvas export uses `wrapCharacters()` and `wrapRichParagraph()` to measure text character by character. `FORBIDDEN_LINE_START` and `FORBIDDEN_LINE_END` keep common Chinese punctuation away from inappropriate line starts or ends.

## Regional Chinese conversion

OpenCC loads from a local vendor file. Conversion reads only the current selection. Hong Kong and Taiwan use separate regional conversion chains, and Taiwan mode additionally converts common quotation marks to corner quotes.

## Feedback boundary

Netlify scans the feedback form during deployment. The frontend submits only the `xvi-feedback` fields and never reads or attaches the title, author, article body, draft, or generated image.

---

# 中文架构说明

## 数据流

1. 用户在 `#bodyInput` 中编辑富文本。
2. 点击“生成排版”后，正文被规范化为段落和行内样式运行段。
3. `generatedDocument` 保存生成时的标题、署名和段落快照。
4. `render()` 将快照和当前样式设置映射到 DOM 预览。
5. 画布内编辑会同步回 `generatedDocument` 与输入区。
6. `exportImage()` 使用相同设置重新在 Canvas 上排版并下载 PNG 或 JPG。

输入阶段不会持续重建长图。正文变更后，预览会标记为需要重新生成；局部富文本和画布编辑则在明确边界内同步。

## 状态

- `settings`：所有可由控件修改的排版字段
- `generatedDocument`：最近一次生成结果
- `alignment`、`layoutTemplate`：不直接对应单一输入元素的界面状态
- `activeSpecialPreset`：当前具名特别配色
- `activePreviewTarget`：画布内编辑器当前目标

草稿由 `getState()` 序列化到 `localStorage`。自定义字体文件不会序列化。

## 富文本

输入区使用 `contenteditable`。`extractRichParagraphsFrom()` 将 DOM 转换为简化的运行段：

```text
{ text, bold, italic, underline, strike }
```

导出器不直接截图 DOM，而是根据运行段重新绘制，因此增加新的行内样式时必须同时更新 DOM 渲染和 Canvas 绘制。

## 断行

Canvas 导出通过 `wrapCharacters()` 和 `wrapRichParagraph()` 逐字符计算宽度，并使用 `FORBIDDEN_LINE_START`、`FORBIDDEN_LINE_END` 避免常见中文标点出现在不合适的行首或行尾。

## 简繁转换

OpenCC 以本地 vendor 文件载入。转换只读取当前选择范围；香港与台湾繁体使用不同区域转换链，台湾模式额外处理直角引号。

## 反馈

反馈表单由 Netlify 在部署时扫描。前端只提交 `xvi-feedback` 表单字段，不读取标题、署名、正文、草稿或生成图片。
