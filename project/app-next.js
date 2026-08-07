const {
  PRESETS,
  PALETTE_FAMILIES,
  PALETTE_NAMES,
  SPECIAL_PRESETS,
  SPECIAL_PRESET_NAMES,
  FEEDBACK_ENDPOINT,
  LAYOUT_RECIPES,
  FONT_STACKS
} = window.XVIConfig;
const { PALETTE_NAMES_EN, SPECIAL_PRESET_NAMES_EN, UI_TEXT_EN, UI_ATTRIBUTE_EN, RUNTIME_TEXT_EN } = window.XVII18n;
const {
  convertQuoteMarks,
  textConvertersForSelection,
  composeText
} = window.XVITextLayout;

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

function syncLanguageSwitch() {
  const languageButton = $("#languageToggleButton");
  languageButton?.classList.toggle("show-english", uiLanguage === "en");
  languageButton?.setAttribute("aria-label", uiLanguage === "en" ? "Switch interface language" : "切换界面语言");
  languageButton?.setAttribute("title", uiLanguage === "en" ? "Switch interface language" : "切换界面语言");
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
  if (blankDocument && uiLanguage === "en" && settings.fontFamily.value === "pingfang" && settings.titleFontFamily.value === "pingfang") {
    settings.fontFamily.value = "latinCambria";
    settings.titleFontFamily.value = "latinDisplay";
  } else if (blankDocument && uiLanguage === "zh" && settings.fontFamily.value === "latinCambria" && settings.titleFontFamily.value === "latinDisplay") {
    settings.fontFamily.value = "pingfang";
    settings.titleFontFamily.value = "pingfang";
  }
  const footerEdition = $("#previewFooter .footer-edition");
  if (footerEdition) footerEdition.textContent = uiLanguage === "en" ? "XVI / LONGFORM" : "XVI / 十六开";
  const savingNow = /正在保存|Saving/.test(elements.saveState.textContent);
  elements.saveState.textContent = uiLanguage === "en"
    ? (savingNow ? "Saving..." : "Autosaved")
    : (savingNow ? "正在保存..." : "已自动保存");
  syncLanguageSwitch();
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

// Generation, persistence, and explicit feedback submission.
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
  const body = composeText(rawText, settings.smartParagraph.checked);
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

const { exportImage } = window.XVIExporter.createExporter({
  settings,
  getGeneratedDocument: () => generatedDocument,
  isContentDirty: () => contentIsDirty,
  getLayoutTemplate: () => layoutTemplate,
  getAlignment: () => alignment,
  getExportFormat: () => exportFormat,
  getUiLanguage: () => uiLanguage,
  textParagraphs,
  showToast,
  exportScaleLabel
});

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
$("#languageToggleButton").addEventListener("click", () => applyUiLanguage(uiLanguage === "zh" ? "en" : "zh"));
$("#feedbackOpenButton").addEventListener("click", openFeedback);
$$("[data-feedback-close]").forEach((button) => button.addEventListener("click", closeFeedback));
elements.feedbackForm.addEventListener("submit", submitFeedback);
elements.feedbackForm.addEventListener("input", syncFeedbackSubmitState);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!$("#scriptPickerMenu").hidden) closeScriptPicker();
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
