import { promises as fs } from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import { LRUCache } from "lru-cache";
import rehypePrettyCode from "rehype-pretty-code";

const contentPath = path.join(process.cwd(), "content");
const cache = new LRUCache<string, any>({ max: 500, ttl: 60000 }); // 60 seconds TTL

const rehypePrettyCodeOptions = {
  // Use one of Shiki's packaged themes
  theme: "one-dark-pro",
  // Keep the background or use a custom background color?
  keepBackground: true,
  // Callback to get the highlighted code
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

export async function getPost(slug: string) {
  const cachedPost = cache.get(slug);
  if (cachedPost) {
    return cachedPost;
  }

  const postDir = path.join(contentPath, slug);
  const mdxFile = (await fs.readdir(postDir)).find((file) =>
    file.endsWith(".mdx")
  );
  if (!mdxFile) throw new Error(`No MDX file found for slug: ${slug}`);

  const filePath = path.join(postDir, mdxFile);
  const source = await fs.readFile(filePath, "utf8");

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrettyCode, rehypePrettyCodeOptions],
      ];
      return options;
    },
  });

  const post = { code, frontmatter };
  cache.set(`post_${slug}`, post);
  return post;
}
