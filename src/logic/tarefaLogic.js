import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}
export async function criarTarefa(tarefa) {
  try{
    console.log("arroz")
    const tarefas = await tarefaRepository.ler()
    const novaTarefa = {id: tarefas.length
      ? Math.max(...tarefas.map((tarefa) => tarefa.id)) + 1
      : 1,
      concluida: false
      }

      if(tarefa.titulo) novaTarefa.titulo = tarefa.titulo
      if(tarefa.descricao) novaTarefa.descricao = tarefa.descricao
      if(tarefa.concluida) novaTarefa.concluida = tarefa.concluida
      if(!tarefa.prioridade){novaTarefa.prioridade = "media"}
      else{
        tarefa.prioridade = novaTarefa.prioridade 
      }
      tarefas.push(novaTarefa)
      tarefaRepository.salvar(tarefas)
      return novaTarefa

  } catch (error){
      console.error(`Erro ao obter tarefa: ${error.message}`)

  }
}
