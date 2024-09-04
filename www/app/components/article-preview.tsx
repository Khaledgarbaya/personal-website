import { Link } from "@remix-run/react";
import { Badge } from "./ui/badge";

export default function ArticlePreview({
  slug,
  title,
  description,
  published,
}: any) {
  return (
    <article className="py-6">
      <div className="flex items-center justify-between mb-3 text-gray-500">
        <div className="space-x-2">
          <Badge>
            <Link to="/blog/tag/webdev/" prefetch="intent">
              #webdev
            </Link>
          </Badge>
          <Badge>
            <Link to="/blog/tag/remix-run/" prefetch="intent">
              #Remix-run
            </Link>
          </Badge>
        </div>
        <span className="text-sm">
          Published{" "}
          <time className="block text-sm text-cyan-700" dateTime={published}>
            {published.replace(/-/g, "/")}
          </time>
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
        <Link to={`/blog/${slug}`}>{title ?? ""}</Link>
      </h2>
      <p className="mb-5 text-gray-500 dark:text-gray-400">
        {description ?? ""}
      </p>
      <div className="flex items-center justify-between">
        <a className="flex items-center space-x-2" href="/about/">
          <img
            className="rounded-full w-7 h-7"
            src="/logo.svg"
            alt="Khaled Garbaya  profile picture"
          />
          <span className="font-medium dark:text-white">Khaled Garbaya</span>
        </a>
        <Link
          className="inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
          to={`/blog/${slug}`}
        >
          Read more
          <svg
            className="w-4 h-4 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  );
}
