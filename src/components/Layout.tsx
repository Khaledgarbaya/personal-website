import { Footer } from "./Footer";
import { Header } from "./Header";
import "@/components/Hero";
import "@/components/KhaledHero";
import "@/components/CourseCard";
import "@/components/CoursesCollection";
import "@/components/ArticleList";
import "@/components/ArticleItem";
import "@/components/InlineSignupForm";
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
