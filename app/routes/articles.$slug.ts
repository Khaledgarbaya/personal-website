import { LoaderFunctionArgs, redirect } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // redirect everything to /blog/$slug
  const slug = params.slug;

  return redirect(`/blog/${slug}`, { status: 301 });
};
