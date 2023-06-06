import express from "express";
import cors from "cors";
import { userRouter } from "./routers/userRouter";
import dotenv from "dotenv";
import { postRouter } from "./routers/postRouter";

dotenv.config();

const app = express();

//e para outros poderem conectar
app.use(cors());
//e para transformar td q manda e q recebe em objeto
app.use(express.json());

export const server = app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});

app.use("/users", userRouter);
app.use("/posts", postRouter);

export default app;
