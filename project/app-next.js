// Visual registries are shared by controls, DOM preview, and Canvas export.
const PRESETS = {
  mist: { background: "#eef2f3", text: "#26333a", accent: "#9ebbc4" },
  blush: { background: "#f5eceb", text: "#3d2d31", accent: "#d99a91" },
  moss: { background: "#edf0ea", text: "#2e3832", accent: "#93aa95" },
  lilac: { background: "#f0edf4", text: "#383140", accent: "#aa9bbb" },
  butter: { background: "#f6f1e4", text: "#3a342a", accent: "#d7bd76" },
  night: { background: "#252a2f", text: "#edf0ed", accent: "#8eb8ad" },
  mica: { background: "#f2eee7", text: "#333944", accent: "#8ea3b4" },
  almond: { background: "#f3eadf", text: "#403731", accent: "#c08f73" },
  salt: { background: "#e7f0ed", text: "#29433d", accent: "#74a69a" },
  berry: { background: "#f1e7ec", text: "#452f3c", accent: "#b57c98" },
  indigo: { background: "#e8ecf2", text: "#27344d", accent: "#7d93b5" },
  cinnabar: { background: "#f1e6df", text: "#492e2a", accent: "#c45f4e" },
  midnight: { background: "#192b4a", text: "#e7ecf5", accent: "#91a9d0" },
  inkstone: { background: "#20201e", text: "#e8e3d8", accent: "#a18f78" },
  deepPine: { background: "#18352d", text: "#e4eee7", accent: "#8fbd9f" },
  wine: { background: "#4a2029", text: "#f5e5e8", accent: "#d58b9c" },
  nightPlum: { background: "#322544", text: "#eee6f5", accent: "#b39bc9" },
  deepSea: { background: "#142529", text: "#d9e5e4", accent: "#6f9da0" },
  umber: { background: "#3a2b1b", text: "#f3e7d2", accent: "#d0a969" },
  blueprint: { background: "#f8f8f4", text: "#17469e", accent: "#b52b35" },
  vermilion: { background: "#d5eef0", text: "#153c4a", accent: "#b04727" },
  newsprint: { background: "#f3efe4", text: "#171717", accent: "#b52b35" },
  acidNight: { background: "#171917", text: "#edf1e8", accent: "#bdd34c" },
  farTide: { background: "#f8f6ef", text: "#1948a0", accent: "#ed5b4d" },
  roseLetter: { background: "#e7ebdd", text: "#234638", accent: "#39702f" },
  oriole: { background: "#f2e9dd", text: "#4a1820", accent: "#b43b3f" },
  seaMark: { background: "#cbe5dc", text: "#17424b", accent: "#df594a" },
  blueCurtain: { background: "#1238a3", text: "#fffdf4", accent: "#d8e0ff" },
  mulberry: { background: "#f3e69a", text: "#164a4b", accent: "#a83e36" },
  pineSmoke: { background: "#f2eee3", text: "#172a22", accent: "#2f6b50" },
  latePeach: { background: "#d8d1f0", text: "#2e2862", accent: "#9d315d" },
  gooseShadow: { background: "#e4edb8", text: "#3b2146", accent: "#b84322" },
  nightSakura: { background: "#1d1d22", text: "#f2aec5", accent: "#9bd3c2" },
  camelliaPaper: { background: "#f3efe1", text: "#1e5a4d", accent: "#cc6355" },
  aster: { background: "#151c28", text: "#e9e5dc", accent: "#7896bd" }
};

const PALETTE_FAMILIES = {
  neutral: { light: "mist", dark: "night" },
  rose: { light: "blush", dark: "wine" },
  green: { light: "moss", dark: "deepPine" },
  purple: { light: "lilac", dark: "nightPlum" },
  amber: { light: "butter", dark: "umber" },
  blue: { light: "indigo", dark: "midnight" }
};

const PALETTE_NAMES = {
  light: { neutral: "晨雾", rose: "薄暮", green: "苔庭", purple: "梦紫", amber: "麦光", blue: "靛青" },
  dark: { neutral: "夜航", rose: "酒渍", green: "深松", purple: "夜梅", amber: "琥珀", blue: "蓝夜" }
};

const SPECIAL_PRESETS = ["blueprint", "vermilion", "newsprint", "acidNight", "farTide", "roseLetter", "oriole", "seaMark", "blueCurtain", "mulberry", "pineSmoke", "latePeach", "gooseShadow", "nightSakura", "camelliaPaper", "aster"];
const SPECIAL_PRESET_NAMES = { blueprint: "蓝晒", vermilion: "玻璃海", newsprint: "铅字", acidNight: "夜萤", farTide: "远潮水", roseLetter: "常春藤", oriole: "绯页", seaMark: "潮痕", blueCurtain: "蓝钟", mulberry: "日晷", pineSmoke: "青案", latePeach: "星盘", gooseShadow: "春雷", nightSakura: "夜樱", camelliaPaper: "山茶笺", aster: "夜汐" };

// The public site is hosted on Cloudflare Pages; Netlify remains the form receiver.
const FEEDBACK_ENDPOINT = "https://xvi-16k.netlify.app/";

const LAYOUT_RECIPES = {
  folio: { titleSize: 56, titleWeight: 700, lineHeight: 1.88, paragraphSpacing: 1, pagePadding: 88, compositionStyle: "editorial", indent: true },
  book: { titleSize: 58, titleWeight: 600, lineHeight: 1.92, paragraphSpacing: 1, pagePadding: 88, compositionStyle: "editorial", indent: true },
  letter: { titleSize: 54, titleWeight: 600, lineHeight: 2, paragraphSpacing: 1.25, pagePadding: 86, compositionStyle: "open", indent: false },
  section: { titleSize: 68, titleWeight: 600, lineHeight: 1.86, paragraphSpacing: 1.25, pagePadding: 84, compositionStyle: "open", indent: false }
};

const FORBIDDEN_LINE_START = new Set([..."，。！？；：、）》】」』〕〉”’…—～·,.!?;:%)]}›»"]);
const FORBIDDEN_LINE_END = new Set([..."（《【「『〔〈“‘([{‹«"]);

const FONT_STACKS = {
  latinDisplay: 'Didot, "Bodoni 72", "Bodoni MT", "Times New Roman", serif',
  latinSerif: 'Baskerville, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
  latinHumanist: '"Avenir Next", Avenir, "Segoe UI", Arial, sans-serif',
  latinGrotesk: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  latinMono: '"SFMono-Regular", Menlo, Monaco, Consolas, monospace',
  serif: '"Songti SC", STSong, SimSun, serif',
  pingfang: '"PingFang SC", "PingFang TC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  "sans-serif": '"PingFang SC", "Microsoft YaHei", sans-serif',
  lxgw: '"LXGW WenKai", "Kaiti SC", KaiTi, serif',
  neoZhiSong: '"LXGW Neo ZhiSong", "Songti SC", SimSun, serif',
  huiwen: '"Huiwen-mincho", "Songti SC", SimSun, serif',
  zhuque: '"Zhuque Fangsong (technical preview)", "Zhuque Fangsong", STFangsong, FangSong, serif',
  yozai: '"Yozai", "Kaiti SC", KaiTi, serif',
  wenjin: '"WenJin Mincho Plane 0", "Songti SC", STSong, serif',
  winsong: '"CorpSrcWinSong", "Songti SC", STSong, serif',
  kai: '"Kaiti SC", STKaiti, KaiTi, serif',
  fangSong: 'STFangsong, FangSong, "FangSong SC", serif',
  rounded: '"Hiragino Maru Gothic ProN", "Yuanti SC", "Arial Rounded MT Bold", sans-serif',
  lanting: '"Lantinghei SC", "FZLanTingHeiS", "PingFang SC", sans-serif',
  hannotate: '"Hannotate SC", "Hannotate TC", "Kaiti SC", serif',
  hanzipen: '"HanziPen SC", "HanziPen TC", "Kaiti SC", serif',
  xingkai: '"STXingkai", "Xingkai SC", "Kaiti SC", serif',
  libian: '"STLibian", "Libian SC", "Songti SC", serif',
  weibei: '"Weibei SC", "STXinwei", "Songti SC", serif',
  mono: '"SFMono-Regular", Menlo, Monaco, "Noto Sans Mono CJK SC", monospace'
};

// DOM bindings and mutable editor state.
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const elements = {
  title: $("#titleInput"),
  author: $("#authorInput"),
  body: $("#bodyInput"),
  previewTitle: $("#previewTitle"),
  previewAuthor: $("#previewAuthor"),
  previewBody: $("#previewBody"),
  previewFooter: $("#previewFooter"),
  poster: $("#poster"),
  charCount: $("#charCount"),
  saveState: $("#saveState"),
  canvasInfo: $("#canvasInfo"),
  toast: $("#toast"),
  previewEmpty: $("#previewEmpty"),
  generateButton: $("#generateButton"),
  exportButton: $("#exportButton"),
  feedbackModal: $("#feedbackModal"),
  feedbackForm: $("#feedbackForm")
};

const settings = {
  fontFamily: $("#fontFamily"),
  titleFontFamily: $("#titleFontFamily"),
  titleWeight: $("#titleWeight"),
  compositionStyle: $("#compositionStyle"),
  editionText: $("#editionText"),
  kickerText: $("#kickerText"),
  chapterText: $("#chapterText"),
  sectionNumber: $("#sectionNumber"),
  chapterSize: $("#chapterSize"),
  sectionNumberSize: $("#sectionNumberSize"),
  leadStyle: $("#leadStyle"),
  leadScale: $("#leadScale"),
  fontSize: $("#fontSize"),
  titleSize: $("#titleSize"),
  lineHeight: $("#lineHeight"),
  letterSpacing: $("#letterSpacing"),
  paragraphSpacing: $("#paragraphSpacing"),
  contentWidth: $("#contentWidth"),
  pagePadding: $("#pagePadding"),
  backgroundColor: $("#backgroundColor"),
  textColor: $("#textColor"),
  titleColor: $("#titleColor"),
  accentColor: $("#accentColor"),
  indent: $("#indentToggle"),
  signature: $("#signatureToggle"),
  header: $("#headerToggle"),
  smartParagraph: $("#smartParagraphToggle")
};

let alignment = "left";
let layoutTemplate = "folio";
let paletteMode = "light";
let paletteFamily = "neutral";
let activeSpecialPreset = null;
let zoom = 0.55;
let mobileZoom = null;
let saveTimer;
let toastTimer;
let generatedDocument = null;
let contentIsDirty = false;
let exportFormat = "png";
let activePreviewTarget = null;
let uiLanguage = "zh";

const PREVIEW_EDITORS = {
  title: { label: "标题", size: "titleSize", color: "titleColor", step: 2, suffix: " px" },
  chapter: { label: "章节标识", size: "chapterSize", color: "accentColor", step: 1, suffix: " px" },
  lead: { label: "首段", size: "leadScale", color: "accentColor", step: 0.05, suffix: " 倍", leadModes: true },
  body: { label: "正文", size: "fontSize", color: "textColor", step: 1, suffix: " px", formatModes: true },
  section: { label: "节号", size: "sectionNumberSize", color: "accentColor", step: 2, suffix: " px" }
};

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
  "反馈": "Feedback", "发送": "Send", "由 Netlify 代收。": "Collected by Netlify.", "或直接通过邮件联系：": "Or email us directly:",
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

const staticTextNodes = [];
const staticAttributes = [];

function collectUiTranslations() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    const value = node.nodeValue;
    if (!parent || !value.trim() || parent.closest("#poster, #bodyInput, #toast, script, style")) continue;
    staticTextNodes.push({ node, source: value });
  }
  document.querySelectorAll("[placeholder], [title], [aria-label]").forEach((element) => {
    ["placeholder", "title", "aria-label"].forEach((name) => {
      const value = element.getAttribute(name);
      if (value) staticAttributes.push({ element, name, source: value });
    });
  });
}

function translateUiText(source) {
  return uiLanguage === "en" ? (UI_TEXT_EN[source] || source) : source;
}

function translateRuntimeText(message) {
  if (uiLanguage !== "en") return message;
  if (RUNTIME_TEXT_EN[message]) return RUNTIME_TEXT_EN[message];
  let match = message.match(/^已按 (\d+) 字自动完成排版$/);
  if (match) return `Composed ${match[1]} characters automatically`;
  match = message.match(/^已应用(.+)版式$/);
  if (match) return `${match[1]} layout applied`;
  match = message.match(/^(普通|高清|超清)图片已保存$/);
  if (match) return `${exportScaleLabel()} image saved`;
  return message;
}

function localizedPaletteName() {
  if (activeSpecialPreset) return uiLanguage === "en" ? SPECIAL_PRESET_NAMES_EN[activeSpecialPreset] : SPECIAL_PRESET_NAMES[activeSpecialPreset];
  return uiLanguage === "en" ? PALETTE_NAMES_EN[paletteMode][paletteFamily] : PALETTE_NAMES[paletteMode][paletteFamily];
}

function applyUiLanguage(nextLanguage, persist = true) {
  uiLanguage = nextLanguage === "en" ? "en" : "zh";
  document.documentElement.lang = uiLanguage === "en" ? "en" : "zh-CN";
  document.title = uiLanguage === "en" ? "XVI / Longform Typesetting Studio" : "XVI / 十六开";
  document.querySelector('meta[name="description"]')?.setAttribute("content", uiLanguage === "en"
    ? "XVI is a privacy-first longform typesetting studio for Chinese writing."
    : "XVI / 十六开，为中文创作者设计的文本长图排版器。");
  staticTextNodes.forEach(({ node, source }) => {
    const core = source.trim();
    const translated = uiLanguage === "en" ? (UI_TEXT_EN[core] || core) : core;
    node.nodeValue = source.replace(core, translated);
  });
  staticAttributes.forEach(({ element, name, source }) => {
    element.setAttribute(name, uiLanguage === "en" ? (UI_ATTRIBUTE_EN[source] || source) : source);
  });
  const blankDocument = !generatedDocument && !elements.title.value.trim() && !elements.author.value.trim() && !bodyText();
  if (blankDocument && uiLanguage === "en" && settings.fontFamily.value === "serif" && settings.titleFontFamily.value === "serif") {
    settings.fontFamily.value = "latinSerif";
    settings.titleFontFamily.value = "latinDisplay";
  } else if (blankDocument && uiLanguage === "zh" && settings.fontFamily.value === "latinSerif" && settings.titleFontFamily.value === "latinDisplay") {
    settings.fontFamily.value = "serif";
    settings.titleFontFamily.value = "serif";
  }
  const footerEdition = $("#previewFooter .footer-edition");
  if (footerEdition) footerEdition.textContent = uiLanguage === "en" ? "XVI / LONGFORM" : "XVI / 十六开";
  const savingNow = /正在保存|Saving/.test(elements.saveState.textContent);
  elements.saveState.textContent = uiLanguage === "en"
    ? (savingNow ? "Saving..." : "Autosaved")
    : (savingNow ? "正在保存..." : "已自动保存");
  $$('[data-language]').forEach((button) => button.classList.toggle("active", button.dataset.language === uiLanguage));
  if (persist) localStorage.setItem("xvi-ui-language", uiLanguage);
  syncPaletteControls();
  updateControlLabels();
  syncGenerateButtonLabel();
}

// Rich-text normalization and regional script conversion.
function bodyText() {
  return elements.body.innerText.replace(/\u00a0/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function visibleZoom() {
  return window.innerWidth <= 760 && mobileZoom !== null ? mobileZoom : zoom;
}

function adjustVisibleZoom(delta) {
  const next = Math.max(0.35, Math.min(1, visibleZoom() + delta));
  if (window.innerWidth <= 760) mobileZoom = next;
  else zoom = next;
  render();
}

function setBodyText(text) {
  elements.body.replaceChildren(...text.split(/\n\s*\n/).filter(Boolean).map((content) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    return paragraph;
  }));
}

function convertQuoteMarks(text, nextMode) {
  if (nextMode === "traditional-tw") {
    return text
      .replace(/“/g, "「")
      .replace(/”/g, "」")
      .replace(/‘/g, "『")
      .replace(/’/g, "』");
  }
  return text
    .replace(/「/g, "“")
    .replace(/」/g, "”")
    .replace(/『/g, "‘")
    .replace(/』/g, "’");
}

function scriptLocale(mode) {
  if (mode === "traditional-hk") return "hk";
  if (mode === "traditional-tw") return "tw";
  return "cn";
}

function textConvertersForSelection(nextMode) {
  if (nextMode === "simplified") return [OpenCC.Converter({ from: "tw", to: "cn" })];
  const sourceLocale = nextMode === "traditional-hk" ? "tw" : "hk";
  return [
    OpenCC.Converter({ from: sourceLocale, to: "cn" }),
    OpenCC.Converter({ from: "cn", to: scriptLocale(nextMode) })
  ];
}

function closeScriptPicker() {
  $("#scriptPickerMenu").hidden = true;
  $("#scriptPickerButton").setAttribute("aria-expanded", "false");
}

function convertSelectedScript(nextMode) {
  if (!window.OpenCC?.Converter) {
    showToast("字形转换暂时无法使用");
    return false;
  }
  const selection = document.getSelection();
  if (!selection?.rangeCount || selection.isCollapsed
    || !elements.body.contains(selection.anchorNode)
    || !elements.body.contains(selection.focusNode)) {
    closeScriptPicker();
    showToast("请先选中要转换的文字");
    return false;
  }
  const range = selection.getRangeAt(0);
  const converters = textConvertersForSelection(nextMode);
  const transform = (text) => convertQuoteMarks(converters.reduce((value, converter) => converter(value), text), nextMode);
  const walker = document.createTreeWalker(elements.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    if (range.intersectsNode(walker.currentNode)) nodes.push(walker.currentNode);
  }
  nodes.forEach((node) => {
    const start = node === range.startContainer ? range.startOffset : 0;
    const end = node === range.endContainer ? range.endOffset : node.data.length;
    if (end <= start) return;
    node.replaceData(start, end - start, transform(node.data.slice(start, end)));
  });
  selection.removeAllRanges();
  selection.addRange(range);
  closeScriptPicker();
  updateControlLabels();
  syncFormattingToGeneratedDocument();
  scheduleSave();
  const modeLabels = uiLanguage === "en"
    ? { simplified: "Simplified Chinese", "traditional-hk": "Traditional Chinese (Hong Kong)", "traditional-tw": "Traditional Chinese (Taiwan)" }
    : { simplified: "简中", "traditional-hk": "繁中（港）", "traditional-tw": "繁中（台）" };
  showToast(uiLanguage === "en" ? `Selection converted to ${modeLabels[nextMode]}` : `所选文字已转换为${modeLabels[nextMode]}`);
  return true;
}

function extractRichParagraphsFrom(root = elements.body) {
  const blocks = [...root.childNodes];
  const paragraphs = [];
  const walk = (node, inherited, runs) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent) runs.push({ text: node.textContent, ...inherited });
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.tagName === "BR") {
      runs.push({ text: "\n", ...inherited });
      return;
    }
    const style = { ...inherited };
    if (["B", "STRONG"].includes(node.tagName)) style.bold = true;
    if (["I", "EM"].includes(node.tagName)) style.italic = true;
    if (node.tagName === "U") style.underline = true;
    if (["S", "STRIKE"].includes(node.tagName)) style.strike = true;
    if (node.classList?.contains("rich-bold")) style.bold = true;
    if (node.classList?.contains("rich-italic")) style.italic = true;
    if (node.classList?.contains("rich-underline")) style.underline = true;
    if (node.classList?.contains("rich-strike")) style.strike = true;
    const inlineStyle = node.style;
    if (inlineStyle) {
      const numericWeight = Number.parseInt(inlineStyle.fontWeight, 10);
      if (inlineStyle.fontWeight === "bold" || numericWeight >= 600) style.bold = true;
      if (inlineStyle.fontStyle === "italic") style.italic = true;
      const decoration = `${inlineStyle.textDecoration} ${inlineStyle.textDecorationLine}`;
      if (decoration.includes("underline")) style.underline = true;
      if (decoration.includes("line-through")) style.strike = true;
    }
    [...node.childNodes].forEach((child) => walk(child, style, runs));
  };
  blocks.forEach((block) => {
    const runs = [];
    walk(block, {}, runs);
    if (runs.some((run) => run.text.trim())) paragraphs.push(runs);
  });
  const fallbackText = root.innerText?.replace(/\u00a0/g, " ").trim() || "";
  if (!paragraphs.length && fallbackText) paragraphs.push([{ text: fallbackText }]);
  return paragraphs;
}

function extractRichParagraphs() {
  return extractRichParagraphsFrom(elements.body);
}

function applyFormattingToComposedText(composedText, sourceParagraphs) {
  const styledCharacters = sourceParagraphs
    .flatMap((runs) => runs)
    .flatMap((run) => [...run.text].filter((char) => !/\s/.test(char)).map((char) => ({
      char,
      bold: Boolean(run.bold),
      italic: Boolean(run.italic),
      underline: Boolean(run.underline),
      strike: Boolean(run.strike)
    })));
  let sourceIndex = 0;
  let lastStyle = {};
  return composedText.split(/\n\s*\n/).map((paragraphText) => {
    const runs = [];
    [...paragraphText].forEach((char) => {
      let style = lastStyle;
      if (!/\s/.test(char)) {
        const source = styledCharacters[sourceIndex++];
        style = source ? { bold: source.bold, italic: source.italic, underline: source.underline, strike: source.strike } : {};
        lastStyle = style;
      }
      const previous = runs[runs.length - 1];
      const sameStyle = previous
        && Boolean(previous.bold) === Boolean(style.bold)
        && Boolean(previous.italic) === Boolean(style.italic)
        && Boolean(previous.underline) === Boolean(style.underline)
        && Boolean(previous.strike) === Boolean(style.strike);
      if (sameStyle) previous.text += char;
      else runs.push({ text: char, ...style });
    });
    return runs;
  });
}

function textParagraphs() {
  if (!generatedDocument) return [];
  return generatedDocument.paragraphs;
}

// Preview rendering and inline inspector synchronization.
function updateControlLabels() {
  const characterCount = bodyText().replace(/\s/g, "").length;
  elements.charCount.textContent = uiLanguage === "en" ? `${characterCount} characters` : `${characterCount} 字`;
  $$(".number-field").forEach((input) => { input.value = settings[input.dataset.setting].value; });
  $("#backgroundColorValue").value = settings.backgroundColor.value.toUpperCase();
  $("#textColorValue").value = settings.textColor.value.toUpperCase();
  $("#titleColorValue").value = settings.titleColor.value.toUpperCase();
  $("#accentColorValue").value = settings.accentColor.value.toUpperCase();
  $("#zoomValue").value = `${Math.round(visibleZoom() * 100)}%`;
  elements.canvasInfo.textContent = `${settings.contentWidth.value} × ${uiLanguage === "en" ? "auto height" : "自动高度"}`;
  updateExportScaleLabels();
  $("#exportCanvasInfo").textContent = `${exportPixelWidth()} px · ${exportScaleLabel()}`;
  elements.exportButton.title = `${exportFormat.toUpperCase()} · ${exportPixelWidth()} px · ${uiLanguage === "en" ? "auto height" : "自动高度"}`;
  syncParagraphGapControls();
  syncLeadStyleControls();
  syncTemplateSettings();
  syncPreviewInspector();
}

function syncLeadStyleControls() {
  $$('[data-lead-style]').forEach((button) => button.classList.toggle("active", button.dataset.leadStyle === settings.leadStyle.value));
}

function syncTemplateSettings() {
  $$(".book-settings").forEach((group) => group.hidden = layoutTemplate !== "book");
  $$(".section-settings").forEach((group) => group.hidden = layoutTemplate !== "section");
}

function syncPreviewInspector() {
  const inspector = $("#previewInspector");
  const editor = PREVIEW_EDITORS[activePreviewTarget];
  elements.poster.querySelectorAll(".preview-editing").forEach((node) => node.classList.remove("preview-editing"));
  if (!editor || !generatedDocument) {
    inspector.hidden = true;
    $("#previewLeadModes").hidden = true;
    $("#previewFormatModes").hidden = true;
    return;
  }
  inspector.hidden = false;
  $("#previewInspectorLabel").textContent = translateUiText(editor.label);
  const suffix = uiLanguage === "en" && editor.suffix === " 倍" ? "×" : editor.suffix;
  $("#previewInspectorValue").value = `${Number(settings[editor.size].value).toFixed(editor.step < 1 ? 2 : 0).replace(/\.00$/, "")}${suffix}`;
  $("#previewInspectorColor").value = settings[editor.color].value;
  $("#previewLeadModes").hidden = !editor.leadModes;
  $("#previewFormatModes").hidden = !editor.formatModes;
  elements.poster.querySelector(`[data-preview-target="${activePreviewTarget}"]`)?.classList.add("preview-editing");
}

function closePreviewInspector(clearSelection = true) {
  activePreviewTarget = null;
  syncPreviewInspector();
  if (clearSelection) document.getSelection()?.removeAllRanges();
  elements.previewBody.blur();
}

function exportScaleLabel() {
  const labels = uiLanguage === "en"
    ? { 1: "Standard", 2: "High", 3: "Ultra" }
    : { 1: "普通", 2: "高清", 3: "超清" };
  return labels[$("#exportScale").value] || labels[2];
}

function exportPixelWidth(scale = Number($("#exportScale").value)) {
  return Number(settings.contentWidth.value) * scale;
}

function updateExportScaleLabels() {
  [...$("#exportScale").options].forEach((option) => {
    const labels = uiLanguage === "en"
      ? { 1: "Standard", 2: "High", 3: "Ultra" }
      : { 1: "普通", 2: "高清", 3: "超清" };
    const label = labels[option.value] || labels[2];
    option.textContent = `${label} ${exportPixelWidth(Number(option.value))} px`;
  });
}

function syncGenerateButtonLabel() {
  const label = elements.generateButton.querySelector("strong");
  if (!generatedDocument) label.textContent = uiLanguage === "en" ? "Compose" : "生成排版";
  else if (contentIsDirty) label.textContent = uiLanguage === "en" ? "Content changed — compose again" : "内容已更改，重新生成";
  else label.textContent = uiLanguage === "en" ? "Compose again" : "重新排版并生成";
}

function syncParagraphGapControls() {
  const currentGap = Number(settings.paragraphSpacing.value);
  let matched = false;
  $$("[data-paragraph-gap]").forEach((button) => {
    const isActive = Math.abs(currentGap - Number(button.dataset.paragraphGap)) < 0.02;
    if (isActive) matched = true;
    button.classList.toggle("active", isActive);
  });
  if (!matched) $$("[data-paragraph-gap]").forEach((button) => button.classList.remove("active"));
}

function render() {
  updateControlLabels();
  if (!generatedDocument) {
    scheduleSave();
    return;
  }

  elements.previewTitle.textContent = generatedDocument.title;
  elements.previewTitle.dataset.previewTarget = "title";
  elements.previewAuthor.textContent = generatedDocument.author;
  elements.previewBody.replaceChildren(...textParagraphs().map((runs) => {
    const paragraph = document.createElement("p");
    runs.forEach((run) => {
      const span = document.createElement("span");
      span.textContent = run.text;
      span.classList.toggle("rich-bold", Boolean(run.bold));
      span.classList.toggle("rich-italic", Boolean(run.italic));
      span.classList.toggle("rich-underline", Boolean(run.underline));
      span.classList.toggle("rich-strike", Boolean(run.strike));
      paragraph.append(span);
    });
    return paragraph;
  }));
  elements.previewBody.firstElementChild?.setAttribute("data-preview-target", "lead");
  elements.previewBody.dataset.previewTarget = "body";

  elements.previewBody.className = `poster-body align-${alignment}${settings.indent.checked ? " indent" : ""}`;
  elements.previewFooter.hidden = !settings.signature.checked;
  elements.poster.style.fontFamily = FONT_STACKS[settings.fontFamily.value];
  elements.poster.style.setProperty("--poster-title-font", FONT_STACKS[settings.titleFontFamily.value]);
  elements.poster.style.setProperty("--poster-font-size", `${settings.fontSize.value}px`);
  elements.poster.style.setProperty("--poster-title-size", `${settings.titleSize.value}px`);
  elements.poster.style.setProperty("--poster-title-weight", settings.titleWeight.value);
  elements.poster.style.setProperty("--poster-line-height", settings.lineHeight.value);
  elements.poster.style.setProperty("--poster-letter-spacing", `${settings.letterSpacing.value}px`);
  elements.poster.style.setProperty("--poster-paragraph-spacing", `${settings.paragraphSpacing.value}em`);
  elements.poster.style.setProperty("--poster-width", `${settings.contentWidth.value}px`);
  elements.poster.style.setProperty("--poster-padding", `${settings.pagePadding.value}px`);
  elements.poster.style.setProperty("--poster-bg", settings.backgroundColor.value);
  elements.poster.style.setProperty("--poster-text", settings.textColor.value);
  elements.poster.style.setProperty("--poster-title-color", settings.titleColor.value);
  elements.poster.style.setProperty("--poster-accent", settings.accentColor.value);
  elements.poster.style.setProperty("--poster-lead-scale", settings.leadScale.value);
  elements.poster.style.setProperty("--poster-chapter-size", `${settings.chapterSize.value}px`);
  elements.poster.style.setProperty("--poster-section-size", `${settings.sectionNumberSize.value}px`);
  elements.poster.style.setProperty("--preview-scale", visibleZoom());
  elements.poster.classList.toggle("hide-header", !settings.header.checked);
  elements.poster.classList.toggle("composition-compact", settings.compositionStyle.value === "compact");
  elements.poster.classList.toggle("composition-open", settings.compositionStyle.value === "open");
  elements.poster.classList.remove("layout-folio", "layout-book", "layout-letter", "layout-section");
  elements.poster.classList.add(`layout-${layoutTemplate}`);
  elements.poster.classList.remove("lead-none", "lead-line", "lead-color");
  elements.poster.classList.add(`lead-${settings.leadStyle.value}`);
  const sectionNumber = settings.sectionNumber.value.trim();
  const chapterText = settings.chapterText.value.trim();
  elements.poster.classList.toggle("has-section-number", layoutTemplate === "section" && Boolean(sectionNumber));
  const posterAccent = elements.poster.querySelector(".poster-accent");
  posterAccent.textContent = layoutTemplate === "book" ? chapterText : (layoutTemplate === "section" ? sectionNumber : "");
  if (layoutTemplate === "book" && chapterText) posterAccent.dataset.previewTarget = "chapter";
  else if (layoutTemplate === "section" && sectionNumber) posterAccent.dataset.previewTarget = "section";
  else posterAccent.removeAttribute("data-preview-target");
  $("#posterEdition").textContent = settings.editionText.value.trim() || "XVI / 016";
  $("#posterKicker").textContent = settings.kickerText.value.trim();
  syncPreviewInspector();

  scheduleSave();
}

function joinSoftWrappedLines(block) {
  return block.split("\n").map((line) => line.trim()).filter(Boolean).reduce((result, line) => {
    if (!result) return line;
    const needsSpace = /[A-Za-z0-9]$/.test(result) && /^[A-Za-z0-9]/.test(line);
    return `${result}${needsSpace ? " " : ""}${line}`;
  }, "");
}

function splitIntoBalancedParagraphs(text) {
  if ([...text].length < 520) return [text];
  const sentences = text.match(/[^。！？!?…]+(?:[。！？!?…]+[”’」』》】]?)?|.+$/g) || [text];
  const paragraphs = [];
  let paragraph = "";
  sentences.forEach((sentence) => {
    paragraph += sentence;
    if ([...paragraph].length >= 150) {
      paragraphs.push(paragraph.trim());
      paragraph = "";
    }
  });
  if (paragraph.trim()) {
    if (paragraphs.length && [...paragraph].length < 60) paragraphs[paragraphs.length - 1] += paragraph;
    else paragraphs.push(paragraph.trim());
  }
  return paragraphs;
}

// Generation, persistence, and explicit feedback submission.
function composeText(rawText) {
  const normalized = rawText.replace(/\r\n?/g, "\n").replace(/\u00a0/g, " ").trim();
  if (!settings.smartParagraph.checked) return normalized;
  const explicitBlocks = normalized.split(/\n\s*\n+/).map(joinSoftWrappedLines).filter(Boolean);
  if (explicitBlocks.length > 1) return explicitBlocks.join("\n\n");
  return splitIntoBalancedParagraphs(explicitBlocks[0] || "").join("\n\n");
}

function applyAutomaticTypography(characterCount) {
  let values;
  if (characterCount <= 360) values = { fontSize: 32, titleSize: 64, lineHeight: 2, letterSpacing: 2, paragraphSpacing: 1.5, pagePadding: 96 };
  else if (characterCount <= 900) values = { fontSize: 32, titleSize: 60, lineHeight: 1.88, letterSpacing: 1, paragraphSpacing: 1.25, pagePadding: 88 };
  else if (characterCount <= 1800) values = { fontSize: 29, titleSize: 56, lineHeight: 1.78, letterSpacing: 1, paragraphSpacing: 1, pagePadding: 80 };
  else values = { fontSize: 26, titleSize: 52, lineHeight: 1.7, letterSpacing: 0, paragraphSpacing: 0.5, pagePadding: 72 };
  Object.entries(values).forEach(([key, value]) => { settings[key].value = value; });
  alignment = "left";
  $$('[data-align]').forEach((item) => item.classList.toggle("active", item.dataset.align === alignment));
}

function generateDocument() {
  const rawText = bodyText();
  if (!rawText) {
    showToast("请先完成正文输入");
    elements.body.focus();
    return;
  }
  const body = composeText(rawText);
  const characterCount = body.replace(/\s/g, "").length;
  const sourceParagraphs = extractRichParagraphs();
  if (!generatedDocument) applyAutomaticTypography(characterCount);
  generatedDocument = {
    title: elements.title.value.trim(),
    author: elements.author.value.trim(),
    body,
    paragraphs: settings.smartParagraph.checked
      ? applyFormattingToComposedText(body, sourceParagraphs)
      : sourceParagraphs
  };
  contentIsDirty = false;
  elements.poster.hidden = false;
  elements.previewEmpty.hidden = true;
  elements.exportButton.disabled = false;
  $("#exportPanelButton").disabled = false;
  syncGenerateButtonLabel();
  fitMobilePreview();
  render();
  showToast(`已按 ${characterCount} 字自动完成排版`);
  activatePanel("design");
}

function markContentDirty() {
  updateControlLabels();
  scheduleSave();
  if (!generatedDocument) return;
  contentIsDirty = true;
  elements.exportButton.disabled = true;
  $("#exportPanelButton").disabled = true;
  syncGenerateButtonLabel();
}

function syncFormattingToGeneratedDocument() {
  if (!generatedDocument) {
    scheduleSave();
    return;
  }
  generatedDocument.body = bodyText();
  generatedDocument.paragraphs = extractRichParagraphs();
  contentIsDirty = false;
  elements.exportButton.disabled = false;
  $("#exportPanelButton").disabled = false;
  syncGenerateButtonLabel();
  render();
}

function syncPreviewBodyEdits() {
  if (!generatedDocument) return;
  generatedDocument.body = elements.previewBody.innerText.replace(/\u00a0/g, " ").trim();
  generatedDocument.paragraphs = extractRichParagraphsFrom(elements.previewBody);
  elements.body.innerHTML = elements.previewBody.innerHTML;
  elements.body.querySelectorAll("[data-preview-target]").forEach((node) => node.removeAttribute("data-preview-target"));
  elements.body.querySelectorAll(".preview-editing").forEach((node) => node.classList.remove("preview-editing"));
  contentIsDirty = false;
  elements.exportButton.disabled = false;
  $("#exportPanelButton").disabled = false;
  updateControlLabels();
  scheduleSave();
}

function applyPreviewFormatting(command) {
  const selection = document.getSelection();
  if (!selection?.rangeCount || !elements.previewBody.contains(selection.anchorNode)) return;
  document.execCommand(command, false);
  syncPreviewBodyEdits();
}

function getState() {
  return {
    defaultsVersion: 3,
    title: elements.title.value,
    author: elements.author.value,
    body: bodyText(),
    bodyHtml: elements.body.innerHTML,
    alignment,
    layoutTemplate,
    paletteMode,
    paletteFamily,
    activeSpecialPreset,
    zoom,
    values: Object.fromEntries(Object.entries(settings).map(([key, input]) => [key, input.type === "checkbox" ? input.checked : input.value]))
  };
}

function scheduleSave() {
  elements.saveState.textContent = uiLanguage === "en" ? "Saving..." : "正在保存...";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem("xvi-next-v1", JSON.stringify(getState()));
    elements.saveState.textContent = uiLanguage === "en" ? "Autosaved" : "已自动保存";
  }, 350);
}

function loadState() {
  try {
    const state = JSON.parse(localStorage.getItem("xvi-next-v1"));
    if (!state) return;
    if ((state.defaultsVersion || 0) < 2 && Number(state.zoom) === 0.7) state.zoom = 0.55;
    if ((state.defaultsVersion || 0) < 3 && Number(state.zoom) < 0.5) state.zoom = 0.55;
    const legacySample = typeof state.body === "string"
      && state.body.startsWith("有时候，写作并不是为了得到一个答案。")
      && state.body.includes("所以，请继续写吧。");
    if (legacySample) {
      state.title = state.title === "我仍然愿意相信文字" ? "" : state.title;
      state.author = state.author === "写作者 / 无名" ? "" : state.author;
      state.body = "";
      state.bodyHtml = "";
      state.values = { ...state.values, fontSize: "32", leadStyle: "color" };
    }
    elements.title.value = state.title ?? elements.title.value;
    elements.author.value = state.author ?? elements.author.value;
    if (state.bodyHtml) elements.body.innerHTML = state.bodyHtml;
    else if (state.body) setBodyText(state.body);
    alignment = state.alignment ?? alignment;
    layoutTemplate = LAYOUT_RECIPES[state.layoutTemplate] ? state.layoutTemplate : "folio";
    paletteMode = state.paletteMode === "dark" ? "dark" : "light";
    paletteFamily = PALETTE_FAMILIES[state.paletteFamily] ? state.paletteFamily : "neutral";
    activeSpecialPreset = SPECIAL_PRESETS.includes(state.activeSpecialPreset) ? state.activeSpecialPreset : null;
    zoom = state.zoom ?? zoom;
    Object.entries(state.values || {}).forEach(([key, value]) => {
      if (!settings[key]) return;
      if (settings[key].type === "checkbox") settings[key].checked = value;
      else if (settings[key].tagName === "SELECT" && ![...settings[key].options].some((option) => option.value === value)) return;
      else settings[key].value = value;
    });
    if (settings.editionText.value === "016 / LONGFORM") settings.editionText.value = "XVI / 016";
    if (settings.kickerText.value === "LONGFORM COMPOSITION / 016") settings.kickerText.value = "";
  } catch (_) {
    localStorage.removeItem("xvi-next-v1");
  }
}

function showToast(message) {
  elements.toast.textContent = translateRuntimeText(message);
  elements.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2200);
}

function syncFeedbackSubmitState() {
  const submitButton = elements.feedbackForm.querySelector('button[type="submit"]');
  submitButton.disabled = !$("#feedbackMessage").value.trim();
}

function openFeedback() {
  elements.feedbackModal.hidden = false;
  requestAnimationFrame(() => elements.feedbackModal.classList.add("show"));
  syncFeedbackSubmitState();
  $("#feedbackMessage").focus();
}

function closeFeedback() {
  elements.feedbackModal.classList.remove("show");
  setTimeout(() => { elements.feedbackModal.hidden = true; }, 160);
}

async function submitFeedback(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = $("#feedbackMessage").value.trim();
  if (!message) return showToast("先写一点内容");
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = uiLanguage === "en" ? "Sending" : "发送中";
  try {
    const payload = new URLSearchParams(new FormData(form));
    await fetch(FEEDBACK_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString()
    });
    form.reset();
    syncFeedbackSubmitState();
    closeFeedback();
    showToast("来信已收到");
  } catch (error) {
    showToast("暂时没发送出去，内容还在");
  } finally {
    submitButton.textContent = uiLanguage === "en" ? "Send" : "发送";
    syncFeedbackSubmitState();
  }
}

function openSettings() {
  $("#settingsModal").hidden = false;
  requestAnimationFrame(() => $("#settingsModal").classList.add("show"));
}

function closeSettings() {
  $("#settingsModal").classList.remove("show");
  setTimeout(() => { $("#settingsModal").hidden = true; }, 160);
}

function activatePanel(name) {
  $$('[data-tab]').forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
  });
  $$('[data-panel]').forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === name));
  document.body.dataset.mobileTab = name;
  document.querySelector(".editor-panel").dataset.step = { content: "01", design: "02", export: "03" }[name];
  document.querySelector(".editor-panel").scrollTo({ top: 0, behavior: "smooth" });
  if (window.innerWidth <= 760) window.scrollTo({ top: 0, behavior: "smooth" });
}

function fitMobilePreview() {
  if (window.innerWidth > 760) return;
  const availableWidth = Math.max(292, window.innerWidth - 28);
  mobileZoom = Math.max(0.35, Math.min(0.55, availableWidth / Number(settings.contentWidth.value)));
}

async function loadCustomFont(file) {
  if (!file) return;
  if (file.size > 20 * 1024 * 1024) {
    showToast("字体文件不能超过 20 MB");
    return;
  }
  const displayName = file.name.replace(/\.(ttf|otf|woff2?)$/i, "");
  const familyName = `XVI Custom ${Date.now()}`;
  try {
    const face = new FontFace(familyName, await file.arrayBuffer());
    await face.load();
    document.fonts.add(face);
    const key = `custom-${Date.now()}`;
    FONT_STACKS[key] = `"${familyName}"`;
    [settings.fontFamily, settings.titleFontFamily].forEach((select) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = uiLanguage === "en" ? `${displayName} (local)` : `${displayName}（本地）`;
      select.append(option);
    });
    settings.fontFamily.value = key;
    $("#customFontName").textContent = displayName;
    render();
    showToast("字体已载入并应用到正文");
  } catch (_) {
    showToast("无法读取这个字体文件");
  }
}

// Palette and layout actions.
function setPreset(name, fromFamily = false) {
  const preset = PRESETS[name];
  if (!preset) return;
  settings.backgroundColor.value = preset.background;
  settings.textColor.value = preset.text;
  settings.titleColor.value = preset.text;
  settings.accentColor.value = preset.accent;
  activeSpecialPreset = fromFamily ? null : (SPECIAL_PRESETS.includes(name) ? name : null);
  syncPaletteControls();
  render();
}

function syncPaletteControls() {
  $$("[data-palette-mode]").forEach((button) => button.classList.toggle("active", button.dataset.paletteMode === paletteMode));
  $$("[data-palette-family]").forEach((button) => {
    const family = button.dataset.paletteFamily;
    const preset = PRESETS[PALETTE_FAMILIES[family][paletteMode]];
    const name = uiLanguage === "en" ? PALETTE_NAMES_EN[paletteMode][family] : PALETTE_NAMES[paletteMode][family];
    button.classList.toggle("active", !activeSpecialPreset && family === paletteFamily);
    button.style.backgroundColor = preset.accent;
    button.title = name;
    button.setAttribute("aria-label", name);
  });
  $$("[data-preset]").forEach((button) => {
    button.classList.toggle("active", button.dataset.preset === activeSpecialPreset);
    const label = button.querySelector("span");
    if (label) label.textContent = uiLanguage === "en" ? SPECIAL_PRESET_NAMES_EN[button.dataset.preset] : SPECIAL_PRESET_NAMES[button.dataset.preset];
  });
  $("#paletteSelectionName").textContent = localizedPaletteName();
}

function setPaletteFamily(mode = paletteMode, family = paletteFamily) {
  if (!["light", "dark"].includes(mode) || !PALETTE_FAMILIES[family]) return;
  paletteMode = mode;
  paletteFamily = family;
  activeSpecialPreset = null;
  syncPaletteControls();
  setPreset(PALETTE_FAMILIES[family][mode], true);
}

function setLayoutTemplate(name, applyRecipe = true) {
  const recipe = LAYOUT_RECIPES[name];
  if (!recipe) return;
  layoutTemplate = name;
  if ((activePreviewTarget === "chapter" && name !== "book") || (activePreviewTarget === "section" && name !== "section")) activePreviewTarget = null;
  if (applyRecipe) {
    Object.entries(recipe).forEach(([key, value]) => {
      const input = settings[key];
      if (!input) return;
      if (input.type === "checkbox") input.checked = value;
      else input.value = value;
    });
    alignment = "left";
    $$('[data-align]').forEach((item) => item.classList.toggle("active", item.dataset.align === alignment));
  }
  $$("[data-layout-template]").forEach((button) => button.classList.toggle("active", button.dataset.layoutTemplate === name));
  render();
  if (applyRecipe) showToast(`已应用${buttonLabel(name)}版式`);
}

// Canvas export mirrors the DOM preview without uploading content.
function buttonLabel(name) {
  return document.querySelector(`[data-layout-template="${name}"] strong`)?.textContent || "所选";
}

function drawTextWithSpacing(ctx, text, x, y, spacing) {
  let currentX = x;
  for (const char of [...text]) {
    ctx.fillText(char, currentX, y);
    currentX += ctx.measureText(char).width + spacing;
  }
}

function measuredWidth(ctx, text, spacing) {
  const chars = [...text];
  return ctx.measureText(text).width + Math.max(0, chars.length - 1) * spacing;
}

function wrapText(ctx, text, maxWidth, spacing) {
  return wrapCharacters(ctx, text, maxWidth, spacing, 0);
}

function wrapCharacters(ctx, text, maxWidth, spacing, firstLineIndent) {
  const lines = [];
  let line = "";
  for (const char of [...text]) {
    const candidate = line + char;
    const availableWidth = maxWidth - (lines.length === 0 ? firstLineIndent : 0);
    if (line && measuredWidth(ctx, candidate, spacing) > availableWidth) {
      if (FORBIDDEN_LINE_START.has(char)) {
        line = candidate;
        continue;
      }
      let carry = "";
      while (line) {
        const characters = [...line];
        const last = characters[characters.length - 1];
        if (!FORBIDDEN_LINE_END.has(last)) break;
        carry = last + carry;
        characters.pop();
        line = characters.join("");
      }
      if (line) lines.push(line);
      line = carry + char;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function wrapParagraph(ctx, text, maxWidth, spacing, indentWidth) {
  const lines = [];
  text.split("\n").forEach((forcedLine) => {
    if (!forcedLine) {
      lines.push("");
      return;
    }
    lines.push(...wrapCharacters(ctx, forcedLine, maxWidth, spacing, lines.length === 0 ? indentWidth : 0));
  });
  return lines;
}

function richFont(run, fontSize) {
  return `${run.italic ? "italic " : ""}${run.bold ? "700" : "400"} ${fontSize}px ${FONT_STACKS[settings.fontFamily.value]}`;
}

function richLineWidth(ctx, line, fontSize, spacing) {
  return line.reduce((width, glyph, index) => {
    ctx.font = richFont(glyph, fontSize);
    return width + ctx.measureText(glyph.char).width + (index ? spacing : 0);
  }, 0);
}

function wrapRichParagraph(ctx, runs, maxWidth, fontSize, spacing, indentWidth) {
  const glyphs = runs.flatMap((run) => [...run.text].map((char) => ({ ...run, char })));
  const lines = [];
  let line = [];
  for (const glyph of glyphs) {
    if (glyph.char === "\n") {
      lines.push(line);
      line = [];
      continue;
    }
    const availableWidth = maxWidth - (lines.length === 0 ? indentWidth : 0);
    const candidate = [...line, glyph];
    if (line.length && richLineWidth(ctx, candidate, fontSize, spacing) > availableWidth) {
      if (FORBIDDEN_LINE_START.has(glyph.char)) {
        line.push(glyph);
        continue;
      }
      const carry = [];
      while (line.length && FORBIDDEN_LINE_END.has(line[line.length - 1].char)) carry.unshift(line.pop());
      if (line.length) lines.push(line);
      line = [...carry, glyph];
    } else {
      line = candidate;
    }
  }
  if (line.length) lines.push(line);
  return lines.length ? lines : [[]];
}

function drawRichLine(ctx, line, x, baseline, fontSize, spacing) {
  let currentX = x;
  line.forEach((glyph, index) => {
    ctx.font = richFont(glyph, fontSize);
    const width = ctx.measureText(glyph.char).width;
    ctx.fillText(glyph.char, currentX, baseline);
    if (glyph.underline) ctx.fillRect(currentX, baseline + fontSize * 0.12, width, Math.max(1, fontSize * 0.045));
    if (glyph.strike) ctx.fillRect(currentX, baseline - fontSize * 0.32, width, Math.max(1, fontSize * 0.045));
    currentX += width + (index < line.length - 1 ? spacing : 0);
  });
}

function getCanvasLayout(scale = 2) {
  const width = Number(settings.contentWidth.value);
  const padding = Number(settings.pagePadding.value);
  const fontSize = Number(settings.fontSize.value);
  const titleSize = Number(settings.titleSize.value);
  const titleWeight = Number(settings.titleWeight.value);
  const lineHeight = fontSize * Number(settings.lineHeight.value);
  const letterSpacing = Number(settings.letterSpacing.value);
  const paragraphGap = fontSize * Number(settings.paragraphSpacing.value);
  const leadScale = Number(settings.leadScale.value);
  const fullWidth = width - padding * 2;
  const composition = settings.compositionStyle.value;
  const sectionNumber = settings.sectionNumber.value.trim();
  const folioGeometry = composition === "compact"
    ? { inset: 0, ratio: 1, indexStep: 38, accentWidth: 20, accentHeight: 20, accentStep: 38, ruleGap: 34 }
    : composition === "open"
      ? { inset: 0, ratio: 1, indexStep: 110, accentWidth: 34, accentHeight: 34, accentStep: 68, ruleGap: 82 }
      : { inset: 0, ratio: 1, indexStep: 76, accentWidth: 27, accentHeight: 27, accentStep: 48, ruleGap: 54 };
  const templateGeometry = {
    folio: { ...folioGeometry, titleOffset: 0, bodyOffset: 0, frameInset: 0 },
    book: { inset: 0, ratio: 1, indexStep: 76, accentWidth: 0, accentHeight: 0, accentStep: 40, ruleGap: 68, titleOffset: 0, bodyOffset: 0, frameInset: 0 },
    letter: { inset: 0, ratio: 1, indexStep: 72, accentWidth: 46, accentHeight: 2, accentStep: 42, ruleGap: 54, titleOffset: 0, bodyOffset: 0, frameInset: 0 },
    section: { inset: 0, ratio: 1, indexStep: 84, accentWidth: 0, accentHeight: 0, accentStep: sectionNumber ? Math.max(92, Number(settings.sectionNumberSize.value) * .92) : 38, ruleGap: 68, titleOffset: 0, bodyOffset: 0, frameInset: 0 }
  }[layoutTemplate] || null;
  const contentX = padding + templateGeometry.inset;
  const usableWidth = fullWidth * templateGeometry.ratio - templateGeometry.inset * 2;
  const sectionTitleInset = layoutTemplate === "section" && sectionNumber ? Math.min(170, Number(settings.sectionNumberSize.value) * 1.35) : 0;
  const titleX = contentX + sectionTitleInset;
  const titleWidth = layoutTemplate === "section" ? usableWidth - sectionTitleInset : (["book", "letter"].includes(layoutTemplate) ? usableWidth * 0.84 : usableWidth);
  const bodyX = contentX;
  const bodyWidth = usableWidth;
  const measure = document.createElement("canvas").getContext("2d");
  const indentWidth = settings.indent.checked ? fontSize * 2 : 0;
  const paragraphFontSizes = textParagraphs().map((_, index) => index === 0 ? fontSize * leadScale : fontSize);
  const paragraphLineHeights = paragraphFontSizes.map((size) => lineHeight * (size / fontSize));
  const paragraphs = textParagraphs().map((runs, index) => {
    const firstLineOffset = index === 0 && settings.leadStyle.value === "line" ? 38 : (index === 0 && settings.leadStyle.value === "color" ? 42 : 0);
    const paragraphIndent = settings.indent.checked && !(index === 0 && settings.leadStyle.value !== "none") ? paragraphFontSizes[index] * 2 : 0;
    return wrapRichParagraph(measure, runs, bodyWidth - firstLineOffset, paragraphFontSizes[index], letterSpacing, paragraphIndent);
  });
  measure.font = `${titleWeight} ${titleSize}px ${FONT_STACKS[settings.titleFontFamily.value]}`;
  const titleLines = wrapText(measure, generatedDocument.title, titleWidth, 0);
  const bodyHeight = paragraphs.reduce((height, lines, index) => height + lines.length * paragraphLineHeights[index] + paragraphGap, 0);
  const topPadding = 48;
  const titleLineHeight = titleSize * 1.22;
  const { indexStep, accentWidth, accentHeight, accentStep, ruleGap } = templateGeometry;
  const titleStart = settings.header.checked
    ? (layoutTemplate === "section"
      ? topPadding + indexStep + titleSize * .9
      : topPadding + indexStep + accentStep + titleSize)
    : topPadding + titleSize + 40;
  const bodyStart = titleStart + titleLines.length * titleLineHeight + (layoutTemplate === "folio" ? ruleGap : 16 + ruleGap);
  const footerHeight = settings.signature.checked ? padding + 45 : padding;
  const accentX = padding;
  const ruleWidth = layoutTemplate === "section" ? usableWidth : titleWidth;
  const ruleX = layoutTemplate === "section" ? contentX : titleX;
  return { scale, width, padding, topPadding, fontSize, titleSize, titleWeight, titleLineHeight, lineHeight, letterSpacing, paragraphGap, fullWidth, contentX, usableWidth, bodyX, bodyWidth, titleX, titleWidth, paragraphs, paragraphFontSizes, paragraphLineHeights, titleLines, indexStep, accentX, accentWidth, accentHeight, accentStep, ruleX, ruleWidth, ruleGap, titleStart, bodyStart, frameInset: templateGeometry.frameInset, height: Math.ceil(bodyStart + bodyHeight + footerHeight) };
}

async function exportImage() {
  if (!generatedDocument || contentIsDirty) {
    showToast("请先完成自动排版");
    return;
  }
  await document.fonts.ready;
  const layout = getCanvasLayout(Number($("#exportScale").value));
  const canvas = document.createElement("canvas");
  canvas.width = layout.width * layout.scale;
  canvas.height = layout.height * layout.scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(layout.scale, layout.scale);

  ctx.fillStyle = settings.backgroundColor.value;
  ctx.fillRect(0, 0, layout.width, layout.height);
  let y = layout.topPadding;
  if (settings.header.checked) {
    const headerLeft = layout.padding;
    const headerRight = layout.width - layout.padding;
    ctx.fillStyle = settings.textColor.value;
    ctx.font = "900 20px Arial, sans-serif";
    ctx.fillText("XVI", headerLeft, y + 16);
    ctx.globalAlpha = 0.56;
    ctx.font = "700 11px Arial, sans-serif";
    const edition = settings.editionText.value.trim() || "XVI / 016";
    ctx.fillText(edition, headerRight - ctx.measureText(edition).width, y + 14);
    ctx.globalAlpha = 1;
    if (layoutTemplate === "book") {
      ctx.globalAlpha = 0.55;
      ctx.fillRect(layout.padding, y + 30, layout.fullWidth, 1);
      ctx.globalAlpha = 1;
    }
    y += layout.indexStep;

    const decorationY = y;

    ctx.fillStyle = settings.accentColor.value;
    if (layoutTemplate === "folio") {
      ctx.beginPath();
      ctx.roundRect(layout.accentX, decorationY, layout.accentWidth, layout.accentHeight, [14, 14, 14, 4]);
      ctx.fill();
    } else if (layoutTemplate === "letter") {
      ctx.fillRect(layout.accentX, decorationY, layout.accentWidth, layout.accentHeight);
    } else if (layoutTemplate === "book" && settings.chapterText.value.trim()) {
      ctx.font = `italic ${Number(settings.chapterSize.value)}px Georgia, serif`;
      ctx.fillText(settings.chapterText.value.trim(), layout.contentX, decorationY + Number(settings.chapterSize.value));
    }
    const kicker = settings.kickerText.value.trim();
    if (layoutTemplate === "section" && settings.sectionNumber.value.trim()) {
      const sectionSize = Number(settings.sectionNumberSize.value);
      ctx.font = `italic ${sectionSize}px Georgia, serif`;
      ctx.fillText(settings.sectionNumber.value.trim(), layout.contentX, decorationY + sectionSize * .8);
      if (kicker) {
        ctx.font = "700 16px Arial, sans-serif";
        drawTextWithSpacing(ctx, kicker, layout.titleX, decorationY + Math.min(56, sectionSize * .65), 1.4);
      }
    } else if (layoutTemplate !== "book" && kicker) {
      ctx.font = "700 16px Arial, sans-serif";
      const kickerX = layout.titleX + (layoutTemplate === "folio" ? layout.accentWidth + 13 : 0);
      const kickerY = layoutTemplate === "folio" ? decorationY + Math.min(layout.accentHeight * .67, 22) : decorationY + 20;
      drawTextWithSpacing(ctx, kicker, kickerX, kickerY, 2);
    }
    y = layout.titleStart;
  } else {
    y = layout.titleStart;
  }

  ctx.fillStyle = settings.titleColor.value;
  ctx.font = `${layout.titleWeight} ${layout.titleSize}px ${FONT_STACKS[settings.titleFontFamily.value]}`;
  layout.titleLines.forEach((line) => {
    ctx.fillText(line, layout.titleX, y);
    y += layout.titleLineHeight;
  });
  ctx.textAlign = "left";
  if (layoutTemplate !== "folio" && layoutTemplate !== "book") {
    y += 16;
    ctx.globalAlpha = layoutTemplate === "section" ? 1 : 0.48;
    ctx.fillStyle = settings.accentColor.value;
    ctx.fillRect(layout.ruleX, y, layout.ruleWidth, layoutTemplate === "section" ? 3 : 1);
    ctx.globalAlpha = 1;
    y += layout.ruleGap;
  } else {
    y += layout.ruleGap;
  }

  ctx.fillStyle = settings.textColor.value;
  layout.paragraphs.forEach((lines, paragraphIndex) => {
    const paragraphTop = y;
    const paragraphFontSize = layout.paragraphFontSizes[paragraphIndex];
    const paragraphLineHeight = layout.paragraphLineHeights[paragraphIndex];
    if (paragraphIndex === 0 && settings.leadStyle.value === "line") {
      ctx.fillStyle = settings.accentColor.value;
      ctx.fillRect(layout.contentX, paragraphTop - paragraphFontSize * 0.8, 3, Math.max(paragraphLineHeight, lines.length * paragraphLineHeight - paragraphFontSize * 0.15));
    }
    lines.forEach((line, lineIndex) => {
      let x = layout.bodyX;
      const allowIndent = !(paragraphIndex === 0 && settings.leadStyle.value !== "none");
      const indent = settings.indent.checked && allowIndent && lineIndex === 0 ? paragraphFontSize * 2 : 0;
      const lineWidth = richLineWidth(ctx, line, paragraphFontSize, layout.letterSpacing);
      if (alignment === "center") x += (layout.bodyWidth - lineWidth) / 2;
      else if (paragraphIndex === 0 && settings.leadStyle.value === "color") x += 42;
      else if (paragraphIndex === 0 && settings.leadStyle.value === "line") x += 38;
      else x += indent;
      if (paragraphIndex === 0 && settings.leadStyle.value === "color") ctx.fillStyle = settings.accentColor.value;
      else ctx.fillStyle = settings.textColor.value;
      drawRichLine(ctx, line, x, y, paragraphFontSize, layout.letterSpacing);
      y += paragraphLineHeight;
    });
    y += layout.paragraphGap;
  });

  if (settings.signature.checked) {
    y += 32;
    ctx.fillStyle = settings.accentColor.value;
    ctx.fillRect(layout.bodyX, y - 8, 48, 4);
    ctx.fillStyle = settings.textColor.value;
    ctx.font = `600 14px ${FONT_STACKS["sans-serif"]}`;
    drawTextWithSpacing(ctx, generatedDocument.author, layout.bodyX + 64, y, 1);
    ctx.globalAlpha = 0.5;
    ctx.font = "700 10px Arial, sans-serif";
    const mark = uiLanguage === "en" ? "XVI / LONGFORM" : "XVI / 十六开";
    ctx.fillText(mark, layout.bodyX + layout.bodyWidth - ctx.measureText(mark).width, y);
    ctx.globalAlpha = 1;
  }

  const mimeType = exportFormat === "jpeg" ? "image/jpeg" : "image/png";
  const extension = exportFormat === "jpeg" ? "jpg" : "png";
  canvas.toBlob((blob) => {
    if (!blob) return showToast("导出失败，请稍后重试");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const requestedName = $("#exportFileName").value.trim() || generatedDocument.title;
    link.download = `${requestedName.replace(/[\\/:*?"<>|]/g, "-")}.${extension}`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    showToast(`${exportScaleLabel()}图片已保存`);
  }, mimeType, exportFormat === "jpeg" ? 0.94 : undefined);
}

// Event wiring and initial state restoration.
$$('[data-tab]').forEach((button) => button.addEventListener("click", () => activatePanel(button.dataset.tab)));

$("#scriptPickerButton").addEventListener("mousedown", (event) => event.preventDefault());
$("#scriptPickerButton").addEventListener("click", () => {
  const menu = $("#scriptPickerMenu");
  menu.hidden = !menu.hidden;
  $("#scriptPickerButton").setAttribute("aria-expanded", String(!menu.hidden));
});
$$('[data-script-action]').forEach((button) => {
  button.addEventListener("mousedown", (event) => event.preventDefault());
  button.addEventListener("click", () => convertSelectedScript(button.dataset.scriptAction));
});

Object.entries(settings).forEach(([key, input]) => input.addEventListener("input", () => {
  if (key === "smartParagraph") {
    markContentDirty();
    return;
  }
  render();
}));
$$('.number-field').forEach((input) => input.addEventListener("change", () => {
  const target = settings[input.dataset.setting];
  const value = Math.min(Number(input.max), Math.max(Number(input.min), Number(input.value)));
  if (!Number.isFinite(value)) return;
  target.value = value;
  render();
}));
[elements.title, elements.author, elements.body].forEach((input) => input.addEventListener("input", markContentDirty));
elements.body.addEventListener("paste", (event) => {
  event.preventDefault();
  document.execCommand("insertText", false, event.clipboardData.getData("text/plain"));
});
$$('[data-format-command]').forEach((button) => {
  button.addEventListener("mousedown", (event) => event.preventDefault());
  button.addEventListener("click", () => {
    elements.body.focus();
    document.execCommand(button.dataset.formatCommand, false);
    requestAnimationFrame(syncFormattingToGeneratedDocument);
  });
});
elements.body.addEventListener("input", (event) => {
  if (event.inputType?.startsWith("format")) requestAnimationFrame(syncFormattingToGeneratedDocument);
});
document.addEventListener("selectionchange", () => {
  const selection = document.getSelection();
  if (elements.previewBody.contains(selection?.anchorNode)) {
    if (!selection.isCollapsed) {
      activePreviewTarget = "body";
      syncPreviewInspector();
    }
    $$('[data-preview-format]').forEach((button) => button.classList.toggle("active", document.queryCommandState(button.dataset.previewFormat)));
    return;
  }
  if (!elements.body.contains(selection?.anchorNode)) return;
  $$('[data-format-command]').forEach((button) => {
    if (button.dataset.formatCommand === "removeFormat") return;
    button.classList.toggle("active", document.queryCommandState(button.dataset.formatCommand));
  });
});

$$('[data-align]').forEach((button) => button.addEventListener("click", () => {
  alignment = button.dataset.align;
  $$('[data-align]').forEach((item) => item.classList.toggle("active", item === button));
  render();
}));

$$('[data-lead-style]').forEach((button) => button.addEventListener("click", () => {
  settings.leadStyle.value = button.dataset.leadStyle;
  render();
}));

$$("[data-paragraph-gap]").forEach((button) => button.addEventListener("click", () => {
  settings.paragraphSpacing.value = button.dataset.paragraphGap;
  render();
}));

$$('[data-preset]').forEach((button) => button.addEventListener("click", () => setPreset(button.dataset.preset)));
$$("[data-palette-mode]").forEach((button) => button.addEventListener("click", () => setPaletteFamily(button.dataset.paletteMode, paletteFamily)));
$$("[data-palette-family]").forEach((button) => button.addEventListener("click", () => setPaletteFamily(paletteMode, button.dataset.paletteFamily)));
$$("[data-layout-template]").forEach((button) => button.addEventListener("click", () => setLayoutTemplate(button.dataset.layoutTemplate)));
$("#randomPresetButton").addEventListener("click", () => {
  const familyChoices = Object.keys(PALETTE_FAMILIES).flatMap((family) => ["light", "dark"].map((mode) => ({ family, mode, key: `family:${mode}:${family}` })));
  const specialChoices = SPECIAL_PRESETS.map((preset) => ({ preset, key: `special:${preset}` }));
  const currentKey = activeSpecialPreset ? `special:${activeSpecialPreset}` : `family:${paletteMode}:${paletteFamily}`;
  const choices = [...familyChoices, ...specialChoices].filter((choice) => choice.key !== currentKey);
  const choice = choices[Math.floor(Math.random() * choices.length)];
  if (choice.preset) setPreset(choice.preset);
  else setPaletteFamily(choice.mode, choice.family);
});
$("#customFontInput").addEventListener("change", (event) => loadCustomFont(event.target.files[0]));
$("#settingsOpenButton").addEventListener("click", openSettings);
$$('[data-settings-close]').forEach((button) => button.addEventListener("click", closeSettings));
$$('[data-language]').forEach((button) => button.addEventListener("click", () => applyUiLanguage(button.dataset.language)));
$("#feedbackOpenButton").addEventListener("click", openFeedback);
$$("[data-feedback-close]").forEach((button) => button.addEventListener("click", closeFeedback));
elements.feedbackForm.addEventListener("submit", submitFeedback);
elements.feedbackForm.addEventListener("input", syncFeedbackSubmitState);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!$("#scriptPickerMenu").hidden) closeScriptPicker();
    else if (!$("#settingsModal").hidden) closeSettings();
    else if (!elements.feedbackModal.hidden) closeFeedback();
    else if (activePreviewTarget) closePreviewInspector();
    return;
  }
  const selection = document.getSelection();
  if (!(event.metaKey || event.ctrlKey) || !elements.previewBody.contains(selection?.anchorNode)) return;
  const key = event.key.toLowerCase();
  const command = key === "b" ? "bold"
    : key === "i" ? "italic"
      : key === "u" ? "underline"
        : (key === "x" && event.shiftKey) ? "strikeThrough"
          : null;
  if (!command) return;
  event.preventDefault();
  applyPreviewFormatting(command);
});

$("#zoomOut").addEventListener("click", () => adjustVisibleZoom(-0.05));
$("#zoomIn").addEventListener("click", () => adjustVisibleZoom(0.05));
$("#exportScale").addEventListener("change", updateControlLabels);
$("#clearButton").addEventListener("click", () => { elements.body.replaceChildren(); markContentDirty(); elements.body.focus(); });
elements.generateButton.addEventListener("click", generateDocument);
elements.exportButton.addEventListener("click", exportImage);
$("#exportPanelButton").addEventListener("click", exportImage);
$$('[data-format]').forEach((button) => button.addEventListener("click", () => {
  exportFormat = button.dataset.format;
  $$('[data-format]').forEach((item) => item.classList.toggle("active", item === button));
  updateControlLabels();
}));

elements.poster.addEventListener("click", (event) => {
  const target = event.target.closest("[data-preview-target]");
  if (!target) return;
  activePreviewTarget = target.dataset.previewTarget;
  syncPreviewInspector();
});

elements.previewBody.addEventListener("input", syncPreviewBodyEdits);
elements.previewTitle.addEventListener("input", () => {
  if (!generatedDocument) return;
  generatedDocument.title = elements.previewTitle.innerText.replace(/\n/g, " ").trim();
  elements.title.value = generatedDocument.title;
  scheduleSave();
});

[elements.previewTitle].forEach((editable) => {
  editable.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    editable.blur();
  });
  editable.addEventListener("paste", (event) => {
    event.preventDefault();
    document.execCommand("insertText", false, event.clipboardData.getData("text/plain").replace(/\s*\n\s*/g, " "));
  });
});

$$('[data-preview-format]').forEach((button) => {
  button.addEventListener("mousedown", (event) => event.preventDefault());
  button.addEventListener("click", () => applyPreviewFormatting(button.dataset.previewFormat));
});

$$('[data-preview-step]').forEach((button) => button.addEventListener("click", () => {
  const editor = PREVIEW_EDITORS[activePreviewTarget];
  if (!editor) return;
  const input = settings[editor.size];
  const direction = Number(button.dataset.previewStep);
  const min = Number(input.min);
  const max = Number(input.max);
  const next = Math.min(max, Math.max(min, Number(input.value) + editor.step * direction));
  input.value = editor.step < 1 ? next.toFixed(2) : next;
  render();
}));

$("#previewInspectorColor").addEventListener("input", (event) => {
  const editor = PREVIEW_EDITORS[activePreviewTarget];
  if (!editor) return;
  settings[editor.color].value = event.target.value;
  render();
});

$("#previewInspectorClose").addEventListener("click", () => closePreviewInspector());

document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest("#scriptPicker")) closeScriptPicker();
  if (!activePreviewTarget) return;
  if (event.target.closest("#previewInspector") || event.target.closest("[data-preview-target]")) return;
  closePreviewInspector();
});

collectUiTranslations();
loadState();
applyUiLanguage(localStorage.getItem("xvi-ui-language") || "zh", false);
$$('[data-align]').forEach((item) => item.classList.toggle("active", item.dataset.align === alignment));
$$("[data-layout-template]").forEach((button) => button.classList.toggle("active", button.dataset.layoutTemplate === layoutTemplate));
syncPaletteControls();
updateControlLabels();
scheduleSave();
