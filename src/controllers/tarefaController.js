const PRIORIDADES = [`alta`,`media`,`baixa`]
import * as tarefaLogic from "../logic/tarefaLogic.js";

export async function obterTarefa(request, response) {
  try {
    const tarefa = await tarefaLogic.obterTarefa();

    return response.status(200).json(tarefa);
  } catch (error) {
    console.error(`Erro ao obter tarefa: ${error.message}`);

    return response.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
}
export async function criarTarefa(request, response) {
  try {
    const {titulo,prioridade} = request.body
    if(!titulo || titulo.trim()===""){
      response.status(400).json({mensagem: `titulo é obrigatorio`})
    }
    if(!PRIORIDADES.includes(prioridade.toLowerCase())){
      response.status(400).json({mensagem: `Prioridade deve ser entre, alta, media , baixa`})
    }
      const tarefa = await tarefaLogic.criarTarefa(request.body)

      response.status(201).json(tarefa)
      

  } catch (error){
        console.log("branca")
        console.error(`Erro ao obter tarefa: ${error.message}`)
  }
}
  