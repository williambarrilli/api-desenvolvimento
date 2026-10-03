import * as tarefaLogic from "../logic/tarefaLogic.js";
import { ErroHttp } from "../utils/erroHttp.js";

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

export async function obterTarefaPorId(request, response) {
  try {
    const tarefa = await tarefaLogic.obterTarefaPorId(request.params.id);

    return response.status(200).json(tarefa);
  } catch (error) {

    console.error(`Erro ao obter tarefa por id: ${error.message}`);

    if (error instanceof ErroHttp) {
      return response.status(error.status).json({ mensagem: error.message });
    }

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}
