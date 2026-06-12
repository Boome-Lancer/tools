# Tools

一些零散的 HTML 小工具集合，纯前端实现，无需后端服务，浏览器直接打开即可使用。

## 工具列表

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

## 目录结构

```
tools/
├── tools/                          # 工具目录
│   ├── 刷单兼职效益计算器.html
│   ├── 山东电费计算器.html
│   └── 色值转纯色图片工具.html
├── 参考/                           # 参考资料
│   ├── 刷单计算.xlsx
│   ├── 山东省发展和改革委员会关于居民阶梯电价制度有关事项的通知.txt
│   └── 国家电网居民生活用电计费标准.png
├── 需求说明.txt
└── README.md
```

## 使用方式

将仓库克隆到本地后，直接用浏览器打开 `tools/` 目录下对应的 `.html` 文件即可。

```bash
git clone https://github.com/Boome-Lancer/tools.git
```
