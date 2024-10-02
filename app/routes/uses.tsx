import Footer from "~/components/footer";
import MainNav from "~/components/main-nav";
import PageHero from "~/components/page-hero";

export default function Til() {
  return (
    <div className="font-sans p-4 w-full">
      <MainNav />
      <div className="flex-none h-52"></div>
      <PageHero title="Software and gadgets I use and recommend" description="Everything I use and love and want to recommend." />
      <Footer />
    </div>
  );
}
