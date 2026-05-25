# TRglass v1 — 玻璃拟态 UI 组件库

> 作者：童儿 · 仅供学习参考 · 请尊重每个人的知识产权

一款现代化**玻璃拟态（Glassmorphism）**UI 组件库，专为 Python Flask 项目设计。风格通透轻盈，开箱即用。

---

## ✨ 特性

- **玻璃拟态设计** — 毛玻璃质感，半透明层次，光影通透
- **响应式布局** — 完美适配桌面、平板、手机
- **深色/浅色主题** — 一键切换，暗光与明亮环境均舒适
- **丰富预制组件** — 导航栏、卡片、按钮、表单、模态框、表格、标签
- **简洁易用** — 复制即用，对现有项目零侵入

---

## 🚀 快速开始

```bash
pip install flask
python app.py
```

浏览器打开 `http://127.0.0.1:5000` 即可查看组件演示。

---

## 📂 项目结构

```
UI/
├── app.py                  # Flask 示例应用入口
├── requirements.txt        # Python 依赖
├── README.md               # 本文件
├── static/
│   ├── css/
│   │   ├── base.css        # 基础样式、CSS 变量、主题定义
│   │   ├── layout.css      # 布局辅助工具类
│   │   └── components/
│   │       ├── navbar.css  # 导航栏
│   │       ├── card.css    # 卡片容器
│   │       ├── button.css  # 按钮
│   │       ├── form.css    # 表单组件
│   │       ├── modal.css   # 模态框
│   │       ├── table.css   # 数据表格
│   │       └── badge.css   # 标签 / 徽章
│   └── js/
│       └── ui.js           # 交互逻辑
└── templates/
    ├── base.html           # 基础模板
    └── index.html          # 组件演示页
```

---

## 🧩 如何使用

### 1. 复制静态资源

将 `static/css/` 和 `static/js/` 目录复制到你的项目中。

### 2. 引入样式与脚本

```html
<link rel="stylesheet" href="/static/css/base.css">
<link rel="stylesheet" href="/static/css/layout.css">
<link rel="stylesheet" href="/static/css/components/card.css">
<link rel="stylesheet" href="/static/css/components/button.css">
<script src="/static/js/ui.js" defer></script>
```

按需按组件分别引入，避免加载无用样式。

### 3. 使用组件

```html
<!-- 卡片 -->
<div class="glass-card">
    <div class="card-header">标题</div>
    <div class="card-body">内容</div>
</div>

<!-- 按钮 -->
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>
```

---

## 🧾 组件列表

| 组件 | 核心类名 | 说明 |
|------|---------|------|
| 导航栏 | `.glass-navbar` | 顶部导航栏，支持深色/浅色 |
| 卡片 | `.glass-card` | 毛玻璃内容容器 |
| 按钮 | `.btn` / `.btn-*` | 主色、次要、轮廓、幽灵等样式 |
| 表单 | `.glass-input` | 输入框、下拉选择器 |
| 模态框 | `.glass-modal` | 居中弹窗，支持遮罩关闭 |
| 表格 | `.glass-table` | 带斑马纹的数据表格 |
| 标签 | `.badge` / `.badge-*` | 状态与分类标签 |

---

## 📄 许可

**by 童儿制作 · 仅供学习参考 · 请尊重每个人的知识产权**
