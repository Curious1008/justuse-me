const zhCN = {
  // ─── Navigation ───
  nav: {
    pricing: "价格",
    contact: "联系我们",
    signIn: "登录",
    signOut: "退出登录",
    freePlan: "免费版",
    proPlan: "专业版",
    upgradeToPro: "升级到专业版",
    manageSubscription: "管理订阅",
  },

  // ─── Homepage ───
  hero: {
    title: "轻松搞定，",
    titleAccent: "高效办公。",
    subtitle: "日常文件工具，随时为你准备。",
  },

  // ─── Search ───
  search: {
    placeholder: '试试"合并PDF"或"压缩图片"',
    noResults: "未找到相关工具：",
    viewAll: "查看全部{category}工具",
  },

  // ─── Category bubbles ───
  categories: {
    pdf: "PDF",
    image: "图片",
    text: "文本与代码",
    convert: "格式转换",
    generator: "生成器",
  },

  // ─── Category pages ───
  categoryPage: {
    pdf: { title: "PDF工具", description: "在线免费合并、拆分、压缩和转换PDF文件。" },
    image: { title: "图片工具", description: "即时压缩、调整大小和转换图片格式。" },
    text: { title: "文本与代码工具", description: "格式化JSON、统计字数、Base64编解码等实用工具。" },
    convert: { title: "格式转换工具", description: "在CSV、JSON、YAML、XML等格式之间自由转换。" },
    generator: { title: "生成器工具", description: "生成二维码、颜色转换等实用工具。" },
  },

  // ─── Tool page ───
  tool: {
    processedLocally: "本地处理 — 文件不会离开你的设备",
    textInput: "文本输入",
    max: "最大 {size}",
    upTo: "最多 {n} 个文件",
    howItWorks: "使用方法",
    about: "关于{name}",
    aboutSuffix: "由 JustUse.me 提供 — 免费、无广告、保护隐私。",
    aboutBrowser: "此工具完全在浏览器中运行，文件不会上传到任何服务器。",
    faq: "常见问题",
    relatedTools: "相关工具",
    notFound: "未找到该工具。",
  },

  // ─── Footer ───
  footer: {
    copyright: "\u00a9 {year} JustUse.me — Paymomentum LLC",
    privacyNotice: "我们重视你的隐私",
    privacyPolicy: "隐私政策",
    terms: "服务条款",
  },

  // ─── Pricing ───
  pricing: {
    title: "简单透明的价格",
    subtitle: "无隐藏费用，随时可取消。",
    success: "欢迎使用专业版！你的订阅已生效。",
    canceled: "支付已取消，未产生任何费用。",
    free: "免费版",
    pro: "专业版",
    popular: "热门",
    perMonth: "/月",
    freeFeatures: ["每天3次使用", "所有工具可用", "无水印", "浏览器端隐私保护"],
    proFeatures: ["无限次使用", "所有工具可用", "无水印", "浏览器端隐私保护", "优先客服支持"],
    getStarted: "开始使用",
    upgradeToPro: "升级到专业版",
    redirecting: "跳转中...",
    manageSubscription: "管理订阅",
  },

  // ─── Contact ───
  contact: {
    title: "联系我们",
    subtitle: "有问题或建议？欢迎随时联系我们。",
    namePlaceholder: "你的姓名",
    emailPlaceholder: "你的邮箱",
    messagePlaceholder: "你的留言",
    send: "发送消息",
    sending: "发送中...",
    success: "消息已发送！我们会尽快回复你。",
    sendAnother: "发送另一条消息",
  },

  // ─── Login ───
  login: {
    title: "欢迎回来",
    subtitle: "登录以跟踪使用量并解锁专业版功能。",
    google: "使用 Google 登录",
    error: "登录失败，请重试。",
    termsPrefix: "登录即表示你同意我们的",
    and: "和",
  },

  // ─── Metadata / SEO ───
  meta: {
    siteTitle: "JustUse.me — 免费在线PDF、图片和文本工具",
    siteDescription: "免费在线工具：合并PDF、压缩图片、格式化JSON等30+工具。无广告、无需注册、无水印，文件不会离开你的浏览器。",
    ogTitle: "JustUse.me — 免费在线工具箱",
    ogDescription: "30+免费在线工具，处理PDF、图片和文本。无广告、无需注册，隐私优先 — 文件不会离开你的浏览器。",
    twitterDescription: "30+免费工具，无广告、无需注册，文件在浏览器中处理。",
    categoryMetaTitle: "免费在线{label} — 无广告、无需注册 | JustUse.me",
    categoryMetaDescription: "{desc} 免费、保护隐私、在浏览器中运行。无水印、无需上传文件。",
    toolMetaTitle: "免费在线{name}",
    toolMetaSuffix: "免费、无广告、无需注册。文件始终留在你的设备上。",
    toolMetaDescSuffix: "在浏览器中运行，文件不会上传到任何服务器。免费使用，无需注册。",
    toolOgTitle: "{name} — 免费在线工具 | JustUse.me",
  },

  // ─── Tool names & descriptions (keyed by tool ID) ───
  tools: {
    "merge-pdf": { name: "合并PDF", description: "将多个PDF文件合并为一个文档。" },
    "split-pdf": { name: "拆分PDF", description: "从PDF中提取页面或拆分为多个文件。" },
    "compress-pdf": { name: "压缩PDF", description: "减小PDF文件大小，同时保持可读性。" },
    "pdf-to-jpg": { name: "PDF转JPG", description: "将PDF页面转换为高质量JPG图片。" },
    "jpg-to-pdf": { name: "JPG转PDF", description: "将图片合并为一个PDF文档。" },
    "rotate-pdf": { name: "旋转PDF", description: "将PDF所有页面旋转90、180或270度。" },
    "pdf-to-text": { name: "PDF转文本", description: "从PDF文件中提取文本内容。" },
    "watermark-pdf": { name: "PDF加水印", description: "在PDF每一页添加文字水印。" },
    "page-numbers-pdf": { name: "添加页码", description: "为PDF每一页添加页码。" },
    "compress-image": { name: "压缩图片", description: "减小图片文件大小，画质无明显损失。" },
    "resize-image": { name: "调整图片大小", description: "将图片调整为任意尺寸。" },
    "crop-image": { name: "裁剪图片", description: "通过拖拽选框可视化裁剪图片。" },
    "png-to-jpg": { name: "PNG转JPG", description: "将PNG图片转换为JPG格式。" },
    "jpg-to-png": { name: "JPG转PNG", description: "将JPG图片转换为无损PNG格式。" },
    "heic-to-jpg": { name: "HEIC转JPG", description: "将iPhone HEIC照片转换为JPG格式。" },
    "svg-to-png": { name: "SVG转PNG", description: "将SVG矢量图转换为PNG图片。" },
    "ocr-image": { name: "图片转文字(OCR)", description: "使用OCR从图片中提取文字。" },
    "json-formatter": { name: "JSON格式化", description: "格式化和美化JSON数据。" },
    "word-counter": { name: "字数统计", description: "统计字数、字符数和句子数。" },
    "base64-codec": { name: "Base64编解码", description: "编码或解码Base64字符串。" },
    "markdown-to-html": { name: "Markdown转HTML", description: "将Markdown转换为HTML。" },
    "diff-checker": { name: "文本对比", description: "对比两段文本并高亮显示差异。" },
    "js-minifier": { name: "JS压缩", description: "压缩JavaScript代码用于生产环境。" },
    "css-minifier": { name: "CSS压缩", description: "压缩CSS样式表以加快加载速度。" },
    "csv-to-json": { name: "CSV转JSON", description: "将CSV数据转换为JSON格式。" },
    "json-to-csv": { name: "JSON转CSV", description: "将JSON数组转换为CSV表格格式。" },
    "yaml-json": { name: "YAML / JSON转换", description: "在YAML和JSON格式之间互相转换。" },
    "xml-formatter": { name: "XML格式化", description: "格式化和美化XML数据。" },
    "qr-code": { name: "二维码生成器", description: "从文本或网址生成二维码。" },
    "color-converter": { name: "颜色转换器", description: "在HEX、RGB和HSL之间转换颜色值。" },
  } as Record<string, { name: string; description: string }>,

  // ─── Tool SEO content (keyed by tool ID) ───
  toolSeo: {
    "merge-pdf": {
      longDescription: "在线合并多个PDF文件为一个文档，几秒钟即可完成。无水印、无文件大小限制、无需注册。文件直接在浏览器中合并，不会上传到任何服务器。",
      steps: ["拖放或选择需要合并的PDF文件", "拖拽调整页面顺序", "点击合并并下载合并后的PDF"],
      faq: [
        { q: "在线合并PDF安全吗？", a: "安全。JustUse.me完全在浏览器中使用JavaScript处理文件，PDF不会上传到任何服务器，完全保护你的隐私。" },
        { q: "可以一次合并两个以上的PDF吗？", a: "可以。你最多可以一次合并20个PDF文件，拖拽即可调整顺序。" },
        { q: "合并会降低PDF的质量吗？", a: "不会。合并过程只是将文件组合在一起，不会重新编码，文字、图片和格式都保持不变。" },
      ],
    },
    "split-pdf": {
      longDescription: "从PDF中提取指定页面或将其拆分为多个文件。适合提取章节、单个页面，或将大文档拆分为小文件。完全在浏览器中离线运行。",
      steps: ["上传需要拆分的PDF文件", "输入要提取的页码或范围（如1-3, 5, 8-12）", "点击拆分并下载结果"],
      faq: [
        { q: "可以只提取PDF中的一页吗？", a: "可以。输入单个页码如\"3\"，即可获得仅包含该页的PDF。" },
        { q: "拆分PDF会降低质量吗？", a: "不会。页面按原样提取，没有任何重新压缩或质量损失。" },
      ],
    },
    "compress-pdf": {
      longDescription: "减小PDF文件大小，方便邮件发送、上传或快速分享。可调整压缩级别，在文件大小和视觉质量之间取得平衡。特别适合扫描文档和包含大量图片的PDF。",
      steps: ["上传你的PDF文件", "调整质量滑块 — 越低文件越小", "点击压缩并下载压缩后的PDF"],
      faq: [
        { q: "PDF可以压缩多少？", a: "包含大量图片的PDF通常可压缩50-80%。纯文本PDF压缩空间较小，因为本身就比较紧凑。" },
        { q: "压缩后文本还能选中复制吗？", a: "压缩会将页面转换为优化后的图片，因此输出文件中的文本无法选中。适合用于分享或归档，不适合需要编辑的场景。" },
      ],
    },
    "pdf-to-jpg": {
      longDescription: "将PDF每一页转换为高质量JPG图片。适合在社交媒体分享、嵌入演示文稿或从文档中提取图片内容。",
      steps: ["上传你的PDF文件", "每一页会自动转换为JPG图片", "将所有图片打包为ZIP文件下载"],
      faq: [
        { q: "输出图片的分辨率是多少？", a: "图片以2倍分辨率渲染，清晰度高，适合打印或演示使用。" },
        { q: "可以只转换特定页面吗？", a: "目前会转换所有页面。如需特定页面，可先使用拆分PDF工具，再转换结果。" },
      ],
    },
    "jpg-to-pdf": {
      longDescription: "将一张或多张图片合并为一个PDF文档。适合制作相册、合并扫描文档或打包多张图片进行分享。支持JPG、PNG和WebP格式。",
      steps: ["拖放图片文件（JPG、PNG或WebP）", "需要时拖拽调整顺序", "点击转换并下载PDF"],
      faq: [
        { q: "可以将多张图片合并为一个PDF吗？", a: "可以。最多拖入20张图片，每张图片会作为PDF的一页。" },
        { q: "图片会损失质量吗？", a: "不会。图片以原始分辨率嵌入，不会进行额外压缩。" },
      ],
    },
    "rotate-pdf": {
      longDescription: "将PDF所有页面旋转90、180或270度。修正扫描歪斜、倒置的文档或需要调整方向的页面。",
      steps: ["上传需要旋转的PDF文件", "选择旋转角度（90、180或270度）", "点击旋转并下载修正后的PDF"],
      faq: [
        { q: "可以只旋转个别页面吗？", a: "目前所有页面会按相同角度旋转。如需选择性旋转，可先拆分PDF，旋转需要的页面，再合并回去。" },
        { q: "旋转会影响PDF质量吗？", a: "不会。旋转是无损操作，只改变页面方向，不会重新编码任何内容。" },
      ],
    },
    "pdf-to-text": {
      longDescription: "从PDF文件中提取所有文本内容。适用于文本型PDF（非扫描图片）。方便复制内容、搜索文档或转换为纯文本格式。",
      steps: ["上传你的PDF文件", "自动从所有页面提取文本", "预览并下载文本文件"],
      faq: [
        { q: "扫描件PDF可以用吗？", a: "本工具仅提取嵌入的文本。对于扫描文档或图片，请使用我们的图片转文字（OCR）工具。" },
        { q: "格式会保留吗？", a: "基本的文本内容和换行会保留，但复杂格式（表格、多栏排版）可能无法完美还原为纯文本。" },
      ],
    },
    "watermark-pdf": {
      longDescription: "在PDF每一页添加文字水印。保护机密文档、标记草稿或为文件添加品牌标识。",
      steps: ["上传你的PDF", "输入水印文字（如「机密」、「草稿」）", "点击添加水印并下载结果"],
      faq: [
        { q: "可以自定义水印外观吗？", a: "你可以设置任意文字。水印会以半透明对角线覆盖显示在每一页上。" },
        { q: "水印可以被去除吗？", a: "水印嵌入到PDF中，不容易被去除，适合用于文档保护。" },
      ],
    },
    "page-numbers-pdf": {
      longDescription: "为PDF文档的每一页添加页码。可选择6个位置（上/下，左/中/右），并设置自定义起始编号。",
      steps: ["上传你的PDF", "选择页码显示位置", "设置起始编号，然后点击添加页码"],
      faq: [
        { q: "可以不从第1页开始编号吗？", a: "可以。你可以设置任意起始编号，适合文档是大型作品一部分的情况。" },
        { q: "页码的字体和大小是什么？", a: "页码使用Helvetica字体，10pt大小，灰色显示，不影响正文阅读。" },
      ],
    },
    "compress-image": {
      longDescription: "在不明显损失画质的情况下减小图片文件大小。适合加速网站加载、满足邮件附件大小限制或节省存储空间。支持JPG、PNG和WebP格式。",
      steps: ["上传图片（JPG、PNG或WebP）", "调整质量滑块到你满意的程度", "点击压缩并下载更小的文件"],
      faq: [
        { q: "图片能压缩多少？", a: "高质量设置下通常可缩小40-70%。中等质量下可达70-90%的压缩率，肉眼几乎看不出差别。" },
        { q: "压缩会去除EXIF数据吗？", a: "会。压缩时会去除EXIF元数据（相机信息、GPS位置），这也有助于保护隐私。" },
      ],
    },
    "resize-image": {
      longDescription: "将图片调整为任意尺寸。可使用预设大小（50%、75%、1080p、720p）或输入自定义宽高。锁定宽高比防止图片变形。",
      steps: ["上传你的图片", "选择预设或输入自定义尺寸", "点击调整并下载调整后的图片"],
      faq: [
        { q: "可以不拉伸变形地调整大小吗？", a: "可以。默认锁定宽高比。如需拉伸到精确尺寸，可解锁宽高比。" },
        { q: "调整大小会降低质量吗？", a: "缩小图片是无损的。放大可能会降低清晰度，因为需要插值生成像素。" },
      ],
    },
    "crop-image": {
      longDescription: "通过可视化拖拽界面裁剪图片。提供预设宽高比（1:1、16:9、4:3、3:2），适合社交媒体、缩略图或演示文稿。",
      steps: ["上传你的图片", "拖动裁剪框或选择预设宽高比", "点击裁剪并下载裁剪后的图片"],
      faq: [
        { q: "可以按特定比例裁剪吗？", a: "可以。提供自由裁剪、1:1（正方形）、16:9（宽屏）、4:3和3:2等选项，裁剪框会自动调整。" },
        { q: "裁剪是无损的吗？", a: "裁剪区域以高质量保存（JPG为92%）。PNG裁剪完全无损。" },
      ],
    },
    "png-to-jpg": {
      longDescription: "将PNG图片转换为JPG格式以获得更小的文件。带透明度的PNG会使用白色背景填充。适合网页上传、邮件附件或需要JPG格式的场景。",
      steps: ["上传你的PNG图片", "图片在浏览器中即时转换", "下载JPG结果"],
      faq: [
        { q: "透明区域会怎样？", a: "透明区域会用白色背景填充，因为JPG不支持透明度。" },
        { q: "转换后文件会小多少？", a: "通常比原始PNG小50-80%，尤其是照片类图片效果更明显。" },
      ],
    },
    "jpg-to-png": {
      longDescription: "将JPG图片转换为PNG格式，获得无损质量或透明度支持。PNG是Logo、图标、截图和边缘锐利的图形的首选格式。",
      steps: ["上传你的JPG图片", "在浏览器中即时完成转换", "下载PNG文件"],
      faq: [
        { q: "转换后画质会提升吗？", a: "转为PNG不会恢复JPG压缩时损失的质量，但可以防止再次保存时进一步损失画质。" },
        { q: "文件会变大吗？", a: "通常会。PNG使用无损压缩，对于照片类图片会产生比JPG更大的文件。" },
      ],
    },
    "heic-to-jpg": {
      longDescription: "将iPhone拍摄的HEIC照片转换为通用的JPG格式。iPhone和iPad拍的HEIC文件在很多设备和平台上无法直接打开，转为JPG即可随意分享、上传或编辑。",
      steps: ["上传iPhone/iPad上的HEIC文件", "在浏览器中即时转换", "下载JPG版本"],
      faq: [
        { q: "什么是HEIC格式？", a: "HEIC（高效图像容器）是iPhone自iOS 11起的默认照片格式。它比JPG压缩效率更高，但兼容性不如JPG广泛。" },
        { q: "HEIC转JPG会损失画质吗？", a: "画质损失极小。转换使用高质量编码，尽可能保留原始细节。" },
      ],
    },
    "svg-to-png": {
      longDescription: "将SVG矢量图转换为PNG位图。当网站、应用或文档不支持SVG格式，或需要从矢量源获取固定分辨率图片时使用。",
      steps: ["上传你的SVG文件", "矢量图渲染为PNG图片", "下载PNG结果"],
      faq: [
        { q: "输出分辨率是多少？", a: "SVG按其定义的尺寸渲染，输出匹配SVG的viewBox尺寸。" },
        { q: "透明度会保留吗？", a: "会。SVG中的透明区域在输出的PNG中保持透明。" },
      ],
    },
    "ocr-image": {
      longDescription: "使用光学字符识别（OCR）技术从图片中提取文字。支持中文和英文。适用于截图、文档照片、收据、标牌以及任何包含文字的图片。",
      steps: ["上传包含文字的图片", "OCR处理图片（可能需要几秒钟）", "预览并下载提取的文字"],
      faq: [
        { q: "支持哪些语言？", a: "支持英文和简体中文。OCR引擎能自动识别同一张图片中的两种语言。" },
        { q: "图片会上传到服务器吗？", a: "不会。OCR完全在浏览器中使用Tesseract.js运行，图片始终留在你的设备上。" },
      ],
    },
    "json-formatter": {
      longDescription: "格式化和美化杂乱的JSON数据，自动添加正确的缩进。粘贴压缩过的或格式混乱的JSON，即可获得整洁可读的输出。同时验证JSON语法，高亮显示错误。",
      steps: ["粘贴或输入你的JSON数据", "JSON即时格式化并验证", "复制或下载格式化后的结果"],
      faq: [
        { q: "会验证JSON语法吗？", a: "会。如果JSON存在语法错误，工具会显示错误信息帮助你修正。" },
        { q: "可以格式化大型JSON文件吗？", a: "可以。支持最大500KB的文本输入。" },
      ],
    },
    "word-counter": {
      longDescription: "统计文本中的字数、字符数、句子数和段落数。作家、学生和内容创作者必备工具，帮助你达到论文、文章或社交媒体帖子的字数要求。",
      steps: ["粘贴或输入你的文本", "字数、字符数和句子数实时更新", "复制统计结果或继续编辑"],
      faq: [
        { q: "会分别统计含空格和不含空格的字符数吗？", a: "会。两种字符统计结果都会显示。" },
        { q: "什么算一个\"词\"？", a: "以空格或换行分隔的连续非空白字符序列算作一个词。" },
      ],
    },
    "base64-codec": {
      longDescription: "将文本编码为Base64或将Base64字符串解码为明文。常用于数据URI、API认证令牌、邮件编码以及在URL或JSON中嵌入数据。",
      steps: ["选择编码或解码模式", "粘贴你的文本或Base64字符串", "即时获得结果"],
      faq: [
        { q: "什么是Base64编码？", a: "Base64将二进制数据或文本转换为ASCII字符。用于在只支持文本的系统（如邮件或URL）中安全传输数据。" },
        { q: "Base64是加密吗？", a: "不是。Base64是编码，不是加密。任何人都可以解码Base64字符串。它用于数据格式转换，不用于安全加密。" },
      ],
    },
    "markdown-to-html": {
      longDescription: "将Markdown文本转换为HTML。实时预览渲染效果并下载HTML文件。适合博客文章、技术文档、README文件以及任何Markdown转网页的工作流程。",
      steps: ["粘贴你的Markdown文本", "实时查看渲染后的HTML预览", "下载HTML文件"],
      faq: [
        { q: "支持哪些Markdown语法？", a: "支持标准Markdown语法，包括标题、粗体、斜体、链接、图片、代码块、列表、引用和表格。" },
        { q: "输出的HTML干净吗？", a: "是的。输出的是语义化HTML，没有多余的包裹元素或内联样式。" },
      ],
    },
    "diff-checker": {
      longDescription: "并排对比两段文本并高亮显示差异。快速发现代码版本变更、文档编辑或配置文件的不同之处。",
      steps: ["在左侧粘贴原始文本", "在右侧粘贴修改后的文本", "差异自动高亮显示"],
      faq: [
        { q: "可以对比代码文件吗？", a: "可以。文本对比工具适用于任何文本内容，包括源代码、配置文件和文档。" },
        { q: "变更如何高亮显示？", a: "新增的行以绿色显示，删除的行以红色显示，未修改的行保持默认颜色。" },
      ],
    },
    "js-minifier": {
      longDescription: "通过去除空白、注释和不必要的字符来压缩JavaScript代码。减小JS文件大小，加速页面加载。",
      steps: ["粘贴你的JavaScript代码", "代码即时压缩", "复制或下载压缩后的代码"],
      faq: [
        { q: "压缩会破坏代码逻辑吗？", a: "不会。压缩仅去除空白和注释，代码逻辑完全不变。" },
        { q: "JS文件能压缩多少？", a: "通常可缩小20-40%。注释和格式多的文件压缩效果最明显。" },
      ],
    },
    "css-minifier": {
      longDescription: "通过去除空白、注释和冗余字符来压缩CSS样式表。更小的CSS文件意味着更快的页面加载和更好的Core Web Vitals分数。",
      steps: ["粘贴你的CSS代码", "样式表即时压缩", "复制或下载压缩后的CSS"],
      faq: [
        { q: "CSS压缩会影响页面渲染吗？", a: "不会。压缩后的CSS渲染效果与原始完全一致，仅去除了空白和注释。" },
        { q: "生产环境应该压缩CSS吗？", a: "应该。CSS压缩是标准的生产环境优化手段，所有主流网站都使用压缩后的CSS。" },
      ],
    },
    "csv-to-json": {
      longDescription: "将CSV表格数据转换为JSON格式。方便将数据导入Web应用、API或数据库。CSV第一行作为每个JSON对象的属性名。",
      steps: ["上传你的CSV文件", "数据自动解析并转换为JSON", "预览并下载JSON输出"],
      faq: [
        { q: "列标题如何处理？", a: "CSV的第一行会成为每个JSON对象的属性名。" },
        { q: "使用什么分隔符？", a: "标准的逗号分隔值。解析器也能处理包含逗号的引号字段。" },
      ],
    },
    "json-to-csv": {
      longDescription: "将JSON数组转换为CSV表格格式。将API或数据库的数据导出为Excel、Google Sheets等电子表格工具可以直接打开的格式。",
      steps: ["上传JSON文件（必须是对象数组）", "数据自动转换为CSV格式", "下载CSV文件"],
      faq: [
        { q: "需要什么样的JSON结构？", a: "输入应该是一个包含统一键名的对象数组。" },
        { q: "转换结果可以用Excel打开吗？", a: "可以。CSV文件可以直接在Excel、Google Sheets、Numbers等电子表格应用中打开。" },
      ],
    },
    "yaml-json": {
      longDescription: "在YAML和JSON格式之间自由转换。切换配置文件、API响应或数据在两种最流行的数据序列化格式之间的表示。",
      steps: ["粘贴你的YAML或JSON数据", "选择转换方向", "复制或下载转换后的结果"],
      faq: [
        { q: "什么时候用YAML，什么时候用JSON？", a: "YAML可读性更好，适合配置文件。JSON更严格、兼容性更广，适合API和数据交换。" },
        { q: "注释会保留吗？", a: "YAML中的注释在转换过程中会丢失，因为JSON不支持注释。" },
      ],
    },
    "xml-formatter": {
      longDescription: "格式化和美化XML数据，自动添加正确的缩进。粘贴混乱或压缩过的XML，即可获得整洁可读的输出。适合处理API响应、配置文件和SOAP消息。",
      steps: ["粘贴你的XML数据", "XML自动格式化并添加正确缩进", "复制或下载格式化后的结果"],
      faq: [
        { q: "会验证XML吗？", a: "会进行基本的结构验证。格式错误的XML会提示错误信息。" },
        { q: "CDATA会保留吗？", a: "会。CDATA段、注释和处理指令都会在输出中保留。" },
      ],
    },
    "qr-code": {
      longDescription: "从任意文本或网址生成二维码。可为链接、Wi-Fi密码、联系方式或任何文本内容创建可扫描的二维码，下载为高质量PNG图片。",
      steps: ["输入需要编码的文本或网址", "二维码即时生成", "下载二维码PNG图片"],
      faq: [
        { q: "二维码能存储多少数据？", a: "二维码最多可存储约3000个字符。对于大多数网址和短消息来说绰绰有余。" },
        { q: "可以自定义二维码外观吗？", a: "当前版本生成标准的黑白二维码，优先保证最大的扫描可靠性。" },
      ],
    },
    "color-converter": {
      longDescription: "在HEX、RGB和HSL颜色格式之间转换。设计师和开发者必备工具，方便在CSS、设计工具和品牌规范之间切换颜色值。",
      steps: ["输入HEX、RGB或HSL格式的颜色值", "查看颜色预览和所有格式的转换结果", "复制你需要的颜色值"],
      faq: [
        { q: "支持哪些颜色格式？", a: "HEX（如 #FF5733）、RGB（如 rgb(255,87,51)）和HSL（如 hsl(11,100%,60%)）。" },
        { q: "可以可视化选择颜色吗？", a: "输入任何支持的格式，工具会实时显示颜色预览色块。" },
      ],
    },
  } as Record<string, { longDescription: string; steps: string[]; faq: { q: string; a: string }[] }>,
};

export default zhCN;
