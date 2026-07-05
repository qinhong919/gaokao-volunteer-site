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
  sources: [
    {
      name: "云南省招生考试院",
      type: "省级官方",
      use: "当年招生计划、志愿填报通知、一分一段表、投档线、征集志愿",
      url: "https://www.ynzs.cn"
    },
    {
      name: "阳光高考平台",
      type: "教育部平台",
      use: "院校名单、招生章程、专业目录、特殊类型招生信息",
      url: "https://gaokao.chsi.com.cn"
    },
    {
      name: "各高校本科招生网",
      type: "高校官方",
      use: "专业介绍、学费、体检限制、外语语种、转专业政策",
      url: "https://gaokao.chsi.com.cn/sch/"
    },
    {
      name: "云南省教育厅",
      type: "主管部门",
      use: "政策解读、改革方案、分数线发布转载核验",
      url: "https://jyt.yn.gov.cn"
    },
    {
      name: "高校就业质量报告",
      type: "高校官方",
      use: "就业率、升学率、就业地区、重点用人单位",
      url: "https://www.chsi.com.cn/jyzlbg/"
    },
    {
      name: "纸质招生考试报",
      type: "需数字化",
      use: "云南当年院校专业组计划，通常需要人工录入或 OCR 校对",
      url: "https://www.ynzs.cn"
    }
  ]
};
