import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function listarTarefas(concluidaParametro) {
  const tarefas = await tarefaRepository.ler();

  if (concluidaParametro === undefined) {
    return tarefas;
  }

  if (concluidaParametro !== "true" && concluidaParametro !== "false") {
    const erro = new Error("O parâmetro concluida deve ser true ou false.");
    erro.status = 400;
    throw erro;
  }

  const concluida = concluidaParametro === "true";

  return tarefas.filter((tarefa) => tarefa.concluida === concluida);
}
