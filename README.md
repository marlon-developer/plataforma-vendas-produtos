<h1 align="center">
    Plataforma para catalogar e vender produtos
</h1>

<p align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<br>

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Adonis Framework](https://adonisjs.com/)
- [Vue JS](https://vuejs.org/)
- [MySQL](https://www.mysql.com/)

## 💻 Projeto

Uma aplicação web para catalogar, realizar e receber pedidos de produtos

## 🤔 Como usar

- Instale o NodeJS versão 12.18.3 https://nodejs.org/en/download/
- Instale o Yarn https://classic.yarnpkg.com/lang/en/docs/install/ (Opcional pode usar o npm caso seja de sua preferência)
- Instale o Adonis framework versão 4.0.12 https://docs.adonisjs.com/guides/installation
- Instale o mysql versão 5.7 https://www.mysql.com/downloads/
- Clone o repositório https://github.com/marlon-developer/plataforma-vendas-produtos
- Importe o Banco de Dados que está no repositório do projeto
    - Aconselha-se usar o mysql Workbench ambiente onde foi testado
    - No menu clique em Server/Data Import
    - Escolha o diretório do backup do banco de dados com o nome ecommerce

## Os Comandos seguintes irão instalar as dependencias
- Navegue até o repositório server/ e rode npm install ou yarn install
- Navegue até o repositório web/admin e rode npm install ou yarn install
- Navegue até o repositório web/client e rode npm install ou yarn install

## Configuração de Ambiente 
- Configure os arquivos .env de acordo com suas configurações locais ou use as mesmas já existens nos arquivos a fim de evitar problemas para executar
- Para ver ou alterar as configurações dos arquivos .env navegue até o diretório /server/.env

## Login
- O login usado tem permissão máxima então conseguirá logar como administrador e/ou cliente <br>
    Usuário: dev@dev.com.br <br>
    Senha: 123456

## Startando a aplicação
- Navegue até o repositório server/ npm run dev ou yarn run dev
- Navegue até o repositório web/admin npm run dev ou yarn run dev
- Navegue até o repositório web/client npm run dev ou yarn run dev

- No browser digite http://127.0.0.1:9527 (Abrirá a Tela do Administrador)
- No browser digite http://127.0.0.1:8080 (Abrirá a Tela do Cliente)

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para maiores detalhes.

---

Desenvolvidor por Márlon da Rosa (https://github.com/marlon-developer)
