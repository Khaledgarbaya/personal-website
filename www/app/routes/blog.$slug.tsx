import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/utils/posts.server";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

export const loader = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);
  return json(post, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
};

export default function Post() {
  const { code, frontmatter } = useLoaderData<typeof loader>();

  const Component = useMemo(() => {
    if (typeof window === "undefined") {
      return () => <div>Loading...</div>;
    }
    return getMDXComponent(code);
  }, [code]);

  return (
    <article className="prose dark:prose-invert lg:prose-xl mx-auto px-4">
      <h1>{frontmatter.title}</h1>
      <Component />
    </article>
  );
}
