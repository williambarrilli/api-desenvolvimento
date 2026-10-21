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
    descricao = "", // Mantemos o padrão, mas trataremos vazio como null
    prioridade = "media",
    concluida = false,
    usuarioId = null,
  }) {
    // 1. Validação do Título (já existia)
    if (typeof titulo !== "string" || titulo.trim() === "") {
      throw new ErroDeValidacao("O campo titulo é obrigatório");
    }

    // 2. Validação da Prioridade (já existia)
    const prioridades = ["baixa", "media", "alta"];
    if (!prioridades.includes(prioridade)) {
      throw new ErroDeValidacao(
        `O campo prioridade deve ser: ${prioridades.join(", ")}`
      );
    }

    let descricaoTratada = null;

    if (descricao !== null && descricao !== undefined) {
      if (typeof descricao !== "string") {
        throw new ErroDeValidacao("A descrição deve ser um formato de texto.");
      }
  const textoLimpo = descricao.trim();

    if (textoLimpo !== "") {
    if (textoLimpo.length > 200) {
   throw new ErroDeValidacao("A descrição não pode ter mais de 200 caracteres.");
}
  
    descricaoTratada = textoLimpo;
  }
}

  
    this.id = id;
    this.titulo = titulo.trim();
    
    // Agora recebe a variável que passou pelas validações
    this.descricao = descricaoTratada; 
    
    this.prioridade = prioridade;
    this.concluida = concluida;
    this.usuarioId = usuarioId;
  }
}
