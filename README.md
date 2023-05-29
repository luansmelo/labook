Projeto Labook
Visão Geral
O Labook é uma rede social projetada para facilitar a interação e a conexão entre os usuários. Os usuários podem se cadastrar, criar posts, curtir e editar suas publicações.

Tecnologias Utilizadas
NodeJS: Ambiente de execução do servidor.
TypeScript: Superconjunto de JavaScript para adicionar tipagem forte e outros recursos.
Express: Framework de servidor web para manipular solicitações HTTP.
SQLite & SQL: Usado para armazenamento e consulta de dados.
Knex: Construtor de consultas SQL para manipulação de dados.
POO (Programação Orientada a Objetos): Utilizada para estruturar o código de maneira mais robusta e reutilizável.
Funcionalidades e Requisitos
Autenticação: O aplicativo permite que os usuários se registrem e façam login usando email e senha. A senha do usuário é protegida com hash usando Bcrypt.

Postagem: Os usuários autenticados podem criar, editar e deletar suas próprias postagens. Cada postagem pode ser curtida ou descurtida pelos usuários.

Administração: Os usuários com privilégios de administrador têm permissões adicionais, como a capacidade de deletar postagens de outros usuários.

Detalhes de Implementação
O código base do aplicativo é estruturado em uma arquitetura em camadas, usando a programação orientada a objetos para melhor organização e reusabilidade do código. Para a segurança, foi implementada a autenticação e autorização usando UUID para identificação dos usuários, senhas hasheadas e tokens JWT.

Como Usar
O Labook possui diversos endpoints para acesso às suas funcionalidades. Todos os endpoints protegidos requerem um token JWT para serem acessados. Este token é fornecido na resposta dos endpoints de signup e login.
