import { createRequire } from 'module';
import { handleEmbedderError, handleEmbedderHtml } from './embedder.ts';

const require = createRequire(import.meta.url);
const remarkEmbedder = require('@remark-embedder/core').default;
const oembedTransformer = require('@remark-embedder/transformer-oembed').default;

export function remarkEmbedderPlugin() {
  return remarkEmbedder({
    handleError: handleEmbedderError,
    handleHTML: handleEmbedderHtml,
    transformers: [oembedTransformer],
  });
}

