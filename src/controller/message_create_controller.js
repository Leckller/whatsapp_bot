const { services } = require('../services');
const { models } = require('../model');
const { sendMessage } = require('../app');
const { MessageMedia } = require('whatsapp-web.js');
// Controles para o numero host do whatsapp

const messageCreateController = async (msg) => {

  if (!services.listenComand(msg.body) && !msg.fromMe) return;

  if (msg.body.includes('!climate')) {
    const { message } = await services.validClimate(msg.body)
    return await msg.reply(message);
  }

  if (msg.body.includes('&climate') && !(msg.body.includes('"&climate'))) {
    const { message, img } = await services.validOptionClimate(msg.body);
    await msg.reply(message);
    if (img) {
      const media = await MessageMedia.fromUrl(img);
      // await sendMessage(msg.from, media);
      console.log(media)
    }
    return;
  }

  // se quotedParticipant existir significa que o comando foi chamado na resposta de outra mensagem, então este usuario da mensagem marcada recebe permissoes para utilizar o bot (quotedParticipant = numero da pessoa mencionada)
  if (msg.body === '+user' && "quotedParticipant" in msg._data) {
    await models.setPerms('userPerms', msg._data.quotedParticipant);
  }

  const GROUP = services.typeChat(msg.id).message === 'group chat';

  if (msg.body === '+gp' && GROUP) {
    // msg.id.remote = string de referencia ao chat
    await models.setPerms('groupPerms', msg.id.remote)
  };
  if (msg.body === '!everyone' || msg.body === '!todes' && GROUP) {
    // Envia uma mensagem mencionando todos os integrantes do grupo
    const chat = await msg.getChat();

    let text = '';
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  };
}

module.exports = messageCreateController;