import {
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";

type CoursesCollectionPropsType = {
  title: string;
};

export function CoursesCollection({ title }: CoursesCollectionPropsType) {
  return (
    <div className="p-8 mx-auto max-w-6xl">
      <h2 className="text-4xl font-heading">{title}</h2>
      <div className="container max-w-screen-lg mx-auto p-8 flex flex-wrap">
        <UniformSlot name="courses">
          {({ child, key }) => {
            return (
              <div
                className="w-full md:w-1/2 lg:w-1/3 px-3 flex flex-col mb-8"
                key={key}
              >
                {" "}
                {child}{" "}
              </div>
            );
          }}
        </UniformSlot>
      </div>
    </div>
  );
}
registerUniformComponent({
  type: "coursesCollection",
  component: CoursesCollection,
});
