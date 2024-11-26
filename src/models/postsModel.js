import 'dotenv/config';  // Carrega as variáveis de ambiente definidas no arquivo .env
import { ObjectId } from "mongodb";  // Importa a função ObjectId do MongoDB para trabalhar com IDs de objetos
import conectarAoBanco from "../config/dbConfig.js"  // Importa a função que conecta ao banco de dados a partir do arquivo de configuração

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados chamado "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção chamada "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção "posts"
    return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção chamada "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Insere um novo post na coleção e retorna o resultado da operação
    return colecao.insertOne(novoPost);
}

// Função assíncrona para atualizar um post existente no banco de dados
export async function atualizarPost(id, novoPost) {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção chamada "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Cria um ObjectId a partir do ID fornecido para buscar o post específico
    const objID = ObjectId.createFromHexString(id);
    // Atualiza o post no banco de dados, substituindo os dados antigos pelos novos
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
