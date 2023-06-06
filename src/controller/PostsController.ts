import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { PostBusiness } from "../business/PostsBusiness";
import { CreatePostsSchema } from "../dtos/post/createPost.dto";
import { GetPostsSchema } from "../dtos/post/getPosts.dto";
import { EditPostsSchema } from "../dtos/post/editPost.dto";
import { DeletePostsSchema } from "../dtos/post/deletePost.dto";
import { LikeDislikePostsSchema } from "../dtos/post/likedislikePost.dto";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}
  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = GetPostsSchema.parse({
        q: req.query.q,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.getPosts(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostsSchema.parse({
        content: req.body.content,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.createPost(input);

      res.status(201).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostsSchema.parse({
        id: req.params.id,
        content: req.body.content,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.editPost(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostsSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.deletePost(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public likedislikePost = async (req: Request, res: Response) => {
    try {
      const input = LikeDislikePostsSchema.parse({
        id: req.params.id,
        like: req.body.like,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.likeDislikePost(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
