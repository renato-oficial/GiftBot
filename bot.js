const { Telegraf } = require("telegraf");
const {
  sendAfiliateDescription,
} = require("./domain/commands/send_afiliate_description");
const { start_command } = require("./domain/commands/inicio_command");
const { recharge_command } = require("./domain/commands/recarga_command");
const {
  newUserWithAfiliateLink,
} = require("./domain/commands/iniciar_convidado_command");
const { cron_double_update } = require("./cron/double_update");

require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

class Command {
  constructor(command, description) {
    this.command = command;
    this.description = description;
  }
}

class Bot {
  constructor() {
    this.commands = [];
  }

  addCommand(command) {
    this.commands.push(command);
  }

  setCommands(commands) {
    this.commands = commands.map(
      (command) => new Command(command.command, command.description)
    );
  }

  launch() {
    bot.telegram.setMyCommands(
      this.commands.map((command) => ({
        command: command.command,
        description: command.description,
      }))
    );

    bot.hears("/start", start_command);
    bot.start(start_command);
    bot.hears("/recarregar", recharge_command);
    bot.action("/recarregar", recharge_command);
    bot.launch();
    //cron_double_update();
  }
}

module.exports = { Bot };
