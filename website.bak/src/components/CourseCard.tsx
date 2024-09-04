import { registerUniformComponent } from "@uniformdev/canvas-react";

type CarPropsType = {
  title: string;
  link: string;
  picture: string;
  domain: string;
};
export function CourseCard({ title, link, picture }: CarPropsType) {
  return (
    <a
      href={link}
      className="no-underline border-0 bg-white rounded-lg shadow-lg hover:shadow-xl hover:translateY-2px transition flex-1 flex flex-col overflow-hidden"
    >
      <div>
        <div
          className="bg-cover aspect-video"
          style={{
            backgroundImage: `url(${picture})`,
          }}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <h3 className="font-display text-black no-underline mb-4">{title}</h3>
        <div>
          <p className="inline-flex items-center">
            <span className="text-gray-600 text-sm mr-2">
              {new URL(link).hostname}
            </span>
            <svg
              className="h-4 w-4 text-gray-600 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path d="M14 3.41l-7.3 7.3a1 1 0 0 1-1.4-1.42L12.58 2H9a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V3.41zM12 11a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h3a1 1 0 1 1 0 2H2v10h10v-3z" />
            </svg>
          </p>
        </div>
      </div>
    </a>
  );
}
registerUniformComponent({ type: "courseCard", component: CourseCard });
