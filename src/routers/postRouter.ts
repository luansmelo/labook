import express from "express"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostsDatabase"
import { PostBusiness } from "../business/PostsBusiness"
import { PostController } from "../controller/PostsController"


export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPosts)
postRouter.post("/create", postController.createPost)
postRouter.put("/edit/:id", postController.editPost)
postRouter.delete("/delete/:id", postController.deletePost)
postRouter.put("/:id/like/", postController.likedislikePost)
