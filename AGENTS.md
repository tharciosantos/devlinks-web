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
4. `.env` e `.env.example` contem `VITE_API_URL` — documentacao correta

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
- `PublicProfile.jsx` tem URL da API hardcoded ao inves de usar `VITE_API_URL`
- Sem tratamento de sessao expirada no frontend
- Sem componentes reutilizaveis (Button, Input, Card) — tudo inline nos pages

## Design System (Terminal Developer)

Cores sao CSS variables em `src/index.css` via `@theme`:

| Variavel | Valor | Uso |
|----------|-------|-----|
| `--color-bg-primary` | #0a0a0a | Fundo principal |
| `--color-bg-surface` | #111111 | Cards, nav, superficies |
| `--color-bg-elevated` | #1a1a1a | Elementos elevados |
| `--color-border-default` | #2a2a2a | Bordas padrao |
| `--color-text-primary` | #e5e5e5 | Texto principal |
| `--color-text-secondary` | #aaaaaa | Texto secundario |
| `--color-text-muted` | #888888 | Texto muted/comentarios |
| `--color-accent` | #00ff88 | Acento principal (verde) |
| `--color-accent-alt` | #00d4ff | Hover/links (ciano) |
| `--color-error` | #ff4444 | Erros |

**NUNCA use classes Tailwind para cores.** Use:
```jsx
style={{ backgroundColor: 'var(--color-accent)' }}
style={{ color: 'var(--color-text-primary)' }}
```

**Tipografia:** JetBrains Mono (monospace) em toda a interface.

**Bordas:** Cantos retos (0px radius). Nao use `rounded-lg`, `rounded-xl`, etc.

## Variaveis de ambiente

| Variavel | Obrigatoria | Descricao |
|----------|-------------|-----------|
| `VITE_API_URL` | Sim | URL base da API (ex: `http://localhost:3000` ou `https://minha-api-lih7.onrender.com`) |

Quando `VITE_API_URL` nao esta definida, o fallback e `http://localhost:3000`.

## Fluxo de autenticacao

```
1. Login → POST /login → recebe token JWT
2. Token salvo em localStorage (chave: meu_token_vip)
3. Interceptor injeta Authorization: Bearer <token> em cada request
4. RotaPrivada.jsx verifica existencia do token
5. Logout → remove token → redireciona para /
```

**Nao ha refresh de token.** A sessao expira sem aviso no frontend.

## Endpoints consumidos pelo frontend

| Metodo | Endpoint | Auth | Descricao |
|--------|----------|------|-----------|
| POST | `/login` | Nao | Login, retorna JWT |
| POST | `/usuario` | Nao | Cadastro de usuario |
| GET | `/meu-perfil` | Sim | Dados do perfil logado |
| PATCH | `/usuario/foto` | Sim | Upload de avatar (FormData) |
| POST | `/usuario/link` | Sim | Criar link |
| DELETE | `/usuario/link/:id` | Sim | Excluir link |
| GET | `/p/:id` | Nao | Perfil publico por ID |

## Troubleshooting

| Erro | Causa | Solucao |
|------|-------|---------|
| Build falha com "Unexpected token" | Caractere JSX invalido (ex: `>`) | Use `&gt;` ou `{'>'}` |
| Cypress "ECONNREFUSED" | Backend/dev server off | Inicie ambos antes de rodar testes |
| Toasts nao aparecem | Toaster nao esta no App.jsx | Verifique import no App.jsx |
| Cor errada no hover | Usou `--color-accent-alt` | Use `--color-accent` (verde) |
| Perfil publico nao atualiza | URL hardcoded em PublicProfile.jsx | Bug conhecido, use PerfilPublico.jsx |

## Fluxo Git Obrigatorio (PRIORIDADE MAXIMA)

Toda tarefa DEVE seguir este fluxo completo, SEM EXCECAO:

```
1. BRANCH   → Criar branch com nome descritivo (feat/, fix/, chore/)
2. ALTERACOES → Implementar mudancas (pode ser em etapas)
3. COMMITS  → Commits semanticos (feat, fix, etc.) a cada etapa logica
4. PUSH     → Push da branch para origin
5. PR       → Criar Pull Request com titulo e body descritivos
6. TESTES   → Rodar build + testes principais para verificar se tudo funciona
7. LIMPEZA  → Apos merge, voltar para main, deletar branch local e remota
```

**Antes de criar o PR, sempre rodar:**
```bash
npm run build     # Verificar se build passa
npm run lint      # Verificar se nao ha erros de lint
npm run dev       # Testar manualmente as funcionalidades alteradas
```

### Template de PR

```markdown
## Summary
- Resumo das mudancas (1-3 bullet points)

## Mudancas
- Arquivo alterado: descricao da alteracao

## Como testar
- Passos para testar a funcionalidade
```

### Formato de commits

`<tipo>(escopo): descricao curta`

Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`

### Comandos

```bash
# 1. Criar branch
git checkout -b feat/nome-da-feature

# 2. Desenvolver e commitar
git add src/arquivo.jsx
git commit -m "feat(dashboard): descricao da mudanca"

# 3. Push
git push -u origin feat/nome-da-feature

# 4. Criar PR (pelo GitHub ou gh CLI)
gh pr create --title "feat(dashboard): titulo" --body "corpo do PR"

# 5. Apos merge, limpar
git checkout main
git pull origin main
git branch -d feat/nome-da-feature
git push origin --delete feat/nome-da-feature
```

**NUNCA fazer alteracoes direto na main.**
