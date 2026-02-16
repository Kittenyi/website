// /api/article.js - 获取单篇文章详情
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'Article ID is required',
    });
  }

  try {
    // 获取页面信息
    const page = await notion.pages.retrieve({ page_id: id });
    
    // 获取页面内容块
    const blocks = await notion.blocks.children.list({
      block_id: id,
      page_size: 100,
    });

    // 将 Notion 块转换为 HTML 内容
    const content = await convertBlocksToHTML(blocks.results);

    const properties = page.properties;
    const article = {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
      tag: properties.Tag?.select?.name || 'RESEARCH',
      date: properties.Date?.date?.start || page.created_time,
      content: content,
      lastEdited: page.last_edited_time,
    };

    res.status(200).json({
      success: true,
      data: article,
    });

  } catch (error) {
    console.error('Notion Article Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch article from Notion',
      message: error.message,
    });
  }
}

// 将 Notion 块转换为 HTML 的辅助函数
async function convertBlocksToHTML(blocks) {
  let html = '';

  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        const text = block.paragraph.rich_text
          .map(t => t.plain_text)
          .join('');
        html += `<p>${text}</p>`;
        break;
      
      case 'heading_1':
        const h1Text = block.heading_1.rich_text
          .map(t => t.plain_text)
          .join('');
        html += `<h1>${h1Text}</h1>`;
        break;
      
      case 'heading_2':
        const h2Text = block.heading_2.rich_text
          .map(t => t.plain_text)
          .join('');
        html += `<h2>${h2Text}</h2>`;
        break;
      
      case 'heading_3':
        const h3Text = block.heading_3.rich_text
          .map(t => t.plain_text)
          .join('');
        html += `<h3>${h3Text}</h3>`;
        break;
      
      case 'bulleted_list_item':
        const liText = block.bulleted_list_item.rich_text
          .map(t => t.plain_text)
          .join('');
        html += `<li>${liText}</li>`;
        break;
      
      case 'code':
        const codeText = block.code.rich_text
          .map(t => t.plain_text)
          .join('');
        html += `<pre><code>${codeText}</code></pre>`;
        break;
      
      default:
        // 处理其他类型的块
        if (block[block.type]?.rich_text) {
          const defaultText = block[block.type].rich_text
            .map(t => t.plain_text)
            .join('');
          html += `<p>${defaultText}</p>`;
        }
        break;
    }
  }

  return html;
}