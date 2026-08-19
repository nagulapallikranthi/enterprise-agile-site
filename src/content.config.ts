import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const insights = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/insights" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    excerpt: z.string(),
    publishDate: z.string(),
    readTime: z.string(),
    articleNumber: z.number(),
  }),
});

export const collections = { insights };
