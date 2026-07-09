# AGENTS.md — Contexto para agentes de IA

## Visao geral

DevLinks e uma SPA frontend para gerenciamento de links pessoais (estilo Linktree). Frontend e backend sao repositorios separados. O frontend nao acessa banco de dados diretamente.

## Stack e versoes

| Tecnologia | Versao | Notas |
|---|---|---|
| React | 19 | `"type": "module"` no package.json |
| Vite | 8 | Plugin React 6 + Tailwind CSS 4 via plugin Vite |
| Tailwind CSS | 4 | Configuracao via CSS (`@theme` em index.css), NAO existe tailwind.config.js |
| TanStack React Query | 5 | Gerencia cache de `/meu-perfil` |
| Axios | 1.18 | Interceptors em `src/services/api.js` |
| React Router | 7 | BrowserRouter, rotas em `src/App.jsx` |
| Cypress | 15 | Apenas testes E2E, sem testes unitarios |
| Deploy | Vercel | SPA rewrite em vercel.json |

## Build & Test (comandos exatos)

```bash
npm run dev          # Vite dev server (porta 5173)
npm run build        # Build de producao para dist/
npm run lint         # ESLint flat config
npm run preview      # Preview do build local

# E2E (precisa do dev server rodando E backend acessivel)
npx cypress run      # Headless Electron
npx cypress open     # UI interativa

# Nao existe script de teste unitario. Nao existe `npm test`.
```

## Rodando localmente

1. `npm install`
2. Criar `.env` na raiz com `VITE_API_URL=http://localhost:3000` (ou API remota)
3. `npm run dev`
4. `.env` e `.env.example` contem `DATABASE_URL` (irrelevante para frontend) — o correto e `VITE_API_URL`

## Estrutura de pastas

```
src/
  components/
    RotaPrivada.jsx        # Guard de autenticacao (verifica localStorage)
    PublicProfile.jsx      # Perfil publico por USERNAME (usa fetch direto, NAO axios)
    SkeletonDashboard.jsx  # Loading skeleton do dashboard
  pages/
    Login.jsx              # Tela de login
    Cadastro.jsx           # Tela de cadastro
    Dashboard.jsx          # Painel autenticado (upload foto, CRUD links)
    PerfilPublico.jsx      # Perfil publico por ID (usa fetch direto + TanStack Query)
  services/
    api.js                 # Instancia Axios com interceptors (request: auth, response: toast erros)
  App.jsx                  # Rotas
  main.jsx                 # Entry point (StrictMode + QueryClientProvider)
  index.css                # Design tokens CSS via @theme (Tailwind v4)
```

## Convencoes de codigo

- **Idioma:** Variaveis, funcoes, comentarios e texto de UI em portugues brasileiro
- **Nomenclatura:** camelCase para variaveis/funcoes, PascalCase para componentes
- **Estilizacao:** Tailwind inline + CSS variables em index.css. Cores usam `style={{ color: 'var(--color-accent)' }}` ao inves de classes Tailwind para cores do design system
- **Estado:** TanStack Query para dados do servidor, useState para forms locais
- **Navegacao:** useNavigate() do React Router para redirects programaticos
- **Toasts:** react-hot-toast para feedback (toast.success, toast.error)

## Seguranca / Auth

- Token JWT armazenado em `localStorage` com chave `meu_token_vip`
- Interceptor em `src/services/api.js` injeta `Authorization: Bearer <token>` em todas as requisicoes
- `RotaPrivada.jsx` verifica APENAS a existencia do token no localStorage — a validacao JWT e feita pelo backend
- **Nao ha refresh de token.** Sessao expira sem aviso no frontend
- O componente `PublicProfile.jsx` usa URL hardcoded da API ao inves de `VITE_API_URL` — bug: se mudar a API, esse componente continua apontando para o Render antigo

## Gotchas importantissimos

1. **Duas rotas de perfil publico com funcoes diferentes:**
   - `/p/:id` → `PerfilPublico.jsx` (usa TanStack Query + fetch)
   - `/p/:username` → `PublicProfile.jsx` (usa useState + fetch com URL hardcoded)
   - Ambas fazem fetch direto com `fetch()`, NAO usam a instancia Axios

2. **Tailwind v4 sem tailwind.config.js:** A configuracao e via bloco `@theme` no `src/index.css`. Se precisar adicionar tokens, edite index.css, nao crie um config file

3. **Cores do design system sao CSS variables:** Nao use classes como `bg-green-500` ou `text-blue-600`. Use `style={{ backgroundColor: 'var(--color-accent)' }}` ou referencie as variaveis

4. **A API e um repo separado:** `github.com/tharciosantos/devlinks-api`. O frontend nao contem logica de banco de dados

5. **CI usa Node 20** (definido em cypress.yml) mas o runner usa Node 24. Ha um warning de deprecacao do Node 20 que pode ser ignorado

6. **Cypress depende da API externa em producao:** Na CI, os testes rodam contra `https://minha-api-lih7.onrender.com`. Se a API estiver off, os testes falham

## Padrao de commits

Formato: `<tipo>(escopo): descricao curta`

Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`

Exemplos:
```
feat(redesign): implementa estetica Terminal Developer no Dashboard
fix: corrige cor do hover para verde #00ff88
docs: adiciona DESIGN.md com especificacao do design system
chore: configura .gitignore para arquivos de contexto local
```

## Limitacoes conhecidas

- Sem testes unitarios (apenas E2E com Cypress)
- Sem dark mode toggle (tema e fixo escuro)
- `.env.example` contem `DATABASE_URL` (irrelevante para frontend) — deveria conter `VITE_API_URL`
- `PublicProfile.jsx` tem URL da API hardcoded ao inves de usar `VITE_API_URL`
- Sem tratamento de sessao expirada no frontend
- Sem componentes reutilizaveis (Button, Input, Card) — tudo inline nos pages
