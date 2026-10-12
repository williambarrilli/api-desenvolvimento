import * as tarefaRepository from "../repositories/tarefaRepository.js";
import { ErroDeValidacao } from "../models/tarefa.js";

export function obterTarefa() {
  return tarefaRepository.buscarPorId(1);
}

export function listarTarefas() {
  return tarefaRepository.listar();
}

export function cadastrarTarefa(requestBody){
  const novaTarefa = {
    titulo: requestBody.titulo,
    descricao: requestBody.descricao,
    prioridade: requestBody.prioridade,
    concluida: requestBody.concluida,
    usuarioId: requestBody.usuarioId,
  };
  return tarefaRepository.criar(novaTarefa);
}


function validarId(id) {
  const idNumerico = Number(id);

  if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
    throw new ErroDeValidacao("O id deve ser um número inteiro positivo");
  }

  return idNumerico;
}

export function listarTarefaPorId(id) {
  return tarefaRepository.buscarPorId(validarId(id));
}

export function atualizarTarefa(id, requestBody) {
  const idNumerico = validarId(id);
  const { titulo, descricao, prioridade, concluida } = requestBody;
  const campos = {};

  if (titulo !== undefined) {
    if (typeof titulo !== "string" || titulo.trim() === "") {
      throw new ErroDeValidacao("O campo titulo deve ser um texto não vazio");
    }
    campos.titulo = titulo.trim();
  }

  if (descricao !== undefined) {
    if (typeof descricao !== "string") {
      throw new ErroDeValidacao("O campo descricao deve ser um texto");
    }
    campos.descricao = descricao;
  }

  if (prioridade !== undefined) {
    if (!["baixa", "media", "alta"].includes(prioridade)) {
      throw new ErroDeValidacao("O campo prioridade deve ser: baixa, media, alta");
    }
    campos.prioridade = prioridade;
  }

  if (concluida !== undefined) {
    if (typeof concluida !== "boolean") {
      throw new ErroDeValidacao("O campo concluida deve ser true ou false");
    }
    campos.concluida = concluida;
  }

  return tarefaRepository.atualizar(idNumerico, campos);
}

export function removerTarefa(id) {
  const idNumerico = validarId(id);
  const tarefa = tarefaRepository.buscarPorId(idNumerico);

  if(!tarefa) return null;

  tarefaRepository.remover(idNumerico);
  return tarefa;
}

export function concluirTarefa(id) {
  const idNumerico = validarId(id);

  return tarefaRepository.atualizar(idNumerico, { concluida: true });
}




