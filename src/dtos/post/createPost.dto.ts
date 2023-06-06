import z from "zod"
export interface CreatePostsInputDTO {
    // creator_id: string,
    content:string,
    token:string
}

export interface CreatePostsOutputDTO {
  message: string,
  token:string
}

export const CreatePostsSchema = z.object({
  // creator_id: z.string().min(1),
  content: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as CreatePostsInputDTO)