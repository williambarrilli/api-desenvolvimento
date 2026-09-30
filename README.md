# API de desenvolvimento

API mínima em Express para os alunos praticarem desenvolvimento por issues.
O projeto começa com apenas um Hello World e separa o código em três camadas:

```text
controller -> logic -> repository -> data/hello.json
```

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

A API ficará disponível em `http://localhost:3000`.

## Endpoint inicial

### `GET /`

Retorna a mensagem persistida no arquivo `data/hello.json`:

```json
{
  "mensagem": "Hello World"
}
```

Teste com:

```bash
curl http://localhost:3000/
```

## Organização do código

- `src/server.js`: configura o Express e registra a rota.
- `src/controllers/helloController.js`: recebe a requisição e monta a resposta HTTP.
- `src/logic/helloLogic.js`: representa a regra de negócio do caso de uso.
- `src/repositories/helloRepository.js`: lê e grava diretamente o arquivo JSON.
- `data/hello.json`: armazenamento inicial da mensagem.

O repository recria o arquivo com a mensagem padrão se ele ainda não existir.

## Sugestões de issues para os alunos

- Criar uma rota `GET /saudacao` com uma mensagem personalizada.
- Permitir alterar a mensagem usando `PUT` ou `PATCH`.
- Validar o formato do corpo das requisições.
- Criar tratamento centralizado de erros.
- Adicionar testes automatizados para controller, logic e repository.
- Substituir o arquivo JSON por outro mecanismo de persistência.
- Documentar a API com exemplos de requisições e respostas.
