import express from "express";  // Importa o framework Express, que facilita a criação de servidores web

import routes from "./src/routes/postsRoutes.js";  // Importa as rotas definidas no arquivo postsRoutes.js

const app = express();  // Cria uma instância do aplicativo Express

// Define que o Express deve servir arquivos estáticos (como imagens) a partir do diretório "uploads"
app.use(express.static("uploads"));

// Chama a função que define as rotas do aplicativo, passando o aplicativo Express como argumento
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver em funcionamento
app.listen(3000, () => {
    console.log("Servidor escutando...");  // Exibe uma mensagem indicando que o servidor está ouvindo na porta 3000
});
