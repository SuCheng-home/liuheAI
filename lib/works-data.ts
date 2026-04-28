export type WorkType = "图片" | "音频" | "视频" | "智能体"

export type CreatorRole = "教师" | "学生"

export interface WorkCreator {
  role: CreatorRole
  name: string
  school: string
  /** 学生标明年级，如 "六年级 (3) 班" / "高一 (5) 班"；教师可填学科或无 */
  grade?: string
  subject?: string
}

export interface Work {
  id: string
  title: string
  summary: string
  description: string[]
  cover: string
  type: WorkType
  creator: WorkCreator
  /** 多作者（可选），未提供时回退使用 creator */
  authors?: WorkCreator[]
  /** 获奖情况 */
  award?: string
  /** 标签 */
  tags: string[]
  /** 点赞数 */
  likes: number
  /** 评分 0-5 */
  rating: number
  ratingCount: number
  /** 创作时间 */
  createdAt: string
  /** 详情页预览资源 */
  preview?: {
    type: "image" | "video" | "audio" | "iframe"
    src: string
    poster?: string
  }
  /** 多张作品图（仅图片类作品） */
  gallery?: string[]
}

export const workTypes: ("全部" | WorkType)[] = [
  "全部",
  "图片",
  "音频",
  "视频",
  "智能体",
]

export const workSortOptions = [
  { id: "newest", label: "最新发布" },
  { id: "rating", label: "评分最高" },
  { id: "likes", label: "点赞最多" },
] as const

export type WorkSortId = (typeof workSortOptions)[number]["id"]

export const works: Work[] = [
  {
    id: "w1",
    title: "古诗词智能鉴赏助手",
    summary:
      "面向小学生的古诗词学习智能体，结合 AI 朗诵、背景图绘制与互动答题，让孩子在沉浸式情境中理解诗意。",
    description: [
      "本智能体围绕小学语文必背 75 首古诗词构建，支持「图、文、声」三位一体的学习闭环。",
      "学生可选择任意诗词，AI 自动生成与诗境契合的水墨插画与情景配音，并通过分句讲解引导学生体会画面美。",
      "在掌握基础后，智能体会出题考查诗句理解、关键词替换、情感判断等能力，错题自动归档形成专属错题本。",
      "作品已在校内 3 个班级试用，平均背诵速度提升 32%，在区级智能体创客大赛中获评一等奖。",
    ],
    cover: "/work-poetry-agent-cover.jpg",
    type: "智能体",
    creator: {
      role: "教师",
      name: "徐 颖",
      school: "金陵中学实验小学",
      subject: "语文",
    },
    authors: [
      {
        role: "教师",
        name: "徐 颖",
        school: "金陵中学实验小学",
        subject: "语文",
      },
      {
        role: "教师",
        name: "周 玥",
        school: "金陵中学实验小学",
        subject: "信息技术",
      },
    ],
    award: "区级一等奖",
    tags: ["语文", "古诗词", "沉浸式", "AI 朗诵"],
    likes: 1860,
    rating: 4.9,
    ratingCount: 218,
    createdAt: "2026-04-12",
    preview: {
      type: "image",
      src: "/work-poetry-agent-cover.jpg",
    },
  },
  {
    id: "w2",
    title: "雨花英烈群像 · AI 数字水墨",
    summary:
      "以雨花英烈故事为蓝本创作的系列 AI 水墨画，致敬革命先辈、传承红色血脉。",
    description: [
      "作者以邓中夏、恽代英、罗登贤等雨花英烈生平为线索，使用 AI 绘画工具生成 12 幅水墨人物群像。",
      "每幅作品配套 200 字英烈简介，画面突出人物气质，色彩克制庄重，具有强烈的精神感染力。",
      "作品在「雨花·红色记忆」校园主题展中展出，并被雨花台烈士陵园选作研学课程图册。",
    ],
    cover: "/work-ai-painting-yuhua.jpg",
    type: "图片",
    creator: {
      role: "学生",
      name: "陈 子涵",
      school: "雨花外国语小学西善花苑分校",
      grade: "六年级 (2) 班",
    },
    authors: [
      {
        role: "学生",
        name: "陈 子涵",
        school: "雨花外国语小学西善花苑分校",
        grade: "六年级 (2) 班",
      },
      {
        role: "学生",
        name: "王 安宁",
        school: "雨花外国语小学西善花苑分校",
        grade: "六年级 (3) 班",
      },
    ],
    award: "市级二等奖",
    tags: ["美术", "红色教育", "水墨", "AI 绘画"],
    likes: 2450,
    rating: 4.8,
    ratingCount: 312,
    createdAt: "2026-04-08",
    gallery: ["/work-ai-painting-yuhua.jpg", "/yuhuatai-martyrs-memorial-park.jpg"],
    preview: {
      type: "image",
      src: "/work-ai-painting-yuhua.jpg",
    },
  },
  {
    id: "w3",
    title: "「身边的物理」科学讲解短视频",
    summary:
      "由学生自制、AI 辅助剪辑的科普短视频，用生活化的实验讲解中考必考物理概念。",
    description: [
      "学生选取「电梯里的失重」「冰箱里的霜」「厨房里的沸点」等贴近生活的现象，自主完成实验录制与脚本撰写。",
      "AI 工具协助完成字幕生成、画面稳定与背景音乐匹配，整体片长控制在 3 分钟，节奏紧凑。",
      "视频发布到校园号后单条最高播放量超过 5 万次，被多位老师转载至教学群。",
    ],
    cover: "/work-video-science-explanation.jpg",
    type: "视频",
    creator: {
      role: "学生",
      name: "王 子轩",
      school: "梅山第一中学",
      grade: "初二 (5) 班",
    },
    award: "区级一等奖",
    tags: ["物理", "短视频", "AI 剪辑", "科普"],
    likes: 1320,
    rating: 4.7,
    ratingCount: 156,
    createdAt: "2026-04-02",
    preview: {
      type: "video",
      src: "",
      poster: "/work-video-science-explanation.jpg",
    },
  },
  {
    id: "w4",
    title: "雨花童声 · 二十四节气有声故事",
    summary:
      "学生录音 + AI 配乐的二十四节气主题音频故事集，传播节气文化与农耕智慧。",
    description: [
      "围绕二十四节气，学生选取经典民俗故事进行改编朗读，AI 工具协助完成降噪、配乐与转场。",
      "成品共 24 集，每集 4 - 5 分钟，已上架学校广播站，作为每日午间播放节目。",
      "项目获得江苏省中小学生「童声里的中国」音频创作比赛三等奖。",
    ],
    cover: "/work-audio-storytelling.jpg",
    type: "音频",
    creator: {
      role: "学生",
      name: "周 雨萱",
      school: "雨花台区实验小学",
      grade: "五年级 (1) 班",
    },
    award: "省级三等奖",
    tags: ["语文", "传统文化", "节气", "AI 配乐"],
    likes: 980,
    rating: 4.6,
    ratingCount: 92,
    createdAt: "2026-03-26",
    preview: {
      type: "audio",
      src: "",
      poster: "/work-audio-storytelling.jpg",
    },
  },
  {
    id: "w5",
    title: "数学解题智答助手",
    summary:
      "面向初中学生的数学解题智能体，支持拍照解题、分步讲解与同类题推送。",
    description: [
      "智能体基于人教版初中数学教材构建，覆盖 7 - 9 年级共 1200 余个知识点。",
      "学生上传题目后，AI 不直接给答案，而是通过「提示 → 步骤 → 验证」三段式引导学生独立完成解题。",
      "已在校内 6 个班级试点，月均使用 4800 余次，学生平均独立解题正确率提升 24%。",
    ],
    cover: "/work-math-tutor-agent.jpg",
    type: "智能体",
    creator: {
      role: "教师",
      name: "李 明远",
      school: "梅山第二中学",
      subject: "数学",
    },
    tags: ["数学", "解题", "拍照识别", "分步讲解"],
    likes: 2180,
    rating: 4.8,
    ratingCount: 286,
    createdAt: "2026-03-20",
    preview: {
      type: "image",
      src: "/work-math-tutor-agent.jpg",
    },
  },
  {
    id: "w6",
    title: "英语口语 AI 陪练教练",
    summary:
      "可识别中式发音问题的英语口语陪练智能体，提供针对性反馈与情景对话训练。",
    description: [
      "智能体内置雅思口语题库与中考、高考真题情景对话，支持自由模式与考试模式切换。",
      "重点针对中国学生常见发音问题（如 th、r/l、句末降调）进行专项指导。",
      "已在区内 4 所学校试点，整体口语流利度评分平均提升 14%。",
    ],
    cover: "/work-english-speaking-coach.jpg",
    type: "智能体",
    creator: {
      role: "教师",
      name: "赵 雯",
      school: "南京市雨花台中学",
      subject: "英语",
    },
    award: "区级二等奖",
    tags: ["英语", "口语", "发音矫正"],
    likes: 1640,
    rating: 4.7,
    ratingCount: 198,
    createdAt: "2026-03-15",
    preview: {
      type: "image",
      src: "/work-english-speaking-coach.jpg",
    },
  },
  {
    id: "w7",
    title: "我眼中的春节 · AI 绘画作品",
    summary:
      "学生使用 AI 绘画工具创作的春节主题图画，展示童心眼中的传统节日。",
    description: [
      "作者用 AI 绘画工具生成 6 幅春节主题作品：贴春联、放烟花、年夜饭、舞龙、压岁钱、写福字。",
      "每幅作品配上童趣文字描述，整体色调温暖明亮，充满节日氛围与童真气息。",
      "作品入选区少先队工委「童画中国年」线上画展。",
    ],
    cover: "/work-ai-painting-spring-festival.jpg",
    type: "图片",
    creator: {
      role: "学生",
      name: "孙 思琪",
      school: "雨花台区实验小学善水湾分校",
      grade: "三年级 (4) 班",
    },
    tags: ["美术", "传统节日", "AI 绘画", "童趣"],
    likes: 1280,
    rating: 4.6,
    ratingCount: 134,
    createdAt: "2026-02-22",
    gallery: [
      "/work-ai-painting-spring-festival.jpg",
      "/work-ai-painting-yuhua.jpg",
    ],
    preview: {
      type: "image",
      src: "/work-ai-painting-spring-festival.jpg",
    },
  },
  {
    id: "w8",
    title: "智能避障小车编程实践",
    summary:
      "学生独立完成的 Arduino 智能小车编程项目，实现自动避障、巡线与远程控制功能。",
    description: [
      "学生从零开始完成智能小车的硬件搭建与程序设计，涉及超声波测距、PID 调速、蓝牙通信等模块。",
      "在 AI 助手辅助下完成代码调试，整体项目周期 6 周，最终在区级机器人赛中获得二等奖。",
      "项目代码与电路图均已开源，供同年级同学参考学习。",
    ],
    cover: "/work-robot-programming.jpg",
    type: "视频",
    creator: {
      role: "学生",
      name: "张 凯文",
      school: "南京软件谷外国语学校",
      grade: "高一 (3) 班",
    },
    award: "区级二等奖",
    tags: ["机器人", "编程", "Arduino"],
    likes: 1860,
    rating: 4.9,
    ratingCount: 174,
    createdAt: "2026-02-15",
    preview: {
      type: "video",
      src: "",
      poster: "/work-robot-programming.jpg",
    },
  },
]

export function getWorkById(id: string): Work | undefined {
  return works.find((w) => w.id === id)
}

export const reviewTagOptions = [
  "创意新颖",
  "立意深刻",
  "技术扎实",
  "美感出色",
  "教育价值高",
  "互动性强",
  "推荐分享",
  "可改进",
]
