# 🎓 Treinamento NestJS + Prisma 7 + PostgreSQL

## Guia completo do zero à API REST funcional

---

## 1. Objetivo do treinamento

Construir uma API REST completa para gerenciamento de usuários (CRUD) utilizando:

- **NestJS 11** — Framework Node.js progressivo
- **Prisma ORM 7** — ORM type-safe com adapter PostgreSQL
- **PostgreSQL** — Banco de dados relacional
- **Swagger/OpenAPI** — Documentação interativa da API
- **TypeScript** — Tipagem estática
- **ESM** — ECMAScript Modules nativo

---

## 2. Pré-requisitos

| Ferramenta | Versão mínima | Recomendado |
|------------|---------------|-------------|
| Node.js | 20.19+ | 22 LTS |
| npm | 10+ | 12+ |
| Nest CLI | 11.x | 11.x |
| PostgreSQL | 14+ | 16+ |

### Verifique as versões instaladas

```bash
node --version
npm --version
nest --version
psql --version
```

### Instale o Nest CLI (caso não tenha)

```bash
npm install --global @nestjs/cli
```

> ⚠️ Alternativa sem instalação global: use `npx @nestjs/cli` no lugar de `nest`.

---

## 3. Criação inicial do projeto NestJS

```bash
nest new nome-da-api --package-manager npm
cd nome-da-api
npm run start:dev
```

O comando `nest new` faz perguntas interativas:
1. Escolha **npm** como gerenciador de pacotes
2. Aguarde a instalação das dependências

Acesse `http://localhost:3000` — você verá "Hello World!".

### Comandos úteis do NestJS

| Comando | Descrição |
|---------|-----------|
| `npm run start:dev` | Desenvolvimento com hot-reload |
| `npm run build` | Compilar para produção |
| `npm run start:prod` | Executar em produção |
| `npm run lint` | Verificar qualidade do código |

---

## 4. Estrutura inicial do NestJS

```
src/
├── main.ts              # Ponto de entrada da aplicação
├── app.module.ts        # Módulo raiz
├── app.controller.ts    # Controller raiz
└── app.service.ts       # Service raiz
```

### main.ts

Arquivo de bootstrap da aplicação:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### app.module.ts

Módulo raiz — agrupa todos os módulos, controllers e providers:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Controllers vs Services vs Modules

| Camada | Responsabilidade |
|--------|-----------------|
| **Controller** | Recebe requisições HTTP, define rotas e decorators Swagger |
| **Service** | Contém a lógica de negócio |
| **Module** | Agrupa controllers, services e imports relacionados |

### Injeção de Dependências

O NestJS utiliza **injeção de dependências** nativa. Basta declarar no construtor:

```typescript
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  // O NestJS resolve automaticamente a dependência
}
```

### Decorators principais

| Decorator | Uso |
|-----------|-----|
| `@Module()` | Define um módulo |
| `@Controller()` | Define um controller |
| `@Injectable()` | Define um provider/service |
| `@Get()`, `@Post()`, etc. | Define rotas HTTP |
| `@Body()`, `@Param()` | Extrai dados da requisição |
| `@Global()` | Torna o módulo global |

---

## 5. Instalação do Prisma 7 e PostgreSQL

```bash
# Dependências de runtime
npm install @prisma/client@7 @prisma/adapter-pg@7 pg dotenv

# Dependências de desenvolvimento
npm install --save-dev prisma@7 @types/pg

# ConfigModule (opcional, mas recomendado)
npm install @nestjs/config
```

### Função de cada pacote

| Pacote | Tipo | Função |
|--------|------|--------|
| `@prisma/client` | runtime | Prisma Client gerado para operações no banco |
| `@prisma/adapter-pg` | runtime | Adapter PostgreSQL para Prisma 7 |
| `pg` | runtime | Driver nativo do PostgreSQL para Node.js |
| `dotenv` | runtime | Carrega variáveis do arquivo `.env` |
| `@nestjs/config` | runtime | Módulo de configuração do NestJS (usa dotenv internamente) |
| `prisma` | dev | CLI do Prisma para migrations, geração, validação |
| `@types/pg` | dev | Tipagens TypeScript para o driver `pg` |

---

## 6. Inicialização do Prisma

Gere os arquivos iniciais de configuração:

```bash
npx prisma init --output ../src/generated/prisma
```

Isso cria:
- `prisma/schema.prisma` — Definição do schema do banco
- `prisma.config.ts` — Configuração do Prisma ORM (CLI)
- `.env` — Variáveis de ambiente

---

## 7. Configuração do ambiente

### .env (não versionado)

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
PORT=3000
```

### .env.example (versionado)

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
PORT=3000
```

> ⚠️ O `.env` não deve ser commitado. Adicione ao `.gitignore` se necessário.

---

## 8. Configuração do schema.prisma

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

> A URL do banco NÃO fica no schema.prisma. Ela é configurada no `prisma.config.ts`.

### Por que a URL não fica no schema?

No Prisma 7, a URL do banco é definida no `prisma.config.ts` para a CLI, e no `PrismaService` (via `ConfigService`) para a aplicação. Isso evita duplicação e mantém a separação de responsabilidades.

---

## 9. Configuração do prisma.config.ts

```typescript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

### Propriedades

| Propriedade | Descrição |
|-------------|-----------|
| `schema` | Caminho do arquivo schema.prisma |
| `migrations.path` | Diretório onde as migrations serão armazenadas |
| `datasource.url` | URL de conexão com o banco (lida de variável de ambiente) |
| `env("VAR")` | Função que resolve variáveis de ambiente (com suporte a dotenv) |

---

## 10. Criação do PrismaModule e PrismaService

```bash
nest g module prisma
nest g service prisma --no-spec
```

### PrismaService

```typescript
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    const connectionString =
      configService.getOrThrow<string>("DATABASE_URL");

    const adapter = new PrismaPg({ connectionString });

    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
```

### Explicação

| Componente | Função |
|------------|--------|
| `PrismaPg` | Adapter do Prisma 7 para conectar via driver `pg` |
| `ConfigService` | Lê a `DATABASE_URL` do ambiente com validação |
| `$connect()` | Estabelece conexão com PostgreSQL ao iniciar |
| `$disconnect()` | Fecha conexão ao desligar a aplicação |

### PrismaModule

```typescript
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

> `@Global()` permite injetar `PrismaService` em qualquer módulo sem importar `PrismaModule` novamente.

### ConfigModule no AppModule

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    // outros módulos...
  ],
})
export class AppModule {}
```

---

## 11. Criação de uma entidade com Nest CLI

```bash
nest g res <entidade>
```

Exemplo com User:

```bash
nest g res user
```

### Perguntas interativas

1. **Qual transporte usar?** → Selecione `REST API`
2. **Gerar CRUD completo?** → Selecione `Yes`

### Arquivos gerados

```
src/user/
├── user.module.ts             # Módulo da entidade
├── user.controller.ts         # Controller REST
├── user.service.ts            # Lógica de negócio
├── dto/
│   ├── create-user.dto.ts     # DTO de criação
│   └── update-user.dto.ts     # DTO de atualização
├── entities/
│   └── user.entity.ts         # Entidade (classe)
└── user.controller.spec.ts    # Testes unitários
```

> ⚠️ A entidade gerada pelo Nest CLI (`entities/user.entity.ts`) **não substitui** o model do Prisma. O model que persiste no banco é criado no `schema.prisma`.

---

## 12. Criação do model Prisma

No arquivo `prisma/schema.prisma`, adicione o model:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Atributos do Prisma

| Atributo | Descrição |
|----------|-----------|
| `@id` | Define a chave primária |
| `@default(autoincrement())` | Auto-incremento (para Int) |
| `@unique` | Índice único |
| `@default(now())` | Valor padrão = data/hora atual |
| `@updatedAt` | Atualiza automaticamente na modificação |

---

## 13. DTOs e validação

### CreateUserDto

```typescript
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'exemplo@email.com', description: 'E-mail do usuário' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
  @IsString()
  name: string;
}
```

### UpdateUserDto

```typescript
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

> `PartialType` torna todos os campos opcionais — ideal para atualização parcial.

### Validação global (main.ts)

```typescript
app.useGlobalPipes(new ValidationPipe());
```

### Pacotes necessários

```bash
npm install class-validator class-transformer
```

---

## 14. Controller e Service

### Fluxo da requisição

```
Request → Controller → Service → PrismaService → PrismaPg → PostgreSQL
```

### UserService

```typescript
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findById(id);
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  async delete(id: number) {
    await this.findById(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
```

### UserController

```typescript
import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
```

### Métodos do Prisma Client para CRUD

| Operação | Método Prisma |
|----------|--------------|
| Criar | `prisma.user.create({ data })` |
| Listar | `prisma.user.findMany()` |
| Buscar por ID | `prisma.user.findUnique({ where: { id } })` |
| Atualizar | `prisma.user.update({ where: { id }, data })` |
| Deletar | `prisma.user.delete({ where: { id } })` |

---

## 15. Formatação, validação, migration e geração

Sequência correta após criar ou alterar um model no schema.prisma:

```bash
# 1. Formatar o schema
npx prisma format

# 2. Validar o schema
npx prisma validate

# 3. Criar migration (desenvolvimento)
npx prisma migrate dev --name init

# 4. Gerar Prisma Client
npx prisma generate
```

### Comandos e seus ambientes

| Comando | Ambiente | Descrição |
|---------|----------|-----------|
| `prisma format` | Todos | Formata o schema |
| `prisma validate` | Todos | Valida o schema |
| `prisma generate` | Todos | Gera o Prisma Client (necessário após alterações) |
| `prisma migrate dev` | Desenvolvimento | Cria migration e aplica |
| `prisma migrate deploy` | Produção | Aplica migrations pendentes |
| `prisma migrate status` | Todos | Verifica estado das migrations |
| `prisma studio` | Desenvolvimento | Interface gráfica do banco |

> No Prisma 7, o `prisma generate` deve ser executado **explicitamente** após alterações no schema ou migrations. Configure no `package.json` como `prebuild`.

---

## 16. Execução da API

```bash
# Desenvolvimento (com hot-reload)
npm run start:dev

# Build de produção
npm run build

# Produção
npm run start:prod
```

### Diferença entre desenvolvimento e produção

| Aspecto | Desenvolvimento | Produção |
|---------|----------------|----------|
| Hot-reload | Sim (`nest start --watch`) | Não |
| Compilação | Em memória | Em disco (`dist/`) |
| Otimização | Mínima | Total |
| Logs | Detalhados | Essenciais |

---

## 17. Swagger

Acesse em: `http://localhost:3000/api`

### Configuração no main.ts

```typescript
const config = new DocumentBuilder()
  .setTitle('Minha API')
  .setDescription('Descrição da API')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

### Decorators principais

| Decorator | Uso |
|-----------|-----|
| `@ApiTags()` | Agrupa endpoints |
| `@ApiOperation()` | Descreve o endpoint |
| `@ApiResponse()` | Documenta resposta |
| `@ApiParam()` | Documenta parâmetro de rota |
| `@ApiProperty()` | Documenta propriedade do DTO |
| `@ApiBearerAuth()` | Adiciona autenticação |

---

## 18. Testes dos endpoints

```bash
# Criar usuário
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@example.com"}'

# Listar todos
curl http://localhost:3000/user

# Buscar por ID
curl http://localhost:3000/user/1

# Atualizar
curl -X PUT http://localhost:3000/user/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"João Atualizado"}'

# Deletar
curl -X DELETE http://localhost:3000/user/1
```

---

## 19. Auditoria e segurança das dependências

```bash
# Verificar vulnerabilidades
npm audit

# Relatório detalhado em JSON
npm audit --json

# Corrigir automaticamente (sem breaking changes)
npm audit fix

# Auditoria apenas de produção
npm audit --omit=dev

# Verificar versões disponíveis
npm outdated

# Explicar dependência de um pacote
npm explain <pacote>
```

> ⚠️ Não use `npm audit fix --force` sem avaliar as consequências — pode instalar versões que quebram o projeto.

---

## 20. Solução de problemas

### DATABASE_URL ausente

```
Erro: PrismaConfigEnvError: Cannot resolve environment variable: DATABASE_URL
```

**Solução:** Crie o arquivo `.env` na raiz com a URL correta do PostgreSQL.

---

### PostgreSQL indisponível

```
Erro: Error querying the database: db error: FATAL: database "..." does not exist
```

**Solução:** Verifique se:
- O PostgreSQL está rodando: `sudo systemctl status postgresql`
- O banco foi criado: `createdb nome_do_banco`
- A URL no `.env` está correta

---

### Erro de autenticação

```
Erro: Error querying the database: db error: FATAL: password authentication failed
```

**Solução:** Verifique usuário e senha na `DATABASE_URL`. Use `psql -U usuario -d banco` para testar.

---

### Prisma Client não gerado

```
Erro: Cannot find module '../generated/prisma/client.js'
```

**Solução:** Execute `npx prisma generate` antes do build. Configure como `prebuild` no `package.json`.

---

### Import incorreto do Client

**Erro:** `PrismaClient is not a constructor`

**Solução:** No Prisma 7 com generator `prisma-client`, importe do caminho gerado:

```typescript
import { PrismaClient } from '../generated/prisma/client.js';
```

---

### Erro de ESM

```
Erro: Cannot use import statement outside a module
```

**Solução:** Adicione `"type": "module"` no `package.json` e use extensão `.js` nos imports de arquivos locais.

---

### Extensão .js em imports TypeScript

Com `"module": "NodeNext"` e `"type": "module"`, o TypeScript exige extensão `.js` nos imports relativos:

```typescript
// Correto
import { AppModule } from './app.module.js';

// Incorreto
import { AppModule } from './app.module';
```

---

### Migrations divergentes

```
Erro: Migration `...` was applied to the database but is not found in the project
```

**Solução:** Execute `npx prisma migrate diff` para verificar diferenças e `npx prisma migrate resolve` para resolver.

---

### Porta ocupada

```
Erro: listen EADDRINUSE :::3000
```

**Solução:** Mude a porta no `.env` ou mate o processo:

```bash
kill $(lsof -t -i:3000)
```

---

### Peer dependencies

```
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solução:** Use `npm install --legacy-peer-deps` temporariamente ou atualize as versões incompatíveis.

---

### Falhas no npm audit

Nem toda vulnerabilidade tem correção disponível sem breaking changes. Documente:

- Pacote vulnerável
- Severidade
- Cadeia de dependência
- Motivo de não correção
- Impacto real (produção ou desenvolvimento)

---

## 21. Checklist final

- [ ] Dependências instaladas (`npm install`)
- [ ] PostgreSQL acessível (`psql -U usuario -d banco`)
- [ ] `.env` configurado com `DATABASE_URL`
- [ ] Prisma validado (`npx prisma validate`)
- [ ] Migration aplicada (`npx prisma migrate dev`)
- [ ] Prisma Client gerado (`npx prisma generate`)
- [ ] Build aprovado (`npm run build`)
- [ ] Testes aprovados (`npm test`)
- [ ] Swagger funcionando (`http://localhost:3000/api`)
- [ ] Auditoria executada (`npm audit && npm audit --omit=dev`)
- [ ] Zero vulnerabilidades críticas (ou justificativa documentada)

---

## 22. Comandos executados nesta atualização

Os comandos abaixo foram executados durante a migração do Prisma 6 → 7 e atualização do projeto:

| Comando | Finalidade | Resultado |
|---------|-----------|-----------|
| `npm install @prisma/client@7 @prisma/adapter-pg@7 pg @nestjs/config` | Instalar Prisma 7 e dependências | ✅ Sucesso |
| `npm install --save-dev prisma@7 @types/pg` | Instalar Prisma CLI e tipos | ✅ Sucesso |
| `npm install` | Atualizar lockfile | ✅ Sucesso |
| `npx prisma format` | Formatar schema | ✅ Sucesso |
| `npx prisma validate` | Validar schema | ✅ Sucesso |
| `npx prisma generate` | Gerar Prisma Client | ✅ Sucesso |
| `npm run build` | Compilar TypeScript | ✅ Sucesso |
| `npm run lint` | Verificar código | ✅ 0 erros, 2 warnings (pré-existentes) |
| `npm test` | Executar testes unitários | ✅ 1 passed |
| `npm run test:e2e` | Executar testes e2e | ✅ 1 passed |
| `npm audit` | Auditoria de segurança | ✅ 27 high (0 critical) |
| `npm audit --omit=dev` | Auditoria produção | ✅ 2 high (js-yaml via @nestjs/swagger) |

### Pendências

- Testes com conexão real ao PostgreSQL não foram executados (indisponível no ambiente).
- Testes dos endpoints com `curl` não foram realizados (sem banco).
- As 27 vulnerabilidades `high` restantes são de dependências transitivas de dev (Jest, ESLint) — exigiriam `--force` com breaking changes.
- As 2 vulnerabilidades `high` em produção são do `js-yaml` via `@nestjs/swagger` — sem versão corrigida estável disponível sem migrar para alpha.

---

> 📚 **Material de treinamento completo** — NestJS 11 + Prisma 7 + PostgreSQL + Swagger + ESM
