import * as usuarioLogic from "../logic/usuarioLogic.js";

export async function listarUsuarios(request, response) {
  try {
    const usuarios = await usuarioLogic.listarUsuarios();

    return response.status(200).json(usuarios);
  } catch (error) {
    console.error(`Erro ao listar usuários: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}

export async function buscarUsuario(request, response) {
  try {
    const usuario = await usuarioLogic.buscarUsuario(request.params.id);

    return response.status(200).json(usuario);
  } catch (error) {
    if (error.status) {
      return response.status(error.status).json({ mensagem: error.message });
    }

    console.error(`Erro ao buscar usuário: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}

export async function listarTarefasDoUsuario(request, response) {
  try {
    const tarefas = await usuarioLogic.listarTarefasDoUsuario(request.params.id);

    return response.status(200).json(tarefas);
  } catch (error) {
    if (error.status) {
      return response.status(error.status).json({ mensagem: error.message });
    }

    console.error(`Erro ao listar tarefas do usuário: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}

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
