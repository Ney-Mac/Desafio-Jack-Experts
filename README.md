# Task Manager - Aplicação Fullstack para Gestão de Tarefas
[ Este projeto e um desafio feito para aplicação a vaga de estágio full-stack na Jack Experts ]

## Descrição

Este é um sistema de gestão de tarefas desenvolvido como parte de um projeto para uma vaga de estágio fullstack. A aplicação permite que usuários se cadastrem, façam login e gerenciem suas tarefas de forma intuitiva e responsiva. Os principais recursos incluem:
- Cadastro e login de usuário com e-mail e senha
- Listagem de tarefas do usuário logado
- Criação de nova tarefa com título e descrição
- Edição e exclusão de tarefas
- Marcar tarefa como concluída

### Estrutura
O projeto segue uma estrutura de arquivos simples, baseada em clean achitectur, separando as camadas por respnsabilidade.
- `taskmanagement_jackexperts`
  - `client`
      - `public`
      - `src`
          - `api`
          - `assets`
          - `components`
          - `constants`
          - `contexts`
          - `pages`
          - `utils`
      - `package.json`
      - `App.tsx`
      - `main.tsx`
      - `index.html`
  - `server`
      - `src`
          - `config`
          - `controllers`
          - `dtos`
          - `errors`
          - `middlewares`
          - `models`
          - `router`
          - `services`
          - `types`
          - `utils`
          - `server.ts`
      - `package.json`
  - `package.json`

## Demonstração

Veja a aplicação em funcionamento: [Task Manager Online](https://taskmanagerclient.vercel.app/)

## Decisões de Desenvolvimento
Durante o desenvolvimento deste projeto, tomei as seguintes decisões:

### Front-end (React):
- **Gerenciamento de estado**: Usei o [React Context API](https://reactjs.org/docs/context.html) para compartilhar o estado de autenticação entre os componentes.
- **Estilização**: Para aplicação de estilos de forma poderosa e eficiente, usei o [Sass](https://sass-lang.com/). O Sass permite usar variaveis de forma simples e intuitiva no css, estilos aninhados, mixins para evitar reescrever o código, entre outras funcionalidades.
- **Responsividade**: Para garantir que a aplicação fosse responsiva, utilizei CSS Flexbox/Grid e @mediaquery.
- **Integração com a API**: Usei o [axios](https://axios-http.com/docs/intro) para gerenciar o envio de requisições para a API.
- **Validação**: Para validação de email, usei a biblioteca [validator](https://www.npmjs.com/package/validator).

### Back-end (NodeJs):
- **Framework**: Optei por utilizar [Express](https://expressjs.com/), por ser uma escolha leve e flexível.
- **Banco de dados**: Utilizei [MongoDB](https://www.mongodb.com/) com o [Mongoose](https://mongoosejs.com/) para a modelagem dos dados de usuários e tarefas.
- **Autenticação**: Para a autenticação de usuários, implementei JWT (JSON Web Tokens), garantindo segurança nas rotas protegidas.
- **Validação**: Para validação de email usei a biblioteca [deep-email-validator](https://www.npmjs.com/package/deep-email-validator?activeTab=readme).

## Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js >= 14.x
- npm ou yarn
- MongoDB (pode ser local ou no Atlas)

### Instruções de Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Ney-Mac/Desafio-Jack-Experts.git
2. Instale as dependências para o frontend e backend:
    ```bash
       cd client
        npm install
    ```
    ```bash
        cd server
        npm install
    ```
3. Crie um arquivo .env em server/ com as seguintes variáveis:
   ```makefile
    MONGODB_URI=sua-url-do-mongodb
    JWT_SECRET=sua-chave-secreta
   ```
4. Instale as dependências na raiz do projeto
5. Rode o projeto com o **concurrently**:
   ```bash
     npm run dev
   ```
