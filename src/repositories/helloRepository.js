const fs = require("fs/promises");
const path = require("path");

const caminhoArquivo = path.join(__dirname, "../../data/hello.json");
const mensagemInicial = { mensagem: "Hello World" };

async function ler() {
  try {
    const conteudo = await fs.readFile(caminhoArquivo, "utf-8");
    return JSON.parse(conteudo);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    return salvar(mensagemInicial);
  }
}

async function salvar(dados) {
  const conteudo = `${JSON.stringify(dados, null, 2)}\n`;
  await fs.writeFile(caminhoArquivo, conteudo, "utf-8");
  return dados;
}

module.exports = {
  ler,
  salvar,
};
