// CLIENTE da API: esta página só conversa com a API por requisições HTTP.
// Ela é servida pela própria API (http://localhost:3000/app),
// então basta usar o caminho da rota, como "/tarefas".

const lista = document.querySelector("#lista");
const aviso = document.querySelector("#aviso");
const formulario = document.querySelector("#formulario");
const botaoRecarregar = document.querySelector("#recarregar");

// ---------- Funções de tela (prontas) ----------

function mostrarAviso(texto, tipo = "erro") {
  aviso.textContent = texto;
  aviso.className = `aviso ${tipo}`;
  aviso.hidden = false;
}

function esconderAviso() {
  aviso.hidden = true;
}

function desenharTarefas(tarefas) {
  lista.innerHTML = "";

  if (tarefas.length === 0) {
    const vazia = document.createElement("li");
    vazia.className = "vazia";
    vazia.textContent = "Nenhuma tarefa cadastrada.";
    lista.append(vazia);
    return;
  }

  for (const tarefa of tarefas) {
    const item = document.createElement("li");
    if (tarefa.concluida) item.classList.add("concluida");

    const titulo = document.createElement("span");
    titulo.className = "titulo";
    titulo.textContent = tarefa.titulo;

    const prioridade = document.createElement("span");
    prioridade.className = `prioridade ${tarefa.prioridade}`;
    prioridade.textContent = tarefa.prioridade;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "secundario";
    botao.textContent = tarefa.concluida ? "Reabrir" : "Concluir";
    botao.addEventListener("click", () => alternarConclusao(tarefa));

    item.append(titulo, prioridade, botao);
    lista.append(item);
  }
}

// ---------- Requisições para a API ----------

// Lê o corpo da resposta. Se a rota não existir, o Express devolve HTML
// ("Cannot PATCH ..."), não JSON; aí vira uma mensagem que dá para mostrar.
async function lerResposta(resposta) {
  try {
    return await resposta.json();
  } catch {
    return { mensagem: `A API respondeu ${resposta.status} sem JSON. A rota existe no server.js?` };
  }
}


// 1. LISTAR (pronto, use como exemplo)
async function carregarTarefas() {
  try {
    const resposta = await fetch("/tarefas");
    const tarefas = await lerResposta(resposta);
    desenharTarefas(tarefas);
  } catch (error) {
    mostrarAviso("Não foi possível falar com a API. Ela está rodando?");
  }
}

// 2. CRIAR
async function criarTarefa(titulo, prioridade) {
  // TODO 2: envie um POST /tarefas com { titulo, prioridade } no body.
  //   - method: "POST"
  //   - headers: { "Content-Type": "application/json" }
  //   - body: JSON.stringify({ ... })
  // Depois leia a resposta com await lerResposta(resposta):
  //   - se resposta.ok for false, mostre dados.mensagem com mostrarAviso
  //   - se deu certo, mostre "Tarefa criada" (tipo "sucesso") e chame carregarTarefas()
  mostrarAviso("TODO 2: criar tarefa ainda não foi implementado.");
}

// 3. CONCLUIR / REABRIR
async function alternarConclusao(tarefa) {
  // TODO 3: se a tarefa está aberta, envie PATCH /tarefas/:id/concluir;
  //         se está concluída, envie PATCH /tarefas/:id/reabrir.
  //   - use tarefa.id para montar o caminho
  //   - se a resposta não for ok, mostre dados.mensagem
  //   - se deu certo, chame carregarTarefas()
  mostrarAviso("TODO 3: concluir e reabrir ainda não foram implementados.");
}

// ---------- Eventos (prontos) ----------

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // não recarrega a página
  esconderAviso();
  criarTarefa(formulario.titulo.value, formulario.prioridade.value);
});

botaoRecarregar.addEventListener("click", () => {
  esconderAviso();
  carregarTarefas();
});

carregarTarefas();
