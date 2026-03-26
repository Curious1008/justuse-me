# JustUse.me SEO Growth Strategy — Design Spec

## One-liner

通过 AI 批量生成内容 + 程序化长尾页面 + 技术 SEO 优化，最大化 Google 有机流量。

## Context

JustUse.me 是一个浏览器端文件工具箱，50 个工具，5 个分类。已有 sitemap（多语言）、robots.txt、llms.txt。Google Search Console 已接入但流量极低（新站阶段）。目标是英文市场优先，中文为辅。

当前 SEO 基础：
- 每个工具有独立路由 `/tools/[tool-id]`，有 meta title/description
- sitemap 覆盖所有页面，支持 en/zh-CN/zh-TW
- llms.txt 针对 AI 搜索引擎优化（有数据不一致需修复）
- 无博客/内容页面，无结构化数据，无内链网络

---

## 1. Tool Page Enrichment

为 50 个工具页各增加 3 个内容区块（放在工具 UI 下方）：

### a. "How to" 步骤

- 3-5 步操作指南，针对该工具的具体操作
- 使用 `<ol>` 有序列表
- 添加 HowTo 结构化数据（Schema.org）
- 目标查询：`how to [action] online free`

### b. FAQ

- 3-5 个常见问题和回答
- 问题来源：Google "People Also Ask" 对应关键词
- 添加 FAQPage 结构化数据
- 目标：抢占 Google 精选摘要（Featured Snippets）

### c. "Why JustUse.me" 对比段落

- 简短对比 vs Smallpdf、iLovePDF 等竞品
- 强调隐私（不上传文件）、无水印、无需注册
- 目标查询：`best [tool] online`、`[tool] without watermark`

### 内容生成

所有内容由 Sonnet 预生成，存为静态数据在代码仓库中（不是运行时获取）。这样页面速度不受影响，对 SEO 友好。

---

## 2. /news Content Engine

### 概述

新增 `/news` 栏目，通过 AI 批量生成文章。覆盖工具页本身抓不到的信息型和对比型搜索词。

### 内容类型

| 类型 | 示例 | 内链目标 |
|------|------|----------|
| 教程 | "How to Compress PDF Under 1MB for Email" | compress-pdf |
| 对比 | "HEIC vs JPG: Which Format Should You Use?" | heic-to-jpg |
| 场景 | "Best Free Tools for Students to Edit PDFs" | 多个工具 |
| 趋势 | "Why Browser-Based Tools Are Replacing Desktop Software in 2026" | 全站 |

### 文章结构

- 标题（H1，包含目标关键词）
- TL;DR 摘要段落
- 正文（800-1500 词，带小标题）
- 内链到相关工具（自然嵌入，卡片样式）
- 侧边栏推荐相关文章（桌面端）/ 底部推荐（移动端）
- Article 结构化数据

### 生成量

每天 2-3 篇，月产 60-90 篇。

---

## 3. /news UI 设计

### 设计原则

和现有工具页保持完全一致的视觉语言：同样的字体、配色、间距、暗色模式支持、Framer Motion 动效。

### /news 列表页

- 顶部标题 + 简短描述
- 文章卡片网格（和工具列表页风格一致：同样的圆角、阴影、hover 效果）
- 每张卡片：标题 + 摘要 + 发布日期 + 关联工具标签
- 分页或无限滚动
- 支持按类型筛选（教程 / 对比 / 场景 / 趋势）

### /news/[slug] 文章页

- 共用全站 Header / Footer
- 文章内容区：最大宽度限制（prose 排版），舒适行高和段间距
- 内链工具用卡片样式：工具图标 + 名称 + 一句话描述，hover 有动效
- 侧边栏（桌面端）：相关文章 + 相关工具
- 移动端：侧边栏内容折叠到文章底部
- 暗色 / 亮色模式跟随全站设置

### 组件复用

- 复用：Header、Footer、ThemeToggle、ToolCard
- 新增：ArticleCard、ArticleContent、ArticleFilter — 风格对齐现有组件

---

## 4. Programmatic Long-tail Pages

### 概述

针对高搜索量工具，生成变体落地页覆盖更具体的长尾词。

### URL 结构

`/tools/[tool-id]/[variation-slug]`

示例：
- `/tools/merge-pdf/for-students`
- `/tools/compress-image/for-email`
- `/tools/heic-to-jpg/iphone-photos`

### 页面内容

- 共用工具页的工具 UI（DropZone、处理、下载）
- 标题、描述、教程步骤、FAQ 都针对该变体场景定制
- 例如 "for-students" 版本的 FAQ 包含 "Can I merge my assignment PDFs?"

### 生成方式

- 维护变体配置表（tool_id + variation_slug + target_keyword + context）
- Sonnet 根据配置生成定制内容（标题、描述、步骤、FAQ）
- 存为静态数据，build 时生成页面

### 优先级

不是所有 50 个工具都需要变体。优先做搜索量大的：

| 优先级 | 工具 | 变体数 |
|--------|------|--------|
| P0 | merge-pdf, compress-pdf, pdf-to-jpg | 各 5 个 |
| P0 | compress-image, heic-to-jpg, resize-image | 各 5 个 |
| P1 | 其余 top 10 工具 | 各 3 个 |
| 总计 | ~30-50 个新页面 | |

### 防重复内容

- 每个变体页有足够差异化的内容（不同标题、步骤描述、FAQ）
- canonical 指向自身（内容不同于主工具页）
- `<link rel="alternate">` 关联主工具页

---

## 5. Cloudflare Worker Cron

### 架构

独立的 Cloudflare Worker 项目（和 JustUse.me 主站分离），参考 Pathfinder 的 cron 模式但独立实现。

### 定时任务

- 每天跑一次（UTC 早上，美国用户活跃前）
- 负责生成 /news 文章

### 流程

1. 从关键词库取当天待生成的主题（2-3 个）
2. 调 Sonnet API 生成文章
3. Prompt 模板包含：目标关键词、文章类型、内链工具列表、语气要求
4. 生成结果存入 Supabase（articles 表）
5. Next.js 用 ISR 从 Supabase 读取渲染

### 关键词库

- 初始库手动整理（Google Keyword Planner / Ahrefs / People Also Ask）
- 按优先级排序（搜索量 × 竞争度）
- Worker 每天按顺序消费，用完后手动补充
- 存在 Supabase 或 Worker KV 中

### 质量控制

- Prompt 硬性要求：不用 AI 套话（"In today's digital age" 等）、每段有具体信息、内链自然嵌入
- 文章长度 800-1500 词
- 可选：二次 Sonnet 调用做质量检查 / 改写

### Supabase articles 表

```sql
CREATE TABLE public.articles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tutorial', 'comparison', 'use-case', 'trend')),
  tools TEXT[] NOT NULL DEFAULT '{}',
  keywords TEXT[] NOT NULL DEFAULT '{}',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_slug ON public.articles (slug);
CREATE INDEX idx_articles_category ON public.articles (category);
CREATE INDEX idx_articles_published ON public.articles (published_at DESC);
```

### 成本

- 每篇文章 ~2-3K input + 2-3K output tokens
- 3 篇/天 ≈ 15K tokens/天 ≈ $0.15/天 ≈ $4.5/月
- Cloudflare Worker 免费额度足够

---

## 6. SEO Technical Optimization

### 结构化数据

| 页面 | Schema 类型 |
|------|-------------|
| 工具页 | WebApplication + HowTo + FAQPage |
| /news 文章页 | Article |
| 首页 | Organization |

### 内链策略

- 工具页底部加 "相关工具" 推荐（同 category）
- /news 文章内自然链接到工具页（卡片样式）
- 工具页 FAQ 里链接到相关 /news 文章
- 形成工具页 ↔ 文章页的双向链接网络

### 技术要求

- 所有新页面 SSG/ISR，不能纯客户端渲染
- `<title>` 和 `<meta description>` 每页唯一，包含目标关键词
- 图片加 `alt` 属性
- hreflang 覆盖所有新页面的三个语言版本
- llms.txt 更新：加入新工具和 /news 描述
- llms.txt 修复：价格 $9.9/月、限制 3 次/天（当前数据不一致）

### 页面速度

- /news 文章页保持轻量（纯文本 + 少量图片，不加载工具库）
- Core Web Vitals 不能因新内容下降

---

## Implementation Phases

### Phase A — Tool Page Enrichment（最快见效）
- 生成 50 个工具的 HowTo + FAQ + 对比内容
- 添加结构化数据
- 添加相关工具推荐

### Phase B — /news 基础设施
- Supabase articles 表
- /news 列表页 + /news/[slug] 文章页 UI
- ISR 渲染

### Phase C — Cloudflare Worker Cron
- 独立 Worker 项目
- 关键词库 + Sonnet 生成 pipeline
- 质量控制 prompt

### Phase D — 程序化长尾页面
- 变体配置表
- 变体内容生成
- /tools/[tool-id]/[variation] 页面模板

### Phase E — 技术 SEO 收尾
- 内链网络完善
- llms.txt 更新修复
- hreflang 覆盖新页面
- 性能验证
