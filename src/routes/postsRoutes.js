import express from "express";  // Importa o framework Express para criar a aplicação web
import multer from "multer";  // Importa o Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";  // Importa as funções controladoras para lidar com a lógica dos posts
import cors from "cors";  // Importa o middleware CORS para permitir o compartilhamento de recursos entre origens. O CORS é como uma "lista VIP" do seu servidor, onde você coloca os sites que podem interagir com ele.

const corsOptions = {  // Define as opções de configuração para o CORS
  origin: "http://localhost:8000",  // Permite que o frontend, que está rodando na porta 8000, faça requisições para o servidor. O CORS só controla quem pode enviar requisições de outro site ou aplicação.
  optionsSuccessStatus: 200  // Define o status de sucesso da resposta para 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {  // Define o diretório onde as imagens serão armazenadas
    cb(null, 'uploads/');  // As imagens serão armazenadas no diretório 'uploads/'
  },
  filename: function (req, file, cb) {  // Define o nome do arquivo ao ser salvo
    cb(null, file.originalname);  // Mantém o nome original do arquivo (pode-se mudar para gerar nomes únicos em produção)
  }
});

// Cria uma instância do middleware Multer com a configuração de armazenamento definida acima
const upload = multer({ storage: storage });

// Define as rotas usando o objeto Express app
const routes = (app) => {
  app.use(express.json());  // Permite que o servidor interprete corpos de requisições no formato JSON
  app.use(cors(corsOptions))  // Aplica o middleware CORS com as opções configuradas acima

  // Rota para recuperar uma lista de todos os posts
  app.get("/posts", listarPosts);  // Chama a função controladora listarPosts para obter todos os posts

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);  // Chama a função controladora postarNovoPost para criar um novo post

  // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
  app.post("/upload", upload.single("imagem"), uploadImagem);  // Chama a função controladora uploadImagem para processar o upload da imagem

  app.put("/upload/:id", atualizarNovoPost);  // Rota para atualizar o post, utilizando a função controladora atualizarNovoPost
};

export default routes;  // Exporta as rotas definidas para serem usadas no servidor
