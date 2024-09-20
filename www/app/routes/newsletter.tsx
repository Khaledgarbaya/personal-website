import Footer from "~/components/footer";
import MainNav from "~/components/main-nav";
import PageHero from "~/components/page-hero";

export default function Newsletter() {
  return (
    <div className="font-sans p-4 w-full">
      <MainNav />
      <div className="flex-none h-52"></div>
      <PageHero
        title="Newsletter"
        description="I write about software engineering, leadership, and productivity. I also share my thoughts on the tech industry and how to navigate it."
      />
      <Footer />
    </div>
  );
}
