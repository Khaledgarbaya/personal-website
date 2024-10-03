import { generateMeta } from "@forge42/seo-tools/remix/metadata";
import {
  HeadersFunction,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import PageHero from "~/components/page-hero";
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const meta = generateMeta({
    title: "Khaled Garkbaya - Blog",
    description: `Blog posts for the tag ${data?.tag}`,
    url: `https://khaledgarbaya.net`,
    image: `https://res.cloudinary.com/kgarbaya/image/upload/co_rgb:1A39A9,l_text:Quicksand_55_bold:Blog posts for the tag ${data?.tag},g_north_west,x_436,y_200,w_670,c_fit/v1727002971/og-image.png`,
  });
  return meta;
};
export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") ?? "" };
};

export default function Tag() {
  const { posts, tag } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex-none h-52"></div>
      <PageHero title={`#${tag}`} description="" />
      <div className="flex-none h-32"></div>
      <section className="container">
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <RecentPosts posts={posts} />
        </div>
      </section>
    </>
  );
}
