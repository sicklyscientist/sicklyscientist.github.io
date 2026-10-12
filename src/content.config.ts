import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    demo: z.boolean().default(false),
    draft: z.boolean().default(false),
    listed: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    category: z.string().trim().min(1).default('Uncategorized'),
    socialImage: z.string().optional(),
    socialImageAlt: z.string().optional(),
    comments: z.boolean().default(false),
    commentId: z.string().optional(),
    toc: z.boolean().default(true),
  }),
});
export const collections = { posts };
