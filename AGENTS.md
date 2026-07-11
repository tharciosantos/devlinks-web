# AGENTS.md — Manual Operacional para Agentes de IA

**Projeto:** DevLinks (frontend)
**Repositório:** `github.com/tharciosantos/devlinks` (frontend) — API em `github.com/tharciosantos/devlinks-api`
**Tipo:** SPA React de gerenciamento de links pessoais (estilo Linktree)
**Versão do documento:** 1.0
**Última revisão:** 2026

---

## Índice

1. [Introdução](#1-introdução)
2. [Missão do Agente](#2-missão-do-agente)
3. [Filosofia do Projeto](#3-filosofia-do-projeto)
4. [Stack e Versões](#4-stack-e-versões)
5. [Estrutura de Pastas](#5-estrutura-de-pastas)
6. [Ordem de Prioridade](#6-ordem-de-prioridade)
7. [Workflow Obrigatório](#7-workflow-obrigatório)
8. [Workflow Git](#8-workflow-git)
9. [Commits (Conventional Commits)](#9-commits-conventional-commits)
10. [Pull Request](#10-pull-request)
11. [Checklists](#11-checklists)
12. [Validação](#12-validação)
13. [Padrões de Código](#13-padrões-de-código)
14. [Design System](#14-design-system)
15. [Segurança e Autenticação](#15-segurança-e-autenticação)
16. [Regras para IA](#16-regras-para-ia)
17. [O Que Nunca Fazer](#17-o-que-nunca-fazer)
18. [Performance](#18-performance)
19. [Gotchas e Limitações Conhecidas](#19-gotchas-e-limitações-conhecidas)
20. [Troubleshooting](#20-troubleshooting)
21. [Exemplos Completos](#21-exemplos-completos)
22. [Fluxograma Geral](#22-fluxograma-geral)

---

## 1. Introdução

### 1.1 Objetivo

Este documento é o manual operacional único para qualquer agente de IA (Claude, GPT, Copilot Workspace, ou qualquer outro agente autônomo/semi-autônomo) que for ler, modificar, revisar ou abrir Pull Requests neste repositório.

Ele não substitui o `README.md` do projeto — o README é voltado a humanos que querem entender o produto. Este `AGENTS.md` é voltado a agentes que vão **operar** dentro do repositório: entender o código, seguir convenções, validar mudanças e produzir um fluxo de trabalho previsível.

### 1.2 Escopo

Este documento cobre:

- Como o agente deve interpretar tarefas e priorizar trabalho
- Qual fluxo de Git e commits deve ser seguido, sem exceção
- Quais padrões de código, nomenclatura e arquitetura devem ser respeitados
- Quais comandos de validação são obrigatórios antes de qualquer commit ou PR
- Quais limitações reais o projeto possui hoje (para que o agente não assuma capacidades que não existem)

Este documento **não** cobre a API (`devlinks-api`), que é um repositório separado com seu próprio `AGENTS.md`.

### 1.3 Como Utilizar Este Documento

- Antes de iniciar qualquer tarefa, o agente deve ler as seções 4 (Stack), 6 (Ordem de Prioridade) e 19 (Gotchas).
- Antes de commitar, o agente deve reler a seção 11 (Checklists) e 12 (Validação).
- Antes de abrir um PR, o agente deve reler a seção 10 (Pull Request).
- Em caso de dúvida sobre o que é permitido, a seção 16 (Regras para IA) e 17 (O Que Nunca Fazer) têm prioridade sobre qualquer inferência do agente.

Este documento é a **fonte única de verdade** para decisões de processo. Em caso de conflito entre o que o agente "acha razoável" e o que está escrito aqui, este documento vence.

---

## 2. Missão do Agente

O agente que trabalha neste repositório deve se comportar como um **engenheiro sênior cuidadoso**, não como um gerador de código genérico. Isso significa, na prática:

1. **Entender antes de escrever.** Nenhuma linha de código deve ser produzida antes de o agente confirmar que entendeu o pedido, o arquivo afetado e o impacto da mudança.
2. **Preservar o que já funciona.** DevLinks é um projeto pequeno, sem testes unitários e sem rede de segurança extensa (ver seção 19). Isso não é uma licença para "melhorar tudo" — é um motivo para ser **mais** conservador, não menos.
3. **Produzir diffs pequenos e revisáveis.** Um PR de 300 linhas misturando 4 assuntos é uma falha de processo, não uma entrega eficiente.
4. **Ser honesto sobre o estado do projeto.** O agente nunca deve descrever uma funcionalidade como "testada" ou "validada" se apenas o build passou. Rodar `npm run lint` não é a mesma coisa que rodar Cypress, e nenhum dos dois substitui teste manual.
5. **Seguir o fluxo de Git obrigatório** (seção 8) mesmo em tarefas pequenas. Não existe "essa mudança é tão simples que não precisa de branch".

---

## 3. Filosofia do Projeto

DevLinks é deliberadamente simples. As decisões de arquitetura refletem isso, e o agente deve respeitar essa simplicidade em vez de tentar "enterprise-ficar" o projeto.

| Princípio                   | O que significa aqui                                                                                                                                                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Simplicidade**            | Preferir a solução mais direta. Não introduzir camadas de abstração (ex: Redux, Context genérico, custom hooks especulativos) sem necessidade concreta e imediata.                                                                                                |
| **Consistência**            | Um componente novo deve parecer que foi escrito pela mesma pessoa que escreveu o resto do projeto — mesmo padrão de nomenclatura, mesmo uso de CSS variables, mesmo idioma (português).                                                                           |
| **Previsibilidade**         | Um agente lendo o código pela primeira vez deve conseguir prever onde uma função está e o que ela faz, só pelo nome do arquivo/pasta.                                                                                                                             |
| **Legibilidade**            | Código óbvio é melhor que código "esperto". Comentários em português, curtos, apenas quando o "porquê" não é óbvio pelo código.                                                                                                                                   |
| **Mudanças pequenas**       | Um PR resolve um problema. Não dois, não três.                                                                                                                                                                                                                    |
| **Responsabilidade única**  | Cada componente/página tem uma razão de existir. `Dashboard.jsx` não deveria, por exemplo, também conter lógica de autenticação de outra rota.                                                                                                                    |
| **Reutilização consciente** | O projeto hoje **não tem** biblioteca de componentes (Button, Input, Card) — tudo é inline nas páginas (ver seção 19). Isso é uma dívida técnica conhecida, não um convite para o agente refatorar tudo de uma vez sem que isso tenha sido pedido explicitamente. |

---

## 4. Stack e Versões

| Tecnologia           | Versão | Notas                                                                               |
| -------------------- | ------ | ----------------------------------------------------------------------------------- |
| React                | 19     | `"type": "module"` no `package.json`                                                |
| Vite                 | 8      | Plugin React 6 + Tailwind CSS 4 via plugin Vite                                     |
| Tailwind CSS         | 4      | Configuração via CSS (`@theme` em `index.css`). **Não existe** `tailwind.config.js` |
| TanStack React Query | 5      | Gerencia cache de `/meu-perfil`                                                     |
| Axios                | 1.18   | Interceptors em `src/services/api.js`                                               |
| React Router         | 7      | `BrowserRouter`, rotas em `src/App.jsx`                                             |
| Cypress              | 15     | Apenas testes E2E. Não há testes unitários                                          |
| Deploy               | Vercel | SPA rewrite configurado em `vercel.json`                                            |

> **Nota de precisão:** não existe pipeline de CI/CD com deploy automatizado neste repositório — o deploy é feito nativamente pela integração Vercel↔GitHub. O workflow de Cypress no CI (`cypress.yml`) faz apenas lint/teste, não deploy. Um agente **não deve** descrever este projeto como tendo "CI/CD completo com deploy automatizado" — isso seria uma afirmação incorreta.

---

## 5. Estrutura de Pastas

```
src/
  components/
    RotaPrivada.jsx        # Guard de autenticação (verifica localStorage)
    PublicProfile.jsx      # Perfil público por USERNAME (fetch direto, NÃO usa axios)
    SkeletonDashboard.jsx  # Loading skeleton do dashboard
  pages/
    Login.jsx              # Tela de login
    Cadastro.jsx            # Tela de cadastro
    Dashboard.jsx           # Painel autenticado (upload de foto, CRUD de links)
    PerfilPublico.jsx       # Perfil público por ID (fetch direto + TanStack Query)
  services/
    api.js                  # Instância Axios com interceptors
  App.jsx                   # Definição de rotas
  main.jsx                  # Entry point (StrictMode + QueryClientProvider)
  index.css                 # Design tokens via @theme (Tailwind v4)
```

Ao localizar onde uma mudança deve ser feita, o agente deve seguir esta ordem de busca:

1. A funcionalidade é uma **página inteira**? → `src/pages/`
2. É um **elemento reutilizado em mais de uma página**? → `src/components/`
3. É uma **chamada HTTP**? → `src/services/api.js`
4. É uma **cor, fonte ou token visual**? → `src/index.css` (bloco `@theme`)
5. É uma **rota nova**? → `src/App.jsx`

---

## 6. Ordem de Prioridade

O agente **sempre** segue esta ordem ao executar uma tarefa. Pular etapas é a causa mais comum de PRs ruins.

| #   | Etapa                  | Descrição                                                                                                                                                                                                                                                                                              |
| --- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Entender a tarefa      | Reler o pedido do usuário até conseguir descrevê-lo em uma frase sem ambiguidade. Se houver ambiguidade real que mude o resultado, perguntar antes de codar.                                                                                                                                           |
| 2   | Entender impacto       | Quais arquivos serão tocados? Isso afeta autenticação, rotas públicas, ou apenas estilo visual? Mudanças em `RotaPrivada.jsx` ou `api.js` têm impacto maior que mudanças em uma página isolada.                                                                                                        |
| 3   | Localizar arquivos     | Usar a seção 5 (Estrutura de Pastas) para não criar arquivo novo quando já existe um lugar certo.                                                                                                                                                                                                      |
| 4   | Reutilizar componentes | Verificar se já existe um componente ou padrão visual equivalente antes de criar um novo. Lembrar que o projeto **não tem** biblioteca de componentes própria hoje — reutilização aqui significa copiar o padrão visual/estrutural existente, não importar um componente compartilhado que não existe. |
| 5   | Implementar            | Escrever a menor mudança possível que resolve o problema completo.                                                                                                                                                                                                                                     |
| 6   | Validar                | Rodar `npm run build` e `npm run lint` (seção 12). Testar manualmente a funcionalidade alterada.                                                                                                                                                                                                       |
| 7   | Revisar                | Rodar `git diff` e ler cada linha. Remover `console.log`, comentários temporários e código morto.                                                                                                                                                                                                      |
| 8   | Commitar               | Commit semântico, seguindo a seção 9.                                                                                                                                                                                                                                                                  |
| 9   | Criar PR               | Seguir o template da seção 10.                                                                                                                                                                                                                                                                         |
| 10  | Limpar ambiente        | Após merge: voltar para `main`, atualizar, deletar branch local e remota (seção 8.5).                                                                                                                                                                                                                  |

---

## 7. Workflow Obrigatório

```
Receber tarefa
      │
      ▼
Analisar contexto (ler AGENTS.md, ler arquivos relevantes)
      │
      ▼
Atualizar main local (git checkout main && git pull origin main)
      │
      ▼
Criar branch (feat/, fix/, chore/, docs/, refactor/)
      │
      ▼
Implementar mudança
      │
      ▼
Executar build (npm run build)
      │
      ▼
Executar lint (npm run lint)
      │
      ▼
Executar testes manuais (e Cypress, se a mudança afetar login/links/perfil público)
      │
      ▼
Revisar git diff linha a linha
      │
      ▼
Commit semântico
      │
      ▼
Push da branch
      │
      ▼
Criar Pull Request (template da seção 10)
      │
      ▼
Merge (após revisão, quando aplicável)
      │
      ▼
Atualizar main local
      │
      ▼
Excluir branch local
      │
      ▼
Excluir branch remota
```

Cada etapa deste fluxo é obrigatória. Nenhuma etapa é "opcional para mudanças pequenas".

---

## 8. Workflow Git

### 8.1 Modelo adotado

Este projeto usa **GitHub Flow** (não Git Flow completo com `develop`/`release`). Isso significa:

- `main` é sempre a branch deployável (Vercel faz deploy automático a partir dela).
- Toda mudança nasce de uma branch curta, criada a partir de `main` atualizada.
- Branches são de vida curta: nascem, viram PR, são mergeadas, são deletadas.
- **Nunca** se trabalha diretamente na `main`.

### 8.2 Tipos de branch e nomenclatura

| Prefixo     | Uso                                                        | Exemplo                          |
| ----------- | ---------------------------------------------------------- | -------------------------------- |
| `feat/`     | Nova funcionalidade                                        | `feat/upload-avatar-dashboard`   |
| `fix/`      | Correção de bug                                            | `fix/hover-color-accent`         |
| `chore/`    | Manutenção sem impacto funcional (config, deps, gitignore) | `chore/atualiza-gitignore`       |
| `docs/`     | Documentação                                               | `docs/adiciona-design-system-md` |
| `refactor/` | Reestruturação sem mudar comportamento externo             | `refactor/extrai-hook-usePerfil` |
| `test/`     | Testes (Cypress)                                           | `test/fluxo-login-cypress`       |

Regras de nomenclatura:

- Sempre em minúsculas, sem acentos, palavras separadas por hífen.
- Descritivo o suficiente para alguém entender o que a branch faz **sem abrir o PR**.
- Nunca usar nomes genéricos como `fix/bug` ou `feat/ajustes`.

### 8.3 Dezenas de exemplos de nomes de branch

```
feat/dashboard-lista-links-arrastavel
feat/pagina-perfil-publico-username
feat/toast-erro-upload-foto
fix/token-nao-limpo-no-logout
fix/link-duplicado-ao-criar
fix/skeleton-nao-desaparece
chore/remove-console-log-dashboard
chore/atualiza-cypress-config
docs/atualiza-readme-variaveis-ambiente
docs/adiciona-agents-md
refactor/separa-logica-fetch-perfilpublico
refactor/padroniza-nomenclatura-hooks
test/cypress-cadastro-usuario
test/cypress-exclusao-link
```

### 8.4 Comandos — ciclo completo

```bash
# 1. Garantir que main está atualizada
git checkout main
git pull origin main

# 2. Criar branch a partir de main
git checkout -b feat/nome-da-feature

# 3. Implementar e commitar em etapas lógicas
git add src/pages/Dashboard.jsx
git commit -m "feat(dashboard): adiciona confirmação antes de excluir link"

# 4. Push
git push -u origin feat/nome-da-feature

# 5. Criar PR (via GitHub ou gh CLI)
gh pr create --title "feat(dashboard): confirmação antes de excluir link" \
  --body "Ver descrição no template da seção 10"
```

### 8.5 Limpeza após merge

```bash
git checkout main
git pull origin main
git branch -d feat/nome-da-feature
git push origin --delete feat/nome-da-feature
```

Isso evita acúmulo de branches obsoletas e mantém o repositório limpo — importante em um projeto pessoal/portfólio, onde o histórico de branches também é avaliado por recrutadores e tech leads.

---

## 9. Commits (Conventional Commits)

Formato: `<tipo>(escopo opcional): descrição curta no imperativo`

| Tipo       | Quando usar                                                            |
| ---------- | ---------------------------------------------------------------------- |
| `feat`     | Nova funcionalidade visível para o usuário final                       |
| `fix`      | Correção de um bug                                                     |
| `docs`     | Mudança apenas em documentação (README, AGENTS.md, comentários de doc) |
| `style`    | Formatação, espaçamento, ponto e vírgula — **sem** mudança de lógica   |
| `refactor` | Reestruturação de código sem mudar comportamento externo               |
| `perf`     | Mudança que melhora performance                                        |
| `test`     | Adição ou ajuste de testes Cypress                                     |
| `build`    | Mudança em build system, dependências, Vite config                     |
| `ci`       | Mudança em workflow de CI (`.github/workflows/cypress.yml`)            |
| `chore`    | Tarefas de manutenção que não se encaixam nos tipos acima              |
| `revert`   | Reverter um commit anterior                                            |

### 9.1 Dezenas de exemplos reais

```
feat(dashboard): implementa upload de foto de perfil via FormData
feat(auth): adiciona redirecionamento para /login apos logout
feat(perfil-publico): exibe skeleton enquanto carrega dados via TanStack Query
fix: corrige cor do hover para verde (--color-accent)
fix(auth): corrige token nao removido do localStorage no logout
fix(links): impede criacao de link com URL vazia
docs: adiciona DESIGN.md com especificacao do design system
docs: atualiza AGENTS.md com fluxo de Pull Request
style: padroniza indentacao em Dashboard.jsx
refactor: extrai logica de fetch de PerfilPublico.jsx para um hook
refactor(api): centraliza tratamento de erro 401 no interceptor
perf: memoiza lista de links no Dashboard para evitar re-render
test: adiciona cenario Cypress de cadastro com email invalido
build: atualiza Vite para versao 8
ci: ajusta versao do Node no workflow do Cypress
chore: configura .gitignore para arquivos de contexto local
chore: remove dependencia nao utilizada
revert: reverte "feat(dashboard): upload de foto" por regressao em producao
```

---

## 10. Pull Request

### 10.1 Guia de título

O título do PR segue o mesmo formato do commit principal: `<tipo>(escopo): descrição curta`. Deve ser possível entender o que o PR faz **sem abrir a descrição**.

### 10.2 Template

```markdown
## Summary
- Resumo das mudancas (1-3 bullet points)

## Descricao
<!-- Descreva o que foi feito e por que -->

## Mudancas
- Arquivo alterado: descricao

## Como testar
1. Passo 1
2. Passo 2
```

### 10.3 Escrevendo o changelog / resumo

- Uma linha por arquivo alterado é suficiente na maioria dos casos.
- Não descrever mudanças que não existem no diff (nunca "inflar" o PR).
- Se o PR corrige um bug, descrever o comportamento **antes** e **depois**.

---

## 11. Checklists

### Antes do commit
- [ ] O diff contém apenas mudanças relacionadas à tarefa atual?
- [ ] Não há `console.log` esquecido?
- [ ] Não há comentário temporário (`// TODO remover`, `// teste`)?
- [ ] Nomenclatura de variáveis/componentes segue o padrão do projeto (seção 13)?

### Antes do push
- [ ] `npm run build` passou sem erro?
- [ ] `npm run lint` passou sem erro?
- [ ] Mensagens de commit seguem Conventional Commits?

### Antes do PR
- [ ] Testado manualmente no navegador (`npm run dev`)?
- [ ] Se a mudança afeta login, cadastro, links ou perfil público → Cypress rodado?
- [ ] Template de PR preenchido (seção 10.2)?

### Antes do merge
- [ ] PR revisado (por humano, quando disponível)?
- [ ] Nenhum conflito com `main`?

### Após merge
- [ ] `main` local atualizada?
- [ ] Branch local deletada?
- [ ] Branch remota deletada?
- [ ] Deploy Vercel verificado (build de produção passou)?

---

## 12. Validação

Toda alteração de código **deve** obrigatoriamente passar por:

```bash
npm run build     # Verifica que o projeto compila para produção
npm run lint      # ESLint flat config — verifica erros de estilo/qualidade
```

Testes manuais no navegador (`npm run dev`) são obrigatórios para qualquer mudança de UI ou fluxo.

### Quando executar Cypress

Não é necessário rodar Cypress para toda mudança — mas é **obrigatório** quando a mudança toca:

- Fluxo de login ou cadastro
- Criação/exclusão de links
- Qualquer uma das duas rotas de perfil público (`/p/:id` ou `/p/:username`)

```bash
npx cypress run     # Headless (precisa do dev server rodando e da API acessível)
npx cypress open    # UI interativa, útil para debug
```

> **Importante:** não existe `npm test`. Não existem testes unitários neste projeto — apenas E2E via Cypress. O agente não deve inventar ou sugerir a existência de um script que não existe.

---

## 13. Padrões de Código

### React / Hooks
- Componentes funcionais apenas. Sem componentes de classe.
- `useState` para estado local de formulários. `TanStack Query` para dados vindos do servidor.
- Evitar criar hooks customizados especulativos — só extrair um hook quando a lógica já se repete em 2+ lugares.

### Componentes
- PascalCase para nome de arquivo e nome do componente (`Dashboard.jsx`, `RotaPrivada.jsx`).
- Um componente por arquivo.

### Tailwind + CSS Variables
- Tailwind CSS 4, configurado via `@theme` em `src/index.css` — **não existe** `tailwind.config.js`, e um agente não deve criar um.
- Cores do design system **nunca** usam classes utilitárias do Tailwind (`bg-green-500`). Usam `style={{ backgroundColor: 'var(--color-accent)' }}`.
- Layout, espaçamento e tipografia genéricos podem usar classes Tailwind normalmente (`flex`, `gap-4`, `p-6`).

### TanStack Query
- Usado hoje apenas para `/meu-perfil` (via `PerfilPublico.jsx`). Ao adicionar novos dados de servidor, preferir `useQuery`/`useMutation` em vez de `useState` + `useEffect` manual.

### Axios
- Toda chamada autenticada deve passar pela instância de `src/services/api.js`, que já injeta o header `Authorization`.
- Exceção conhecida (não seguir como padrão): `PublicProfile.jsx` e `PerfilPublico.jsx` usam `fetch()` direto, não Axios, pois são rotas públicas sem necessidade de interceptor de auth.

### Organização e nomenclatura
- camelCase: variáveis e funções.
- PascalCase: componentes.
- Comentários, nomes de variáveis e texto de UI: **português brasileiro**, consistente com o restante do código.

### Performance
- Evitar re-render desnecessário em listas de links (usar `key` estável — o `id` do link, nunca o índice do array).
- Imagens de avatar devem ser enviadas via `FormData`, sem conversão desnecessária no client.

---

## 14. Design System

Nome: **Terminal Developer**. Tema fixo escuro, sem toggle de dark/light mode.

| Variável                 | Valor     | Uso                      |
| ------------------------ | --------- | ------------------------ |
| `--color-bg-primary`     | `#0a0a0a` | Fundo principal          |
| `--color-bg-surface`     | `#111111` | Cards, nav, superfícies  |
| `--color-bg-elevated`    | `#1a1a1a` | Elementos elevados       |
| `--color-border-default` | `#2a2a2a` | Bordas padrão            |
| `--color-text-primary`   | `#e5e5e5` | Texto principal          |
| `--color-text-secondary` | `#aaaaaa` | Texto secundário         |
| `--color-text-muted`     | `#888888` | Texto muted/comentários  |
| `--color-accent`         | `#00ff88` | Acento principal (verde) |
| `--color-accent-alt`     | `#00d4ff` | Hover/links (ciano)      |
| `--color-error`          | `#ff4444` | Erros                    |

Regras:

- **Nunca** usar classes Tailwind de cor (`bg-green-500`, `text-blue-600`).
- Tipografia: JetBrains Mono (monospace) em toda a interface.
- Bordas: cantos retos, `border-radius: 0`. Não usar `rounded-lg`, `rounded-xl`, etc.

```jsx
// Correto
<div style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg-primary)' }}>

// Incorreto
<div className="bg-green-500 text-black rounded-lg">
```

---

## 15. Segurança e Autenticação

### 15.1 Fluxo de autenticação

```
1. Login → POST /login → recebe token JWT
2. Token salvo em localStorage (chave: meu_token_vip)
3. Interceptor do Axios injeta Authorization: Bearer <token> em cada request
4. RotaPrivada.jsx verifica APENAS a existencia do token no localStorage
5. Logout → remove token → redireciona para /
```

### 15.2 Pontos importantes de segurança

- A validação real do JWT acontece **no backend**. `RotaPrivada.jsx` só verifica se existe algo salvo no `localStorage` — isso não é validação de sessão, é um guard de UI.
- **Não há refresh de token.** A sessão expira sem aviso no frontend; o usuário só descobre ao receber um 401 em alguma requisição.
- `PublicProfile.jsx` e `PerfilPublico.jsx` usam `fetch()` direto com `VITE_API_URL` (rotas públicas sem necessidade de interceptor de auth).

### 15.3 Boas práticas ao mexer em autenticação

- Nunca logar o token JWT no console, nem em ambiente de desenvolvimento.
- Qualquer mudança em `RotaPrivada.jsx` ou `api.js` deve ser tratada como **alto impacto** (passo 2 da seção 6) — afeta todas as rotas autenticadas.
- Não implementar refresh de token "de passagem" dentro de uma tarefa não relacionada — isso é uma mudança arquitetural que merece sua própria tarefa e discussão.

---

## 16. Regras para IA

1. **Nunca** alterar código fora do escopo da tarefa pedida.
2. **Nunca** atualizar dependências (`package.json`) sem necessidade explícita para a tarefa.
3. **Nunca** modificar configuração do projeto (Vite, ESLint, `vercel.json`) sem autorização explícita.
4. **Nunca** fazer alterações puramente cosméticas dentro de um PR de feature/fix (abrir um PR `style`/`refactor` separado).
5. **Nunca** misturar refactor com feature no mesmo commit ou PR.
6. **Nunca** fazer force push em branch compartilhada.
7. **Nunca** trabalhar diretamente na `main`.
8. **Sempre** revisar o `git diff` linha a linha antes de commitar.
9. **Sempre** remover `console.log` de debug antes do commit final.
10. **Sempre** remover comentários temporários (`// TODO teste`, `// remover depois`).
11. **Sempre** preservar a arquitetura existente (estrutura de pastas da seção 5).
12. **Sempre** seguir o padrão visual do design system (seção 14) — nunca introduzir classes Tailwind de cor.
13. **Sempre** preferir mudanças pequenas e revisáveis a mudanças grandes e difíceis de revisar.
14. **Sempre** explicar decisões importantes na descrição do PR (seção 10.2), especialmente trade-offs.
15. **Sempre** ser preciso sobre o estado real do projeto: não descrever como "testado" o que só passou no build; não descrever como "CI/CD completo" um pipeline que não faz deploy.

---

## 17. O Que Nunca Fazer

- Nunca criar `tailwind.config.js` — a configuração do Tailwind v4 é via `@theme` em `index.css`.
- Nunca substituir `style={{ ... }}` com CSS variables por classes utilitárias de cor do Tailwind.
- Nunca assumir que existe teste unitário ou script `npm test` — não existe.
- Nunca assumir que existe uma biblioteca de componentes compartilhados (`Button`, `Input`, `Card`) — hoje não existe.
- Nunca implementar refresh token "de passagem" sem que isso seja o escopo explícito da tarefa.
- Nunca commitar direto na `main`.
- Nunca abrir PR sem preencher "Como testar".
- Nunca descrever o pipeline de CI como fazendo deploy — ele roda apenas lint/teste; o deploy é feito pela Vercel nativamente.
- Usar sempre `VITE_API_URL` para chamadas de API em rotas publicas.
- Nunca misturar a lógica das duas rotas de perfil público (`/p/:id` e `/p/:username`) sem entender que elas são implementações **diferentes e intencionalmente separadas** hoje (ver seção 19).

---

## 18. Performance

- Usar `key` estável (ID do link) em listas renderizadas — nunca o índice do array, especialmente em listas que suportam exclusão/reordenação.
- Evitar chamadas duplicadas ao backend: preferir o cache do TanStack Query em vez de refazer `fetch`/`axios` manual quando os dados já estão disponíveis via `useQuery`.
- Upload de imagem (avatar) deve ser enviado como `FormData` sem processamento pesado no cliente.
- Evitar re-render desnecessário do `Dashboard.jsx` inteiro ao editar um único link — preferir atualização localizada de estado.

---

## 19. Gotchas e Limitações Conhecidas

Esta seção existe para que o agente **não invente capacidades** que o projeto não tem, e não repita bugs conhecidos.

1. **Duas rotas de perfil público, com implementações diferentes:**
   - `/p/:id` → `PerfilPublico.jsx` — usa TanStack Query + `fetch`.
   - `/p/:username` → `PublicProfile.jsx` — usa `useState` + `fetch`.
   - Ambas fazem fetch direto com `fetch()`, nenhuma das duas usa a instância Axios.

2. **Tailwind v4 sem `tailwind.config.js`:** toda configuração de tema é via bloco `@theme` no `src/index.css`. Se for necessário adicionar um token novo, editar `index.css` — nunca criar um arquivo de config.

3. **Cores do design system são CSS variables**, não classes Tailwind (ver seção 14).

4. **A API é um repositório separado:** `github.com/tharciosantos/devlinks-api`. O frontend não contém nenhuma lógica de banco de dados.

5. **CI usa Node 20** (definido em `cypress.yml`), mas o runner local pode usar Node 24 — há um warning de depreciação do Node 20 que pode ser ignorado.

6. **Cypress depende da API externa em produção:** na CI, os testes rodam contra `https://minha-api-lih7.onrender.com`. Se essa API estiver fora do ar, os testes falham por motivo externo ao código do frontend.

7. **Sem testes unitários** — apenas E2E via Cypress.

8. **Sem dark mode toggle** — o tema é fixo escuro por design.

9. **`PublicProfile.jsx` e `PerfilPublico.jsx` usam `fetch()` direto**, não Axios — são rotas públicas sem necessidade de interceptor de auth.

10. **Sem tratamento de sessão expirada no frontend** — o usuário só percebe ao receber um erro 401 em alguma ação.

11. **Sem componentes reutilizáveis** (`Button`, `Input`, `Card`) — tudo inline nas páginas. Dívida técnica conhecida e intencionalmente não resolvida ainda.

---

## 20. Troubleshooting

| Erro                                      | Causa                                                | Solução                                                                                |
| ----------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Build falha com "Unexpected token"        | Caractere JSX inválido (ex: `>` solto no JSX)        | Usar `&gt;` ou `{'>'}`                                                                 |
| Cypress `ECONNREFUSED`                    | Backend ou dev server desligado                      | Iniciar `npm run dev` e a API antes de rodar Cypress                                   |
| Toasts não aparecem                       | `<Toaster />` não está montado em `App.jsx`          | Verificar import/montagem no `App.jsx`                                                 |
| Cor errada no hover                       | Usou `--color-accent-alt` em vez de `--color-accent` | Usar `--color-accent` (verde `#00ff88`) para o padrão principal                        |
| Perfil público não atualiza               | Cache do browser ou dados desatualizados             | Limpar cache ou forcar refresh (Ctrl+F5) |
| Lint falha após adicionar componente novo | Import não utilizado ou variável não usada           | Rodar `npm run lint` localmente antes do commit final                                  |
| Sessão "cai" sem erro visível             | Ausência de refresh token (limitação conhecida)      | Reautenticar manualmente; não é bug, é limitação documentada                           |

---

## 21. Exemplos Completos

### 21.1 Exemplo de branch + commit + PR (fluxo real)

**Tarefa:** adicionar confirmação antes de excluir um link no Dashboard.

```bash
git checkout main
git pull origin main
git checkout -b feat/confirmacao-exclusao-link

# implementação em src/pages/Dashboard.jsx

npm run build
npm run lint
npm run dev   # teste manual: criar um link, tentar excluir, confirmar modal

git add src/pages/Dashboard.jsx
git commit -m "feat(dashboard): adiciona confirmacao antes de excluir link"

git push -u origin feat/confirmacao-exclusao-link
gh pr create --title "feat(dashboard): confirmacao antes de excluir link" \
  --body "## Summary
- Adiciona modal de confirmacao antes de excluir um link no Dashboard

## Mudancas
- src/pages/Dashboard.jsx: novo estado de modal + handler de confirmacao

## Por que
- Evitar exclusao acidental de link, ja reportado como incomodo pelo usuario

## Como testar
1. npm run dev
2. Login no dashboard
3. Clicar em excluir um link
4. Confirmar que o modal aparece e que cancelar nao remove o link
5. Confirmar exclusao e validar que o link some da lista

## Checklist
- [x] npm run build passou
- [x] npm run lint passou
- [x] Testado manualmente
- [ ] Cypress (nao necessario, mudanca isolada de UI sem impacto em auth/API)
"
```

### 21.2 Exemplo de correção de bug

```bash
git checkout main
git pull origin main
git checkout -b fix/hover-color-accent

# correcao pontual de estilo em algum componente

npm run build
npm run lint

git add src/pages/Login.jsx
git commit -m "fix: corrige cor do hover para --color-accent"

git push -u origin fix/hover-color-accent
gh pr create --title "fix: corrige cor do hover para --color-accent" \
  --body "## Summary
- Corrige hover que estava usando --color-accent-alt (ciano) em vez de --color-accent (verde)

## Mudancas
- src/pages/Login.jsx: ajusta variavel CSS usada no hover do botao

## Por que
- Inconsistencia visual com o design system (Terminal Developer)

## Como testar
1. npm run dev
2. Passar o mouse sobre o botao de login
3. Confirmar que o hover fica verde (#00ff88), nao ciano
"
```

### 21.3 Limpeza pós-merge (ambos os exemplos acima)

```bash
git checkout main
git pull origin main
git branch -d feat/confirmacao-exclusao-link
git push origin --delete feat/confirmacao-exclusao-link
```

---

## 22. Fluxograma Geral

```
┌─────────────────────────────┐
│      RECEBER TAREFA          │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│   Ler AGENTS.md + contexto    │
│   (arquivos afetados, escopo) │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│  git checkout main            │
│  git pull origin main         │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│  git checkout -b <tipo>/nome  │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│      IMPLEMENTAR MUDANÇA      │◄────────────┐
└───────────────┬───────────────┘             │
                │                              │ corrigir
                ▼                              │
┌─────────────────────────────┐               │
│   npm run build               │──── falha ───┘
└───────────────┬───────────────┘
                │ passou
                ▼
┌─────────────────────────────┐
│   npm run lint                │──── falha ───┐
└───────────────┬───────────────┘               │
                │ passou                         │
                ▼                                │
┌─────────────────────────────┐                 │
│   Teste manual (npm run dev)  │──── falhou ────┘
└───────────────┬───────────────┘
                │ ok
                ▼
      ┌─────────────────────┐
      │ Afeta login/cadastro/ │
      │ links/perfil publico? │
      └─────┬───────────┬─────┘
         sim│           │não
            ▼           │
  ┌───────────────────┐ │
  │ npx cypress run     │ │
  └─────────┬───────────┘ │
            │             │
            ▼             ▼
┌─────────────────────────────┐
│  git diff — revisar linha    │
│  a linha (remover console.log)│
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│  git commit (Conventional)    │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│  git push -u origin <branch>  │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│  Criar PR (template seção 10) │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│  Revisão (humana, quando       │
│  disponível) + merge           │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│  git checkout main             │
│  git pull origin main          │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│  git branch -d <branch>        │
│  git push origin --delete       │
│  <branch>                       │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────┐
│      TAREFA CONCLUÍDA          │
└─────────────────────────────┘
```

---

*Este documento deve ser mantido em sincronia com o estado real do repositório. Qualquer mudança estrutural relevante (nova dependência, mudança de arquitetura, nova rota) deve vir acompanhada de uma atualização deste `AGENTS.md` no mesmo PR ou em um PR `docs` imediatamente subsequente.*