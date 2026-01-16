import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  const tilEntries = await getCollection("til");

  const siteUrl = context.site?.toString() || "https://khaledgarbaya.net";

  const sortedPosts = posts.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime()
  );

  const sortedTil = tilEntries.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime()
  );

  const contentGraph = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Khaled Garbaya",
    description:
      "Engineering Leader, Developer and educator. I write about web development, software engineering and leadership.",
    url: siteUrl,
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Khaled Garbaya",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        ...sortedPosts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "BlogPosting",
            "@id": `${siteUrl}/blog/${post.slug}`,
            headline: post.data.title,
            description: post.data.description,
            url: `${siteUrl}/blog/${post.slug}`,
            datePublished: post.data.published.toISOString(),
            dateModified: (post.data.modified || post.data.published).toISOString(),
            keywords: post.data.tags,
            author: {
              "@id": `${siteUrl}/#person`,
            },
          },
        })),
        ...sortedTil.map((entry, index) => ({
          "@type": "ListItem",
          position: sortedPosts.length + index + 1,
          item: {
            "@type": "Article",
            "@id": `${siteUrl}/til/${entry.slug}`,
            headline: entry.data.title,
            description: entry.data.description,
            url: `${siteUrl}/til/${entry.slug}`,
            datePublished: entry.data.published.toISOString(),
            dateModified: (entry.data.modified || entry.data.published).toISOString(),
            keywords: entry.data.tags,
            articleSection: "Today I Learned",
            author: {
              "@id": `${siteUrl}/#person`,
            },
          },
        })),
      ],
    },
  };

  return new Response(JSON.stringify(contentGraph, null, 2), {
    headers: {
      "Content-Type": "application/ld+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
