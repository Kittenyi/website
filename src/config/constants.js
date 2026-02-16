// --- 配置中心 ---

export const NOTION_DATABASE_URL = "https://pushy-meal-fc7.notion.site/2d9b912838bb80a0ab60fa6c17e2090a";

export const RESEARCH_API_URL = process.env.NODE_ENV === 'production' 
  ? "https://your-portfolio-domain.vercel.app/api/research"
  : "http://localhost:3000/api/research";

export const ARTICLE_DETAIL_API = process.env.NODE_ENV === 'production'
  ? "https://your-portfolio-domain.vercel.app/api/article?id="
  : "http://localhost:3000/api/article?id=";

export const ALPHA_BGS = [
  "https://i.imgur.com/HvrX6iK.png",
  "https://i.imgur.com/IhDXv2g.png"
];

export const SOL_ADDRESS = "Am6TCz9SzEFhkwv1vzp7oV9pnQFbo5WRpT5Rz6saPbM1";
export const BSC_ADDRESS = "0xfc2ad049592977f2d9e1492cb4789bc776c0f32a";

export const BEIJING_JOURNEY = {
  city: "📌 北京",
  coords: "39.9042° N, 116.4074° E",
  desc: "我的大学起点，生长在古老皇城的红墙与纵横胡同之间。秋来时，北平的银杏把时光染成金色；冬至后，北京在雪的覆写下静默成一座白色的城。",
  images: [
    "https://i.imgur.com/9zpw2Nl.png",
    "https://i.imgur.com/DuL2nWa.png",
    "https://i.imgur.com/Ma9zzEx.png"
  ]
};

export const WEAPONRY = {
  web3: [
    { name: 'Dune', url: 'https://dune.com/home' },
    { name: 'DefiLlama', url: 'https://defillama.com/' },
    { name: 'Token Terminal', url: 'https://tokenterminal.com/' },
    { name: 'CoinMarketCap', url: 'https://coinmarketcap.com/' }
  ],
  ai: [
    { name: 'ChatGPT', url: 'https://chatgpt.com/' },
    { name: '即梦Ai', url: 'https://jimeng.jianying.com/ai-tool/home' },
    { name: 'NotebookLM', url: 'https://notebooklm.google/' }
  ]
};

export const INITIAL_ARTICLES = [
  { id: "fallback-1", title: "Meme Coin 链上筹码分布：如何识破庄家老鼠仓？", tag: "数据分析", date: "2024.12", content: "无法获取实时正文。请检查 Vercel 的 API 路由配置与 CORS 设置。" },
  { id: "fallback-2", title: "AI Agent 应用层大爆发：2025 测评报告核心结论", tag: "AI 测评", date: "2024.12", content: "同步中..." },
  { id: "fallback-3", title: "从碳交易逻辑看链上 RWA 的流动性演进", tag: "宏观策略", date: "2024.11", content: "同步中..." }
];

export const SOCIAL_LINKS = [
  { label: "Twitter", href: "https://x.com/ktyiiii?s=21" },
  { label: "Telegram", href: "https://t.me/Roy_island" },
  { label: "Red", href: "https://xhslink.com/m/GKDfzaa5HV" },
  { label: "Discord", href: "https://discord.gg/8fxBpYfe" }
];
