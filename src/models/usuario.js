export class Usuario {
  static FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor({ nome, email }) {
    if (typeof nome !== "string" || nome.trim() === "") {
      throw new Error("O campo nome é obrigatório");
    }

    if (typeof email !== "string" || email.trim() === "") {
      throw new Error("O campo email é obrigatório");
    }

    if (!Usuario.FORMATO_EMAIL.test(email.trim())) {
      throw new Error("O campo email deve ter um formato válido");
    }

    this.nome = nome.trim();
    this.email = email.trim();
  }
}
