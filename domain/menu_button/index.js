const { bot } = require("../../bot");

const menu_button = () => {
  bot.telegram.setMyCommands([
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
};

module.exports = { menu_button };
