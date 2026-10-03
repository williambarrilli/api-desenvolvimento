# API de desenvolvimento

API mínima em Express para os alunos praticarem desenvolvimento por issues.
O projeto começa retornando uma tarefa e separa o código em três camadas:

```text
controller -> logic -> repository -> data/tarefa.json
```

## Fluxo visual

```mermaid
flowchart LR
    cliente["Aluno ou curl"] -->|"GET /"| servidor["src/server.js"]
    servidor --> controller["Controller: tarefaController"]
    controller --> logic["Logic: tarefaLogic"]
    logic --> repository["Repository: tarefaRepository"]
    repository <-->|"Lê e salva"| arquivo[("data/tarefa.json")]
    repository --> resultado["Tarefa encontrada"]
    resultado --> resposta["Resposta JSON 200"]
```

Em resumo: o aluno faz uma requisição, o `server.js` encaminha para o
controller, a logic coordena o caso de uso e o repository acessa o arquivo.

## Como executar

Pré-requisito: Node.js instalado.

Na pasta do projeto, instale as dependências:

```bash
npm install
```

Inicie a API:

```bash
npm start
```

Durante o desenvolvimento, use o Nodemon:

```bash
npm run dev
```

Para verificar a qualidade do código sem executar testes unitários:

```bash
npm run lint
```

Para executar os testes automatizados:

```bash
npm test
```

A API ficará disponível em `http://localhost:3000`.

## Endpoint inicial

### `GET /`

Retorna a tarefa persistida no arquivo `data/tarefa.json`:

```json
{
  "id": 1,
  "titulo": "Aprender Express",
  "descricao": "Implementar a primeira tarefa da API",
  "prioridade": "media",
  "concluida": false
}
```

Teste com:

```bash
curl http://localhost:3000/
```

### `GET /tarefas/:id`

Consulta uma tarefa específica pelo identificador.

- Identificador existente: retorna HTTP 200 com os dados da tarefa.
- Identificador que não é um número inteiro positivo (ex.: `abc`, `-1`, `0`, `1.5`): retorna HTTP 400.
- Identificador válido sem tarefa correspondente: retorna HTTP 404.

A consulta é somente leitura e não altera os dados persistidos em `data/tarefa.json`.

Teste com:

```bash
curl http://localhost:3000/tarefas/1
curl -i http://localhost:3000/tarefas/abc
curl -i http://localhost:3000/tarefas/999
```

## Organização do código

- `src/server.js`: configura o Express e registra as rotas.
- `src/controllers/tarefaController.js`: recebe a requisição e monta a resposta HTTP.
- `src/logic/tarefaLogic.js`: representa a regra de negócio dos casos de uso.
- `src/repositories/tarefaRepository.js`: lê e grava diretamente o arquivo JSON.
- `src/utils/erroHttp.js`: erro customizado para que a logic sinalize o status HTTP adequado.
- `data/tarefa.json`: armazenamento das tarefas.
- `tests/`: testes automatizados executados com `npm test` (usa o test runner nativo do Node).

O repository recria o arquivo com a tarefa padrão se ele ainda não existir.

## Sugestões de issues para os alunos

- Criar uma rota `GET /tarefas` para listar tarefas.
- Permitir cadastrar uma tarefa usando `POST`.
- Permitir alterar uma tarefa usando `PUT` ou `PATCH`.
- Permitir remover uma tarefa usando `DELETE`.
- Validar o formato do corpo das requisições.
- Criar tratamento centralizado de erros. 
- Adicionar testes automatizados para controller, logic e repository.
- Substituir o arquivo JSON por outro mecanismo de persistência.
- Documentar a API com exemplos de requisições e respostas. 
