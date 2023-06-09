# Projeto Labook

## Visão Geral
O Labook é uma rede social projetada para facilitar a interação e a conexão entre os usuários. Os usuários podem se cadastrar, criar posts, curtir e editar suas publicações.

## Tecnologias Utilizadas

- **NodeJS**: Ambiente de execução do servidor.
- **TypeScript**: Superconjunto de JavaScript para adicionar tipagem forte e outros recursos.
- **Express**: Framework de servidor web para manipular solicitações HTTP.
- **SQLite & SQL**: Usado para armazenamento e consulta de dados.
- **Knex**: Construtor de consultas SQL para manipulação de dados.
- **POO (Programação Orientada a Objetos)**: Utilizada para estruturar o código de maneira mais robusta e reutilizável.

## Banco de Dados

O banco de dados consiste em três tabelas:

### users

Mantém informações dos usuários.

| Campo       | Tipo         | Descrição                           |
|-------------|--------------|-------------------------------------|
| id          | string         | Identificador único do usuário      |
| name        | string       | Nome do usuário                     |
| email       | string       | Email do usuário                    |
| password    | string       | Senha do usuário (criptografada)    |
| role        | string       | Função do usuário                   |
| created_at  | timestamp    | Data de criação do usuário          |

### posts

Armazena os posts criados pelos usuários.

| Campo       | Tipo         | Descrição                                       |
|-------------|--------------|-------------------------------------------------|
| id          | string       | Identificador único do post                     |
| creator_id  | string       | Identificador do usuário que criou o post       |
| content     | string       | Conteúdo do post                                |
| likes       | integer      | Quantidade de curtidas no post                  |
| deslikes    | integer      | Quantidade de descurtidas no post               |
| created_at  | timestamp    | Data de criação do post                         |
| updated_at  | timestamp    | Data de atualização do post                     |

### likes_deslikes

Rastreia as curtidas e descurtidas dos posts por usuários.

| Campo       | Tipo         | Descrição                           |
|-------------|--------------|-------------------------------------|
| user_id     | string       | Identificador do usuário            |
| post_id     | string       | Identificador do post               |
| like        | boolean      | Curtida (true = curtiu, false = descurtiu)  |

## Funcionalidades e Requisitos

- **Autenticação**: O aplicativo permite que os usuários se registrem e façam login usando email e senha. A senha do usuário é protegida com hash usando Bcrypt.
- **Postagem**: Os usuários autenticados podem criar, editar e deletar suas próprias postagens. Cada postagem pode ser curtida ou descurtida pelos usuários.
- **Administração**: Os usuários com privilégios de administrador têm permissões adicionais, como a capacidade de deletar postagens de outros usuários.

## Detalhes de Implementação

O código base do aplicativo é estruturado em uma arquitetura em camadas, usando a programação orientada a objetos para melhor organização e reusabilidade do código. Para a segurança, foi implementada a autenticação e autorização usando UUID para identificação dos usuários, senhas hasheadas e tokens JWT.

## Como Usar

O Labook possui diversos endpoints para acesso às suas funcionalidades. Todos os endpoints protegidos requerem um token JWT para serem acessados. Este token é fornecido na resposta dos endpoints de signup e login.

## Rotas

#### Certifique-se de que as rotas seguem o padrão apropriado:

**Users**

```json
Cadastro de Usuário:
  POST /users/signup

 Login de Usuário:
  POST /users/login
```
**Posts** 

```json
Obter Posts:
  GET /posts

Criar Post:
  POST /posts

Editar Post:
  PUT /posts/:id

Deletar Post:
  DELETE /posts/:id

Curtir/Descurtir Post:
  PUT /posts/:id/like
```

## Exemplos de Requisição

### 1. Signup

**Endpoint**: `POST /users/signup`

**Body** (JSON):

```json
{
  "name": "Beltrana",
  "email": "beltrana@email.com",
  "password": "beltrana00"
}
```

Resposta (201 CREATED):

```json
{
  "token": "um token jwt"
}
``` 

### 2. Login
**Endpoint**: `POST /users/login`

**Body** (JSON):

```json
{
  "email": "beltrana@email.com",
  "password": "beltrana00"
}
```

Resposta (200 OK):

```json
{
  "token": "um token jwt"
}
```

### 3. Get posts
**Endpoint**: GET /posts

**Headers**:

```json
{
  "authorization": "token jwt"
}
```

Resposta (200 OK):

```json
[
    {
        "id": "uma uuid v4",
        "content": "Hoje vou estudar POO!",
        "likes": 2,
        "dislikes": 1,
        "createdAt": "2023-01-20T12:11:47:000Z",
        "updatedAt": "2023-01-20T12:11:47:000Z",
        "creator": {
            "id": "uma uuid v4",
            "name": "Fulano"
        }
    },
    //... outros posts
]
```

### 4. Create post
**Endpoint**: `POST /posts`

**Headers**:

```json
{
  "authorization": "token jwt"
}
```

**Body** (JSON):

```json
{
  "content": "Partiu happy hour!"
}
```
Resposta (201 CREATED)

### 5. Edit post
**Endpoint**: `PUT /posts/:id`

Headers:

```json
{
  "authorization": "token jwt"
}
```
**Body** (JSON):

```json
{
  "content": "Partiu happy hour lá no point de sempre!"
}
```
Resposta (200 OK)

### 6. Delete post
**Endpoint**: `DELETE /posts/:id`

**Headers**:

```json
{
  "authorization": "token jwt"
}
```
Resposta (200 OK)

### 7. Like/Dislike post
**Endpoint**: `PUT /posts/:id/like`

**Headers**:

```json
{
  "authorization": "token jwt"
}
```
**Body** (JSON) para like:

```json
{
  "like": true
}
```
**Body** (JSON) para dislike:

```json
{
  "like": false
}
```
Resposta (200 OK)

