# 前端结构

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
