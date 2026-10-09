import * as tarefaLogic from "../logic/tarefaLogic.js";

export async function obterTarefa(request, response) {
  try {
    const id = request.params.id
    console.log(typeof(id))
    console.log(id)
    if((isNaN(id))){
      console.log("arroz", id)
      return response.status(400).json({mensagem: "ID deve ser um numero"})
    }
    console.log("batata")
    const tarefa = await tarefaLogic.obterTarefa(id);
    if(tarefa === null){return response.status(400).json({mensagem: "tarefa nao encotrada"})}
    return response.status(200).json(tarefa);
  } catch (error) {
    console.error(`Erro ao obter tarefa: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}

export async function listarTarefas(request, response) {
  try {
    const tarefas = await tarefaLogic.listarTarefas();

    return response.status(200).json(tarefas);
  } catch (error) {
    console.error(`Erro ao listar tarefas: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}
export async function criarTarefa(request, response) {
  try {
    const {titulo} = request.body
    if(titulo === undefined || titulo.trim()===""){return response.status(400).json({mesagem: "titulo é obrigatorio"})}

    const tarefa = await tarefaLogic.criarTarefa(request.body);

    return response.status(201).json(tarefa);
  } catch (error) {
    console.error(`Erro ao criar tarefa: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}
