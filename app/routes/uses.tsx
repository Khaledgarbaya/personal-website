import { generateMeta } from "@forge42/seo-tools/remix/metadata";
import { MetaFunction } from "@remix-run/react";
import Footer from "~/components/footer";
import MainNav from "~/components/main-nav";
import PageHero from "~/components/page-hero";

export const meta: MetaFunction = ({}) => {
  const meta = generateMeta({
    title: "Khaled Garkbaya - Uses",
    description: "Software and gadgets I use and recommend",
    url: `https://khaledgarbaya.net`,
    image: `https://res.cloudinary.com/kgarbaya/image/upload/co_rgb:1A39A9,l_text:Quicksand_55_bold:Software and gadgets I use and recommend,g_north_west,x_436,y_200,w_670,c_fit/v1727002971/og-image.png`,
  });
  return meta;
};
export default function Til() {
  return (
    <div className="font-sans p-4 w-full">
      <MainNav />
      <div className="flex-none h-52"></div>
      <PageHero
        title="Software and gadgets I use and recommend"
        description="Everything I use and love and want to recommend."
      />
      <Footer />
    </div>
  );
}
