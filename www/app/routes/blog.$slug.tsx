import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { getPost, type TableOfContents } from "~/utils/posts.server";
import { useMemo, useEffect, useState } from "react";
import { getMDXComponent } from "mdx-bundler/client";

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

  const post = await getPost(slug);
  if (!post) throw new Response("Not Found", { status: 404 });

  return json<LoaderData>(post, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
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
              activeId === item.id ? "text-blue-500" : "hover:text-blue-500"
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

export default function Post() {
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
