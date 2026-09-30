const helloLogic = require("../logic/helloLogic");

async function hello(request, response) {
  try {
    const resultado = await helloLogic.obterMensagem();

    return response.status(200).json(resultado);
  } catch (error) {
    console.error(`Erro ao obter mensagem: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}

module.exports = {
  hello,
};
