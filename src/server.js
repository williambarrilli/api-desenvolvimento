import express from "express";
import { fileURLToPath } from "node:url";
import * as tarefaController from "./controllers/tarefaController.js";
import * as tarefaRepository from "./repositories/tarefaRepository.js";

const app = express();
const PORTA = Number(process.env.PORT || 3000);

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS",
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

app.get("/tarefas", tarefaController.obterTarefa);

// Exemplo GetTarefas tudo em um arquivo
app.get("/tarefas2", async (request, response) => {
  try {
    const tarefa = await tarefaRepository.ler();

    return response.status(200).json(tarefa);
  } catch (error) {
    console.error(`Erro ao obter tarefa: ${error.message}`);

    return response.status(400).json({
      mensagem: "Erro interno do servidor",
    });
  }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORTA, () => {
    console.log(`API disponível em http://localhost:${PORTA}`);
  });
}

export default app;
