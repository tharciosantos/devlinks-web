## Descricao

<!-- Descreva o objetivo desta PR em 1-2 frases. O que essa mudanca resolve ou adiciona? -->


## Tipo de mudanca

<!-- Marque o tipo principal com [x] -->

- [ ] **Bug fix** — Correcao de comportamento incorreto (ex: botao nao funcionava, layout quebrado)
- [ ] **Nova feature** — Funcionalidade completamente nova (ex: pagina de perfil, upload de foto)
- [ ] **Refactor** — Reestruturacao de codigo sem mudanca de comportamento (ex: extrair componente, renomear variavel)
- [ ] **Style/UX** — Alteracao visual, animacao, responsividade, acessibilidade
- [ ] **Docs** — Documentacao, comentarios, README
- [ ] **Chore** — Dependencias, CI/CD, configuracao, limpeza
- [ ] **Hotfix** — Correcao critica para producao


## Contexto

<!-- Por que essa mudanca e necessaria? Link com issue, discussao ou requisito -->


## Mudancas implementadas

<!-- Liste as alteracoes concretas feitas. Inclua nomes de arquivos quando relevante -->

### Arquivos modificados

| Arquivo | O que mudou |
|---------|-------------|
| `src/components/X.jsx` | Descricao da alteracao |
| `src/pages/Y.jsx` | Descricao da alteracao |

### Arquivos criados (se houver)


### Arquivos removidos (se houver)


## Comportamento antes vs depois

<!-- Para bugs e features, documente a diferenca -->

**Antes:**
<!-- Como funcionava antes (ou nao funcionava) -->

**Depois:**
<!-- Como funciona agora -->


## Dependencias

<!-- Liste dependencias novas ou atualizadas (se houver) -->

- Nenhuma

## Impacto

- [ ] Altera interface do usuario
- [ ] Altera comportamento de API/conexao
- [ ] Pode afetar performance
- [ ] Requer migracao de dados
- [ ] Altera variaveis de ambiente

## Checklist

### Codigo
- [ ] Codigo segue as convencoes do projeto (camelCase, portugues, CSS variables)
- [ ] Nao ha `console.log` ou codigo de debug deixado para tras
- [ ] Nao ha dados sensiveis hardcoded (tokens, senhas, URLs de producao)

### Build & Teste
- [ ] `npm run build` — Build de producao sem erros
- [ ] `npm run lint` — Nenhum erro de lint
- [ ] Testado manualmente no navegador (Chrome/Firefox)

### Git
- [ ] Commits semanticos (`feat`, `fix`, `docs`, etc.)
- [ ] Branch nomeada corretamente (`feat/`, `fix/`, `chore/`)
- [ ] Nao ha alteracoes direto na `main`

## Como testar

<!-- Passos claros e reproduziveis para validar a mudanca -->

1. Iniciar o dev server: `npm run dev`
2. Navegar ate `http://localhost:5173/rota`
3. Realizar acao X
4. Verificar resultado Y

## Prints / Evidencias

<!-- Anex prints ou videos do resultado. Obrigatorio para mudancas visuais -->

<!-- ![print](url) -->

## Issue / PR relacionada

<!-- Links com issues ou PRs anteriores -->
<!-- Closes #123 -->
<!-- Related to #456 -->
