import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function listarTarefas(buscaParametro) {
  const tarefas = await tarefaRepository.ler();

  if (buscaParametro === undefined) {
    return tarefas;
  }

  const busca = buscaParametro.toLowerCase();

  return tarefas.filter((tarefa) => tarefa.titulo.toLowerCase().includes(busca));
}
