import * as tarefaLogic from "../logic/tarefaLogic.js";

export async function obterTarefa(request, response) {
  try {
    const tarefa = await tarefaLogic.obterTarefa();

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

export async function  cadastrarTarefa(request, response) {
  try{
    const { titulo } = request.body;
    
    if(titulo === undefined || titulo.trim === ""){
      return response.status(400).json({
        mensagem: "O campo titulo é obrigatorio",
      });
    } 
    const tarefa = await tarefaLogic.cadastrarTarefa(request.body);

    return response.status(201).json(tarefa)
  }catch (error){
      console.error(`erro ao criar tarefas: ${error.message}`);
    
    return response.status(500).json({mensagem: 'Erro interno do servidor',});
}
}
