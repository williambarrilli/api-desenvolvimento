import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa(id) {
  const tarefas = await tarefaRepository.ler();
  
  const tarefaBuscada = tarefas.find((tarefa => tarefa.id == Number(id)));
  console.log(tarefaBuscada, 'ajajajja');
}
