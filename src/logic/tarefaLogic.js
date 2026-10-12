import * as tarefaRepository from "../repositories/tarefaRepository.js";

// Mantém a rota inicial GET / retornando a primeira tarefa do banco.
export function obterTarefa() {
    return tarefaRepository.buscarPorId(1);
}

// A logic coordena a consulta; somente o repository conhece o SQL.
export function listarTarefas() {
    return tarefaRepository.listar();
}
export function cadastrarTarefa(body) {

    if(body.titulo === undefined || body.titulo === null || body.titulo.trim() === ""){
        throw new Error("O campo 'titulo' é obrigatório.");
    }

    const novaTarefa = {
        titulo: body.titulo
    }

    if(body.descricao !== undefined && body.descricao !== null && body.descricao.trim() !== ""){
        novaTarefa.descricao = body.descricao;
    }

    if(body.prioridade !== undefined && body.prioridade !== null && body.prioridade.trim() !== ""){
        novaTarefa.prioridade = body.prioridade;
    }

    if(body.concluida !== undefined && body.concluida !== null){
        novaTarefa.concluida = body.concluida;
    }

    if(body.usuarioId !== undefined && body.usuarioId !== null){
        novaTarefa.usuarioId = body.usuarioId;
    }

    return tarefaRepository.criar(novaTarefa);
}