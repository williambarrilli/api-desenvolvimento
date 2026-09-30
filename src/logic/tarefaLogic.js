const tarefaRepository = require("../repositories/tarefaRepository");

async function obterTarefa() {
  return tarefaRepository.ler();
}

async function criarTarefa(titulo) {
  const tarefaAtual = await tarefaRepository.ler();
  const proximoId = tarefaAtual?.id ? tarefaAtual.id + 1 : 1;

  return tarefaRepository.salvar({
    id: proximoId,
    titulo,
  });
}

module.exports = {
  obterTarefa,
  criarTarefa,
};
