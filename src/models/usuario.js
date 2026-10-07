export class ErroDeValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "ErroDeValidacao";
  }
}

export class Usuario {
  constructor({
    id,
    nome,
    email
  }) {
    if (typeof nome !== "string" || nome.trim() === "") {
      throw new ErroDeValidacao("O campo nome é obrigatório");
    }

    if (typeof email !== "string" || email.trim() === "") {
      throw new ErroDeValidacao("O campo email é obrigatório");
    }

    if(!email.includes('@')){
      throw new ErroDeValidacao("O e-mail não é válido!");
    }

    this.id = id;
    this.nome = nome.trim();
    this.email = email;
  }
}
