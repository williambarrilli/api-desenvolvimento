// Representa a entidade do domínio: o que é uma tarefa e quais regras
// ela precisa cumprir para existir. A validação fica no construtor, então
// um objeto Tarefa inválido nunca chega a ser criado.
import * as tarefaRepository from "../repositories/tarefaRepository.js";
export class Tarefa {
  constructor({
    id,
    titulo,
    descricao = "",
    prioridade = "media",
    concluida = false,
  }) {
    if (typeof titulo !== "string" || titulo.trim() === "") {
      throw new Error("O campo titulo é obrigatório");
    }
    if(typeof titulo.trim() !== "string" || !isNaN(titulo.trim())) {
      throw new Error("O campo titulo deve ser uma string");
    }

    const prioridades = ["baixa", "media", "alta"];
    if (!prioridades.includes(prioridade)) {
      throw new Error(
        `O campo prioridade deve ser: ${prioridades.join(", ")}`,
      );
    }
    if(descricao.trim().length > 200) {
      throw new Error("O campo descricao deve ter no máximo 200 caracteres");
    }
    if(typeof descricao !== "string") {
      throw new Error("O campo descricao deve ser uma string");
    }
    

    this.id = id;
    this.titulo = titulo.trim();
    this.descricao = descricao.trim() === "" ? null : descricao.trim();
    this.prioridade = prioridade;
    this.concluida = concluida;
  }
  atualizar({ titulo, descricao, prioridade, concluida }) {
    if (titulo.trim() === "") {
      throw new Error("O campo titulo é obrigatório");
    }
  
    if (typeof titulo.trim() !== "string" || !isNaN(titulo.trim())) {
      throw new Error("O campo titulo deve ser uma string");
    }
    if(titulo.trim().toLocaleLowerCase() === tarefaRepository.listar().titulo.toLocaleLowerCase() ) {
      const erro = new Error("O campo titulo deve ser único");
      erro.status = 409;
      throw erro; 
    }
    const prioridades = ["baixa", "media", "alta"];
    if (prioridade !== undefined && !prioridades.includes(prioridade)) {
      throw new Error(
        `O campo prioridade deve ser: ${prioridades.join(", ")}`,
      );
    }
    if (titulo !== undefined) {
      this.titulo = titulo.trim();
    }
    if (descricao !== undefined) {
      this.descricao = descricao.trim() === "" ? null : descricao.trim();
    }
    if (prioridade !== undefined) {
      this.prioridade = prioridade;
    }
    if (concluida !== undefined) {
      this.concluida = concluida;
    }
  } 
}
