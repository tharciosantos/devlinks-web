# DevLinks Web

Interface front-end do projeto DevLinks para cadastro, login e gerenciamento de uma página pública de links. A aplicação consome a DevLinks API para autenticação, consulta de perfil, upload de avatar e operações sobre links.

[![Pipeline E2E](https://github.com/tharciosantos/devlinks-web/actions/workflows/cypress.yml/badge.svg)](https://github.com/tharciosantos/devlinks-web/actions/workflows/cypress.yml)

## Status do projeto

**Em evolução, com versão disponível em produção.**

Os fluxos principais de autenticação, gerenciamento de links, avatar e visualização do perfil público estão implementados. Melhorias relacionadas a testes, configuração de ambiente e refinamento da interface permanecem planejadas.

## Objetivo do projeto

O DevLinks Web foi criado para oferecer uma interface em que usuários possam manter uma página pública com seus principais links. Após o cadastro e o login, o usuário pode visualizar os dados do perfil, enviar um avatar, adicionar ou excluir links e compartilhar a URL pública.

O projeto também tem como objetivo praticar integração entre front-end e API, roteamento no cliente, consumo de autenticação JWT, gerenciamento de dados assíncronos, upload de arquivos e testes de fluxo com Cypress.

## Demonstração

- **Aplicação front-end em produção:** [https://devlinks-web-api.vercel.app/](https://devlinks-web-api.vercel.app/)
- **Repositório do front-end:** [https://github.com/tharciosantos/devlinks-web](https://github.com/tharciosantos/devlinks-web)
- **API em produção:** [https://minha-api-lih7.onrender.com](https://minha-api-lih7.onrender.com)
- **Repositório da API:** [https://github.com/tharciosantos/devlinks-api](https://github.com/tharciosantos/devlinks-api)

### Cadastro

![Tela de cadastro do DevLinks](./docs/tela-cadastro.PNG)

### Login

![Tela de login do DevLinks](./docs/tela-login.PNG)

### Dashboard

![Dashboard do DevLinks](./docs/tela-dashboard.PNG)

### Perfil público

![Perfil público do DevLinks](./docs/tela-perfil-publico.PNG)

## Funcionalidades implementadas

### Autenticação e navegação

- Cadastro de usuário por nome, e-mail e senha por meio da DevLinks API.
- Login com e-mail e senha.
- Armazenamento do token JWT retornado pela API no `localStorage`.
- Inclusão automática do token no cabeçalho `Authorization` das requisições feitas pela instância Axios.
- Rota de dashboard condicionada à existência do token no navegador.
- Logout com remoção do token e retorno à tela de login.

> A autenticação é fornecida pela DevLinks API. No front-end, o componente de rota privada verifica apenas a existência do token no `localStorage`; a validação efetiva do JWT ocorre nas rotas protegidas da API.

### Dashboard e perfil

- Consulta dos dados do usuário autenticado.
- Exibição de nome, e-mail, avatar e links no dashboard.
- Estado de carregamento com skeleton screen.
- Mensagem de erro e opção de nova tentativa quando o perfil não pode ser carregado.
- Upload de avatar com `FormData` para o endpoint da API.
- Exibição da inicial do nome quando o usuário não possui avatar.

### Gerenciamento de links

- Cadastro de links com título e URL.
- Listagem dos links associados ao perfil.
- Exclusão de links com confirmação.
- Atualização dos dados exibidos após upload, criação ou exclusão por invalidação do cache do TanStack Query.
- Geração da URL do perfil público a partir do identificador do usuário.
- Cópia da URL pública para a área de transferência.

### Perfil público e interface

O projeto possui **duas rotas de perfil público** com implementações diferentes:

- **Rota por ID:** `/p/:id` → `PerfilPublico.jsx`
  - Usa TanStack Query para gerenciamento de estado
  - Busca dados via `fetch()` com URL da API a partir de `VITE_API_URL`
  - Exibe nome, avatar e links do perfil

- **Rota por username:** `/p/:username` → `PublicProfile.jsx`
  - Usa `useState` e `useEffect` para gerenciamento de estado
  - Busca dados via `fetch()` com URL da API a partir de `VITE_API_URL`
  - Exibe username, avatar e links do perfil

> **Nota:** Ambas as rotas funcionam, mas `PerfilPublico.jsx` é a implementação mais moderna (usa TanStack Query). `PublicProfile.jsx` é uma implementação alternativa que pode ser consolidada no futuro.

- Abertura dos links em uma nova aba.
- Notificações de sucesso e erro com React Hot Toast.
- Layout responsivo construído com Tailwind CSS.
- Reescrita de rotas na Vercel para suporte à navegação da SPA.

## Tecnologias utilizadas

### Front-end

- React 19
- Vite 8
- React Router
- Tailwind CSS 4

### Comunicação e estado assíncrono

- Axios
- TanStack Query (React Query)
- Fetch API no perfil público

### Interface

- React Hot Toast
- Clipboard API do navegador
- FormData para envio do avatar

### Testes e qualidade

- Cypress
- ESLint
- GitHub Actions

### Deploy

- Vercel para o front-end
- Render para a API consumida pela aplicação

> O banco de dados, a emissão e validação do JWT e o envio do avatar ao Cloudinary são responsabilidades da DevLinks API, não deste repositório front-end.

## Estrutura geral do projeto

```text
devlinks-web/
├── .github/
│   └── workflows/
│       └── cypress.yml          # Pipeline E2E executada em pushes para main
├── cypress/
│   ├── e2e/
│   │   └── login.cy.js          # Fluxos de login e gerenciamento de links
│   └── support/                 # Arquivos de suporte do Cypress
├── docs/                        # Imagens utilizadas no README
├── public/                      # Arquivos estáticos
├── src/
│   ├── components/
│   │   ├── PublicProfile.jsx    # Perfil público por username (useState + fetch)
│   │   ├── RotaPrivada.jsx      # Guard de autenticacao
│   │   └── SkeletonDashboard.jsx # Loading skeleton do dashboard
│   ├── pages/
│   │   ├── Cadastro.jsx         # Tela de cadastro
│   │   ├── Dashboard.jsx        # Painel autenticado (upload foto, CRUD links)
│   │   ├── Login.jsx            # Tela de login
│   │   └── PerfilPublico.jsx    # Perfil público por ID (TanStack Query + fetch)
│   ├── services/
│   │   └── api.js               # Instância Axios e interceptadores
│   ├── App.jsx                  # Rotas da aplicação
│   ├── index.css                # Estilos globais e tokens de design
│   └── main.jsx                 # Inicialização do React e do Query Client
├── .env.example                 # Variáveis de ambiente (precisa de correção)
├── cypress.config.js            # Configuração do Cypress
├── vercel.json                  # Reescrita de rotas da SPA
└── vite.config.js               # Configuração do Vite e Tailwind CSS
```

## Como executar localmente

### Pré-requisitos

- Node.js 20 ou superior
- npm
- DevLinks API em execução localmente ou uma URL acessível da API

### 1. Clone o repositório

```bash
git clone https://github.com/tharciosantos/devlinks-web.git
cd devlinks-web
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

Para consumir a API publicada no Render:

```env
VITE_API_URL=https://minha-api-lih7.onrender.com
```

### 4. Inicie a aplicação

```bash
npm run dev
```

O Vite informará a URL local no terminal, normalmente [http://localhost:5173](http://localhost:5173).

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera o build de produção. |
| `npm run lint` | Executa o ESLint. |
| `npm run preview` | Executa localmente o build gerado. |

## Variáveis de ambiente

| Variável | Finalidade |
| --- | --- |
| `VITE_API_URL` | Define a URL base da DevLinks API usada pelo Axios e pelas páginas de perfil público. |

Quando `VITE_API_URL` não está definida, a instância Axios utiliza `http://localhost:3000` como fallback. As páginas de perfil público (`/p/:id` e `/p/:username`) utilizam diretamente `VITE_API_URL`, portanto a variável deve ser configurada nesses fluxos.

## Testes

O projeto possui uma suíte E2E com Cypress em `cypress/e2e/login.cy.js`.

### Cobertura atual

- Login com credenciais de um usuário de teste existente.
- Verificação do redirecionamento para o dashboard após o login.
- Confirmação da exibição dos principais controles do dashboard.
- Adição de um link pela interface.
- Exclusão do link criado durante o teste.
- Limpeza do dado criado ao final do fluxo de gerenciamento de links.

Os testes atuais não cobrem cadastro, falha de login, upload de avatar, logout ou perfil público.

Para executar o Cypress com a aplicação local em funcionamento:

```bash
npx cypress open
```

Ou em modo headless:

```bash
npx cypress run
```

Não existem scripts específicos do Cypress no `package.json`; os comandos são executados com `npx`.

A pipeline `.github/workflows/cypress.yml` executa os testes E2E em pushes para a branch `main`, inicia o Vite e configura `VITE_API_URL` com a API publicada no Render. A suíte atual depende de um usuário de teste previamente existente e de disponibilidade da API externa.

## Aprendizados

- Desenvolvimento de uma SPA com React e Vite.
- Navegação no cliente com React Router.
- Integração do front-end com uma API REST.
- Consumo de autenticação JWT fornecida pelo back-end.
- Uso de interceptadores do Axios para envio do token.
- Gerenciamento de consultas, mutações e cache com TanStack Query.
- Upload de arquivo com FormData.
- Criação de rotas públicas e condicionadas à autenticação.
- Estados de carregamento, erro e feedback visual.
- Testes de fluxos com Cypress.
- Execução de testes E2E com GitHub Actions.
- Deploy de uma SPA na Vercel.

## Próximos passos

- **Planejado:** ampliar os testes E2E para cadastro, falha de login, avatar, logout e perfil público.
- **Planejado:** substituir as credenciais fixas da suíte Cypress por dados de teste configuráveis.
- **Planejado:** adicionar scripts do Cypress ao `package.json`.
- **Planejado:** melhorar o tratamento de sessão expirada no front-end.
- **Planejado:** consolidar as duas rotas de perfil público (`PerfilPublico.jsx` e `PublicProfile.jsx`) em uma única implementação.
- **Planejado:** ampliar a validação e o feedback dos formulários.

## Autor

**Nome:** Tharcio Santos  
**GitHub:** [https://github.com/tharciosantos](https://github.com/tharciosantos)  
**LinkedIn:** [https://www.linkedin.com/in/tharcio-santos-dev/](https://www.linkedin.com/in/tharcio-santos-dev/)  
**Portfólio:** [https://tharcio-portfolio.vercel.app/](https://tharcio-portfolio.vercel.app/)
