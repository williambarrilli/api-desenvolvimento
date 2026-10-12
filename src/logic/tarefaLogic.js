import * as tarefaRepository from "../repositories/tarefaRepository.js";
import { ErroDeValidacao } from "../models/tarefa.js";

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

export function atualizarTarefa(id, body) {
    const numero = Number(id);

    if (!Number.isSafeInteger(numero) || numero <= 0 || String(numero) !== id) {
        throw new ErroDeValidacao("O id deve ser um número inteiro positivo");
    }

    const campos = {};

    if (body.titulo !== undefined) {
        if (typeof body.titulo !== "string" || body.titulo.trim() === "") {
            throw new ErroDeValidacao("O campo 'titulo' deve ser um texto não vazio");
        }
        campos.titulo = body.titulo.trim();
    }

    if (body.descricao !== undefined) {
        if (typeof body.descricao !== "string") {
            throw new ErroDeValidacao("O campo 'descricao' deve ser um texto");
        }
        campos.descricao = body.descricao;
    }

    if (body.prioridade !== undefined) {
        if (!["baixa", "media", "alta"].includes(body.prioridade)) {
            throw new ErroDeValidacao("O campo 'prioridade' deve ser: baixa, media ou alta");
        }
        campos.prioridade = body.prioridade;
    }

    if (body.concluida !== undefined) {
        if (typeof body.concluida !== "boolean") {
            throw new ErroDeValidacao("O campo 'concluida' deve ser true ou false");
        }
        campos.concluida = body.concluida;
    }

    if (Object.keys(campos).length === 0) {
        throw new ErroDeValidacao("Informe ao menos um campo para atualizar");
    }

    return tarefaRepository.atualizar(numero, campos);
}
