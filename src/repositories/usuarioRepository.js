import db from "../database/conexao.js";

export function listar() {
  return db.prepare("SELECT id, nome, email FROM usuarios ORDER BY id").all();
}

export function buscarPorId(id) {
  const usuario = db
    .prepare("SELECT id, nome, email FROM usuarios WHERE id = ?")
    .get(id);

  return usuario ?? null;
}

export function buscarPorEmail(email) {
  const usuario = db
    .prepare(
      "SELECT id, nome, email FROM usuarios WHERE LOWER(TRIM(email)) = LOWER(TRIM(?))",
    )
    .get(email);

  return usuario ?? null;
}

export function criar(usuario) {
  const resultado = db
    .prepare("INSERT INTO usuarios (nome, email) VALUES (?, ?)")
    .run(usuario.nome, usuario.email);

  return buscarPorId(Number(resultado.lastInsertRowid));
}
