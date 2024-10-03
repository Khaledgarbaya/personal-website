import { generateMeta } from "@forge42/seo-tools/remix/metadata";
import { HeadersFunction, MetaFunction } from "@remix-run/node";

import Footer from "~/components/footer";
import MainNav from "~/components/main-nav";
import NewsletterForm from "~/components/newsletter-form";
import PageHero from "~/components/page-hero";

export const loader = async () => {
  return { headers: { "Cache-Control": "public, max-age=3600" } };
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") ?? "" };
};

export const meta: MetaFunction = ({}) => {
  const meta = generateMeta({
    title: "Khaled Garbaya - Newsletter",
    description:
      "I write about software engineering, leadership, and productivity. I also share my thoughts on the tech industry and how to navigate it.",
    url: `https://khaledgarbaya.net`,
    image: `https://res.cloudinary.com/kgarbaya/image/upload/co_rgb:1A39A9,l_text:Quicksand_55_bold:Subscribe to my newsletter,g_north_west,x_436,y_200,w_670,c_fit/v1727002971/og-image.png`,
  });
  return meta;
};

export default function Newsletter() {
  return (
    <div className="font-sans p-4 w-full">
      <MainNav />
      <div className="flex-none h-52"></div>
      <PageHero
        title="Newsletter"
        description="I write about software engineering, leadership, and productivity. I also share my thoughts on the tech industry and how to navigate it."
      />
      <div className="flex-none h-32"></div>
      <div className="container max-w-5xl mx-auto prose dark:prose-invert prose-lg">
        <div className="max-w-2xl mx-auto">
          <NewsletterForm />
        </div>
        <div className="flex-none h-24">
          <div>
            <h2 className="text-3xl font-bold">Latest edition</h2>
            <p>
              This is the latest edition of my newsletter. You can subscribe to
              get it directly in your inbox.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
