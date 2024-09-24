import { HeadersFunction } from "@remix-run/node";
import Footer from "~/components/footer";
import MainNav from "~/components/main-nav";
import PageHero from "~/components/page-hero";

export const loader = async () => {
  return { headers: { "Cache-Control": "public, max-age=60" } };
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") ?? "" };
};

export default function Til() {
  return (
    <div className="font-sans p-4 w-full">
      <MainNav />
      <div className="flex-none h-52"></div>
      <PageHero
        title="Today I Learned"
        description="I write about things I learn every day. It could be about software engineering, leadership, productivity, or anything else."
      />
      <Footer />
    </div>
  );
}
