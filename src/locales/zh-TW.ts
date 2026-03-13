const zhTW = {
  // ─── Navigation ───
  nav: {
    pricing: "方案價格",
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
  },

  // ─── Category pages ───
  categoryPage: {
    pdf: { title: "PDF 工具", description: "線上免費合併、分割、壓縮和轉換 PDF。" },
    image: { title: "圖片工具", description: "即時壓縮、調整大小和轉換圖片。" },
    text: { title: "文字與程式碼工具", description: "格式化 JSON、字數統計、Base64 編解碼等。" },
    convert: { title: "格式轉換工具", description: "在 CSV、JSON、YAML、XML 等格式之間互相轉換。" },
    generator: { title: "產生器工具", description: "產生 QR Code、色彩調色盤等。" },
  },

  // ─── Tool page ───
  tool: {
    processedLocally: "本機處理 — 檔案絕不離開你的裝置",
    textInput: "文字輸入",
    max: "最大 {size}",
    upTo: "最多 {n} 個檔案",
    howItWorks: "使用方式",
    about: "關於{name}",
    aboutSuffix: "由 JustUse.me 提供 — 免費、無廣告、保護隱私。",
    aboutBrowser: "此工具完全在你的瀏覽器中運行，你的檔案不會被上傳至任何伺服器。",
    faq: "常見問題",
    relatedTools: "相關工具",
    notFound: "找不到該工具。",
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
    siteDescription: "免費線上工具：合併 PDF、壓縮圖片、格式化 JSON 等超過 25 種工具。無廣告、免註冊、無浮水印，檔案絕不離開你的瀏覽器。",
    ogTitle: "JustUse.me — 免費線上工具",
    ogDescription: "超過 30 種免費線上工具，涵蓋 PDF、圖片和文字處理。無廣告、免註冊、隱私優先 — 檔案絕不離開你的瀏覽器。",
    twitterDescription: "超過 30 種免費工具。無廣告、免註冊，檔案留在你的瀏覽器中。",
    categoryMetaTitle: "免費線上{label} — 無廣告、免註冊 | JustUse.me",
    categoryMetaDescription: "{desc} 免費、保護隱私，在你的瀏覽器中運行。無浮水印、無檔案上傳。",
    toolMetaTitle: "免費線上{name}",
    toolMetaSuffix: "免費、無廣告、免註冊。你的檔案留在你的裝置上。",
    toolOgTitle: "{name} — 免費線上工具 | JustUse.me",
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
    "ocr-image": { name: "圖片轉文字 (OCR)", description: "使用 OCR 從圖片中擷取文字。" },
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
    "qr-code": { name: "QR Code 產生器", description: "從文字或網址產生 QR Code。" },
    "color-converter": { name: "色彩轉換器", description: "在 HEX、RGB 和 HSL 之間轉換色彩。" },
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
      longDescription: "使用光學字元辨識 (OCR) 從圖片中擷取文字。支援英文和中文。適用於螢幕截圖、文件照片、收據、招牌，以及任何包含文字的圖片。",
      steps: ["上傳包含文字的圖片", "OCR 處理圖片（可能需要幾秒鐘）", "預覽並下載擷取的文字"],
      faq: [
        { q: "支援哪些語言？", a: "支援英文和中文（簡體）。OCR 引擎能自動辨識同一張圖片中的兩種語言。" },
        { q: "圖片會被上傳到伺服器嗎？", a: "不會。OCR 完全在你的瀏覽器中使用 Tesseract.js 運行。你的圖片不會離開裝置。" },
      ],
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
  } as Record<string, { longDescription: string; steps: string[]; faq: { q: string; a: string }[] }>,
};

export default zhTW;
