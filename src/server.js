const express = require("express");
const helloController = require("./controllers/helloController");

const app = express();
const PORTA = Number(process.env.PORT || 3000);

app.get("/", helloController.hello);

if (require.main === module) {
  app.listen(PORTA, () => {
    console.log(`API disponível em http://localhost:${PORTA}`);
  });
}

module.exports = app;
