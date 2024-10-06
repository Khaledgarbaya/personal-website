import TilItem from "./til-item";

export default function TilCollection({ posts }: { posts: any[] }) {
  // TODO - refactor this to use subgrid instead of auto-rows
  return (
    <section>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <TilItem {...post} />
        ))}
      </div>
    </section>
  );
}
