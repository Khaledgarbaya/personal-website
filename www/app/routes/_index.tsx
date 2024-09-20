import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import Footer from "~/components/footer";
import MainHero from "~/components/main-hero";
import MainNav from "~/components/main-nav";
import RecentPosts from "~/components/recent-posts";
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
  return json({ posts });
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
                <RecentPosts posts={posts} />
              </div>
            </section>
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <form className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
              <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-6 w-6 flex-none"
                >
                  <path
                    d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                    className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                  ></path>
                  <path
                    d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
                    className="stroke-zinc-400 dark:stroke-zinc-500"
                  ></path>
                </svg>
                <span className="ml-3">Stay up to date</span>
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Get notified when I publish something new, and unsubscribe at
                any time.
              </p>
              <div className="mt-6 flex">
                <input
                  placeholder="Email address"
                  aria-label="Email address"
                  required
                  className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
                  type="email"
                />
                <button
                  className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none"
                  type="submit"
                >
                  Join
                </button>
              </div>
            </form>

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
