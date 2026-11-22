import { Usuario } from "../models/usuario.js";
import * as usuarioRepository from "../repositories/usuarioRepository.js";

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

export function cadastrarUsuario(body) {
  let novoUsuario;

  try {
    novoUsuario = new Usuario(body);
  } catch (error) {
    error.status = 400;
    throw error;
  }

  return usuarioRepository.criar(novoUsuario);
}
