const userFactorySingleton = require("../../infra/factory/user_factory");
const User = require("../entity/UserModel");
const { banner } = require("./banner");

module.exports.start_command = async (ctx) => {
  const { id, first_name, last_name, username } = ctx.from;
  const user_service = userFactorySingleton.userService();

  await user_service.createUser({ chatId: String(id), username, lastName: last_name});

  await banner(ctx);
};
