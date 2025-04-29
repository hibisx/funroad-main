import { getPayload } from "payload";
import config from "@/payload.config";

// 模拟产品数据
const mockProducts = [
  {
    name: "高级商务写作课程",
    description:
      "学习如何撰写专业商务文档，包括报告、提案和电子邮件。适合职场人士提升写作技能。",
    price: 129.99,
    category: "business-money",
    tags: ["写作", "商务", "职场技能"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "React高级开发教程",
    description:
      "深入学习React框架，包括Hooks、Context API、性能优化等高级主题。适合有一定React基础的开发者。",
    price: 89.99,
    category: "software-development",
    tags: ["编程", "前端", "React", "JavaScript"],
    refundPolicy: "14 days" as const,
  },
  {
    name: "个人理财规划指南",
    description:
      "学习如何制定个人理财计划，包括预算、投资、储蓄和债务管理。适合想要改善财务状况的任何人。",
    price: 49.99,
    category: "business-money",
    tags: ["理财", "投资", "个人财务"],
    refundPolicy: "3 days" as const,
  },
  {
    name: "瑜伽初学者课程",
    description:
      "适合初学者的瑜伽课程，包括基础姿势、呼吸技巧和简单的冥想练习。帮助改善身体灵活性和心理健康。",
    price: 39.99,
    category: "fitness-health",
    tags: ["瑜伽", "健康", "冥想", "初学者"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "数字营销策略指南",
    description:
      "学习现代数字营销策略，包括社交媒体营销、内容营销、SEO和电子邮件营销。适合想要提升营销技能的创业者和小企业主。",
    price: 79.99,
    category: "business-money",
    tags: ["营销", "数字营销", "社交媒体", "创业"],
    refundPolicy: "14 days" as const,
  },
  {
    name: "UI/UX设计基础课程",
    description:
      "学习用户界面和用户体验设计的基本原则，包括色彩理论、排版、布局和用户研究。适合想要进入设计领域的初学者。",
    price: 69.99,
    category: "design",
    tags: ["设计", "UI/UX", "用户体验", "视觉设计"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "英语口语提升课程",
    description: "通过实用对话和发音练习提高英语口语能力。适合中级英语学习者。",
    price: 59.99,
    category: "education",
    tags: ["语言学习", "英语", "口语", "教育"],
    refundPolicy: "3 days" as const,
  },
  {
    name: "个人成长与目标设定",
    description:
      "学习如何设定和实现个人目标，包括时间管理、习惯养成和克服障碍的策略。",
    price: 44.99,
    category: "self-improvement",
    tags: ["个人成长", "目标设定", "时间管理", "习惯养成"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "摄影构图技巧",
    description:
      "学习摄影构图的基本原则和高级技巧，提升照片的视觉吸引力。适合想要提高摄影技能的爱好者。",
    price: 54.99,
    category: "photography",
    tags: ["摄影", "构图", "技巧", "艺术"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "创业融资指南",
    description:
      "了解创业融资的各种方式，包括天使投资、风险投资、众筹和银行贷款。适合想要融资的创业者。",
    price: 99.99,
    category: "business-money",
    tags: ["创业", "融资", "投资", "商业"],
    refundPolicy: "14 days" as const,
  },
  {
    name: "Python数据分析课程",
    description:
      "学习使用Python进行数据分析，包括Pandas、NumPy和Matplotlib等库的使用。适合想要进入数据科学领域的程序员。",
    price: 119.99,
    category: "software-development",
    tags: ["编程", "Python", "数据分析", "数据科学"],
    refundPolicy: "30 days" as const,
  },
  {
    name: "正念冥想练习",
    description:
      "通过引导式冥想和正念练习，减轻压力、提高专注力和改善睡眠质量。适合想要改善心理健康的任何人。",
    price: 34.99,
    category: "self-improvement",
    tags: ["冥想", "正念", "心理健康", "减压"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "营养与健康饮食指南",
    description:
      "学习健康饮食的基本原则，包括营养素、膳食计划和饮食习惯。适合想要改善饮食健康的人。",
    price: 49.99,
    category: "fitness-health",
    tags: ["营养", "健康饮食", "健康", "生活方式"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "小说写作技巧",
    description:
      "学习小说写作的基本技巧，包括情节构建、角色发展和叙事视角。适合想要开始写小说的初学者。",
    price: 59.99,
    category: "writing-publishing",
    tags: ["写作", "小说", "创意写作", "文学"],
    refundPolicy: "14 days" as const,
  },
  {
    name: "移动应用开发入门",
    description:
      "学习使用React Native开发跨平台移动应用的基础知识。适合想要进入移动开发领域的Web开发者。",
    price: 89.99,
    category: "software-development",
    tags: ["编程", "移动开发", "React Native", "JavaScript"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "音乐制作基础",
    description:
      "学习数字音乐制作的基础知识，包括DAW使用、音频编辑和基本混音技巧。适合想要开始音乐制作的初学者。",
    price: 69.99,
    category: "music",
    tags: ["音乐", "音乐制作", "音频", "创意"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "水彩绘画技法",
    description:
      "学习水彩绘画的基本技法，包括色彩混合、层次和纹理创作。适合想要学习水彩画的初学者。",
    price: 54.99,
    category: "drawing-painting",
    tags: ["绘画", "水彩", "艺术", "创意"],
    refundPolicy: "7 days" as const,
  },
  {
    name: "个人品牌建设指南",
    description:
      "学习如何建立和推广个人品牌，包括社交媒体策略、内容创作和网络建设。适合想要提升个人影响力的专业人士。",
    price: 79.99,
    category: "self-improvement",
    tags: ["个人品牌", "社交媒体", "职业发展", "网络建设"],
    refundPolicy: "14 days" as const,
  },
];

// 模拟标签数据
const mockTags = [
  "写作",
  "商务",
  "职场技能",
  "编程",
  "前端",
  "React",
  "JavaScript",
  "理财",
  "投资",
  "个人财务",
  "瑜伽",
  "健康",
  "冥想",
  "初学者",
  "营销",
  "数字营销",
  "社交媒体",
  "创业",
  "设计",
  "UI/UX",
  "用户体验",
  "视觉设计",
  "语言学习",
  "英语",
  "口语",
  "教育",
  "个人成长",
  "目标设定",
  "时间管理",
  "习惯养成",
  "摄影",
  "构图",
  "技巧",
  "艺术",
  "Python",
  "数据分析",
  "数据科学",
  "正念",
  "心理健康",
  "减压",
  "营养",
  "健康饮食",
  "生活方式",
  "小说",
  "创意写作",
  "文学",
  "移动开发",
  "React Native",
  "音乐",
  "音乐制作",
  "音频",
  "创意",
  "绘画",
  "水彩",
  "个人品牌",
  "职业发展",
  "网络建设",
];

const seedProducts = async () => {
  const payload = await getPayload({ config });

  // 创建标签
  const tagMap = new Map();
  for (const tagName of mockTags) {
    const tag = await payload.create({
      collection: "tags",
      data: {
        name: tagName,
      },
    });
    tagMap.set(tagName, tag.id);
  }

  // 获取所有类别
  const categoriesResponse = await payload.find({
    collection: "categories",
  });
  const categories = categoriesResponse.docs;
  const categoryMap = new Map();

  for (const category of categories) {
    categoryMap.set(category.slug, category.id);
  }

  // 创建产品
  for (const product of mockProducts) {
    // 获取标签ID
    const tagIds = product.tags.map((tag) => tagMap.get(tag)).filter(Boolean);

    // 获取类别ID
    const categoryId = categoryMap.get(product.category);

    await payload.create({
      collection: "products",
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: categoryId,
        tags: tagIds,
        refundPolicy: product.refundPolicy,
      },
    });
  }

  console.log("产品数据已成功创建！");
};

await seedProducts();
process.exit(0);
