interface CFContext {
  request: Request;
  next: () => Promise<Response>;
}

/**
 * Convert HTML to markdown using only Workers-native APIs.
 * Handles the common elements found in a blog: headings, paragraphs,
 * links, images, lists, code blocks, emphasis, and strong text.
 */
function htmlToMarkdown(html: string): string {
  let md = html;

  // Extract only the main content (skip nav, footer, scripts, styles)
  const mainMatch = md.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    || md.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (mainMatch) {
    md = mainMatch[1];
  } else {
    // Fallback: strip head, nav, footer, aside
    md = md.replace(/<head[\s\S]*?<\/head>/gi, "");
    md = md.replace(/<nav[\s\S]*?<\/nav>/gi, "");
    md = md.replace(/<footer[\s\S]*?<\/footer>/gi, "");
    md = md.replace(/<aside[\s\S]*?<\/aside>/gi, "");
  }

  // Remove script and style tags
  md = md.replace(/<script[\s\S]*?<\/script>/gi, "");
  md = md.replace(/<style[\s\S]*?<\/style>/gi, "");
  md = md.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");

  // Code blocks (pre > code) — must come before inline code
  md = md.replace(/<pre[^>]*>\s*<code[^>]*(?:class="[^"]*language-(\w+)[^"]*")?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, lang, code) => {
      const decoded = decodeEntities(code.trim());
      return `\n\n\`\`\`${lang || ""}\n${decoded}\n\`\`\`\n\n`;
    });

  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, c) => `\n\n# ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, c) => `\n\n## ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, c) => `\n\n### ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, c) => `\n\n#### ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, (_, c) => `\n\n##### ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, (_, c) => `\n\n###### ${stripTags(c).trim()}\n\n`);

  // Images
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)");
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, text) => `[${stripTags(text).trim()}](${href})`);

  // Bold and italic
  md = md.replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, (_, __, c) => `**${c}**`);
  md = md.replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, (_, __, c) => `*${c}*`);

  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => `\`${decodeEntities(c)}\``);

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
    (_, c) => `\n\n> ${stripTags(c).trim().replace(/\n/g, "\n> ")}\n\n`);

  // List items (before ul/ol removal)
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `- ${stripTags(c).trim()}\n`);
  md = md.replace(/<\/?[uo]l[^>]*>/gi, "\n");

  // Paragraphs and divs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, c) => `\n\n${c.trim()}\n\n`);
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = md.replace(/<hr\s*\/?>/gi, "\n\n---\n\n");

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, "");

  // Decode HTML entities
  md = decodeEntities(md);

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, "\n\n");
  md = md.trim();

  return md;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

export const onRequest = async (context: CFContext) => {
  const accept = context.request.headers.get("Accept") || "";

  // Only intercept if the client explicitly wants markdown
  if (!accept.includes("text/markdown")) {
    return context.next();
  }

  // Skip non-HTML resources (assets, API, feeds)
  const url = new URL(context.request.url);
  const path = url.pathname;
  if (
    path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|xml|json|txt|woff2?|ttf|otf)$/) ||
    path.startsWith("/api/") ||
    path.startsWith("/.well-known/")
  ) {
    return context.next();
  }

  const response = await context.next();

  // Only convert HTML responses
  const contentType = response.headers.get("Content-Type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  const html = await response.text();
  const markdown = htmlToMarkdown(html);
  const tokenEstimate = Math.ceil(markdown.length / 4);

  return new Response(markdown, {
    status: response.status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": tokenEstimate.toString(),
      "Cache-Control": response.headers.get("Cache-Control") || "public, max-age=3600",
      "Vary": "Accept",
    },
  });
};
