import { GoogleGenerativeAI } from "@google/generative-ai";  // Importa a biblioteca GoogleGenerativeAI para usar a IA gerativa do Google

// Cria uma instância do GoogleGenerativeAI usando a chave da API definida nas variáveis de ambiente
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo generativo do Gemini para gerar conteúdo (no caso, a descrição da imagem)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função assíncrona para gerar a descrição de uma imagem utilizando o modelo Gemini
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Define o prompt (mensagem) que será enviado para a IA, pedindo uma descrição da imagem
  const prompt =
    "Gere uma descrição em português do Brasil para a seguinte imagem";

  try {
    // Prepara os dados da imagem em formato base64 para enviar à IA
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),  // Converte a imagem para formato base64
        mimeType: "image/png",  // Define o tipo MIME da imagem (PNG)
      },
    };
    // Envia o prompt e os dados da imagem para o modelo Gemini para gerar o conteúdo (descrição)
    const res = await model.generateContent([prompt, image]);
    // Retorna o texto gerado pela IA ou uma mensagem padrão caso a descrição não seja gerada
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Em caso de erro, exibe uma mensagem de erro no console e lança uma exceção
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
