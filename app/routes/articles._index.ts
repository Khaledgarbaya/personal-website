import { LoaderFunctionArgs, redirect } from "@remix-run/node";

export const loader = async ({}: LoaderFunctionArgs) => {
  // redirect everything to /blog
  return redirect("/blog", { status: 301 });
};
