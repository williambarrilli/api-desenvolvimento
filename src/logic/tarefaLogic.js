import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function obterResumo() {
  const tarefas = await tarefaRepository.ler();

  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = tarefas.length - concluidas;

  const porPrioridade = {
    baixa: tarefas.filter((tarefa) => tarefa.prioridade === "baixa").length,
    media: tarefas.filter((tarefa) => tarefa.prioridade === "media").length,
    alta: tarefas.filter((tarefa) => tarefa.prioridade === "alta").length,
  };

  return {
    total: tarefas.length,
    concluidas,
    pendentes,
    porPrioridade,
  };
}
