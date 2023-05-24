import { Footer } from "./Footer";
import { Header } from "./Header";
import "@/components/Hero";
import "@/components/KhaledHero";
import "@/components/CourseCard";
import "@/components/CoursesCollection";
import "@/components/ArticleList";
import "@/components/ArticleItem";
import "@/components/InlineSignupForm";
import "@/components/Bio";
import "@/components/ArticleDetail";
import "@/components/NeverGonnaLetYouDown";

export function Layout({
  children,
  navLinks,
}: {
  children: React.ReactNode;
  navLinks: { title: string; url: string }[];
}) {
  return (
    <>
      <Header navLinks={navLinks} />
      {children}
      <Footer />
    </>
  );
}
