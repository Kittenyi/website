// /api/research.js - Vercel Serverless Function
import { Client } from '@notionhq/client';

// 初始化 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_TOKEN, // 需要在 Vercel 环境变量中配置
});

// 你的 Notion 数据库 ID
const DATABASE_ID = process.env.NOTION_DATABASE_ID; // 从你的工作区中获取具体的数据库ID

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 查询 Notion 数据库
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Created', // 按创建时间排序，你需要根据实际字段名调整
          direction: 'descending',
        },
      ],
      page_size: 10, // 限制返回数量
    });

    // 格式化数据
    const articles = response.results.map((page) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        tag: properties.Tag?.select?.name || 'RESEARCH',
        date: properties.Date?.date?.start || page.created_time,
        summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
        lastEdited: page.last_edited_time,
        url: page.url,
        // 可以添加更多字段
      };
    });

    res.status(200).json({
      success: true,
      data: articles,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Notion API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles from Notion',
      message: error.message,
    });
  }
}