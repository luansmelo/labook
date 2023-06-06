import supertest, { Response } from "supertest";
import app, { server } from "../src/index";
import { BaseDatabase } from "../src/database/BaseDatabase";
import { HashManager } from "../src/services/HashManager";
import { validate as uuidValidate } from "uuid";

const request = supertest(app);
let userResponse: Response;
let user: any;
let post: any;
let token: string;

afterAll(async () => {
  await BaseDatabase.connection.destroy();
  server.close();
});

beforeEach(async () => {
  await BaseDatabase.connection("likes_dislikes").truncate();
  await BaseDatabase.connection("posts").truncate();
  await BaseDatabase.connection("users").truncate();

  userResponse = await request.post("/users/signup").send({
    name: "Novo Usuário",
    email: "novo@usuario.com",
    password: "senha123",
  });

  user = await BaseDatabase.connection("users")
    .first()
    .where("email", "novo@usuario.com");
  token = userResponse.body.token;

  await request
    .post("/posts/create")
    .set("Authorization", token)
    .send({ content: "Labook" });
  post = await BaseDatabase.connection("posts")
    .first()
    .where("content", "Labook");
});

describe("usuários:", () => {
  it("Deve criar um novo usuário", async () => {
    expect(userResponse.status).toBe(201);
    expect(userResponse.body.message).toBe("Cadastro realizado com sucesso");
  });

  it("Deve gerar um UUID válido para o usuário", async () => {
    const isUuidValid = uuidValidate(user.id);
    expect(isUuidValid).toBe(true);
  });

  it("Deve hash a senha corretamente", async () => {
    const password = "senha123";
    const hashManager = new HashManager();

    expect(user.password).not.toBe(password);

    const match = await hashManager.compare(password, user.password);
    expect(match).toBe(true);
  });
});

describe("posts:", () => {
  it("Deve criar um novo post", async () => {
    expect(post.content).toBe("Labook");
    expect(post.creator_id).toBe(user.id);
  });

  it("Deve buscar todos os posts", async () => {
    const response = await request.get("/posts")
    .set("Authorization", token);
  
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Deve editar um post", async () => {
    const newContent = "Labook Atualizado";
    await request
      .put("/posts/edit/" + post.id)
      .set("Authorization", token)
      .send({ content: newContent });

    const updatedPost = await BaseDatabase.connection("posts")
      .first()
      .where("id", post.id);

    expect(updatedPost.content).toBe(newContent);
  });

  it("Deve excluir um post", async () => {
    const deleteResponse = await request
      .delete("/posts/delete/" + post.id)
      .set("Authorization", token);
    expect(deleteResponse.status).toBe(200);

    const deletedPost = await BaseDatabase.connection("posts")
      .first()
      .where("id", "=", post.id);
    expect(deletedPost).toBeUndefined();
  });

  it("Deve realizar o like em um post", async () => {
    const likeResponse = await request
      .put("/posts/" + post.id + "/like")
      .set("Authorization", token)
      .send({ like: true });
    expect(likeResponse.status).toBe(200);

    const updatedPost = await BaseDatabase.connection("posts")
      .first()
      .where("id", post.id);
    expect(updatedPost.likes).toBe(post.likes + 1);
  });

  it("Deve realizar o dislike em um post", async () => {
    const dislikeResponse = await request
      .put("/posts/" + post.id + "/like")
      .set("Authorization", token)
      .send({ like: false });
    expect(dislikeResponse.status).toBe(200);

    const updatedPost = await BaseDatabase.connection("posts")
      .first()
      .where("id", post.id);
    expect(updatedPost.dislikes).toBe(post.dislikes + 1);
  });
});