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

      if (!tarefa.titulo) {
        console.log("batata")
       return response.status(400).json({ mensagem: "O campo titulo é obrigatório" });
      }
      else{
        console.log(" rosa")
         novaTarefa.titulo = tarefa.titulo
      }
      if(tarefa.descricao) novaTarefa.descricao = tarefa.descricao
      if(tarefa.concluida) novaTarefa.concluida = tarefa.concluida
      tarefas.push(novaTarefa)
      console.log(tarefas)
      tarefaRepository.salvar(tarefas)
      return novaTarefa

  } catch (error){
      console.error(`Erro ao obter tarefa: ${error.message}`)

  }
}
