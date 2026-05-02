# 🚀 SoftwareHouse Fortaleza - Dashboard & Education Platform

Uma plataforma moderna de gestão e estudos desenvolvida para a **SoftwareHouse Fortaleza**. Este sistema integra um portal educacional com um dashboard administrativo, focado em alta performance, design minimalista (Dark Mode) e segurança de dados.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + GoTrue)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Roteamento:** [React Router DOM](https://reactrouter.com/)

## ✨ Funcionalidades Principais

- **Autenticação Segura:** Fluxo completo de Login e Cadastro utilizando Supabase Auth.
- **LGPD Compliance:** Registro de consentimento (`consent_at`) no momento do cadastro.
- **Proteção de Rotas:** Middleware client-side para garantir que o Dashboard seja acessível apenas por usuários autenticados.
- **Recuperação de Senha:** Fluxo de redefinição de senha via e-mail.
- **Dashboard Responsivo:** Interface otimizada para Desktop e Mobile com tema Dark elegante.
- **Gestão de Perfis:** Criação automática de perfis no banco de dados via Triggers do PostgreSQL.

## 📁 Estrutura do Projeto

```bash
├── src/
│   ├── components/     # Componentes reutilizáveis (UI, Layouts)
│   ├── hooks/          # Hooks personalizados (useAuth, etc)
│   ├── lib/            # Configurações de bibliotecas (Supabase, Utils)
│   ├── pages/          # Páginas da aplicação (Login, Dashboard, etc)
│   ├── App.tsx         # Configuração de rotas e providers
│   └── index.css       # Estilos globais e Tailwind config
├── supabase-migrations.sql # Script SQL para setup do banco de dados
└── .env.example        # Modelo de variáveis de ambiente
```

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/holfoman-wq/SoftwareHouse-Fortaleza.git
cd SoftwareHouse-Fortaleza
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto (ou edite o `.env.local`) e adicione suas chaves do Supabase:

```env
VITE_SUPABASE_URL=https://sua-url-do-project.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

### 4. Setup do Banco de Dados (Supabase)
1. Vá para o [Dashboard do Supabase](https://app.supabase.com/).
2. Abra o **SQL Editor**.
3. Copie o conteúdo do arquivo `supabase-migrations.sql` do projeto.
4. Cole no editor e execute (**Run**). Isso criará as tabelas de `profiles`, `courses` e os triggers de automação.

### 5. Rodar em Desenvolvimento
```bash
npm run dev
```
O projeto estará disponível em `http://localhost:3000`.

## ☁️ Deploy (Vercel)

1. Conecte seu repositório GitHub na [Vercel](https://vercel.com).
2. Adicione as variáveis de ambiente (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`) nas configurações de build da Vercel.
3. O deploy será feito automaticamente a cada push na branch principal.

## 🛡️ Segurança e Boas Práticas

- **RLS (Row Level Security):** Todas as tabelas no Supabase possuem políticas de segurança ativas, garantindo que usuários vejam apenas seus próprios dados.
- **Typescript:** Tipagem estática para evitar erros em tempo de execução.
- **Clean Code:** Componentes pequenos, reutilizáveis e lógica separada em Hooks.

---
Desenvolvido com ☕ e 💻 por **SoftwareHouse Fortaleza**.
