import type { TransformerInfo } from '@remark-embedder/core';

type GottenHTML = string | null;

/**
 * Error handler for failed embeds
 */
export function handleEmbedderError({ url }: { url: string }) {
  return `<p>Error embedding <a href="${url}">${url}</a></p>`;
}

/**
 * HTML handler to wrap embeds in responsive containers
 */
export function handleEmbedderHtml(html: GottenHTML, info: TransformerInfo) {
  if (!html) return null;

  const url = new URL(info.url);
  
  // matches youtu.be and youtube.com
  if (/youtu\.?be/.test(url.hostname)) {
    // this allows us to set youtube embeds to 100% width and the
    // height will be relative to that width with a good aspect ratio
    return makeEmbed(html, 'youtube');
  }
  
  if (url.hostname.includes('codesandbox.io')) {
    return makeEmbed(html, 'codesandbox', '80%');
  }
  
  return html;
}

/**
 * Generate responsive embed wrapper HTML
 */
function makeEmbed(html: string, type: string, heightRatio = '56.25%') {
  return `
  <div class="embed" data-embed-type="${type}">
    <div style="padding-bottom: ${heightRatio}">
      ${html}
    </div>
  </div>
`;
}

