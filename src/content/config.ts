import { defineCollection, z } from 'astro:content';

const grammarCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    module: z.number().min(1).max(4),
    lesson: z.number().min(1).max(30),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    tags: z.array(z.string()),
    paradigms: z.array(z.string()).optional(),
    quiz: z.array(z.object({
      id: z.string(),
      type: z.enum(['identify', 'produce', 'translate']),
      greekForm: z.string().optional(),
      context: z.string().optional(),
      parsing: z.string().optional(),
      options: z.array(z.string()).optional(),
      answer: z.string(),
      explanation: z.string().optional(),
    })).optional(),
  }),
});

export const collections = {
  grammar: grammarCollection,
};
