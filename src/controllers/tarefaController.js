import * as tarefaLogic from "../logic/tarefaLogic.js";

export async function obterTarefa(request, response) {
  try {
    const id = Number(request.params.id)
    const tarefa = await tarefaLogic.obterTarefa(id);

    return response.status(200).json(tarefa);
  } catch (error) {
    console.error(`Erro ao obter tarefa: ${error.message}`);

    return response.status(400).json({
      mensagem: "Erro interno do servidor",
    });
  }
}
