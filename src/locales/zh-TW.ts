const zhTW = {
  // ─── Navigation ───
  nav: {
    pricing: "方案價格",
    news: "資訊",
    compare: "比較",
    contact: "聯絡我們",
    signIn: "登入",
    signOut: "登出",
    freePlan: "免費方案",
    proPlan: "Pro 方案",
    upgradeToPro: "升級至 Pro",
    manageSubscription: "管理訂閱",
  },

  // ─── Homepage ───
  hero: {
    title: "輕鬆搞定，",
    titleAccent: "一切事務。",
    subtitle: "日常檔案工具，隨時為你待命。",
  },

  // ─── Homepage SEO ───
  home: {
    whatIs: "JustUse.me 是什麼？",
    whatIsDesc: "JustUse.me 是一個免費、注重隱私的線上工具箱，提供 120+ 款瀏覽器端的檔案處理工具。所有工具皆透過 WebAssembly 與 Canvas API 在瀏覽器中執行——你的檔案絕不會上傳到任何伺服器。無需註冊帳號，沒有浮水印，沒有隱藏費用。",
    whyChoose: "為什麼選擇 JustUse.me 而非其他線上工具？",
    whyChooseDesc: "多數線上檔案工具（如 Smallpdf、iLovePDF、TinyPNG）會將你的檔案上傳至伺服器處理。JustUse.me 不同：所有處理都在瀏覽器本機完成。這代表更快的速度（不必等待上傳下載）、真正的隱私保障（檔案不會離開你的裝置），以及零資料外洩風險。",
    toolCategories: "工具分類",
    pdfDesc: "合併、分割、壓縮、旋轉、加浮水印及轉換 PDF 檔案。一次可處理多達 20 個檔案，品質無損。",
    imageDesc: "壓縮、調整大小、裁切圖片，支援 PNG、JPG、WebP、HEIC、SVG、GIF 格式互轉。亦支援 OCR 文字辨識。",
    textDesc: "格式化 JSON、比對差異、壓縮 JavaScript 與 CSS、解碼 JWT、解釋 Cron 運算式等 15 種以上文字工具。",
    convertDesc: "在 CSV、JSON、YAML、XML、TOML、Markdown 和 TypeScript 格式之間即時轉換。",
    generatorDesc: "產生 QR Code、UUID、密碼、調色盤、條碼、發票和佔位資料。",
    calculatorDesc: "計算 BMI、房貸月付、複利、GPA、卡路里等，簡潔實用的專項計算機。",
    developerDesc: "測試正規表達式、轉換時間戳記、產生 Meta 標籤、CSS 漸層、陰影與網站圖示。",
    utilityDesc: "單位換算、計時器、URL 檢測、文字加密、世界時鐘比較等實用工具。",
    privacyPromise: "你的隱私，我們的承諾",
    privacyPromiseDesc: "JustUse.me 上的每款工具都在你的瀏覽器中完成檔案處理。我們不使用伺服器端檔案處理、不使用追蹤 Cookie，也不使用基本頁面瀏覽以外的第三方分析工具。你的文件、圖片和資料自始至終留在你的裝置上。",
    learnMore: "了解更多關於 JustUse.me",
  },

  // ─── Search ───
  search: {
    placeholder: '試試「合併PDF」或「壓縮圖片」',
    noResults: "找不到相關工具：",
    viewAll: "查看所有{category}工具",
  },

  // ─── Category bubbles ───
  categories: {
    pdf: "PDF",
    image: "圖片",
    text: "文字與程式碼",
    convert: "格式轉換",
    generator: "產生器",
    calculator: "計算機",
    developer: "開發者",
    utility: "實用工具",
  },

  // ─── Category pages ───
  categoryPage: {
    pdf: { title: "PDF 工具", description: "線上免費合併、分割、壓縮和轉換 PDF。" },
    image: { title: "圖片工具", description: "即時壓縮、調整大小和轉換圖片。" },
    text: { title: "文字與程式碼工具", description: "格式化 JSON、字數統計、Base64 編解碼等。" },
    convert: { title: "格式轉換工具", description: "在 CSV、JSON、YAML、XML 等格式之間互相轉換。" },
    generator: { title: "產生器工具", description: "產生 QR Code、色彩調色盤等。" },
    calculator: { title: "計算機工具", description: "百分比、BMI、房貸、貸款等各類計算機。" },
    developer: { title: "開發者工具", description: "正規表達式測試、URL 編碼、CSS 產生器等。" },
    utility: { title: "實用工具", description: "碼表、計時器、單位轉換等日常工具。" },
  },

  // ─── Tool page ───
  tool: {
    processedLocally: "本機處理 — 檔案絕不離開你的裝置",
    textInput: "文字輸入",
    max: "最大 {size}",
    upTo: "最多 {n} 個檔案",
    howItWorks: "如何使用{name}？",
    about: "什麼是{name}？",
    aboutSuffix: "由 JustUse.me 提供 — 免費、無廣告、保護隱私。",
    aboutBrowser: "此工具完全在你的瀏覽器中運行，你的檔案不會被上傳至任何伺服器。",
    faq: "關於{name}的常見問題",
    relatedTools: "相關工具",
    lastUpdated: "最後更新",
    notFound: "找不到該工具。",
    // ─── Interaction UI (client components) ───
    chooseDifferentFile: "選擇其他檔案",
    processFallback: "處理",
    processAnother: "處理另一個檔案",
    tryAgain: "重試",
    addMoreFiles: "新增更多檔案，或",
    dropFileHere: "將檔案拖到此處，或",
    dropFilesHere: "將檔案拖到此處，或",
    browse: "瀏覽",
    anyFile: "任意檔案",
    dragToReorder: "拖曳排序",
    processNFiles: "處理 {n} 個檔案",
    downloaded: "已下載！",
    download: "下載",
    processing: "處理中...",
    dailyLimitTitle: "已達每日上限",
    dailyLimitDesc: "你今天已使用 {used}/{limit} 次免費額度。明天再來，或升級取得無限使用權。",
    createFreeAccount: "建立免費帳號",
    seeProPlans: "查看 Pro 方案",
    upgradeToPro: "升級至 Pro",
    maybeLater: "之後再說",
    nFiles: "{n} 個檔案",
  },

  // ─── Footer ───
  footer: {
    copyright: "\u00a9 {year} JustUse.me — Paymomentum LLC",
    privacyNotice: "我們重視你的隱私",
    privacyPolicy: "隱私權政策",
    terms: "服務條款",
  },

  // ─── Pricing ───
  pricing: {
    title: "簡單透明的價格",
    subtitle: "沒有隱藏費用，隨時可以取消。",
    success: "歡迎加入 Pro！你的訂閱已啟用。",
    canceled: "結帳已取消，不會產生任何費用。",
    free: "免費",
    pro: "Pro",
    popular: "熱門",
    perMonth: "/月",
    freeFeatures: ["每天 3 次使用", "所有工具皆可用", "無浮水印", "瀏覽器端隱私保護"],
    proFeatures: ["無限次使用", "所有工具皆可用", "無浮水印", "瀏覽器端隱私保護", "優先支援"],
    getStarted: "開始使用",
    upgradeToPro: "升級至 Pro",
    redirecting: "跳轉中⋯",
    manageSubscription: "管理訂閱",
  },

  // ─── Contact ───
  contact: {
    title: "聯絡我們",
    subtitle: "有任何問題或建議？我們很樂意聽取你的意見。",
    namePlaceholder: "你的姓名",
    emailPlaceholder: "你的電子郵件",
    messagePlaceholder: "你的訊息",
    send: "傳送訊息",
    sending: "傳送中⋯",
    success: "訊息已送出！我們會盡快回覆你。",
    sendAnother: "傳送另一則訊息",
  },

  // ─── Login ───
  login: {
    title: "歡迎回來",
    subtitle: "登入以追蹤使用量並解鎖 Pro 功能。",
    google: "使用 Google 繼續",
    error: "登入失敗，請重試。",
    termsPrefix: "登入即表示你同意我們的",
    and: "和",
  },

  // ─── Metadata / SEO ───
  meta: {
    siteTitle: "JustUse.me — 免費線上 PDF、圖片與文字工具",
    siteDescription: "免費線上工具：合併 PDF、壓縮圖片、格式化 JSON 等超過 100 種工具。無廣告、免註冊、無浮水印，檔案絕不離開你的瀏覽器。",
    ogTitle: "JustUse.me — 免費線上工具",
    ogDescription: "120+ 種免費線上工具，涵蓋 PDF、圖片和文字處理。無廣告、免註冊、隱私優先 — 檔案絕不離開你的瀏覽器。",
    twitterDescription: "120+ 種免費工具。無廣告、免註冊，檔案留在你的瀏覽器中。",
    categoryMetaTitle: "免費線上{label} — 無廣告、免註冊",
    categoryMetaDescription: "{desc} 免費、保護隱私，在你的瀏覽器中運行。無浮水印、無檔案上傳。",
    toolMetaTitle: "{name} — 無需上傳、免註冊",
    toolMetaSuffix: "免費、無廣告、免註冊。你的檔案留在你的裝置上。",
    toolMetaDescSuffix: "在瀏覽器中運行，檔案不會上傳到任何伺服器。免費使用，無需註冊。",
    toolMetaDescTails: {
      pdf: "PDF 在你的瀏覽器本機處理，絕不上傳至任何伺服器。免費、免註冊。",
      image: "圖片始終留在你的裝置上。圖像處理完全在瀏覽器內完成，無任何上傳。免費、免註冊。",
      text: "純用戶端文字處理，所有內容不離開你的瀏覽器。免費、免註冊、無追蹤。",
      convert: "轉換全程在你的瀏覽器中完成，檔案不會離開你的裝置。免費、免註冊。",
      generator: "在你的瀏覽器本機生成，無任何資料上傳。免費、免註冊。",
      calculator: "計算完全在你的瀏覽器中進行，無追蹤、無帳號、無上傳。",
      developer: "所有處理均在你的瀏覽器中完成 — 適合處理敏感程式碼、權杖或密鑰，資料不離開頁面。",
      utility: "完全在你的瀏覽器中運行，無需上傳。免費、免註冊。",
    },
    toolOgTitle: "{name} — 瀏覽器本機運行、無需上傳 | JustUse.me",
  },

  // ─── Tool names & descriptions (keyed by tool ID) ───
  tools: {
    "merge-pdf": { name: "合併 PDF", description: "將多個 PDF 檔案合併為一份文件。" },
    "split-pdf": { name: "分割 PDF", description: "從 PDF 中擷取頁面或分割成多個檔案。" },
    "compress-pdf": { name: "壓縮 PDF", description: "縮小 PDF 檔案大小，同時維持可讀性。" },
    "pdf-to-jpg": { name: "PDF 轉 JPG", description: "將 PDF 頁面轉換為高品質 JPG 圖片。" },
    "jpg-to-pdf": { name: "JPG 轉 PDF", description: "將圖片轉換為單一 PDF 文件。" },
    "rotate-pdf": { name: "旋轉 PDF", description: "將 PDF 所有頁面旋轉 90、180 或 270 度。" },
    "pdf-to-text": { name: "PDF 轉文字", description: "從 PDF 檔案中擷取文字內容。" },
    "watermark-pdf": { name: "PDF 浮水印", description: "在 PDF 每一頁加上文字浮水印。" },
    "page-numbers-pdf": { name: "加入頁碼", description: "在 PDF 每一頁加上頁碼。" },
    "compress-image": { name: "壓縮圖片", description: "縮小圖片檔案大小，不影響可見品質。" },
    "resize-image": { name: "調整圖片大小", description: "將圖片尺寸變更為任意大小。" },
    "crop-image": { name: "裁切圖片", description: "以拖曳選取方式裁切圖片。" },
    "png-to-jpg": { name: "PNG 轉 JPG", description: "將 PNG 圖片轉換為 JPG 格式。" },
    "jpg-to-png": { name: "JPG 轉 PNG", description: "將 JPG 圖片轉換為無損 PNG 格式。" },
    "heic-to-jpg": { name: "HEIC 轉 JPG", description: "將 iPhone HEIC 照片轉換為 JPG。" },
    "svg-to-png": { name: "SVG 轉 PNG", description: "將 SVG 向量圖形轉換為 PNG 圖片。" },
    "ocr-image": { name: "圖片轉文字 (OCR)", description: "使用 OCR 從英文圖片中擷取文字（暫不支援中文）。" },
    "json-formatter": { name: "JSON 格式化", description: "格式化並美化 JSON 資料。" },
    "word-counter": { name: "字數統計", description: "統計字數、字元數和句子數。" },
    "base64-codec": { name: "Base64 編碼/解碼", description: "編碼或解碼 Base64 字串。" },
    "markdown-to-html": { name: "Markdown 轉 HTML", description: "將 Markdown 轉換為乾淨的 HTML。" },
    "diff-checker": { name: "差異比對", description: "比對兩段文字並標示差異。" },
    "js-minifier": { name: "JS 壓縮", description: "壓縮 JavaScript 程式碼以用於正式環境。" },
    "css-minifier": { name: "CSS 壓縮", description: "壓縮 CSS 樣式表以加快載入速度。" },
    "csv-to-json": { name: "CSV 轉 JSON", description: "將 CSV 資料轉換為 JSON 格式。" },
    "json-to-csv": { name: "JSON 轉 CSV", description: "將 JSON 陣列轉換為 CSV 試算表格式。" },
    "yaml-json": { name: "YAML / JSON 轉換器", description: "在 YAML 和 JSON 格式之間互相轉換。" },
    "xml-formatter": { name: "XML 格式化", description: "格式化並美化 XML 資料。" },
    "xml-to-json": { name: "XML 轉 JSON", description: "將 XML 檔案轉換為 JSON 格式。" },
    "qr-code": { name: "QR Code 產生器", description: "從文字或網址產生 QR Code。" },
    "color-converter": { name: "色彩轉換器", description: "在 HEX、RGB 和 HSL 之間轉換色彩。" },
    "sql-formatter": { name: "SQL 格式化", description: "格式化並美化 SQL 查詢語句。" },
    "html-beautifier": { name: "HTML 美化", description: "格式化並縮排雜亂的 HTML 程式碼。" },
    "jwt-decoder": { name: "JWT 解碼器", description: "解碼並檢視 JWT 權杖的載荷資料。" },
    "cron-explainer": { name: "Cron 表達式解釋器", description: "將 Cron 表達式翻譯為易懂的說明。" },
    "slug-generator": { name: "Slug 產生器", description: "將文字轉換為 URL 友善的 slug。" },
    "handlebars-preview": { name: "Handlebars 預覽", description: "使用即時資料渲染 Handlebars 範本。" },
    "html-to-markdown": { name: "HTML 轉 Markdown", description: "將 HTML 內容轉換為 Markdown 格式。" },
    "json5-to-json": { name: "JSON5 轉 JSON", description: "將 JSON5（支援註解/結尾逗號）轉換為標準 JSON。" },
    "toml-to-json": { name: "TOML 轉 JSON", description: "將 TOML 設定檔轉換為 JSON 格式。" },
    "json-to-markdown-table": { name: "JSON 轉 Markdown 表格", description: "將 JSON 陣列轉換為 Markdown 表格。" },
    "json-to-yaml": { name: "JSON 轉 YAML", description: "將 JSON 檔案轉換為 YAML 格式。" },
    "typescript-to-js": { name: "TypeScript 轉 JS", description: "去除 TypeScript 型別註解，產生純 JavaScript。" },
    "uuid-generator": { name: "UUID 產生器", description: "即時產生隨機 UUID（v4）。" },
    "lorem-ipsum": { name: "Lorem Ipsum 產生器", description: "產生設計和原型所需的佔位文字。" },
    "hash-generator": { name: "雜湊產生器", description: "從檔案產生 MD5、SHA-1、SHA-256 和 SHA-512 雜湊值。" },
    "barcode-generator": { name: "條碼產生器", description: "從文字產生多種格式的條碼。" },
    "exif-viewer": { name: "EXIF 檢視器", description: "檢視照片的 EXIF 中繼資料（相機、GPS、日期）。" },
    // 圖片（新增）
    "image-metadata-remover": { name: "圖片中繼資料移除器", description: "透過重新繪製到乾淨畫布來清除圖片的 EXIF 和中繼資料。" },
    "image-color-picker": { name: "圖片取色器", description: "從圖片中採樣並擷取最常見的 8 種顏色（hex 值）。" },
    "image-to-base64": { name: "圖片轉 Base64", description: "將上傳的圖片轉換為 Base64 資料 URL 字串。" },
    "image-flip-rotate": { name: "圖片翻轉與旋轉", description: "水平、垂直翻轉圖片，或旋轉 90/180/270 度。" },
    "webp-to-png": { name: "WebP 轉 PNG", description: "將 WebP 圖片轉換為 PNG 格式。" },
    "webp-to-jpg": { name: "WebP 轉 JPG", description: "將 WebP 圖片轉換為 JPG 格式。" },
    "gif-to-png": { name: "GIF 轉 PNG", description: "擷取 GIF 動畫的第一幀並儲存為 PNG 圖片。" },
    "ico-converter": { name: "PNG 轉 ICO", description: "將圖片轉換為 ICO 網站圖示格式。" },
    "background-remover": { name: "背景移除", description: "移除圖片背景，取得透明 PNG。" },
    "image-to-pdf": { name: "圖片轉 PDF", description: "將圖片轉換為 PDF 文件。" },
    // 文字（新增）
    "case-converter": { name: "大小寫轉換器", description: "將文字轉換為大寫、小寫、標題格式、駝峰命名、底線或短橫線格式。" },
    "remove-duplicate-lines": { name: "移除重複行", description: "移除文字中的重複行，只保留唯一條目。" },
    "sort-lines": { name: "行排序", description: "將文字行按字母順序從 A 到 Z 排序。" },
    "string-reverse": { name: "字串反轉", description: "反轉字串或獨立反轉每一行文字。" },
    "readability-checker": { name: "可讀性檢查器", description: "使用 Flesch 閱讀便利度和 Flesch-Kincaid 年級水準對文字評分。" },
    "remove-whitespace": { name: "移除空白", description: "清除文字中多餘的空格、定位字元和空行。" },
    "find-and-replace": { name: "尋找與取代", description: "使用簡單的分隔符格式批次尋找和取代文字。" },
    "url-encoder-decoder": { name: "URL 編碼/解碼", description: "編碼和解碼 URL 百分號編碼字串。" },
    "html-entity-encoder": { name: "HTML 實體編碼器", description: "編碼和解碼 HTML 特殊字元，如 &amp;、&lt; 和 &gt;。" },
    "number-to-words": { name: "數字轉文字", description: "將數字轉換為英文單字（如 1234 → \"one thousand two hundred thirty-four\"）。" },
    // 產生器（新增）
    "password-generator": { name: "密碼產生器", description: "產生包含大小寫字母、數字和符號的強隨機密碼。" },
    "random-number-generator": { name: "隨機數產生器", description: "在指定範圍內產生隨機數。" },
    "color-palette-generator": { name: "色彩配色產生器", description: "基於色彩理論從任意十六進位色碼產生和諧的配色方案。" },
    "random-name-picker": { name: "隨機名稱抽取器", description: "從名單中隨機抽取一個獲獎者。" },
    "invoice-generator": { name: "發票產生器", description: "產生帶自動合計計算的格式化文字發票。" },
    "strong-password-checker": { name: "密碼強度檢測器", description: "檢測密碼強度，顯示評分、破解時間估算和詳細回饋。" },
    "fake-data-generator": { name: "假資料產生器", description: "產生逼真的假姓名、電子郵件、電話號碼和地址（JSON 格式）。" },
    "placeholder-image-generator": { name: "佔位圖片產生器", description: "使用 Canvas 產生自訂尺寸、背景色和文字的佔位圖片。" },
    // 計算器
    "percentage-calculator": { name: "百分比計算器", description: "計算百分比，或求一個數是另一個數的百分之幾。" },
    "bmi-calculator": { name: "BMI 計算器", description: "根據身高和體重計算身體質量指數（BMI），並給出健康分類。" },
    "age-calculator": { name: "年齡計算器", description: "從生日精確計算年齡（年、月、日），並顯示下次生日倒數。" },
    "tip-calculator": { name: "小費計算器", description: "根據帳單金額和小費比例計算小費金額、總帳單及人均分攤。" },
    "compound-interest-calculator": { name: "複利計算器", description: "計算複利增長，顯示未來價值、總利息及逐年明細。" },
    "mortgage-calculator": { name: "房貸計算器", description: "計算月付款、總利息及還款摘要。" },
    "loan-calculator": { name: "貸款計算器", description: "計算個人貸款或汽車貸款的月付款和總利息。" },
    "grade-calculator": { name: "成績計算器", description: "根據各項分數及其權重計算加權平均成績。" },
    "gpa-calculator": { name: "GPA 計算器", description: "根據字母成績和學分使用標準 4.0 制計算 GPA。" },
    "calorie-calculator": { name: "卡路里計算器", description: "根據年齡、性別、身高、體重和活動水準計算每日卡路里需求。" },
    "pregnancy-due-date": { name: "預產期計算器", description: "根據最後一次月經（LMP）計算預產期、目前孕週和孕期。" },
    "date-difference-calculator": { name: "日期差計算器", description: "計算兩個日期之間的天數、週數、月數和年數差值。" },
    "time-zone-converter": { name: "時區轉換器", description: "在全球不同時區之間轉換時間。" },
    "discount-calculator": { name: "折扣計算器", description: "計算打折後的售價和節省的金額。" },
    "scientific-calculator": { name: "科學計算器", description: "支援三角函數、對數、平方根等的數學運算式計算器。" },
    "debt-payoff-calculator": { name: "債務清償計算器", description: "根據餘額、利率和月付款計算還清債務所需時間和總利息。" },
    // 開發者
    "regex-tester": { name: "正規表示式測試器", description: "測試正規表示式並在文字中找出所有比對及位置。" },
    "timestamp-converter": { name: "時間戳記轉換器", description: "將 Unix 時間戳記轉換為可讀日期格式，或反向轉換。" },
    "json-to-typescript": { name: "JSON 轉 TypeScript", description: "將 JSON 物件轉換為 TypeScript 介面定義，支援巢狀物件和陣列。" },
    "html-to-jsx": { name: "HTML 轉 JSX", description: "將 HTML 標記轉換為 JSX 相容的 React 語法（className、htmlFor、自閉合標籤等）。" },
    "chmod-calculator": { name: "chmod 計算器", description: "在數字格式（755）和符號格式（rwxr-xr-x）之間轉換 Unix 檔案權限，並給出完整說明。" },
    "meta-tag-generator": { name: "Meta 標籤產生器", description: "產生完整的 HTML 標頭 meta 標籤，包括 SEO、Open Graph 和 Twitter Card 標籤。" },
    "css-gradient-generator": { name: "CSS 漸層產生器", description: "根據兩種顏色和可選方向產生 CSS linear-gradient 程式碼。" },
    "http-status-codes": { name: "HTTP 狀態碼查詢", description: "按編號或關鍵詞查詢 HTTP 狀態碼，附說明和常見用例。" },
    "css-box-shadow-generator": { name: "CSS 陰影產生器", description: "根據偏移、模糊、擴展和顏色參數產生 CSS box-shadow 程式碼。" },
    "css-flexbox-generator": { name: "CSS Flexbox 產生器", description: "根據方向、對齊、換行和間距參數產生完整的 CSS flexbox 程式碼。" },
    "favicon-generator": { name: "Favicon 產生器", description: "將任意圖片調整為 32×32 像素的 PNG favicon，可直接用於網站。" },
    "json-validator": { name: "JSON 驗證器", description: "驗證 JSON 並取得格式化輸出，或顯示帶行號的詳細錯誤資訊。" },
    "css-unit-converter": { name: "CSS 單位轉換器", description: "在 px、rem、em、pt 和 vw 之間轉換 CSS 值。" },
    "color-contrast-checker": { name: "色彩對比度檢查器", description: "檢查前景色和背景色之間的 WCAG AA/AAA 對比度。" },
    "svg-optimizer": { name: "SVG 最佳化器", description: "移除註解、中繼資料、空群組和不必要的屬性以縮小 SVG 檔案大小。" },
    // 實用工具
    "temperature-converter": { name: "溫度轉換器", description: "在攝氏、華氏和克耳文之間即時轉換溫度。" },
    "length-converter": { name: "長度轉換器", description: "在公制和英制單位之間轉換長度：mm、cm、m、km、in、ft、yd、mi。" },
    "weight-converter": { name: "重量轉換器", description: "在 mg、g、kg、oz、lb 和 stone 之間轉換重量。" },
    "speed-converter": { name: "速度轉換器", description: "在公里/時、英里/時、公尺/秒、英尺/秒和節之間轉換速度。" },
    "data-storage-converter": { name: "資料儲存轉換器", description: "在位元組、KB、MB、GB、TB 和 PB 之間轉換資料大小。" },
    "cooking-converter": { name: "烹飪單位轉換器", description: "在茶匙、湯匙、杯、毫升、公升和液量盎司之間轉換烹飪用量。" },
    "number-base-converter": { name: "進位制轉換器", description: "在十進位、十六進位、二進位和八進位之間轉換數字。" },
    "shoe-size-converter": { name: "鞋碼轉換器", description: "在美碼、歐碼、英碼和日本碼（公分）之間轉換鞋碼。" },
    "stopwatch": { name: "碼錶/時間戳記", description: "取得目前精確時間戳記，或計算兩個時間戳記之間的經過時間。" },
    "countdown-timer": { name: "倒數計時器", description: "輸入時長，取得精確結束時間和可讀倒計時。" },
    "pomodoro-timer": { name: "番茄鐘", description: "從現在起產生完整的番茄工作法時間表，包含工作和休息時段。" },
    "world-clock": { name: "世界時鐘", description: "查看全球主要城市的目前時間，支援自訂時間輸入。" },
    "text-encrypt-decrypt": { name: "文字加密/解密", description: "使用密語透過 AES-256-GCM 加密或解密文字，完全在瀏覽器中執行。" },
    "url-checker": { name: "URL 檢查器", description: "分析 URL 的結構、查詢參數和可疑模式（如釣魚指標）。" },
  } as Record<string, { name: string; description: string }>,

  // ─── Tool SEO content (keyed by tool ID) ───
  toolSeo: {
    "merge-pdf": {
      longDescription: "只需幾秒即可將多個 PDF 檔案合併為一份文件。無浮水印、無檔案大小限制、無需註冊。你的檔案直接在瀏覽器中合併，不會上傳至任何伺服器。",
      steps: ["拖放或選取你要合併的 PDF 檔案", "拖曳調整頁面順序", "點擊「合併」並下載合併後的 PDF"],
      faq: [
        { q: "線上合併 PDF 安全嗎？", a: "安全。JustUse.me 完全在你的瀏覽器中使用 JavaScript 處理檔案。你的 PDF 不會被上傳至任何伺服器，因此完全保護隱私。" },
        { q: "可以一次合併兩個以上的 PDF 嗎？", a: "當然可以。你可以在一次合併中合併最多 20 個 PDF 檔案。只需全部拖入，再依需要調整順序。" },
        { q: "合併會降低 PDF 品質嗎？", a: "不會。合併過程直接結合檔案，不會重新編碼，因此你的文字、圖片和格式完全不變。" },
      ],
    },
    "split-pdf": {
      longDescription: "從 PDF 中擷取特定頁面，或將其分割成多個檔案。適合抽出某一章節、單一頁面，或把大型文件分成較小的部分。完全在瀏覽器中離線運作。",
      steps: ["上傳你要分割的 PDF", "輸入頁碼或範圍（例如 1-3, 5, 8-12）", "點擊「分割」並下載結果"],
      faq: [
        { q: "可以只擷取 PDF 中的一頁嗎？", a: "可以。輸入單一頁碼如「3」，你就會得到只包含該頁的 PDF。" },
        { q: "分割 PDF 會降低品質嗎？", a: "不會。頁面會原封不動地被擷取出來，不會重新壓縮或損失品質。" },
      ],
    },
    "compress-pdf": {
      longDescription: "縮小 PDF 檔案大小，方便用於電子郵件附件、上傳或更快速地分享。可調整壓縮程度，在檔案大小與視覺品質之間取得平衡。特別適合掃描文件和含大量圖片的 PDF。",
      steps: ["上傳你的 PDF 檔案", "調整品質滑桿 — 越低代表檔案越小", "點擊「壓縮」並下載較小的 PDF"],
      faq: [
        { q: "可以縮小多少 PDF 檔案大小？", a: "含大量圖片的 PDF 通常可縮小 50-80%。純文字 PDF 因本身已很精簡，縮小幅度可能較少。" },
        { q: "壓縮後文字還能選取嗎？", a: "壓縮會將頁面轉為最佳化的圖片，因此輸出的文字無法選取。最適合用於分享或存檔，而非編輯。" },
      ],
    },
    "pdf-to-jpg": {
      longDescription: "將 PDF 的每一頁轉換為高品質 JPG 圖片。適合在社群媒體分享頁面、嵌入簡報，或從文件中擷取圖像。",
      steps: ["上傳你的 PDF 檔案", "每一頁都會被轉換為 JPG 圖片", "下載所有圖片的 ZIP 壓縮檔"],
      faq: [
        { q: "輸出的圖片解析度是多少？", a: "圖片以 2 倍解析度渲染，呈現清晰、高品質的結果，適合列印或簡報使用。" },
        { q: "可以只轉換特定頁面嗎？", a: "目前會轉換所有頁面。如需特定頁面，請先使用「分割 PDF」，再轉換結果。" },
      ],
    },
    "jpg-to-pdf": {
      longDescription: "將一張或多張圖片轉為單一 PDF 文件。適合製作相簿、合併掃描文件，或將多張圖片打包分享。支援 JPG、PNG 和 WebP 格式。",
      steps: ["拖放你的圖片（JPG、PNG 或 WebP）", "需要的話可拖曳調整順序", "點擊「轉換」並下載你的 PDF"],
      faq: [
        { q: "可以將多張圖片合併成一個 PDF 嗎？", a: "可以。最多可拖入 20 張圖片，它們會排列為單一 PDF 文件中的各個頁面。" },
        { q: "圖片會損失品質嗎？", a: "不會。圖片會以原始解析度嵌入，不會進行額外壓縮。" },
      ],
    },
    "rotate-pdf": {
      longDescription: "將 PDF 所有頁面旋轉 90、180 或 270 度。修正橫向掃描、上下顛倒的文件，或需要從橫式轉為直式的頁面。",
      steps: ["上傳需要旋轉的 PDF", "選擇旋轉角度（90、180 或 270 度）", "點擊「旋轉」並下載修正後的 PDF"],
      faq: [
        { q: "可以只旋轉個別頁面嗎？", a: "目前所有頁面會以相同角度旋轉。如需選擇性旋轉，請先分割 PDF，旋轉需要的頁面，再合併回來。" },
        { q: "旋轉會影響 PDF 品質嗎？", a: "不會。旋轉是無損的 — 只改變頁面方向，不會重新編碼任何內容。" },
      ],
    },
    "pdf-to-text": {
      longDescription: "從 PDF 檔案中擷取所有文字內容。適用於文字型 PDF（非掃描圖片）。適合複製內容、搜尋文件或轉換為純文字格式。",
      steps: ["上傳你的 PDF 檔案", "所有頁面的文字會自動擷取", "預覽並下載文字檔"],
      faq: [
        { q: "這對掃描的 PDF 有效嗎？", a: "此工具僅擷取嵌入的文字。掃描文件或圖片請使用我們的「圖片轉文字 (OCR)」工具。" },
        { q: "格式會被保留嗎？", a: "基本的文字內容和換行會被保留，但複雜的格式（表格、分欄）可能無法完美轉換為純文字。" },
      ],
    },
    "watermark-pdf": {
      longDescription: "在 PDF 每一頁加上文字浮水印。保護機密文件、標記草稿，或使用自訂文字為檔案加上品牌標示。",
      steps: ["上傳你的 PDF", "輸入浮水印文字（例如「機密」、「草稿」）", "點擊「加入浮水印」並下載結果"],
      faq: [
        { q: "可以自訂浮水印外觀嗎？", a: "你可以設定任何文字。浮水印會以半透明對角線覆蓋方式顯示在每一頁上。" },
        { q: "浮水印可以被移除嗎？", a: "浮水印已嵌入 PDF 中，無法輕易移除，因此適合用於文件保護。" },
      ],
    },
    "page-numbers-pdf": {
      longDescription: "在 PDF 文件的每一頁加上頁碼。可從 6 個位置中選擇（上方/下方、靠左/置中/靠右），並設定自訂起始編號。",
      steps: ["上傳你的 PDF", "選擇頁碼顯示位置", "設定起始編號，然後點擊「加入頁碼」"],
      faq: [
        { q: "可以從 1 以外的數字開始編號嗎？", a: "可以。設定任何起始編號 — 如果你的文件是較大作品的一部分，這會很有用。" },
        { q: "頁碼使用什麼字型和大小？", a: "頁碼使用 Helvetica 字型、10pt 大小，以淡灰色顯示，不會影響內容閱讀。" },
      ],
    },
    "compress-image": {
      longDescription: "縮小圖片檔案大小，不影響可見品質。適合加速網站載入、符合電子郵件附件大小限制，或節省儲存空間。支援 JPG、PNG 和 WebP。",
      steps: ["上傳你的圖片（JPG、PNG 或 WebP）", "調整品質滑桿至你偏好的程度", "點擊「壓縮」並下載較小的檔案"],
      faq: [
        { q: "圖片可以縮小多少？", a: "高品質設定下通常可縮小 40-70%。中等品質下可達到 70-90% 的縮小幅度，且肉眼幾乎看不出差異。" },
        { q: "壓縮會移除 EXIF 資料嗎？", a: "會。EXIF 中繼資料（相機資訊、GPS 位置）會在壓縮時被移除，這也有助於保護隱私。" },
      ],
    },
    "resize-image": {
      longDescription: "將圖片尺寸變更為任意大小。可使用預設尺寸（50%、75%、1080p、720p）或輸入自訂寬度和高度。鎖定長寬比可防止圖片變形。",
      steps: ["上傳你的圖片", "選擇預設尺寸或輸入自訂尺寸", "點擊「調整大小」並下載調整後的圖片"],
      faq: [
        { q: "可以不變形地調整大小嗎？", a: "可以。預設會鎖定長寬比。如果你想拉伸至精確尺寸，可以解除鎖定。" },
        { q: "調整大小會降低品質嗎？", a: "縮小圖片是無損的。放大則可能降低清晰度，因為需要插值像素。" },
      ],
    },
    "crop-image": {
      longDescription: "以拖曳選取介面裁切圖片。可使用預設長寬比（1:1、16:9、4:3、3:2），適合社群媒體、縮圖或簡報。",
      steps: ["上傳你的圖片", "拖曳裁切框或選擇長寬比預設", "點擊「裁切」並下載裁切後的圖片"],
      faq: [
        { q: "可以裁切為特定長寬比嗎？", a: "可以。選擇自由、1:1（正方形）、16:9（寬螢幕）、4:3 或 3:2。裁切區域會自動調整。" },
        { q: "裁切是無損的嗎？", a: "裁切區域以高品質儲存（JPG 為 92%）。PNG 裁切則完全無損。" },
      ],
    },
    "png-to-jpg": {
      longDescription: "將 PNG 圖片轉換為 JPG 格式以獲得更小的檔案大小。帶有透明度的 PNG 檔案會使用白色背景。適合網頁上傳、電子郵件附件，或需要 JPG 格式的場景。",
      steps: ["上傳你的 PNG 圖片", "圖片會在你的瀏覽器中即時轉換", "下載 JPG 結果"],
      faq: [
        { q: "透明度會怎麼處理？", a: "透明區域會填充白色背景，因為 JPG 不支援透明度。" },
        { q: "JPG 會小多少？", a: "通常比原始 PNG 小 50-80%，尤其是照片類圖片。" },
      ],
    },
    "jpg-to-png": {
      longDescription: "將 JPG 圖片轉換為 PNG 格式，獲得無損品質或透明度支援。PNG 是標誌、圖示、螢幕截圖和邊緣清晰的圖形的首選格式。",
      steps: ["上傳你的 JPG 圖片", "轉換會在你的瀏覽器中即時完成", "下載 PNG 檔案"],
      faq: [
        { q: "圖片品質會改善嗎？", a: "轉換為 PNG 不會恢復 JPG 壓縮時損失的品質，但可以防止重新儲存時進一步的品質劣化。" },
        { q: "檔案會變大嗎？", a: "通常會。PNG 使用無損壓縮，對照片類圖片會產生比 JPG 更大的檔案。" },
      ],
    },
    "heic-to-jpg": {
      longDescription: "將 iPhone HEIC 照片轉換為通用相容的 JPG 格式。iPhone 和 iPad 的 HEIC 檔案無法在所有裝置上開啟 — 轉換為 JPG 後即可在任何裝置上分享、上傳或編輯。",
      steps: ["上傳你的 iPhone/iPad HEIC 檔案", "檔案會在你的瀏覽器中即時轉換", "下載 JPG 版本"],
      faq: [
        { q: "什麼是 HEIC 格式？", a: "HEIC（高效率影像容器）是自 iOS 11 起 iPhone 的預設照片格式。它的壓縮效率優於 JPG，但並非所有裝置都支援。" },
        { q: "HEIC 轉 JPG 會損失品質嗎？", a: "品質損失極小。轉換使用高品質編碼，盡可能保留細節。" },
      ],
    },
    "svg-to-png": {
      longDescription: "將 SVG 向量圖形轉換為 PNG 點陣圖片。適用於網站、應用程式或文件不支援 SVG 的情況，或需要從向量來源取得固定解析度圖片時。",
      steps: ["上傳你的 SVG 檔案", "向量圖會被渲染為 PNG 圖片", "下載 PNG 結果"],
      faq: [
        { q: "輸出的解析度是多少？", a: "SVG 會以其定義的尺寸渲染。輸出會符合 SVG 的 viewBox 尺寸。" },
        { q: "透明度會被保留嗎？", a: "會。SVG 中的透明區域在輸出的 PNG 中仍然保持透明。" },
      ],
    },
    "ocr-image": {
      longDescription: "使用光學字元辨識 (OCR) 從圖片中擷取文字。目前僅針對英文最佳化，適用於英文螢幕截圖、文件照片、收據和招牌。暫不支援中文、日文等非拉丁語系文字。",
      steps: ["上傳包含英文文字的圖片", "OCR 處理圖片（可能需要幾秒鐘）", "預覽並下載擷取的文字"],
      faq: [
        { q: "支援哪些語言？", a: "目前僅支援英文。工具使用 Tesseract.js 的英文訓練資料，以確保下載體積小、辨識速度快。如需辨識中文、日文等非拉丁語系文字，建議使用專門針對該語言的 OCR 工具。" },
        { q: "圖片會被上傳到伺服器嗎？", a: "不會。OCR 完全在你的瀏覽器中使用 Tesseract.js 運行。你的圖片不會離開裝置。" },
      ],
    },
    "background-remover": {
      longDescription: "移除圖片背景，取得乾淨的透明 PNG。適用於照片、Logo 和產品圖片。工具從圖片邊緣偵測背景顏色，使用泛洪填充演算法移除背景，全部在瀏覽器中處理。",
      steps: ["上傳圖片（JPG、PNG 或 WebP）", "自動偵測並移除背景", "下載透明 PNG 結果"],
      faq: [
        { q: "背景移除是怎麼運作的？", a: "工具取樣四角像素來辨識背景顏色，然後從邊緣使用泛洪填充移除所有相似顏色的連續像素。純色或近似純色背景效果最佳。" },
        { q: "複雜背景能處理嗎？", a: "純色背景（白色、綠幕等）效果最好。複雜或漸層背景可能會留下一些殘留。這種情況建議使用專門的 AI 背景移除工具。" },
        { q: "圖片會被上傳嗎？", a: "不會。所有處理都在瀏覽器中完成，圖片不會離開你的裝置。" },
      ],
      related: ["compress-image", "crop-image", "png-to-jpg"],
      whyUs: "大多數背景移除工具會將圖片上傳到伺服器進行 AI 處理。JustUse.me 完全在瀏覽器中移除背景——照片保持私密，即時處理，無需排隊等待。",
    },
    "image-to-pdf": {
      longDescription: "將一張或多張圖片轉換為單一 PDF 文件。支援 JPG 和 PNG 格式，一次最多 20 張圖片。每張圖片成為 PDF 中的一頁，保留原始尺寸和品質。",
      steps: ["上傳圖片（JPG 或 PNG，最多 20 個檔案）", "拖曳排列頁面順序", "點選處理並下載 PDF"],
      faq: [
        { q: "可以將多張圖片合併為一個 PDF 嗎？", a: "可以。上傳最多 20 張圖片，它們會按你排列的順序合併為一個 PDF，每張圖片一頁。" },
        { q: "會降低圖片品質嗎？", a: "不會。圖片以原始解析度和品質嵌入，PDF 完整保留你上傳的內容。" },
        { q: "支援哪些圖片格式？", a: "支援 JPG 和 PNG 格式。其他格式如 HEIC 或 WebP，請先使用我們的其他工具轉換。" },
      ],
      related: ["jpg-to-pdf", "merge-pdf", "compress-image"],
      whyUs: "與將照片上傳到遠端伺服器的線上轉換器不同，JustUse.me 完全在瀏覽器中將圖片轉換為 PDF。你的照片不會離開裝置，適合處理個人文件、證件和敏感圖片。",
    },
    "json-formatter": {
      longDescription: "使用正確的縮排格式化並美化雜亂的 JSON 資料。貼上壓縮或雜亂的 JSON，即可獲得乾淨、易讀的輸出。會驗證你的 JSON 並在語法無效時標示錯誤。",
      steps: ["貼上或輸入你的 JSON 資料", "JSON 會即時格式化並驗證", "複製或下載格式化後的結果"],
      faq: [
        { q: "會驗證 JSON 語法嗎？", a: "會。如果你的 JSON 有語法錯誤，工具會告訴你問題所在，方便你修正。" },
        { q: "可以格式化大型 JSON 檔案嗎？", a: "可以。支援最大 500 KB 的文字輸入。" },
      ],
    },
    "word-counter": {
      longDescription: "統計任何文字中的字數、字元數、句子數和段落數。對需要達到字數目標的作家、學生和內容創作者而言不可或缺，適用於論文、文章或社群媒體貼文。",
      steps: ["貼上或輸入你的文字", "字數、字元數和句子數即時更新", "複製統計結果或繼續編輯"],
      faq: [
        { q: "會分別統計含空格和不含空格的字元嗎？", a: "會。兩種字元計數（含空格和不含空格）都會顯示。" },
        { q: "什麼算一個字？", a: "以空格或換行分隔的任何非空白字元序列算作一個字。" },
      ],
    },
    "base64-codec": {
      longDescription: "將文字編碼為 Base64，或將 Base64 字串解碼回純文字。常用於資料 URI、API 認證令牌、電子郵件編碼，以及在 URL 或 JSON 中嵌入資料。",
      steps: ["選擇編碼或解碼模式", "貼上你的文字或 Base64 字串", "即時取得結果"],
      faq: [
        { q: "什麼是 Base64 編碼？", a: "Base64 將二進位資料或文字轉換為 ASCII 字元。用於在僅支援文字的系統（如電子郵件或 URL）中安全傳輸資料。" },
        { q: "Base64 是加密嗎？", a: "不是。Base64 是編碼，不是加密。任何人都能解碼 Base64 字串。它用於資料格式化，而非安全性。" },
      ],
    },
    "markdown-to-html": {
      longDescription: "將 Markdown 文字轉換為乾淨的 HTML。預覽渲染結果並下載 HTML 檔案。適合部落格文章、技術文件、README 檔案，以及任何 Markdown 轉網頁的工作流程。",
      steps: ["貼上你的 Markdown 文字", "即時查看渲染後的 HTML 預覽", "下載 HTML 檔案"],
      faq: [
        { q: "支援哪些 Markdown 功能？", a: "標準 Markdown，包括標題、粗體、斜體、連結、圖片、程式碼區塊、清單、引用區塊和表格。" },
        { q: "HTML 輸出乾淨嗎？", a: "是的。輸出為語義化 HTML，不含多餘的包裹層或行內樣式。" },
      ],
    },
    "diff-checker": {
      longDescription: "並排比對兩段文字並標示差異。找出程式碼版本之間、文件編輯或設定檔的變更。",
      steps: ["在左側貼上原始文字", "在右側貼上修改後的文字", "差異會自動標示出來"],
      faq: [
        { q: "可以比對程式碼檔案嗎？", a: "可以。差異比對器適用於任何文字內容，包括原始碼、設定檔和文件。" },
        { q: "變更如何標示？", a: "新增的行以綠色顯示，刪除的行以紅色顯示，未變更的行以預設顏色顯示。" },
      ],
    },
    "js-minifier": {
      longDescription: "透過移除空白、註解和不必要的字元來壓縮 JavaScript 程式碼。縮小 JS 檔案大小以加快頁面載入。",
      steps: ["貼上你的 JavaScript 程式碼", "程式碼會即時壓縮", "複製或下載壓縮後的輸出"],
      faq: [
        { q: "壓縮會破壞程式碼嗎？", a: "不會。壓縮只會移除空白和註解。程式碼邏輯完全不變。" },
        { q: "JS 可以縮小多少？", a: "通常可縮小 20-40%。包含大量註解和格式化的檔案縮小幅度最大。" },
      ],
    },
    "css-minifier": {
      longDescription: "透過移除空白、註解和多餘字元來壓縮 CSS 樣式表。較小的 CSS 檔案意味著更快的頁面載入速度和更好的 Core Web Vitals 分數。",
      steps: ["貼上你的 CSS 程式碼", "樣式表會即時壓縮", "複製或下載壓縮後的 CSS"],
      faq: [
        { q: "CSS 壓縮會影響渲染嗎？", a: "不會。壓縮後的 CSS 渲染結果與原始完全相同。只有空白和註解會被移除。" },
        { q: "正式環境應該壓縮 CSS 嗎？", a: "應該。壓縮是標準的正式環境最佳化。所有主要網站都提供壓縮後的 CSS。" },
      ],
    },
    "csv-to-json": {
      longDescription: "將 CSV 試算表資料轉換為 JSON 格式。適合將資料匯入網頁應用程式、API 或資料庫。第一列會作為每個 JSON 物件的屬性名稱。",
      steps: ["上傳你的 CSV 檔案", "資料會被解析並轉換為 JSON", "預覽並下載 JSON 輸出"],
      faq: [
        { q: "欄位標題如何處理？", a: "CSV 的第一列會成為每個 JSON 物件中的屬性名稱。" },
        { q: "使用什麼分隔符號？", a: "標準的逗號分隔值。解析器也能處理包含逗號的引號欄位。" },
      ],
    },
    "json-to-csv": {
      longDescription: "將 JSON 陣列轉換為 CSV 試算表格式。從 API 或資料庫匯出資料，轉為 Excel、Google Sheets 和其他試算表工具可直接開啟的格式。",
      steps: ["上傳你的 JSON 檔案（必須是物件陣列）", "資料會被轉換為 CSV 格式", "下載 CSV 檔案"],
      faq: [
        { q: "需要什麼 JSON 結構？", a: "輸入應為具有一致鍵值的物件陣列。" },
        { q: "結果可以在 Excel 中開啟嗎？", a: "可以。CSV 檔案可直接在 Excel、Google Sheets、Numbers 和其他試算表應用程式中開啟。" },
      ],
    },
    "yaml-json": {
      longDescription: "在 YAML 和 JSON 格式之間互相轉換。在兩種最流行的資料序列化格式之間切換設定檔、API 回應或資料。",
      steps: ["貼上你的 YAML 或 JSON 資料", "選擇轉換方向", "複製或下載轉換後的輸出"],
      faq: [
        { q: "什麼時候該用 YAML，什麼時候該用 JSON？", a: "YAML 更易於人類閱讀，適合設定檔。JSON 更適合 API 和資料交換，因為它更嚴謹且被更廣泛支援。" },
        { q: "註解會被保留嗎？", a: "YAML 的註解在轉換過程中會遺失，因為 JSON 不支援註解。" },
      ],
    },
    "xml-formatter": {
      longDescription: "使用正確的縮排格式化並美化 XML 資料。貼上雜亂或壓縮的 XML，即可獲得乾淨、易讀的輸出。適合 API 回應、設定檔和 SOAP 訊息。",
      steps: ["貼上你的 XML 資料", "XML 會以正確的縮排格式化", "複製或下載格式化後的結果"],
      faq: [
        { q: "會驗證 XML 嗎？", a: "會執行基本的結構驗證。格式不正確的 XML 會產生錯誤訊息。" },
        { q: "CDATA 會被保留嗎？", a: "會。CDATA 區段、註解和處理指令都會保留在輸出中。" },
      ],
    },
    "xml-to-json": {
      longDescription: "將 XML 文件、API 回應或設定檔轉換為乾淨的 JSON 格式。保留屬性、巢狀元素和文字內容。適合處理 SOAP API、RSS 訂閱、SVG 資料，或任何需要轉為 JSON 使用的 XML 格式。",
      steps: ["上傳你的 XML 檔案", "XML 會被即時解析並轉換為 JSON", "下載或複製 JSON 輸出"],
      faq: [
        { q: "XML 屬性如何處理？", a: "XML 屬性在 JSON 輸出中以 @_ 為前綴。例如，<div class=\"main\"> 會變成 {\"div\": {\"@_class\": \"main\"}}。這樣可以區分屬性和子元素。" },
        { q: "支援巢狀 XML 嗎？", a: "支援。所有巢狀元素、重複元素陣列和混合內容都會保留在 JSON 結構中。可處理任意深度的巢狀。" },
        { q: "能轉換大型 XML 檔案嗎？", a: "支援最大 5MB 的檔案。處理完全在瀏覽器中進行，無需上傳。" },
      ],
      related: ["xml-formatter", "json-formatter", "json-to-yaml"],
    },
    "qr-code": {
      longDescription: "從任何文字或網址產生 QR Code。為連結、Wi-Fi 密碼、聯絡資訊或任何文字內容建立可掃描的條碼。下載為高品質 PNG 圖片。",
      steps: ["輸入你要編碼的文字或網址", "QR Code 會即時產生", "下載 QR Code 的 PNG 圖片"],
      faq: [
        { q: "QR Code 可以容納多少資料？", a: "QR Code 最多可容納約 3,000 個字元的文字。對大多數網址和簡短訊息而言綽綽有餘。" },
        { q: "可以自訂 QR Code 外觀嗎？", a: "目前版本產生標準的黑白 QR Code，針對最高掃描可靠性進行最佳化。" },
      ],
    },
    "color-converter": {
      longDescription: "在 HEX、RGB 和 HSL 格式之間轉換色彩。對需要在不同格式之間切換色彩值的設計師和開發者而言不可或缺，適用於 CSS、設計工具或品牌規範。",
      steps: ["輸入 HEX、RGB 或 HSL 格式的色彩值", "查看色彩預覽和所有格式的轉換結果", "複製你需要的值"],
      faq: [
        { q: "支援哪些色彩格式？", a: "HEX（例如 #FF5733）、RGB（例如 rgb(255,87,51)）和 HSL（例如 hsl(11,100%,60%)）。" },
        { q: "可以用視覺方式選色嗎？", a: "輸入任何支援的格式，工具會即時顯示該色彩的預覽色塊。" },
      ],
    },
    "sql-formatter": {
      longDescription: "格式化雜亂的 SQL 查詢語句，自動加上正確的縮排和關鍵字大寫。支援標準 SQL、PostgreSQL、MySQL 等多種方言。讓複雜查詢變得易讀且方便除錯。",
      steps: ["貼上你的 SQL 查詢", "查詢會即時格式化並加上正確縮排", "複製或下載格式化後的 SQL"],
      faq: [
        { q: "支援哪些 SQL 方言？", a: "標準 SQL、PostgreSQL、MySQL、MariaDB、SQLite、BigQuery 等。" },
        { q: "會改變查詢邏輯嗎？", a: "不會。格式化只影響空白和關鍵字大小寫，查詢邏輯完全不變。" },
      ],
    },
    "html-beautifier": {
      longDescription: "格式化並縮排雜亂或壓縮過的 HTML 程式碼。讓 HTML 變得易讀，加上正確的縮排和換行。適合除錯範本、檢查頁面原始碼或清理產生的 HTML。",
      steps: ["貼上你的 HTML 程式碼", "HTML 會即時美化並加上正確縮排", "複製或下載格式化後的 HTML"],
      faq: [
        { q: "會修復錯誤的 HTML 嗎？", a: "不會。美化器只格式化有效的 HTML，不會修復遺失的標籤或結構問題。" },
        { q: "行內樣式和腳本也會格式化嗎？", a: "會。HTML 中嵌入的 CSS 和 JavaScript 也會被正確縮排。" },
      ],
    },
    "jwt-decoder": {
      longDescription: "解碼 JSON Web Token（JWT）以檢視其標頭和載荷資訊。無需密鑰即可查看發行者、到期時間和自訂資料等聲明。除錯認證流程的必備工具。",
      steps: ["貼上你的 JWT 字串", "標頭和載荷會即時解碼", "檢視聲明和到期資料"],
      faq: [
        { q: "在這裡貼上 JWT 安全嗎？", a: "安全。解碼完全在你的瀏覽器中進行，你的權杖不會傳送到任何伺服器。" },
        { q: "可以驗證 JWT 簽章嗎？", a: "本工具用於解碼和顯示權杖內容。簽章驗證需要密鑰，不在此工具範圍內。" },
      ],
    },
    "cron-explainer": {
      longDescription: "將 Cron 表達式翻譯為易於理解的說明。即時理解複雜的排程任務計畫。支援 Unix、Linux 和大多數排程器使用的標準 5 欄位 Cron 語法。",
      steps: ["輸入 Cron 表達式（例如 */5 * * * *）", "即時查看易懂的文字說明", "複製說明用於文件"],
      faq: [
        { q: "支援什麼 Cron 格式？", a: "標準 5 欄位 Cron 表達式：分鐘、小時、日期、月份、星期。" },
        { q: "可以使用特殊字元嗎？", a: "可以。支援 *、/、- 和逗號表示法（如 1,15 或 */5）。" },
      ],
    },
    "slug-generator": {
      longDescription: "將任意文字轉換為 URL 友善的 slug。去除特殊字元，以連字號取代空格，全部轉為小寫。適合部落格文章 URL、檔案名稱和 SEO 友善路徑。",
      steps: ["輸入或貼上你的文字", "即時產生乾淨的 URL slug", "複製 slug 用於你的專案"],
      faq: [
        { q: "特殊字元如何處理？", a: "帶重音的字元會被轉寫，其他特殊字元會被移除。" },
        { q: "可以用作檔案名稱嗎？", a: "可以。Slug 只包含小寫字母、數字和連字號，非常適合作為檔案名稱。" },
      ],
    },
    "handlebars-preview": {
      longDescription: "使用即時 JSON 資料渲染 Handlebars 範本。撰寫範本、提供範例資料，即可立即查看渲染輸出。適合測試電子郵件範本、動態內容和範本邏輯。",
      steps: ["在頂部撰寫 Handlebars 範本", "加上 ---DATA--- 分隔線，在下方貼上 JSON 資料", "即時查看渲染結果"],
      faq: [
        { q: "支援哪些 Handlebars 功能？", a: "所有標準 Handlebars 功能：變數、條件判斷（if/else）、迴圈（each）、局部範本和輔助函式。" },
        { q: "如何提供資料？", a: "貼上範本後，另起一行加上 ---DATA---，然後在下方貼上 JSON 資料。" },
      ],
    },
    "html-to-markdown": {
      longDescription: "將 HTML 內容轉換為乾淨的 Markdown 格式。適合遷移部落格文章、轉換文件或從網頁中擷取內容用於靜態網站產生器。",
      steps: ["上傳 HTML 檔案", "HTML 即時轉換為 Markdown", "預覽並下載 Markdown 輸出"],
      faq: [
        { q: "支援哪些 HTML 元素？", a: "標題、段落、連結、圖片、清單、表格、程式碼區塊、粗體、斜體等。" },
        { q: "輸出乾淨嗎？", a: "是的。轉換器產生乾淨的 Markdown，沒有不必要的跳脫或多餘的空白。" },
      ],
    },
    "json5-to-json": {
      longDescription: "將 JSON5 轉換為標準 JSON 格式。JSON5 允許註解、結尾逗號、未加引號的鍵和單引號字串。本工具去除所有 JSON5 擴充語法，輸出有效的 JSON。",
      steps: ["上傳 JSON5 檔案", "檔案被解析並轉換為標準 JSON", "下載有效的 JSON 輸出"],
      faq: [
        { q: "什麼是 JSON5？", a: "JSON5 是 JSON 的超集，允許註解、結尾逗號、未加引號的鍵和其他寬鬆語法。常用於設定檔。" },
        { q: "註解會保留嗎？", a: "不會。由於標準 JSON 不支援註解，轉換時註解會被去除。" },
      ],
    },
    "toml-to-json": {
      longDescription: "將 TOML 設定檔轉換為 JSON 格式。TOML 廣泛用於 Rust（Cargo.toml）、Python（pyproject.toml）等工具。轉換為 JSON 後可用於 JavaScript 專案或 API。",
      steps: ["上傳 TOML 檔案", "檔案被解析並轉換為 JSON", "下載 JSON 輸出"],
      faq: [
        { q: "什麼是 TOML？", a: "TOML 是一種設計為易於閱讀的設定檔格式。被 Cargo、Hugo 等許多工具使用。" },
        { q: "支援巢狀表嗎？", a: "支援。所有 TOML 特性，包括巢狀表、表陣列和行內表都支援。" },
      ],
    },
    "json-to-markdown-table": {
      longDescription: "將 JSON 陣列轉換為易讀的 Markdown 表格。適合從結構化資料建立文件、README 檔案或報告。每個物件變為一列，鍵變為欄位標題。",
      steps: ["上傳包含物件陣列的 JSON 檔案", "資料轉換為 Markdown 表格", "複製或下載 Markdown 表格"],
      faq: [
        { q: "需要什麼 JSON 結構？", a: "包含一致鍵值的物件陣列。每個物件變為表格的一列。" },
        { q: "巢狀值如何處理？", a: "巢狀物件和陣列會在表格儲存格中序列化為 JSON 字串。" },
      ],
    },
    "json-to-yaml": {
      longDescription: "將 JSON 設定檔、API 回應或資料檔案轉換為簡潔的 YAML 格式。產生具有正確縮排的易讀 YAML。適用於 Kubernetes 設定、Docker Compose 檔案、CI/CD 管線以及任何偏好 YAML 而非 JSON 的場景。",
      steps: ["上傳或貼上 JSON 檔案", "JSON 被解析並即時轉換為 YAML", "下載或複製 YAML 輸出"],
      faq: [
        { q: "為什麼要將 JSON 轉為 YAML？", a: "YAML 比 JSON 更易於閱讀設定檔。它支援註解，視覺雜訊更少（無引號或大括號），是 Kubernetes、Docker Compose、GitHub Actions 和許多 CI/CD 工具的標準格式。" },
        { q: "資料結構會保留嗎？", a: "是的。所有鍵、值、陣列和巢狀物件都會被精確保留。轉換是無損的——可以轉回 JSON 取得相同資料。" },
        { q: "能處理大型 JSON 檔案嗎？", a: "可以，最大支援 5MB。轉換在瀏覽器中執行，大檔案無需等待上傳。" },
      ],
      related: ["yaml-json", "json-formatter", "json-validator"],
    },
    "typescript-to-js": {
      longDescription: "去除 TypeScript 型別註解，產生純 JavaScript。移除介面、型別別名、泛型和其他 TypeScript 特有語法，同時保留執行時邏輯。",
      steps: ["上傳 TypeScript 檔案", "型別被去除並產生 JavaScript", "下載純 JavaScript 輸出"],
      faq: [
        { q: "會編譯 TypeScript 功能嗎？", a: "只去除型別。現代 JS 特性如可選鏈結和空值合併運算子會原樣保留。" },
        { q: "列舉會被轉換嗎？", a: "TypeScript 列舉會被轉譯為對應的 JavaScript 形式。" },
      ],
    },
    "uuid-generator": {
      longDescription: "即時產生隨機 UUID（通用唯一識別碼）v4 版本。UUID 用作資料庫主鍵、API 請求 ID、工作階段權杖以及任何需要全域唯一識別碼的場景。",
      steps: ["輸入要產生的 UUID 數量（1-100）", "UUID 即時產生", "複製 UUID 用於你的專案"],
      faq: [
        { q: "產生的 UUID 真的唯一嗎？", a: "UUID v4 使用加密隨機值。碰撞機率極低，約為 2^122 分之一。" },
        { q: "使用什麼格式？", a: "標準 UUID v4 格式：8-4-4-4-12 十六進位字元（如 550e8400-e29b-41d4-a716-446655440000）。" },
      ],
    },
    "lorem-ipsum": {
      longDescription: "為設計、原型和模型產生 Lorem Ipsum 佔位文字。選擇需要的段落數。這是自 16 世紀以來設計師和排版人員使用的經典虛擬文字。",
      steps: ["輸入要產生的段落數", "Lorem Ipsum 文字即時產生", "複製文字用於你的設計"],
      faq: [
        { q: "什麼是 Lorem Ipsum？", a: "Lorem Ipsum 是源自西塞羅（公元前 45 年）著作的佔位文字。幾個世紀以來一直是印刷業的標準虛擬文字。" },
        { q: "可以自訂輸出嗎？", a: "可以指定要產生的段落數。" },
      ],
    },
    "hash-generator": {
      longDescription: "從任意檔案產生加密雜湊值。支援 MD5、SHA-1、SHA-256 和 SHA-512。用於驗證檔案完整性、偵測重複檔案或建立分發校驗碼。",
      steps: ["上傳任意檔案", "所有雜湊值即時計算", "複製你需要的雜湊值"],
      faq: [
        { q: "提供哪些雜湊演算法？", a: "MD5、SHA-1、SHA-256 和 SHA-512，所有演算法同時計算。" },
        { q: "雜湊計算在本機進行嗎？", a: "是的。所有雜湊計算使用 WebAssembly 在瀏覽器中執行，檔案不會上傳。" },
      ],
    },
    "barcode-generator": {
      longDescription: "從文字產生多種格式的條碼。支援 CODE128、EAN-13、UPC-A、CODE39、ITF-14 等格式。下載為高品質 PNG 圖片，可用於列印或數位用途。",
      steps: ["輸入要編碼的文字或數字", "選擇條碼格式", "下載條碼 PNG 圖片"],
      faq: [
        { q: "支援哪些條碼格式？", a: "CODE128、EAN-13、EAN-8、UPC-A、CODE39、ITF-14、MSI、Pharmacode 和 Codabar。" },
        { q: "產生的條碼可以掃描嗎？", a: "可以。所有產生的條碼符合標準規範，任何條碼讀取器都可以掃描。" },
      ],
    },
    "exif-viewer": {
      longDescription: "檢視照片中嵌入的 EXIF 中繼資料。查看相機型號、鏡頭、ISO、快門速度、光圈、GPS 座標、拍攝日期等資訊。支援 JPG 和 TIFF 圖片。",
      steps: ["上傳照片（JPG 或 TIFF）", "所有 EXIF 中繼資料即時顯示", "檢視相機參數、GPS 資料等"],
      faq: [
        { q: "可以看到哪些資訊？", a: "相機品牌/型號、鏡頭、ISO、快門速度、光圈、焦距、GPS 座標、拍攝日期等。" },
        { q: "照片會被上傳嗎？", a: "不會。EXIF 資料完全在你的瀏覽器中讀取，照片不會離開你的裝置。" },
      ],
    },
    "ico-converter": {
      longDescription: "將任意圖片轉換為 ICO 格式，用作網站 favicon 圖示。產生包含 16x16、32x32 和 48x48 像素的多尺寸 ICO 檔案。支援 PNG、JPG 和 WebP 輸入。",
      steps: ["上傳圖片（PNG、JPG 或 WebP）", "圖片自動縮放為標準 favicon 尺寸", "下載多尺寸 ICO 檔案"],
      faq: [
        { q: "ICO 檔案包含哪些尺寸？", a: "ICO 檔案包含三種尺寸：16x16、32x32 和 48x48 像素，涵蓋了各瀏覽器和作業系統最常用的 favicon 場景。" },
        { q: "任何圖片都能做 favicon 嗎？", a: "可以，但簡單的 logo 和圖示效果最好。複雜的照片在小尺寸下會遺失細節。建議使用正方形圖片。" },
        { q: "如何將 favicon 新增到網站？", a: "將 .ico 檔案放在網站根目錄命名為 favicon.ico，或在 HTML 頭部新增：<link rel=\"icon\" href=\"/favicon.ico\">。" },
      ],
      related: ["favicon-generator", "svg-to-png", "resize-image"],
    },
  } as Record<string, { longDescription: string; steps: string[]; faq: { q: string; a: string }[] }>,

  // ─── 資訊與教學 ───
  news: {
    title: "資訊與教學",
    description: "檔案工具使用技巧、教學和生產力建議。",
    readMore: "閱讀更多",
    publishedOn: "發佈於",
    relatedTools: "相關工具",
    relatedArticles: "相關文章",
    allCategories: "全部",
    tutorial: "教學",
    comparison: "比較",
    "use-case": "使用場景",
    trend: "趨勢",
    noArticles: "暫無文章，敬請期待！",
  },

  // ─── 關於 ───
  about: {
    title: "關於 JustUse.me",
    description: "JustUse.me 由 Paymomentum LLC 建置及維護。我們相信日常檔案工具應該免費、私密且快速。",
    mission: "我們的使命",
    missionDesc: "我們打造 JustUse.me 是因為我們厭倦了那些將檔案上傳到不明伺服器、在輸出上加浮水印、強迫使用者註冊帳號才能完成簡單任務的線上工具。JustUse.me 上的每一個工具都完全在您的瀏覽器中處理檔案——您的資料永遠不會離開您的裝置。",
    howItWorks: "運作原理",
    howItWorksDesc: "JustUse.me 使用 WebAssembly、Canvas API 和 Web Workers 等現代瀏覽器技術在本機處理檔案。當您合併 PDF 或壓縮圖片時，運算在您的裝置上完成。無需伺服器往返、無上傳延遲、無隱私風險。",
    team: "關於團隊",
    teamDesc: "JustUse.me 是 Paymomentum LLC 的產品。我們是一個專注於打造簡單、尊重隱私的日常工具的小團隊。",
    contact: "聯絡我們",
    contactDesc: "有問題、建議或發現了 bug？我們很樂意聽到您的聲音。",
    contactLink: "聯絡我們",
  },
};

export default zhTW;
