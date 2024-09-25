import { HeadersFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/components/footer";
import PageHero from "~/components/page-hero";
import TilCollection from "~/components/til-collection";
import { getTilPosts } from "~/utils/til.server";

export const loader = async () => {
  const tilPosts = await getTilPosts();
  return json(
    { tilPosts },
    { headers: { "Cache-Control": "public, max-age=60" } }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") ?? "" };
};

export default function Til() {
  const { tilPosts } = useLoaderData<typeof loader>();
  return (
    <div className="font-sans p-4 w-full">
      <div className="flex-none h-52"></div>
      <PageHero
        title="Today I Learned"
        description="I write about things I learn every day. It could be about software engineering, leadership, productivity, or anything else."
      />
      <div className="flex-none h-32"></div>
      <section>
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <TilCollection posts={tilPosts} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
