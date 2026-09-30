const tarefaRepository = require("../repositories/tarefaRepository");

async function obterTarefa() {
  return tarefaRepository.ler();
}

module.exports = {
  obterTarefa,
};
