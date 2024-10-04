import type { LoaderFunctionArgs } from "@remix-run/node";
import { generateSitemapIndex } from "@forge42/seo-tools/sitemap";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const domain = new URL(request.url).origin;
  const sitemaps = generateSitemapIndex([
    {
      url: `${domain}/sitemap/main.xml`,
      lastmod: "2024-10-04",
    },
    {
      url: `${domain}/sitemap/blog.xml`,
      lastmod: new Date().toISOString(),
    },
    {
      url: `${domain}/sitemap/til.xml`,
      lastmod: new Date().toISOString(),
    },
  ]);

  return new Response(sitemaps, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
