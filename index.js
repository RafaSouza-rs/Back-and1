const express = require("express");
const app = express();

const porta = 3000;

app.get((req, resposta) => {
  resposta.send("Server is running");
});

app.listen(porta, () => {
  console.log("Server is running");
});
