import { registerUniformComponent } from "@uniformdev/canvas-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rangeParser from "parse-numeric-range";

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import Image from "next/image";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

type BioPropsType = {
  title: string;
  authorName: string;
  authorAvatarUrl: string;
  authorBio: string;
  content: string;
  publishDate: string;
};

export function ArticleDetail({
  title,
  content,
  publishDate,
  authorAvatarUrl,
  authorName,
  authorBio,
}: BioPropsType) {
  const syntaxTheme = oneDark;

  const MarkdownComponents: object = {
    code({ node, inline, className, ...props }: any) {
      const hasLang = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, "");
          const strlineNumbers = RE?.test(metadata)
            ? // @ts-ignore
              RE?.exec(metadata)[1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data = highlight.includes(applyHighlights) ? "highlight" : null;
          return { data };
        } else {
          return {};
        }
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
  };
  return (
    <article className="mx-auto w-full max-w-3xl">
      <header className="mb-4 lg:mb-6">
        <address className="flex items-center mb-6 not-italic">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900">
            <Image
              className="mr-4 w-16 h-16 rounded-full"
              width={64}
              height={64}
              src={`https:${authorAvatarUrl}`}
              alt={authorName}
            />
            <div>
              <a
                href="#"
                rel="author"
                className="text-xl font-bold text-gray-900"
              >
                {authorName}
              </a>
              <p className="text-base font-light text-gray-500 mt-0 mb-0">
                {authorBio}
              </p>
              <p className="text-base font-light text-gray-500 mt-0 mb-0">
                <time dateTime={publishDate} title={publishDate}>
                  {publishDate}
                </time>
              </p>
            </div>
          </div>
        </address>
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
          {title}
        </h1>
      </header>
      <div className="prose prose-xl mt-3 prose-pre:bg-transparent">
        <ReactMarkdown
          components={MarkdownComponents}
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
registerUniformComponent({
  type: "articleDetail",
  component: ArticleDetail,
});
