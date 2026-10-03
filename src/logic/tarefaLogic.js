import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function listarTarefas(prioridadeParametro) {
  const tarefas = await tarefaRepository.ler();

  if (prioridadeParametro === undefined) {
    return tarefas;
  }

  const prioridadesPermitidas = ["baixa", "media", "alta"];

  if (!prioridadesPermitidas.includes(prioridadeParametro)) {
    const erro = new Error(
      "O parâmetro prioridade deve ser baixa, media ou alta.",
    );
    erro.status = 400;
    throw erro;
  }

  return tarefas.filter((tarefa) => tarefa.prioridade === prioridadeParametro);
}
