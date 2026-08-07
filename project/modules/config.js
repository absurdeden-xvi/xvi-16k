(function registerXviConfig(global) {
  "use strict";

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

  const LAYOUT_RECIPES = {
    folio: { titleSize: 56, titleWeight: 700, lineHeight: 1.88, paragraphSpacing: 1, pagePadding: 88, compositionStyle: "editorial", indent: true },
    book: { titleSize: 58, titleWeight: 600, lineHeight: 1.92, paragraphSpacing: 1, pagePadding: 88, compositionStyle: "editorial", indent: true },
    letter: { titleSize: 54, titleWeight: 600, lineHeight: 2, paragraphSpacing: 1.25, pagePadding: 86, compositionStyle: "open", indent: false },
    section: { titleSize: 68, titleWeight: 600, lineHeight: 1.86, paragraphSpacing: 1.25, pagePadding: 84, compositionStyle: "open", indent: false }
  };

  const FONT_STACKS = {
    latinDisplay: 'Didot, "Bodoni 72", "Bodoni MT", "Times New Roman", serif',
    latinCambria: 'Cambria, Georgia, "Times New Roman", Times, serif',
    latinSerif: 'Baskerville, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
    latinGeorgia: 'Georgia, Cambria, "Times New Roman", Times, serif',
    latinPalatino: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
    latinHumanist: '"Avenir Next", Avenir, "Segoe UI", Arial, sans-serif',
    latinGrotesk: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    latinMono: '"SFMono-Regular", Menlo, Monaco, Consolas, monospace',
    serif: '"XVI Noto Serif SC", "Songti SC", STSong, "Noto Serif CJK SC", serif',
    pingfang: '"PingFang SC", "PingFang TC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    "sans-serif": '"PingFang SC", "Microsoft YaHei", sans-serif',
    lxgw: '"LXGW WenKai", "Kaiti SC", KaiTi, serif',
    neoZhiSong: '"LXGW Neo ZhiSong", "Songti SC", "STSongti-SC-Regular", STSong, ui-serif, SimSun, serif',
    huiwen: '"Huiwen-mincho", "Songti SC", "STSongti-SC-Regular", STSong, ui-serif, SimSun, serif',
    zhuque: '"Zhuque Fangsong (technical preview)", "Zhuque Fangsong", STFangsong, FangSong, serif',
    yozai: '"Yozai", "Kaiti SC", KaiTi, serif',
    wenjin: '"WenJin Mincho Plane 0", "Songti SC", "STSongti-SC-Regular", STSong, ui-serif, serif',
    winsong: '"CorpSrcWinSong", "Songti SC", "STSongti-SC-Regular", STSong, ui-serif, serif',
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

  global.XVIConfig = Object.freeze({
    PRESETS,
    PALETTE_FAMILIES,
    PALETTE_NAMES,
    SPECIAL_PRESETS,
    SPECIAL_PRESET_NAMES,
    FEEDBACK_ENDPOINT: "https://xvi-16k.netlify.app/",
    LAYOUT_RECIPES,
    FORBIDDEN_LINE_START: new Set([..."，。！？；：、）》】」』〕〉”’…—～·,.!?;:%)]}›»"]),
    FORBIDDEN_LINE_END: new Set([..."（《【「『〔〈“‘([{‹«"]),
    FONT_STACKS
  });
})(window);
