class Tarefa {
    constructor(titulo, prioridade = "media", concluida = false) {
        if (typeof titulo !== "string" || titulo.trim() === "") {
       throw new Error("O campo titulo e Obrigatorio");
        }
    

    this.titulo = titulo.trim();
    this.prioridade = prioridade;
    this.concluida = concluida;
    
} 
concluir() 
    {this.concluida = true;}
}
 module.exports = Tarefa;