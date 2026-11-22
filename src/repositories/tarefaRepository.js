// O repository é a única camada que conhece o banco e os comandos SQL.
// As outras camadas trabalham apenas com objetos JavaScript.
import db from "../database/conexao.js";

// O SQLite guarda booleanos como 0 e 1.
// A API devolve esses valores como false e true.
function mapearTarefa(linha) {
  if (!linha) return null;

  return {
    ...linha,
    concluida: linha.concluida === 1,
  };
}

// Retorna todas as tarefas ordenadas pelo id.
export function listar() {
  const tarefas = db.prepare("SELECT * FROM tarefas ORDER BY id").all();

  return tarefas.map(mapearTarefa);
}

export function pesquisarPorTitulo(busca) {
  const termo = busca.replace(/[\\%_]/g, (caractere) => `\\${caractere}`);

  const tarefas = db
    .prepare(
      "SELECT * FROM tarefas WHERE LOWER(titulo) LIKE LOWER(?) ESCAPE '\\' ORDER BY id",
    )
    .all(`%${termo}%`);

  return tarefas.map(mapearTarefa);
}

// Retorna uma tarefa pelo id ou null quando ela não existe.
export function listarPorUsuario(usuarioId) {
  const tarefas = db
    .prepare("SELECT * FROM tarefas WHERE usuarioId = ? ORDER BY id")
    .all(usuarioId);

  return tarefas.map(mapearTarefa);
}

export function resumo() {
  const linha = db
    .prepare(
      `
      SELECT
        COUNT(*) AS total,
        COALESCE(SUM(CASE WHEN concluida = 1 THEN 1 ELSE 0 END), 0) AS concluidas,
        COALESCE(SUM(CASE WHEN concluida = 0 THEN 1 ELSE 0 END), 0) AS pendentes,
        COALESCE(SUM(CASE WHEN prioridade = 'baixa' THEN 1 ELSE 0 END), 0) AS baixa,
        COALESCE(SUM(CASE WHEN prioridade = 'media' THEN 1 ELSE 0 END), 0) AS media,
        COALESCE(SUM(CASE WHEN prioridade = 'alta' THEN 1 ELSE 0 END), 0) AS alta
      FROM tarefas
    `,
    )
    .get();

  return {
    total: linha.total,
    concluidas: linha.concluidas,
    pendentes: linha.pendentes,
    porPrioridade: {
      baixa: linha.baixa,
      media: linha.media,
      alta: linha.alta,
    },
  };
}

export function buscarPorId(id) {
  // O ? mantém o valor separado do SQL e evita montar a consulta com strings.
  const tarefa = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id);

  return mapearTarefa(tarefa);
}

// Cria uma tarefa e retorna o registro completo com o id gerado pelo banco.
export function criar(tarefa) {
  const resultado = db
    .prepare(
      `
      INSERT INTO tarefas
        (titulo, descricao, prioridade, concluida, usuarioId)
          VALUES (?, ?, ?, ?, ?)
    `,
    )
    .run(
      tarefa.titulo,
      tarefa.descricao ?? null,
      tarefa.prioridade ?? null,
      tarefa.concluida ? 1 : 0,
      tarefa.usuarioId ?? null,
    );

  return buscarPorId(Number(resultado.lastInsertRowid));
}

// Atualiza uma tarefa e retorna o registro atualizado ou null se ela não existir.
export function atualizar(id, tarefa) {
  const tarefaAtual = buscarPorId(id);

  if (!tarefaAtual) return null;

  // O SQL é fixo: cada ? recebe um valor na mesma ordem dos campos.
  // A leitura anterior mantém compatibilidade com atualizações parciais.
  const dados = { ...tarefaAtual, ...tarefa };

  db.prepare(
    `
    UPDATE tarefas
    SET titulo = ?, descricao = ?, prioridade = ?, concluida = ?
    WHERE id = ?
  `,
  ).run(
    dados.titulo,
    dados.descricao ?? null,
    dados.prioridade ?? null,
    dados.concluida ? 1 : 0,
    id,
  );

  return buscarPorId(id);
}

// Remove uma tarefa e informa se alguma linha foi removida.
export function transferir(id, usuarioId) {
  db.prepare("UPDATE tarefas SET usuarioId = ? WHERE id = ?").run(usuarioId, id);

  return buscarPorId(id);
}

export function remover(id) {
  const resultado = db.prepare("DELETE FROM tarefas WHERE id = ?").run(id);

  return resultado.changes > 0;
}
