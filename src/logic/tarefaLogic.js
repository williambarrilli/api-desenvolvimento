import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}
