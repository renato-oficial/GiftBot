const userFactorySingleton = require("../../infra/factory/user_factory");
const User = require("../entity/UserModel");
const { banner } = require("./banner");

const iniciarComoAfiliado = async (ctx, hostedById) => {
  const { id, first_name, last_name, username } = ctx.from;
  const user_service = userFactorySingleton.userService();

  const user = new User({
    id,
    first_name,
    last_name,
    username,
    convite: String(hostedById),
  });

  try {
    // Cria um novo usuário convidado
    const new_user = await user_service.createUser(user);
    if (!new_user) return;

    // Busca o usuário anfitrião
    const hosteUser = await user_service.getUserById(hostedById);
    if (!hosteUser.length) return;

    await user_service.inserInvitedUser(hosteUser[0], id);
    await banner(ctx);
  } catch (error) {
    console.error(error);
  }
};
module.exports.newUserWithAfiliateLink = (ctx) => {
  const { text } = ctx.message;
  let socio_afiliado_id = text.split("/start")[1].trim();
  const idExists = /\d{10}/.test(socio_afiliado_id);
  if (idExists) iniciarComoAfiliado(ctx, socio_afiliado_id);
};
