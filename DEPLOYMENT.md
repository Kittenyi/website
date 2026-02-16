# 🚀 Vercel 部署指南

## 📋 部署前准备

### 1. Notion 集成设置

1. **创建 Notion 集成**：
   - 访问 [Notion Developers](https://www.notion.so/my-integrations)
   - 点击 "New integration"
   - 填写集成名称（如：Portfolio API）
   - 选择工作区：`3d56e31c-b0d9-412e-b353-b7b5c572ba42`
   - 复制生成的 `Internal Integration Token`

2. **配置数据库权限**：
   - 打开你的 Notion 投研分析数据库
   - 点击右上角 "Share" → "Invite"
   - 搜索并添加你刚创建的集成
   - 给予 "Read" 权限

3. **获取数据库 ID**：
   - 从数据库 URL 中提取：`https://notion.so/your-workspace/DATABASE_ID?v=...`
   - 或使用 Notion API 查询获取

### 2. 数据库结构要求

确保你的 Notion 数据库包含以下字段：

| 字段名 | 类型 | 说明 |
|--------|------|------|
| Title | Title | 文章标题 |
| Tag | Select | 文章分类（数据分析、AI测评、宏观策略等） |
| Date | Date | 发布日期 |
| Summary | Text | 文章摘要 |
| Status | Select | 发布状态（Published、Draft） |

## 🔧 Vercel 部署步骤

### 1. 推送代码到 GitHub
```bash
git init
git add .
git commit -m "Initial commit: Portfolio with Notion integration"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2. 连接 Vercel
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 选择 "my-portfolio" 文件夹作为根目录

### 3. 配置环境变量
在 Vercel 项目设置中添加：

```env
NOTION_TOKEN=secret_your_notion_integration_token
NOTION_DATABASE_ID=your_database_id_here
NOTION_WORKSPACE_ID=3d56e31c-b0d9-412e-b353-b7b5c572ba42
```

### 4. 更新前端 API 地址
部署完成后，更新 `src/App.jsx` 中的 API 地址：

```javascript
const RESEARCH_API_URL = "https://your-actual-domain.vercel.app/api/research";
const ARTICLE_DETAIL_API = "https://your-actual-domain.vercel.app/api/article?id=";
```

## 🔄 自动同步机制

### 当前实现：
- ✅ 前端每5秒自动检查更新
- ✅ 页面加载时立即同步
- ✅ 错误时使用本地缓存

### 可选增强（Webhook）：
如需实时同步，可以设置 Notion Webhook：

1. **创建 Webhook 端点**：
```javascript
// api/webhook.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 处理 Notion 数据库更新事件
    // 可以触发缓存刷新或推送通知
    console.log('Notion database updated:', req.body);
  }
  res.status(200).json({ received: true });
}
```

2. **在 Notion 中配置 Webhook**（需要 Notion API 支持）

## 🧪 测试部署

### 1. 本地测试
```bash
npm install
npm run dev
```

### 2. API 端点测试
- `GET /api/research` - 获取文章列表
- `GET /api/article?id=PAGE_ID` - 获取文章详情

### 3. 生产环境测试
```bash
npm run build
npm run preview
```

## 🔍 故障排除

### 常见问题：

1. **Notion API 403 错误**：
   - 检查集成是否有数据库访问权限
   - 确认 NOTION_TOKEN 正确

2. **CORS 错误**：
   - 检查 vercel.json 配置
   - 确认 API 路由返回正确的 CORS 头

3. **数据格式错误**：
   - 检查 Notion 数据库字段名是否匹配
   - 确认字段类型正确

4. **部署失败**：
   - 检查 package.json 依赖
   - 确认 Node.js 版本兼容性

## 📊 监控和维护

### 推荐工具：
- **Vercel Analytics** - 性能监控
- **Notion API 日志** - API 调用监控
- **Sentry** - 错误追踪（可选）

### 定期维护：
- 检查 API 调用限制
- 更新依赖包版本
- 备份重要数据