import { PostDatabase } from "../database/PostsDatabase";
import { UserDatabase } from "../database/UsersDatabase";
import {
  CreatePostsInputDTO,
  CreatePostsOutputDTO,
} from "../dtos/post/createPost.dto";
import {
  DeletePostsInputDTO,
  DeletePostsOutputDTO,
} from "../dtos/post/deletePost.dto";
import {
  EditPostsInputDTO,
  EditPostsOutputDTO,
} from "../dtos/post/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto";
import {
  LikeDislikePostsInputDTO,
  LikeDislikePostsOutputDTO,
} from "../dtos/post/likedislikePost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post, PostDB, TokenPayloadPost } from "../models/Posts";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getPosts = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { q, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postsDB = await this.postDatabase.findPosts(q);

    const posts = postsDB.map((postDB) => {
      const post = new Post(
        postDB.id,
        postDB.creator_id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.update_at
      );

      return post.toBusinessModel();
    });

    const output: GetPostsOutputDTO = posts;

    return output;
  };

  public createPost = async (
    input: CreatePostsInputDTO
  ): Promise<CreatePostsOutputDTO> => {
    //token do usuario
    const { content, token } = input;

    const payload = this.tokenManager.getPayloadPost(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    let likes = 0;
    let dislikes = 0;

    const id = this.idGenerator.generate();

    const newPost = new Post(
      id,
      payload.id,
      content,
      likes,
      dislikes,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newPostDB = newPost.toDBModel();
    await this.postDatabase.insertPost(newPostDB);

    const tokenPayloadPost: TokenPayloadPost = {
      id: newPost.getId(),
      creator_id: newPost.getCreator(),
    };

    const novotoken = this.tokenManager.createTokenPost(tokenPayloadPost);

    const output: CreatePostsOutputDTO = {
      message: "Cadastro realizado com sucesso",
      token: novotoken,
    };

    return output;
  };

  public editPost = async (
    input: EditPostsInputDTO
  ): Promise<EditPostsOutputDTO> => {
    const { id, content, token } = input;

    const payload = this.tokenManager.getPayloadPost(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postDB = await this.postDatabase.findPostById(id);

    if (!postDB) {
      throw new NotFoundError("'post' não encontrado");
    }

    if (payload.id !== postDB.creator_id) {
      throw new NotFoundError("criador do post inválido");
    }

    const post = new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.update_at
    );

    const updatedPostDB: PostDB = {
      id: post.getId() || postDB.id,
      creator_id: post.getCreator() || postDB.creator_id,
      content: content || postDB.content,
      likes: post.getLikes() || postDB.likes,
      dislikes: post.getDislike() || postDB.dislikes,
      created_at: post.getCreatedAt() || postDB.created_at,
      update_at: post.getUpdateAt() || postDB.update_at,
    };

    const output = {
      message: "Post editado com sucesso",
    };

    await this.postDatabase.editPost(postDB.id, updatedPostDB);

    return output;
  };

  public deletePost = async (
    input: DeletePostsInputDTO
  ): Promise<DeletePostsOutputDTO> => {
    const { id, token } = input;

    const payload = this.tokenManager.getPayloadPost(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postDB = await this.postDatabase.findPostById(id);
    if (!postDB) {
      throw new NotFoundError("'post' não encontrado");
    }

    if (payload.id !== postDB.creator_id) {
      throw new BadRequestError("Você não pode apagar esse post");
    }

    const output = {
      message: "Post apagado com sucesso",
    };

    await this.postDatabase.deletePost(id);

    return output;
  };

  public likeDislikePost = async (input: LikeDislikePostsInputDTO): Promise<LikeDislikePostsOutputDTO> => {
    const { id, like, token } = input;
    const payload = this.tokenManager.getPayloadPost(token);
  
    if (!payload) throw new BadRequestError("Token inválido");
  
    const postDB = await this.postDatabase.findPostById(id);
    if (!postDB) throw new NotFoundError("'post' não encontrado");
  
    const hasReacted = await this.postDatabase.checkLikeDislikeByUserAndPost(payload.id, id, like);
    if (hasReacted) throw new BadRequestError(`Você já deu ${like ? 'like' : 'dislike'} no post`);
  
    if (like) {
      if (await this.postDatabase.checkLikeDislikeByUserAndPost(payload.id, id, !like)) {
        postDB.dislikes = Math.max(0, postDB.dislikes - 1);
        await this.postDatabase.removeLikeDislike(payload.id, id, false);
      }
      postDB.likes++;
    } else {
      if (await this.postDatabase.checkLikeDislikeByUserAndPost(payload.id, id, !like)) {
        postDB.likes = Math.max(0, postDB.likes - 1);
        await this.postDatabase.removeLikeDislike(payload.id, id, true);
      }
      postDB.dislikes++;
    }
  
    const updatedPostDB: PostDB = {
      ...postDB,
      update_at: new Date().toISOString(),
    };
  
    await Promise.all([
      this.postDatabase.editPost(postDB.id, updatedPostDB),
      this.postDatabase.insertLikeDislike({
        user_id: payload.id,
        post_id: id,
        like: Number(like),
      }),
    ]);
  
    return { message: `${like ? 'Like' : 'Dislike'} efetuado com sucesso!` };
  };  
}
