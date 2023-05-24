import { registerUniformComponent } from "@uniformdev/canvas-react";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type ArticleItemProps = {
  slug: string;
  title: string;
  publishdate: string;
  description: string;
};
export function ArticleItem({
  slug,
  title,
  publishdate,
  description,
}: ArticleItemProps) {
  if (description.length > 200) {
    description = description.substring(0, 200) + "...";
  }
  return (
    <>
      <Link
        className="text-gray-800 hover:text-teal-600"
        href={`/articles/${slug}`}
      >
        <h2 className="my-5 text-3xl font-heading">{title}</h2>
      </Link>
      <span className="inline-block mb-5 text-sm text-gray-700 border-b">
        <time>{publishdate}</time>
      </span>
      <div className="mb-5 prose prose-lg">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
      <small>
        <Link
          className="text-xs text-gray-700 hover:text-teal-600"
          href={`/articles/${slug}`}
        >
          Read more ››
        </Link>
      </small>
    </>
  );
}
registerUniformComponent({
  type: "articleitem",
  component: ArticleItem,
});
