import { generateMeta } from "@forge42/seo-tools/remix/metadata";
import { HeadersFunction, MetaFunction } from "@remix-run/node";

import Footer from "~/components/footer";
import MainNav from "~/components/main-nav";
import PageHero from "~/components/page-hero";

export const loader = async () => {
  return { headers: { "Cache-Control": "public, max-age=3600" } };
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") ?? "" };
};

export const meta: MetaFunction = ({}) => {
  const meta = generateMeta({
    title: "Khaled Garbaya - About",
    description:
      "Engineering Leader, Developer, and educator. I write about web development, leadership, and productivity.",
    url: `https://khaledgarbaya.net`,
    image: `https://res.cloudinary.com/kgarbaya/image/upload/co_rgb:1A39A9,l_text:Quicksand_55_bold:Learn more about me,g_north_west,x_436,y_200,w_670,c_fit/v1727002971/og-image.png`,
  });
  return meta;
};

export default function About() {
  return (
    <div className="font-sans p-4 w-full">
      <MainNav />
      <div className="flex-none h-52"></div>
      <div className="container max-w-6xl mx-auto flex flex-col-reverse md:flex-row justify-center items-center">
        <PageHero
          title="My name is Khaled Garbaya."
          description="I write about software engineering, leadership, and productivity. I also share my thoughts on the tech industry and how to navigate it."
        />
        <img
          src="/Khaled_Garbaya_Colour.jpg"
          alt="Khaled Garbaya"
          width="400"
          height="400"
          className="aspect-square object-cover rounded-2xl shadow-lg -rotate-3"
        />
      </div>
      <div className="flex-none h-24"></div>
      <div className="container max-w-5xl mx-auto prose dark:prose-invert prose-lg">
        <p>
          Where do I start? I'm Khaled Garbaya, born and raised in a small town
          in the south of Tunisia. Tunisia, a beautiful country in North Africa,
          is known for its rich history, diverse culture, and stunning
          landscapes. Ironically, it wasn't until I secured a job that I gained
          a deeper understanding of my country, as I could now afford to travel
          extensively. Don't get me wrong, my parents did their best to show me
          around, but we would only travel to places where we had relatives,
          leading to a repetitive experience. It was the only option we could
          afford, and I appreciate every moment.
        </p>
        <p>
          Let's move on from that topic. I completed my schooling in my hometown
          before attending a university located 20 km away in the same state. I
          did a bachelor degree in computer science. Meanwhile, my passion for
          programming was growing and growing every day since I discovered
          GBasic, a programming language on my Atari keyboard console with
          cartridge. I can't recall the exact brand and model, but if you're old
          enough, you'll remember it. My first program was `PRINT Khaled`, and
          guess what? My name was printed. I then began researching loops and
          other related topics.
        </p>
        <p>
          The second and probably the biggest motivator was getting introduced
          to Macromedia Flash, acquired by Adobe later. I was amazed by the
          possibilities and how it is almost guaranteed that it will work in
          every browser; back then, Javascript was mostly used to show an alert.
        </p>
        <p>
          Anyway, after finishing university, I immediately got a job as a flash
          developer for an agency in the capital Tunis. As a student, I
          developed a portfolio that included several Flash websites for various
          businesses and non-profits in my hometown. After a few years, Flash's
          popularity began to decline due to security issues arising from its
          use as a virtual machine (VM), with Steve Jobs's open letter likely
          serving as the final straw. I am deeply grateful for the platform, as
          it not only covered my expenses for many years but also taught me
          invaluable Javascript concepts.
        </p>
        <p>
          After transitioning to Javascript and later Nodejs, I moved to Berlin.
          I began working on full-stack development and contributed to
          open-source projects such as Yargs and Gatsby, a process I thoroughly
          enjoyed. I also experimented with videos, streaming, and writing. I
          still do this casually.
        </p>
        <p>
          After spending over a decade coding, I moved to management not because
          "it's the next natural thing" but more because I really love helping
          empower people and seeing them succeed. As a result, I transitioned to
          management, which was initially challenging because it required me to
          relearn everything about people I had learned as an IC.
        </p>
        <p>
          As a family man, raising a child has become my new hobby. I love
          spending time with my small family and try to keep a balance between
          work and life; after all, work will never end, but time with the
          people you love will.
        </p>
      </div>
      <Footer />
    </div>
  );
}
