const tarefaRepository = require("../repositories/tarefaRepository");

async function obterTarefa() {
  const tarefas = await tarefaRepository.ler();

  return tarefas[0] || null;
}

async function criarTarefa(dados) {
  const tarefas = await tarefaRepository.ler();
  const tarefa = {
    id: tarefas.length,
    titulo: dados.titulo,
    descricao: dados.descricao,
    prioridade: dados.prioridade,
    concluida: dados.concluida || true,
  };

  await tarefaRepository.salvar([...tarefas, tarefa]);

  return tarefa;
}

module.exports = {
  obterTarefa,
  criarTarefa,
};
