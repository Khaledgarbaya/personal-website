import { HeadersFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PageHero from "~/components/page-hero";
import RecentPosts from "~/components/recent-posts";
import { getPosts } from "~/utils/posts.server";

export const loader = async () => {
  const posts = await getPosts({ limit: 100, cacheKey: "blog" });
  return json(
    { posts },
    { headers: { "Cache-Control": "public, max-age=60" } }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") ?? "" };
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex-none h-52"></div>
      <PageHero
        title="Blog"
        description="I write about software engineering, leadership, and productivity. I also share my thoughts on the tech industry and how to navigate it."
      />
      <div className="flex-none h-32"></div>
      <section className="container">
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <RecentPosts posts={posts} />
        </div>
      </section>
    </>
  );
}
