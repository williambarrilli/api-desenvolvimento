import { Usuario } from "../models/usuario.js";
import * as usuarioRepository from "../repositories/usuarioRepository.js";

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
