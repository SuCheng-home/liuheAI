export type BookingStatus = "pending" | "approved" | "rejected"

export interface ExpertMentor {
  id: string
  name: string
  title: string
  organization: string
  avatar: string
  intro: string
  expertise: string[]
  bookingCount: number
  rating: number
  reviewCount: number
  serviceYears: number
  honors: string[]
}

export interface Studio {
  id: string
  name: string
  leader: string
  school: string
  cover: string
  subject: string
  memberCount: number
  description: string
  recentNews: { date: string; title: string }[]
  achievements: string[]
}

export interface MyBooking {
  id: string
  mentorId: string
  trainingTopic: string
  date: string
  contact: string
  phone: string
  status: BookingStatus
  rejectReason?: string
  createdAt: string
}

export const expertMentors: ExpertMentor[] = [
  {
    id: "m1",
    name: "张文渊",
    title: "教育学博士 / 特级教师",
    organization: "南京师范大学教育科学学院",
    avatar: "/mentor-prof-zhang-portrait.jpg",
    intro:
      "长期从事中小学课程与教学论研究，主持国家社科基金教育学一般项目两项，在《教育研究》《课程·教材·教法》等核心期刊发表论文 30 余篇。",
    expertise: ["课程设计", "教学评价", "教师专业发展", "项目式学习"],
    bookingCount: 86,
    rating: 4.9,
    reviewCount: 124,
    serviceYears: 18,
    honors: [
      "江苏省特级教师",
      "国家社科基金教育学项目主持人",
      "全国基础教育课程改革先进个人",
    ],
  },
  {
    id: "m2",
    name: "王慧敏",
    title: "正高级教师 / 学科带头人",
    organization: "南京市教育科学研究所",
    avatar: "/mentor-dr-wang-portrait.jpg",
    intro:
      "深耕语文学科教学 25 年，致力于人工智能与语文教学深度融合的研究与实践，主编《AI 时代的语文课堂》等系列教材。",
    expertise: ["语文教学", "AI 与学科融合", "整本书阅读", "作文教学"],
    bookingCount: 72,
    rating: 4.9,
    reviewCount: 98,
    serviceYears: 25,
    honors: [
      "正高级教师",
      "南京市学科带头人",
      "省 333 高层次人才培养工程培养对象",
    ],
  },
  {
    id: "m3",
    name: "陈思远",
    title: "副教授 / AI 教育专家",
    organization: "东南大学计算机科学与工程学院",
    avatar: "/mentor-dr-chen-portrait.jpg",
    intro:
      "专注于教育人工智能与学习分析研究，带领团队研发多款落地中小学的智能教学系统，与全国 60 余所学校建立合作。",
    expertise: ["人工智能", "学习分析", "智能体开发", "STEM 教育"],
    bookingCount: 105,
    rating: 4.8,
    reviewCount: 156,
    serviceYears: 12,
    honors: [
      "教育部产学合作协同育人项目主持人",
      "中国人工智能学会智能教育专委会委员",
      "南京市优秀青年教师",
    ],
  },
  {
    id: "m4",
    name: "李明慧",
    title: "正高级教师 / 责任督学",
    organization: "南京市雨花台区人民政府教育督导室",
    avatar: "/mentor-supervisor-li-portrait.jpg",
    intro:
      "教育督导战线工作 22 年，熟悉义务教育优质均衡、课后服务、双减落实及学校治理等领域，参与制定多项区域教育评估指标体系。",
    expertise: ["教育督导", "学校治理", "课后服务", "义务教育优质均衡"],
    bookingCount: 58,
    rating: 4.8,
    reviewCount: 76,
    serviceYears: 22,
    honors: [
      "正高级教师",
      "江苏省优秀教育督导工作者",
      "南京市教育系统先进个人",
    ],
  },
  {
    id: "m5",
    name: "赵承志",
    title: "教研员 / 课程专家",
    organization: "南京市雨花台区教师发展中心",
    avatar: "/mentor-prof-zhao-portrait.jpg",
    intro:
      "区数学学科教研员，主持区域数学课程改革，构建小初衔接数学素养发展课程体系，年指导公开课与讲座 40 余场。",
    expertise: ["数学教研", "小初衔接", "课程开发", "听评课指导"],
    bookingCount: 64,
    rating: 4.9,
    reviewCount: 89,
    serviceYears: 16,
    honors: [
      "南京市学科带头人",
      "南京市优秀教研员",
      "江苏省基础教育精品课获奖者",
    ],
  },
  {
    id: "m6",
    name: "刘心妍",
    title: "国家二级心理咨询师",
    organization: "雨花台区中小学心理健康教育指导中心",
    avatar: "/mentor-dr-liu-portrait.jpg",
    intro:
      "深耕中小学心理健康教育与家庭教育指导 14 年，擅长青春期心理辅导、危机干预与教师心育能力建设，累计开展讲座 200 余场。",
    expertise: ["心理健康教育", "家庭教育指导", "危机干预", "教师心育培训"],
    bookingCount: 92,
    rating: 5.0,
    reviewCount: 134,
    serviceYears: 14,
    honors: [
      "国家二级心理咨询师",
      "江苏省心理健康教育名师工作室主持人",
      "南京市德育工作先进个人",
    ],
  },
  {
    id: "m7",
    name: "周哲文",
    title: "AI 解决方案架构师 / 产业导师",
    organization: "华为技术有限公司南京研究所（中国（南京）软件谷）",
    avatar: "/mentor-huawei-zhou-portrait.jpg",
    intro:
      "深耕大模型与教育垂直场景应用 10 年，主导多个 AI 教育解决方案落地中小学，长期支持区域教师 AI 素养培训与智能体共创工作坊。",
    expertise: ["大模型应用", "智能体工程", "AI 解决方案", "产教融合"],
    bookingCount: 48,
    rating: 4.9,
    reviewCount: 62,
    serviceYears: 10,
    honors: [
      "华为云教育行业首席专家",
      "中国（南京）软件谷产教融合导师",
      "全国人工智能应用职业技能竞赛裁判",
    ],
  },
  {
    id: "m8",
    name: "杨星辰",
    title: "AI 产品总监 / 教育创新顾问",
    organization: "中国（南京）软件谷 · 国家级人工智能产业基地",
    avatar: "/mentor-sv-yang-portrait.jpg",
    intro:
      "在软件谷头部 AI 企业负责教育产品线，擅长教育智能体、学情数据分析与人机协同课堂设计，长期为雨花台区教师培训提供产业视角支持。",
    expertise: ["AI 产品设计", "学情数据分析", "智能体交互", "人机协同教学"],
    bookingCount: 41,
    rating: 4.8,
    reviewCount: 55,
    serviceYears: 11,
    honors: [
      "南京软件谷优秀产业导师",
      "江苏省人工智能教育创新案例评审专家",
      "雨花台区产教协同育人项目顾问",
    ],
  },
]

export const studios: Studio[] = [
  {
    id: "s1",
    name: "王慧敏语文名师工作室",
    leader: "王慧敏",
    school: "南京市雨花台区实验小学",
    cover: "/studio-chinese-literature.jpg",
    subject: "小学语文",
    memberCount: 18,
    description:
      "聚焦 AI 赋能下的小学语文阅读与写作教学，开发整本书阅读、智能批改、文本鉴赏等系列教学资源，辐射全区 24 所小学。",
    recentNews: [
      { date: "2026-04-18", title: "工作室主持「整本书阅读 + AI」联合教研" },
      { date: "2026-04-12", title: "成员李老师课例入选江苏省精品课" },
      { date: "2026-04-05", title: "发布工作室年度成果集《阅读与思辨》" },
    ],
    achievements: [
      "市级以上课题立项 6 项",
      "教师优秀课例 32 节",
      "学生作文集出版 2 部",
    ],
  },
  {
    id: "s2",
    name: "赵承志数学名师工作室",
    leader: "赵承志",
    school: "南京市雨花台区雨花外国语小学",
    cover: "/studio-math-research.jpg",
    subject: "小初数学",
    memberCount: 22,
    description:
      "致力于数学素养导向的课堂教学改革，构建小初衔接课程体系，研发智能学情分析工具，区域示范引领作用突出。",
    recentNews: [
      { date: "2026-04-20", title: "举办「数学素养导向的命题改革」研讨" },
      { date: "2026-04-10", title: "工作室成员获区数学优课比赛特等奖" },
      { date: "2026-03-28", title: "举办小初衔接数学课程展示活动" },
    ],
    achievements: [
      "省级精品课 4 节",
      "市级优课 18 节",
      "智能学情分析工具落地全区 36 所学校",
    ],
  },
  {
    id: "s3",
    name: "陈思远 AI + STEM 工作室",
    leader: "陈思远",
    school: "南京市雨花台中学",
    cover: "/studio-science-stem.jpg",
    subject: "信息科技 / STEM",
    memberCount: 15,
    description:
      "面向中小学 AI + STEM 课程建设，研发跨学科项目式学习课例，承担全区智能体创客教师培育任务。",
    recentNews: [
      { date: "2026-04-22", title: "联合软件谷企业开展教师 AI 研修" },
      { date: "2026-04-14", title: "成员开发的智能体作品获省赛一等奖" },
      { date: "2026-04-01", title: "启动雨花台区智能体创客大赛筹备" },
    ],
    achievements: [
      "智能体作品 26 件",
      "项目式学习课程 12 套",
      "市级以上赛事获奖 38 项",
    ],
  },
  {
    id: "s4",
    name: "刘心妍心理健康名师工作室",
    leader: "刘心妍",
    school: "南京市共青团路中学",
    cover: "/studio-information-tech.jpg",
    subject: "心理健康 / 班主任",
    memberCount: 24,
    description:
      "深化中小学心理健康教育与班主任专业发展融合，构建区域心育工作网络，主持开发心理课程 30 余节。",
    recentNews: [
      { date: "2026-04-25", title: "举办「家校共育中的心理支持」沙龙" },
      { date: "2026-04-15", title: "工作室主持的省级课题中期推进会召开" },
      { date: "2026-03-30", title: "全区心理健康月主题活动启动" },
    ],
    achievements: [
      "心理课程 32 节",
      "家校共育案例 18 个",
      "教师心育培训覆盖全区 100% 学校",
    ],
  },
]

export const initialBookings: MyBooking[] = [
  {
    id: "b1",
    mentorId: "m3",
    trainingTopic: "智能体创客大赛备赛指导",
    date: "2026-05-12 14:00",
    contact: "李雨菡",
    phone: "138****6688",
    status: "approved",
    createdAt: "2026-04-20",
  },
  {
    id: "b2",
    mentorId: "m6",
    trainingTopic: "毕业班学生考前心理辅导教师培训",
    date: "2026-05-18 09:30",
    contact: "周明远",
    phone: "139****2233",
    status: "pending",
    createdAt: "2026-04-26",
  },
  {
    id: "b3",
    mentorId: "m1",
    trainingTopic: "项目式学习校本课程开发指导",
    date: "2026-04-30 10:00",
    contact: "陈思宇",
    phone: "136****8899",
    status: "rejected",
    rejectReason:
      "导师 4 月 30 日已有省内教研活动安排，建议改至 5 月 10 日后并提前 5 个工作日提交需求大纲。",
    createdAt: "2026-04-15",
  },
]

export const mentorReviewTags = [
  "讲解透彻",
  "案例丰富",
  "思路清晰",
  "回应及时",
  "专业权威",
  "实用性强",
  "启发性强",
  "节奏合理",
]
