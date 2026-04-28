export type TrainingSubject =
  | "小学语文"
  | "小学数学"
  | "小学英语"
  | "初中语文"
  | "初中数学"
  | "初中物理"
  | "高中信息技术"
  | "跨学科"
  | "德育与心理"

export type TrainingStatus = "报名中" | "进行中" | "已结束"

export interface TrainingCourse {
  time: string
  title: string
  speaker: string
  speakerTitle: string
}

export interface TrainingActivity {
  id: string
  title: string
  subject: TrainingSubject
  startAt: string
  endAt: string
  location: string
  coverImage: string
  introduction: string[]
  organizer: string
  contact: string
  registrationCount: number
  capacity: number
  status: TrainingStatus
  courses: TrainingCourse[]
  highlights: string[]
}

export const trainingSubjects: ("全部" | TrainingSubject)[] = [
  "全部",
  "小学语文",
  "小学数学",
  "小学英语",
  "初中语文",
  "初中数学",
  "初中物理",
  "高中信息技术",
  "跨学科",
  "德育与心理",
]

export const trainingActivities: TrainingActivity[] = [
  {
    id: "t1",
    title: "AI 赋能小学语文阅读教学专题研训",
    subject: "小学语文",
    startAt: "2026-09-08 09:00",
    endAt: "2026-09-08 16:30",
    location: "雨花台区教师发展中心 A 座 301 报告厅",
    coverImage: "/training-master-teacher-open-class.jpg",
    introduction: [
      "本次研训围绕「AI 赋能小学语文阅读教学」主题，邀请省特级教师、区骨干名师与一线优秀青年教师，围绕整本书阅读、古诗词鉴赏、记叙文教学等核心场景展开深度研讨。",
      "活动聚焦课程实施中的痛点难点，展示「智雨润教」平台上的语文类智能体如何与课堂教学深度融合，促进学生高阶思维能力的发展。",
      "参训教师将现场观摩三节 AI 融合示范课，听取两场主题报告，并参与分组研讨、评课议课等互动环节，收获教学设计思路与可落地的实践方案。",
    ],
    organizer: "雨花台区教师发展中心 · 小学语文教研组",
    contact: "王老师 025-5288xxxx",
    registrationCount: 186,
    capacity: 220,
    status: "报名中",
    courses: [
      {
        time: "09:00 - 09:40",
        title: "主题报告：AI 时代小学语文阅读教学的变革与坚守",
        speaker: "张明",
        speakerTitle: "江苏省特级教师 · 雨花台区教师发展中心",
      },
      {
        time: "09:50 - 10:30",
        title: "示范课：《少年闰土》整本书阅读 · 智能体助力人物分析",
        speaker: "李静",
        speakerTitle: "金陵中学实验小学 · 区学科带头人",
      },
      {
        time: "10:40 - 11:20",
        title: "示范课：《七律·长征》古诗词鉴赏 · AI 诗词助手应用",
        speaker: "陈晓",
        speakerTitle: "西善桥小学 · 区优秀青年教师",
      },
      {
        time: "13:30 - 14:30",
        title: "分组评课议课 · 教学设计工作坊",
        speaker: "全体",
        speakerTitle: "参训教师 · 分 6 组",
      },
      {
        time: "14:40 - 15:30",
        title: "示范课：记叙文写作指导 · 作文批改助手集成演示",
        speaker: "周敏",
        speakerTitle: "雨花外国语小学 · 区教学新秀",
      },
      {
        time: "15:40 - 16:30",
        title: "专家点评与总结发言",
        speaker: "刘宏",
        speakerTitle: "南京市教研室小学语文教研员",
      },
    ],
    highlights: ["省特级领衔", "3 节示范课", "智能体深度融合", "教师发展证书"],
  },
  {
    id: "t2",
    title: "小学数学「大单元」教学设计研修班",
    subject: "小学数学",
    startAt: "2026-09-15 08:30",
    endAt: "2026-09-15 17:00",
    location: "金陵中学岱山分校 · 多功能报告厅",
    coverImage: "/mathematics-equations-blackboard-chalk-geometry.jpg",
    introduction: [
      "聚焦新课标「数与运算」「图形与几何」两大核心板块，围绕大单元整体教学设计展开专题研修，借助 AI 工具帮助教师进行单元目标解构、学习任务设计与评价指标制定。",
      "本次研修采用「讲座 + 工作坊 + 说课」的混合模式，重点训练教师运用「备课助手」智能体完成大单元教学设计的实战能力。",
    ],
    organizer: "雨花台区教师发展中心 · 小学数学教研组",
    contact: "陈老师 025-5289xxxx",
    registrationCount: 142,
    capacity: 180,
    status: "报名中",
    courses: [
      {
        time: "08:30 - 09:30",
        title: "主题报告：新课标背景下的大单元教学设计方法论",
        speaker: "孙华",
        speakerTitle: "南京师范大学教授 · 博士生导师",
      },
      {
        time: "09:40 - 10:30",
        title: "工作坊：用「备课助手」完成《分数的意义和性质》单元设计",
        speaker: "吴雪",
        speakerTitle: "金陵中学实验小学 · 雨花区教坛新秀",
      },
      {
        time: "10:40 - 11:30",
        title: "示范课：《长方体与正方体》单元起始课",
        speaker: "赵峰",
        speakerTitle: "岱山实验小学 · 区学科带头人",
      },
      {
        time: "13:30 - 15:30",
        title: "分组说课 · 导师点评",
        speaker: "6 位导师",
        speakerTitle: "区教研员 + 学科带头人",
      },
      {
        time: "15:40 - 17:00",
        title: "研修总结与后续任务布置",
        speaker: "李强",
        speakerTitle: "雨花台区小学数学教研员",
      },
    ],
    highlights: ["大学教授领衔", "工作坊实战", "AI 智能体集成", "24 学时"],
  },
  {
    id: "t3",
    title: "初中物理「实验探究」AI 融合教学研讨会",
    subject: "初中物理",
    startAt: "2026-09-22 13:30",
    endAt: "2026-09-22 17:30",
    location: "梅山第一中学 · AI 物理实验室",
    coverImage: "/physics-laboratory-experiment-equipment-science.jpg",
    introduction: [
      "以梅山第一中学省级 AI 实验室为依托，围绕「力学」「电学」「光学」三大模块，展示多模态大模型在物理实验探究中的应用场景。",
      "参训教师将亲自体验「物理实验助手」智能体，通过手机拍摄实验视频，AI 自动完成数据采集、图表绘制与结论推导，感受 AI 带来的教学方式变革。",
    ],
    organizer: "雨花台区教师发展中心 · 初中物理教研组",
    contact: "周老师 025-5290xxxx",
    registrationCount: 68,
    capacity: 80,
    status: "报名中",
    courses: [
      {
        time: "13:30 - 14:15",
        title: "主题报告：多模态大模型在物理实验教学中的应用路径",
        speaker: "王宇",
        speakerTitle: "南京市教研室物理教研员",
      },
      {
        time: "14:20 - 15:20",
        title: "实验探究课：探究单摆的周期与摆长的关系",
        speaker: "张军",
        speakerTitle: "梅山第一中学 · 市学科带头人",
      },
      {
        time: "15:30 - 16:30",
        title: "实操工作坊：使用「物理实验助手」完成力学分析",
        speaker: "全体",
        speakerTitle: "参训教师 · 分组实操",
      },
      {
        time: "16:40 - 17:30",
        title: "交流研讨 · 经验分享",
        speaker: "5 位代表",
        speakerTitle: "梅山一中 + 区内其它学校",
      },
    ],
    highlights: ["AI 实验室实战", "多模态应用", "小班研讨", "省级研究课题"],
  },
  {
    id: "t4",
    title: "小学英语口语评测与个性化辅导研修",
    subject: "小学英语",
    startAt: "2026-10-09 09:00",
    endAt: "2026-10-09 16:00",
    location: "雨花外国语小学 · 国际交流中心",
    coverImage: "/english-conversation-speech-bubbles-language.jpg",
    introduction: [
      "聚焦小学英语口语教学痛点，结合 AI 口语评测技术、语音识别、个性化纠错功能，探索「课前诊断 - 课中提升 - 课后巩固」的全链路英语教学新范式。",
      "邀请雨花外国语小学金牌外教团队、区英语教研员与省级特级教师共同研讨 AI 时代英语教学的变革与发展。",
    ],
    organizer: "雨花台区教师发展中心 · 小学英语教研组",
    contact: "林老师 025-5291xxxx",
    registrationCount: 98,
    capacity: 120,
    status: "报名中",
    courses: [
      {
        time: "09:00 - 09:50",
        title: "专家讲座：AI 赋能下的英语口语教学变革",
        speaker: "黄丽",
        speakerTitle: "江苏省英语特级教师",
      },
      {
        time: "10:00 - 10:45",
        title: "示范课：Unit 4 My Weekend Plan · 口语训练篇",
        speaker: "Emily",
        speakerTitle: "雨花外国语小学 · 外教",
      },
      {
        time: "10:55 - 11:40",
        title: "智能体演示：英语口语评测助手的课堂应用",
        speaker: "刘畅",
        speakerTitle: "雨花台区英语教研员",
      },
      {
        time: "13:30 - 15:30",
        title: "工作坊：个性化辅导方案设计",
        speaker: "全体",
        speakerTitle: "参训教师 · 分组实操",
      },
      {
        time: "15:40 - 16:00",
        title: "研修总结",
        speaker: "刘畅",
        speakerTitle: "雨花台区英语教研员",
      },
    ],
    highlights: ["中外专家", "示范课", "口语评测实战", "国际化视野"],
  },
  {
    id: "t5",
    title: "初中语文「经典文学作品」AI 辅助教学研训",
    subject: "初中语文",
    startAt: "2026-10-16 08:30",
    endAt: "2026-10-16 16:30",
    location: "板桥中学 · 学术报告厅",
    coverImage: "/chinese-essay-writing-composition-notebook.jpg",
    introduction: [
      "以统编初中语文教材中的《西游记》《朝花夕拾》《红星照耀中国》等经典名著为研修载体，借助 AI 辅助阅读工具，引导学生深入理解作品主题、人物形象与艺术手法。",
      "活动将展示「古诗词智能鉴赏助手」「名著导读智能体」等平台资源，帮助教师构建 AI 时代的整本书阅读教学新模式。",
    ],
    organizer: "雨花台区教师发展中心 · 初中语文教研组",
    contact: "吴老师 025-5292xxxx",
    registrationCount: 124,
    capacity: 160,
    status: "报名中",
    courses: [
      {
        time: "08:30 - 09:20",
        title: "专题讲座：AI 辅助下的整本书阅读教学路径",
        speaker: "赵文",
        speakerTitle: "南京市初中语文教研员",
      },
      {
        time: "09:30 - 10:20",
        title: "示范课：《西游记》人物群像分析 · AI 助力",
        speaker: "徐丽",
        speakerTitle: "板桥中学 · 区学科带头人",
      },
      {
        time: "10:30 - 11:20",
        title: "示范课：《朝花夕拾》主题研读",
        speaker: "马宁",
        speakerTitle: "金陵中学岱山分校 · 市教坛新秀",
      },
      {
        time: "13:30 - 15:30",
        title: "分组研讨 · 教学设计分享",
        speaker: "全体",
        speakerTitle: "参训教师 · 分 5 组",
      },
      {
        time: "15:40 - 16:30",
        title: "专家点评与总结",
        speaker: "赵文",
        speakerTitle: "南京市初中语文教研员",
      },
    ],
    highlights: ["整本书阅读", "名著导读", "多学段贯通", "教学资源包"],
  },
  {
    id: "t6",
    title: "高中信息技术「AI 项目式学习」教师培训",
    subject: "高中信息技术",
    startAt: "2026-10-23 09:00",
    endAt: "2026-10-24 17:00",
    location: "南京软件谷研学基地 · AI 创新实验室",
    coverImage: "/training-subject-research-discussion.jpg",
    introduction: [
      "面向高中信息技术学科教师，开展为期两天的项目式学习培训，围绕「AI 应用开发」「智能体设计」「创新实践」三大核心能力展开系统训练。",
      "教师们将亲手搭建一款教育智能体，并提交至「智雨润教」平台作品展，优秀作品将参加雨花台区第一届智能体创客大赛教师组。",
    ],
    organizer: "雨花台区教师发展中心 · 高中信息技术教研组",
    contact: "黄老师 025-5293xxxx",
    registrationCount: 56,
    capacity: 60,
    status: "报名中",
    courses: [
      {
        time: "第一天 09:00 - 12:00",
        title: "AI 应用开发入门 · 从原理到实践",
        speaker: "钱勇",
        speakerTitle: "南京软件谷专家 · AI 工程师",
      },
      {
        time: "第一天 13:30 - 17:00",
        title: "智能体设计工作坊 · 扣子平台实战",
        speaker: "李波",
        speakerTitle: "雨花台区信息技术教研员",
      },
      {
        time: "第二天 09:00 - 12:00",
        title: "创新项目实践 · 教育智能体开发",
        speaker: "全体",
        speakerTitle: "参训教师 · 小组合作",
      },
      {
        time: "第二天 13:30 - 16:00",
        title: "作品展示与评比",
        speaker: "全体",
        speakerTitle: "参训教师 + 评审专家",
      },
      {
        time: "第二天 16:00 - 17:00",
        title: "颁奖仪式与结业典礼",
        speaker: "区教研员",
        speakerTitle: "颁发培训证书与作品证书",
      },
    ],
    highlights: ["两天研修", "项目式学习", "作品认证", "创客大赛通道"],
  },
  {
    id: "t7",
    title: "跨学科主题学习「可持续发展教育」研训活动",
    subject: "跨学科",
    startAt: "2026-11-06 09:00",
    endAt: "2026-11-06 17:00",
    location: "宁南生态农业研学基地 · 实践课堂",
    coverImage: "/ningnan-eco-agriculture-base.jpg",
    introduction: [
      "围绕联合国可持续发展目标（SDGs），整合语文、数学、科学、地理等多学科内容，开展「可持续发展教育」主题研训。",
      "教师们将在生态农业基地实地参与「种子发芽条件探究」「水资源循环利用」「碳中和主题绘本创作」等跨学科实践活动。",
    ],
    organizer: "雨花台区教师发展中心 · 综合实践教研组",
    contact: "孙老师 025-5294xxxx",
    registrationCount: 75,
    capacity: 100,
    status: "报名中",
    courses: [
      {
        time: "09:00 - 10:00",
        title: "主题报告：可持续发展教育的课程整合",
        speaker: "蒋丽",
        speakerTitle: "南京师范大学课程专家",
      },
      {
        time: "10:10 - 11:30",
        title: "实地考察：生态农业与科学探究",
        speaker: "基地导师",
        speakerTitle: "宁南生态农业基地",
      },
      {
        time: "13:00 - 15:30",
        title: "跨学科工作坊 · 主题课程设计",
        speaker: "全体",
        speakerTitle: "参训教师 · 分学段分组",
      },
      {
        time: "15:40 - 17:00",
        title: "成果汇报与研修总结",
        speaker: "全体",
        speakerTitle: "各小组代表",
      },
    ],
    highlights: ["户外研训", "跨学科融合", "SDGs 主题", "基地实践"],
  },
  {
    id: "t8",
    title: "德育与心理：AI 辅助下的学生心理健康工作研讨会",
    subject: "德育与心理",
    startAt: "2026-11-13 13:30",
    endAt: "2026-11-13 17:00",
    location: "雨花台中学 · 心理健康教育中心",
    coverImage: "/mental-health-care-mindfulness-peaceful-nature.jpg",
    introduction: [
      "本次研讨会聚焦新时代中小学生心理健康工作，探讨如何借助 AI 技术开展心理状态识别、个性化疏导、家校协同等工作，为一线德育工作者与心理教师提供实践指导。",
    ],
    organizer: "雨花台区教师发展中心 · 德育研究室",
    contact: "白老师 025-5295xxxx",
    registrationCount: 98,
    capacity: 120,
    status: "报名中",
    courses: [
      {
        time: "13:30 - 14:15",
        title: "专家报告：AI 时代的青少年心理关怀",
        speaker: "杨梅",
        speakerTitle: "南京市心理特级教师",
      },
      {
        time: "14:20 - 15:10",
        title: "示范课：《认识我的情绪》心理健康活动课",
        speaker: "钟倩",
        speakerTitle: "雨花台中学 · 国家二级心理咨询师",
      },
      {
        time: "15:20 - 16:20",
        title: "圆桌论坛：AI 辅助心理辅导的边界与伦理",
        speaker: "4 位嘉宾",
        speakerTitle: "心理专家 + 法律顾问 + 教研员",
      },
      {
        time: "16:30 - 17:00",
        title: "研讨总结",
        speaker: "白静",
        speakerTitle: "雨花台区德育研究室主任",
      },
    ],
    highlights: ["心理健康", "AI 辅助", "圆桌论坛", "伦理思考"],
  },
]

export function getTrainingById(id: string): TrainingActivity | undefined {
  return trainingActivities.find((t) => t.id === id)
}

export function getUpcomingTrainings(limit = 4): TrainingActivity[] {
  return trainingActivities.slice(0, limit)
}
