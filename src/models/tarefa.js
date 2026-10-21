// Representa a entidade do domínio: o que é uma tarefa e quais regras
// ela precisa cumprir para existir. A validação fica no construtor, então
// um objeto Tarefa inválido nunca chega a ser criado.
export class Tarefa {
    static PRIORIDADES =["alta", "media","baixa"]
    constructor({titulo, descricao = '', prioridade = "media", concluida = false}){

        if(typeof titulo != 'string'|| titulo.trim() === ''){
            throw new Error ("O Campo de titulo é obrigatorio")
        }

        if(titulo.trim().length < 3 || titulo.trim().length > 100){
            throw new Error ("O titulo deve ter entre 3 a 100 caracteres ")
        }

        if(!Tarefa.PRIORIDADES.includes(prioridade)){
            throw new Error ('Valor de prioridade inválido, o valor deve ser: Alta, Média ou Baixa')
        }

        if (typeof concluida != 'boolean'){
            throw new Error ('Concluída não está como boolean')
        }

        if (descricao.trim() === ""){
            descricao = null
        }

        if (descricao.trim().length > 200){
          throw new Error('A descrição deve ter no máximo 200 caracteres'); 
        }

        if (typeof descricao != 'string' || descricao.trim() === ""){
          throw new Error ('A descrição deve ser texto')
        }

        
        this.titulo = titulo.trim()
        this.descricao = descricao
        this.prioridade = prioridade
        this.concluida = concluida
    }
    concluirTarefa(){
        if(this.concluida === true){
            throw new Error ("Tarefa já está concluída")
        }else{
            return this.concluida = true
        }
    }
    reabrirTarefa(){
        if(this.concluida === false){
            throw new Error ("Tarefa já está em aberto")
        }else{
            return this.concluida = false
        }
    }
}

