import * as usuarioRepository from "../repositories/usuarioRepository.js";
import { Usuario } from "../models/usuario.js";

export async function obterUsuario() {
  const usuarios = await usuarioRepository.ler();
  return usuarios;
}

export async function listarUsuarios() {
  const usuarios = await usuarioRepository.ler();
  return usuarios;
}

export async function cadastrarUsuario(dados) {
  const usuarios = await usuarioRepository.ler();
  const proximoId = usuarios.length
    ? Math.max(...usuarios.map((usuario) => usuario.id)) + 1
    : 1;

  const novoUsuario = new Usuario({
    id: proximoId,
    nome: dados.nome,
    email: dados.email
  });

  await usuarioRepository.salvar([...usuarios, novoUsuario]);
  return novoUsuario;
}
