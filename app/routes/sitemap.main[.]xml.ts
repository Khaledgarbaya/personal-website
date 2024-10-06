import type { LoaderFunctionArgs } from "@remix-run/node";
import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap";
// Optionally import routes from the remix build to be consumed by the sitemap generator if the default one throws an error
// tslint:disable-next-line: no-submodule-imports
import { routes } from "virtual:remix/server-build";
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const domain = `${new URL(request.url).origin}`;

  const sitemap = await generateRemixSitemap({
    // Domain to append urls to
    domain,
    routes,
    // Ignores all dashboard routes
    ignore: [
      "/status",
      "blog/*",
      "/dashboard/*",
      "/dashboard",
      "/api",
      "/api/*",
      "/admin/*",
      "/admin",
      "/auth/*",
      "/auth",
      "/resources/*",
      "/resources",
    ],
  });

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
