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

export async function removerTarefa(request, response) {
  try {
    const tarefa = await tarefaLogic.removerTarefa(request.params.id);

    return response.status(200).json(tarefa);
  } catch (error) {
    if (error.status) {
      return response.status(error.status).json({ mensagem: error.message });
    }

    console.error(`Erro ao remover tarefa: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}
