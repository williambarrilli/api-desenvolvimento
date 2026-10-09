import * as tarefaRepository from "../repositories/tarefaRepository.js";
import { Tarefa } from "../models/tarefa.js";

// Mantém a rota inicial GET / retornando a primeira tarefa do banco.
export function obterTarefa() {
  return tarefaRepository.buscarPorId(1);
}

// A logic coordena a consulta; somente o repository conhece o SQL.
export function listarTarefas() {
  return tarefaRepository.listar();
}

export function criarTarefa(dados) {
  const tarefa = new Tarefa(dados)

  return tarefaRepository.criar(tarefa);
}