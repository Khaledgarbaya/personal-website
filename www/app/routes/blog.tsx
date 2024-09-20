import { Outlet } from "@remix-run/react";
import Footer from "~/components/footer";
import MainNav from "~/components/main-nav";

export default function Blog() {
  return (
    <div className="font-sans p-4 w-full">
      <MainNav />
      <Outlet />
      <Footer />
    </div>
  );
}
