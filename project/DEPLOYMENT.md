# Deployment and Rollback / 部署与回退

## Current production path

- GitHub: [`absurdeden-xvi/xvi-16k`](https://github.com/absurdeden-xvi/xvi-16k)
- Production branch: `main`
- Netlify project: `xvi-16k`
- Production URL: [xvi-16k.netlify.app](https://xvi-16k.netlify.app/)
- Publish directory: `project`
- Build command: none; Netlify publishes the static files directly

Every new commit on `main` triggers a production deployment. `_redirects` maps the root URL to `xvi-next.html`, so users never need a visible `.html` suffix.

## Before deployment

1. Confirm that the version and release date match in `README.md` and `CHANGELOG.md`.
2. Use one cache-version query parameter across `styles.css`, `xvi-next.css`, and `app-next.js`.
3. Confirm that `index.html` and `_redirects` still point to the current production workspace.
4. Test desktop input, generation, style controls, preview, and export.
5. Test input, preview, and bottom navigation at common iOS and Android widths.
6. Export both PNG and JPG and verify Standard, High, and Ultra pixel widths.
7. Test an empty title, empty author, very long body, rich text, and complex punctuation.
8. Confirm that article text is not sent to feedback or analytics services.

## Netlify Forms

The production form name is `xvi-feedback`. Keep these Netlify settings enabled:

- Form detection: on
- Submission notification: send new entries to `absurdedenxvi@gmail.com`
- Form fields: `form-name`, `message`, `email`, and `bot-field`

After changing form structure, deploy again so Netlify can rescan the fields.

## After deployment

1. Wait for Netlify to show `Published`.
2. Open the root URL and force refresh once to confirm the new asset version.
3. Check the browser console and font loading.
4. Generate and download a test long image.
5. Send feedback clearly marked as a test and confirm both the Netlify dashboard entry and email notification, then delete the test submission.

## Rollback

Prefer Netlify Deploy history and republish the latest stable deployment. Do not rewrite Git history to roll back the live site.

For a code-level rollback, create a new revert commit and push it to `main`. `legacy-v0.6.3.html` is only a visual and functional reference and never becomes the production root automatically.

---

# 中文部署与回退

## 当前发布链路

- GitHub：[`absurdeden-xvi/xvi-16k`](https://github.com/absurdeden-xvi/xvi-16k)
- 正式分支：`main`
- Netlify 项目：`xvi-16k`
- 正式地址：[xvi-16k.netlify.app](https://xvi-16k.netlify.app/)
- 发布目录：`project`
- 构建命令：无，直接发布静态文件

`main` 有新提交时，Netlify 自动开始生产部署。`_redirects` 将根网址映射到 `xvi-next.html`，用户无需访问带 `.html` 的地址。

## 发布前

1. 确认 `README.md` 和 `CHANGELOG.md` 的版本号与发布日期。
2. 将 `styles.css`、`xvi-next.css` 和 `app-next.js` 的查询参数统一为同一版本。
3. 检查 `index.html` 和 `_redirects` 仍指向当前正式入口。
4. 检查桌面端输入、生成、样式、预览和导出。
5. 检查 iOS 与 Android 常见宽度下的输入、预览和底部导航。
6. 分别导出 PNG 与 JPG，并验证普通、高清、超清像素宽度。
7. 检查标题为空、署名为空、超长正文、富文本和复杂标点。
8. 确认正文没有被发送到任何反馈或分析服务。

## Netlify Forms

正式表单名为 `xvi-feedback`。Netlify 项目需要保持以下设置：

- Form detection：开启
- 表单通知：新提交发送到 `absurdedenxvi@gmail.com`
- 页面表单字段：`form-name`、`message`、`email`、`bot-field`

修改表单结构后必须重新部署一次，Netlify 才会重新扫描字段。

## 发布后

1. 等待 Netlify 显示 `Published`。
2. 打开根网址，强制刷新一次，确认资源版本生效。
3. 检查浏览器控制台和字体加载。
4. 生成测试长图并下载。
5. 提交一条明确标记为测试的反馈，确认 Netlify 后台和邮箱通知均收到；完成后删除测试记录。

## 回退

优先使用 Netlify 的 Deploys 历史，将最近一次稳定部署重新发布。不要为了回退线上页面而强制改写 Git 历史。

如需代码层回退，应创建新的 revert 提交并推送到 `main`。`legacy-v0.6.3.html` 只用于视觉与功能对照，不会自动成为正式首页。
