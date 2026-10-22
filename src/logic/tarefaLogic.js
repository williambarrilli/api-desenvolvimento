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
