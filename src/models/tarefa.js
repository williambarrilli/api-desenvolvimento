// Representa a entidade do domínio: o que é uma tarefa e quais regras
// ela precisa cumprir para existir. A validação fica no construtor, então
// um objeto Tarefa inválido nunca chega a ser criado.
export class Tarefa {
  static PRIORIDADES = ['baixa', 'media', 'alta']
  constructor({titulo, descricao = null, prioridade = "media", concluida}){
    if(typeof titulo !== 'string' || titulo.trim() === ''){
      throw new Error('O título é obrigatório')
    }

    if(titulo.length < 3 || titulo.length > 100){
      throw new Error('O título deve ter entre 3 e 100 caracteres')
    }

    if(typeof descricao !== 'string' || descricao.trim() === ''){
      descricao = null
    }

    if(typeof descricao !== 'string'){
      throw new Error('A descrição deve ser um texto')
    }

    if(!Tarefa.PRIORIDADES.includes(prioridade)){
      throw new Error('Prioridade inválida')
    }

    if(typeof concluida != 'boolean'){
      throw new Error('Concluída deve ser boolean')
    }

    const descricaoTarefa = descricao.trim()

    if(descricaoTarefa.length > 200){
      throw new Error('A descrição não pode ter mais que 200 caracteres')
    }

    this.titulo = titulo
    this.descricao = descricaoTarefa
    this.prioridade = prioridade
    this.concluida = concluida
  }

  concluir(){
    if(this.concluida){
      throw new Error('A tarefa já está concluída!')
    }else{
      this.concluida = true
      console.log('Tarefa concluída com sucesso!')
    }
  }

  reabrir(){
    if(!this.concluida){
      throw new Error('A tarefa já está em aberto!')
    }else{
      this.concluida = false
      console.log('Tarefa reaberta com sucesso!')
    }
  }
}
