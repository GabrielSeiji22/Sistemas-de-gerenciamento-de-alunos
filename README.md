# Sistema de Gerenciamento de Alunos

Projeto inicializado com:

- Express para a API REST
- React + Vite para o frontend
- PostgreSQL para persistência de dados

## Estrutura

- `server/`: backend em Express
- `client/`: frontend em React
- `docker-compose.yml`: container do PostgreSQL
- `package.json`: scripts raiz para rodar os serviços

## Pré-requisitos

- Node.js 18+
- npm
- Docker Desktop (opcional para subir o PostgreSQL via container)

## Configuração do banco

1. Copie as variáveis do exemplo:
   - `server/.env.example` para `server/.env`
2. Inicie o PostgreSQL:
   - `docker compose up -d postgres`
3. Se o Docker não estiver disponível, configure um PostgreSQL local na porta 5432 com as credenciais:
   - banco: `studentdb`
   - usuário: `appuser`
   - senha: `apppass`

## Como rodar

Na raiz do projeto:

```bash
npm install
npm run dev
```

Isso executa:

- API em `http://localhost:3001`
- Frontend em `http://localhost:5173`

## Scripts úteis

```bash
npm run dev:server
npm run dev:client
npm run db:up
npm run db:down
```

## Integrantes

- Renan Alves
- Gabriel Seiji
- Heriky Pereira
- Gabriel Victor
- Ivan Rodrigues Thiago
- Erick Miguel
