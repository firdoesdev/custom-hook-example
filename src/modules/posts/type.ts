import { z } from "zod";

export const TPostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string({
    required_error:'Title is required'
  }),
  body: z.string({
    required_error:'Body is required'
  }),
});
export type TPost = z.infer<typeof TPostSchema>;

export const TCreatePostSchema = TPostSchema.omit({ id: true });
export type TCreatePost = z.infer<typeof TCreatePostSchema>;
