const fs = require("fs/promises");
const path = require("path");

const caminhoArquivo = path.join(__dirname, "../../data/tarefa.json");

async function ler() {
  try {
    const conteudo = await fs.readFile(caminhoArquivo, "utf-8");
    const dados = JSON.parse(conteudo);

    return Array.isArray(dados) ? dados : [dados];
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    return [];
  }
}

async function salvar(tarefas) {
  const conteudo = `${JSON.stringify(tarefas, null, 2)}\n`;

  await fs.mkdir(path.dirname(caminhoArquivo), { recursive: true });
  await fs.writeFile(caminhoArquivo, conteudo, "utf-8");
  return tarefas;
}

module.exports = {
  ler,
  salvar,
};
