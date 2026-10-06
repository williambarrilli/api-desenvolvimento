import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function listarTarefas() {
  const tarefas = await tarefaRepository.listar();

  return tarefas.slice(0, 1);
}
