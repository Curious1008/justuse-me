"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getToolsByCategory, getAllTools } from "@/tools/registry";
import type { Category, ToolPlugin } from "@/tools/types";
import ToolIcon from "@/components/tool/ToolIcon";
import { type Locale, localePath } from "@/lib/i18n";

const categoryLabels: Record<Locale, { id: Category; label: string }[]> = {
  en: [
    { id: "pdf", label: "PDF" },
    { id: "image", label: "Image" },
    { id: "text", label: "Text & Code" },
    { id: "convert", label: "Convert" },
    { id: "generator", label: "Generator" },
    { id: "calculator", label: "Calculator" },
    { id: "developer", label: "Developer" },
    { id: "utility", label: "Utility" },
  ],
  "zh-CN": [
    { id: "pdf", label: "PDF" },
    { id: "image", label: "图片" },
    { id: "text", label: "文本与代码" },
    { id: "convert", label: "格式转换" },
    { id: "generator", label: "生成器" },
    { id: "calculator", label: "计算器" },
    { id: "developer", label: "开发者" },
    { id: "utility", label: "实用工具" },
  ],
  "zh-TW": [
    { id: "pdf", label: "PDF" },
    { id: "image", label: "圖片" },
    { id: "text", label: "文字與程式碼" },
    { id: "convert", label: "格式轉換" },
    { id: "generator", label: "產生器" },
    { id: "calculator", label: "計算機" },
    { id: "developer", label: "開發者" },
    { id: "utility", label: "實用工具" },
  ],
};

const searchPlaceholders: Record<Locale, string> = {
  en: 'Try "merge PDF" or "compress image"',
  "zh-CN": '试试"合并PDF"或"压缩图片"',
  "zh-TW": '試試「合併PDF」或「壓縮圖片」',
};

const viewAllLabels: Record<Locale, string> = {
  en: "View all {category} tools",
  "zh-CN": "查看全部{category}工具",
  "zh-TW": "查看全部{category}工具",
};

const noResultsLabels: Record<Locale, string> = {
  en: "No tools found for",
  "zh-CN": "未找到相关工具",
  "zh-TW": "找不到相關工具",
};

// Tool name translations for display
const toolNameMap: Record<Locale, Record<string, { name: string; description: string }>> = {
  en: {},
  "zh-CN": {
    "merge-pdf": { name: "合并PDF", description: "将多个PDF文件合并为一个文档。" },
    "split-pdf": { name: "拆分PDF", description: "从PDF中提取页面或拆分为多个文件。" },
    "compress-pdf": { name: "压缩PDF", description: "减小PDF文件大小，保持可读性。" },
    "pdf-to-jpg": { name: "PDF转JPG", description: "将PDF页面转换为高质量JPG图片。" },
    "jpg-to-pdf": { name: "图片转PDF", description: "将图片合并为一个PDF文档。" },
    "rotate-pdf": { name: "旋转PDF", description: "将PDF所有页面旋转90、180或270度。" },
    "pdf-to-text": { name: "PDF转文本", description: "从PDF文件中提取文本内容。" },
    "watermark-pdf": { name: "PDF加水印", description: "在PDF每页添加文字水印。" },
    "page-numbers-pdf": { name: "添加页码", description: "为PDF每页添加页码。" },
    "compress-image": { name: "压缩图片", description: "在不明显损失质量的情况下减小图片文件大小。" },
    "resize-image": { name: "调整图片大小", description: "将图片尺寸调整为任意大小。" },
    "crop-image": { name: "裁剪图片", description: "通过拖拽选区可视化裁剪图片。" },
    "png-to-jpg": { name: "PNG转JPG", description: "将PNG图片转换为JPG格式。" },
    "jpg-to-png": { name: "JPG转PNG", description: "将JPG图片转换为无损PNG格式。" },
    "heic-to-jpg": { name: "HEIC转JPG", description: "将iPhone的HEIC照片转换为JPG。" },
    "svg-to-png": { name: "SVG转PNG", description: "将SVG矢量图形转换为PNG图片。" },
    "ocr-image": { name: "图片文字识别(OCR)", description: "使用OCR从图片中提取文字。" },
    "json-formatter": { name: "JSON格式化", description: "格式化和美化JSON数据。" },
    "word-counter": { name: "字数统计", description: "统计字数、字符数和句子数。" },
    "base64-codec": { name: "Base64编解码", description: "编码或解码Base64字符串。" },
    "markdown-to-html": { name: "Markdown转HTML", description: "将Markdown转换为简洁的HTML。" },
    "diff-checker": { name: "差异对比", description: "对比两段文本并高亮显示差异。" },
    "js-minifier": { name: "JS压缩", description: "压缩JavaScript代码以用于生产环境。" },
    "css-minifier": { name: "CSS压缩", description: "压缩CSS样式表以加快加载速度。" },
    "csv-to-json": { name: "CSV转JSON", description: "将CSV数据转换为JSON格式。" },
    "json-to-csv": { name: "JSON转CSV", description: "将JSON数组转换为CSV表格格式。" },
    "yaml-json": { name: "YAML / JSON转换", description: "在YAML和JSON格式之间互相转换。" },
    "xml-formatter": { name: "XML格式化", description: "格式化和美化XML数据。" },
    "qr-code": { name: "二维码生成器", description: "从文本或URL生成二维码。" },
    "color-converter": { name: "颜色转换器", description: "在HEX、RGB和HSL之间转换颜色。" },
    "sql-formatter": { name: "SQL格式化", description: "格式化和美化SQL查询语句。" },
    "html-beautifier": { name: "HTML美化", description: "格式化和缩进杂乱的HTML代码。" },
    "jwt-decoder": { name: "JWT解码器", description: "解码并查看JWT令牌的载荷数据。" },
    "cron-explainer": { name: "Cron表达式解释器", description: "将Cron表达式翻译为易懂的中文说明。" },
    "slug-generator": { name: "Slug生成器", description: "将文本转换为URL友好的slug。" },
    "handlebars-preview": { name: "Handlebars预览", description: "使用实时数据渲染Handlebars模板。" },
    "html-to-markdown": { name: "HTML转Markdown", description: "将HTML内容转换为Markdown格式。" },
    "json5-to-json": { name: "JSON5转JSON", description: "将JSON5转换为标准JSON。" },
    "toml-to-json": { name: "TOML转JSON", description: "将TOML配置文件转换为JSON格式。" },
    "json-to-markdown-table": { name: "JSON转Markdown表格", description: "将JSON数组转换为Markdown表格。" },
    "typescript-to-js": { name: "TypeScript转JS", description: "去除TypeScript类型注解，生成纯JavaScript。" },
    "uuid-generator": { name: "UUID生成器", description: "即时生成随机UUID（v4）。" },
    "lorem-ipsum": { name: "Lorem Ipsum生成器", description: "生成设计所需的占位文本。" },
    "hash-generator": { name: "哈希生成器", description: "从文件生成MD5、SHA-256等哈希值。" },
    "barcode-generator": { name: "条形码生成器", description: "从文本生成多种格式的条形码。" },
    "exif-viewer": { name: "EXIF查看器", description: "查看照片的EXIF元数据。" },
  },
  "zh-TW": {
    "merge-pdf": { name: "合併PDF", description: "將多個PDF檔案合併為一個文件。" },
    "split-pdf": { name: "拆分PDF", description: "從PDF中擷取頁面或拆分為多個檔案。" },
    "compress-pdf": { name: "壓縮PDF", description: "減小PDF檔案大小，維持可讀性。" },
    "pdf-to-jpg": { name: "PDF轉JPG", description: "將PDF頁面轉換為高品質JPG圖片。" },
    "jpg-to-pdf": { name: "圖片轉PDF", description: "將圖片合併為一個PDF文件。" },
    "rotate-pdf": { name: "旋轉PDF", description: "將PDF所有頁面旋轉90、180或270度。" },
    "pdf-to-text": { name: "PDF轉文字", description: "從PDF檔案中擷取文字內容。" },
    "watermark-pdf": { name: "PDF加浮水印", description: "在PDF每頁加上文字浮水印。" },
    "page-numbers-pdf": { name: "加入頁碼", description: "為PDF每頁加入頁碼。" },
    "compress-image": { name: "壓縮圖片", description: "在不明顯損失品質的情況下減小圖片檔案大小。" },
    "resize-image": { name: "調整圖片大小", description: "將圖片尺寸調整為任意大小。" },
    "crop-image": { name: "裁切圖片", description: "透過拖曳選取區域來裁切圖片。" },
    "png-to-jpg": { name: "PNG轉JPG", description: "將PNG圖片轉換為JPG格式。" },
    "jpg-to-png": { name: "JPG轉PNG", description: "將JPG圖片轉換為無損PNG格式。" },
    "heic-to-jpg": { name: "HEIC轉JPG", description: "將iPhone的HEIC照片轉換為JPG。" },
    "svg-to-png": { name: "SVG轉PNG", description: "將SVG向量圖形轉換為PNG圖片。" },
    "ocr-image": { name: "圖片文字辨識(OCR)", description: "使用OCR從圖片中擷取文字。" },
    "json-formatter": { name: "JSON格式化", description: "格式化和美化JSON資料。" },
    "word-counter": { name: "字數統計", description: "統計字數、字元數和句子數。" },
    "base64-codec": { name: "Base64編解碼", description: "編碼或解碼Base64字串。" },
    "markdown-to-html": { name: "Markdown轉HTML", description: "將Markdown轉換為簡潔的HTML。" },
    "diff-checker": { name: "差異比對", description: "比對兩段文字並標示差異。" },
    "js-minifier": { name: "JS壓縮", description: "壓縮JavaScript程式碼以用於正式環境。" },
    "css-minifier": { name: "CSS壓縮", description: "壓縮CSS樣式表以加快載入速度。" },
    "csv-to-json": { name: "CSV轉JSON", description: "將CSV資料轉換為JSON格式。" },
    "json-to-csv": { name: "JSON轉CSV", description: "將JSON陣列轉換為CSV表格格式。" },
    "yaml-json": { name: "YAML / JSON轉換", description: "在YAML和JSON格式之間互相轉換。" },
    "xml-formatter": { name: "XML格式化", description: "格式化和美化XML資料。" },
    "qr-code": { name: "QR碼產生器", description: "從文字或URL產生QR碼。" },
    "color-converter": { name: "顏色轉換器", description: "在HEX、RGB和HSL之間轉換顏色。" },
    "sql-formatter": { name: "SQL 格式化", description: "格式化並美化 SQL 查詢語句。" },
    "html-beautifier": { name: "HTML 美化", description: "格式化並縮排雜亂的 HTML 程式碼。" },
    "jwt-decoder": { name: "JWT 解碼器", description: "解碼並檢視 JWT 權杖的載荷資料。" },
    "cron-explainer": { name: "Cron 表達式解釋器", description: "將 Cron 表達式翻譯為易懂的說明。" },
    "slug-generator": { name: "Slug 產生器", description: "將文字轉換為 URL 友善的 slug。" },
    "handlebars-preview": { name: "Handlebars 預覽", description: "使用即時資料渲染 Handlebars 範本。" },
    "html-to-markdown": { name: "HTML 轉 Markdown", description: "將 HTML 內容轉換為 Markdown 格式。" },
    "json5-to-json": { name: "JSON5 轉 JSON", description: "將 JSON5 轉換為標準 JSON。" },
    "toml-to-json": { name: "TOML 轉 JSON", description: "將 TOML 設定檔轉換為 JSON 格式。" },
    "json-to-markdown-table": { name: "JSON 轉 Markdown 表格", description: "將 JSON 陣列轉換為 Markdown 表格。" },
    "typescript-to-js": { name: "TypeScript 轉 JS", description: "去除 TypeScript 型別註解，產生純 JavaScript。" },
    "uuid-generator": { name: "UUID 產生器", description: "即時產生隨機 UUID（v4）。" },
    "lorem-ipsum": { name: "Lorem Ipsum 產生器", description: "產生設計所需的佔位文字。" },
    "hash-generator": { name: "雜湊產生器", description: "從檔案產生 MD5、SHA-256 等雜湊值。" },
    "barcode-generator": { name: "條碼產生器", description: "從文字產生多種格式的條碼。" },
    "exif-viewer": { name: "EXIF 檢視器", description: "檢視照片的 EXIF 中繼資料。" },
  },
};

function getToolDisplay(tool: ToolPlugin, lang: Locale): { name: string; description: string } {
  const override = toolNameMap[lang]?.[tool.id];
  return override || { name: tool.name, description: tool.description };
}

/** Locale-aware search: matches against both English and translated names/descriptions/keywords, respects hiddenLocales */
function searchToolsI18n(query: string, lang: Locale): ToolPlugin[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const all = getAllTools(lang);
  return all.filter((t) => {
    // English fields
    if (
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
    ) return true;
    // Translated fields
    const tr = toolNameMap[lang]?.[t.id];
    if (tr) {
      if (tr.name.toLowerCase().includes(q) || tr.description.toLowerCase().includes(q)) return true;
    }
    return false;
  });
}

const catVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 22 },
  },
};

const toolVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 22 },
  },
};

export default function CategoryBubbles({ lang = "en" }: { lang?: Locale }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = categoryLabels[lang] || categoryLabels.en;

  const isSearching = query.trim().length > 0;
  const searchResults = isSearching ? searchToolsI18n(query, lang) : [];
  const activeCategory = categories.find((c) => c.id === active);
  const categoryTools = active ? getToolsByCategory(active, lang) : [];

  useEffect(() => {
    if (isSearching) setActive(null);
  }, [isSearching]);

  const scrollToPanel = useCallback(() => {
    setTimeout(() => {
      const el = panelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const targetTop = window.scrollY + rect.top - 120;
      if (rect.bottom > viewportH || rect.top < 0) {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    }, 450);
  }, []);

  const handleSelect = useCallback((id: Category) => {
    const isClosing = active === id;
    setActive(isClosing ? null : id);
    setQuery("");
    if (!isClosing) scrollToPanel();
  }, [active, scrollToPanel]);

  const visibleTools: ToolPlugin[] = isSearching ? searchResults : categoryTools;
  const showPanel = visibleTools.length > 0;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--color-text-muted)]"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            ref={inputRef}
            id="tool-search"
            name="tool-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholders[lang]}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_var(--color-accent-glow)] transition-all"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>

      {/* Category buttons */}
      <AnimatePresence>
        {!isSearching && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap justify-center gap-2 py-1"
          >
            {categories.map((cat) => {
              const isActive = active === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  variants={catVariant}
                  initial="hidden"
                  animate="show"
                  onClick={() => handleSelect(cat.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className={`relative px-4 py-2 rounded-full text-[13px] font-medium font-[family-name:var(--font-sora)] cursor-pointer transition-all duration-200 ${
                    isActive
                      ? `bg-[var(--color-text)] text-white`
                      : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)]"
                  }`}
                >
                  {cat.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results panel */}
      <div ref={panelRef} className="w-full">
        <AnimatePresence mode="wait">
          {showPanel && (
            <motion.div
              key={isSearching ? `search-${query}` : `cat-${active}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.04, delayChildren: 0.05 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 pb-1 auto-rows-fr"
              >
                {visibleTools.map((tool) => {
                  const display = getToolDisplay(tool, lang);
                  return (
                    <motion.div key={tool.id} variants={toolVariant} className="h-full">
                      <Link href={localePath(lang, `/tools/${tool.id}`)} className="block h-full">
                        <motion.div
                          whileHover={{ y: -4, scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          className="group relative flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-transparent cursor-pointer text-center transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.05] h-full"
                        >
                          <ToolIcon toolId={tool.id} fallbackEmoji={tool.icon} />
                          <span className="text-sm font-semibold font-[family-name:var(--font-sora)] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                            {display.name}
                          </span>
                          <span className="text-[11px] text-[var(--color-text-muted)] leading-snug line-clamp-2">
                            {display.description}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* "View all" link */}
                {!isSearching && active && activeCategory && (
                  <motion.div variants={toolVariant} className="h-full">
                    <Link href={localePath(lang, `/${active}`)} className="block h-full">
                      <motion.div
                        whileHover={{ y: -4, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-accent)] cursor-pointer text-center transition-all duration-200 h-full"
                      >
                        <svg className="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="text-xs text-[var(--color-text-muted)] font-medium">
                          {viewAllLabels[lang].replace("{category}", activeCategory.label)}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* No results */}
              {isSearching && searchResults.length === 0 && (
                <p className="text-sm text-[var(--color-text-muted)] text-center py-8">
                  {noResultsLabels[lang]} &ldquo;{query}&rdquo;
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
