import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {

  const tarefas = await tarefaRepository.ler();

  return tarefas;

}

export async function criarTarefa(novaTarefa) {
  try {

    const tarefas = await tarefaRepository.ler();

    let titulo = ''

    let descricao = ''

    let prioridade = ''

    let concluida = false
    
    if (novaTarefa.titulo !== undefined && novaTarefa.titulo.trim() !== ''){
      titulo = novaTarefa.titulo;
    } else {
      console.error('Para criar uma nova tarefa é preciso adicionar um titulo')

      throw new Error ('Para criar uma nova tarefa o titulo é necessario')
    }
    if (novaTarefa.descricao !== undefined){
      descricao = novaTarefa.descricao
    }
    if(novaTarefa.prioridade !== undefined){
      prioridade = novaTarefa.prioridade
    }
    if(novaTarefa.concluida !== undefined){
      concluida = novaTarefa.concluida
    }

    const tarefa = {
      "id": tarefas.length ? Math.max(...tarefas.map((tarefa) => tarefa.id)) + 1 : 1,
      'titulo': titulo,
      'descricao': descricao,
      'prioridade': prioridade,
      'concluida': concluida
    };

    tarefas.push(tarefa);

    await tarefaRepository.salvar(tarefas);

    return tarefa
  }catch (error) {
    console.error(`Erro ao criar tarefa: ${error.message}`);
    throw new Error(`Erro ao criar tarefa: ${error.message}`);
  }
}