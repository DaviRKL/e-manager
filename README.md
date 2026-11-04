# 📦 e-manager

Um painel de gestão de estoque moderno, responsivo e internacionalizado. Desenvolvido como solução para o [Desafio 003 | Code Challenges - Experiência prática para desenvolvedores].

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://e-manager-tau.vercel.app)

## 🔗 Links Úteis

- **Live Demo (Vercel):** [https://e-manager-tau.vercel.app](https://e-manager-tau.vercel.app)
- **Protótipo (Figma):** [Acessar Design](https://www.figma.com/design/qyEDryZVxs1ehgiFFFnSkp/Desafio-003---React-Developer---Code-Challenges?node-id=4401-176&t=GOPMFpdndT3wbU8N-0)
- **Backend (Repositório):** [FRONT-CHALLENGE-e-manager-backend](https://github.com/code-challenges-org/FRONT-CHALLENGE-e-manager-backend)

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

## ✨ Funcionalidades

- **CRUD Completo:** Criação, leitura, edição e exclusão de produtos.
- **Dashboard Interativo:** Visão geral com produtos mais caros, total de produtos e produtos com estoque baixo (com limite configurável pelo usuário).
- **Paginação e Busca:** Filtro de pesquisa e paginação (10 itens por página) implementados no lado do cliente (Client-side).
- **Internacionalização (i18n):** Suporte nativo para troca instantânea entre Português e Inglês.
- **Tema Customizável:** Suporte a Light Mode e Dark Mode sincronizado com o Design System.
- **Design Responsivo:** Layout totalmente adaptado para dispositivos móveis com sidebar em modelo *Off-canvas*.

## 🚀 Como executar o projeto localmente

### 1. Pré-requisitos
Certifique-se de ter o Node.js (v18+) instalado. O projeto requer que a API backend esteja em execução.

- Clone e inicie o [Backend do Desafio](https://github.com/code-challenges-org/FRONT-CHALLENGE-e-manager-backend) (por padrão, ele rodará em `http://localhost:8000`).

### 2. Instalação do Frontend
Clone o repositório e instale as dependências:

```bash
git clone <seu-repositorio>
cd e-manager
npm install
```

### 3. Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto contendo a URL da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Rodando a Aplicação

```bash
# Inicia o servidor de desenvolvimento
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador. A aplicação redirecionará automaticamente para o seu locale padrão (ex: `/pt-br`).

## 🧪 Testes

O projeto conta com uma suíte abrangente de testes.

```bash
# Executa os testes unitários (Vitest)
npm run test

# Executa os testes de integração/E2E (Playwright)
# Certifique-se de que o app ou backend estejam configurados conforme o ambiente de teste
npx playwright test
```

## 📚 Storybook

Para visualizar e interagir com os componentes isolados da aplicação:

```bash
npm run storybook
```

## 📄 Estrutura de Pastas Principal

```text
src/
├── app/               # Rotas do Next.js (App Router) e layouts de internacionalização
├── components/        # Componentes globais e genéricos de UI (Dumb Components)
├── features/          # Componentes de domínio específico (Dashboard, Produtos)
├── hooks/             # Custom hooks (formatação, chamadas combinadas)
├── i18n/              # Configurações do next-intl e dicionários
├── services/          # Instância do Axios e funções de API
├── store/             # Configuração do Redux (slices de UI e Dashboard)
├── types/             # Definições de tipagem TypeScript
└── utils/             # Schemas de validação Zod, fontes e funções utilitárias
```