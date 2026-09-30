const tarefaRepository = require("../repositories/tarefaRepository");

async function obterTarefa() {
  const tarefas = await tarefaRepository.ler();

  return tarefas[0] || null;
}

async function criarTarefa(dados) {
  const tarefas = await tarefaRepository.ler();
  const ids = tarefas
    .map((tarefa) => Number(tarefa.id))
    .filter((id) => Number.isInteger(id));
  const proximoId = (ids.length > 0 ? Math.max(...ids) : 0) + 1;
  const tarefa = {
    id: proximoId,
    titulo: dados.titulo.trim(),
    descricao: dados.descricao,
    prioridade: dados.prioridade,
    concluida: dados.concluida ?? false,
  };

  await tarefaRepository.salvar([...tarefas, tarefa]);

  return tarefa;
}

module.exports = {
  obterTarefa,
  criarTarefa,
};
