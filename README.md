# LED Banner Tool

> 专业 LED 滚动字幕制作工具 — 瞬间将你的设备变为炫酷的 LED 显示屏招牌

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06b6d4.svg)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success)

[🚀 在线演示](https://orsonkrennlc.github.io/led-banner-tool/)

---

## ✨ 功能特性

### 🎨 文字自定义
- **14+ 精选字体**：Orbitron、Bangers、Press Start 2P、Bungee Shade 等特色字体
- **字号调节**：20px - 200px 连续可调
- **文字颜色**：10 种霓虹色预设 + 自定义取色器
- **样式控制**：粗体、斜体、左/中/右对齐
- **描边效果**：可开关 + 自定义描边颜色
- **发光阴影**：可开关 + 自定义阴影颜色，独立于全局发光设置

### 🌅 背景效果
- **纯色背景**：10 色预设 + 自定义
- **渐变背景**：赛博、派对、日落、海洋、黑客 5 种预设
- **LED 点阵**：可开关 + 密度调节，还原真实 LED 屏幕质感
- **亮度调节**：20% - 150% 连续可调
- **全局发光**：控制整体霓虹辉光强度

### ⚡ 滚动控制
- **5 种模式**：向左、向右、向上、向下、静止
- **速度调节**：1 - 10 档速度
- **闪烁效果**：可开关 + 速度调节

### 💎 边框特效
- **8 种边框样式**：无边框、实线、双线、虚线、点状、霓虹发光、脉冲霓虹、渐变边框
- **自定义边框颜色**：10 色预设 + 取色器
- **4 种快速预设**：赛博粉、冰蓝光、黑客绿、落日橙，一键切换整套风格

### 📺 全屏播放
- 点击预览区或导航栏按钮进入全屏
- 空格键暂停/继续
- 双击或 ESC 键退出
- 自适应屏幕尺寸，文字居中缩放

### 🎬 视频导出
- **4 种分辨率**：横屏 1280×400、横屏 1920×600、竖屏 400×800、正方形 800×800
- **4 种时长**：5秒、10秒、15秒、30秒
- 导出为 WebM 视频，可直接在浏览器播放或转换为 GIF
- 实时导出进度显示

### 📱 响应式设计
- **桌面端**：左右分栏布局（预览 + 编辑面板）
- **平板 / 手机**：上下布局，触控优化，按钮 ≥ 44px
- 支持横屏 / 竖屏自适应

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 即可预览

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录，可直接部署到任意静态托管服务。

### 预览生产构建

```bash
npm run preview
```

### 类型检查

```bash
npm run check
```

---

## 🛠 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 前端框架 | React 18 | 函数式组件 + Hooks |
| 语言 | TypeScript 5 | 类型安全 |
| 构建工具 | Vite 6 | 极速 HMR、快速构建 |
| 样式方案 | Tailwind CSS 3 | 原子化 CSS、深色主题 |
| 状态管理 | Zustand | 轻量级状态管理 |
| 图标库 | Lucide React | 精美开源图标 |
| LED 渲染 | Canvas 2D API | 高性能点阵渲染 |
| 动画引擎 | requestAnimationFrame | 60fps 流畅滚动 |
| 视频导出 | MediaRecorder API | 浏览器原生录制 |
| 部署方式 | 静态文件 | 零后端依赖 |

---

## 📁 项目结构

```
led-banner-tool/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx              # 应用入口
    ├── App.tsx               # 根组件
    ├── index.css             # 全局样式 + Tailwind
    ├── pages/
    │   └── Home.tsx          # 主页面
    ├── types/
    │   └── index.ts          # TypeScript 类型定义
    ├── store/
    │   └── ledStore.ts       # Zustand 全局状态
    ├── hooks/
    │   ├── useLEDRender.ts   # LED Canvas 渲染 Hook
    │   └── useExportVideo.ts # 视频导出 Hook
    ├── utils/
    │   ├── constants.ts      # 常量配置(字体/颜色/边框)
    │   └── borderStyles.ts   # 边框样式计算
    └── components/
        ├── Navbar.tsx        # 导航栏
        ├── Preview/
        │   ├── LEDPreview.tsx      # LED 预览区
        │   └── FullscreenPlayer.tsx # 全屏播放器
        ├── Panels/
        │   ├── TextPanel.tsx       # 文字设置面板
        │   ├── BackgroundPanel.tsx # 背景设置面板
        │   ├── ControlPanel.tsx    # 控制面板
        │   └── EffectPanel.tsx     # 效果面板
        └── UI/
            ├── TabBar.tsx          # 标签栏
            └── ExportModal.tsx     # 导出弹窗
```

---

## 🎯 使用场景

- 🎤 **演唱会应援**：制作专属应援 LED 手牌
- 🏪 **店铺招牌**：临时促销、欢迎语展示
- 🎉 **派对氛围**：生日派对、婚礼现场、年会
- 📢 **活动引导**：会议指引、展览标识
- 🎓 **学习演示**：LED 屏效学习参考
- 📱 **竖屏手持**：手机竖屏滚动文字应援

---

## 📦 部署方式

构建产物为纯静态文件，支持多种部署方式：

### Vercel / Netlify
直接连接 GitHub 仓库，一键部署。

### GitHub Pages

使用 `gh-pages` 工具一键部署：

```bash
npm run deploy
```

该命令会自动构建项目并将 `dist` 目录发布到 `gh-pages` 分支。

在仓库 Settings → Pages 中，将 Source 设置为 **Deploy from a branch**，Branch 选择 **gh-pages** / **root**，等待几分钟即可访问。

### 自建服务器

```bash
npm run build
# 将 dist 目录上传到服务器，用 Nginx / Apache 托管
```

### Docker
使用任意静态文件服务器镜像（如 nginx、caddy）挂载 `dist` 目录。

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

---

## 📄 许可证

本项目基于 MIT 协议开源 - 详见 [LICENSE](LICENSE) 文件。

---

## 💡 路线图

- [ ] GIF 原生导出支持
- [ ] 自定义背景图片上传
- [ ] 模板保存与本地存储
- [ ] 更多字体支持
- [ ] 文字特效（渐变色、彩虹）
- [ ] PWA 离线使用支持
- [ ] 多语言国际化

---

<p align="center">
  <strong>用霓虹点亮创意 ✨</strong>
  <br>
  <sub>Made with ❤️ using React + TypeScript</sub>
</p>
