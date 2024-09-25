import { Link } from "@remix-run/react";
import { Badge } from "./ui/badge";

export default function TilItem({
  slug,
  title,
  description,
  published,
  tags,
}: any) {
  const tagList = tags || [];
  return (
    <article className="p-6 flex flex-col rounded-lg shadow-md border dark:shadow-white">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3 text-gray-500">
          <div className="space-x-2">
            {tagList.map((tag: string) => (
              <Badge key={tag}>
                <Link to={`/til/tags/${tag}`} prefetch="intent">
                  {`#${tag}`}
                </Link>
              </Badge>
            ))}
          </div>
          <span className="text-sm">
            Published{" "}
            <time className="block text-sm text-cyan-700" dateTime={published}>
              {published.replace(/-/g, "/").replace(/T.+/, "")}
            </time>
          </span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
          <Link to={`/til/${slug}`} unstable_viewTransition>
            {title ?? ""}
          </Link>
        </h2>
        <p className="mb-5 text-gray-500 dark:text-gray-400">
          {description ?? ""}
        </p>
      </div>
      <div className="flex items-center justify-end">
        <Link
          className="inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
          to={`/til/${slug}`}
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
