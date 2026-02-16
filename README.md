# Roy Huang

个人网站 / Personal Site

前国企搬砖，做过两年 Carbon Broker，2024 年 3 月跳进链上冲浪至今。Meme Coins 100x Hunter，日常做链上数据投研、Alpha 信息捕获、AI 产品测评。

> "Talk is cheap, show me the wallet"

## 关于这个网站

一个 Bento Grid 风格的个人主页，暗色系 + 紫色调，接了几个 API 让页面活起来：

- 首页实时显示 BTC/USDT 价格（Binance API，5s 刷新）
- 投研文章从 Notion 数据库动态拉取，不用改代码就能更新内容
- 一些常用的 Web3 和 AI 工具链接
- 照片墙 & 社交入口

## 技术栈

React 19 + Vite + Tailwind CSS + Framer Motion

部署在 Vercel 上，Notion API 通过 Vercel Serverless Functions 中转。

## 本地运行

```bash
git clone https://github.com/Kittenyi/website.git
cd website
npm install --legacy-peer-deps
npm run dev
```

如果需要 Notion 文章功能，复制 `.env.example` 为 `.env`，填入你的 Notion Token 和 Database ID。

## 构建

```bash
npm run build
```

## 联系方式

- Twitter: [@ktyiiii](https://x.com/ktyiiii?s=21)
- Telegram: [@Roy_island](https://t.me/Roy_island)
- Discord: [discord.gg/8fxBpYfe](https://discord.gg/8fxBpYfe)
