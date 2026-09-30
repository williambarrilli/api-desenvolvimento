const express = require("express");
const tarefaController = require("./controllers/tarefaController");

const app = express();
const PORTA = Number(process.env.PORT || 3000);

app.use(express.json());

app.get("/", tarefaController.obterTarefa);
app.post("/tarefas", tarefaController.criarTarefa);

if (require.main === module) {
  app.listen(PORTA, () => {
    console.log(`API disponível em http://localhost:${PORTA}`);
  });
}

module.exports = app;
