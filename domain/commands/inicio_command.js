const userFactorySingleton = require("../../infra/factory/user_factory");
const User = require("../entity/UserModel");
const { banner } = require("./banner");

module.exports.start_command = async (ctx) => {
  const { id, first_name, last_name, username } = ctx.from;
  const user_service = userFactorySingleton.userService();

  const new_user = new User({ id, first_name, last_name, username });

  await user_service.createUser(new_user);

  await banner(ctx);
};
