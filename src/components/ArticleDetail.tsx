import { registerUniformComponent } from "@uniformdev/canvas-react";
import ReactMarkdown from "react-markdown";
type BioPropsType = {
  title: string;
  content: string;
};

export function ArticleDetail({ title, content }: BioPropsType) {
  return (
    <div className="mx-auto max-w-2xl lg:max-w-5xl">
      <article>
        <header className="flex flex-col">
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <time
            dateTime="2022-09-05"
            className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
          >
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
            <span className="ml-3">September 5, 2022</span>
          </time>
        </header>
        <div className="prose prose-xl mt-3">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
registerUniformComponent({
  type: "articleDetail",
  component: ArticleDetail,
});
