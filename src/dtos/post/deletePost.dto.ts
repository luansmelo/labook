import z from "zod"

export interface DeletePostsInputDTO {
  id: string,
  token:string
}

export interface DeletePostsOutputDTO {
    message: string
}

export const DeletePostsSchema = z.object({
  id: z.string().min(1).optional(),
  token: z.string().min(1)
}).transform(data => data as DeletePostsInputDTO)