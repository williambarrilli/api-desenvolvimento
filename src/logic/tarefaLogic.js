import * as tarefaRepository from "../repositories/tarefaRepository.js";

// Mantém a rota inicial GET / retornando a primeira tarefa do banco.
export function obterTarefa() {
  return tarefaRepository.buscarPorId(1);
}

// A logic coordena a consulta; somente o repository conhece o SQL.
export function listarTarefas() {
  return tarefaRepository.listar();
}

export function cadastrarTarefa(requestBody){
  const novaTarefa = {
    titulo: requestBody.titulo,
    decricao: requestBody.decricao,
    prioridade: requestBody.prioridade,
    concluida: requestBody.concluida,
    usuarioId: requestBody.usuarioId,
  };
  tarefaRepository.criar(novaTarefa);
export function cadastrarTarefas(body) {
  const novaTarefa={
    titulo:body.titulo,
    descricao:body.descricao,
    prioridade:body.prioridade,
    concluida:body.concluida,
    usuarioId:body.usuarioId,
  }
  return tarefaRepository.criar(novaTarefa);
}