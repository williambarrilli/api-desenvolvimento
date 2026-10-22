// CLIENTE da API: esta página só conversa com a API por requisições HTTP.
// Ela é servida pela própria API (http://localhost:3000/app),
// então basta usar o caminho da rota, como "/tarefas".

const aviso = document.querySelector("#aviso");
const listaTarefas = document.querySelector("#lista");
const listaUsuarios = document.querySelector("#lista-usuarios");
const formUsuario = document.querySelector("#form-usuario");
const formTarefa = document.querySelector("#form-tarefa");
const selectUsuario = document.querySelector("#usuario");
const botaoRecarregar = document.querySelector("#recarregar");

// Usuários carregados da API, para mostrar o nome do dono de cada tarefa.
let usuarios = [];

// ---------- Funções de tela (prontas) ----------

function mostrarAviso(texto, tipo = "erro") {
  aviso.textContent = texto;
  aviso.className = `aviso ${tipo}`;
  aviso.hidden = false;
}

function esconderAviso() {
  aviso.hidden = true;
}

function nomeDoUsuario(usuarioId) {
  const dono = usuarios.find((usuario) => usuario.id === usuarioId);
  return dono ? dono.nome : "sem usuário";
}

function desenharUsuarios() {
  listaUsuarios.innerHTML = "";
  selectUsuario.innerHTML = '<option value="">Selecione</option>';

  for (const usuario of usuarios) {
    const item = document.createElement("li");
    const nome = document.createElement("strong");
    nome.textContent = usuario.nome;
    const email = document.createElement("span");
    email.className = "email";
    email.textContent = usuario.email;
    item.append(nome, email);
    listaUsuarios.append(item);

    const opcao = document.createElement("option");
    opcao.value = usuario.id;
    opcao.textContent = usuario.nome;
    selectUsuario.append(opcao);
  }
}

function desenharTarefas(tarefas) {
  listaTarefas.innerHTML = "";

  if (tarefas.length === 0) {
    const vazia = document.createElement("li");
    vazia.className = "vazia";
    vazia.textContent = "Nenhuma tarefa cadastrada.";
    listaTarefas.append(vazia);
    return;
  }

  for (const tarefa of tarefas) {
    const item = document.createElement("li");
    if (tarefa.concluida) item.classList.add("concluida");

    const titulo = document.createElement("span");
    titulo.className = "titulo";
    titulo.textContent = tarefa.titulo;

    const dono = document.createElement("span");
    dono.className = "dono";
    dono.textContent = nomeDoUsuario(tarefa.usuarioId);

    const prioridade = document.createElement("span");
    prioridade.className = `prioridade ${tarefa.prioridade}`;
    prioridade.textContent = tarefa.prioridade;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "secundario";
    botao.textContent = tarefa.concluida ? "Reabrir" : "Concluir";
    botao.addEventListener("click", () => alternarConclusao(tarefa));

    item.append(titulo, dono, prioridade, botao);
    listaTarefas.append(item);
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

// 1. LISTAR TAREFAS (pronto, use como exemplo)
async function carregarTarefas() {
  try {
    const resposta = await fetch("/tarefas");
    const tarefas = await lerResposta(resposta);
    if (!resposta.ok) {
      mostrarAviso(tarefas.mensagem);
      return;
    }
    desenharTarefas(tarefas);
  } catch (error) {
    mostrarAviso("Não foi possível falar com a API. Ela está rodando?");
  }
}

// 2. LISTAR USUÁRIOS (pronto, igual ao das tarefas)
async function carregarUsuarios() {
  try {
    const resposta = await fetch("/usuarios");
    const dados = await lerResposta(resposta);
    if (!resposta.ok) {
      mostrarAviso(dados.mensagem);
      return;
    }
    usuarios = dados;
    desenharUsuarios();
  } catch (error) {
    mostrarAviso("Não foi possível falar com a API. Ela está rodando?");
  }
}

// 3. CRIAR USUÁRIO
async function criarUsuario(nome, email) {
  // TODO 3: envie um POST /usuarios com { nome, email } no body.
  //   - method: "POST"
  //   - headers: { "Content-Type": "application/json" }
  //   - body: JSON.stringify({ ... })
  // Leia a resposta com await lerResposta(resposta):
  //   - se resposta.ok for false, mostre dados.mensagem com mostrarAviso
  //     (e-mail repetido deve chegar aqui como 409)
  //   - se deu certo, mostre "Usuário criado" (tipo "sucesso"),
  //     limpe o formulário (formUsuario.reset()) e chame carregarUsuarios()
  mostrarAviso("TODO 3: criar usuário ainda não foi implementado.");
}

// 4. CRIAR TAREFA VINCULADA A UM USUÁRIO
async function criarTarefa(titulo, usuarioId, prioridade) {
  // TODO 4: envie um POST /tarefas com { titulo, prioridade, usuarioId } no body.
  //   - usuarioId chega aqui como número, ou null se nenhum usuário foi escolhido
  //   - sem usuário, a API deve responder 400; com um usuário que não existe, 404
  //   - se resposta.ok for false, mostre dados.mensagem
  //   - se deu certo, mostre "Tarefa criada" (tipo "sucesso"),
  //     limpe o formulário (formTarefa.reset()) e chame carregarTarefas()
  mostrarAviso("TODO 4: criar tarefa ainda não foi implementado.");
}

// 5. CONCLUIR / REABRIR
async function alternarConclusao(tarefa) {
  // TODO 5: se a tarefa está aberta, envie PATCH /tarefas/:id/concluir;
  //         se está concluída, envie PATCH /tarefas/:id/reabrir.
  //   - use tarefa.id para montar o caminho
  //   - se a resposta não for ok, mostre dados.mensagem
  //   - se deu certo, chame carregarTarefas()
  mostrarAviso("TODO 5: concluir e reabrir ainda não foram implementados.");
}

// ---------- Eventos (prontos) ----------

formUsuario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // não recarrega a página
  esconderAviso();
  criarUsuario(formUsuario.nome.value, formUsuario.email.value);
});

formTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  esconderAviso();
  const usuarioId = selectUsuario.value === "" ? null : Number(selectUsuario.value);
  criarTarefa(formTarefa.titulo.value, usuarioId, formTarefa.prioridade.value);
});

botaoRecarregar.addEventListener("click", async () => {
  esconderAviso();
  await carregarUsuarios();
  carregarTarefas();
});

// Os usuários vêm primeiro, para a lista de tarefas já mostrar o nome do dono.
async function iniciar() {
  await carregarUsuarios();
  await carregarTarefas();
}

iniciar();
