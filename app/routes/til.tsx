import { generateMeta } from "@forge42/seo-tools/remix/metadata";
import { MetaFunction, Outlet } from "@remix-run/react";
import Footer from "~/components/footer";
import MainNav from "~/components/main-nav";

export const meta: MetaFunction = ({}) => {
  const meta = generateMeta({
    title: "Khaled Garkbaya - TIL",
    description:
      "Things I learn every day. It could be about software engineering, leadership, productivity, or anything else.",
    url: `https://khaledgarbaya.net`,
    image: `https://res.cloudinary.com/kgarbaya/image/upload/co_rgb:1A39A9,l_text:Quicksand_55_bold:Things I learn every day,g_north_west,x_436,y_200,w_670,c_fit/v1727002971/og-image.png`,
  });
  return meta;
};

export default function Blog() {
  return (
    <div className="font-sans p-4 w-full">
      <MainNav />
      <Outlet />
      <Footer />
    </div>
  );
}
