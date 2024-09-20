import ArticlePreview from "~/components/article-preview";

export default function RecentPosts({ posts }: { posts: any[] }) {
  return (
    <section>
      <ul className="divide-y-2 divide-y-primary">
        {posts.map((post) => (
          <li key={post.slug}>
            <ArticlePreview {...post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
