import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    modified: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    tags: z.string(),
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().default('Khaled Garbaya'),
  }),
});

const til = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    modified: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    tags: z.string(),
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().default('Khaled Garbaya'),
  }),
});

export const collections = {
  posts,
  til,
};

