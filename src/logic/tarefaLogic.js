import { Tarefa } from "../models/tarefa.js";
import * as tarefaRepository from "../repositories/tarefaRepository.js";
import * as usuarioRepository from "../repositories/usuarioRepository.js";


export function obterTarefa() {
  return tarefaRepository.buscarPorId(1);
}


export function listarTarefas(filtros = {}) {
  const { busca, usuarioId } = filtros;

  if (usuarioId !== undefined) {
    if (typeof usuarioId !== "string" || !/^\d+$/.test(usuarioId) || Number(usuarioId) <= 0) {
      const erro = new Error("O parâmetro usuarioId deve ser um número inteiro positivo");
      erro.status = 400;
      throw erro;
    }

    return tarefaRepository.listarPorUsuario(Number(usuarioId));
  }

  if (busca === undefined) {
    return tarefaRepository.listar();
  }

  if (typeof busca !== "string") {
    const erro = new Error("O parâmetro busca deve ser um texto");
    erro.status = 400;
    throw erro;
  }

  const termo = busca.trim();

  if (termo === "") {
    return tarefaRepository.listar();
  }

  return tarefaRepository.pesquisarPorTitulo(termo);
}

export function cadastrarTarefa(body) {
  const novaTarefa = new Tarefa(body);

  if (body.usuarioId === undefined || body.usuarioId === null) {
    const erro = new Error("O campo usuarioId é obrigatório");
    erro.status = 400;
    throw erro;
  }

  if (!Number.isInteger(body.usuarioId) || body.usuarioId <= 0) {
    const erro = new Error("O campo usuarioId deve ser um número inteiro positivo");
    erro.status = 400;
    throw erro;
  }

  if (!usuarioRepository.buscarPorId(body.usuarioId)) {
    const erro = new Error("Usuário não encontrado");
    erro.status = 404;
    throw erro;
  }

  const tituloNormalizado = novaTarefa.titulo.toLowerCase();
  const duplicada = tarefaRepository
    .listar()
    .some((t) => t.titulo.trim().toLowerCase() === tituloNormalizado);

  if (duplicada) {
    const erro = new Error("Já existe uma tarefa com esse título");
    erro.status = 409;
    throw erro;
  }

  if (novaTarefa.usuarioId !== null && !novaTarefa.concluida) {
    const abertas = tarefaRepository
      .listar()
      .filter((t) => t.usuarioId === novaTarefa.usuarioId && !t.concluida).length;

    if (abertas >= 3) {
      const erro = new Error("O usuário já tem 3 tarefas abertas");
      erro.status = 409;
      throw erro;
    }
  }

  return tarefaRepository.criar(novaTarefa);
}


export function atualizarTarefa(id, body) {
  const tarefaAtual = tarefaRepository.buscarPorId(id);

  if (!tarefaAtual) {
    const erro = new Error("Tarefa não encontrada");
    erro.status = 404;
    throw erro;
  }

    const tarefaValidada = new Tarefa({ ...tarefaAtual, ...body });

  if (tarefaAtual.concluida && tarefaValidada.prioridade !== tarefaAtual.prioridade) {
    const erro = new Error("Não é possível mudar a prioridade de uma tarefa concluída");
    erro.status = 409;
    throw erro;
  }
  const tituloNovo = tarefaValidada.titulo.toLowerCase();

  const repetido = tarefaRepository.listar().some((t) => t.id !== id && t.titulo.trim().toLowerCase() === tituloNovo);

  if (repetido) {
    const erro = new Error("Já existe uma tarefa com esse título");
    erro.status = 409;
    throw erro;
  }

  return tarefaRepository.atualizar(id, tarefaValidada);
}

export function buscarTarefa(id) {
  const tarefa = tarefaRepository.buscarPorId(id);

  if (!tarefa) {
    const erro = new Error("Tarefa não encontrada");
    erro.status = 404;
    throw erro;
  }

  return tarefa;
}

export function obterResumo() {
  return tarefaRepository.resumo();
}

export function transferirTarefa(idInformado, body) {
  const id = Number(idInformado);

  if (!Number.isInteger(id) || id <= 0) {
    const erro = new Error("ID de tarefa inválido");
    erro.status = 400;
    throw erro;
  }

  const usuarioId = body.usuarioId;

  if (usuarioId === undefined || usuarioId === null) {
    const erro = new Error("O campo usuarioId é obrigatório");
    erro.status = 400;
    throw erro;
  }

  if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
    const erro = new Error("O campo usuarioId deve ser um número inteiro positivo");
    erro.status = 400;
    throw erro;
  }

  if (!tarefaRepository.buscarPorId(id)) {
    const erro = new Error("Tarefa não encontrada");
    erro.status = 404;
    throw erro;
  }

  if (!usuarioRepository.buscarPorId(usuarioId)) {
    const erro = new Error("Usuário não encontrado");
    erro.status = 404;
    throw erro;
  }

  return tarefaRepository.transferir(id, usuarioId);
}
