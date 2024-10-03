import { generateMeta } from "@forge42/seo-tools/remix/metadata";
import type { HeadersFunction, MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import Footer from "~/components/footer";
import MainHero from "~/components/main-hero";
import MainNav from "~/components/main-nav";
import NewsletterForm from "~/components/newsletter-form";
import RecentPosts from "~/components/recent-posts";
import { buttonVariants } from "~/components/ui/button";
import { getPosts } from "~/utils/posts.server";

export const meta: MetaFunction<typeof loader> = ({}) => {
  const meta = generateMeta({
    title: "Khaled Garkbaya",
    description:
      "Engineering Leader, Developer and educator. I write about web development, software engineering and leadership.",
    url: `https://khaledgarbaya.net`,
    image: `https://res.cloudinary.com/kgarbaya/image/upload/co_rgb:1A39A9,l_text:Quicksand_55_bold:I write about web development leadership and productivity,g_north_west,x_436,y_200,w_670,c_fit/v1727002971/og-image.png`,
  });
  return meta;

};

export const loader = async () => {
  const posts = await getPosts();
  return json(
    { posts },
    { headers: { "Cache-Control": "public, max-age=3600" } }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") ?? "" };
};
export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="py-6">
      <MainNav />
      <div className="flex-none h-52"></div>
      <MainHero />
      <div className="flex-none h-32"></div>
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div>
            <section className="container">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <h2 className="text-3xl font-bold">Latest posts</h2>
                <RecentPosts posts={posts} />
                <Link
                  to="/blog"
                  unstable_viewTransition
                  className={clsx(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "mt-8 w-full"
                  )}
                >
                  More posts
                </Link>
              </div>
            </section>
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <NewsletterForm />
            <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
              <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <span className="ml-3">Latest Videos</span>
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Latest videos from my youtube channel
              </p>
              <div className="mt-6 flex items-center justify-center">
                <div className="flex-none w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-md"></div>
                <div className="flex-auto ml-4 not-prose">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    <Link
                      className="inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
                      to="https://www.youtube.com/watch?v=TW0Ic0n_PZ8"
                    >
                      Numbered Bookmarks in VS Code
                    </Link>
                  </h3>
                  <p className="text-sm !mt-0 text-zinc-600 dark:text-zinc-400">
                    Numbered bookmarks will allow us to select a block of code,
                    bookmark it and easily navigate back to it using the
                    bookmark number.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
