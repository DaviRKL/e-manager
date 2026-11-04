# 📦 e-manager

Um painel de gestão de estoque moderno, responsivo e internacionalizado. Desenvolvido como solução para o [Desafio 003 | Code Challenges - Experiência prática para desenvolvedores](https://www.figma.com/design/qyEDryZVxs1ehgiFFFnSkp/Desafio-003---React-Developer---Code-Challenges?node-id=4401-176&t=GOPMFpdndT3wbU8N-0).

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://e-manager-tau.vercel.app)
[![Backend on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://front-challenge-e-manager-backend.onrender.com)
[![Database on Neon](https://img.shields.io/badge/Database-Neon.tech-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)

## 🔗 Links Úteis

- **Live Demo (Vercel):** [https://e-manager-tau.vercel.app](https://e-manager-tau.vercel.app)
- **Protótipo (Figma):** [Acessar Design no Figma](https://www.figma.com/design/qyEDryZVxs1ehgiFFFnSkp/Desafio-003---React-Developer---Code-Challenges?node-id=4401-176&t=GOPMFpdndT3wbU8N-0)
- **Backend Fork (Repositório):** [FRONT-CHALLENGE-e-manager-backend](https://github.com/DaviRKL/FRONT-CHALLENGE-e-manager-backend)

---

## 🌐 Arquitetura e Deploy em Produção

A aplicação foi publicada utilizando uma infraestrutura moderna de nuvem separada em camadas:

1. **Frontend (Vercel):**
   - Aplicação Next.js (App Router) hospedada na Vercel com build otimizado e integração contínua.
   - Variáveis de ambiente configuradas para consumir a API de produção via `NEXT_PUBLIC_API_URL`.

2. **Backend (Render):**
   - API Node.js/Express hospedada no Web Service do Render a partir do repositório forkeado.
   - Foram realizados ajustes finos nos scripts de build/compilação e adicionado um **script de seed (`npm run seed`)** para popular o banco de dados com massa de testes representativa (mais de 200 produtos).

3. **Banco de Dados (Neon.tech):**
   - Banco de dados **PostgreSQL Serverless** hospedado na plataforma Neon.tech.
   - Conectado diretamente via Prisma ORM com execução automatizada de migrações (`npx prisma migrate deploy`) durante a esteira de deployment.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as ferramentas e padrões mais modernos do ecossistema front-end:

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **State Management (Client):** Redux Toolkit (Modo claro/escuro, Configurações do Dashboard)
- **State Management (Server):** TanStack Query (React Query)
- **Data Fetching:** Axios
- **Formulários e Validação:** React Hook Form + Zod
- **Internacionalização:** `next-intl` (pt-BR e en-US)
- **Documentação de UI:** Storybook
- **Testes Unitários:** Vitest + React Testing Library
- **Testes E2E:** Playwright
- **Ícones:** Lucide React

---

## ✨ Funcionalidades

- **CRUD Completo:** Criação, leitura, edição e exclusão de produtos integrados à API.
- **Dashboard Interativo:** Visão geral com produtos mais caros, total de produtos e alertas de estoque baixo (com limite numérico configurável em tempo real pelo usuário).
- **Paginação e Busca:** Filtro de pesquisa dinâmica e paginação em cards/tabelas (10 itens por página) desenvolvidas em Client-Side para lidar de forma performática com a lista completa enviada pela API.
- **Internacionalização (i18n):** Suporte completo para troca dinâmica de idioma entre Português (pt-BR) e Inglês (en-US).
- **Tema Customizável:** Alternância entre Light Mode e Dark Mode sincronizada com as cores do Style Guide do Figma.
- **Design Responsivo (Mobile First):** Layout adaptado para dispositivos móveis com Sidebar em formato *Off-canvas* (menu hambúrguer) e tabelas com rolagem horizontal controlada.

---

## 🚀 Como executar o projeto localmente

### 1. Pré-requisitos
Certifique-se de ter o Node.js (v18+) instalado. O projeto requer que a API backend esteja em execução.

- Clone e inicie o repositório do [Backend Fork do Desafio](https://github.com/code-challenges-org/FRONT-CHALLENGE-e-manager-backend.git).
- Por padrão, o backend rodará em `http://localhost:8000`.

### 2. Instalação do Frontend
Clone o repositório do frontend e instale as dependências:

```bash
git clone <seu-repositorio-frontend>
cd e-manager
npm install
```

### 3. Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto apontando para o seu ambiente da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Rodando a Aplicação

```bash
# Inicia o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador. A aplicação redirecionará automaticamente para o seu locale padrão (ex: `/pt-br`).

---

## 🧪 Testes

O projeto conta com uma suíte abrangente de testes unitários e de integração.

```bash
# Executa os testes unitários com Vitest
npm run test

# Executa os testes E2E / Integração com Playwright
npx playwright test
```

---

## 📚 Storybook

Para visualizar e interagir com a documentação isolada dos componentes da UI:

```bash
npm run storybook
```

---

## 📄 Estrutura de Pastas Principal

```text
src/
├── app/               # Rotas do Next.js (App Router) e layouts de internacionalização
├── components/        # Componentes globais e genéricos de UI (Dumb Components & Layout)
├── features/          # Módulos de domínio específico (Dashboard, Produtos, Modais)
├── hooks/             # Custom hooks (formatação de moeda, chamadas e utilitários)
├── i18n/              # Configurações do next-intl e arquivos de dicionário (pt-BR e en-US)
├── services/          # Instância do Axios e funções de comunicação com a API
├── store/             # Store do Redux Toolkit (slices de UI e configurações do Dashboard)
├── types/             # Definições de contratos TypeScript (Product, DTOs, etc)
└── utils/             # Schemas de validação Zod, fontes e formatadores
```
