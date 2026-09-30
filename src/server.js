const express = require("express");
const tarefaController = require("./controllers/tarefaController");

const app = express();
const PORTA = Number(process.env.PORT || 3000);

app.get("/", tarefaController.obterTarefa);

if (require.main === module) {
  app.listen(PORTA, () => {
    console.log(`API disponível em http://localhost:${PORTA}`);
  });
}

module.exports = app;
