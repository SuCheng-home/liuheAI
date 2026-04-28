export type BookingStatus = "pending" | "rejected" | "approved"

export interface ResearchBase {
  id: string
  name: string
  description: string
  fullDescription: string
  image: string
  category: string
  activityCount: number
  servedCount: number
  capacity: number
  address: string
  phone: string
  contactPerson: string
  features: string[]
  facilities: string[]
  openHours: string
  signedYear: number
}

export interface ResearchActivity {
  id: string
  baseId: string
  baseName: string
  title: string
  date: string
  school: string
  image: string
  photos?: string[]
  content: string
  participants: number
  duration: string
  attachments?: { name: string; size: string }[]
  highlights?: string[]
}

export interface BookingRecord {
  id: string
  baseId: string
  school: string
  date: string
  time: string
  activityTitle: string
}

export interface MyBooking {
  id: string
  baseId: string
  baseName: string
  baseImage: string
  activityTitle: string
  activityContent: string
  bookingDate: string
  timeSlot: string
  submitDate: string
  contactPerson: string
  contactPhone: string
  status: BookingStatus
  rejectReason?: string
  summary?: string
  photos?: string[]
  rating?: number
  baseReview?: string
  uploaded?: boolean
}

export const baseCategories = [
  "全部",
  "红色教育",
  "科技创新",
  "文化传承",
  "自然生态",
  "劳动实践",
  "人工智能",
]

export const researchBases: ResearchBase[] = [
  {
    id: "base-001",
    name: "雨花台烈士陵园研学基地",
    description: "全国重点爱国主义教育示范基地，传承雨花英烈精神",
    fullDescription:
      "雨花台烈士陵园是为纪念 1927 年至新中国成立前夕在此牺牲的无数革命先烈而修建。陵园占地面积 113.15 万平方米，是新中国规模最大的纪念性陵园。依托「信仰的力量—雨花英烈生平事迹陈列」「雨花颂沉浸式演出」等资源，基地为大中小学生提供红色研学课程、主题团队日、雨花剧场沉浸学习等多元活动。",
    image: "/yuhuatai-martyrs-memorial-park.jpg",
    category: "红色教育",
    activityCount: 86,
    servedCount: 17260,
    capacity: 800,
    address: "南京市雨花台区雨花路 215 号",
    phone: "025-5243-1117",
    contactPerson: "王老师",
    features: ["爱国主义教育", "沉浸式演出", "雨花英烈故事"],
    facilities: ["纪念碑广场", "烈士纪念馆", "雨花剧场", "研学教室 3 间"],
    openHours: "周二 - 周日 08:30 - 17:00",
    signedYear: 2019,
  },
  {
    id: "base-002",
    name: "南京科技馆研学基地",
    description: "区属首批科创教育基地，沉浸式科学探究学习阵地",
    fullDescription:
      "南京科技馆位于雨花台区紫荆花路 9 号，是江苏省规模最大的综合性科技馆，被命名为「全国科普教育基地」。馆内设有科学乐园、基础科学、智慧城市、健康生活、交通天地等主题展厅，并开设了人工智能、物联网、无人机等特色研学课程，是中小学生开展 STEAM 研学活动的重要阵地。",
    image: "/nanjing-science-technology-museum.jpg",
    category: "科技创新",
    activityCount: 124,
    servedCount: 22680,
    capacity: 1200,
    address: "南京市雨花台区紫荆花路 9 号",
    phone: "025-5226-9960",
    contactPerson: "李老师",
    features: ["STEAM课程", "科学实验", "人工智能体验", "无人机飞行"],
    facilities: ["主题展厅 9 个", "球幕影院", "实验室 5 间", "创客工坊"],
    openHours: "周二 - 周日 09:00 - 17:00",
    signedYear: 2017,
  },
  {
    id: "base-003",
    name: "中国(南京)软件谷 AI 研学基地",
    description: "依托产业园区，打造 AI 应用沉浸式学习空间",
    fullDescription:
      "中国(南京)软件谷坐落于雨花台区，是国家级软件产业基地，聚集华为、中兴、润和等龙头企业。软件谷 AI 研学基地联合园区企业共建，设有 AI 体验中心、编程实验室、智能制造车间与数字孪生展厅，面向中小学生开设「AI 第一课」「Python 编程启蒙」「智能机器人」等研学课程。",
    image: "/nanjing-software-valley-ai-base.jpg",
    category: "人工智能",
    activityCount: 58,
    servedCount: 4820,
    capacity: 300,
    address: "南京市雨花台区软件大道 101 号",
    phone: "025-5271-8888",
    contactPerson: "陈老师",
    features: ["AI 第一课", "Python 编程", "智能机器人", "数字孪生"],
    facilities: ["AI 体验中心", "编程实验室 4 间", "智能制造车间", "路演厅"],
    openHours: "周一 - 周六 09:00 - 17:30",
    signedYear: 2022,
  },
  {
    id: "base-004",
    name: "雨花茶文化研学基地",
    description: "一片叶子讲述雨花非遗与劳动美育的故事",
    fullDescription:
      "雨花茶是南京特产名茶，制作技艺被列入国家级非物质文化遗产代表性项目名录。雨花茶文化研学基地位于雨花台区中华门外茶厂，占地约 120 亩，集茶园观光、采茶体验、手工炒茶、茶艺课程于一体，是省级中小学生研学实践教育基地。",
    image: "/yuhua-tea-culture-base.jpg",
    category: "文化传承",
    activityCount: 42,
    servedCount: 2680,
    capacity: 240,
    address: "南京市雨花台区中华门外 88 号",
    phone: "025-5281-5678",
    contactPerson: "顾老师",
    features: ["采茶体验", "非遗技艺", "茶艺课程", "劳动美育"],
    facilities: ["雨花茶园", "手工炒茶坊", "茶艺室 2 间", "非遗展陈馆"],
    openHours: "每日 08:30 - 17:00（采茶季优先开放）",
    signedYear: 2020,
  },
  {
    id: "base-005",
    name: "大报恩寺遗址博物馆研学基地",
    description: "六朝古都文化遗址，沉浸式感受金陵千年文脉",
    fullDescription:
      "大报恩寺遗址博物馆位于雨花台区中华门外古报恩寺遗址之上，以七级琉璃宝塔为主体复建，是集遗址保护、文物展示、文化体验为一体的大型博物馆。基地开设「丝路琉璃」「古法造纸」「金陵印象」等系列研学课程，将历史考古与动手实践深度融合。",
    image: "/dabaoen-temple-heritage-park.jpg",
    category: "文化传承",
    activityCount: 67,
    servedCount: 8540,
    capacity: 500,
    address: "南京市雨花台区中华门外雨花路 1 号",
    phone: "025-5212-0909",
    contactPerson: "张老师",
    features: ["琉璃烧制", "古法造纸", "文物鉴赏", "沉浸演出"],
    facilities: ["千年地宫", "琉璃塔工坊", "多媒体影院", "研学营地"],
    openHours: "周二 - 周日 09:00 - 17:30",
    signedYear: 2018,
  },
  {
    id: "base-006",
    name: "宁南生态农业研学基地",
    description: "田园课堂，让学生在泥土芬芳中读懂自然",
    fullDescription:
      "宁南生态农业研学基地位于雨花台区板桥街道，占地 300 余亩，涵盖现代温室蔬菜大棚、稻田、果园、花海及农耕文化展陈馆。基地将农业科技、劳动教育、自然科普融合，开发了「小小农夫」「二十四节气」「现代农业科技」等研学课程，是区级劳动实践与生态教育双示范基地。",
    image: "/ningnan-eco-agriculture-base.jpg",
    category: "自然生态",
    activityCount: 95,
    servedCount: 14380,
    capacity: 600,
    address: "南京市雨花台区板桥街道农科路 66 号",
    phone: "025-5266-3210",
    contactPerson: "周老师",
    features: ["农耕劳动", "节气文化", "生态观察", "智慧农业"],
    facilities: ["现代温室", "稻田课堂", "二十四节气园", "农耕博物馆"],
    openHours: "每日 08:30 - 17:00",
    signedYear: 2021,
  },
  {
    id: "base-007",
    name: "金陵金箔艺术研学基地",
    description: "千年金箔锻造工艺的活态传承空间",
    fullDescription:
      "金陵金箔锻制技艺是首批国家级非物质文化遗产代表性项目。基地依托南京金线金箔总厂，展示从选金、化金、拍叶、装开子、做捻子、打金开子到切金箔的全流程锻造工艺。为中小学生提供非遗观摩、金箔工艺体验、匠人对话、文创设计等研学活动。",
    image: "/jinling-gold-foil-museum.jpg",
    category: "文化传承",
    activityCount: 36,
    servedCount: 1860,
    capacity: 200,
    address: "南京市雨花台区龙西路 168 号",
    phone: "025-5254-7866",
    contactPerson: "马老师",
    features: ["非遗观摩", "金箔体验", "匠人对话", "文创设计"],
    facilities: ["金箔工艺馆", "体验工坊", "匠人讲堂"],
    openHours: "周一 - 周五 09:00 - 17:00",
    signedYear: 2020,
  },
  {
    id: "base-008",
    name: "雨花台区中小学劳动实践教育基地",
    description: "区属综合劳动教育基地，课程化、常态化开展劳动实践",
    fullDescription:
      "雨花台区中小学劳动实践教育基地由雨花台区教育局直属管理，占地 68 亩，设有木工、陶艺、烹饪、园艺、电子制作、3D 打印等 12 个专业工坊，可同时容纳 15 个班级开展劳动实践课程。基地根据国家劳动课程标准开发了全学段贯通的劳动课程体系。",
    image: "/yuhuatai-labor-practice-base.jpg",
    category: "劳动实践",
    activityCount: 158,
    servedCount: 28940,
    capacity: 900,
    address: "南京市雨花台区安德门大街 32 号",
    phone: "025-5287-4455",
    contactPerson: "钱老师",
    features: ["木工陶艺", "烹饪烘焙", "3D 打印", "电子制作"],
    facilities: ["专业工坊 12 间", "多功能厅", "学生宿舍", "食堂"],
    openHours: "周一 - 周五 08:30 - 16:30",
    signedYear: 2016,
  },
]

export const recentActivities: ResearchActivity[] = [
  {
    id: "act-001",
    baseId: "base-001",
    baseName: "雨花台烈士陵园研学基地",
    title: "「信仰之光」清明缅怀先烈主题研学",
    date: "2026-04-04",
    school: "雨花实验小学",
    image: "/research-activity-students-learning.jpg",
    photos: [
      "/research-activity-students-learning.jpg",
      "/yuhuatai-martyrs-memorial-park.jpg",
      "/research-activity-tea-ceremony.jpg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    content:
      "组织六年级全体学生走进雨花台烈士陵园，通过敬献花篮、重温入队誓词、聆听雨花英烈故事、观看《雨花魂》沉浸演出等环节，让学生在庄重肃穆的氛围中感悟信仰力量，赓续红色血脉。",
    participants: 320,
    duration: "一天",
    attachments: [
      { name: "研学手册.pdf", size: "3.2 MB" },
      { name: "活动方案.docx", size: "860 KB" },
    ],
    highlights: ["覆盖六年级 8 个班", "沉浸剧场观演", "雨花英烈故事会"],
  },
  {
    id: "act-002",
    baseId: "base-003",
    baseName: "中国(南京)软件谷 AI 研学基地",
    title: "「AI 第一课」小学生人工智能启蒙研学",
    date: "2026-04-12",
    school: "雨花外国语小学",
    image: "/research-activity-robotics-workshop.jpg",
    photos: [
      "/research-activity-robotics-workshop.jpg",
      "/nanjing-software-valley-ai-base.jpg",
      "/nanjing-science-technology-museum.jpg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    content:
      "带领四年级学生走进软件谷 AI 研学基地，通过语音识别、图像识别、机器翻译等互动体验，理解 AI 基本原理；动手搭建智能小车，完成自动避障、巡线、抓取等编程任务，感受技术与创意的结合。",
    participants: 180,
    duration: "半天",
    attachments: [{ name: "AI 研学手册.pdf", size: "5.6 MB" }],
    highlights: ["华为云专家授课", "搭建智能避障小车", "AI 体验互动闯关"],
  },
  {
    id: "act-003",
    baseId: "base-004",
    baseName: "雨花茶文化研学基地",
    title: "「一叶知春」雨花茶非遗采摘研学",
    date: "2026-03-28",
    school: "雨花台中学",
    image: "/research-activity-tea-ceremony.jpg",
    photos: [
      "/research-activity-tea-ceremony.jpg",
      "/yuhua-tea-culture-base.jpg",
      "/research-activity-students-learning.jpg",
      "/placeholder.svg",
    ],
    content:
      "初二年级走进雨花茶园，在非遗传承人指导下完成采摘、摊青、杀青、揉捻、辉锅全流程体验，并参加茶艺礼仪课程。学生亲手炒制的雨花茶将带回家中分享给父母，将劳动成果延伸到家庭教育。",
    participants: 96,
    duration: "一天",
    attachments: [
      { name: "雨花茶研学课程包.zip", size: "18.4 MB" },
      { name: "非遗传承人访谈记录.pdf", size: "2.1 MB" },
    ],
    highlights: ["非遗传承人授课", "手工炒茶体验", "茶艺礼仪课程"],
  },
  {
    id: "act-004",
    baseId: "base-006",
    baseName: "宁南生态农业研学基地",
    title: "「春耕季」农耕文化与现代农业体验",
    date: "2026-03-22",
    school: "雨花台区实验小学善水湾分校",
    image: "/research-activity-agriculture-farming.jpg",
    photos: [
      "/research-activity-agriculture-farming.jpg",
      "/ningnan-eco-agriculture-base.jpg",
      "/research-activity-students-learning.jpg",
      "/placeholder.svg",
    ],
    content:
      "三年级学生到宁南生态农业基地开展春耕主题研学。上午学习二十四节气中「惊蛰」「春分」的农事含义并体验水稻插秧；下午参观智慧温室，了解无土栽培、水肥一体化等现代农业技术，完成「我设计的未来农场」创意绘图。",
    participants: 240,
    duration: "一天",
    attachments: [{ name: "春耕研学手册.pdf", size: "4.3 MB" }],
    highlights: ["水稻插秧体验", "智慧温室参观", "创意绘图展示"],
  },
  {
    id: "act-005",
    baseId: "base-002",
    baseName: "南京科技馆研学基地",
    title: "「小小工程师」航空航天主题日",
    date: "2026-04-18",
    school: "金陵中学岱山分校",
    image: "/nanjing-science-technology-museum.jpg",
    photos: [
      "/nanjing-science-technology-museum.jpg",
      "/research-activity-robotics-workshop.jpg",
      "/nanjing-software-valley-ai-base.jpg",
      "/placeholder.svg",
    ],
    content:
      "五年级学生以小组合作形式开展航空航天主题研学，参与球幕影院观影、空间站模拟舱参观、水火箭设计与发射竞赛、长征五号火箭原理讲座等活动，在动手实践中点燃航天梦想。",
    participants: 210,
    duration: "一天",
    attachments: [{ name: "水火箭设计任务单.pdf", size: "1.6 MB" }],
    highlights: ["球幕影院观影", "模拟舱体验", "水火箭发射大赛"],
  },
  {
    id: "act-006",
    baseId: "base-005",
    baseName: "大报恩寺遗址博物馆研学基地",
    title: "「琉璃寻踪」文物考古研学课程",
    date: "2026-04-08",
    school: "共青团路中学",
    image: "/dabaoen-temple-heritage-park.jpg",
    photos: [
      "/dabaoen-temple-heritage-park.jpg",
      "/jinling-gold-foil-museum.jpg",
      "/research-activity-students-learning.jpg",
      "/placeholder.svg",
    ],
    content:
      "初一学生开展文物考古研学活动，通过探秘千年地宫、观摩琉璃塔复原构件、学习拓片制作、体验文物修复小工艺，深入理解六朝古都的文化底蕴与考古工作的严谨与乐趣。",
    participants: 160,
    duration: "一天",
    attachments: [{ name: "琉璃寻踪研学手册.pdf", size: "6.1 MB" }],
    highlights: ["地宫探秘", "琉璃构件观摩", "拓片制作体验"],
  },
]

// 基地近期预约记录（非本人）
export const baseBookingRecords: BookingRecord[] = [
  {
    id: "rec-001",
    baseId: "base-001",
    school: "雨花台中学春江分校",
    date: "2026-05-06",
    time: "上午 09:00 - 11:30",
    activityTitle: "雨花英烈故事会主题团队日",
  },
  {
    id: "rec-002",
    baseId: "base-001",
    school: "金陵小学",
    date: "2026-05-08",
    time: "全天 09:00 - 16:00",
    activityTitle: "「信仰的力量」红色研学",
  },
  {
    id: "rec-003",
    baseId: "base-001",
    school: "雨花实验幼儿园",
    date: "2026-05-13",
    time: "上午 09:30 - 11:00",
    activityTitle: "「小脚丫走雨花」主题活动",
  },
  {
    id: "rec-004",
    baseId: "base-002",
    school: "雨花外国语小学",
    date: "2026-05-07",
    time: "全天 09:00 - 16:30",
    activityTitle: "「探秘科学」五年级科创研学",
  },
  {
    id: "rec-005",
    baseId: "base-002",
    school: "雨花台区实验小学",
    date: "2026-05-14",
    time: "下午 13:30 - 16:30",
    activityTitle: "智慧城市主题研学",
  },
  {
    id: "rec-006",
    baseId: "base-003",
    school: "金陵中学岱山分校",
    date: "2026-05-09",
    time: "上午 09:00 - 12:00",
    activityTitle: "AI 第一课",
  },
  {
    id: "rec-007",
    baseId: "base-003",
    school: "雨花台中学",
    date: "2026-05-16",
    time: "全天 09:00 - 16:00",
    activityTitle: "智能机器人挑战赛",
  },
  {
    id: "rec-008",
    baseId: "base-004",
    school: "雨花实验小学",
    date: "2026-05-10",
    time: "全天 08:30 - 15:30",
    activityTitle: "雨花茶非遗采摘研学",
  },
  {
    id: "rec-009",
    baseId: "base-005",
    school: "共青团路中学",
    date: "2026-05-11",
    time: "全天 09:00 - 16:30",
    activityTitle: "琉璃寻踪考古研学",
  },
  {
    id: "rec-010",
    baseId: "base-006",
    school: "雨花台区实验小学善水湾分校",
    date: "2026-05-12",
    time: "上午 08:30 - 12:00",
    activityTitle: "春耕劳动体验",
  },
  {
    id: "rec-011",
    baseId: "base-008",
    school: "雨花台中学春江分校",
    date: "2026-05-15",
    time: "全天 08:30 - 16:30",
    activityTitle: "3D 打印创客工坊",
  },
]

// 当前用户(学校)的预约记录
export const myBookings: MyBooking[] = [
  {
    id: "my-001",
    baseId: "base-003",
    baseName: "中国(南京)软件谷 AI 研学基地",
    baseImage: "/nanjing-software-valley-ai-base.jpg",
    activityTitle: "「AI 第一课」三年级人工智能启蒙研学",
    activityContent:
      "组织三年级全体学生走进软件谷 AI 研学基地，通过语音识别、图像识别等 AI 体验项目认识人工智能；动手搭建智能避障小车，完成编程任务。目标：让学生理解 AI 的基本概念，激发科技兴趣。",
    bookingDate: "2026-05-21",
    timeSlot: "全天 09:00 - 16:00",
    submitDate: "2026-04-15",
    contactPerson: "陈老师",
    contactPhone: "138 0000 1234",
    status: "approved",
    uploaded: false,
  },
  {
    id: "my-002",
    baseId: "base-001",
    baseName: "雨花台烈士陵园研学基地",
    baseImage: "/yuhuatai-martyrs-memorial-park.jpg",
    activityTitle: "清明缅怀先烈主题团队日",
    activityContent:
      "结合清明节开展以「信仰的力量」为主题的红色研学活动，组织五六年级学生敬献花篮、聆听雨花英烈故事、观看沉浸式演出，接受爱国主义教育。",
    bookingDate: "2026-04-03",
    timeSlot: "上午 09:00 - 11:30",
    submitDate: "2026-03-18",
    contactPerson: "王老师",
    contactPhone: "138 0000 5678",
    status: "approved",
    uploaded: true,
    summary:
      "本次研学活动共有 276 名师生参加。通过敬献花篮、聆听讲解、观看演出三大环节，学生们深切感受到了雨花英烈的崇高精神。活动中学生们踊跃发言，撰写研学感悟 270 余篇，班级评选优秀作品 32 篇。活动组织严谨，安全有序，达成预期教育目标。",
    photos: [
      "/research-activity-students-learning.jpg",
      "/yuhuatai-martyrs-memorial-park.jpg",
    ],
    rating: 5,
    baseReview:
      "基地讲解员专业且富有感染力，沉浸演出效果震撼，研学手册设计贴合学生认知水平。整体体验非常好，希望能开发更多面向低段学生的微课程。",
  },
  {
    id: "my-003",
    baseId: "base-004",
    baseName: "雨花茶文化研学基地",
    baseImage: "/yuhua-tea-culture-base.jpg",
    activityTitle: "「一叶知春」雨花茶非遗采摘研学",
    activityContent:
      "组织四年级学生赴雨花茶文化基地开展非遗采摘研学，内容包括茶园采摘、手工炒茶、茶艺礼仪课程等，培养学生劳动精神与文化自信。",
    bookingDate: "2026-05-09",
    timeSlot: "全天 08:30 - 15:30",
    submitDate: "2026-04-20",
    contactPerson: "顾老师",
    contactPhone: "138 0000 2233",
    status: "pending",
  },
  {
    id: "my-004",
    baseId: "base-002",
    baseName: "南京科技馆研学基地",
    baseImage: "/nanjing-science-technology-museum.jpg",
    activityTitle: "「小小工程师」科创探秘主题研学",
    activityContent:
      "以跨学科 PBL 项目式学习为主线，组织六年级学生围绕「未来城市」主题开展科创研学，完成场地调研、方案设计、原型搭建、成果路演等任务。",
    bookingDate: "2026-05-23",
    timeSlot: "全天 09:00 - 16:30",
    submitDate: "2026-04-18",
    contactPerson: "张老师",
    contactPhone: "138 0000 7788",
    status: "rejected",
    rejectReason:
      "该时间段南京科技馆已承接两个区级活动且人员已满。建议申请学校选择 5 月 28 日或 5 月 30 日，可容纳 300 人以内。请修改时间后再次提交。",
  },
]
