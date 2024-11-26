import { MongoClient } from 'mongodb';  // Importa o cliente do MongoDB para permitir a conexão com o banco de dados, isso já vem do mongo.

// Função assíncrona para conectar ao banco de dados MongoDB utilizando a string de conexão fornecida
export default async function conectarAoBanco(stringConexao) {
  let mongoClient;  // Declara uma variável para armazenar a instância do MongoClient

  try {
      mongoClient = new MongoClient(stringConexao);  // Cria uma nova instância do MongoClient com a string de conexão fornecida
      console.log('Conectando ao cluster do banco de dados...');  // Exibe uma mensagem no console indicando que está tentando se conectar ao banco
      await mongoClient.connect();  // Tenta se conectar ao banco de dados de forma assíncrona
      console.log('Conectado ao MongoDB Atlas com sucesso!');  // Exibe uma mensagem indicando que a conexão foi bem-sucedida

      return mongoClient;  // Retorna a instância do MongoClient para que possa ser usada em outras partes do código
  } catch (erro) {
      console.error('Falha na conexão com o banco!', erro);  // Exibe uma mensagem de erro caso a conexão falhe
      process.exit();  // Encerra o processo caso haja falha na conexão com o banco de dados
  }
}
