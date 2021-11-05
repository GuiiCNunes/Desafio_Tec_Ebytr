# Desafio Técnico Ebytr

## Objetivo

  O objetivo desse repositório é a realização do desafio técnico para a empresa [Ebytr](https://www.betrybe.com/). Esse desafio consiste em uma aplicação que simule um *to-do-list*, onde o usuário pode ver, inserir, excluir e editar tarefas. Tendo *front-end* e *back-end* no mesmo repositório, divididos em seus respectivos diretórios.
  [Para mais informações do desafio](https://guiicnunes.notion.site/Desafio-T-cnico-Blitz-Trybe-79c40b735f264cea86fe44668a615d73)

## Dependências

  O projeto utiliza um *front-end* em [React](https://pt-br.reactjs.org/) e um *back-end* com [Node.Js](https://nodejs.org/en/). O banco de dados utilizado foi o [MongoDB](https://www.mongodb.com/). Cabe destaque para o uso do [Redux](https://redux.js.org/) no *front-end* e [Express](https://expressjs.com/pt-br/starter/installing.html) no *back-end*.

  Por se tratar de duas aplicações distintas (*front* e *back*), foi necessário criar pacotes (*npm*) específicos para cada um. Tendo cada diretório as seguintes dependências:

  * *Front-end*
    ```
    "axios": "0.24.0"
    "prop-types": "15.7.2"
    "react": "17.0.2"
    "react-dom": "17.0.2"
    "react-redux": "7.2.6"s
    "react-scripts": "4.0.3"
    "redux": "4.1.2"
    "redux-devtools-extension": "2.13.9"
    "redux-thunk": "2.4.0"
    "web-vitals": "1.1.2"
    ```
  * *Back-end*
    ```
    "cors": "2.8.5"
    "dotenv": "8.2.0"
    "express": "4.17.1"
    "express-rescue": "1.1.30"
    "frisby": "2.1.2"
    "jest": "26.4.1"
    "jsonwebtoken": "8.5.1"
    "mongodb": "3.5.9"
    "nodemon": "2.0.4"
    "shelljs": "0.8.4"
    ```

## Como rodar

  Para rodar o projeto:
  1. Clone o repositório nas pasta desejada com:

  ```
  git clone git@github.com:GuiiCNunes/Desafio_Tec_Ebytr.git
  ```

  2. Inicialize o mongodb:

  ```
  sudo systemctl start mongod
  ```

  3. Instale as dependências do *back-end* e inicie a aplicação.

  ```
  cd BACKEND
  npm install
  npm run dev
  ```

  4. Instale as dependências do *front-end* e inicie a aplicação.

  ```
  cd ../frontend
  npm install
  npm start
  ```

  5. Seu navegador será aberto com a aplicação rodando.

## Arquitetura

  A arquitetura utilizada foi a proposta no desafio, **MSV**. Tendo a Stack [MERN](https://www.mongodb.com/mern-stack) como orientação.

  A organização dos diretórios se deu como:

  ```
  BACKEND
    - src
      - api
      - controller
      - helpers
      - middlewares
      - model
      - routers
      - service
    - tests
      - unit
  frontend
    - public
    - src
      - components
      - pages
      - redux
        - actions
        - reducers
      - services
  ```