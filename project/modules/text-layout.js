(function registerXviTextLayout(global) {
  "use strict";

  const { FORBIDDEN_LINE_START, FORBIDDEN_LINE_END } = global.XVIConfig;

  function convertQuoteMarks(text, nextMode) {
    if (nextMode === "traditional-tw") {
      return text.replace(/“/g, "「").replace(/”/g, "」").replace(/‘/g, "『").replace(/’/g, "』");
    }
    return text.replace(/「/g, "“").replace(/」/g, "”").replace(/『/g, "‘").replace(/』/g, "’");
  }

  function scriptLocale(mode) {
    if (mode === "traditional-hk") return "hk";
    if (mode === "traditional-tw") return "tw";
    return "cn";
  }

  function textConvertersForSelection(nextMode) {
    if (nextMode === "simplified") return [global.OpenCC.Converter({ from: "tw", to: "cn" })];
    const sourceLocale = nextMode === "traditional-hk" ? "tw" : "hk";
    return [
      global.OpenCC.Converter({ from: sourceLocale, to: "cn" }),
      global.OpenCC.Converter({ from: "cn", to: scriptLocale(nextMode) })
    ];
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

  function composeText(rawText, smartParagraph) {
    const normalized = rawText.replace(/\r\n?/g, "\n").replace(/\u00a0/g, " ").trim();
    if (!smartParagraph) return normalized;
    const explicitBlocks = normalized.split(/\n\s*\n+/).map(joinSoftWrappedLines).filter(Boolean);
    if (explicitBlocks.length > 1) return explicitBlocks.join("\n\n");
    return splitIntoBalancedParagraphs(explicitBlocks[0] || "").join("\n\n");
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

  function wrapText(ctx, text, maxWidth, spacing) {
    return wrapCharacters(ctx, text, maxWidth, spacing, 0);
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

  global.XVITextLayout = Object.freeze({
    convertQuoteMarks,
    textConvertersForSelection,
    composeText,
    drawTextWithSpacing,
    measuredWidth,
    wrapText,
    wrapCharacters,
    wrapParagraph
  });
})(window);
