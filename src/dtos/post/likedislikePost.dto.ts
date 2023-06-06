import z from "zod"

export interface LikeDislikePostsInputDTO {
  id: string,
  like: boolean,
  token: string
}
export interface LikeDislikePostsOutputDTO {
    message: string
}

export const LikeDislikePostsSchema = z.object({
  like: z.boolean().optional(),
  token: z.string().min(1),
  id: z.any()
}).transform(data => data as LikeDislikePostsInputDTO)