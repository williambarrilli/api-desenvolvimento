// Representa a entidade do domínio: o que é uma tarefa e quais regras
// ela precisa cumprir para existir. A validação fica no construtor, então
// um objeto Tarefa inválido nunca chega a ser criado.
export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "ErroDeValidacao";
  }
}

export class Tarefa {
  constructor({
    id,
    titulo,
    descricao = "",
    prioridade = "media",
    concluida = false,
  }) {
    if (typeof titulo !== "string" || titulo.trim() === "") {
      throw new ErroDeValidacao("O campo titulo é obrigatório");
    }

    this.id = id;
    this.titulo = titulo.trim();
    this.descricao = descricao;
    this.prioridade = prioridade;
    this.concluida = concluida;
  }
}
