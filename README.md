# Caderneta de Gastos

App pessoal de controle de gastos: lê o cupom fiscal pela foto (QR Code + leitura automática), separa por categorias com limites, soma os gastos fixos do mês e exporta em PDF ou CSV.

Funciona direto no navegador do iPhone, com ícone na tela de início, sem depender do app Claude. Os lançamentos ficam guardados **só no seu aparelho**.

## O que tem nesta pasta

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app |
| `manifest.webmanifest` | Nome e ícone quando instalado no iPhone |
| `sw.js` | Faz o app abrir mesmo sem internet |
| `icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Ícones |
| `README.md` | Este guia |

Nenhum arquivo contém seus dados ou sua chave da API.

---

## 1. Entrar no GitHub

1. Abra **github.com/login** no computador.
2. Se não lembra se tem conta, toque em **Forgot password?** e informe seu e-mail. Se houver conta, chega um e-mail para criar nova senha.
3. Se não houver conta, volte e crie uma em **github.com/signup** (gratuita).

## 2. Criar o repositório

1. No GitHub, clique no **+** (canto superior direito) → **New repository**.
2. **Repository name:** `caderneta`
3. Marque **Public**. O GitHub Pages gratuito exige repositório público: o código do app fica visível, mas seus gastos e sua chave **não** estão nos arquivos.
4. Clique em **Create repository**.

## 3. Enviar os arquivos

1. Na página do repositório recém-criado, clique em **uploading an existing file**.
2. Arraste **os arquivos desta pasta** (não a pasta inteira) para a área indicada.
3. Clique em **Commit changes**.

## 4. Publicar o site

1. No repositório, vá em **Settings** → **Pages** (menu da esquerda).
2. Em **Source**, escolha **Deploy from a branch**.
3. Em **Branch**, escolha **main** e a pasta **/ (root)** → **Save**.
4. Espere 1 a 2 minutos e recarregue a página. Aparece o endereço do app, no formato:
   `https://SEU-USUARIO.github.io/caderneta/`

## 5. Instalar no iPhone

1. Abra esse endereço no **Safari**.
2. Toque em **Compartilhar** → **Adicionar à Tela de Início** → **Adicionar**.
3. Abra sempre pelo ícone. O app abre em tela cheia, sem a barra do Safari.

> O app instalado na tela de início guarda os dados separado do Safari. Lance e restaure backups **pelo ícone**, não pelo Safari.

## 6. Ligar a leitura automática das notas

Sem a chave, o app já lê o QR Code (chave de acesso e link da SEFAZ). Valor, local e itens você digita. Com a chave, ele lê tudo da foto.

1. Acesse **console.anthropic.com** e crie sua conta.
2. Em **Billing**, adicione crédito (a compra mínima já dura muito tempo para uso pessoal).
3. Em **Limits**, defina um limite de gasto mensal, por segurança.
4. Em **API Keys** → **Create Key**, dê um nome (ex.: Caderneta) e copie a chave. Ela começa com `sk-ant-`.
5. No app: **Ajustes** → cole a chave → **Salvar** → **Testar chave**.

**Custo aproximado por nota lida:** cerca de 2 centavos de dólar com o modelo Sonnet 5.5 (mais preciso), bem menos com o Haiku 5.5 (mais barato). Você escolhe em Ajustes.

A chave fica guardada só no iPhone e é enviada apenas para a Anthropic. Não coloque a chave em nenhum arquivo do GitHub.

## 7. Trazer o que você já lançou no app do Claude

1. Abra a Caderneta no Claude e toque em **Backup**. Salve o arquivo `.json` em Arquivos.
2. No app novo (pelo ícone): **Ajustes** → **Restaurar backup** → escolha o arquivo.

Lançamentos, gastos fixos, categorias e limites vêm juntos. As fotos das notas não.

---

## Cuidados

- **Faça backup de vez em quando** (Ajustes → Fazer backup) e guarde no iCloud Drive. Se você remover o ícone da tela de início, o iPhone pode apagar os dados do app.
- **Atualizações:** quando houver uma versão nova, substitua o `index.html` no GitHub (**Add file → Upload files**, mesmo nome). O app pega a versão nova na próxima vez que abrir com internet. Seus dados não são afetados.
