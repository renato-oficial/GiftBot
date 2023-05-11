const { Bot } = require("./bot");

const bot = new Bot();

bot.setCommands([
  {
    command: "start",
    description: "Inicio",
  },
  {
    command: "recarregar",
    description: "Adicionar saldo",
  },
  {
    command: "afiliados",
    description: "Link de indicação",
  },
  {
    command: "pin",
    description: "Meu PIN de cliente",
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

bot.launch();
