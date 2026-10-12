import * as tarefaLogic from "../logic/tarefaLogic.js";
import { ErroDeValidacao } from "../models/tarefa.js";


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
    
    if(titulo === undefined || titulo.trim() === ""){
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


export async function listarTarefaPorId(request, response) {
  try {
    const tarefa = await tarefaLogic.listarTarefaPorId(request.params.id);

    if (!tarefa) {
      return response.status(404).json({ mensagem: "Tarefa não encontrada" });
    }

    return response.status(200).json(tarefa);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return response.status(400).json({ mensagem: error.message });
    }

    console.error(`Erro ao listar tarefa por ID: ${error.message}`);

    return response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

export async function atualizarTarefa(request, response) {
  try {
    const tarefa = await tarefaLogic.atualizarTarefa(
      request.params.id,
      request.body,
);

    if (!tarefa) {
      return response.status(404).json({ mensagem: "Tarefa não encontrada" });
    }

    return response.status(200).json(tarefa);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return response.status(400).json({ mensagem: error.message });
    }

    console.error(`Erro ao atualizar tarefa: ${error.message}`);

    return response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}