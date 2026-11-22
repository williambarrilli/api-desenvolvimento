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
    const tarefas = await tarefaLogic.listarTarefas(request.query);

    return response.status(200).json(tarefas);
  } catch (error) {
    if (error.status) {
      return response.status(error.status).json({ mensagem: error.message });
    }

    console.error(`Erro ao listar tarefas: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}

export async function cadastrarTarefa(request, response) {
  try {
    const novaTarefa = await tarefaLogic.cadastrarTarefa(request.body ?? {});

    return response.status(201).json(novaTarefa);
  } catch (error) {
    return response.status(error.status ?? 400).json({ mensagem: error.message });
  }
}


export async function atualizarTarefa(request, response) {
  try {
    const id = Number(request.params.id);
    const tarefa = await tarefaLogic.atualizarTarefa(id, request.body ?? {});

    if (!tarefa) {
      return response.status(404).json({ mensagem: "Tarefa não encontrada" });
    }

    return response.status(200).json(tarefa);
  } catch (error) {
  return response.status(error.status ?? 400).json({ mensagem: error.message });
}
}

export async function buscarTarefa(request, response) {
  try {
    const tarefa = await tarefaLogic.buscarTarefa(Number(request.params.id));

    return response.status(200).json(tarefa);
  } catch (error) {
    return response.status(error.status ?? 500).json({ mensagem: error.message });
  }
}

export async function obterResumo(request, response) {
  try {
    const resumo = await tarefaLogic.obterResumo();

    return response.status(200).json(resumo);
  } catch (error) {
    console.error(`Erro ao obter resumo: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}
