const tarefaRepository = require("../repositories/tarefaRepository");

export async function obterTarefa() {
  return tarefaRepository.ler();
}
