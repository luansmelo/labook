import z from "zod"
import { PostModel } from "../../models/Posts"

export interface GetPostsInputDTO {
  q: string,
  token:string
}

export type GetPostsOutputDTO = PostModel[]

export const GetPostsSchema = z.object({
  q: z.string().min(1).optional(),
  token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)