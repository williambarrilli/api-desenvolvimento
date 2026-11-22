import { Usuario } from "../models/usuario.js";
import * as usuarioRepository from "../repositories/usuarioRepository.js";
import * as tarefaRepository from "../repositories/tarefaRepository.js";

export function listarUsuarios() {
  return usuarioRepository.listar();
}

export function buscarUsuario(idInformado) {
  const id = Number(idInformado);

  if (!Number.isInteger(id) || id <= 0) {
    const erro = new Error("ID de usuário inválido");
    erro.status = 400;
    throw erro;
  }

  const usuario = usuarioRepository.buscarPorId(id);

  if (!usuario) {
    const erro = new Error("Usuário não encontrado");
    erro.status = 404;
    throw erro;
  }

  return usuario;
}

export function listarTarefasDoUsuario(idInformado) {
  const usuario = buscarUsuario(idInformado);

  return tarefaRepository.listarPorUsuario(usuario.id);
}

export function removerUsuario(idInformado) {
  const usuario = buscarUsuario(idInformado);

  if (tarefaRepository.listarPorUsuario(usuario.id).length > 0) {
    const erro = new Error("O usuário possui tarefas e não pode ser excluído");
    erro.status = 409;
    throw erro;
  }

  usuarioRepository.remover(usuario.id);

  return usuario;
}

export function cadastrarUsuario(body) {
  let novoUsuario;

  try {
    novoUsuario = new Usuario(body);
  } catch (error) {
    error.status = 400;
    throw error;
  }

  if (usuarioRepository.buscarPorEmail(novoUsuario.email)) {
    const erro = new Error("Já existe um usuário com esse e-mail");
    erro.status = 409;
    throw erro;
  }

  return usuarioRepository.criar(novoUsuario);
}
