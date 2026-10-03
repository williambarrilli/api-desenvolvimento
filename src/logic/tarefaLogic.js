import * as tarefaRepository from "../repositories/tarefaRepository.js";

export async function obterTarefa() {
  return tarefaRepository.ler();
}

export async function criarTarefa(dados = {}) {
  if (typeof dados.titulo !== "string" || dados.titulo.trim() === "") {
    const erro = new Error("O campo titulo é obrigatório.");
    erro.status = 400;
    throw erro;
  }

  const tarefas = await tarefaRepository.ler();
  const tituloNormalizado = dados.titulo.trim().toLowerCase();

  const tituloJaExiste = tarefas.some(
    (tarefa) => tarefa.titulo.trim().toLowerCase() === tituloNormalizado,
  );

  if (tituloJaExiste) {
    const erro = new Error("Já existe uma tarefa com esse título.");
    erro.status = 409;
    throw erro;
  }

  const proximoId =
    tarefas.reduce((maiorId, tarefa) => Math.max(maiorId, tarefa.id), 0) + 1;

  const novaTarefa = {
    id: proximoId,
    titulo: dados.titulo.trim(),
    descricao: typeof dados.descricao === "string" ? dados.descricao : "",
    prioridade:
      typeof dados.prioridade === "string" ? dados.prioridade : "media",
    concluida: typeof dados.concluida === "boolean" ? dados.concluida : false,
  };

  tarefas.push(novaTarefa);

  await tarefaRepository.salvar(tarefas);

  return novaTarefa;
}
