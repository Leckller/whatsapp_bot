const { comandsModel } = require('../model');
const { groupValidate } = require('../services');

const messageController = async (msg) => {
  const contentMsg = msg.body;
  // msg.id.remote = string de referencia ao chat
  const validGp = await groupValidate(msg.id.remote);

  // Validar se o usuario está como admin
  // if (msg.body === '+gp') {
  //   comandsModel.addGroupPerms(msg.id.remote);
  // };

  // Verifica se o comando foi disparado em um grupo valido;
  if (contentMsg === '!everyone') {
    if (!validGp) {
      return await msg.reply('* Este grupo não tem permissão para usar este comando *');
    }
    const chat = await msg.getChat();

    let text = '';
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
    // Envia uma mensagem mencionando todos os integrantes do grupo
  };

}

module.exports = messageController;