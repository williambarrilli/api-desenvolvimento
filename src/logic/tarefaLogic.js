const PRIORIDADE = ["alta","media","baixa"]
import * as tarefaRepository from "../repositories/tarefaRepository.js";

// Mantém a rota inicial GET / retornando a primeira tarefa do banco.
export function obterTarefa() {
  return tarefaRepository.buscarPorId(1);
}

// A logic coordena a consulta; somente o repository conhece o SQL.
export function listarTarefas() {
  return tarefaRepository.listar();
}
export function criarTarefa(tarefa){
  const novaTarefa = {}
  console.log("batata")
  if(tarefa.titulo)novaTarefa.titulo =tarefa.titulo
  if(tarefa.descricao)novaTarefa.descricao=tarefa.descricao
  if(PRIORIDADE.includes(tarefa.prioridade.toLowerCase())){novaTarefa.prioridade=tarefa.prioridade}
  else if(!tarefa.prioridade || tarefa.prioridade.trim() === ""){
    novaTarefa.prioridade = "media"
  }
  if(tarefa.concluida)novaTarefa.concluida = tarefa.concluida
  if(tarefa.usuarioId)novaTarefa.usuarioId=tarefa.usuarioId
  
  tarefaRepository.criar(novaTarefa)
  return novaTarefa
}
