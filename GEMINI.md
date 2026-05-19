# 🚀 Liga de Algoritmos PUCRS - Frontend (App) - AI Developer Guidelines

Este arquivo contém as diretrizes e o contexto do projeto frontend da Liga de Algoritmos da PUCRS. Ele serve como o guia principal para assistentes de IA (como o Gemini) entenderem a arquitetura, as bibliotecas utilizadas e as regras de desenvolvimento do projeto.

---

## 🛠️ Tech Stack & Arquitetura

O projeto utiliza uma stack moderna de frontend baseada no ecossistema React e Vite, focada em performance, escalabilidade e excelente experiência de desenvolvimento (DX) e do usuário (UX).

### ⚙️ Core
- **Framework:** React 19 + TypeScript
- **Bundler/Build Tool:** Vite 7
- **Roteamento:** TanStack Router (File-based routing via `@tanstack/router-plugin`)
- **Data Fetching & State Management:** TanStack Query v5 (React Query)
- **Validação & Schemas:** Zod
- **Formulários:** React Hook Form (`@hookform/resolvers/zod`)
- **API SDK:** Gerado via `openapi-generator-cli` a partir da API NestJS.

### 🎨 Estilização & UI
- **Estilização Base:** TailwindCSS v4 (via plugin Vite `@tailwindcss/vite`)
- **Componentes Base:** shadcn/ui (Radix UI) + Tailwind Merge / clsx
- **Ícones:** Lucide React & React Icons
- **Animações:** Framer Motion & GSAP
- **Suporte a Temas:** Next Themes (Dark/Light mode)

---

## 🏗️ Estrutura de Diretórios e Regras de Organização

A arquitetura de pastas segue um padrão modular dentro da pasta `src`:

- `src/api/sdk`: Contém o SDK gerado automaticamente pelo OpenAPI para chamadas ao backend. **NÃO EDITE MANUALMENTE**. Use o comando `npm run generate:sdk` caso precise atualizar.
- `src/components/`: Componentes reutilizáveis globalmente.
  - `src/components/ui/`: Componentes base da interface gerados pelo `shadcn/ui`.
- `src/routes/`: Definição de rotas do TanStack Router. Utiliza a abordagem baseada em arquivos (`file-based routing`).
- `src/lib/`: Funções utilitárias (ex: `utils.ts` do shadcn).
- `src/hooks/`: Custom React Hooks.

### 📦 Diretrizes de Código e Padrões

1. **Desenvolvimento Orientado a Componentes (Component-Driven)**
   - Crie componentes pequenos, focados e reutilizáveis.
   - Sempre utilize os componentes do `shadcn/ui` na pasta `components/ui` como blocos de construção primários.
   - Adicione novos componentes shadcn através do comando `npm run shadcn -- <nome do componente>`.

2. **Roteamento e Estrutura de Páginas**
   - Utilizamos o TanStack Router. Adicionar uma nova rota geralmente envolve criar um arquivo dentro do diretório `routes/` segundo a convenção de nomenclatura do TanStack Router.
   - Mantenha a lógica de carregamento de dados (loaders) o mais próxima possível da definição da rota para aproveitar os benefícios de pre-fetching do TanStack Router e integração com React Query.

3. **Comunicação com a API**
   - Utilize as instâncias da API geradas em `src/api/sdk` e consuma-as utilizando hooks do `@tanstack/react-query` (ex: `useQuery`, `useMutation`).
   - Mantenha as mutations e queries encapsuladas em hooks customizados (em `src/hooks/` ou dentro da pasta do domínio da funcionalidade) em vez de escrever `useQuery` diretamente no componente da tela.

4. **Tratamento de Formulários e Validação**
   - Use **Zod** para definir schemas rigorosos.
   - Use **React Hook Form** integrado com os resolvers do Zod e os componentes de `Form` baseados no shadcn/ui.
   - Mantenha as mensagens de erro de validação amigáveis para o usuário, preferencialmente em português.

5. **Estilização e Animação**
   - Esteja ciente de que o projeto utiliza **TailwindCSS v4**. O arquivo principal de CSS provávelmente utiliza a nova sintaxe `@theme` em vez do `tailwind.config.ts`.
   - Adicione estilos via classes utilitárias no `className`. Utilize a função utilitária `cn()` (`clsx` + `tailwind-merge`) localizada em `src/lib/utils.ts` quando for construir componentes com classes condicionais.
   - Para animações complexas, verifique as bibliotecas instaladas (`framer-motion` e `gsap`). Sempre pense em feedbacks visuais para interações do usuário.

6. **Boas Práticas Gerais**
   - Evite "any". Tipifique os objetos com precisão no TypeScript.
   - Sempre que fizer alterações na estrutura do projeto, tenha certeza de que a estrutura base (Tailwind, Vite, etc) continua compilando com `npm run build`.
   - Remova importações e variáveis não utilizadas. Mantenha o arquivo sem lints de erro.

---

## 🤖 Como a IA deve atuar neste repositório

1. **Contexto Antes da Ação:** Sempre analise `package.json`, a estrutura de rotas em `src/routes`, e a integração API (SDK) antes de sugerir ou implementar uma nova feature.
2. **Respeite o Design System:** Use o Shadcn/UI existente. Se for sugerir a criação de um novo elemento, procure primeiro por componentes pré-construídos que possam ser combinados.
3. **Padrões de Nomenclatura:**
   - Componentes: PascalCase (ex: `UserProfile.tsx`)
   - Rotas/Arquivos auxiliares: kebab-case ou camelCase (seguir convenção da pasta).
   - Constantes e Env Vars: UPPER_SNAKE_CASE.
4. **Respostas Diretas e Funcionais:** Entregue o código modificado que pode ser utilizado em produção ou na branch de feature, incluindo as validações e as importações corretas.
