import * as tarefaRepository from "../repositories/tarefaRepository.js";
import { ErroDeValidacao, Tarefa } from "../models/tarefa.js";

// Mantém a rota inicial GET / retornando a primeira tarefa do banco.
export function obterTarefa() {
    return tarefaRepository.buscarPorId(1);
}

// A logic coordena a consulta; somente o repository conhece o SQL.
export function listarTarefas(concluida, prioridade) {
    if (concluida !== undefined && concluida !== "true" && concluida !== "false") {
        throw new ErroDeValidacao("O parâmetro 'concluida' deve ser true ou false");
    }

    if (prioridade !== undefined && !["baixa", "media", "alta"].includes(prioridade)) {
        throw new ErroDeValidacao("O parâmetro 'prioridade' deve ser: baixa, media ou alta");
    }

    if (prioridade !== undefined) {
        const tarefas = tarefaRepository.listarPorPrioridade(prioridade);

        if (concluida === undefined) {
            return tarefas;
        }

        return tarefas.filter((tarefa) => tarefa.concluida === (concluida === "true"));
    }

    if (concluida === "true") {
        return tarefaRepository.listarPorConclusao(1);
    }

    if (concluida === "false") {
        return tarefaRepository.listarPorConclusao(0);
    }

    return tarefaRepository.listar();
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

export function atualizarTarefa(id, body) {
    const numero = Number(id);

    if (!Number.isSafeInteger(numero) || numero <= 0 || String(numero) !== id) {
        throw new ErroDeValidacao("O id deve ser um número inteiro positivo");
    }

    const tarefaAtual = tarefaRepository.buscarPorId(numero);

    if (!tarefaAtual) {
        return null;
    }

    const campos = {};

    if (body.titulo !== undefined) campos.titulo = body.titulo;
    if (body.descricao !== undefined) campos.descricao = body.descricao;
    if (body.prioridade !== undefined) campos.prioridade = body.prioridade;
    if (body.concluida !== undefined) campos.concluida = body.concluida;

    if (Object.keys(campos).length === 0) {
        throw new ErroDeValidacao("Informe pelo menos um campo para atualizar");
    }

    if (campos.descricao !== undefined && typeof campos.descricao !== "string") {
        throw new ErroDeValidacao("O campo 'descricao' deve ser um texto");
    }

    if (campos.concluida !== undefined && typeof campos.concluida !== "boolean") {
        throw new ErroDeValidacao("O campo 'concluida' deve ser true ou false");
    }

    const tarefa = new Tarefa({
        ...tarefaAtual,
        ...campos,
        descricao: campos.descricao ?? tarefaAtual.descricao ?? undefined,
        prioridade: campos.prioridade ?? tarefaAtual.prioridade ?? undefined,
    });

    if (campos.titulo !== undefined) campos.titulo = tarefa.titulo;

    return tarefaRepository.atualizar(numero, campos);
}

export function removerTarefa(id) {
    const numero = Number(id);

    if (!Number.isSafeInteger(numero) || numero <= 0 || String(numero) !== id) {
        throw new ErroDeValidacao("O id deve ser um número inteiro positivo");
    }

    const tarefa = tarefaRepository.buscarPorId(numero);

    if (!tarefa) {
        return null;
    }

    tarefaRepository.remover(numero);

    return tarefa;
}

export function concluirTarefa(id) {
    const numero = Number(id);

    if (!Number.isSafeInteger(numero) || numero <= 0 || String(numero) !== id) {
        throw new ErroDeValidacao("O id deve ser um número inteiro positivo");
    }

    return tarefaRepository.atualizar(numero, { concluida: true });
}
