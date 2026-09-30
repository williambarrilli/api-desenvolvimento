const fs = require("fs/promises");
const path = require("path");

const caminhoArquivo = path.join(__dirname, "../../data/tarefa.json");
const tarefaInicial = {
  id: 1,
  titulo: "Aprender Express",
  descricao: "Implementar a primeira tarefa da API",
  prioridade: "media",
  concluida: false,
};

async function ler() {
  try {
    const conteudo = await fs.readFile(caminhoArquivo, "utf-8");
    return JSON.parse(conteudo);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    return salvar(tarefaInicial);
  }
}

async function salvar(tarefa) {
  const conteudo = `${JSON.stringify(tarefa, null, 2)}\n`;
  await fs.writeFile(caminhoArquivo, conteudo, "utf-8");
  return tarefa;
}

module.exports = {
  ler,
  salvar,
};
