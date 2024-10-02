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
                <span className="ml-3">Latest Courses</span>
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Get notified when I publish something new, and unsubscribe at
                any time.
              </p>
              <div className="mt-6 flex">
                <div className="flex-none w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-md"></div>
                <div className="flex-auto ml-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Course Title
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Course description
                  </p>
                </div>
              </div>
              <div className="mt-6 flex">
                <div className="flex-none w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-md"></div>
                <div className="flex-auto ml-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Course Title
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Course description
                  </p>
                </div>
              </div>
              <div className="mt-6 flex">
                <div className="flex-none w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-md"></div>
                <div className="flex-auto ml-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Course Title
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Course description
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
