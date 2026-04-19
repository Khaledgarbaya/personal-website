import { NodeHtmlMarkdown } from "node-html-markdown";

interface CFContext {
  request: Request;
  next: () => Promise<Response>;
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
  const markdown = NodeHtmlMarkdown.translate(html);
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
