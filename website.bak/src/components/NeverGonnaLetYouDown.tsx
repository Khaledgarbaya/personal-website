import { registerUniformComponent } from "@uniformdev/canvas-react";

type NeverGonnaLetYouDownPropsType = {
  title: string;
};

export function NeverGonnaLetYouDown({ title }: NeverGonnaLetYouDownPropsType) {
  return (
    <div className="mx-auto max-w-2xl lg:max-w-5xl">
      <article>
        <h1 className="text-4xl font-bold">{title}</h1>
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </article>
    </div>
  );
}
registerUniformComponent({
  type: "neverGonnaLetYouDown",
  component: NeverGonnaLetYouDown,
});
