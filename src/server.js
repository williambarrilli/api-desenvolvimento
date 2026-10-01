import express from "express";
import { fileURLToPath } from "node:url";
import * as tarefaController from "./controllers/tarefaController.js";

const app = express();
const PORTA = Number(process.env.PORT || 3000);

app.use(express.json());

app.get("/", tarefaController.obterTarefa);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORTA, () => {
    console.log(`API disponível em http://localhost:${PORTA}`);
  });
}

export default app;
