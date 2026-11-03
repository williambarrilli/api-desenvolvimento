// CLIENTE da API: esta página só conversa com a API por requisições HTTP.
// Ela é servida pela própria API (http://localhost:3000/app),
// então basta usar o caminho da rota, como "/tarefas".

const aviso = document.querySelector("#aviso");
const listaTarefas = document.querySelector("#lista");
const listaUsuarios = document.querySelector("#lista-usuarios");
const formUsuario = document.querySelector("#form-usuario");
const botaoSalvarUsuario = document.querySelector("#salvar-usuario");
const botaoCancelarEdicao = document.querySelector("#cancelar-edicao");
const formTarefa = document.querySelector("#form-tarefa");
const selectUsuario = document.querySelector("#usuario");
const botaoRecarregar = document.querySelector("#recarregar");

// Usuários carregados da API: aparecem na lista, no select e no dono de cada tarefa.
let usuarios = [];
// Id do usuário que está sendo editado no formulário (null = criando um novo).
let usuarioEmEdicao = null;

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
  if (dono) return dono.nome;
  return usuarioId ? `usuário ${usuarioId}` : "sem usuário";
}

function editarUsuario(usuario) {
  usuarioEmEdicao = usuario.id;
  formUsuario.nome.value = usuario.nome;
  formUsuario.email.value = usuario.email;
  botaoSalvarUsuario.textContent = "Salvar alterações";
  botaoCancelarEdicao.hidden = false;
  desenharUsuarios();
}

function cancelarEdicao() {
  usuarioEmEdicao = null;
  formUsuario.reset();
  botaoSalvarUsuario.textContent = "Criar usuário";
  botaoCancelarEdicao.hidden = true;
  desenharUsuarios();
}

function desenharUsuarios(mensagemVazia = "") {
  listaUsuarios.innerHTML = "";
  selectUsuario.innerHTML = "";

  const primeira = document.createElement("option");
  primeira.value = "";
  primeira.textContent = usuarios.length > 0 ? "Selecione" : mensagemVazia || "Nenhum usuário cadastrado";
  selectUsuario.append(primeira);

  if (usuarios.length === 0) {
    const vazia = document.createElement("li");
    vazia.className = "vazia";
    vazia.textContent = mensagemVazia || "Nenhum usuário cadastrado.";
    listaUsuarios.append(vazia);
  }

  for (const usuario of usuarios) {
    const item = document.createElement("li");
    if (usuario.id === usuarioEmEdicao) item.classList.add("editando");

    const info = document.createElement("span");
    info.className = "info";
    const nome = document.createElement("strong");
    nome.textContent = usuario.nome;
    const email = document.createElement("span");
    email.className = "email";
    email.textContent = usuario.email;
    info.append(nome, email);

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.className = "secundario";
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", () => editarUsuario(usuario));

    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "secundario perigo";
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", () => removerUsuario(usuario));

    item.append(info, botaoEditar, botaoRemover);
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

// 2. LISTAR USUÁRIOS (pronto)
// Enquanto a API não tiver a rota GET /usuarios, a página continua funcionando:
// a lista e o select só avisam o que falta, e as tarefas aparecem "sem usuário".
async function carregarUsuarios() {
  try {
    const resposta = await fetch("/usuarios");
    const dados = await lerResposta(resposta);
    usuarios = resposta.ok && Array.isArray(dados) ? dados : [];
    desenharUsuarios(resposta.ok ? "" : "Sem rota GET /usuarios na API");
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
  //     (dado inválido chega como 400; e-mail repetido, como 409)
  //   - se deu certo, mostre "Usuário criado" (tipo "sucesso"),
  //     chame cancelarEdicao() para limpar o formulário e depois carregarUsuarios()
  mostrarAviso("TODO 3: criar usuário ainda não foi implementado.");
}

// 4. EDITAR USUÁRIO
async function atualizarUsuario(id, nome, email) {
  // TODO 4: envie um PATCH /usuarios/:id com { nome, email } no body.
  //   - mesmo formato do POST, trocando o method e colocando o id no caminho
  //   - erros da API: mostre dados.mensagem
  //   - se deu certo, mostre "Usuário atualizado" (tipo "sucesso"),
  //     chame cancelarEdicao(), carregarUsuarios() e carregarTarefas()
  //     (o nome novo também aparece nas tarefas do usuário)
  mostrarAviso("TODO 4: editar usuário ainda não foi implementado.");
}

// 5. REMOVER USUÁRIO
async function removerUsuario(usuario) {
  // TODO 5: envie um DELETE /usuarios/:id (sem body).
  //   - a API responde 204 sem corpo quando dá certo: não leia o JSON nesse caso
  //   - se resposta.ok for false, leia com lerResposta e mostre dados.mensagem
  //     (usuário com tarefas deve chegar como 409)
  //   - se deu certo, mostre "Usuário removido" (tipo "sucesso") e chame carregarUsuarios()
  mostrarAviso(`TODO 5: remover ${usuario.nome} ainda não foi implementado.`);
}

// 6. CRIAR TAREFA VINCULADA A UM USUÁRIO
async function criarTarefa(titulo, usuarioId, prioridade) {
  // TODO 6: envie um POST /tarefas com { titulo, prioridade, usuarioId } no body.
  //   - usuarioId chega aqui como número, ou null se nenhum usuário foi escolhido
  //   - sem usuário, a API deve responder 400; com um usuário que não existe, 404
  //   - se resposta.ok for false, mostre dados.mensagem
  //   - se deu certo, mostre "Tarefa criada" (tipo "sucesso"),
  //     limpe o formulário (formTarefa.reset()) e chame carregarTarefas()
  mostrarAviso("TODO 6: criar tarefa ainda não foi implementado.");
}

// 7. CONCLUIR / REABRIR
async function alternarConclusao(tarefa) {
  // TODO 7: se a tarefa está aberta, envie PATCH /tarefas/:id/concluir;
  //         se está concluída, envie PATCH /tarefas/:id/reabrir.
  //   - use tarefa.id para montar o caminho
  //   - se a resposta não for ok, mostre dados.mensagem
  //   - se deu certo, chame carregarTarefas()
  mostrarAviso("TODO 7: concluir e reabrir ainda não foram implementados.");
}

// ---------- Eventos (prontos) ----------

formUsuario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // não recarrega a página
  esconderAviso();
  const nome = formUsuario.nome.value;
  const email = formUsuario.email.value;
  if (usuarioEmEdicao === null) {
    criarUsuario(nome, email);
  } else {
    atualizarUsuario(usuarioEmEdicao, nome, email);
  }
});

botaoCancelarEdicao.addEventListener("click", () => {
  esconderAviso();
  cancelarEdicao();
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
