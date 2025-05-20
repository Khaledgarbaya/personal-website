import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { remixDevTools } from "remix-development-tools";
import { cjsInterop } from "vite-plugin-cjs-interop";

export default defineConfig({
  plugins: [
    remixDevTools(),
    cjsInterop({
      dependencies: [
        "md5-hash",
        "@remark-embedder/core",
        "@remark-embedder/transformer-oembed",
      ],
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ["@mdx-js/react"],
  },
  ssr: {
    noExternal: ["@mdx-js/react", "posthog-js", "posthog-js/react"],
  },
});
