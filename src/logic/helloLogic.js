const helloRepository = require("../repositories/helloRepository");

async function obterMensagem() {
  return helloRepository.ler();
}

module.exports = {
  obterMensagem,
};
