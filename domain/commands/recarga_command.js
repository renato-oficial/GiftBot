const { Payment } = require("../../aplicacao/services/payment_service");
const userFactorySingleton = require("../../infra/factory/user_factory");

module.exports.recharge_command = async (ctx) => {
  try {
    await ctx.reply("⏳ Estou gerando o seu codigo pix para pagamento...");
    const payment = new Payment();
    const response = await payment.createOrder();
    if (!response) {
      return await ctx
        .reply("Não conseguimos processar o seu pedido, tente mais tarde.")
        .then(({ message_id }) => {
          setTimeout(() => ctx.deleteMessage(message_id), 60 * 1000);
        });
    }

    const qrcode = response.qr_code;
    const id = response.id;

    ctx.replyWithMarkdown(`\`${qrcode}\``).then(({ message_id }) => {
      setTimeout(() => ctx.deleteMessage(message_id), 330000);
    });

    ctx.replyWithMarkdown(`Número pedido: \`${id}\``).then(({ message_id }) => {
      setTimeout(() => ctx.deleteMessage(message_id), 330000);
    });
    ctx
      .replyWithMarkdown(
        "☝️ **ATENÇÃO** ‼️ Você tem 5 minutos para efetuar o pagamento. Caso o contrário, sua compra será cancelada."
      )
      .then(({ message_id }) => {
        setTimeout(() => ctx.deleteMessage(message_id), 330000);
        // console.log(message_id)
      });

    setTimeout(async () => {
      const status = await payment.orderStatus(id);
      if (status.toString().includes("approved")) {
        try {
          const user_service = userFactorySingleton.userService();
          await user_service.updateUser(ctx.from.id, { status: "paid" });
          ctx
            .replyWithMarkdown(
              "✅ Recebemos o seu pagamento, aproveite nosso serviço."
            )
            .then(({ message_id }) => {
              setTimeout(() => ctx.deleteMessage(message_id), 60 * 1000);
              // console.log(message_id)
            });
        } catch (error) {
          console.error({
            chat_id: ctx.from.id,
            message: "Não foi possível mudar o pagamento do cliente.",
          });
        }
        return;
      }
      payment.oderCancel(id);
      ctx
        .replyWithMarkdown(
          `🚫 O pedido com o número: *${id}* não foi pago e foi cancelado.`
        )
        .then(({ message_id }) => {
          setTimeout(() => ctx.deleteMessage(message_id), 60 * 1000);
          // console.log(message_id)
        });
    }, 310000);
  } catch (error) {
    console.error(error);
  }
};
