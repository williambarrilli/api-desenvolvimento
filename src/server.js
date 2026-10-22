import express from "express";
import { fileURLToPath } from "node:url";
import * as tarefaController from "./controllers/tarefaController.js";

const app = express();
const PORTA = Number(process.env.PORT || 3000);

// Permite que o SimuladorRequest.html seja aberto fora deste projeto.
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS",
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  if (request.method === "OPTIONS") {
    return response.sendStatus(204);
  }

  next();
});

app.use(express.json());

// Página da turma (cliente da API): http://localhost:3000/app
app.use("/app", express.static("public"));

app.get("/", tarefaController.obterTarefa);
app.get("/tarefas", tarefaController.listarTarefas);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORTA, () => {
    console.log(`API disponível em http://localhost:${PORTA}`);
  });
}

export default app;
