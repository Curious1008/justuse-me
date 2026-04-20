const zhCN = {
  // ─── Navigation ───
  nav: {
    pricing: "价格",
    news: "资讯",
    compare: "对比",
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

  // ─── Homepage SEO ───
  home: {
    whatIs: "JustUse.me 是什么？",
    whatIsDesc: "JustUse.me 是一个免费、注重隐私的在线工具箱，提供 120+ 款基于浏览器的文件处理工具。所有工具均通过 WebAssembly 和 Canvas API 在浏览器中运行——你的文件绝不会上传到任何服务器。无需注册账号，没有水印，没有隐藏费用。",
    whyChoose: "为什么选择 JustUse.me 而不是其他在线工具？",
    whyChooseDesc: "大多数在线文件工具（如 Smallpdf、iLovePDF、TinyPNG）会将你的文件上传到服务器进行处理。JustUse.me 不同：所有处理都在浏览器本地完成。这意味着更快的速度（无需等待上传下载）、真正的隐私保护（文件不会离开你的设备），以及零数据泄露风险。",
    toolCategories: "工具分类",
    pdfDesc: "合并、拆分、压缩、旋转、添加水印和转换 PDF 文件。支持一次处理多达 20 个文件，画质无损。",
    imageDesc: "压缩、调整大小、裁剪图片，支持 PNG、JPG、WebP、HEIC、SVG、GIF 格式互转。还支持 OCR 文字提取。",
    textDesc: "格式化 JSON、对比差异、压缩 JavaScript 和 CSS、解码 JWT、解释 Cron 表达式等 15 余种文本工具。",
    convertDesc: "在 CSV、JSON、YAML、XML、TOML、Markdown 和 TypeScript 格式之间即时转换。",
    generatorDesc: "生成二维码、UUID、密码、调色板、条形码、发票和占位数据。",
    calculatorDesc: "计算 BMI、房贷月供、复利、GPA、卡路里等，简洁好用的专项计算器。",
    developerDesc: "测试正则表达式、转换时间戳、生成 Meta 标签、CSS 渐变、阴影和网站图标。",
    utilityDesc: "单位换算、计时器、URL 检测、文本加密、世界时钟对比等实用工具。",
    privacyPromise: "你的隐私，我们的承诺",
    privacyPromiseDesc: "JustUse.me 上的每款工具都在你的浏览器中完成文件处理。我们不使用服务器端文件处理、不使用跟踪 Cookie，也不使用基本页面浏览之外的第三方分析工具。你的文档、图片和数据自始至终留在你的设备上。",
    learnMore: "了解更多关于 JustUse.me",
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
    calculator: "计算器",
    developer: "开发者",
    utility: "实用工具",
  },

  // ─── Category pages ───
  categoryPage: {
    pdf: { title: "PDF工具", description: "在线免费合并、拆分、压缩和转换PDF文件。" },
    image: { title: "图片工具", description: "即时压缩、调整大小和转换图片格式。" },
    text: { title: "文本与代码工具", description: "格式化JSON、统计字数、Base64编解码等实用工具。" },
    convert: { title: "格式转换工具", description: "在CSV、JSON、YAML、XML等格式之间自由转换。" },
    generator: { title: "生成器工具", description: "生成二维码、颜色转换等实用工具。" },
    calculator: { title: "计算器工具", description: "百分比、BMI、房贷、贷款等各类计算器。" },
    developer: { title: "开发者工具", description: "正则测试、URL编码、CSS生成器等。" },
    utility: { title: "实用工具", description: "秒表、计时器、单位转换等日常工具。" },
  },

  // ─── Tool page ───
  tool: {
    processedLocally: "本地处理 — 文件不会离开你的设备",
    textInput: "文本输入",
    max: "最大 {size}",
    upTo: "最多 {n} 个文件",
    howItWorks: "如何使用{name}？",
    about: "什么是{name}？",
    aboutSuffix: "由 JustUse.me 提供 — 免费、无广告、保护隐私。",
    aboutBrowser: "此工具完全在浏览器中运行，文件不会上传到任何服务器。",
    faq: "关于{name}的常见问题",
    relatedTools: "相关工具",
    lastUpdated: "最后更新",
    notFound: "未找到该工具。",
    // ─── Interaction UI (client components) ───
    chooseDifferentFile: "选择其他文件",
    processFallback: "处理",
    processAnother: "处理另一个文件",
    tryAgain: "重试",
    addMoreFiles: "添加更多文件，或",
    dropFileHere: "将文件拖到这里，或",
    dropFilesHere: "将文件拖到这里，或",
    browse: "浏览",
    anyFile: "任意文件",
    dragToReorder: "拖拽排序",
    processNFiles: "处理 {n} 个文件",
    downloaded: "已下载！",
    download: "下载",
    processing: "处理中...",
    dailyLimitTitle: "已达每日上限",
    dailyLimitDesc: "你今天已使用 {used}/{limit} 次免费额度。明天再来，或升级获取无限使用权。",
    createFreeAccount: "创建免费账户",
    seeProPlans: "查看专业版方案",
    upgradeToPro: "升级到专业版",
    maybeLater: "以后再说",
    nFiles: "{n} 个文件",
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
    siteDescription: "免费在线工具：合并PDF、压缩图片、格式化JSON等100+工具。无广告、无需注册、无水印，文件不会离开你的浏览器。",
    ogTitle: "JustUse.me — 免费在线工具箱",
    ogDescription: "120+款免费在线工具，处理PDF、图片和文本。无广告、无需注册，隐私优先 — 文件不会离开你的浏览器。",
    twitterDescription: "120+款免费工具，无广告、无需注册，文件在浏览器中处理。",
    categoryMetaTitle: "免费在线{label} — 无广告、无需注册",
    categoryMetaDescription: "{desc} 免费、保护隐私、在浏览器中运行。无水印、无需上传文件。",
    toolMetaTitle: "{name} — 无需上传，免注册",
    toolMetaSuffix: "免费、无广告、无需注册。文件始终留在你的设备上。",
    toolMetaDescSuffix: "在浏览器中运行，文件不会上传到任何服务器。免费使用，无需注册。",
    toolMetaDescTails: {
      pdf: "PDF 在你的浏览器本地处理，绝不上传到任何服务器。免费、无需注册。",
      image: "图片始终留在你的设备上。图像处理完全在浏览器内完成，无任何上传。免费、无需注册。",
      text: "纯客户端文本处理，所有内容不离开你的浏览器。免费、无需注册、无追踪。",
      convert: "转换全程在你的浏览器中完成，文件不会离开你的设备。免费、无需注册。",
      generator: "在你的浏览器本地生成，无任何数据上传。免费、无需注册。",
      calculator: "计算完全在你的浏览器中进行，无追踪、无账号、无上传。",
      developer: "所有处理均在你的浏览器中完成 — 适合处理敏感代码、令牌或密钥，数据不离开页面。",
      utility: "完全在你的浏览器中运行，无需上传。免费、无需注册。",
    },
    toolOgTitle: "{name} — 浏览器本地运行，无需上传 | JustUse.me",
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
    "ocr-image": { name: "图片转文字(OCR)", description: "使用OCR从英文图片中提取文字（暂不支持中文）。" },
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
    "xml-to-json": { name: "XML转JSON", description: "将XML文件转换为JSON格式。" },
    "qr-code": { name: "二维码生成器", description: "从文本或网址生成二维码。" },
    "color-converter": { name: "颜色转换器", description: "在HEX、RGB和HSL之间转换颜色值。" },
    "sql-formatter": { name: "SQL格式化", description: "格式化和美化SQL查询语句。" },
    "html-beautifier": { name: "HTML美化", description: "格式化和缩进杂乱的HTML代码。" },
    "jwt-decoder": { name: "JWT解码器", description: "解码并查看JWT令牌的载荷数据。" },
    "cron-explainer": { name: "Cron表达式解释器", description: "将Cron表达式翻译为易懂的中文说明。" },
    "slug-generator": { name: "Slug生成器", description: "将文本转换为URL友好的slug。" },
    "handlebars-preview": { name: "Handlebars预览", description: "使用实时数据渲染Handlebars模板。" },
    "html-to-markdown": { name: "HTML转Markdown", description: "将HTML内容转换为Markdown格式。" },
    "json5-to-json": { name: "JSON5转JSON", description: "将JSON5（支持注释/尾逗号）转换为标准JSON。" },
    "toml-to-json": { name: "TOML转JSON", description: "将TOML配置文件转换为JSON格式。" },
    "json-to-markdown-table": { name: "JSON转Markdown表格", description: "将JSON数组转换为Markdown表格。" },
    "json-to-yaml": { name: "JSON转YAML", description: "将JSON文件转换为YAML格式。" },
    "typescript-to-js": { name: "TypeScript转JS", description: "去除TypeScript类型注解，生成纯JavaScript。" },
    "uuid-generator": { name: "UUID生成器", description: "即时生成随机UUID（v4）。" },
    "lorem-ipsum": { name: "Lorem Ipsum生成器", description: "生成设计和原型所需的占位文本。" },
    "hash-generator": { name: "哈希生成器", description: "从文件生成MD5、SHA-1、SHA-256和SHA-512哈希值。" },
    "barcode-generator": { name: "条形码生成器", description: "从文本生成多种格式的条形码。" },
    "exif-viewer": { name: "EXIF查看器", description: "查看照片的EXIF元数据（相机、GPS、日期）。" },
    // 图片（新增）
    "image-metadata-remover": { name: "图片元数据删除器", description: "通过重绘到干净画布来清除图片的EXIF和元数据。" },
    "image-color-picker": { name: "图片取色器", description: "从图片中采样并提取最常见的8种颜色（hex值）。" },
    "image-to-base64": { name: "图片转Base64", description: "将上传的图片转换为Base64数据URL字符串。" },
    "image-flip-rotate": { name: "图片翻转与旋转", description: "水平、垂直翻转图片，或旋转90/180/270度。" },
    "webp-to-png": { name: "WebP转PNG", description: "将WebP图片转换为PNG格式。" },
    "webp-to-jpg": { name: "WebP转JPG", description: "将WebP图片转换为JPG格式。" },
    "gif-to-png": { name: "GIF转PNG", description: "提取GIF动画的第一帧并保存为PNG图片。" },
    "ico-converter": { name: "PNG转ICO", description: "将图片转换为ICO网站图标格式。" },
    "background-remover": { name: "背景移除", description: "移除图片背景，获得透明PNG。" },
    "image-to-pdf": { name: "图片转PDF", description: "将图片转换为PDF文档。" },
    // 文本（新增）
    "case-converter": { name: "大小写转换器", description: "将文本转换为大写、小写、标题格式、驼峰命名、下划线或短横线格式。" },
    "remove-duplicate-lines": { name: "删除重复行", description: "删除文本中的重复行，只保留唯一条目。" },
    "sort-lines": { name: "行排序", description: "将文本行按字母顺序从A到Z排序。" },
    "string-reverse": { name: "字符串反转", description: "反转字符串或独立反转每一行文本。" },
    "readability-checker": { name: "可读性检查器", description: "使用Flesch阅读便利度和Flesch-Kincaid年级水平对文本评分。" },
    "remove-whitespace": { name: "删除空白", description: "清除文本中多余的空格、制表符和空行。" },
    "find-and-replace": { name: "查找与替换", description: "使用简单的分隔符格式批量查找和替换文本。" },
    "url-encoder-decoder": { name: "URL编码/解码", description: "编码和解码URL百分号编码字符串。" },
    "html-entity-encoder": { name: "HTML实体编码器", description: "编码和解码HTML特殊字符，如&amp;、&lt;和&gt;。" },
    "number-to-words": { name: "数字转文字", description: "将数字转换为英文单词（如1234→\"one thousand two hundred thirty-four\"）。" },
    // 生成器（新增）
    "password-generator": { name: "密码生成器", description: "生成包含大小写字母、数字和符号的强随机密码。" },
    "random-number-generator": { name: "随机数生成器", description: "在指定范围内生成随机数。" },
    "color-palette-generator": { name: "色彩方案生成器", description: "基于色彩理论从任意十六进制颜色生成和谐的配色方案。" },
    "random-name-picker": { name: "随机名称抽取器", description: "从名单中随机抽取一个获胜者。" },
    "invoice-generator": { name: "发票生成器", description: "生成带自动总额计算的格式化文本发票。" },
    "strong-password-checker": { name: "密码强度检测器", description: "检测密码强度，显示评分、破解时间估算和详细反馈。" },
    "fake-data-generator": { name: "假数据生成器", description: "生成逼真的假名字、邮箱、电话号码和地址（JSON格式）。" },
    "placeholder-image-generator": { name: "占位图片生成器", description: "使用Canvas生成自定义尺寸、背景色和文字的占位图片。" },
    // 计算器
    "percentage-calculator": { name: "百分比计算器", description: "计算百分比，或求一个数是另一个数的百分之几。" },
    "bmi-calculator": { name: "BMI计算器", description: "根据身高和体重计算体质指数（BMI），并给出健康分类。" },
    "age-calculator": { name: "年龄计算器", description: "从生日精确计算年龄（年、月、日），并显示下次生日倒计时。" },
    "tip-calculator": { name: "小费计算器", description: "根据账单金额和小费比例计算小费金额、总账单及人均分摊。" },
    "compound-interest-calculator": { name: "复利计算器", description: "计算复利增长，显示未来价值、总利息及逐年明细。" },
    "mortgage-calculator": { name: "房贷计算器", description: "计算月供、总利息及还款摘要。" },
    "loan-calculator": { name: "贷款计算器", description: "计算个人贷款或汽车贷款的月供和总利息。" },
    "grade-calculator": { name: "成绩计算器", description: "根据各项分数及其权重计算加权平均成绩。" },
    "gpa-calculator": { name: "GPA计算器", description: "根据字母成绩和学分使用标准4.0制计算GPA。" },
    "calorie-calculator": { name: "卡路里计算器", description: "根据年龄、性别、身高、体重和活动水平计算每日卡路里需求。" },
    "pregnancy-due-date": { name: "预产期计算器", description: "根据末次月经（LMP）计算预产期、当前孕周和孕期。" },
    "date-difference-calculator": { name: "日期差计算器", description: "计算两个日期之间的天数、周数、月数和年数差值。" },
    "time-zone-converter": { name: "时区转换器", description: "在全球不同时区之间转换时间。" },
    "discount-calculator": { name: "折扣计算器", description: "计算打折后的售价和节省的金额。" },
    "scientific-calculator": { name: "科学计算器", description: "支持三角函数、对数、平方根等的数学表达式计算器。" },
    "debt-payoff-calculator": { name: "债务偿还计算器", description: "根据余额、利率和月供计算还清债务所需时间和总利息。" },
    // 开发者
    "regex-tester": { name: "正则表达式测试器", description: "测试正则表达式并在文本中找出所有匹配及位置。" },
    "timestamp-converter": { name: "时间戳转换器", description: "将Unix时间戳转换为可读日期格式，或反向转换。" },
    "json-to-typescript": { name: "JSON转TypeScript", description: "将JSON对象转换为TypeScript接口定义，支持嵌套对象和数组。" },
    "html-to-jsx": { name: "HTML转JSX", description: "将HTML标记转换为JSX兼容的React语法（className、htmlFor、自闭合标签等）。" },
    "chmod-calculator": { name: "chmod计算器", description: "在数字格式（755）和符号格式（rwxr-xr-x）之间转换Unix文件权限，并给出完整说明。" },
    "meta-tag-generator": { name: "Meta标签生成器", description: "生成完整的HTML头部meta标签，包括SEO、Open Graph和Twitter Card标签。" },
    "css-gradient-generator": { name: "CSS渐变生成器", description: "根据两种颜色和可选方向生成CSS linear-gradient代码。" },
    "http-status-codes": { name: "HTTP状态码查询", description: "按编号或关键词查找HTTP状态码，附说明和常见用例。" },
    "css-box-shadow-generator": { name: "CSS阴影生成器", description: "根据偏移、模糊、扩展和颜色参数生成CSS box-shadow代码。" },
    "css-flexbox-generator": { name: "CSS Flexbox生成器", description: "根据方向、对齐、换行和间距参数生成完整的CSS flexbox代码。" },
    "favicon-generator": { name: "Favicon生成器", description: "将任意图片调整为32×32像素的PNG favicon，可直接用于网站。" },
    "json-validator": { name: "JSON验证器", description: "验证JSON并获取格式化输出，或显示带行号的详细错误信息。" },
    "css-unit-converter": { name: "CSS单位转换器", description: "在px、rem、em、pt和vw之间转换CSS值。" },
    "color-contrast-checker": { name: "颜色对比度检查器", description: "检查前景色和背景色之间的WCAG AA/AAA对比度。" },
    "svg-optimizer": { name: "SVG优化器", description: "删除注释、元数据、空组和不必要的属性以减小SVG文件大小。" },
    // 实用工具
    "temperature-converter": { name: "温度转换器", description: "在摄氏度、华氏度和开尔文之间即时转换温度。" },
    "length-converter": { name: "长度转换器", description: "在公制和英制单位之间转换长度：mm、cm、m、km、in、ft、yd、mi。" },
    "weight-converter": { name: "重量转换器", description: "在mg、g、kg、oz、lb和stone之间转换重量。" },
    "speed-converter": { name: "速度转换器", description: "在千米/时、英里/时、米/秒、英尺/秒和节之间转换速度。" },
    "data-storage-converter": { name: "数据存储转换器", description: "在字节、KB、MB、GB、TB和PB之间转换数据大小。" },
    "cooking-converter": { name: "烹饪单位转换器", description: "在茶匙、汤匙、杯、毫升、升和液盎司之间转换烹饪用量。" },
    "number-base-converter": { name: "进制转换器", description: "在十进制、十六进制、二进制和八进制之间转换数字。" },
    "shoe-size-converter": { name: "鞋码转换器", description: "在美码、欧码、英码和日本码（厘米）之间转换鞋码。" },
    "stopwatch": { name: "秒表/时间戳", description: "获取当前精确时间戳，或计算两个时间戳之间的经过时间。" },
    "countdown-timer": { name: "倒计时器", description: "输入时长，获取精确结束时间和可读倒计时。" },
    "pomodoro-timer": { name: "番茄钟", description: "从现在起生成完整的番茄工作法时间表，包含工作和休息时段。" },
    "world-clock": { name: "世界时钟", description: "查看全球主要城市的当前时间，支持自定义时间输入。" },
    "text-encrypt-decrypt": { name: "文本加密/解密", description: "使用密码短语通过AES-256-GCM加密或解密文本，完全在浏览器中运行。" },
    "url-checker": { name: "URL检查器", description: "分析URL的结构、查询参数和可疑模式（如钓鱼指标）。" },
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
      longDescription: "使用光学字符识别（OCR）技术从图片中提取文字。目前仅针对英文优化，适用于英文截图、文档照片、收据和标牌。暂不支持中文、日文等非拉丁语系文字。",
      steps: ["上传包含英文文字的图片", "OCR处理图片（可能需要几秒钟）", "预览并下载提取的文字"],
      faq: [
        { q: "支持哪些语言？", a: "目前仅支持英文。工具使用 Tesseract.js 的英文训练数据，以保证下载体积小、识别速度快。如需识别中文、日文等非拉丁语系文字，建议使用专门针对该语言的 OCR 工具。" },
        { q: "图片会上传到服务器吗？", a: "不会。OCR 完全在浏览器中使用 Tesseract.js 运行，图片始终留在你的设备上。" },
      ],
    },
    "background-remover": {
      longDescription: "移除图片背景，获得干净的透明PNG。适用于照片、Logo和产品图片。工具从图片边缘检测背景颜色，使用泛洪填充算法移除背景，全部在浏览器中处理。",
      steps: ["上传图片（JPG、PNG或WebP）", "自动检测并移除背景", "下载透明PNG结果"],
      faq: [
        { q: "背景移除是怎么工作的？", a: "工具采样四角像素来识别背景颜色，然后从边缘使用泛洪填充移除所有相似颜色的连续像素。纯色或近似纯色背景效果最佳。" },
        { q: "复杂背景能处理吗？", a: "纯色背景（白色、绿幕等）效果最好。复杂或渐变背景可能会留下一些残留。这种情况建议使用专门的AI背景移除工具。" },
        { q: "图片会被上传吗？", a: "不会。所有处理都在浏览器中完成，图片不会离开你的设备。" },
      ],
      related: ["compress-image", "crop-image", "png-to-jpg"],
      whyUs: "大多数背景移除工具会将图片上传到服务器进行AI处理。JustUse.me完全在浏览器中移除背景——照片保持私密，即时处理，无需排队等待。",
    },
    "image-to-pdf": {
      longDescription: "将一张或多张图片转换为单个PDF文档。支持JPG和PNG格式，一次最多20张图片。每张图片成为PDF中的一页，保留原始尺寸和质量。",
      steps: ["上传图片（JPG或PNG，最多20个文件）", "拖动排列页面顺序", "点击处理并下载PDF"],
      faq: [
        { q: "可以将多张图片合并为一个PDF吗？", a: "可以。上传最多20张图片，它们会按你排列的顺序合并为一个PDF，每张图片一页。" },
        { q: "会降低图片质量吗？", a: "不会。图片以原始分辨率和质量嵌入，PDF完整保留你上传的内容。" },
        { q: "支持哪些图片格式？", a: "支持JPG和PNG格式。其他格式如HEIC或WebP，请先使用我们的其他工具转换。" },
      ],
      related: ["jpg-to-pdf", "merge-pdf", "compress-image"],
      whyUs: "与将照片上传到远程服务器的在线转换器不同，JustUse.me完全在浏览器中将图片转换为PDF。你的照片不会离开设备，适合处理个人文件、证件和敏感图片。",
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
    "xml-to-json": {
      longDescription: "将XML文档、API响应或配置文件转换为整洁的JSON格式。保留属性、嵌套元素和文本内容。适合处理SOAP API、RSS订阅、SVG数据，或任何需要转为JSON使用的XML格式。",
      steps: ["上传你的XML文件", "XML会被即时解析并转换为JSON", "下载或复制JSON输出"],
      faq: [
        { q: "XML属性如何处理？", a: "XML属性在JSON输出中以@_为前缀。例如，<div class=\"main\">会变成{\"div\": {\"@_class\": \"main\"}}。这样可以区分属性和子元素。" },
        { q: "支持嵌套XML吗？", a: "支持。所有嵌套元素、重复元素数组和混合内容都会保留在JSON结构中。可处理任意深度的嵌套。" },
        { q: "能转换大型XML文件吗？", a: "支持最大5MB的文件。处理完全在浏览器中进行，无需上传。" },
      ],
      related: ["xml-formatter", "json-formatter", "json-to-yaml"],
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
    "sql-formatter": {
      longDescription: "格式化杂乱的SQL查询语句，自动添加正确的缩进和关键词大写。支持标准SQL、PostgreSQL、MySQL等多种方言。让复杂查询变得可读且易于调试。",
      steps: ["粘贴你的SQL查询", "查询即时格式化并添加正确缩进", "复制或下载格式化后的SQL"],
      faq: [
        { q: "支持哪些SQL方言？", a: "标准SQL、PostgreSQL、MySQL、MariaDB、SQLite、BigQuery等。" },
        { q: "会改变查询逻辑吗？", a: "不会。格式化只影响空白和关键词大小写，查询逻辑完全不变。" },
      ],
    },
    "html-beautifier": {
      longDescription: "格式化和缩进杂乱或压缩过的HTML代码。让HTML变得可读，添加正确的缩进和换行。适合调试模板、检查页面源码或清理生成的HTML。",
      steps: ["粘贴你的HTML代码", "HTML即时美化并添加正确缩进", "复制或下载格式化后的HTML"],
      faq: [
        { q: "会修复错误的HTML吗？", a: "不会。美化器只格式化有效的HTML，不会修复缺失的标签或结构问题。" },
        { q: "内联样式和脚本也会格式化吗？", a: "会。HTML中嵌入的CSS和JavaScript也会被正确缩进。" },
      ],
    },
    "jwt-decoder": {
      longDescription: "解码JSON Web Token（JWT）以查看其头部和载荷信息。无需密钥即可查看发行者、过期时间和自定义数据等声明。调试认证流程的必备工具。",
      steps: ["粘贴你的JWT字符串", "头部和载荷即时解码", "查看声明和过期数据"],
      faq: [
        { q: "在这里粘贴JWT安全吗？", a: "安全。解码完全在浏览器中进行，你的令牌不会发送到任何服务器。" },
        { q: "可以验证JWT签名吗？", a: "本工具用于解码和显示令牌内容。签名验证需要密钥，不在此工具范围内。" },
      ],
    },
    "cron-explainer": {
      longDescription: "将Cron表达式翻译为易于理解的中文说明。即时理解复杂的定时任务计划。支持Unix、Linux和大多数任务调度器使用的标准5字段Cron语法。",
      steps: ["输入Cron表达式（如 */5 * * * *）", "即时查看易懂的文字说明", "复制说明用于文档"],
      faq: [
        { q: "支持什么Cron格式？", a: "标准5字段Cron表达式：分钟、小时、日期、月份、星期。" },
        { q: "可以使用特殊字符吗？", a: "可以。支持*、/、-和逗号表示法（如1,15或*/5）。" },
      ],
    },
    "slug-generator": {
      longDescription: "将任意文本转换为URL友好的slug。去除特殊字符，用连字符替换空格，全部转为小写。适合博客文章URL、文件名和SEO友好路径。",
      steps: ["输入或粘贴你的文本", "即时生成干净的URL slug", "复制slug用于你的项目"],
      faq: [
        { q: "特殊字符如何处理？", a: "带重音的字符会被转写，其他特殊字符会被移除。" },
        { q: "可以用作文件名吗？", a: "可以。Slug只包含小写字母、数字和连字符，非常适合作为文件名。" },
      ],
    },
    "handlebars-preview": {
      longDescription: "使用实时JSON数据渲染Handlebars模板。编写模板、提供示例数据，即可立即查看渲染输出。适合测试邮件模板、动态内容和模板逻辑。",
      steps: ["在顶部编写Handlebars模板", "添加---DATA---分隔符，在下方粘贴JSON数据", "即时查看渲染结果"],
      faq: [
        { q: "支持哪些Handlebars功能？", a: "所有标准Handlebars功能：变量、条件判断（if/else）、循环（each）、局部模板和助手函数。" },
        { q: "如何提供数据？", a: "粘贴模板后，另起一行添加---DATA---，然后在下方粘贴JSON数据。" },
      ],
    },
    "html-to-markdown": {
      longDescription: "将HTML内容转换为简洁的Markdown格式。适合迁移博客文章、转换文档或从网页中提取内容用于静态站点生成器。",
      steps: ["上传HTML文件", "HTML即时转换为Markdown", "预览并下载Markdown输出"],
      faq: [
        { q: "支持哪些HTML元素？", a: "标题、段落、链接、图片、列表、表格、代码块、粗体、斜体等。" },
        { q: "输出干净吗？", a: "是的。转换器生成干净的Markdown，没有不必要的转义或多余的空白。" },
      ],
    },
    "json5-to-json": {
      longDescription: "将JSON5转换为标准JSON格式。JSON5允许注释、尾逗号、不带引号的键和单引号字符串。本工具去除所有JSON5扩展语法，输出有效的JSON。",
      steps: ["上传JSON5文件", "文件被解析并转换为标准JSON", "下载有效的JSON输出"],
      faq: [
        { q: "什么是JSON5？", a: "JSON5是JSON的超集，允许注释、尾逗号、不带引号的键和其他宽松语法。常用于配置文件。" },
        { q: "注释会保留吗？", a: "不会。由于标准JSON不支持注释，转换时注释会被去除。" },
      ],
    },
    "toml-to-json": {
      longDescription: "将TOML配置文件转换为JSON格式。TOML广泛用于Rust（Cargo.toml）、Python（pyproject.toml）等工具。转换为JSON后可用于JavaScript项目或API。",
      steps: ["上传TOML文件", "文件被解析并转换为JSON", "下载JSON输出"],
      faq: [
        { q: "什么是TOML？", a: "TOML是一种设计为易于阅读的配置文件格式。被Cargo、Hugo等许多工具使用。" },
        { q: "支持嵌套表吗？", a: "支持。所有TOML特性，包括嵌套表、表数组和内联表都支持。" },
      ],
    },
    "json-to-markdown-table": {
      longDescription: "将JSON数组转换为可读的Markdown表格。适合从结构化数据创建文档、README文件或报告。每个对象变为一行，键变为列标题。",
      steps: ["上传包含对象数组的JSON文件", "数据转换为Markdown表格", "复制或下载Markdown表格"],
      faq: [
        { q: "需要什么JSON结构？", a: "包含统一键名的对象数组。每个对象变为表格的一行。" },
        { q: "嵌套值如何处理？", a: "嵌套对象和数组会在表格单元格中序列化为JSON字符串。" },
      ],
    },
    "json-to-yaml": {
      longDescription: "将JSON配置文件、API响应或数据文件转换为简洁的YAML格式。生成具有正确缩进的易读YAML。适用于Kubernetes配置、Docker Compose文件、CI/CD流水线以及任何偏好YAML而非JSON的场景。",
      steps: ["上传或粘贴JSON文件", "JSON被解析并即时转换为YAML", "下载或复制YAML输出"],
      faq: [
        { q: "为什么要将JSON转为YAML？", a: "YAML比JSON更易于阅读配置文件。它支持注释，视觉噪音更少（无引号或大括号），是Kubernetes、Docker Compose、GitHub Actions和许多CI/CD工具的标准格式。" },
        { q: "数据结构会保留吗？", a: "是的。所有键、值、数组和嵌套对象都会被精确保留。转换是无损的——可以转回JSON获得相同数据。" },
        { q: "能处理大型JSON文件吗？", a: "可以，最大支持5MB。转换在浏览器中运行，大文件无需等待上传。" },
      ],
      related: ["yaml-json", "json-formatter", "json-validator"],
    },
    "typescript-to-js": {
      longDescription: "去除TypeScript类型注解，生成纯JavaScript。移除接口、类型别名、泛型和其他TypeScript特有语法，同时保留运行时逻辑。",
      steps: ["上传TypeScript文件", "类型被去除并生成JavaScript", "下载纯JavaScript输出"],
      faq: [
        { q: "会编译TypeScript功能吗？", a: "只去除类型。现代JS特性如可选链和空值合并运算符会原样保留。" },
        { q: "枚举会被转换吗？", a: "TypeScript枚举会被转译为对应的JavaScript形式。" },
      ],
    },
    "uuid-generator": {
      longDescription: "即时生成随机UUID（通用唯一标识符）v4版本。UUID用作数据库主键、API请求ID、会话令牌以及任何需要全局唯一标识符的场景。",
      steps: ["输入要生成的UUID数量（1-100）", "UUID即时生成", "复制UUID用于你的项目"],
      faq: [
        { q: "生成的UUID真的唯一吗？", a: "UUID v4使用加密随机值。碰撞概率极低，约为2^122分之一。" },
        { q: "使用什么格式？", a: "标准UUID v4格式：8-4-4-4-12十六进制字符（如 550e8400-e29b-41d4-a716-446655440000）。" },
      ],
    },
    "lorem-ipsum": {
      longDescription: "为设计、原型和模型生成Lorem Ipsum占位文本。选择需要的段落数。这是自16世纪以来设计师和排版人员使用的经典虚拟文本。",
      steps: ["输入要生成的段落数", "Lorem Ipsum文本即时生成", "复制文本用于你的设计"],
      faq: [
        { q: "什么是Lorem Ipsum？", a: "Lorem Ipsum是源自西塞罗（公元前45年）著作的占位文本。几个世纪以来一直是印刷行业的标准虚拟文本。" },
        { q: "可以自定义输出吗？", a: "可以指定要生成的段落数。" },
      ],
    },
    "hash-generator": {
      longDescription: "从任意文件生成加密哈希值。支持MD5、SHA-1、SHA-256和SHA-512。用于验证文件完整性、检测重复文件或创建分发校验和。",
      steps: ["上传任意文件", "所有哈希值即时计算", "复制你需要的哈希值"],
      faq: [
        { q: "提供哪些哈希算法？", a: "MD5、SHA-1、SHA-256和SHA-512，所有算法同时计算。" },
        { q: "哈希计算在本地进行吗？", a: "是的。所有哈希计算使用WebAssembly在浏览器中运行，文件不会上传。" },
      ],
    },
    "barcode-generator": {
      longDescription: "从文本生成多种格式的条形码。支持CODE128、EAN-13、UPC-A、CODE39、ITF-14等格式。下载为高质量PNG图片，可用于打印或数字用途。",
      steps: ["输入要编码的文本或数字", "选择条形码格式", "下载条形码PNG图片"],
      faq: [
        { q: "支持哪些条形码格式？", a: "CODE128、EAN-13、EAN-8、UPC-A、CODE39、ITF-14、MSI、Pharmacode和Codabar。" },
        { q: "生成的条形码可以扫描吗？", a: "可以。所有生成的条形码符合标准规范，任何条形码阅读器都可以扫描。" },
      ],
    },
    "exif-viewer": {
      longDescription: "查看照片中嵌入的EXIF元数据。查看相机型号、镜头、ISO、快门速度、光圈、GPS坐标、拍摄日期等信息。支持JPG和TIFF图片。",
      steps: ["上传照片（JPG或TIFF）", "所有EXIF元数据即时显示", "查看相机参数、GPS数据等"],
      faq: [
        { q: "可以看到哪些信息？", a: "相机品牌/型号、镜头、ISO、快门速度、光圈、焦距、GPS坐标、拍摄日期等。" },
        { q: "照片会上传吗？", a: "不会。EXIF数据完全在浏览器中读取，照片不会离开你的设备。" },
      ],
    },
    "ico-converter": {
      longDescription: "将任意图片转换为ICO格式，用作网站favicon图标。生成包含16x16、32x32和48x48像素的多尺寸ICO文件。支持PNG、JPG和WebP输入。",
      steps: ["上传图片（PNG、JPG或WebP）", "图片自动缩放为标准favicon尺寸", "下载多尺寸ICO文件"],
      faq: [
        { q: "ICO文件包含哪些尺寸？", a: "ICO文件包含三种尺寸：16x16、32x32和48x48像素，覆盖了各浏览器和操作系统最常用的favicon场景。" },
        { q: "任何图片都能做favicon吗？", a: "可以，但简单的logo和图标效果最好。复杂的照片在小尺寸下会丢失细节。建议使用正方形图片。" },
        { q: "如何将favicon添加到网站？", a: "将.ico文件放在网站根目录命名为favicon.ico，或在HTML头部添加：<link rel=\"icon\" href=\"/favicon.ico\">。" },
      ],
      related: ["favicon-generator", "svg-to-png", "resize-image"],
    },
  } as Record<string, { longDescription: string; steps: string[]; faq: { q: string; a: string }[] }>,

  // ─── 资讯与教程 ───
  news: {
    title: "资讯与教程",
    description: "文件工具使用技巧、教程和生产力建议。",
    readMore: "阅读更多",
    publishedOn: "发布于",
    relatedTools: "相关工具",
    relatedArticles: "相关文章",
    allCategories: "全部",
    tutorial: "教程",
    comparison: "对比",
    "use-case": "使用场景",
    trend: "趋势",
    noArticles: "暂无文章，敬请期待！",
  },

  // ─── 关于 ───
  about: {
    title: "关于 JustUse.me",
    description: "JustUse.me 由 Paymomentum LLC 构建和维护。我们相信日常文件工具应该免费、私密且快速。",
    mission: "我们的使命",
    missionDesc: "我们创建 JustUse.me 是因为我们厌倦了那些将文件上传到不明服务器、在输出上打水印、强迫用户注册账号才能完成简单任务的在线工具。JustUse.me 上的每一个工具都完全在您的浏览器中处理文件——您的数据永远不会离开您的设备。",
    howItWorks: "工作原理",
    howItWorksDesc: "JustUse.me 使用 WebAssembly、Canvas API 和 Web Workers 等现代浏览器技术在本地处理文件。当您合并 PDF 或压缩图片时，计算在您的设备上完成。无需服务器往返、无上传延迟、无隐私风险。",
    team: "关于团队",
    teamDesc: "JustUse.me 是 Paymomentum LLC 的产品。我们是一个专注于构建简单、尊重隐私的日常工具的小团队。",
    contact: "联系我们",
    contactDesc: "有问题、建议或发现了 bug？我们很乐意听到您的声音。",
    contactLink: "联系我们",
  },
};

export default zhCN;
