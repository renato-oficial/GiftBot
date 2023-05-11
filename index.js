const { Bot } = require("./bot");

const myBot = new Bot();

myBot.setCommands([
  {
    command: "start",
    description: "Inicio",
  },
  {
    command: "recarregar",
    description: "Adicionar saldo",
  },
  {
    command: "instrucoes",
    description: "Instruções de uso",
  },
  {
    command: "faq",
    description: "Nossa FAQ",
  },
  {
    command: "termos",
    description: "Termos de uso",
  },
]);

myBot.launch();
