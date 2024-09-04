import {
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";

type ArticleListPropsType = {
  title: string;
};

export function ArticleList({ title }: ArticleListPropsType) {
  return (
    <div className="p-8 mx-auto max-w-6xl border-t-2 border-t-teal-400">
      <h2 className="text-4xl font-heading">{title}</h2>
      <ul className="container max-w-screen-lg mx-auto p-8 flex flex-wrap">
        <UniformSlot name="articles">
          {({ child, key }) => {
            return (
              <li className="py-4 mb-5 border-b" key={key}>
                {child}
              </li>
            );
          }}
        </UniformSlot>
      </ul>
    </div>
  );
}
registerUniformComponent({
  type: "articlelist",
  component: ArticleList,
});
