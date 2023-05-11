const axios = require("axios");
var cron = require("node-cron");
const userFactorySingleton = require("../infra/factory/user_factory");

const rainbow = {
  black: ["⚫", "[PRETO]"],
  red: ["🔴", "[VERMELHO]"],
  white: ["⚪", "[BRANCO]"],
};
const {
  requestDoubleApi,
} = require("../interface/http/gluck_endpoint_service");

const sendMessage = ({ chat_id, color }) => {
  axios.post(
    "https://api.telegram.org/bot6158309491%3AAAG6eJmm9cBmuWZj4QspjwTVtuVu2I4krAE/sendMessage",
    {
      text: color,
      parse_mode: "Markdown",
      disable_web_page_preview: false,
      disable_notification: false,
      reply_to_message_id: null,
      chat_id,
    }
  );
};
const cron_double_update = (bot) => {
  cron.schedule("*/10 * * * * *", () => {
    //console.log("running a task every minute");
    requestDoubleApi().then(async (roll) => {
      try {
        const user_service = userFactorySingleton.userService();
        const users = await user_service.allUsersPaid();
        if (!users.length) return;
        users.map((item) =>
          sendMessage({
            chat_id: parseInt(item.id),
            color: `
👇 Entrar agora no 👇
${rainbow[roll.color][1]} ${rainbow[roll.color][0]} + ${rainbow.white[0]} ${
              rainbow.white[1]
            }`,
          })
        );
      } catch (error) {
        console.log();
      }
    });
  });
};

module.exports = { cron_double_update };
