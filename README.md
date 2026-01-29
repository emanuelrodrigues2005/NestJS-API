<div align="center">

# 🚀 NestJS REST API

<img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />

### A professional REST API built with NestJS, Prisma ORM & Swagger

[![NestJS](https://img.shields.io/badge/NestJS-v11.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-v6.19-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

**🌐 Choose your language | Escolha seu idioma:**

[🇺🇸 English](#-english) • [🇧🇷 Português](#-português)

---

</div>

# 🇺🇸 English

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Swagger Documentation](#-swagger-documentation)

## 📖 About the Project

This project is a **professional reference implementation** for building scalable RESTful APIs using the **NestJS** framework. It demonstrates modern backend development practices including:

- 🏗️ **Modular Architecture** - Clean separation of concerns with NestJS modules
- 🗃️ **Type-safe Database Access** - Using Prisma ORM with PostgreSQL
- 📚 **API Documentation** - Comprehensive Swagger/OpenAPI documentation
- ✅ **Data Validation** - Request validation using class-validator
- 🎯 **Custom Decorators** - Reusable Swagger decorators for cleaner code

## 🛠️ Technologies

| Technology | Description |
|------------|-------------|
| **NestJS v11** | Progressive Node.js framework for building efficient server-side applications |
| **Prisma v6** | Next-generation ORM for type-safe database access |
| **PostgreSQL** | Robust and reliable relational database |
| **Swagger/OpenAPI** | Interactive API documentation and testing |
| **TypeScript** | Strongly typed JavaScript for better development experience |
| **class-validator** | Decorator-based validation for DTOs |
| **class-transformer** | Object transformation and serialization |

## 🏛️ Architecture

The project follows NestJS's recommended modular architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Request                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   ValidationPipe (Global)                    │
│              Validates DTOs using class-validator            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Controller                            │
│         Handles HTTP requests and Swagger decorators         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Service                              │
│              Business logic and data processing              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Prisma Service                           │
│              Type-safe database operations                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Features

### User Management (CRUD)
- ✅ Create new users with validation
- ✅ List all users
- ✅ Find user by ID
- ✅ Find user by email
- ✅ Update user data
- ✅ Delete user

### API Documentation
- ✅ Interactive Swagger UI
- ✅ Custom reusable Swagger decorators
- ✅ Detailed request/response schemas
- ✅ Example values for all fields

### Data Validation
- ✅ DTO-based validation
- ✅ Automatic error messages
- ✅ Type coercion with ParseIntPipe

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/emanuelrodrigues2005/NestJS-API.git
   cd NestJS-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/database_name?schema=public"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run start:prod
   ```

## 📡 API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/user` | Create a new user |
| `GET` | `/user` | List all users |
| `GET` | `/user/:id` | Find user by ID |
| `GET` | `/user/email/:email` | Find user by email |
| `PUT` | `/user/:id` | Update user |
| `DELETE` | `/user/:id` | Delete user |

## 📁 Project Structure

```
src/
├── main.ts                    # Application entry point & Swagger setup
├── app.module.ts              # Root application module
├── app.controller.ts          # Root controller
├── app.service.ts             # Root service
│
├── prisma/                    # Prisma module
│   ├── prisma.module.ts       # Prisma module definition
│   └── prisma.service.ts      # Database connection service
│
└── user/                      # User feature module
    ├── user.module.ts         # User module definition
    ├── user.controller.ts     # HTTP request handlers
    ├── user.service.ts        # Business logic
    ├── user.swagger.ts        # Custom Swagger decorators
    └── dto/
        ├── create-user.dto.ts # Create user validation
        └── update-user.dto.ts # Update user validation

prisma/
├── schema.prisma              # Database schema definition
└── migrations/                # Database migrations
```

### Custom Swagger Decorators

This project uses **custom decorators** to keep controllers clean and reusable:

```typescript
// user.swagger.ts
export function ApiCreateUser() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a user' }),
        ApiResponse({ status: 201, description: 'User created successfully.' }),
        ApiResponse({ status: 400, description: 'Invalid input data.' }),
    );
}

// Usage in controller
@Post()
@ApiCreateUser()
create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
}
```

---

# 🇧🇷 Português

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Funcionalidades](#-funcionalidades)
- [Como Executar](#-como-executar)
- [Endpoints da API](#-endpoints-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Documentação Swagger](#-documentação-swagger)

## 📖 Sobre o Projeto

Este projeto é uma **implementação de referência profissional** para construção de APIs RESTful escaláveis usando o framework **NestJS**. Demonstra práticas modernas de desenvolvimento backend incluindo:

- 🏗️ **Arquitetura Modular** - Separação limpa de responsabilidades com módulos NestJS
- 🗃️ **Acesso Type-safe ao Banco** - Usando Prisma ORM com PostgreSQL
- 📚 **Documentação da API** - Documentação completa com Swagger/OpenAPI
- ✅ **Validação de Dados** - Validação de requisições usando class-validator
- 🎯 **Decorators Personalizados** - Decorators Swagger reutilizáveis para código mais limpo

## 🛠️ Tecnologias

| Tecnologia | Descrição |
|------------|-----------|
| **NestJS v11** | Framework Node.js progressivo para construção de aplicações server-side eficientes |
| **Prisma v6** | ORM de próxima geração para acesso type-safe ao banco de dados |
| **PostgreSQL** | Banco de dados relacional robusto e confiável |
| **Swagger/OpenAPI** | Documentação interativa e testes da API |
| **TypeScript** | JavaScript fortemente tipado para melhor experiência de desenvolvimento |
| **class-validator** | Validação baseada em decorators para DTOs |
| **class-transformer** | Transformação e serialização de objetos |

## 🏛️ Arquitetura

O projeto segue a arquitetura modular recomendada pelo NestJS:

```
┌─────────────────────────────────────────────────────────────┐
│                     Requisição do Cliente                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   ValidationPipe (Global)                    │
│              Valida DTOs usando class-validator              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Controller                            │
│        Lida com requisições HTTP e decorators Swagger        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Service                              │
│             Lógica de negócio e processamento                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Prisma Service                           │
│              Operações type-safe no banco                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Banco de Dados PostgreSQL                  │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Funcionalidades

### Gerenciamento de Usuários (CRUD)
- ✅ Criar novos usuários com validação
- ✅ Listar todos os usuários
- ✅ Buscar usuário por ID
- ✅ Buscar usuário por email
- ✅ Atualizar dados do usuário
- ✅ Deletar usuário

### Documentação da API
- ✅ Interface interativa Swagger
- ✅ Decorators Swagger customizados e reutilizáveis
- ✅ Schemas detalhados de request/response
- ✅ Valores de exemplo para todos os campos

### Validação de Dados
- ✅ Validação baseada em DTOs
- ✅ Mensagens de erro automáticas
- ✅ Coerção de tipos com ParseIntPipe

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Banco de dados PostgreSQL

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/emanuelrodrigues2005/NestJS-API.git
   cd NestJS-API
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` no diretório raiz:
   ```env
   DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/nome_do_banco?schema=public"
   ```

4. **Execute as migrations do banco**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie a aplicação**
   ```bash
   # Modo desenvolvimento
   npm run start:dev

   # Modo produção
   npm run start:prod
   ```

## 📡 Endpoints da API

### Endpoints de Usuário

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/user` | Criar um novo usuário |
| `GET` | `/user` | Listar todos os usuários |
| `GET` | `/user/:id` | Buscar usuário por ID |
| `GET` | `/user/email/:email` | Buscar usuário por email |
| `PUT` | `/user/:id` | Atualizar usuário |
| `DELETE` | `/user/:id` | Deletar usuário |

## 📁 Estrutura do Projeto

```
src/
├── main.ts                    # Ponto de entrada & configuração Swagger
├── app.module.ts              # Módulo raiz da aplicação
├── app.controller.ts          # Controller raiz
├── app.service.ts             # Service raiz
│
├── prisma/                    # Módulo Prisma
│   ├── prisma.module.ts       # Definição do módulo Prisma
│   └── prisma.service.ts      # Serviço de conexão com banco
│
└── user/                      # Módulo de usuário
    ├── user.module.ts         # Definição do módulo de usuário
    ├── user.controller.ts     # Handlers de requisições HTTP
    ├── user.service.ts        # Lógica de negócio
    ├── user.swagger.ts        # Decorators Swagger customizados
    └── dto/
        ├── create-user.dto.ts # Validação para criação
        └── update-user.dto.ts # Validação para atualização

prisma/
├── schema.prisma              # Definição do schema do banco
└── migrations/                # Migrations do banco de dados
```

### Decorators Swagger Customizados

Este projeto usa **decorators customizados** para manter os controllers limpos e reutilizáveis:

```typescript
// user.swagger.ts
export function ApiCreateUser() {
    return applyDecorators(
        ApiOperation({ summary: 'Criar um usuário' }),
        ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' }),
        ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' }),
    );
}

// Uso no controller
@Post()
@ApiCreateUser()
create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
}
```

---

<div align="center">

## 📝 License | Licença

This project is [MIT](LICENSE) licensed.

Este projeto está sob a licença [MIT](LICENSE).

---

**Made by Emanuel Rodrigues**

*Desenvolvido por Emanuel Rodrigues*

[![GitHub](https://img.shields.io/badge/GitHub-emanuelrodrigues2005-181717?style=for-the-badge&logo=github)](https://github.com/emanuelrodrigues2005)

</div>
