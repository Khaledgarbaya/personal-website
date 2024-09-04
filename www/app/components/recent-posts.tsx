import ArticlePreview from "~/components/article-preview";

export default function RecentPosts({ posts }: { posts: any[] }) {
  return (
    <section className="container mx-auto">
      <div className="max-w-2xl lg:max-w-5xl mx-auto">
        <ul className="max-w-2xl divide-y-2 divide-y-primary">
          {posts.map((post) => (
            <li key={post.slug}>
              <ArticlePreview {...post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
