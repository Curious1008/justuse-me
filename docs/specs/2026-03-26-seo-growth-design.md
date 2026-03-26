# JustUse.me SEO Growth Strategy — Design Spec

## One-liner

通过 AI 批量生成内容 + 程序化长尾页面 + 技术 SEO 优化，最大化 Google 有机流量。

## Context

JustUse.me 是一个浏览器端文件工具箱，50 个工具，5 个分类。已有 sitemap（多语言）、robots.txt、llms.txt。Google Search Console 已接入但流量极低（新站阶段）。目标是英文市场优先，中文为辅。

当前 SEO 基础：
- 每个工具有独立路由 `/[lang]/tools/[tool-id]`，有 meta title/description
- sitemap 覆盖所有页面，支持 en/zh-CN/zh-TW
- llms.txt 针对 AI 搜索引擎优化（有数据不一致需修复）
- 工具页已有部分 SEO 内容（见下方 Section 1 "已有 vs 新增" 说明）

路由约定：所有用户可见页面都在 `src/app/[lang]/` 下，URL 带语言前缀（en 为默认可省略）。本 spec 中所有 URL 示例省略 `[lang]` 前缀，实际实现时需包含。

---

## 1. Tool Page Enrichment

### 已有 vs 新增

工具页已有以下 SEO 内容（`tool-seo-content.ts`）：
- **已有**: `longDescription`（About 段落）、`steps`（How it works 步骤卡片）、`faq`（FAQ 折叠面板）、`related`（相关工具推荐）
- **已有结构化数据**: WebApplication + FAQPage JSON-LD（`seo.ts`）

需要新增的工作：

### a. HowTo 结构化数据（新增）

- 当前 `seo.ts` 生成 WebApplication + FAQPage，但缺少 HowTo schema
- 新增 HowTo JSON-LD，复用现有 `steps` 数据
- 目标：抢占 Google "How to" 富片段

### b. "Why JustUse.me" 对比段落（新增）

- 在现有 FAQ 下方新增对比区块
- 简短对比 vs Smallpdf、iLovePDF 等竞品
- 强调隐私（不上传文件）、无水印、无需注册
- 目标查询：`best [tool] online`、`[tool] without watermark`
- 内容由 Sonnet 预生成，存在 `tool-seo-content.ts` 中

### c. FAQ 内容增强（改进）

- 现有 FAQ 问题偏通用，需要用 Google "People Also Ask" 数据补充更有针对性的问题
- 由 Sonnet 根据关键词研究重新生成，替换现有内容

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

### 语言策略

/news 文章**仅生成英文**。原因：
- 英文是主要 SEO 目标市场
- 多语言会使 Sonnet 成本翻倍
- 中文用户可通过浏览器翻译访问
- zh-CN / zh-TW 用户访问 /news 时，页面正常显示英文内容（Header/Footer 仍跟随语言设置）
- hreflang 不需要为 /news 页面生成中文变体

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

- 维护变体配置 JSON 文件（在代码仓库中：`src/tools/variations.json`）
- 每条记录：tool_id + variation_slug + target_keyword + context
- Sonnet 根据配置生成定制内容（标题、描述、步骤、FAQ），结果也存为仓库中的静态 JSON
- `generateStaticParams` 从变体配置文件读取，build 时静态生成所有变体页面
- 新增变体 = 编辑 JSON + 运行生成脚本 + 提交 + 重新部署

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

分两层：

**a. 通用 cron-content-worker 模板（可复用）**

一个独立的 Cloudflare Worker 项目模板，可用于任何需要 "定时调 AI 生成内容 → 存入数据库" 的项目。

模板提供：
- Cron trigger 骨架（`scheduled` handler）
- Anthropic SDK 调用封装（支持自定义 base_url + api_key）
- Supabase 写入封装（service_role client）
- Prompt 模板系统（项目通过配置注入自己的 prompt）
- 关键词队列消费逻辑（从数据库/KV 取下一批待生成主题）
- 错误处理 + 重试 + 日志

模板仓库：`~/cron-content-worker/`（独立 repo，其他项目 fork 或 npm 引用）

**b. JustUse.me 实例（项目特定）**

基于模板创建的 JustUse.me 专用 Worker，配置：
- Prompt 模板（文章类型、内链工具列表、语气要求）
- Supabase articles 表 schema
- 关键词库

### AI API 配置

使用第三方 Anthropic 代理：
- **Base URL**: `https://api.aicodemirror.com/api/claudecode`
- **Model**: `claude-sonnet-4-5-20250929`
- 存为 Worker Secrets：`ANTHROPIC_API_KEY`、`ANTHROPIC_BASE_URL`

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
  summary TEXT NOT NULL,           -- 同时用作 meta description
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tutorial', 'comparison', 'use-case', 'trend')),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  tools TEXT[] NOT NULL DEFAULT '{}',
  keywords TEXT[] NOT NULL DEFAULT '{}',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_slug ON public.articles (slug);
CREATE INDEX idx_articles_category ON public.articles (category);
CREATE INDEX idx_articles_published ON public.articles (published_at DESC);
CREATE INDEX idx_articles_status ON public.articles (status);

-- RLS: 公开可读 published 文章，仅 service_role 可写
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published articles"
  ON public.articles FOR SELECT
  USING (status = 'published');

-- Worker 使用 SUPABASE_SERVICE_ROLE_KEY 写入（绕过 RLS）
```

**Worker 认证**：Cloudflare Worker 使用 `SUPABASE_SERVICE_ROLE_KEY`（存在 Worker Secrets 中）写入文章，绕过 RLS。Sonnet API key 同样存在 Worker Secrets。

### ISR 刷新策略

- /news 列表页：`revalidate = 3600`（1 小时）
- /news/[slug] 文章页：`revalidate = 86400`（24 小时，文章内容不变）
- Worker 插入新文章后，调用 Next.js 的 on-demand revalidation API 刷新列表页（`POST /api/revalidate?path=/news&secret=REVALIDATE_SECRET`）

### 成本

- 每篇文章约 3-5K input tokens（prompt 含工具列表和风格指南）+ 2-3K output tokens
- 3 篇/天 ≈ 20K tokens/天 ≈ $0.20/天 ≈ $6/月（仅英文，无二次质量检查）
- 如启用二次质量检查，成本约翻倍至 $12/月
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
- 新增 HowTo 结构化数据（复用现有 steps）
- 新增 "Why JustUse.me" 对比段落
- 用 Sonnet 增强 FAQ 内容（基于 People Also Ask）
- 修复 llms.txt 数据不一致

### Phase B — /news 基础设施
- Supabase articles 表
- /news 列表页 + /news/[slug] 文章页 UI
- ISR 渲染

### Phase C — Cloudflare Worker Cron
- 先搭通用 cron-content-worker 模板（可复用）
- 再基于模板创建 JustUse.me 实例
- 关键词库 + Sonnet 生成 pipeline
- 质量控制 prompt
- 配置 AI API proxy（aicodemirror）

### Phase D — 程序化长尾页面
- 变体配置表
- 变体内容生成
- /tools/[tool-id]/[variation] 页面模板

### Phase E — 技术 SEO 收尾
- 内链网络完善
- llms.txt 更新修复
- hreflang 覆盖新页面
- 性能验证
