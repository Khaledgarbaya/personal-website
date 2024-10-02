import {
  HeadersFunction,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import RecentPosts from "~/components/recent-posts";
import { getPostsByTags } from "~/utils/posts.server";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.name) {
    return json({ posts: [], tag: "" }, { status: 404 });
  }
  const posts = await getPostsByTags(params.name);
  return json(
    { posts, tag: params.name },
    { headers: { "Cache-Control": "public, max-age=60" } }
  );
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") ?? "" };
};

export default function Tag() {
  const { posts, tag } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex-none h-52"></div>
      <div>
        <div className="mx-auto max-w-2xl lg:max-w-5xl flex items-center gap-4">
          <div>
            <img
              src="/logo.svg"
              alt="Khaled Garbaya"
              className="animate-pulse w-16 h-16"
            />
          </div>
          <div className="max-w-2xl">
            <h1 className="text-6xl leading-tight font-bold">#{tag}</h1>
          </div>
        </div>
      </div>
      <div className="flex-none h-32"></div>
      <RecentPosts posts={posts} />
    </>
  );
}
