# Privacy / 隐私说明

XVI / 十六开 uses local browser processing as its default privacy model.

## Data that stays in the browser

- Title, author, article body, and composition settings
- Automatically saved drafts
- Imported local fonts
- Generated and exported images

Article text and settings are stored in the current browser's `localStorage` under the key `xvi-next-v1`. Clearing site data removes the draft and makes it unrecoverable.

Imported fonts are loaded only for the current page session and are not uploaded by XVI. They usually need to be imported again after a refresh.

## Network requests

### Online fonts

The page requests selected font files from third-party font CDNs. Those services may record ordinary network metadata such as IP address, browser, and request time under their own policies, but they do not receive the user's article text.

### Feedback

When a user intentionally selects Send, only the feedback text, the Netlify form name, the optional contact email, and anti-spam fields are submitted to Netlify Forms. Article title, author, body, composition settings, drafts, and generated images are never attached.

Netlify receives the feedback and notifies the project email. Users can avoid the form and email [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com) directly.

### Hosting logs

The site is hosted by Netlify. As with an ordinary static website, the hosting provider may record basic request logs such as IP address, time, path, and browser. XVI currently includes no independent analytics, advertising, or user-tracking scripts.

## Image export

PNG and JPG files are generated and downloaded locally through the browser Canvas API. They are not uploaded to the cloud first.

## Contact

Privacy questions can be sent to [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com).

---

# 中文隐私说明

XVI / 十六开以本地处理为默认原则。

## 留在浏览器中的内容

- 标题、署名、正文和排版设置
- 自动保存的草稿
- 导入的本地字体
- 生成与导出的图片

正文和设置保存在当前浏览器的 `localStorage` 中，键名为 `xvi-next-v1`。清除该站点的浏览器数据后，草稿无法恢复。

导入字体只在当前页面会话中载入，不上传到服务器；刷新页面后通常需要重新导入。

## 会发生网络请求的情况

### 在线字体

页面会从第三方字体 CDN 请求部分字体文件。字体服务可能按照其自身政策记录 IP、浏览器和请求时间等常规网络信息，但不会收到用户正文。

### 来信

用户主动点击“发送”时，只有反馈输入框中的文字、可选联系邮箱、Netlify 表单名和防垃圾字段会提交给 Netlify Forms。文章标题、署名、正文、排版设置和生成图片不会随反馈发送。

反馈会由 Netlify 代收并通知项目邮箱。用户也可以不使用表单，直接发送邮件至 [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)。

### 托管日志

网站由 Netlify 托管。与普通静态网站相同，托管平台可能记录访问 IP、时间、路径、浏览器等基础请求日志。项目当前未接入独立统计脚本、广告或用户追踪系统。

## 图片导出

PNG 和 JPG 由浏览器 Canvas 在本地生成并下载，不会先上传到云端。

## 联系

隐私问题可发送至 [absurdedenxvi@gmail.com](mailto:absurdedenxvi@gmail.com)。
