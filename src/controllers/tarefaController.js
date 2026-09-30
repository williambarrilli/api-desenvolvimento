const tarefaLogic = require("../logic/tarefaLogic");

async function obterTarefa(request, response) {
  try {
    const tarefa = await tarefaLogic.obterTarefa();

    return response.status(200).json(tarefa);
  } catch (error) {
    console.error(`Erro ao obter tarefa: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}

async function criarTarefa(request, response) {
  const { titulo } = request.body || {};

  if (typeof titulo !== "string" || titulo.trim() === "") {
    return response.status(400).json({
      mensagem: "O título da tarefa é obrigatório",
    });
  }

  try {
    const tarefa = await tarefaLogic.criarTarefa(titulo.trim());

    return response.status(201).json(tarefa);
  } catch (error) {
    console.error(`Erro ao criar tarefa: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}

module.exports = {
  obterTarefa,
  criarTarefa,
};
