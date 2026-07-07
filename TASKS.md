# 📋 Tasks — Auditoria e Atualização de Dependências

**Projeto:** devlinks-web  
**Última atualização:** 2026-07-07  
**Status:** Em andamento

---

## ✅ Concluído

### Etapa 1 — Atualizações Críticas de Segurança

| Task | Pacote | De | Para | Status |
|------|--------|-----|------|--------|
| 1.1 | axios | 1.14.0 | 1.18.1 | ✅ Concluído |
| 1.2 | react-router-dom | 7.13.1 | 7.18.1 | ✅ Concluído |

**Commits:**
```
7dd8dd6 chore: atualiza axios para 1.18.1 corrigindo vulnerabilidades de segurança
a2fdbac chore: atualiza react-router-dom para 7.18.1 corrigindo vulnerabilidades de segurança
```

**PR:** #2 (merged)

---

### Etapa 2 — Atualizações Recomendadas

| Task | Pacote | De | Para | Status |
|------|--------|-----|------|--------|
| 2.1 | vite | 8.0.1 | 8.1.3 | ✅ Concluído |
| 2.2 | cypress | 15.12.0 | 15.18.1 | ✅ Concluído |
| 2.3 | form-data | 4.0.5 | 4.0.6 | ✅ Concluído |

**Commits:**
```
9d73b68 chore: atualiza vite para 8.1.3 corrigindo path traversal
dbc82d3 chore: atualiza cypress para 15.18.1 corrigindo dependências transitivas
d6b2884 chore: atualiza form-data para 4.0.6 corrigindo CRLF injection
```

**PR:** #3 (merged)

---

## 📋 Pendente

### Etapa 3 — Atualizações de Manutenção

| Task | Pacote | Versão Atual | Versão Disponível | Prioridade | Observações |
|------|--------|--------------|-------------------|------------|-------------|
| 3.1 | react | 19.2.4 | 19.2.7 | Baixa | Patch de manutenção |
| 3.2 | react-dom | 19.2.4 | 19.2.7 | Baixa | Patch de manutenção |
| 3.3 | tailwindcss | 4.2.2 | 4.3.2 | Baixa | Minor update |
| 3.4 | @tailwindcss/vite | 4.2.2 | 4.3.2 | Baixa | Minor update |
| 3.5 | postcss | 8.5.8 | 8.5.16 | Média | Corrige XSS (MEDIUM) |
| 3.6 | @tanstack/react-query | 5.95.2 | 5.101.2 | Baixa | Minor update |
| 3.7 | @vitejs/plugin-react | 6.0.1 | 6.0.3 | Baixa | Patch update |
| 3.8 | autoprefixer | 10.4.27 | 10.5.2 | Baixa | Minor update |
| 3.9 | globals | 17.4.0 | 17.7.0 | Baixa | Minor update |

**Branch sugerida:** `chore/atualizacao-etapa3-manutencao`

**Commits sugeridos:**
```
chore: atualiza react e react-dom para 19.2.7
chore: atualiza tailwindcss para 4.3.2
chore: atualiza postcss para 8.5.16
chore: atualiza dependências de manutenção
```

---

### Etapa 4 — Atualizações Opcionais (Futuro)

| Task | Pacote | Versão Atual | Versão Disponível | Prioridade | Observações |
|------|--------|--------------|-------------------|------------|-------------|
| 4.1 | @eslint/js | 9.39.4 | 10.0.1 | Baixa | Major version — aguardar estabilidade |
| 4.2 | eslint | 9.39.4 | 10.6.0 | Baixa | Major version — aguardar estabilidade |
| 4.3 | eslint-plugin-cypress | 6.2.0 | 6.4.2 | Baixa | Minor update |
| 4.4 | eslint-plugin-react-hooks | 7.0.1 | 7.1.1 | Baixa | Minor update |
| 4.5 | eslint-plugin-react-refresh | 0.5.2 | 0.5.3 | Baixa | Patch update |

**Nota:** ESLint 10 é major version — recomenda-se aguardar 2-3 meses após release para atualizar.

---

## 📊 Progresso Geral

### Vulnerabilidades

| Métrica | Início | Atual | Redução |
|---------|--------|-------|---------|
| HIGH | 18 | 3 | -83% |
| MODERATE | 8 | 2 | -75% |
| LOW | 1 | 1 | 0% |
| **TOTAL** | **27** | **6** | **-78%** |

### Vulnerabilidades Restantes (3 HIGH)

Todas em **devDependencies** (Cypress) — não afetam produção:

| Pacote | Severidade | Impacto |
|--------|------------|---------|
| lodash | HIGH | Dev only |
| systeminformation | HIGH | Dev only |
| tmp | HIGH | Dev only |

**Status:** ✅ Produção segura

---

## 🔄 Fluxo de Trabalho

Para cada nova task:

1. Criar branch: `chore/atualizacao-<etapa>-<pacote>`
2. Atualizar dependência: `npm install <pacote>@<versao>`
3. Verificar build: `npm run build`
4. Verificar lint: `npm run lint`
5. Commitar: `chore: atualiza <pacote> para <versao>`
6. Push e criar PR
7. Aguardar review e merge
8. Limpar branch e atualizar main

---

## 📝 Notas

- **Data da auditoria:** 2026-07-07
- **Auditor:** MiMoCode (Engenheiro de Software Sênior)
- **Ferramentas utilizadas:** npm audit, OSV.dev, GitHub Security Advisories, NVD
- **Critério de parada:** Dependências de produção atualizadas e seguras
- **Próxima revisão:** Recomendado revisar em 30 dias ou quando houver novas advisories

---

## 📚 Referências

- [Auditoria Completa](https://github.com/tharciosantos/devlinks-web/blob/main/TASKS.md)
- [npm audit](https://docs.npmjs.com/cli/audit)
- [OSV.dev](https://osv.dev/)
- [GitHub Security Advisories](https://github.com/advisories)
