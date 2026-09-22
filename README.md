# Tools

一些零散的 HTML 小工具集合，纯前端实现，无需后端服务，浏览器直接打开即可使用。

## 工具列表

### 考点复习计划表

[在线预览](https://htmlpreview.github.io/?https://github.com/Boome-Lancer/tools/blob/main/tools/%E8%80%83%E7%82%B9%E5%A4%8D%E4%B9%A0%E8%AE%A1%E5%88%92%E8%A1%A8.html)

基于艾宾浩斯遗忘曲线的考点复习计划表，按 +1 / +2 / +4 / +7 / +15 天节点安排复习，适配手机与电脑。

- 可设置开始日期、总考点（默认 80）、每日考点（默认 2）；修改开始日期后自动完成今日之前的任务
- 顶部「今日计划」大卡片，今日新学附带 5 分钟 / 30 分钟 / 12 小时计时补记
- 展开 / 折叠 / 折叠已完成 / 只看未完成视图，进度条与已学习天数统计
- 进度导出 / 导入 JSON 备份（换浏览器、file:// 与在线版之间迁移）
- 「关于」弹窗含工具说明与艾宾浩斯复习法介绍
- 跟随系统深色 / 浅色模式；打印时自动隐藏控制面板与今日计划卡片
- 勾选进度保存在浏览器 localStorage

### 刷单/兼职效益计算器

[在线预览](https://htmlpreview.github.io/?https://github.com/Boome-Lancer/tools/blob/main/tools/%E5%88%B7%E5%8D%95%E5%85%BC%E8%81%8C%E6%95%88%E7%9B%8A%E8%AE%A1%E7%AE%97%E5%99%A8.html)

根据投入成本、成功率、期望收益等参数，快速计算刷单或兼职项目的预期效益与等效薪资。

- 支持自定义收益、惩罚金额、成功率、保证金、每单耗时
- 自动计算回本所需单数与时间
- 支持多种时间/薪资单位切换

### 山东电费计算器

[在线预览](https://htmlpreview.github.io/?https://github.com/Boome-Lancer/tools/blob/main/tools/%E5%B1%B1%E4%B8%9C%E7%94%B5%E8%B4%B9%E8%AE%A1%E7%AE%97%E5%99%A8.html)

基于山东省居民阶梯电价制度，根据用电量计算电费。

- 支持第一、二、三阶梯电价
- 支持按月/按年计费方式
- 清晰展示各阶梯费用明细

### 色值转纯色图片工具

[在线预览](https://htmlpreview.github.io/?https://github.com/Boome-Lancer/tools/blob/main/tools/%E8%89%B2%E5%80%BC%E8%BD%AC%E7%BA%AF%E8%89%B2%E5%9B%BE%E7%89%87%E5%B7%A5%E5%85%B7.html)

将输入的十六进制色值或通过拾色器选取的颜色，快速生成指定尺寸的纯色图片并支持下载。

- 支持 HEX / RGB / HSL 色值输入
- 自定义图片尺寸
- 一键导出 PNG 格式图片

### AI 对话纯文本复制（Chrome 插件）

本地加载的浏览器扩展，为常见 AI 对话站点的气泡追加「复制纯文本」按钮，离线运行、不依赖服务器。

- 支持 DeepSeek、豆包、ChatGPT、Gemini、Kimi、通义等站点
- 在 `chrome://extensions` 开启开发者模式后「加载已解压的扩展程序」，选择 `ai-copy-cleaner/` 目录即可

## 目录结构

```
tools/
├── tools/                          # HTML 小工具目录
│   ├── 考点复习计划表.html
│   ├── 刷单兼职效益计算器.html
│   ├── 山东电费计算器.html
│   └── 色值转纯色图片工具.html
├── ai-copy-cleaner/                # AI 对话纯文本复制 Chrome 插件
│   ├── manifest.json
│   ├── content.js
│   └── style.css
├── 参考/                           # 参考资料
│   ├── 刷单计算.xlsx
│   ├── 山东省发展和改革委员会关于居民阶梯电价制度有关事项的通知.txt
│   └── 国家电网居民生活用电计费标准.png
├── 需求说明.txt
└── README.md
```

## 使用方式

将仓库克隆到本地后，直接用浏览器打开 `tools/` 目录下对应的 `.html` 文件即可；也可通过上方「在线预览」链接访问。

```bash
git clone https://github.com/Boome-Lancer/tools.git
```
