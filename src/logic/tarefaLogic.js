import * as tarefaRepository from "../repositories/tarefaRepository.js";

// Mantém a rota inicial GET / retornando a primeira tarefa do banco.
export function obterTarefa() {
    return tarefaRepository.buscarPorId(1);
}

// A logic coordena a consulta; somente o repository conhece o SQL.
export function listarTarefas() {
    return tarefaRepository.listar();
}

export function buscarTarefaPorId(id) {
    return tarefaRepository.buscarPorId(id);
}


export function cadastrarTarefa(body) {
    const novaTarefa = {
        titulo: body.titulo.trim(),
    };

    if (body.descricao) {
        novaTarefa.descricao = body.descricao;
    }

    if (body.prioridade) {
        novaTarefa.prioridade = body.prioridade;
    }

    if (body.concluida !== undefined && body.concluida !== null) {
        novaTarefa.concluida = body.concluida;
    }

    if (body.usuarioId !== undefined && body.usuarioId !== null) {
        novaTarefa.usuarioId = body.usuarioId;
    }

    return tarefaRepository.criar(novaTarefa);
}
