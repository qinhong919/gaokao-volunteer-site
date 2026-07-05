window.GAOKAO_DATA = {
  cutoffs: {
    云南: {
      2026: {
        物理: { special: 505, undergraduate: 435, vocational: 180 },
        历史: { special: 545, undergraduate: 465, vocational: 180 }
      },
      2025: {
        物理: { special: 495, undergraduate: 430, vocational: 180 },
        历史: { special: 535, undergraduate: 465, vocational: 180 }
      }
    }
  },
  combos: [
    { id: "物化生", primary: "物理", subjects: ["物理", "化学", "生物"], direction: "医学、生物、化工、绝大多数工科" },
    { id: "物化政", primary: "物理", subjects: ["物理", "化学", "政治"], direction: "军警、政法、工科、化工" },
    { id: "物化地", primary: "物理", subjects: ["物理", "化学", "地理"], direction: "地质、测绘、环境、工科" },
    { id: "物生政", primary: "物理", subjects: ["物理", "生物", "政治"], direction: "生物、护理、政法、管理" },
    { id: "物生地", primary: "物理", subjects: ["物理", "生物", "地理"], direction: "生态、环境、地理信息、部分工科" },
    { id: "物政地", primary: "物理", subjects: ["物理", "政治", "地理"], direction: "管理、地理、少量工科" },
    { id: "史化生", primary: "历史", subjects: ["历史", "化学", "生物"], direction: "护理、文史交叉、部分师范" },
    { id: "史化政", primary: "历史", subjects: ["历史", "化学", "政治"], direction: "法学、政治、文史、化学交叉" },
    { id: "史化地", primary: "历史", subjects: ["历史", "化学", "地理"], direction: "考古、地理、文旅、师范" },
    { id: "史生政", primary: "历史", subjects: ["历史", "生物", "政治"], direction: "师范、护理、社会工作、法学" },
    { id: "史生地", primary: "历史", subjects: ["历史", "生物", "地理"], direction: "园林、生态、地理、师范" },
    { id: "史政地", primary: "历史", subjects: ["历史", "政治", "地理"], direction: "法学、新闻、汉语言、管理" }
  ],
  programs: [
    {
      university: "云南大学",
      groupCode: "YNU-物化-01",
      city: "昆明",
      level: ["211", "双一流"],
      ownership: "公办",
      major: "计算机类",
      majorType: "工学",
      batch: "本科批",
      primary: "物理",
      required: ["物理", "化学"],
      plan: 116,
      minScore2025: 592,
      minRank2025: 10200,
      fee: "4500 元/年",
      sourceStatus: "演示数据"
    },
    {
      university: "昆明理工大学",
      groupCode: "KUST-物化-03",
      city: "昆明",
      level: ["省重点"],
      ownership: "公办",
      major: "电气工程及其自动化",
      majorType: "工学",
      batch: "本科批",
      primary: "物理",
      required: ["物理", "化学"],
      plan: 92,
      minScore2025: 566,
      minRank2025: 22100,
      fee: "4500 元/年",
      sourceStatus: "演示数据"
    },
    {
      university: "昆明医科大学",
      groupCode: "KMU-物化-02",
      city: "昆明",
      level: ["省重点"],
      ownership: "公办",
      major: "临床医学",
      majorType: "医学",
      batch: "本科批",
      primary: "物理",
      required: ["物理", "化学"],
      plan: 160,
      minScore2025: 598,
      minRank2025: 8600,
      fee: "5000 元/年",
      sourceStatus: "演示数据"
    },
    {
      university: "云南师范大学",
      groupCode: "YNNU-物理-05",
      city: "昆明",
      level: ["省重点"],
      ownership: "公办",
      major: "数学与应用数学",
      majorType: "师范",
      batch: "本科批",
      primary: "物理",
      required: ["物理"],
      plan: 75,
      minScore2025: 552,
      minRank2025: 28500,
      fee: "4500 元/年",
      sourceStatus: "演示数据"
    },
    {
      university: "云南财经大学",
      groupCode: "YUFE-不限-02",
      city: "昆明",
      level: ["普通本科"],
      ownership: "公办",
      major: "会计学",
      majorType: "经济管理",
      batch: "本科批",
      primary: "物理",
      required: ["物理"],
      plan: 80,
      minScore2025: 535,
      minRank2025: 39000,
      fee: "4000 元/年",
      sourceStatus: "演示数据"
    },
    {
      university: "大理大学",
      groupCode: "DLU-物化-01",
      city: "大理",
      level: ["普通本科"],
      ownership: "公办",
      major: "药学",
      majorType: "医学",
      batch: "本科批",
      primary: "物理",
      required: ["物理", "化学"],
      plan: 90,
      minScore2025: 519,
      minRank2025: 48500,
      fee: "5000 元/年",
      sourceStatus: "演示数据"
    },
    {
      university: "西南林业大学",
      groupCode: "SWFU-物化-04",
      city: "昆明",
      level: ["普通本科"],
      ownership: "公办",
      major: "林学类",
      majorType: "农学",
      batch: "本科批",
      primary: "物理",
      required: ["物理", "化学"],
      plan: 130,
      minScore2025: 505,
      minRank2025: 57500,
      fee: "4500 元/年",
      sourceStatus: "演示数据"
    },
    {
      university: "云南民族大学",
      groupCode: "YNMU-历史-01",
      city: "昆明",
      level: ["普通本科"],
      ownership: "公办",
      major: "法学",
      majorType: "法学",
      batch: "本科批",
      primary: "历史",
      required: ["历史", "政治"],
      plan: 70,
      minScore2025: 548,
      minRank2025: 8200,
      fee: "4000 元/年",
      sourceStatus: "演示数据"
    },
    {
      university: "云南师范大学",
      groupCode: "YNNU-历史-03",
      city: "昆明",
      level: ["省重点"],
      ownership: "公办",
      major: "汉语言文学",
      majorType: "师范",
      batch: "本科批",
      primary: "历史",
      required: ["历史"],
      plan: 115,
      minScore2025: 560,
      minRank2025: 5800,
      fee: "3400 元/年",
      sourceStatus: "演示数据"
    },
    {
      university: "云南经济管理学院",
      groupCode: "YJMU-不限-01",
      city: "昆明",
      level: ["民办本科"],
      ownership: "民办",
      major: "财务管理",
      majorType: "经济管理",
      batch: "本科批",
      primary: "历史",
      required: ["历史"],
      plan: 120,
      minScore2025: 474,
      minRank2025: 38000,
      fee: "22000 元/年",
      sourceStatus: "演示数据"
    }
  ],
  policyChecks: [
    {
      title: "考试模式",
      detail: "云南实行 3+1+2：语文、数学、外语必考；物理/历史二选一；化学、生物、政治、地理四选二。",
      status: "匹配"
    },
    {
      title: "投档口径",
      detail: "普通类按物理科目组合、历史科目组合分别划线、分别排序、分别投档。",
      status: "匹配"
    },
    {
      title: "志愿单位",
      detail: "招生计划按院校专业组编制，专业组是普通类志愿填报和筛选的核心单位。",
      status: "匹配"
    },
    {
      title: "昆明考生",
      detail: "昆明不单独形成招生计划库；昆明考生使用云南省招生计划、一分一段位次和云南投档规则。",
      status: "已校正"
    },
    {
      title: "准确性底线",
      detail: "冲稳保只按官方全省位次判断；分数不能直接跨年比较，不能用非官方估算位次替代。",
      status: "强约束"
    }
  ],
  sources: [
    {
      name: "云南省招生考试院",
      type: "省级官方",
      priority: "P0 必采",
      status: "主数据源",
      use: "2026 在滇招生计划、志愿填报须知、一分一段表、批次线、投档线、征集志愿。",
      fields: "字段：年份、省份、批次、科目组合、院校专业组、专业、计划数、分数线、位次。",
      url: "https://www.ynzs.cn",
      urlLabel: "打开云南省招考频道",
      linkStatus: "有效：省级官方入口，具体公告以普通高考栏目和站内搜索为准",
      verifiedAt: "2026-07-05"
    },
    {
      name: "云南高考考生服务平台",
      type: "省级官方",
      priority: "P0 必采",
      status: "填报入口",
      use: "考生正式填报入口，用于核对真实志愿单位、批次结构、院校专业组显示口径。",
      fields: "字段：批次、志愿序号、院校专业组、专业志愿、服从调剂标志。",
      url: "https://gk.ynzs.cn",
      urlLabel: "打开云南高考考生服务平台",
      linkStatus: "有效：官方填报和查询平台，涉及个人信息时由考生本人登录核对",
      verifiedAt: "2026-07-05"
    },
    {
      name: "阳光高考政策库",
      type: "教育部平台",
      priority: "P0 必采",
      status: "政策核验",
      use: "云南政策文件、招生章程、特殊类型招生、公示信息，核验省考试院发布内容。",
      fields: "字段：政策标题、发布时间、省份、文件类型、原文链接。",
      url: "https://gaokao.chsi.com.cn/gkxx/zc/ss?regionId=086530000",
      urlLabel: "打开阳光高考云南政策库",
      linkStatus: "有效：教育部平台云南政策列表",
      verifiedAt: "2026-07-05"
    },
    {
      name: "阳光高考院校库",
      type: "教育部平台",
      priority: "P0 必采",
      status: "院校底表",
      use: "全国高校基础名单、院校代码、办学层次、主管部门、所在地、办学性质。",
      fields: "字段：院校代码、院校名称、省市、办学性质、层次、主管部门。",
      url: "https://gaokao.chsi.com.cn/sch/",
      urlLabel: "打开阳光高考院校库",
      linkStatus: "有效：教育部平台院校查询入口",
      verifiedAt: "2026-07-05"
    },
    {
      name: "教育部本科专业目录",
      type: "国家官方",
      priority: "P0 必采",
      status: "专业底表",
      use: "本科专业代码、专业名称、专业类、学科门类，用于统一全国专业名称。",
      fields: "字段：专业代码、专业名称、门类、专业类、修业年限、授予学位。",
      url: "https://www.moe.gov.cn/srcsite/A08/moe_1034/s3882/202604/t20260427_1434931.html",
      urlLabel: "打开教育部 2026 本科专业目录",
      linkStatus: "有效：教育部 2026 年本科专业目录通知页",
      verifiedAt: "2026-07-05"
    },
    {
      name: "阳光高考招生章程",
      type: "教育部平台",
      priority: "P1 核验",
      status: "章程核验",
      use: "各校 2026 招生章程、在云南招生专业、体检限制、外语限制、学费、转专业政策。",
      fields: "字段：招生章程链接、专业介绍、学费、体检要求、语种要求、校区。",
      url: "https://gaokao.chsi.com.cn/zsgs/zhangcheng/",
      urlLabel: "打开阳光高考招生章程",
      linkStatus: "有效：经审核招生章程查询入口；具体高校还要回到本校招生网复核",
      verifiedAt: "2026-07-05"
    },
    {
      name: "云南省教育厅",
      type: "省级主管部门",
      priority: "P1 核验",
      status: "政策补充",
      use: "改革方案、政策解读、分数线转载、官方通知补充核验。",
      fields: "字段：文件标题、发布日期、适用年份、政策要点、链接。",
      url: "https://jyt.yn.gov.cn",
      urlLabel: "打开云南省教育厅",
      linkStatus: "有效：省级教育主管部门入口，政策以考试院和教育厅原文为准",
      verifiedAt: "2026-07-05"
    },
    {
      name: "云南 2026 一分一段表",
      type: "教育部平台转载",
      priority: "P0 必采",
      status: "位次底表",
      use: "云南省招生考试院发布的 2026 高考成绩分数段统计表，用于分数精确匹配官方累计位次。",
      fields: "字段：年份、省份、物理/历史、分数、同分人数、累计人数。",
      url: "https://gaokao.chsi.com.cn/gkxx/ss/202606/20260626/2293847808.html",
      urlLabel: "打开 2026 云南一分一段表",
      linkStatus: "有效：阳光高考转载云南省招生考试院发布内容",
      verifiedAt: "2026-07-05"
    },
    {
      name: "云南招生计划专刊",
      type: "纸质或电子资料",
      priority: "P0 必采",
      status: "需 OCR/人工校验",
      use: "全国高校在云南各批次、各院校专业组的最终招生计划。若无公开结构化文件，以考生手中官方计划专刊为准。",
      fields: "字段：院校专业组、专业代码、专业名称、计划数、学费、学制、备注。",
      url: "https://www.ynzs.cn",
      urlLabel: "打开省考试院官方入口",
      linkStatus: "有效：固定公开电子表暂未稳定检索到；纸质/电子计划专刊须人工校验后导入",
      verifiedAt: "2026-07-05"
    },
    {
      name: "云南高考动态补充索引",
      type: "补充来源",
      priority: "P2 参考",
      status: "不得作唯一依据",
      use: "教育在线/掌上高考云南动态页用于快速发现政策、分数线、一分一段、志愿须知的缺漏，再回到官方来源核验。",
      fields: "字段：标题、发布日期、转载来源、原文入口、官方核验状态。",
      url: "https://gaokao.eol.cn/yun_nan/dongtai/index_2.shtml",
      urlLabel: "打开云南高考动态索引",
      linkStatus: "有效：第三方索引页，只作发现线索，不作最终依据",
      verifiedAt: "2026-07-05"
    }
  ],
  updateRules: [
    {
      name: "2026 在滇招生计划",
      owner: "云南省招生考试院 / 招生考试报",
      cadence: "填报期每日核验",
      freshness: "P0：发布后当天导入，24 小时内复核",
      action: "院校专业组、专业代码、计划数、学费、备注必须与官方计划一致；未核验专业组不参与推荐。"
    },
    {
      name: "一分一段表",
      owner: "云南省招生考试院",
      cadence: "公布后立即锁定",
      freshness: "P0：只按官方累计人数匹配位次",
      action: "支持分数精确匹配位次；未录入分数不插值、不估算，要求考生填写官方位次。"
    },
    {
      name: "本科线 / 特控线 / 专科线",
      owner: "云南省招生考试委员会",
      cadence: "公布后当天更新",
      freshness: "P0：年度固定，后续如有更正需覆盖",
      action: "用于资格线提醒，不直接替代院校专业组位次。"
    },
    {
      name: "投档线和录取位次",
      owner: "云南省招生考试院 / 高校招办",
      cadence: "录取期间随批次更新",
      freshness: "P0：以最新批次投档结果为准",
      action: "用于下一年度预测；同一年有征集或补录时，标记批次和轮次，不能混成一个最低分。"
    },
    {
      name: "征集志愿和计划变更",
      owner: "云南省招生考试院",
      cadence: "填报和录取期间每日检查",
      freshness: "P0：当天有效，过期自动标记",
      action: "只做当期提醒；过期征集计划不得继续作为常规志愿推荐。"
    },
    {
      name: "高校招生章程",
      owner: "各高校本科招生网 / 阳光高考",
      cadence: "章程发布季每周核验",
      freshness: "P1：专业限制、体检、语种、校区必须留来源",
      action: "用于风险提示；章程与省计划冲突时，回查官方计划和高校招办公告。"
    }
  ]
};
