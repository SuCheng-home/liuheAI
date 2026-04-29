export type Agent = {
  id: string
  title: string
  description: string
  cover: string
  icon: string
  author: string
  school: string
  publishDate: string
  stage: "幼儿园" | "小学" | "初中" | "高中" | "职校" | "其它"
  audience: "教师" | "学生"
  category: string
  tags?: string[]
  rating: number
  usageCount: number
  likes?: number
  longDescription?: string
  attachments?: Array<{ name: string; format: string; size: string }>
  embedUrl?: string
  reviews?: Array<{
    id: string
    name: string
    school: string
    time: string
    rating: number
    tags: string[]
    comment?: string
  }>
}

export type UploadStatus =
  | "待审批"
  | "审批被退回"
  | "审批通过"
  | "已上架"
  | "已下架"

export type UploadedAgent = {
  id: string
  title: string
  subtitle: string
  description: string
  cover: string
  icon: string
  status: UploadStatus
  rating: number
  usageCount: number
  submitDate: string
  stage: Agent["stage"]
  audience: Agent["audience"]
  category: string
  tags: string[]
  rejectReason?: string
  reviewer?: string
  reviewDate?: string
}

export const categories = [
  "全部",
  "学科备课",
  "作业批改",
  "学情分析",
  "个性辅导",
  "教研协作",
  "心理辅导",
  "创意表达",
  "科学探究",
]

export const stages = ["全部", "幼儿园", "小学", "初中", "高中", "职校", "其它"] as const
export const audiences = ["全部", "教师", "学生"] as const
export const sortOptions = ["上架时间", "评星", "使用数"] as const

export const reviewTags = [
  // 正面评价
  "实用",
  "高效",
  "易用",
  "设计合理",
  "创意十足",
  "交互流畅",
  "内容丰富",
  "界面美观",
  // 鼓励建议
  "希望进一步优化",
  "期待更多功能",
  "响应可再提速",
  "建议补充示例",
  "期待界面升级",
  "希望增强准确性",
]

// 常用智能体属性标签（用于上传时选择）
export const attributeTagOptions = [
  "语音交互",
  "图像识别",
  "数据可视化",
  "个性化推荐",
  "情感分析",
  "实时反馈",
  "多模态",
  "自动批改",
  "知识图谱",
  "虚拟仿真",
  "协作共享",
  "离线可用",
  "支持手机",
  "适配大屏",
  "开源免费",
  "数据本地化",
]

const schools = [
  "南京市六合高级中学",
  "南京一中明发滨江分校",
  "南京市六合区实验小学",
  "南京市六合区双语小学",
  "南京市六合区程桥初级中学",
  "南京市棠城学校",
  "南京市六合区横梁初级中学",
  "南京市六合区龙池中心小学",
  "南京市六合区北城小学",
  "南京市六合区龙袍中心小学",
]

const teachers = [
  "李思远",
  "王雨桐",
  "张明远",
  "陈佳怡",
  "刘文轩",
  "赵雅琴",
  "孙晓宇",
  "周敏慧",
  "吴嘉伟",
  "郑晨曦",
  "黄诗韵",
  "徐文博",
]

export const agents: Agent[] = [
  {
    id: "1",
    title: "古诗词智能鉴赏助手",
    description: "深度解析古诗词意境，辅助学生理解作者情感与文学手法，支持多维度对比分析。",
    cover: "/chinese-ancient-poetry-calligraphy-brush-ink-wash.jpg",
    icon: "📜",
    author: teachers[0],
    school: schools[0],
    publishDate: "2025-10-12",
    stage: "初中",
    audience: "学生",
    category: "学科备课",
    tags: ["知识图谱", "多模态", "语音交互"],
    rating: 4.8,
    usageCount: 3421,
    longDescription:
      "本智能体基于大语言模型，整合了《全唐诗》《全宋词》等经典文本资源，能够为初中学生提供深度的古诗词鉴赏指导。支持按作者、朝代、题材、意象等多维度检索，并能结合历史背景进行拓展解读。",
    attachments: [
      { name: "古诗词鉴赏指南.pdf", format: "PDF", size: "2.4 MB" },
      { name: "教学案例汇编.docx", format: "DOCX", size: "1.8 MB" },
      { name: "拓展阅读书目.pdf", format: "PDF", size: "0.9 MB" },
    ],
    embedUrl: "https://example.com/agent/1",
    reviews: [
      {
        id: "r1",
        name: "周老师",
        school: "雨花台中学",
        time: "2025-10-28",
        rating: 5,
        tags: ["实用", "内容丰富", "设计合理"],
      },
      {
        id: "r2",
        name: "林同学",
        school: "雨花外国语小学",
        time: "2025-10-25",
        rating: 5,
        tags: ["易用", "交互流畅"],
      },
      {
        id: "r3",
        name: "陈老师",
        school: "板桥中学",
        time: "2025-10-20",
        rating: 4,
        tags: ["高效", "期待更多功能"],
      },
    ],
  },
  {
    id: "2",
    title: "数学作业智能批改",
    description: "自动识别数学题型，提供详细解题步骤与错题分析，帮助教师提升批改效率。",
    cover: "/mathematics-equations-blackboard-chalk-geometry.jpg",
    icon: "🧮",
    author: teachers[1],
    school: schools[1],
    publishDate: "2025-10-08",
    stage: "小学",
    audience: "教师",
    category: "作业批改",
    tags: ["自动批改", "图像识别", "数据可视化"],
    rating: 4.9,
    usageCount: 5280,
  },
  {
    id: "3",
    title: "英语口语陪练伙伴",
    description: "模拟真实对话场景，纠正发音与语法，支持多种主题情景化练习。",
    cover: "/english-conversation-speech-bubbles-language.jpg",
    icon: "🎤",
    author: teachers[2],
    school: schools[2],
    publishDate: "2025-10-15",
    stage: "高中",
    audience: "学生",
    category: "个性辅导",
    tags: ["语音交互", "实时反馈", "个性化推荐"],
    rating: 4.7,
    usageCount: 4120,
  },
  {
    id: "4",
    title: "物理实验虚拟仿真",
    description: "沉浸式物理实验环境，安全开展高风险实验，支持参数调整与数据记录。",
    cover: "/physics-laboratory-experiment-equipment-science.jpg",
    icon: "⚗️",
    author: teachers[3],
    school: schools[3],
    publishDate: "2025-10-05",
    stage: "高中",
    audience: "学生",
    category: "科学探究",
    tags: ["虚拟仿真", "数据可视化", "多模态"],
    rating: 4.8,
    usageCount: 2890,
  },
  {
    id: "5",
    title: "班级学情分析师",
    description: "汇总分析班级学生成绩数据，生成可视化报告，提供精准教学建议。",
    cover: "/data-analytics-charts-dashboard-education.jpg",
    icon: "📊",
    author: teachers[4],
    school: schools[4],
    publishDate: "2025-09-28",
    stage: "初中",
    audience: "教师",
    category: "学情分析",
    tags: ["数据可视化", "个性化推荐", "数据本地化"],
    rating: 4.9,
    usageCount: 3680,
  },
  {
    id: "6",
    title: "幼儿识字趣味游戏",
    description: "将汉字学习融入游戏情境，激发幼儿识字兴趣，支持语音跟读。",
    cover: "/kindergarten-children-learning-chinese-characters.jpg",
    icon: "🎨",
    author: teachers[5],
    school: schools[5],
    publishDate: "2025-10-10",
    stage: "幼儿园",
    audience: "学生",
    category: "创意表达",
    tags: ["语音交互", "实时反馈", "支持手机"],
    rating: 4.6,
    usageCount: 1980,
  },
  {
    id: "7",
    title: "教研协作工作坊",
    description: "支持教师团队协同备课、课件共享、教学反思，打造智慧教研新生态。",
    cover: "/teachers-collaboration-meeting-discussion-education.jpg",
    icon: "🤝",
    author: teachers[6],
    school: schools[6],
    publishDate: "2025-10-18",
    stage: "其它",
    audience: "教师",
    category: "教研协作",
    tags: ["协作共享", "知识图谱", "适配大屏"],
    rating: 4.7,
    usageCount: 2450,
  },
  {
    id: "8",
    title: "学生心理守护者",
    description: "识别学生情绪状态，提供心理疏导建议，建立校园心理健康档案。",
    cover: "/mental-health-care-mindfulness-peaceful-nature.jpg",
    icon: "💚",
    author: teachers[7],
    school: schools[7],
    publishDate: "2025-09-22",
    stage: "初中",
    audience: "教师",
    category: "心理辅导",
    tags: ["情感分析", "数据本地化", "实时反馈"],
    rating: 4.8,
    usageCount: 1720,
  },
  {
    id: "9",
    title: "AI绘画创作助手",
    description: "将学生创意转化为精美画作，辅助美术教学与创作灵感激发。",
    cover: "/digital-art-painting-creative-colorful-illustration.jpg",
    icon: "🎨",
    author: teachers[8],
    school: schools[8],
    publishDate: "2025-10-20",
    stage: "小学",
    audience: "学生",
    category: "创意表达",
    tags: ["多模态", "图像识别", "实时反馈"],
    rating: 4.9,
    usageCount: 6120,
  },
  {
    id: "10",
    title: "职业技能训练营",
    description: "针对职校专业技能，提供虚拟实训场景与考核评估。",
    cover: "/vocational-training-technical-skills-workshop.jpg",
    icon: "🔧",
    author: teachers[9],
    school: schools[9],
    publishDate: "2025-10-02",
    stage: "职校",
    audience: "学生",
    category: "个性辅导",
    tags: ["虚拟仿真", "适配大屏", "离线可用"],
    rating: 4.5,
    usageCount: 1580,
  },
  {
    id: "11",
    title: "科学小探索家",
    description: "引导小学生开展科学探究，培养观察、假设、验证的科学思维。",
    cover: "/science-exploration-microscope-children-learning.jpg",
    icon: "🔬",
    author: teachers[10],
    school: schools[0],
    publishDate: "2025-10-14",
    stage: "小学",
    audience: "学生",
    category: "科学探究",
    tags: ["虚拟仿真", "语音交互", "知识图谱"],
    rating: 4.8,
    usageCount: 3250,
  },
  {
    id: "12",
    title: "语文作文智能点评",
    description: "基于优秀范文库，智能点评作文结构、语言表达与情感深度。",
    cover: "/chinese-essay-writing-composition-notebook.jpg",
    icon: "✍️",
    author: teachers[11],
    school: schools[1],
    publishDate: "2025-10-25",
    stage: "初中",
    audience: "教师",
    category: "作业批改",
    tags: ["自动批改", "情感分析", "个性化推荐"],
    rating: 4.7,
    usageCount: 4680,
  },
]

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id)
}

// 我上传的智能体（示例数据）
export const uploadedAgents: UploadedAgent[] = [
  {
    id: "u1",
    title: "古诗词智能鉴赏助手",
    subtitle: "唐诗宋词深度解读，助力初中语文课堂",
    description:
      "基于大语言模型，整合《全唐诗》《全宋词》等经典资源，支持按作者、朝代、题材、意象多维度检索。",
    cover: "/chinese-ancient-poetry-calligraphy-brush-ink-wash.jpg",
    icon: "📜",
    status: "已上架",
    rating: 4.8,
    usageCount: 3421,
    submitDate: "2025-10-02",
    reviewDate: "2025-10-08",
    reviewer: "教研室审核组",
    stage: "初中",
    audience: "学生",
    category: "学科备课",
    tags: ["知识图谱", "多模态", "语音交互"],
  },
  {
    id: "u2",
    title: "课堂互动问答生成器",
    subtitle: "基于教学内容自动生成互动题目",
    description:
      "输入教学要点，自动生成选择题、填空题、开放题等多种形式的课堂互动问题，支持难度调节。",
    cover: "/teachers-collaboration-meeting-discussion-education.jpg",
    icon: "💡",
    status: "待审批",
    rating: 0,
    usageCount: 0,
    submitDate: "2025-10-27",
    stage: "小学",
    audience: "教师",
    category: "学科备课",
    tags: ["实时反馈", "个性化推荐", "自动批改"],
  },
  {
    id: "u3",
    title: "小学生错题本助手",
    subtitle: "个性化错题整理与复习",
    description:
      "拍照上传错题后自动识别、分类、归档，基于艾宾浩斯遗忘曲线智能安排复习周期。",
    cover: "/mathematics-equations-blackboard-chalk-geometry.jpg",
    icon: "📒",
    status: "审批被退回",
    rating: 0,
    usageCount: 0,
    submitDate: "2025-10-20",
    reviewDate: "2025-10-22",
    reviewer: "教研室审核组",
    rejectReason:
      "1. 封面图质量较低，请更换清晰素材；2. 智能体嵌入地址无法正常访问，建议检查接口；3. 建议补充至少 1 份使用说明文档。",
    stage: "小学",
    audience: "学生",
    category: "作业批改",
    tags: ["图像识别", "个性化推荐", "数据本地化"],
  },
  {
    id: "u4",
    title: "英语听力情境训练",
    subtitle: "贴近生活的情境听力练习",
    description:
      "围绕日常生活、校园、旅行等主题生成听力素材，支持倍速播放与重点回听。",
    cover: "/english-conversation-speech-bubbles-language.jpg",
    icon: "🎧",
    status: "审批通过",
    rating: 0,
    usageCount: 0,
    submitDate: "2025-10-25",
    reviewDate: "2025-10-26",
    reviewer: "教研室审核组",
    stage: "高中",
    audience: "学生",
    category: "个性辅导",
    tags: ["语音交互", "实时反馈", "多模态"],
  },
  {
    id: "u5",
    title: "实验报告格式检查",
    subtitle: "快速检查学生实验报告格式",
    description:
      "自动检查实验报告的结构完整性、数据格式与表达规范性，给出详细修改建议。",
    cover: "/physics-laboratory-experiment-equipment-science.jpg",
    icon: "📝",
    status: "已下架",
    rating: 4.3,
    usageCount: 812,
    submitDate: "2025-08-12",
    reviewDate: "2025-08-15",
    reviewer: "教研室审核组",
    stage: "高中",
    audience: "教师",
    category: "作业批改",
    tags: ["自动批改", "数据可视化"],
  },
]
