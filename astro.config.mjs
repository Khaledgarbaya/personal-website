// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkEmbedderPlugin } from './src/lib/remark-embedder-plugin.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://khaledgarbaya.net',
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@remark-embedder/core', '@remark-embedder/transformer-oembed'],
    },
  },
  integrations: [
    mdx({
      remarkPlugins: [
        remarkEmbedderPlugin,
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['anchor'],
              ariaLabel: 'Link to this section',
            },
          },
        ],
      ],
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'one-dark-pro',
        wrap: true,
      },
    }),
    sitemap(),
  ],
});
