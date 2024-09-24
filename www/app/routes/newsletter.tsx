import { HeadersFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
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
