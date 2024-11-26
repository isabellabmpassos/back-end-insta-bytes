import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js"; // Importa as funções para interagir com o banco de dados
import fs from "fs"; // Importa o módulo para manipulação de arquivos
import gerarDescricaoComGemini from "../services/geminiService.js"; // Importa o serviço para gerar descrições utilizando Gemini

// Função para listar todos os posts
export async function listarPosts(req, res) {
    // Busca todos os posts no banco de dados
    const posts = await getTodosPosts();
    // Retorna os posts encontrados no formato JSON com o status HTTP 200 (OK)
    res.status(200).json(posts);
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post a partir do corpo da requisição
    const novoPost = req.body;
    try {
        // Insere o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Retorna o post criado no formato JSON com o status HTTP 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem no console e retorna uma resposta com status HTTP 500 (Erro Interno do Servidor)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Função para fazer upload de uma imagem e criar um post com ela
export async function uploadImagem(req, res) {
    // Cria um objeto representando o novo post com o nome da imagem e campos vazios
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname, // Obtém o nome original do arquivo enviado
        alt: ""
    };

    try {
        // Insere o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        // Renomeia o arquivo de imagem enviado para associá-lo ao ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        // Retorna o post criado no formato JSON com o status HTTP 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem no console e retorna uma resposta com status HTTP 500 (Erro Interno do Servidor)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Função para atualizar um post com uma imagem e uma descrição gerada automaticamente
export async function atualizarNovoPost(req, res) {
    // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição
    const id = req.params.id;
    // Define a URL da imagem com base no ID do post
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        // Lê o arquivo da imagem do diretório "uploads" e cria um buffer de dados
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        // Gera uma descrição para a imagem usando o serviço Gemini
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        // Cria o objeto contendo os dados atualizados do post
        const post = {
            imgUrl: urlImagem, // URL da imagem
            descricao: descricao, // Descrição gerada automaticamente
            alt: req.body.alt // Texto alternativo fornecido na requisição
        };

        // Atualiza o post no banco de dados com os novos dados
        const postCriado = await atualizarPost(id, post);
        // Retorna o post atualizado no formato JSON com o status HTTP 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Em caso de erro, exibe a mensagem no console e retorna uma resposta com status HTTP 500 (Erro Interno do Servidor)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}
