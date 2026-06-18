const SAMPLE_TEXT = `有时候，写作并不是为了得到一个答案。

它更像是在安静的房间里点亮一盏灯，让那些没有被说出口的感受，终于拥有形状。

我们把日子拆成句子，把犹豫放进标点，把想念留在段落之间。然后在某个深夜，重新读到从前的自己。

原来文字真正保存下来的，不只是故事，还有我们曾经认真生活过的证据。

所以，请继续写吧。

不必等到准备万全，也不必急着成为谁。只要在每一次落笔时，诚实地靠近自己一点点。`;

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
  midnight: { background: "#171c24", text: "#d9dde5", accent: "#7e91ad" },
  inkstone: { background: "#20201e", text: "#e8e3d8", accent: "#a18f78" },
  deepPine: { background: "#17231f", text: "#dbe4dc", accent: "#789788" },
  wine: { background: "#2a171d", text: "#eadde0", accent: "#a97883" },
  nightPlum: { background: "#211a2a", text: "#e5ddec", accent: "#9a86b0" },
  deepSea: { background: "#142529", text: "#d9e5e4", accent: "#6f9da0" }
};

const LAYOUT_RECIPES = {
  folio: { fontFamily: "serif", titleFontFamily: "serif", titleSize: 56, titleWeight: 700, lineHeight: 1.88, paragraphSpacing: 1.15, pagePadding: 88, compositionStyle: "editorial", indent: true },
  quiet: { fontFamily: "serif", titleFontFamily: "serif", titleSize: 54, titleWeight: 400, lineHeight: 1.95, paragraphSpacing: 1.3, pagePadding: 88, compositionStyle: "open", indent: false },
  margin: { fontFamily: "serif", titleFontFamily: "serif", titleSize: 52, titleWeight: 700, lineHeight: 1.84, paragraphSpacing: 1.05, pagePadding: 80, compositionStyle: "editorial", indent: true },
  signal: { fontFamily: "serif", titleFontFamily: "sans-serif", titleSize: 78, titleWeight: 900, lineHeight: 1.74, paragraphSpacing: 0.95, pagePadding: 72, compositionStyle: "compact", indent: false }
};

const SLOGANS = [
  { text: "海阔凭鱼跃，天高任鸟飞。", source: "古语" },
  { text: "久在樊笼里，复得返自然。", source: "陶渊明" },
  { text: "行到水穷处，坐看云起时。", source: "王维" },
  { text: "我醉欲眠卿且去，明朝有意抱琴来。", source: "李白" },
  { text: "此心安处是吾乡。", source: "苏轼" }
];

const FORBIDDEN_LINE_START = new Set([..."，。！？；：、）》】」』〕〉”’…—～·,.!?;:%)]}›»"]);
const FORBIDDEN_LINE_END = new Set([..."（《【「『〔〈“‘([{‹«"]);

const FONT_STACKS = {
  serif: '"Songti SC", STSong, SimSun, serif',
  "sans-serif": '"PingFang SC", "Microsoft YaHei", sans-serif',
  lxgw: '"LXGW WenKai", "Kaiti SC", KaiTi, serif',
  neoZhiSong: '"LXGW Neo ZhiSong", "Songti SC", SimSun, serif',
  huiwen: '"Huiwen-mincho", "Songti SC", SimSun, serif',
  zhuque: '"Zhuque Fangsong (technical preview)", "Zhuque Fangsong", STFangsong, FangSong, serif',
  yozai: '"Yozai", "Kaiti SC", KaiTi, serif',
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
  exportButton: $("#exportButton")
};

const settings = {
  fontFamily: $("#fontFamily"),
  titleFontFamily: $("#titleFontFamily"),
  titleWeight: $("#titleWeight"),
  compositionStyle: $("#compositionStyle"),
  editionText: $("#editionText"),
  kickerText: $("#kickerText"),
  fontSize: $("#fontSize"),
  titleSize: $("#titleSize"),
  lineHeight: $("#lineHeight"),
  letterSpacing: $("#letterSpacing"),
  paragraphSpacing: $("#paragraphSpacing"),
  contentWidth: $("#contentWidth"),
  pagePadding: $("#pagePadding"),
  backgroundColor: $("#backgroundColor"),
  textColor: $("#textColor"),
  accentColor: $("#accentColor"),
  indent: $("#indentToggle"),
  texture: $("#textureToggle"),
  signature: $("#signatureToggle"),
  header: $("#headerToggle"),
  smartParagraph: $("#smartParagraphToggle")
};

let alignment = "left";
let layoutTemplate = "folio";
let zoom = 0.7;
let saveTimer;
let toastTimer;
let generatedDocument = null;
let contentIsDirty = false;
let exportFormat = "png";

function bodyText() {
  return elements.body.innerText.replace(/\u00a0/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function setBodyText(text) {
  elements.body.replaceChildren(...text.split(/\n\s*\n/).filter(Boolean).map((content) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    return paragraph;
  }));
}

function extractRichParagraphs() {
  const blocks = [...elements.body.childNodes];
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
  if (!paragraphs.length && bodyText()) paragraphs.push([{ text: bodyText() }]);
  return paragraphs;
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

function updateControlLabels() {
  elements.charCount.textContent = `${bodyText().replace(/\s/g, "").length} 字`;
  $$(".number-field").forEach((input) => { input.value = settings[input.dataset.setting].value; });
  $("#backgroundColorValue").value = settings.backgroundColor.value.toUpperCase();
  $("#textColorValue").value = settings.textColor.value.toUpperCase();
  $("#accentColorValue").value = settings.accentColor.value.toUpperCase();
  $("#zoomValue").value = `${Math.round(zoom * 100)}%`;
  elements.canvasInfo.textContent = `${settings.contentWidth.value} × 自动高度`;
  $("#exportCanvasInfo").textContent = `${settings.contentWidth.value} px · 自动高度`;
}

function render() {
  updateControlLabels();
  if (!generatedDocument) {
    scheduleSave();
    return;
  }

  elements.previewTitle.textContent = generatedDocument.title;
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

  elements.previewBody.className = `poster-body align-${alignment}${settings.indent.checked ? " indent" : ""}`;
  elements.previewFooter.hidden = !settings.signature.checked;
  elements.poster.classList.toggle("texture", settings.texture.checked);
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
  elements.poster.style.setProperty("--poster-accent", settings.accentColor.value);
  elements.poster.style.setProperty("--preview-scale", zoom);
  elements.poster.classList.toggle("hide-header", !settings.header.checked);
  elements.poster.classList.toggle("composition-compact", settings.compositionStyle.value === "compact");
  elements.poster.classList.toggle("composition-open", settings.compositionStyle.value === "open");
  elements.poster.classList.remove("layout-folio", "layout-quiet", "layout-margin", "layout-signal");
  elements.poster.classList.add(`layout-${layoutTemplate}`);
  $("#posterEdition").textContent = settings.editionText.value.trim() || "016 / LONGFORM";
  $("#posterKicker").textContent = settings.kickerText.value.trim() || "LONGFORM COMPOSITION / 016";

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

function composeText(rawText) {
  const normalized = rawText.replace(/\r\n?/g, "\n").replace(/\u00a0/g, " ").trim();
  if (!settings.smartParagraph.checked) return normalized;
  const explicitBlocks = normalized.split(/\n\s*\n+/).map(joinSoftWrappedLines).filter(Boolean);
  if (explicitBlocks.length > 1) return explicitBlocks.join("\n\n");
  return splitIntoBalancedParagraphs(explicitBlocks[0] || "").join("\n\n");
}

function applyAutomaticTypography(characterCount) {
  let values;
  if (characterCount <= 360) values = { fontSize: 38, titleSize: 64, lineHeight: 2, letterSpacing: 2, paragraphSpacing: 1.3, pagePadding: 96 };
  else if (characterCount <= 900) values = { fontSize: 33, titleSize: 60, lineHeight: 1.88, letterSpacing: 1, paragraphSpacing: 1.15, pagePadding: 88 };
  else if (characterCount <= 1800) values = { fontSize: 29, titleSize: 56, lineHeight: 1.78, letterSpacing: 1, paragraphSpacing: 1, pagePadding: 80 };
  else values = { fontSize: 26, titleSize: 52, lineHeight: 1.7, letterSpacing: 0, paragraphSpacing: 0.85, pagePadding: 72 };
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
    title: elements.title.value.trim() || "未命名文字",
    author: elements.author.value.trim() || "佚名",
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
  elements.generateButton.querySelector("strong").textContent = "重新排版并生成";
  render();
  showToast(`已按 ${characterCount} 字自动完成排版`);
  activatePanel("design");
  if (window.innerWidth <= 880) $("#previewScroll").scrollIntoView({ behavior: "smooth", block: "start" });
}

function markContentDirty() {
  updateControlLabels();
  scheduleSave();
  if (!generatedDocument) return;
  contentIsDirty = true;
  elements.exportButton.disabled = true;
  $("#exportPanelButton").disabled = true;
  elements.generateButton.querySelector("strong").textContent = "内容已更改，重新生成";
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
  elements.generateButton.querySelector("strong").textContent = "重新排版并生成";
  render();
}

function getState() {
  return {
    title: elements.title.value,
    author: elements.author.value,
    body: bodyText(),
    bodyHtml: elements.body.innerHTML,
    alignment,
    layoutTemplate,
    zoom,
    values: Object.fromEntries(Object.entries(settings).map(([key, input]) => [key, input.type === "checkbox" ? input.checked : input.value]))
  };
}

function scheduleSave() {
  elements.saveState.textContent = "正在保存...";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem("xvi-v7", JSON.stringify(getState()));
    elements.saveState.textContent = "已自动保存";
  }, 350);
}

function loadState() {
  try {
    const state = JSON.parse(localStorage.getItem("xvi-v7"));
    if (!state) return;
    elements.title.value = state.title ?? elements.title.value;
    elements.author.value = state.author ?? elements.author.value;
    if (state.bodyHtml) elements.body.innerHTML = state.bodyHtml;
    else if (state.body) setBodyText(state.body);
    alignment = state.alignment ?? alignment;
    layoutTemplate = "folio";
    zoom = state.zoom ?? zoom;
    Object.entries(state.values || {}).forEach(([key, value]) => {
      if (!settings[key]) return;
      if (settings[key].type === "checkbox") settings[key].checked = value;
      else if (settings[key].tagName === "SELECT" && ![...settings[key].options].some((option) => option.value === value)) return;
      else settings[key].value = value;
    });
  } catch (_) {
    localStorage.removeItem("xvi-v7");
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2200);
}

function activatePanel(name) {
  $$('[data-tab]').forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
  });
  $$('[data-panel]').forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === name));
  document.querySelector(".editor-panel").scrollTo({ top: 0, behavior: "smooth" });
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
      option.textContent = `${displayName}（本地）`;
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

function setPreset(name) {
  const preset = PRESETS[name];
  if (!preset) return;
  settings.backgroundColor.value = preset.background;
  settings.textColor.value = preset.text;
  settings.accentColor.value = preset.accent;
  $$(".preset").forEach((button) => button.classList.toggle("active", button.dataset.preset === name));
  render();
}

function setLayoutTemplate(name, applyRecipe = true) {
  const recipe = LAYOUT_RECIPES[name];
  if (!recipe) return;
  layoutTemplate = name;
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
  const fullWidth = width - padding * 2;
  const composition = settings.compositionStyle.value;
  const folioGeometry = composition === "compact"
    ? { inset: 0, ratio: 1, indexStep: 48, accentWidth: 16, accentHeight: 16, accentStep: 48, ruleGap: 40 }
    : composition === "open"
      ? { inset: 0, ratio: 1, indexStep: 96, accentWidth: 16, accentHeight: 80, accentStep: 152, ruleGap: 80 }
      : { inset: 0, ratio: 1, indexStep: 64, accentWidth: 16, accentHeight: 48, accentStep: 96, ruleGap: 56 };
  const templateGeometry = {
    folio: folioGeometry,
    quiet: { inset: fullWidth * 0.28, ratio: 0.72, indexStep: 74, accentWidth: fullWidth * 0.22, accentHeight: 4, accentStep: 52, ruleGap: 64 },
    margin: { inset: 180, ratio: 1, indexStep: 72, accentWidth: 4, accentHeight: 360, accentStep: 48, ruleGap: 0 },
    signal: { inset: 0, ratio: 1, indexStep: 48, accentWidth: fullWidth, accentHeight: 6, accentStep: 44, ruleGap: 48 }
  }[layoutTemplate] || null;
  const contentX = padding + templateGeometry.inset;
  const usableWidth = layoutTemplate === "margin" ? fullWidth - templateGeometry.inset : fullWidth * templateGeometry.ratio;
  const titleX = contentX;
  const titleWidth = layoutTemplate === "signal" ? usableWidth * 0.88 : layoutTemplate === "margin" ? 110 : usableWidth;
  const measure = document.createElement("canvas").getContext("2d");
  const indentWidth = settings.indent.checked ? fontSize * 2 : 0;
  const paragraphs = textParagraphs().map((runs) => wrapRichParagraph(measure, runs, usableWidth, fontSize, letterSpacing, indentWidth));
  measure.font = `${titleWeight} ${titleSize}px ${FONT_STACKS[settings.titleFontFamily.value]}`;
  const titleLines = layoutTemplate === "margin" ? [generatedDocument.title] : wrapText(measure, generatedDocument.title, titleWidth, 0);
  const bodyHeight = paragraphs.reduce((height, lines) => height + lines.length * lineHeight + paragraphGap, 0);
  const topPadding = 48;
  const titleLineHeight = titleSize * 1.22;
  const { indexStep, accentWidth, accentHeight, accentStep, ruleGap } = templateGeometry;
  const titleStart = settings.header.checked
    ? topPadding + indexStep + accentStep + titleSize + 24
    : topPadding + titleSize + 40;
  const bodyStart = layoutTemplate === "margin" ? 220 : titleStart + titleLines.length * titleLineHeight + 16 + ruleGap;
  const footerHeight = settings.signature.checked ? padding + 45 : padding;
  const accentX = layoutTemplate === "margin" ? padding + 128 : padding;
  const ruleWidth = layoutTemplate === "signal" ? usableWidth * 0.38 : titleWidth;
  const ruleX = titleX;
  const titleVerticalHeight = layoutTemplate === "margin" ? [...generatedDocument.title].length * titleSize * 1.08 + 180 : 0;
  return { scale, width, padding, topPadding, fontSize, titleSize, titleWeight, titleLineHeight, lineHeight, letterSpacing, paragraphGap, fullWidth, contentX, usableWidth, titleX, titleWidth, paragraphs, titleLines, indexStep, accentX, accentWidth, accentHeight, accentStep, ruleX, ruleWidth, ruleGap, titleStart, bodyStart, height: Math.ceil(Math.max(bodyStart + bodyHeight + footerHeight, titleVerticalHeight + padding)) };
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
  if (settings.texture.checked) {
    ctx.fillStyle = `${settings.textColor.value}10`;
    for (let y = 4; y < layout.height; y += 9) {
      for (let x = 4 + (y % 18); x < layout.width; x += 18) ctx.fillRect(x, y, 1, 1);
    }
  }
  if (layoutTemplate === "signal") {
    ctx.fillStyle = settings.textColor.value;
    ctx.globalAlpha = 0.07;
    ctx.font = "900 132px Georgia, serif";
    ctx.fillText("XVI", layout.padding, 180);
    ctx.globalAlpha = 1;
  }

  let y = layout.topPadding;
  if (settings.header.checked) {
    ctx.fillStyle = settings.textColor.value;
    ctx.font = "900 20px Arial, sans-serif";
    ctx.fillText("XVI", layout.padding, y + 16);
    ctx.globalAlpha = 0.56;
    ctx.font = "700 11px Arial, sans-serif";
    const edition = settings.editionText.value.trim() || "016 / LONGFORM";
    ctx.fillText(edition, layout.width - layout.padding - ctx.measureText(edition).width, y + 14);
    ctx.globalAlpha = 1;
    y += layout.indexStep;

    ctx.fillStyle = settings.accentColor.value;
    ctx.fillRect(layout.accentX, y, layout.accentWidth, layout.accentHeight);
    y += layout.accentStep;
    ctx.font = "700 12px Arial, sans-serif";
    const kicker = settings.kickerText.value.trim() || "LONGFORM COMPOSITION / 016";
    if (layoutTemplate !== "margin") {
      const kickerX = layoutTemplate === "quiet" ? layout.padding : layout.titleX;
      drawTextWithSpacing(ctx, kicker, kickerX, y, 2);
    }
    if (layoutTemplate !== "margin") {
      y += layout.titleSize + 24;
    } else {
      y = 170 + layout.titleSize;
    }
  } else {
    y = layout.titleStart;
  }

  ctx.fillStyle = settings.textColor.value;
  ctx.font = `${layout.titleWeight} ${layout.titleSize}px ${FONT_STACKS[settings.titleFontFamily.value]}`;
  if (layoutTemplate === "margin") {
    [...generatedDocument.title].forEach((char) => {
      ctx.fillText(char, layout.padding, y);
      y += layout.titleSize * 1.08;
    });
    y = layout.bodyStart;
  } else {
    layout.titleLines.forEach((line) => {
      ctx.fillText(line, layout.titleX, y);
      y += layout.titleLineHeight;
    });
  }
  ctx.textAlign = "left";
  if (layoutTemplate !== "margin") {
    y += 16;
    ctx.globalAlpha = layoutTemplate === "signal" ? 1 : 0.18;
    ctx.fillStyle = layoutTemplate === "signal" || layoutTemplate === "quiet" ? settings.accentColor.value : settings.textColor.value;
    ctx.fillRect(layout.ruleX, y, layout.ruleWidth, layoutTemplate === "signal" ? 3 : 1);
    ctx.globalAlpha = 1;
    y += layout.ruleGap;
  }

  ctx.fillStyle = settings.textColor.value;
  layout.paragraphs.forEach((lines) => {
    lines.forEach((line, lineIndex) => {
      let x = layout.contentX;
      const indent = settings.indent.checked && lineIndex === 0 ? layout.fontSize * 2 : 0;
      const lineWidth = richLineWidth(ctx, line, layout.fontSize, layout.letterSpacing);
      if (alignment === "center") x += (layout.usableWidth - lineWidth) / 2;
      else x += indent;
      drawRichLine(ctx, line, x, y, layout.fontSize, layout.letterSpacing);
      y += layout.lineHeight;
    });
    y += layout.paragraphGap;
  });

  if (settings.signature.checked) {
    y += 32;
    ctx.fillStyle = settings.accentColor.value;
    ctx.fillRect(layout.contentX, y - 8, 48, 4);
    ctx.fillStyle = settings.textColor.value;
    ctx.font = `600 14px ${FONT_STACKS["sans-serif"]}`;
    drawTextWithSpacing(ctx, generatedDocument.author, layout.contentX + 64, y, 1);
    ctx.globalAlpha = 0.5;
    ctx.font = "700 10px Arial, sans-serif";
    const mark = "XVI / 十六开";
    ctx.fillText(mark, layout.contentX + layout.usableWidth - ctx.measureText(mark).width, y);
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
    showToast("长图已导出");
  }, mimeType, exportFormat === "jpeg" ? 0.94 : undefined);
}

$$('[data-tab]').forEach((button) => button.addEventListener("click", () => {
  $$('[data-tab]').forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
  });
  $$('[data-panel]').forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === button.dataset.tab));
}));

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
  if (!elements.body.contains(document.getSelection()?.anchorNode)) return;
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

$$('[data-preset]').forEach((button) => button.addEventListener("click", () => setPreset(button.dataset.preset)));
$$("[data-layout-template]").forEach((button) => button.addEventListener("click", () => setLayoutTemplate(button.dataset.layoutTemplate)));
$("#randomPresetButton").addEventListener("click", () => {
  const names = Object.keys(PRESETS);
  const current = $$(".preset").find((button) => button.classList.contains("active"))?.dataset.preset;
  const alternatives = names.filter((name) => name !== current);
  setPreset(alternatives[Math.floor(Math.random() * alternatives.length)]);
});
$("#customFontInput").addEventListener("change", (event) => loadCustomFont(event.target.files[0]));
let sloganIndex = 0;
$("#sloganButton").addEventListener("click", () => {
  sloganIndex = (sloganIndex + 1) % SLOGANS.length;
  const slogan = SLOGANS[sloganIndex];
  $("#sloganButton").textContent = slogan.text;
  $("#sloganButton").title = `${slogan.source} · 换一句`;
});

$("#zoomOut").addEventListener("click", () => { zoom = Math.max(0.35, zoom - 0.05); render(); });
$("#zoomIn").addEventListener("click", () => { zoom = Math.min(1, zoom + 0.05); render(); });
$("#clearButton").addEventListener("click", () => { elements.body.replaceChildren(); markContentDirty(); elements.body.focus(); });
$("#sampleButton").addEventListener("click", () => { setBodyText(SAMPLE_TEXT); markContentDirty(); });
elements.generateButton.addEventListener("click", generateDocument);
elements.exportButton.addEventListener("click", exportImage);
$("#exportPanelButton").addEventListener("click", exportImage);
$$('[data-format]').forEach((button) => button.addEventListener("click", () => {
  exportFormat = button.dataset.format;
  $$('[data-format]').forEach((item) => item.classList.toggle("active", item === button));
}));

loadState();
$$('[data-align]').forEach((item) => item.classList.toggle("active", item.dataset.align === alignment));
$$("[data-layout-template]").forEach((button) => button.classList.toggle("active", button.dataset.layoutTemplate === layoutTemplate));
updateControlLabels();
scheduleSave();
