module.exports.sendAfiliateDescription = async (ctx) => {
  const message = `🔰 Programa de Afiliados 

    🔸 Minhas indicações: 0
    💰 Porcentagem de bônus: 4%
    📊 Total já ganho: R$ 0,00
    
    🔗 Link de indicação: https://t.me/${ctx.botInfo.username}?start=${ctx.from.id}
    
    🔥 Além de você receber bônus, seus amigos também terão acesso aos **MELHORES SINAIS** fornecidos por nós!
    
    😍 Gostou da ideia? Indique agora mesmo seus amigos para o nosso Bot e ganhe bônus!
    `;

  const { message_id } = await ctx.replyWithMarkdown(message);
  setTimeout(() => ctx.deleteMessage(message_id), 60 * 1000);
};
