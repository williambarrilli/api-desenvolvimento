import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function concluirTarefa(idParametro) {
  const id = Number(idParametro);

  if (!Number.isInteger(id) || id <= 0) {
    const erro = new Error("O ID deve ser um número inteiro positivo.");
    erro.status = 400;
    throw erro;
  }

  const tarefas = await tarefaRepository.ler();
  const tarefa = tarefas.find((tarefaAtual) => tarefaAtual.id === id);

  if (!tarefa) {
    const erro = new Error("Tarefa não encontrada.");
    erro.status = 404;
    throw erro;
  }

  if (tarefa.concluida === true) {
    return tarefa;
  }

  tarefa.concluida = true;

  await tarefaRepository.salvar(tarefas);

  return tarefa;
}
