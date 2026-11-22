import * as usuarioLogic from "../logic/usuarioLogic.js";

export async function cadastrarUsuario(request, response) {
  try {
    const usuario = await usuarioLogic.cadastrarUsuario(request.body ?? {});

    return response.status(201).json(usuario);
  } catch (error) {
    if (error.status) {
      return response.status(error.status).json({ mensagem: error.message });
    }

    console.error(`Erro ao cadastrar usuário: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}
