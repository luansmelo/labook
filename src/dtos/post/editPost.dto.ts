import z from "zod";

export interface EditPostsInputDTO {
  id: string;
  content: string;
  token: string;
}

export interface EditPostsOutputDTO {
  message: string;
}

export const EditPostsSchema = z
  .object({
    id: z.string(),
    content: z.string().min(1),
    token: z.string().min(1),
  })
  .transform((data) => data as EditPostsInputDTO);
