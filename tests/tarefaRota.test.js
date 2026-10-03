import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import app from "../src/server.js";

const caminhoArquivo = path.join(process.cwd(), "data", "tarefa.json");

async function iniciarServidor() {
  const servidor = app.listen(0);

  await new Promise((resolve) => servidor.once("listening", resolve));

  const { port } = servidor.address();

  return { servidor, baseUrl: `http://127.0.0.1:${port}` };
}

test("GET /tarefas/:id retorna 200 e os dados de uma tarefa existente", async () => {
  const { servidor, baseUrl } = await iniciarServidor();

  try {
    const resposta = await fetch(`${baseUrl}/tarefas/1`);
    const corpo = await resposta.json();

    assert.equal(resposta.status, 200);
    assert.equal(corpo.id, 1);
  } finally {
    servidor.close();
  }
});

test("GET /tarefas/:id retorna 404 para um identificador válido sem tarefa correspondente", async () => {
  const { servidor, baseUrl } = await iniciarServidor();

  try {
    const resposta = await fetch(`${baseUrl}/tarefas/999999`);
    const corpo = await resposta.json();

    assert.equal(resposta.status, 404);
    assert.ok(corpo.mensagem);
  } finally {
    servidor.close();
  }
});

test("GET /tarefas/:id retorna 400 para identificadores que não são inteiros positivos", async () => {
  const { servidor, baseUrl } = await iniciarServidor();

  try {
    for (const idInvalido of ["abc", "-1", "0", "1.5", "1a"]) {
      const resposta = await fetch(`${baseUrl}/tarefas/${idInvalido}`);

      assert.equal(
        resposta.status,
        400,
        `esperava 400 para o identificador "${idInvalido}"`,
      );
    }
  } finally {
    servidor.close();
  }
});

test("GET /tarefas/:id não altera os dados persistidos no arquivo", async () => {
  const { servidor, baseUrl } = await iniciarServidor();

  try {
    const conteudoAntes = await fs.readFile(caminhoArquivo, "utf-8");

    await fetch(`${baseUrl}/tarefas/1`);
    await fetch(`${baseUrl}/tarefas/999999`);

    const conteudoDepois = await fs.readFile(caminhoArquivo, "utf-8");

    assert.equal(conteudoDepois, conteudoAntes);
  } finally {
    servidor.close();
  }
});
