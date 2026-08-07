const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const projectRoot = path.resolve(__dirname, "..");
const noop = () => {};
const classList = { add: noop, remove: noop, toggle: noop, contains: () => false };
const canvasContext = {
  font: "",
  fillStyle: "",
  globalAlpha: 1,
  textAlign: "left",
  measureText: (text) => ({ width: [...String(text)].length * 10 }),
  fillText: noop,
  fillRect: noop,
  beginPath: noop,
  roundRect: noop,
  fill: noop,
  scale: noop
};

let sharedElement;
function makeElement() {
  const target = {
    value: "",
    checked: false,
    hidden: true,
    disabled: false,
    innerText: "",
    textContent: "",
    innerHTML: "",
    dataset: {},
    style: { setProperty: noop },
    classList,
    childNodes: [],
    children: [],
    addEventListener: noop,
    setAttribute: noop,
    removeAttribute: noop,
    appendChild: noop,
    replaceChildren: noop,
    focus: noop,
    blur: noop,
    click: noop,
    scrollTo: noop,
    contains: () => false,
    closest: () => null,
    querySelector: () => sharedElement,
    querySelectorAll: () => [],
    getAttribute: () => "",
    getContext: () => canvasContext,
    toBlob: (callback) => callback({})
  };
  return new Proxy(target, { get: (object, key) => key in object ? object[key] : "" });
}

sharedElement = makeElement();
const document = {
  body: makeElement(),
  documentElement: { dataset: {} },
  fonts: { ready: Promise.resolve(), add: noop },
  querySelector: () => sharedElement,
  querySelectorAll: () => [],
  createTreeWalker: () => ({ nextNode: () => null, currentNode: null }),
  createElement: () => makeElement(),
  addEventListener: noop,
  execCommand: noop,
  getSelection: () => null
};
const storage = new Map();
const context = {
  console,
  document,
  localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, String(value)) },
  NodeFilter: { SHOW_TEXT: 4 },
  Node: { TEXT_NODE: 3, ELEMENT_NODE: 1 },
  URL: { createObjectURL: () => "blob:test", revokeObjectURL: noop },
  FontFace: function FontFace() {},
  setTimeout: () => 1,
  clearTimeout: noop,
  requestAnimationFrame: (callback) => callback(),
  fetch: async () => ({}),
  innerWidth: 1200,
  scrollTo: noop,
  addEventListener: noop
};
context.window = context;
vm.createContext(context);

const scripts = [
  "modules/config.js",
  "modules/i18n.js",
  "modules/text-layout.js",
  "modules/exporter.js",
  "app-next.js"
];
scripts.forEach((file) => vm.runInContext(fs.readFileSync(path.join(projectRoot, file), "utf8"), context, { filename: file }));

assert.strictEqual(Object.keys(context.XVIConfig.PRESETS).length, 35, "palette registry changed unexpectedly");
assert.strictEqual(context.XVITextLayout.convertQuoteMarks("“测试”", "traditional-tw"), "「测试」");
assert.strictEqual(context.XVITextLayout.composeText("第一段\n折行\n\n第二段", true), "第一段折行\n\n第二段");
assert.strictEqual(typeof context.XVIExporter.createExporter, "function");

const setting = (value, checked = false) => ({ value: String(value), checked });
const exporter = context.XVIExporter.createExporter({
  settings: {
    contentWidth: setting(896), pagePadding: setting(88), fontSize: setting(32), titleSize: setting(56),
    titleWeight: setting(700), lineHeight: setting(1.9), letterSpacing: setting(1), paragraphSpacing: setting(1),
    leadScale: setting(1.05), compositionStyle: setting("editorial"), sectionNumber: setting(""),
    sectionNumberSize: setting(82), indent: setting("", true), leadStyle: setting("color"),
    titleFontFamily: setting("serif"), fontFamily: setting("serif"), signature: setting("", true),
    header: setting("", true)
  },
  getGeneratedDocument: () => ({ title: "测试标题", author: "作者" }),
  isContentDirty: () => false,
  getLayoutTemplate: () => "folio",
  getAlignment: () => "left",
  getExportFormat: () => "png",
  getUiLanguage: () => "zh",
  textParagraphs: () => [[{ text: "这是一段用于验证导出布局的正文。", bold: false, italic: false, underline: false, strike: false }]],
  showToast: noop,
  exportScaleLabel: () => "高清"
});
const canvasLayout = exporter.getCanvasLayout(2);
assert.strictEqual(canvasLayout.width, 896);
assert.strictEqual(canvasLayout.scale, 2);
assert(canvasLayout.height > 0 && canvasLayout.titleLines.length > 0 && canvasLayout.paragraphs.length === 1);

const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const loadedScripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1].split("?")[0]);
scripts.slice(0, -1).forEach((file) => assert(loadedScripts.includes(file), `${file} is not loaded by index.html`));
assert(loadedScripts.indexOf("modules/config.js") < loadedScripts.indexOf("modules/text-layout.js"), "module load order is invalid");
assert(loadedScripts.indexOf("modules/exporter.js") < loadedScripts.indexOf("app-next.js"), "exporter must load before app-next.js");

console.log("XVI module smoke test passed.");
