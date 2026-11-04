import * as tarefaRepository from "../repositories/tarefaRepository.js";
import {Tarefa} from "../models/tarefa.js";
// Mantém a rota inicial GET / retornando a primeira tarefa do banco.
export function obterTarefa(id) {
  return tarefaRepository.buscarPorId(id);
}

// A logic coordena a consulta; somente o repository conhece o SQL.
export function listarTarefas() {
  return tarefaRepository.listar();
}
export function cadastrarTarefa(body) {
  const novaTarefa= new Tarefa({
    titulo:body.titulo,
    descricao:body.descricao,
    prioridade:body.prioridade,
    concluida:body.concluida,
  })
  return tarefaRepository.criar(novaTarefa);
}
export function atualizarTarefa(id, body) {
  const atual = tarefaRepository.buscarPorId(id);

  if (!atual) {
    const erro = new Error("Tarefa não encontrada");
    erro.status = 404;
    throw erro;
  }


  const  tarefa = new Tarefa({
      titulo: body.titulo ?? atual.titulo,
      descricao: body.descricao ?? atual.descricao ?? "",
      prioridade: body.prioridade ?? atual.prioridade ?? undefined,
      concluida: body.concluida ?? atual.concluida,
    })

  const duplicada = tarefaRepository
    .listar()
    .some((t) => t.id !== atual.id && t.titulo.toLowerCase() === tarefa.titulo.toLowerCase());

  if (duplicada) {
    const erro = new Error("O campo titulo deve ser único");
    erro.status = 409;
    throw erro;
  }

  return tarefaRepository.atualizar(atual.id, tarefa);
}