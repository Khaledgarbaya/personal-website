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
    remix(),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ["@mdx-js/react"],
  },
  ssr: {
    noExternal: ["@mdx-js/react"],
  },
});
