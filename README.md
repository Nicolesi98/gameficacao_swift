# Swift Champions - Plataforma de Gamificação

Uma plataforma de gamificação desenvolvida para motivar e engajar funcionários através de desafios, rankings e recompensas.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e bundler rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Supabase** - Backend as a Service (BaaS)
- **Lucide React** - Biblioteca de ícones
- **ESLint** - Linter para código JavaScript/TypeScript

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16.0 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [Git](https://git-scm.com/)

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/gameficacao_swift.git
   cd gameficacao_swift
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` e adicione suas configurações do Supabase:
   ```env
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```

## 🚦 Como Rodar o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview da Build de Produção

```bash
npm run preview
```

### Verificação de Tipos

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## 🌟 Funcionalidades

- **Dashboard Interativo**: Visualização do progresso pessoal e métricas
- **Sistema de Desafios**: Desafios diários e semanais para engajamento
- **Ranking de Funcionários**: Leaderboard com pontuação e conquistas
- **Sistema de Níveis**: Progressão baseada em XP e estrelas
- **Loja de Recompensas**: Sistema de troca de pontos por prêmios
- **Perfil Personalizado**: Gestão de perfil e conquistas

## 📁 Estrutura do Projeto

```
gameficacao_swift/
├── public/
├── src/
│   ├── App.tsx          # Componente principal da aplicação
│   ├── main.tsx         # Ponto de entrada da aplicação
│   ├── index.css        # Estilos globais
│   └── vite-env.d.ts    # Definições de tipos do Vite
├── .env                 # Variáveis de ambiente (criar localmente)
├── .gitignore          # Arquivos ignorados pelo Git
├── eslint.config.js    # Configuração do ESLint
├── index.html          # Template HTML
├── package.json        # Dependências e scripts
├── postcss.config.js   # Configuração do PostCSS
├── tailwind.config.js  # Configuração do Tailwind CSS
├── tsconfig.json       # Configuração do TypeScript
├── tsconfig.app.json   # Configuração específica da aplicação
├── tsconfig.node.json  # Configuração para Node.js
└── vite.config.ts      # Configuração do Vite
```

## 🎯 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build para produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter ESLint
- `npm run typecheck` - Verifica os tipos TypeScript




