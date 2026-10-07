
import * as usuarioLogic from "../logic/usuarioLogic.js";
import { ErroDeValidacao } from "../models/usuario.js";

export async function cadastrarUsuario(request, response) {
  try {
    const novoUsuario = await usuarioLogic.cadastrarUsuario(request.body ?? {});

    return response.status(201).json(novoUsuario);
  } catch (error) {
    if (error instanceof ErroDeValidacao) {
      return response.status(400).json({ mensagem: error.message });
    }

    console.error(`Erro ao cadastrar usuário: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}