(function registerXviTranslations(global) {
  "use strict";

  const PALETTE_NAMES_EN = {
    light: { neutral: "Morning Mist", rose: "Dusk", green: "Moss Court", purple: "Dream Lilac", amber: "Wheat Light", blue: "Indigo" },
    dark: { neutral: "Night Voyage", rose: "Wine Stain", green: "Deep Pine", purple: "Night Plum", amber: "Amber", blue: "Blue Night" }
  };

  const SPECIAL_PRESET_NAMES_EN = {
    blueprint: "Cyanotype", vermilion: "Glass Sea", newsprint: "Letterpress", acidNight: "Firefly Night",
    farTide: "Far Tide", roseLetter: "Ivy", oriole: "Scarlet Page", seaMark: "Tide Mark",
    blueCurtain: "Blue Chime", mulberry: "Sundial", pineSmoke: "Verdant Desk", latePeach: "Star Chart",
    gooseShadow: "Spring Thunder", nightSakura: "Night Sakura", camelliaPaper: "Camellia Paper", aster: "Night Tide"
  };

  const UI_TEXT_EN = {
    "十六开": "XVI Studio", "已保存": "Saved", "设置": "Settings", "语言": "Language", "中文": "Chinese",
    "来信": "Feedback", "快速导出": "Quick export", "写": "Write", "文字": "Text", "形": "Shape", "样式": "Style",
    "存": "Save", "导出": "Export", "标题": "Title", "署名": "Byline", "正文": "Body", "0 字": "0 characters",
    "简繁": "Script", "简中": "Simplified", "繁中（港）": "Traditional (HK)", "繁中（台）": "Traditional (TW)",
    "正文与生成图片只在本地浏览器处理，不会上传云端。": "Your text and generated images stay in this browser and are never uploaded.",
    "文本处理": "Text processing", "清理并智能分段": "Clean and detect paragraphs", "仅在粘贴后的换行混乱时开启": "Use when pasted line breaks are inconsistent",
    "生成排版": "Compose", "清空": "Clear", "配色灵感": "Color inspiration", "随机": "Random", "浅色": "Light", "深色": "Dark",
    "特别配色": "Curated palettes", "背景": "Background", "强调": "Accent", "刊页模板": "Editorial templates",
    "标准刊页": "Folio", "书页": "Book page", "信笺": "Letter", "分节长页": "Section page",
    "正文字体": "Body typeface", "标题字体": "Title typeface", "宋体": "Songti", "苹方": "PingFang", "霞鹜新致宋": "LXGW Neo ZhiSong",
    "文津宋体": "WenJin Mincho", "汇文明朝体": "Huiwen Mincho", "朱雀仿宋": "Zhuque Fangsong", "司源赢宋": "CorpSrc WinSong",
    "霞鹜文楷": "LXGW WenKai", "悠哉字体": "Yozai", "等宽": "Monospace", "＋ 导入本地字体": "+ Import local font",
    "展示衬线": "Display Serif", "编辑衬线": "Editorial Serif", "人文无衬线": "Humanist Sans", "新无衬线": "Neo Grotesk", "拉丁等宽": "Latin Mono",
    "正文字号": "Body size", "标题字号": "Title size", "行距": "Line height", "段落": "Paragraphs", "首行缩进": "First-line indent",
    "每段开头退两个字": "Indent each paragraph by two characters", "首段强调": "Opening paragraph", "无": "None", "引线": "Rule", "变色": "Accent color",
    "首段字号": "Opening scale", "段间": "Paragraph gap", "高级排版": "Advanced layout", "展开": "Expand", "标题字重": "Title weight",
    "版式结构": "Composition", "标准": "Standard", "紧凑": "Compact", "舒展": "Open", "右上角文字": "Top-right text",
    "标题上方文字": "Text above title", "章节标识": "Chapter label", "章节字号": "Chapter size", "节号（仅分节长页）": "Section number (section template)",
    "节号字号": "Section number size", "字距": "Letter spacing", "段距": "Paragraph spacing", "画布宽度": "Canvas width", "页边距": "Page margins",
    "对齐": "Alignment", "左对齐": "Left", "两端": "Justify", "居中": "Center", "版头信息": "Masthead", "显示 XVI、版次与信号条": "Show XVI, edition, and signal mark",
    "底部署名": "Footer byline", "在正文后显示作者": "Show the author after the article", "导出尺寸": "Export size", "格式": "Format",
    "清晰度": "Resolution", "保存名称": "File name", "放心使用": "Private by default",
    "正文、字体与生成图片只在本地浏览器处理，不会上传云端。只有主动提交“来信”时，反馈内容才会发送给我们。": "Text, fonts, and generated images stay in your browser. Only feedback you explicitly submit is sent to us.",
    "保存图片": "Save image", "长图预览": "Longform preview", "尚未生成": "Not composed yet", "不要填写": "Leave blank",
    "反馈": "Feedback", "发送": "Send", "由 Netlify 代收。": "Collected by Netlify.", "或直接通过邮件联系：": "Or email us directly:\u00a0",
    "线": "Rule", "色": "Color", "节号": "Section number", "首段": "Opening paragraph", "倍": "×"
  };

  const UI_ATTRIBUTE_EN = {
    "标题": "Title", "作者": "Author", "文字格式": "Text formatting", "粗体": "Bold", "斜体": "Italic", "下划线": "Underline",
    "删除线": "Strikethrough", "清除格式": "Clear formatting", "可留空，或填写章节 / 日期 / 栏目": "Optional chapter, date, or section",
    "例如 01 / 第一章；留空不显示": "For example 01 or Chapter One; leave blank to hide", "留空则使用标题": "Leave blank to use the title",
    "长图编辑器": "Longform editor", "创作流程": "Creation workflow", "明暗主题": "Light or dark theme", "色系": "Color family",
    "长图预览": "Longform preview", "缩小预览": "Zoom out", "放大预览": "Zoom in", "颜色": "Color", "关闭": "Close",
    "减小字号": "Decrease size", "增大字号": "Increase size", "加粗": "Bold", "可直接编辑的正文": "Editable body text",
    "设置": "Settings", "界面语言": "Interface language", "想对开发者说的话……": "Share feedback with the developer...",
    "从全部配色中随机选择": "Choose randomly from all palettes", "中性色系": "Neutral family", "红色系": "Red family", "绿色系": "Green family",
    "紫色系": "Purple family", "黄色系": "Yellow family", "蓝色系": "Blue family"
  };

  const RUNTIME_TEXT_EN = {
    "字形转换暂时无法使用": "Script conversion is temporarily unavailable",
    "请先选中要转换的文字": "Select the text you want to convert",
    "请先完成正文输入": "Add body text before composing",
    "请先完成自动排版": "Compose the document before exporting",
    "正在保存...": "Saving...", "已自动保存": "Autosaved", "先写一点内容": "Add a message first",
    "发送中": "Sending", "来信已收到": "Feedback received", "暂时没发送出去，内容还在": "Could not send yet; your message is still here",
    "字体文件不能超过 20 MB": "Font files must be under 20 MB", "字体已载入并应用到正文": "Font loaded and applied to the body",
    "无法读取这个字体文件": "This font file could not be read", "导出失败，请稍后重试": "Export failed. Please try again"
  };

  global.XVII18n = Object.freeze({ PALETTE_NAMES_EN, SPECIAL_PRESET_NAMES_EN, UI_TEXT_EN, UI_ATTRIBUTE_EN, RUNTIME_TEXT_EN });
})(window);
