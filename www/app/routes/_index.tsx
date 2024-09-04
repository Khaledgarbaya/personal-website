import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/utils/posts.server";
import MainHero from "~/components/main-hero";
import MainNav from "~/components/main-nav";
import RecentPosts from "~/components/recent-posts";

export const meta: MetaFunction = () => {
  return [
    { title: "Khaled Garbaya" },
    {
      name: "description",
      content: "An engineering Leader, Developer, and educator",
    },
  ];
};

export const loader = async () => {
  const posts = await getPosts();
  return json({ posts });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="font-sans p-4 w-full">
      <MainNav />
      <div className="flex-none h-52"></div>
      <MainHero />
      <div className="flex-none h-32"></div>
      <RecentPosts posts={posts} />
    </div>
  );
}
