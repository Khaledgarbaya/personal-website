import { promises as fs } from "fs";
import { LRUCache } from "lru-cache";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { TableOfContentItem, TableOfContents } from "./posts.server";
import { slug } from "github-slugger";
import { toString } from "mdast-util-to-string";
import remarkEmbedder, { type TransformerInfo } from "@remark-embedder/core";
import oembedTransformer from "@remark-embedder/transformer-oembed";

const cache = new LRUCache<string, any>({ max: 500, ttl: 60000 }); // 60 seconds TTL
const contentPath = path.join(process.cwd(), "content", "til");

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

// Custom rehype plugin to extract table of contents
function extractToc({ callback = console.log, depthLimit = 2 }) {
  return (tree: any) => {
    const headers: TableOfContentItem[] = [];
    visit(tree, "element", (node: any) => {
      //check only h1, h2, h3
      if (!["h1", "h2", "h3"].includes(node.tagName)) return;
      const value = toString(node);
      headers.push({ text: value, depth: node.depth ?? 0, id: slug(value) });
    });
    callback(headers.filter(({ depth }) => depth <= depthLimit));
  };
}

export async function getTilPosts() {
  const cachedTilPosts = cache.get("til_posts");
  if (cachedTilPosts) {
    return cachedTilPosts;
  }
  const dir = await fs.readdir(contentPath);

  const posts = await Promise.all(
    dir.map(async (slug: string) => {
      const postDir = path.join(contentPath, slug);
      const stat = await fs.stat(postDir);
      if (!stat.isDirectory()) return null;

      const mdxFile = (await fs.readdir(postDir)).find((file) =>
        file.endsWith(".mdx")
      );
      if (!mdxFile) return null;

      const file = await fs.readFile(path.join(postDir, mdxFile), "utf8");
      const { frontmatter } = await bundleMDX({ source: file });
      return {
        slug,
        title: frontmatter.title as string,
        description: frontmatter.description as string,
        published: frontmatter.published as Date,
        featured: frontmatter.featured as boolean,
        tags: frontmatter.tags
          .split(",")
          .map((tag: string) => tag.trim()) as string[],
      };
    })
  ).then((posts) =>
    posts
      .filter(notEmpty)
      .sort((a, b) => b?.published.getTime() - a?.published.getTime())
  );

  cache.set("til_posts", posts);
  return posts;
}

function addClassesToHeadings() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
        node.properties.className = (node.properties.className || []).concat(
          "flex items-center relative group"
        );
      }
    });
  };
}

const rehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: true,
  onVisitHighlightedLine(node: any) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ["word"];
  },
};
type GottenHTML = string | null;
function handleEmbedderError({ url }: { url: string }) {
  return `<p>Error embedding <a href="${url}">${url}</a></p>.`;
}
function handleEmbedderHtml(html: GottenHTML, info: TransformerInfo) {
  if (!html) return null;

  const url = new URL(info.url);
  // matches youtu.be and youtube.com
  if (/youtu\.?be/.test(url.hostname)) {
    // this allows us to set youtube embeds to 100% width and the
    // height will be relative to that width with a good aspect ratio
    return makeEmbed(html, "youtube");
  }
  if (url.hostname.includes("codesandbox.io")) {
    return makeEmbed(html, "codesandbox", "80%");
  }
  return html;
}

function makeEmbed(html: string, type: string, heightRatio = "56.25%") {
  return `
  <div class="embed" data-embed-type="${type}">
    <div style="padding-bottom: ${heightRatio}">
      ${html}
    </div>
  </div>
`;
}

export async function getTilPost(slug: string) {
  const cachedPost = cache.get(`til_${slug}`);
  if (cachedPost) {
    return cachedPost;
  }
  try {
    const postDir = path.join(contentPath, slug);
    const mdxFile = (await fs.readdir(postDir)).find((file) =>
      file.endsWith(".mdx")
    );
    if (!mdxFile) throw new Error(`No MDX file found for slug: ${slug}`);

    const filePath = path.join(postDir, mdxFile);
    const source = await fs.readFile(filePath, "utf8");

    let toc: TableOfContents = [];
    const { code, frontmatter } = await bundleMDX({
      source,
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          [
            remarkEmbedder,
            {
              handleError: handleEmbedderError,
              handleHTML: handleEmbedderHtml,
              transformers: [oembedTransformer],
            },
          ],
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: [
                  "absolute -left-6 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                ],
              },
              content: {
                type: "element",
                tagName: "svg",
                properties: {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 16 16",
                  width: 16,
                  height: 16,
                  fill: "currentColor",
                  className: "w-4 h-4",
                },
                children: [
                  {
                    type: "element",
                    tagName: "path",
                    properties: {
                      fillRule: "evenodd",
                      d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z",
                    },
                  },
                ],
              },
            },
          ],
          addClassesToHeadings,
          [rehypePrettyCode, rehypePrettyCodeOptions],
          [
            remarkEmbedder,
            {
              transformers: [oembedTransformer],
            },
          ],
          [
            extractToc,
            { depthLimit: 3, callback: (t: TableOfContents) => (toc = t) },
          ],
        ];
        return options;
      },
    });

    // Access the toc from the last rehype plugin (extractToc)
    const post = { code, frontmatter, toc };
    cache.set(`til_${slug}`, post);
    return post;
  } catch (error) {
    return null;
  }
}

export async function getTilPostsByTags(tags: string | string[]) {
  const allPosts = await getTilPosts();
  const tagsArray = Array.isArray(tags) ? tags : [tags];
  return allPosts.filter((post: { tags: string[] }) =>
    post.tags.some((tag: string) => tagsArray.includes(tag))
  );
}
