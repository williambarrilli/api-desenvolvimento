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


export async function criarTarefa(request, response ) {
  try {
    const tarefa = await tarefaLogic.criarTarefa(request.body);

    return response.status(201).json(tarefa);

  } catch (error) {
    console.error(`Erro ao criar tarefa: ${error.message}`);
    
    return response.status(400).json({
      mensagem: error.message,
    });
  }
}
