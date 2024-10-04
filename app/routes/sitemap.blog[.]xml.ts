import type { LoaderFunctionArgs } from "@remix-run/node";
import { generateSitemap } from "@forge42/seo-tools/sitemap";
import { getPosts } from "~/utils/posts.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const domain = new URL(request.url).origin;
  const posts = await getPosts();
  const postRoutes = posts.map((post) => ({
    url: `/blog/${post.slug}`,
    lastmod: post.published.toISOString(),
  }));

  const sitemaps = await generateSitemap({
    domain,
    routes: [...postRoutes],
  });

  return new Response(sitemaps, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
