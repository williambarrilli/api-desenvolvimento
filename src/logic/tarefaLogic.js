import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function atualizarTarefa(idParametro, dados = {}) {
  const id = Number(idParametro);

  if (!Number.isInteger(id) || id <= 0) {
    const erro = new Error("O ID deve ser um número inteiro positivo.");
    erro.status = 400;
    throw erro;
  }

  const tarefas = await tarefaRepository.ler();
  const tarefa = tarefas.find((tarefaAtual) => tarefaAtual.id === id);

  if (!tarefa) {
    const erro = new Error("Tarefa não encontrada.");
    erro.status = 404;
    throw erro;
  }

  if (dados.titulo !== undefined && typeof dados.titulo !== "string") {
    const erro = new Error("O campo titulo deve ser um texto.");
    erro.status = 400;
    throw erro;
  }

  if (dados.descricao !== undefined && typeof dados.descricao !== "string") {
    const erro = new Error("O campo descricao deve ser um texto.");
    erro.status = 400;
    throw erro;
  }

  if (dados.prioridade !== undefined && typeof dados.prioridade !== "string") {
    const erro = new Error("O campo prioridade deve ser um texto.");
    erro.status = 400;
    throw erro;
  }

  if (dados.concluida !== undefined && typeof dados.concluida !== "boolean") {
    const erro = new Error("O campo concluida deve ser verdadeiro ou falso.");
    erro.status = 400;
    throw erro;
  }

  if (dados.titulo !== undefined) {
    tarefa.titulo = dados.titulo;
  }

  if (dados.descricao !== undefined) {
    tarefa.descricao = dados.descricao;
  }

  if (dados.prioridade !== undefined) {
    tarefa.prioridade = dados.prioridade;
  }

  if (dados.concluida !== undefined) {
    tarefa.concluida = dados.concluida;
  }

  await tarefaRepository.salvar(tarefas);

  return tarefa;
}
