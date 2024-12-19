# Chat Backend

Backend de uma aplicação de chat em tempo real utilizando **Node.js**, **Express**, **Sequelize**, **WebSocket** e **MySQL**. Este projeto gerencia autenticação de usuários, status online e troca de mensagens em tempo real.

---

## 📋 Pré-requisitos | Prerequisites

- **Português:** Certifique-se de ter as seguintes ferramentas instaladas:
  - [Node.js](https://nodejs.org) (recomendado: versão LTS)
  - [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
  - [MySQL](https://www.mysql.com/)

- **English:** Make sure you have the following tools installed:
  - [Node.js](https://nodejs.org) (recommended: LTS version)
  - [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
  - [MySQL](https://www.mysql.com/)

---

## 🚀 Como rodar o projeto | How to run the project

### **1. Clone o repositório | Clone the repository**

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

### **2. Instale as dependências | Install the dependencies**

- **Português:** Use o comando abaixo para instalar as dependências:
- **English:** Use the command below to install dependencies:

```bash
npm install
# ou | or
yarn install
```

### **3. Configure o arquivo `.env` | Configure the `.env` file**

- **Português:** Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente:
- **English:** Rename the `.env.example` file to `.env` and fill in the environment variables:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua-senha
DB_NAME=nome-do-banco
DB_PORT=3306
PORT=3000
JWT_SECRET=sua-chave-secreta
```

### **4. Configure o banco de dados | Configure the database**

- **Português:** Certifique-se de que o banco de dados MySQL esteja rodando e que o banco especificado no `.env` esteja criado.
- **English:** Ensure that the MySQL database is running and that the database specified in `.env` is created.

### **5. Execute as migrations | Run the migrations**

- **Português:** Para criar as tabelas no banco de dados, use o comando:
- **English:** To create the tables in the database, use the command:

```bash
npx sequelize db:migrate
```

### **6. Popule o banco de dados (opcional) | Seed the database (optional)**

- **Português:** Para popular o banco de dados com dados iniciais (seeds), use o comando:
- **English:** To seed the database with initial data, use the command:

```bash
npx sequelize db:seed:all
```

### **7. Inicie o servidor | Start the server**

- **Português:** Para rodar o servidor localmente, use:
- **English:** To run the server locally, use:

```bash
npm run dev
# ou | or
yarn dev
```

- **Português:** O servidor será iniciado no endereço: `http://localhost:3000`
- **English:** The server will start at: `http://localhost:3000`

---

## 🛠️ Testando o projeto | Testing the project

### **1. Verificar rotas disponíveis | Check available routes**

- **Português:** Use ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar as rotas da API.
- **English:** Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API routes.

### **2. Principais funcionalidades | Main features**

- **Português:**
  - Cadastro e autenticação de usuários (JWT).
  - Status online/offline de usuários.
  - Troca de mensagens em tempo real via WebSocket.
  - Armazenamento de mensagens no banco de dados.

- **English:**
  - User registration and authentication (JWT).
  - Online/offline status management.
  - Real-time messaging via WebSocket.
  - Message storage in the database.

---

## 📦 Scripts disponíveis | Available scripts

### **Rodar o servidor local | Run the local server**

```bash
npm run dev
# ou | or
yarn dev
```

### **Executar as migrations | Run the migrations**

```bash
npx sequelize db:migrate
```

### **Desfazer as migrations | Rollback migrations**

```bash
npx sequelize db:migrate:undo
```

### **Executar os seeds | Run the seeds**

```bash
npx sequelize db:seed:all
```

### **Desfazer os seeds | Rollback seeds**

```bash
npx sequelize db:seed:undo:all
```

---

## 📄 Licença | License

- **Português:** Este projeto é licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
- **English:** This project is licensed under the MIT license. See the `LICENSE` file for more details.
