import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");

  // Sort posts by published date, most recent first
  const sortedPosts = posts.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime()
  );

  return rss({
    title: "Khaled Garbaya - Blog",
    description:
      "Engineering Leader, Developer and educator. I write about web development, software engineering and leadership.",
    site: context.site?.toString() || "https://khaledgarbaya.net",
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      pubDate: post.data.published,
      categories: post.data.tags
        ? post.data.tags.split(",").map((tag) => tag.trim())
        : [],
      author: "Khaled Garbaya",
      customData: `
        <author>Khaled Garbaya</author>
        <content:encoded><![CDATA[${post.data.description}]]></content:encoded>
      `,
    })),
    customData: `
      <language>en-us</language>
      <copyright>Copyright ${new Date().getFullYear()} Khaled Garbaya</copyright>
      <managingEditor>Khaled Garbaya</managingEditor>
      <webMaster>Khaled Garbaya</webMaster>
      <generator>Astro</generator>
    `,
    xmlns: {
      content: "http://purl.org/rss/1.0/modules/content/",
      dc: "http://purl.org/dc/elements/1.1/",
      atom: "http://www.w3.org/2005/Atom",
    },
  });
}
