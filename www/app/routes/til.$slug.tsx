
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { type TableOfContents } from "~/utils/posts.server";
import { useMemo, useEffect, useState } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { generateMeta } from "@forge42/seo-tools/remix/metadata";
import { article } from "@forge42/seo-tools/structured-data/article";
import { getTilPost } from "~/utils/til.server";

type LoaderData = {
  code: string;
  frontmatter: {
    title: string;
    description: string;
    published: string;
    tags: string[];
  };
  toc: TableOfContents;
};

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;
  if (!slug) throw new Response("Not Found", { status: 404 });

  const post = (await getTilPost(slug)) as LoaderData;
  if (!post) throw new Response("Not Found", { status: 404 });

  return json(
    { ...post, slug },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    }
  );
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const meta = generateMeta(
    {
      title: data.frontmatter.title,
      description: data.frontmatter.description,
      url: `https://khaledgarbaya.net/til/${data.slug}`,
      image: `https://res.cloudinary.com/kgarbaya/image/upload/co_rgb:1A39A9,l_text:Quicksand_45_bold:${data.frontmatter.title},g_north_west,x_436,y_290,w_670,c_fit/v1727002971/og-image.png`,
    },
    [
      {
        "script:ld+json": article({
          "@type": "Article",
          headline: data.frontmatter.description,
          image: `https://res.cloudinary.com/kgarbaya/image/upload/co_rgb:1A39A9,l_text:Quicksand_45_bold:${data.frontmatter.title},g_north_west,x_436,y_290,w_670,c_fit/v1727002971/og-image.png`,
          datePublished: data.frontmatter.published,
        }),
      },
    ]
  );
  return meta;
};
function TableOfContents({ toc }: { toc: TableOfContents }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      toc.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [toc]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav className="toc">
      <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            className={`transition-colors ${
              item.depth === 1 ? "font-semibold" : "pl-4"
            } ${
              activeId === item.id
                ? "text-blue-500 border-l-2 border-primary"
                : "hover:text-blue-500"
            }`}
          >
            <a href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function TilPost() {
  const { code, frontmatter, toc } = useLoaderData<typeof loader>();
  const params = useParams();

  const Component = useMemo(() => {
    if (typeof window === "undefined") {
      return () => <div>Loading...</div>;
    }
    return getMDXComponent(code);
  }, [code]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.removeProperty("scroll-behavior");
    };
  }, []);

  if (!params.slug) {
    return <div className="text-center py-8">Post not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex-none h-52"></div>
      <div className="lg:flex lg:space-x-8">
        <article className="lg:w-3/4">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
            <p className="text-gray-600 mb-2">{frontmatter.description}</p>
            <time className="text-sm text-gray-500">
              {new Date(frontmatter.published).toLocaleDateString()}
            </time>
            <div className="mt-4">
              {frontmatter.tags?.split(",").map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Component />
          </div>
        </article>
        <aside className="lg:w-1/4 mb-8 lg:mb-0">
          <div className="sticky top-8">
            <TableOfContents toc={toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}
