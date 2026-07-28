// ========== 站点配置 ==========
// 每个站点：消息气泡选择器 + 正文容器选择器（相对气泡内）
const SITE_CONFIG = [
  {
    host: 'chatgpt.com',
    msgSel: 'article[data-message-author-role]',
    contentSel: '.markdown, .prose'
  },
  {
    host: 'deepseek.com',
    msgSel: '[data-testid="message"], .ds-message, div[class*="chat-message"]',
    contentSel: '.ds-markdown, .markdown-body, .message-content'
  },
  {
    host: 'doubao.com',
    msgSel: '.chat-message-item, [class*="message-item"]',
    contentSel: '.markdown-body, .content'
  },
  {
    host: 'gemini.google.com',
    msgSel: '.message-content, [class*="message-content"]',
    contentSel: '.markdown, .text'
  },
  {
    host: 'kimi.moonshot.cn',
    msgSel: '.chat-message, [class*="message"]',
    contentSel: '.markdown-body, .content'
  },
  {
    host: 'tongyi.aliyun.com',
    msgSel: '.message-item, [class*="message"]',
    contentSel: '.markdown, .content'
  }
];

function getSiteConfig() {
  const host = window.location.hostname;
  for (const cfg of SITE_CONFIG) {
    if (host.includes(cfg.host)) return cfg;
  }
  // 通用回退
  return {
    msgSel: '[class*="message"]',
    contentSel: null // 表示无精确容器，需手动排除干扰
  };
}

// ========== 文本清洗（含引用、思考、页脚清理） ==========
function cleanText(text) {
  let t = text;

  // 1. 移除 Markdown 语法
  t = t.replace(/^#+\s+/gm, '');
  t = t.replace(/\*\*(.*?)\*\*/g, '$1');
  t = t.replace(/\*(.*?)\*/g, '$1');
  t = t.replace(/\[(.*?)\]\(.*?\)/g, '$1');
  t = t.replace(/```[\s\S]*?```/g, '');
  t = t.replace(/`(.*?)`/g, '$1');
  t = t.replace(/^[\s]*[-*]\s+/gm, '');
  t = t.replace(/^\d+\.\s+/gm, '');

  // 2. 清除不可见字符
  t = t.replace(/[\u200B-\u200D\uFEFF]/g, '');

  // 3. 移除引用角标（如 --1, --1-4, --9）
  t = t.replace(/--\d+(?:-\d+)?/g, '');
  // 移除“16 个网页”这类尾部信息
  t = t.replace(/\d+\s*个网页/g, '');
  // 移除“已思考（用时 x 秒）”整行（单独一行）
  t = t.replace(/^.*已思考.*$/gm, '');
  // 移除类似“[1]”或“(1)”的引用（如果有）
  t = t.replace(/\[\d+\]/g, '');
  t = t.replace(/\(\d+\)/g, '');

  // 4. 英文标点转中文（保留网址中的点/斜杠）
  t = t.replace(/, /g, '，');
  t = t.replace(/\. /g, '。');
  t = t.replace(/; /g, '；');
  t = t.replace(/: /g, '：');
  t = t.replace(/\? /g, '？');
  t = t.replace(/! /g, '！');

  // 5. 清理多余空格和空行（保留段落分隔）
  t = t.replace(/[ \t]+/g, ' ');
  t = t.replace(/\n{3,}/g, '\n\n');  // 最多保留两个换行（段落间距）
  return t.trim();
}

// ========== 为单个消息添加按钮 ==========
function addCopyButton(messageEl, contentSel) {
  if (messageEl.dataset.hasCopyBtn) return;
  messageEl.dataset.hasCopyBtn = 'true';

  const btn = document.createElement('button');
  btn.className = 'ai-copy-clean-btn';
  btn.textContent = '📋 复制纯文本';
  btn.title = '仅复制正文（自动清理引用/思考/页脚）';

  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    // 1. 确定要提取的内容容器
    let targetEl = messageEl;
    if (contentSel) {
      const found = messageEl.querySelector(contentSel);
      if (found) targetEl = found;
    }

    // 2. 克隆目标容器（避免污染页面）
    const clone = targetEl.cloneNode(true);

    // 3. 移除克隆内的所有按钮（自身可能被克隆进去）
    clone.querySelectorAll('.ai-copy-clean-btn').forEach(el => el.remove());

    // 4. 额外删除已知干扰元素（如果前面未精准定位）
    //    删除 sup、引用链接、类名含 reference/footnote/citation 的元素
    clone.querySelectorAll('sup, a[href*="#"], .reference, .footnote, .citation, [class*="ref"]').forEach(el => el.remove());

    // 5. 提取纯文本（innerText 会保留块级换行）
    let rawText = clone.innerText || clone.textContent;

    // 6. 最终清洗
    const finalText = cleanText(rawText);

    // 7. 复制到剪贴板
    navigator.clipboard.writeText(finalText).then(() => {
      const orig = btn.textContent;
      btn.textContent = '✅ 已复制';
      setTimeout(() => { btn.textContent = orig; }, 1500);
    }).catch(() => {
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = finalText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      btn.textContent = '✅ 已复制';
      setTimeout(() => { btn.textContent = '📋 复制纯文本'; }, 1500);
    });
  });

  // 将按钮追加到消息气泡的右上角
  messageEl.style.position = 'relative';
  messageEl.appendChild(btn);
}

// ========== 扫描并处理所有消息 ==========
function processMessages() {
  const cfg = getSiteConfig();
  const messages = document.querySelectorAll(cfg.msgSel);
  messages.forEach(msg => {
    // 跳过太短或非用户/AI消息（可根据需要过滤）
    if (msg.innerText.length < 10) return;
    addCopyButton(msg, cfg.contentSel);
  });
}

// ========== 监听动态加载 ==========
let timer = null;
function startObserver() {
  processMessages();
  const observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(processMessages, 300);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// ========== 启动 ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startObserver);
} else {
  startObserver();
}