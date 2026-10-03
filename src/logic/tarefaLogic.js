import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function removerTarefa(idParametro) {
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

  const tarefasRestantes = tarefas.filter(
    (tarefaAtual) => tarefaAtual.id !== id,
  );

  await tarefaRepository.salvar(tarefasRestantes);

  return tarefa;
}
