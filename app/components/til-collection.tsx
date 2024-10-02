import TilItem from "./til-item";

export default function TilCollection({ posts }: { posts: any[] }) {
  // TODO - refactor this to use subgrid instead of auto-rows
  return (
    <section>
      <div className="grid auto-rows-fr gap-4 grid-cols-1 md:grid-cols-3">
        {posts.map((post) => (
          <TilItem {...post} />
        ))}
      </div>
    </section>
  );
}
