(function registerXviExporter(global) {
  "use strict";

  const { FONT_STACKS, FORBIDDEN_LINE_START, FORBIDDEN_LINE_END } = global.XVIConfig;
  const { drawTextWithSpacing, wrapText } = global.XVITextLayout;

  function createExporter(dependencies) {
    const {
      settings,
      getGeneratedDocument,
      isContentDirty,
      getLayoutTemplate,
      getAlignment,
      getExportFormat,
      getUiLanguage,
      textParagraphs,
      showToast,
      exportScaleLabel
    } = dependencies;

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
      const generatedDocument = getGeneratedDocument();
      const layoutTemplate = getLayoutTemplate();
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
      }[layoutTemplate];
      const contentX = padding + templateGeometry.inset;
      const usableWidth = fullWidth * templateGeometry.ratio - templateGeometry.inset * 2;
      const sectionTitleInset = layoutTemplate === "section" && sectionNumber ? Math.min(170, Number(settings.sectionNumberSize.value) * 1.35) : 0;
      const titleX = contentX + sectionTitleInset;
      const titleWidth = layoutTemplate === "section" ? usableWidth - sectionTitleInset : (["book", "letter"].includes(layoutTemplate) ? usableWidth * 0.84 : usableWidth);
      const bodyX = contentX;
      const bodyWidth = usableWidth;
      const measure = document.createElement("canvas").getContext("2d");
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
      const generatedDocument = getGeneratedDocument();
      const layoutTemplate = getLayoutTemplate();
      if (!generatedDocument || isContentDirty()) {
        showToast("请先完成自动排版");
        return;
      }
      await document.fonts.ready;
      const layout = getCanvasLayout(Number(document.querySelector("#exportScale").value));
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
          if (getAlignment() === "center") x += (layout.bodyWidth - lineWidth) / 2;
          else if (paragraphIndex === 0 && settings.leadStyle.value === "color") x += 42;
          else if (paragraphIndex === 0 && settings.leadStyle.value === "line") x += 38;
          else x += indent;
          ctx.fillStyle = paragraphIndex === 0 && settings.leadStyle.value === "color" ? settings.accentColor.value : settings.textColor.value;
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
        const mark = getUiLanguage() === "en" ? "XVI / LONGFORM" : "XVI / 十六开";
        ctx.fillText(mark, layout.bodyX + layout.bodyWidth - ctx.measureText(mark).width, y);
        ctx.globalAlpha = 1;
      }

      const exportFormat = getExportFormat();
      const mimeType = exportFormat === "jpeg" ? "image/jpeg" : "image/png";
      const extension = exportFormat === "jpeg" ? "jpg" : "png";
      canvas.toBlob((blob) => {
        if (!blob) return showToast("导出失败，请稍后重试");
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const requestedName = document.querySelector("#exportFileName").value.trim() || generatedDocument.title;
        link.download = `${requestedName.replace(/[\\/:*?"<>|]/g, "-")}.${extension}`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        showToast(`${exportScaleLabel()}图片已保存`);
      }, mimeType, exportFormat === "jpeg" ? 0.94 : undefined);
    }

    return Object.freeze({ exportImage, getCanvasLayout });
  }

  global.XVIExporter = Object.freeze({ createExporter });
})(window);
