import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPosts } from "~/utils/posts.server";

export const loader = async () => {
  const posts = await getPosts();
  return json({ posts });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post?.slug}>
            <Link to={`/blog/${post?.slug}`}>{post?.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
