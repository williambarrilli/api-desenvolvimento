import * as tarefaRepository from "../repositories/tarefaRepository.js";
import { ErroHttp } from "../utils/erroHttp.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function obterTarefaPorId(idParametro) {
  const id = Number(idParametro);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ErroHttp(400, "O ID deve ser um número inteiro positivo.");
  }

  const tarefas = await tarefaRepository.ler();
  const tarefa = tarefas.find((tarefaAtual) => tarefaAtual.id === id);

  if (!tarefa) {
    throw new ErroHttp(404, "Tarefa não encontrada.");
  }

  return tarefa;
}
