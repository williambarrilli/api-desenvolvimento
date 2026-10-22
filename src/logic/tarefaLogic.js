import { Tarefa } from "../models/tarefa.js";
import * as tarefaRepository from "../repositories/tarefaRepository.js";


export function obterTarefa() {
  return tarefaRepository.buscarPorId(1);
}


export function listarTarefas() {
  return tarefaRepository.listar();
}

export function cadastrarTarefa(body) {

  const novaTarefa = new Tarefa(body);

  return tarefaRepository.criar(novaTarefa);
}
export function atualizarTarefa(id, body) {
  const tarefaAtual = tarefaRepository.buscarPorId(id);

  if (!tarefaAtual) {
    const erro = new Error("Tarefa não encontrada");
    erro.status = 404;
    throw erro;
  }

    const tarefaValidada = new Tarefa({ ...tarefaAtual, ...body });

  if (tarefaAtual.concluida && tarefaValidada.prioridade !== tarefaAtual.prioridade) {
    const erro = new Error("Não é possível mudar a prioridade de uma tarefa concluída");
    erro.status = 409;
    throw erro;
  }
  const tituloNovo = tarefaValidada.titulo.toLowerCase();

  const repetido = tarefaRepository.listar().some((t) => t.id !== id && t.titulo.trim().toLowerCase() === tituloNovo);

  if (repetido) {
    const erro = new Error("Já existe uma tarefa com esse título");
    erro.status = 409;
    throw erro;
  }

  return tarefaRepository.atualizar(id, tarefaValidada);
}

export function buscarTarefa(id) {
  const tarefa = tarefaRepository.buscarPorId(id);

  if (!tarefa) {
    const erro = new Error("Tarefa não encontrada");
    erro.status = 404;
    throw erro;
  }

  return tarefa;
}